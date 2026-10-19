"""Independent encoded verification; writes only to this topic's review folder."""
from pathlib import Path
import subprocess,json,hashlib,struct,array,math,re
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent
SCRATCH=OUT/'scratch'

def ff(args):
    return subprocess.run(['ffmpeg','-hide_banner','-v','error','-xerror','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args],capture_output=True,check=True)

def check(name,path):
    raw=path.read_bytes()
    p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
    v=next(s for s in p['streams'] if s['codec_type']=='video');a=next(s for s in p['streams'] if s['codec_type']=='audio')
    assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
    assert a['codec_name']=='aac'
    # Decode every video frame and audio sample; frame MD5 also proves endpoints.
    decode=ff(['-i',str(path),'-map','0:v:0','-pix_fmt','rgb24','-threads','2','-f','framemd5','-'])
    assert not decode.stderr
    hashes=[s.split(',')[-1].strip() for s in decode.stdout.decode().splitlines() if s and not s.startswith('#')]
    (SCRATCH/f'{name}-framemd5.txt').write_bytes(decode.stdout)
    assert len(hashes)==int(v['nb_frames'])
    assert hashes[0]==hashes[-1], f'{name}: exact endpoint mismatch'
    pcm=ff(['-i',str(path),'-map','0:a:0','-ac','2','-ar','44100','-c:a','pcm_f32le','-threads','2','-f','f32le','-'])
    assert not pcm.stderr
    samples=array.array('f');samples.frombytes(pcm.stdout)
    peak=max(abs(s) for s in samples);db=20*math.log10(peak)
    assert -40<db<=-.5, (name,db)
    cue_evidence=[]
    for c in json.loads((SCRATCH/f'{name}-cues.json').read_text()):
        segment=samples[int(c['t']*88200):int((c['t']+.25)*88200)]
        energy=math.sqrt(sum(x*x for x in segment)/len(segment))
        assert energy>0, (name,c)
        cue_evidence.append({'time':c['t'],'cue':c['name'],'windowRmsDbfs':round(20*math.log10(energy),2)})
    boxes={};pos=0
    while pos+8<=len(raw):
        length,kind=struct.unpack('>I4s',raw[pos:pos+8])
        if length==1:length=struct.unpack('>Q',raw[pos+8:pos+16])[0]
        if length==0:length=len(raw)-pos
        assert length>=8
        boxes[kind.decode()]=pos;pos+=length
    assert boxes['moov']<boxes['mdat'];assert len(raw)<3000000
    ff(['-i',str(path),'-lavfi','showspectrumpic=s=1400x400:legend=1:fscale=log','-frames:v','1','-threads','2','-y',str(SCRATCH/f'{name}-spectrum.png')])
    for n,label in [(0,'first'),(len(hashes)-1,'last')]:
        ff(['-i',str(path),'-vf',f'select=eq(n\\,{n})','-fps_mode','passthrough','-frames:v','1','-threads','2','-y',str(SCRATCH/f'{name}-{label}.png')])
    return {'sha256':hashlib.sha256(raw).hexdigest(),'duration':float(v['duration']),'frames':len(hashes),'bytes':len(raw),'video':'H.264 1080x1920 30fps yuv420p','audio':'AAC stereo','fullDecode':True,'matchingBoundaryFrames':True,'boundaryFrameMd5':hashes[0],'faststart':True,'atomOffsets':boxes,'audioPeakDbfs':round(db,3),'audioHeard':False,'cueWindows':cue_evidence}

if __name__=='__main__':
    checks={}
    for name in ['baseline','astra','fable']:
        path=ROOT/f'public/media/observability-and-tracing/{name}.mp4'
        checks[name]=check(name,path)
        print(name,checks[name]['frames'],checks[name]['audioPeakDbfs'],flush=True)
    (OUT/'encoded-checks.json').write_text(json.dumps(checks,indent=2)+'\n')

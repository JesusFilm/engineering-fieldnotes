"""Run from any directory; outputs stay in this variant. No third-party Python deps."""
import array, hashlib, json, math, re, struct, subprocess, wave
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
MEDIA=ROOT/'public/media/tool-design'
MOVIE=MEDIA/'astra.mp4'
SCRATCH=HERE/'scratch'
SCRATCH.mkdir(exist_ok=True)
def run(args):
    return subprocess.run(args,check=True,capture_output=True).stdout

def ff(args):
    return run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args[:-1]),'-threads','2',str(args[-1])])

probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MOVIE)]))
(SCRATCH/'ffprobe.json').write_text(json.dumps(probe,indent=2))
v=next(x for x in probe['streams'] if x['codec_type']=='video')
a=next(x for x in probe['streams'] if x['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac'
assert int(v['nb_frames'])==900
assert float(probe['format']['duration'])==30
assert MOVIE.stat().st_size<2000000
# Full video AND audio decode, fail on any decode error.
ff(['-xerror','-i',MOVIE,'-map','0:v','-map','0:a','-f','null','-'])
md5=ff(['-i',MOVIE,'-map','0:v','-f','framemd5','-']).decode()
(SCRATCH/'frames.md5').write_text(md5)
lines=[x for x in md5.splitlines() if x and not x.startswith('#')]
first,last=(x.split(',')[-1].strip() for x in (lines[0],lines[-1]))
assert len(lines)==900 and first==last,(first,last)
# Top-level atom traversal, not a substring search.
blob=MOVIE.read_bytes(); pos=0;atoms=[]
while pos<len(blob):
    size,kind=struct.unpack('>I4s',blob[pos:pos+8]);header=8
    if size==1: size=struct.unpack('>Q',blob[pos+8:pos+16])[0];header=16
    if size==0:size=len(blob)-pos
    assert size>=header
    atoms.append({'type':kind.decode('ascii'),'offset':pos,'size':size});pos+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(MOVIE),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,check=True).stderr.decode()
(SCRATCH/'volume.log').write_text(vol)
max_db=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1));assert max_db<=-0.5
ff(['-i',MOVIE,'-vn','-c:a','pcm_s16le','-threads','2',SCRATCH/'decoded.wav'])
run(['node',str(HERE/'export-cues.cjs')])
def pcm(p):
    with wave.open(str(p)) as w:
        assert w.getframerate()==44100 and w.getnchannels()==2
        ar=array.array('h',w.readframes(w.getnframes()))
        return ar
ref=pcm(SCRATCH/'reference.wav');actual=pcm(SCRATCH/'decoded.wav')
# Cross-correlation of the AAC-decoded waveform with deterministic original.
# 1ms lag resolution across +/- one frame; sample 1/16 of all stereo samples, including zero-lag explicitly.
stride=16
idx=range(3000,min(len(actual),len(ref))-3000,stride)
def corr(lag):
    return sum(ref[i]*actual[i+lag*2] for i in idx)
lags=sorted(set(range(-1470,1471,44)) | {0})
best=max(lags,key=corr)
assert abs(best)/44100<=1/30
cue_checks=[]
for cue in json.loads((SCRATCH/'cues.json').read_text()):
    lo=int(cue['t']*44100)*2;hi=lo+int(.12*44100)*2
    rms=math.sqrt(sum(x*x for x in actual[lo:hi])/max(1,hi-lo))/32768
    db=20*math.log10(max(rms,1e-12))
    assert db>-65,(cue,db)
    cue_checks.append({'time':cue['t'],'sound':cue['name'],'rms_first_120ms_dbfs':round(db,2)})
# Decoded captures: one per beat, two moving packets, and all beat boundaries.
for t in [4.9,10.9,17.9,20.5,25,16.2,24.2]:
    ff(['-ss',t,'-i',MOVIE,'-frames:v','1','-threads','2',SCRATCH/f'encoded-{t}.png'])
    ff(['-ss',t,'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{t}.png'])
for i,t in enumerate([0,.4,1,6.766667,6.8,12.766667,12.8,19.666667,19.7,24.466667,24.5,27.2,28.2,29.966667]):
    ff(['-ss',t,'-i',MOVIE,'-vf','scale=270:-1','-frames:v','1','-threads','2',SCRATCH/f'boundary-{i:02d}.png'])
ff(['-pattern_type','glob','-i',SCRATCH/'boundary-*.png','-vf','tile=7x2','-frames:v','1','-threads','2',SCRATCH/'boundary-sheet.png'])
ff(['-i',MOVIE,'-lavfi','showspectrumpic=s=1600x420:legend=1:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png'])
ff(['-ss','17.9','-i',MOVIE,'-frames:v','1','-q:v','2','-threads','2',MEDIA/'astra.jpg'])
check={
 'author':'gpt-6-astra','date':'2026-10-19','duration':30,'bytes':MOVIE.stat().st_size,
 'width':1080,'height':1920,'fps':30,'frames':len(lines),'video':'h264','pixelFormat':'yuv420p','audio':'aac',
 'fullDecode':'pass','exactDecodedFirstLastEquality':True,'firstLastMD5':first,
 'audioMaxDbfs':max_db,'audioReferenceLagMs':round(best/44.1,3),
 'audioCueCount':len(cue_checks),'cues':cue_checks,'atoms':atoms,'faststart':True,
 'sha256':hashlib.sha256(blob).hexdigest(),
 'listening':'Not physically heard; waveform, peak, spectrogram and cue timing analysed.',
 'visualInspection':'Pending human-visible view_image inspection by author; see review.md.'
}
(HERE/'checks.json').write_text(json.dumps(check,indent=2)+'\n')
print(json.dumps({k:v for k,v in check.items() if k not in ['cues','atoms']},indent=2))

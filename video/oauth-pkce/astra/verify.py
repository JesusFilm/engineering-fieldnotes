"""Check only this cut; never mutate shared build/review manifests."""
from pathlib import Path
import hashlib, json, re, struct, subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
MEDIA=ROOT/'public/media/oauth-pkce/astra.mp4'
SCRATCH=HERE/'scratch'
SCRATCH.mkdir(exist_ok=True)
def run(args):
    return subprocess.run(args,check=True,capture_output=True).stdout
def ff(args):
    return run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args])
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]))
(SCRATCH/'probe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['r_frame_rate'])==('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name']=='aac'
assert float(v['duration'])==30 and int(v['nb_frames'])==900
assert MEDIA.stat().st_size<2_000_000
full=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-i',str(MEDIA),'-threads','2','-f','null','-'],capture_output=True,check=True)
assert not full.stderr
raw=ff(['-i',str(MEDIA),'-vf','select=eq(n\\,0)+eq(n\\,899)','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1'])
n=1080*1920*3
assert len(raw)==2*n
assert raw[:n]==raw[n:], 'Encoded first/last frames differ'
vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-i',str(MEDIA),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
(SCRATCH/'volume.txt').write_text(vol)
peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1)); assert -.5>=peak>-40
blob=MEDIA.read_bytes();boxes={};pos=0
while pos+8<=len(blob):
    size,kind=struct.unpack('>I4s',blob[pos:pos+8]);head=8
    if size==1: size=struct.unpack('>Q',blob[pos+8:pos+16])[0];head=16
    if size==0: size=len(blob)-pos
    assert size>=head
    boxes[kind.decode()]=pos;pos+=size
assert boxes['moov']<boxes['mdat']
times=[5.4,10.5,13.5,16.5,22.5,26.8]
for t in times:
    ff(['-ss',str(t),'-i',str(MEDIA),'-frames:v','1','-threads','2',str(SCRATCH/f'beat-{t:04.1f}.png')])
    ff(['-ss',str(t),'-i',str(MEDIA),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(SCRATCH/f'phone-{t:04.1f}.png')])
ff(['-i',str(MEDIA),'-vf','fps=1,scale=240:-1,tile=6x5','-frames:v','1','-threads','2',str(SCRATCH/'contact-sheet.png')])
ff(['-i',str(MEDIA),'-lavfi','showspectrumpic=s=1500x500:fscale=log','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
ff(['-ss','24.6','-i',str(MEDIA),'-frames:v','1','-threads','2','-q:v','2',str(MEDIA.with_suffix('.jpg'))])
# Analyze decoded AAC at every scheduled cue, rather than trusting the source mix.
import array,math
samples=array.array('f',ff(['-i',str(MEDIA),'-vn','-ac','1','-ar','48000','-c:a','pcm_f32le','-threads','2','-f','f32le','pipe:1']))
js="const F=require('./engine/flow-engine.js');require('./scene.js');console.log(JSON.stringify(F.createScene(F.lastScene).audioCues()))"
cues=json.loads(subprocess.check_output(['node','-e',js],cwd=HERE))
for c in cues:
    vals=samples[int(c['t']*48000):int((c['t']+.18)*48000)]
    c['decodedWindowPeakDbfs']=round(20*math.log10(max(abs(x) for x in vals)),2)
    assert c['decodedWindowPeakDbfs']>-50
(SCRATCH/'cue-audit.json').write_text(json.dumps(cues,indent=2)+'\n')
evidence={'sha256':hashlib.sha256(blob).hexdigest(),'posterSha256':hashlib.sha256(MEDIA.with_suffix('.jpg').read_bytes()).hexdigest(),'duration':float(v['duration']),'bytes':len(blob),'frames':900,'video':'h264/yuv420p/1080x1920/30fps','audio':'aac','audioPeakDbfs':peak,'firstLastExactlyEqual':True,'boundaryRgbSha256':hashlib.sha256(raw[:n]).hexdigest(),'fullDecode':True,'faststart':True,'cueCount':len(cues),'everyCueHasDecodedAudio':True,'physicalListening':False}
(HERE/'verification.json').write_text(json.dumps(evidence,indent=2)+'\n')
print(json.dumps(evidence,indent=2))

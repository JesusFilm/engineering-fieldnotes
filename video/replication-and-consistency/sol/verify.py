"""Hash-bound checks of this cut only. Does not touch shared review manifests."""
from pathlib import Path
import array, hashlib, json, re, struct, subprocess
CUT=Path(__file__).resolve().parent
ROOT=CUT.parents[2]
MOVIE=ROOT/'public/media/replication-and-consistency/sol.mp4'
POSTER=MOVIE.with_suffix('.jpg')
SCRATCH=CUT/'scratch'
SCRATCH.mkdir(exist_ok=True)
def run(*args):return subprocess.check_output(args)
def ff(*args):return run('ffmpeg','-v','error','-threads','2','-filter_threads','2',*map(str,args))
data=MOVIE.read_bytes()
p=json.loads(run('ffprobe','-v','error','-show_format','-show_streams','-of','json',str(MOVIE)))
v=next(s for s in p['streams'] if s['codec_type']=='video');a=next(s for s in p['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['r_frame_rate'])==('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name']=='aac'
assert float(v['duration'])==32 and int(v['nb_frames'])==960
assert len(data)<2_000_000
frames=ff('-i',MOVIE,'-vf','select=eq(n\\,0)+eq(n\\,959)','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1')
n=1080*1920*3
boundary=len(frames)==n*2 and frames[:n]==frames[n:]
print('Exact encoded boundary equality:',boundary,flush=True)
assert boundary,'Decoded first/last frames differ'
decode=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-i',str(MOVIE),'-threads','2','-f','null','-'],capture_output=True,check=True)
assert not decode.stderr
volume=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(MOVIE),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
peak=float(re.search(r'max_volume: ([-\d.]+) dB',volume).group(1))
assert -40<peak<=-.5,peak
boxes={};pos=0
while pos+8<=len(data):
    length,kind=struct.unpack('>I4s',data[pos:pos+8]);header=8
    if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0];header=16
    if length==0:length=len(data)-pos
    assert length>=header
    boxes[kind.decode()]=pos;pos+=length
assert boxes['moov']<boxes['mdat']
poster=json.loads(run('ffprobe','-v','error','-show_streams','-of','json',str(POSTER)))['streams'][0]
assert (poster['width'],poster['height'])==(1080,1920)
# Decode AAC to mono floats; validate audible energy at every scheduled cue.
raw=ff('-i',MOVIE,'-vn','-ac','1','-ar','48000','-threads','2','-f','f32le','pipe:1')
samples=array.array('f');samples.frombytes(raw)
cues=json.loads(subprocess.check_output(['node','-e',"const F=require('./engine/flow-engine.js');require('./scene.js');console.log(JSON.stringify(F.createScene(F.lastScene).audioCues()))"],cwd=CUT))
cue_checks=[]
for cue in cues:
    t=cue['t'];window=samples[int((t+.005)*48000):int((t+.16)*48000)]
    amplitude=max(abs(x) for x in window)
    assert amplitude>.001,(cue,amplitude)
    cue_checks.append({'time':t,'preset':cue['name'],'peakWindow':round(amplitude,6)})
beat_times=[4.95,9.5,13.7,19.5,23.2,28.5]
for t in beat_times:
    ff('-y','-ss',t,'-i',MOVIE,'-frames:v','1','-threads','2',SCRATCH/f'beat-{t:05.2f}.png')
    ff('-y','-ss',t,'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{t:05.2f}.png')
# Boundary/motion samples provide a broader encoded review beyond beat holds.
for t in [0,.4,1.5,3.4,6.95,8.55,10.8,12.7,15.4,15.5,17.4,18.98,21.95,24.5,26.5,27.9,30.3,31.97]:
    ff('-y','-ss',t,'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'boundary-{t:05.2f}.png')
ff('-y','-i',MOVIE,'-lavfi','showspectrumpic=s=1600x420:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png')
evidence={'sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(POSTER.read_bytes()).hexdigest(),'bytes':len(data),'duration':32,'frames':960,'video':'h264/yuv420p/1080x1920/30','audio':'aac','peakDbfs':peak,'matchingBoundaryFrames':boundary,'fullDecode':True,'faststart':True,'atomOffsets':boxes,'audioCues':len(cues),'cueEnergyChecks':cue_checks,'audioPhysicallyHeard':False,'visualReviewTimes':beat_times,'reviewMethod':'self-review of decoded frames at full resolution and 350 px, contact sheet, spectrogram; no physical listening'}
(CUT/'verification.json').write_text(json.dumps(evidence,indent=2)+'\n')
print(json.dumps({k:v for k,v in evidence.items() if k not in ('cueEnergyChecks','atomOffsets')},indent=2))

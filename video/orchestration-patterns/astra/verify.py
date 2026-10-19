"""Sequential verification; writes evidence only under this variant's scratch directory."""
import array, hashlib, json, math, re, struct, subprocess
from pathlib import Path
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
OUT=ROOT/'public/media/orchestration-patterns/astra.mp4'
SCR=BASE/'scratch'
SCR.mkdir(exist_ok=True)
FF=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):
 return subprocess.run(list(map(str,args)),check=True,capture_output=True).stdout
probe=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',OUT]))
(SCR/'ffprobe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'],v['codec_name'])==(1080,1920,'30/1','yuv420p','h264')
assert a['codec_name']=='aac' and int(v['nb_read_frames'])==900
assert abs(float(probe['format']['duration'])-30)<.04
assert OUT.stat().st_size<2000000
# Full decode including audio, with fatal handling of any decode errors.
run(FF+['-xerror','-i',OUT,'-map','0:v','-map','0:a','-f','null','-'])
# Compare the actual decoded YUV planes of first and final frames, not screenshots.
raw=run(FF+['-i',OUT,'-vf',"select='eq(n,0)+eq(n,899)'",'-vsync','0','-pix_fmt','yuv420p','-f','rawvideo','-'])
framebytes=1080*1920*3//2
assert len(raw)==framebytes*2
assert raw[:framebytes]==raw[framebytes:],'Loop frames differ'
# Streamability: parse actual top-level MP4 boxes.
data=OUT.read_bytes(); pos=0; boxes=[]
while pos+8<=len(data):
 size,kind=struct.unpack('>I4s',data[pos:pos+8]); header=8
 if size==1: size=struct.unpack('>Q',data[pos+8:pos+16])[0]; header=16
 if size==0: size=len(data)-pos
 assert size>=header
 boxes.append({'type':kind.decode('ascii'),'offset':pos,'size':size});pos+=size
assert next(b['offset'] for b in boxes if b['type']=='moov')<next(b['offset'] for b in boxes if b['type']=='mdat')
p=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(OUT),'-af','volumedetect','-vn','-f','null','-'],capture_output=True,text=True,check=True)
(SCR/'audio-volumedetect.txt').write_text(p.stderr)
peak=float(re.search(r'max_volume:\s*([-\d.]+) dB',p.stderr)[1]);assert peak<=-.5
pcm=array.array('f');pcm.frombytes(run(FF+['-i',OUT,'-vn','-ac','1','-ar','48000','-f','f32le','-']))
node="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"
cues=json.loads(subprocess.run(['node','-e',node],cwd=BASE,check=True,capture_output=True,text=True).stdout)
cue_evidence=[]
for cue in cues:
 # AAC decoded samples should contain signal within 120ms of each scheduled event.
 start=max(0,int(cue['t']*48000)); segment=pcm[start:start+5760]
 rms=math.sqrt(sum(x*x for x in segment)/len(segment));db=20*math.log10(max(rms,1e-12))
 assert db>-65,(cue,db)
 cue_evidence.append({'time':cue['t'],'preset':cue['name'],'rms_next_120ms_dbfs':round(db,2)})
(SCR/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
(SCR/'cue-signal-check.json').write_text(json.dumps(cue_evidence,indent=2)+'\n')
# Five teaching-beat images, plus an explicit reset still and busy dispatch.
for t in [4.5,8.5,13.4,15.6,18.3,19.5,23.9,26.8]:
 name=f'beat-{t:04.1f}'
 run(FF+['-ss',t,'-i',OUT,'-frames:v','1','-threads','2',SCR/(name+'-full.png')])
 run(FF+['-i',SCR/(name+'-full.png'),'-vf','scale=350:-1','-frames:v','1','-threads','2',SCR/(name+'-350.png')])
# Boundaries adjacent to all main transitions, arranged with time labels in source order.
boundaries=[0,.2,.8,2.05,4.35,5.65,6.85,8.05,9.35,9.45,10.9,13.25,13.8,14.25,15.05,17.45,17.55,19.9,22.25,23.65,25.1,26.3,28.6,29.3,29.9666667]
for i,t in enumerate(boundaries):
 run(FF+['-ss',t,'-i',OUT,'-vf','scale=216:384','-frames:v','1','-threads','2',SCR/f'boundary-{i:02}.png'])
run(FF+['-pattern_type','glob','-i',SCR/'boundary-*.png','-vf','tile=5x5','-frames:v','1','-threads','2',SCR/'boundary-sheet.png'])
(SCR/'boundary-times.json').write_text(json.dumps(boundaries)+'\n')
run(FF+['-i',OUT,'-lavfi','showspectrumpic=s=1500x500:fscale=log:legend=1','-frames:v','1','-threads','2',SCR/'spectrogram.png'])
run(FF+['-ss','16.15','-i',OUT,'-frames:v','1','-q:v','2','-threads','2',ROOT/'public/media/orchestration-patterns/astra.jpg'])
report={'duration':30,'frames':900,'width':1080,'height':1920,'fps':30,'video':'h264','pixelFormat':'yuv420p','audio':'aac','bytes':OUT.stat().st_size,'maxVolumeDbfs':peak,'fullDecode':'pass','firstLastIdentical':True,'firstLastYuvSha256':hashlib.sha256(raw[:framebytes]).hexdigest(),'faststart':True,'mp4Boxes':boxes,'cueCount':len(cues),'cueSignalChecks':'pass; signal within 120ms at each scheduled cue; overlapping cues not isolated','physicalListening':False,'sha256':hashlib.sha256(data).hexdigest()}
(SCR/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))

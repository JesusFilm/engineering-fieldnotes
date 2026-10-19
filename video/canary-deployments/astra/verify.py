#!/usr/bin/env python3
"""Verify this cut only; never write shared manifests or shared media evidence."""
from pathlib import Path
import array,hashlib,json,math,re,struct,subprocess,sys
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
MEDIA=ROOT/'public/media/canary-deployments/astra.mp4'
SCRATCH=HERE/'scratch'; SCRATCH.mkdir(exist_ok=True)
FRAMES=SCRATCH/'encoded';FRAMES.mkdir(exist_ok=True)
BASE=['ffmpeg','-hide_banner','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):return subprocess.run(args,check=True,capture_output=True)
def ff(args):return run(BASE+args)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]).stdout)
v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio')
assert (v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['r_frame_rate'])==('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name']=='aac' and 22<=float(v['duration'])<=35
assert MEDIA.stat().st_size<2_000_000
n=int(v['nb_frames']);b=ff(['-i',str(MEDIA),'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1']).stdout
size=1080*1920*3
assert len(b)==size*2 and b[:size]==b[size:],'Decoded boundary frames differ'
full=ff(['-xerror','-i',str(MEDIA),'-threads','2','-f','null','-']);assert not full.stderr
vol=run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(MEDIA),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode()
peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol)[1]);assert -40<peak<=-.5
(SCRATCH/'volume.txt').write_text(vol)
data=MEDIA.read_bytes();offset=0;boxes={}
while offset+8<=len(data):
 length,kind=struct.unpack('>I4s',data[offset:offset+8]);header=8
 if length==1:length=struct.unpack('>Q',data[offset+8:offset+16])[0];header=16
 if length==0:length=len(data)-offset
 assert length>=header
 boxes[kind.decode()]=offset;offset+=length
assert boxes['moov']<boxes['mdat']
# One image per beat plus transition boundaries and busiest routing frame.
times=[0,.4,.8,3.8,5.5,6.4,9.45,10,12.5,14,16.4,16.8,17.2,17.9,18.6,20,20.7,21,22.6,23.3,25.8,28.6,29.2,29.966667]
for t in times:
 stem=f'{t:06.2f}'
 ff(['-y','-ss',str(t),'-i',str(MEDIA),'-frames:v','1','-threads','2',str(FRAMES/(stem+'.png'))])
 ff(['-y','-i',str(FRAMES/(stem+'.png')),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(FRAMES/(stem+'-350.png'))])
ff(['-y','-ss','18.6','-i',str(MEDIA),'-frames:v','1','-q:v','2','-threads','2',str(MEDIA.with_suffix('.jpg'))])
ff(['-y','-i',str(MEDIA),'-lavfi','showspectrumpic=s=1800x500:legend=1:fscale=log','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
# Compare decoded audio against the exact synthesised timing, independently of mux timestamps.
ref=ff(['-i',str(SCRATCH/'sfx.wav'),'-ar','4000','-ac','1','-threads','2','-f','f32le','pipe:1']).stdout
dec=ff(['-i',str(MEDIA),'-vn','-ar','4000','-ac','1','-threads','2','-f','f32le','pipe:1']).stdout
r=array.array('f');r.frombytes(ref);q=array.array('f');q.frombytes(dec)
# Full track, every eighth sample, search +/-20 ms. AAC is lossy, timing is not assumed.
correlations=[]
for lag in range(-80,81,2):
 indices=range(100,min(len(r),len(q))-100,8)
 xy=xx=yy=0.
 for i in indices:
  x=r[i];y=q[i+lag];xy+=x*y;xx+=x*x;yy+=y*y
 correlations.append((xy/math.sqrt(xx*yy),lag))
corr,lag=max(correlations);assert abs(lag/4000)<=.02 and corr>.9,(corr,lag)
cuecode="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues()));"
cues=json.loads(subprocess.run(['node','-e',cuecode],cwd=HERE,check=True,capture_output=True).stdout)
cue_peaks=[]
for cue in cues:
 start=max(0,int(cue['t']*4000));end=min(len(q),start+800)
 local=max(abs(x) for x in q[start:end]);db=20*math.log10(max(local,1e-12));assert db>-65
 cue_peaks.append({'t':cue['t'],'name':cue['name'],'peakInNext200msDbfs':round(db,2)})
(SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
record={'author':'gpt-6-astra','reasoning':'high','reviewed':'2026-10-19','sha256':digest(MEDIA),'posterSha256':digest(MEDIA.with_suffix('.jpg')),'duration':float(v['duration']),'bytes':MEDIA.stat().st_size,'frames':n,'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'audioPeakDbfs':peak,'matchingBoundaryFrames':True,'boundaryRgbSha256':hashlib.sha256(b[:size]).hexdigest(),'fullDecode':True,'faststart':True,'mp4BoxOffsets':boxes,'audioCueCount':len(cues),'audioCorrelation':round(corr,6),'audioLagMs':lag/4,'physicalListening':False,'encodedFrameTimes':times,'cueWindows':cue_peaks,'tools':{k:run([k,'-version']).stdout.decode().splitlines()[0] for k in ['ffmpeg','ffprobe']}}
(HERE/'verification.json').write_text(json.dumps(record,indent=2)+'\n')
print(json.dumps({k:v for k,v in record.items() if k not in ['cueWindows','tools','encodedFrameTimes','mp4BoxOffsets']},indent=2))

#!/usr/bin/env python3
"""Run from anywhere; all paths resolve relative to this file. Requires ffmpeg/ffprobe/Node."""
import array,hashlib,json,math,re,subprocess,sys,wave
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
VIDEO=ROOT/'public/media/load-balancing/astra.mp4'
SCRATCH=HERE/'scratch';SCRATCH.mkdir(exist_ok=True)
def run(args):return subprocess.run(args,check=True,capture_output=True).stdout
def ff(*args):return run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)])
probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(VIDEO)]))
v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'],v['codec_name'])==(1080,1920,'30/1','yuv420p','h264')
assert a['codec_name']=='aac' and int(v['nb_frames'])==840
assert float(probe['format']['duration'])==28 and VIDEO.stat().st_size<2_000_000
# Walk actual top-level MP4 boxes rather than searching arbitrary payload bytes.
data=VIDEO.read_bytes();boxes=[];offset=0
while offset<len(data):
 size=int.from_bytes(data[offset:offset+4],'big');typ=data[offset+4:offset+8].decode('ascii');boxes.append(typ)
 if size==1:size=int.from_bytes(data[offset+8:offset+16],'big')
 if size==0:break
 offset+=size
assert boxes.index('moov')<boxes.index('mdat')
# Full-stream decode fails on any decoding error.
ff('-xerror','-i',VIDEO,'-threads','2','-f','null','-')
seam=ff('-i',VIDEO,'-map','0:v:0','-an','-vf','select=eq(n\,0)+eq(n\,839)','-fps_mode','passthrough','-threads','2','-f','framemd5','-').decode()
(SCRATCH/'seam.framemd5').write_text(seam)
hashes=[x.split(',')[-1].strip() for x in seam.splitlines() if not x.startswith('#')]
assert len(hashes)==2 and hashes[0]==hashes[1],hashes
volume=subprocess.run(['ffmpeg','-threads','2','-filter_threads','2','-i',str(VIDEO),'-af','volumedetect','-threads','2','-f','null','-'],check=True,capture_output=True).stderr.decode()
(SCRATCH/'volume.log').write_text(volume)
peak=float(re.search(r'max_volume: ([\-\d.]+) dB',volume)[1]);assert peak<=-0.5
ff('-i',VIDEO,'-vn','-c:a','pcm_s16le','-ar','44100','-threads','2',SCRATCH/'decoded.wav')
with wave.open(str(SCRATCH/'decoded.wav')) as f:
 sr=f.getframerate();channels=f.getnchannels();samples=array.array('h',f.readframes(f.getnframes()))
if sys.byteorder!='little':samples.byteswap()
js="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues(),null,2));"
cues=json.loads(subprocess.run(['node','-e',js],cwd=HERE,check=True,capture_output=True).stdout)
(HERE/'audio-cues.json').write_text(json.dumps(cues,indent=2)+'\n')
cue_peaks=[]
for cue in cues:
 start=int(cue['t']*sr)*channels;end=int((cue['t']+.16)*sr)*channels
 q=max(abs(x) for x in samples[start:end]);db=20*math.log10(max(q,1)/32768)
 assert db>-55,(cue,db)
 cue_peaks.append({'time':cue['t'],'sound':cue['name'],'peakDbFS':round(db,2)})
# Determine mux timing against the exact pre-encode PCM. Positive lag means encoded audio later.
original=sorted(SCRATCH.glob('flowvid-*/sfx.wav'),key=lambda p:p.stat().st_mtime)[-1]
with wave.open(str(original)) as f:dry=array.array('h',f.readframes(f.getnframes()))
if sys.byteorder!='little':dry.byteswap()
# Several isolated cue windows; normalized correlation tolerates AAC and renderer gain.
lags=[]
for time in [1.0,5.5,11.85,14.25,22.35,24.5,26.4]:
 start=int((time+.01)*sr);length=int(.09*sr)
 ref=[dry[i*channels] for i in range(start,start+length,4)]
 refnorm=math.sqrt(sum(x*x for x in ref))
 best=(-1,0)
 for lag in range(-220,221):
  got=[samples[(i+lag)*channels] for i in range(start,start+length,4)]
  norm=math.sqrt(sum(x*x for x in got));corr=sum(x*y for x,y in zip(ref,got))/(refnorm*norm or 1)
  if corr>best[0]:best=(corr,lag)
 assert abs(best[1])/sr<.01,(time,best)
 lags.append({'cueTime':time,'offsetMs':round(best[1]/sr*1000,3),'correlation':round(best[0],4)})
# A complete decode can still contain raster defects: verify the static title in every visible frame.
header=ff('-i',VIDEO,'-an','-vf','crop=800:150:140:260,scale=80:15','-pix_fmt','rgb24','-threads','2','-f','rawvideo','-')
header_counts=[]
for frame in range(30,792):
 pixels=header[frame*3600:(frame+1)*3600]
 count=sum(1 for i in range(0,len(pixels),3) if pixels[i]>100 and pixels[i+1]>70 and pixels[i+2]<90)
 header_counts.append(count)
assert min(header_counts)>100,min(header_counts)
# Extract final-codec images, including every beat, midpoint and state boundary.
for pattern in ['phone-*.png','beat-*.png','boundary-*.png']:
 for stale in SCRATCH.glob(pattern):stale.unlink()
times=[2.5,4.4,10,12.7,14.5,16.8,20.2,23.2,25]
for time in times:
 name=f'{time:05.2f}'
 ff('-ss',time,'-i',VIDEO,'-frames:v','1','-threads','2',SCRATCH/f'beat-{name}.png')
 ff('-ss',time,'-i',VIDEO,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{name}.png')
ff('-pattern_type','glob','-i',SCRATCH/'phone-*.png','-vf','tile=3x3','-frames:v','1','-threads','2',SCRATCH/'phone-sheet.png')
boundaries=[0,.3,.85,5.5,9.8,10.5,11.85,14.25,15,16.35,18,22,22.35,22.85,24.5,26.4,27,839/30]
for n,time in enumerate(boundaries):
 ff('-ss',time,'-i',VIDEO,'-vf','scale=270:-1','-frames:v','1','-threads','2',SCRATCH/f'boundary-{n:02d}.png')
ff('-pattern_type','glob','-i',SCRATCH/'boundary-*.png','-vf','tile=6x3','-frames:v','1','-threads','2',SCRATCH/'boundaries.png')
ff('-i',VIDEO,'-lavfi','showspectrumpic=s=1400x450:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png')
ff('-ss','12.7','-i',VIDEO,'-frames:v','1','-q:v','2','-threads','2',ROOT/'public/media/load-balancing/astra.jpg')
report={'author':'gpt-6-astra','reviewed':'2026-10-19','fileBytes':VIDEO.stat().st_size,'sha256':hashlib.sha256(data).hexdigest(),'duration':28,'frames':840,'dimensions':[1080,1920],'fps':30,'videoCodec':'h264','pixelFormat':'yuv420p','audioCodec':'aac','fullDecode':'pass','topLevelBoxes':boxes,'faststart':True,'firstLastDecodedMD5':hashes,'audioMaxDbFS':peak,'cueCount':len(cues),'cuePeaks':cue_peaks,'audioTimingComparisons':lags,'physicalListening':False,'allVisibleFramesTitleCheck':{'frames':len(header_counts),'minYellowPixels':min(header_counts)},'visualReview':'Requires human/model inspection of generated images; see review.md'}
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['cuePeaks','audioTimingComparisons']},indent=2))
print('Audio timing:',lags)

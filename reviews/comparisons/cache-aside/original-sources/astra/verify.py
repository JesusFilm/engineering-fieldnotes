#!/usr/bin/env python3
"""Sequential FFmpeg checks and review assets. Run from any working directory."""
from pathlib import Path
import array, hashlib, json, math, re, struct, subprocess, wave
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
SCRATCH=HERE/'scratch'; SCRATCH.mkdir(exist_ok=True)
MEDIA=ROOT/'public/media/cache-aside/astra.mp4'
BASE=['ffmpeg','-hide_banner','-y','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):
 r=subprocess.run(args,capture_output=True,text=True,check=True)
 return r.stdout,r.stderr
def ff(args): return run(BASE+args)
run(['node',str(HERE/'audit.cjs')])
probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(MEDIA)])[0])
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert(v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac'
assert 22<=float(probe['format']['duration'])<=35
assert MEDIA.stat().st_size<2_000_000
_,decode=ff(['-v','error','-xerror','-err_detect','explode','-i',str(MEDIA),'-map','0:v','-map','0:a','-threads','2','-f','null','-'])
(SCRATCH/'full-decode.log').write_text(decode)
md5,_=ff(['-v','error','-i',str(MEDIA),'-an','-vf',f"select='eq(n,0)+eq(n,{int(v['nb_frames'])-1})'",'-fps_mode','passthrough','-threads','2','-f','framemd5','-'])
lines=[x for x in md5.splitlines() if x and not x.startswith('#')]
hashes=[x.rsplit(',',1)[1].strip() for x in lines]
assert len(hashes)==2 and hashes[0]==hashes[1],hashes
_,level=ff(['-i',str(MEDIA),'-vn','-af','volumedetect','-threads','2','-f','null','-'])
(SCRATCH/'audio-levels.log').write_text(level)
peak=float(re.search(r'max_volume: ([-0-9.]+) dB',level).group(1));assert peak<=-0.5
# Parse top-level atoms instead of relying on a filename or muxer invocation.
blob=MEDIA.read_bytes(); pos=0; atoms=[]
while pos+8<=len(blob):
 size,kind=struct.unpack('>I4s',blob[pos:pos+8]);header=8
 if size==1: size=struct.unpack('>Q',blob[pos+8:pos+16])[0];header=16
 if size==0:size=len(blob)-pos
 assert size>=header
 atoms.append({'type':kind.decode('ascii'),'offset':pos,'size':size});pos+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
# Inspect encoded data, including all beat states and representative transit frames.
frames=SCRATCH/'encoded';frames.mkdir(exist_ok=True)
times=[4.7,7.2,12.4,15.5,18.7,20.1,23.6,29.5]
for t in times:
 stem=f'{t:05.2f}'
 ff(['-v','error','-ss',str(t),'-i',str(MEDIA),'-frames:v','1','-threads','2',str(frames/(stem+'.png'))])
 ff(['-v','error','-ss',str(t),'-i',str(MEDIA),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(frames/(stem+'-350.png'))])
ff(['-v','error','-ss','12.4','-i',str(MEDIA),'-frames:v','1','-q:v','2','-threads','2',str(MEDIA.with_suffix('.jpg'))])
ff(['-v','error','-i',str(MEDIA),'-lavfi','showspectrumpic=s=1800x500:legend=1:fscale=log','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
ff(['-v','error','-i',str(MEDIA),'-vn','-acodec','pcm_s16le','-threads','2',str(SCRATCH/'decoded.wav')])
def readwav(p):
 with wave.open(str(p),'rb') as w:
  assert w.getsampwidth()==2
  sr=w.getframerate(); ch=w.getnchannels();data=array.array('h',w.readframes(w.getnframes()))
 return sr,ch,data
sr,ch,decoded=readwav(SCRATCH/'decoded.wav')
rs,rc,reference=readwav(SCRATCH/'sfx.wav'); assert (sr,ch)==(rs,rc)
timing=json.loads((HERE/'timing-audit.json').read_text());cueChecks=[]
for c in timing['cues']:
 start=int(c['t']*sr)*ch;end=start+int(.08*sr)*ch
 # Correlation within first 80 ms of each scheduled cue, accounting for mux gain.
 x=reference[start:end:4];y=decoded[start:end:4]
 xx=sum(i*i for i in x);yy=sum(i*i for i in y)
 corr=sum(i*j for i,j in zip(x,y))/math.sqrt(xx*yy) if xx and yy else 0
 rms=20*math.log10(math.sqrt(yy/len(y))/32768) if yy else -120
 assert corr>.80,(c,corr)
 assert rms>-65,(c,rms)
 cueChecks.append({'time':c['t'],'name':c['name'],'correlation':round(corr,5),'rmsDbFS':round(rms,2)})
result={'model':'gpt-6-astra','reasoning':'high','reviewed':'2026-10-19','duration':float(probe['format']['duration']),'bytes':len(blob),'sha256':hashlib.sha256(blob).hexdigest(),'video':{k:v[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate','nb_frames']},'audio':{k:a[k] for k in ['codec_name','sample_rate','channels']},'fullDecode':'passed','firstLastDecodedFrameMD5':hashes,'maxVolumeDbFS':peak,'atoms':atoms,'faststart':True,'cueChecks':cueChecks,'physicalListening':False,'visualReviewRequired':True}
(HERE/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:result[k] for k in ['duration','bytes','fullDecode','firstLastDecodedFrameMD5','maxVolumeDbFS','faststart']}))

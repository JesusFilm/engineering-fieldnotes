"""Verify final encodes and create reproducible encoded evidence. Run from repository root."""
from pathlib import Path
import subprocess,json,struct,hashlib,re,math,array,sys
from PIL import Image,ImageDraw,ImageChops
ROOT=Path.cwd()
OUT=ROOT/'reviews/comparisons/memory-architecture/scratch/final'
OUT.mkdir(parents=True,exist_ok=True)
BEATS={
'baseline':[0,1.4,2.2,4.5,5.2,7.1,7.8,10.3,12.4,13.4,14.2,16.3,17,17.8,19,19.8,20.9,21.6,24,25.3],
'astra':[0,1.6,2.3,3.4,4.2,6.5,8.6,10.9,11.6,13.1,13.8,14.4,16.2,17.5,18.4,19.6,20.5,22.4,23.5,25.5,26.5],
'fable':[0,1.1,1.6,2.2,2.8,3.6,4.8,5.8,6.5,7.3,8,9.5,10.5,11.2,11.8,13.3,14.3,15.6,16.6,17.6,18.8,20.5,21.8,22.1,22.4,23.2,23.8,24.2,24.35,24.6,24.9,25.2,25.7,26.2,27.3,28,28.5,29.2,30.5,31.7]}
FF=['ffmpeg','-hide_banner','-y','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def call(args,**kw):return subprocess.run(args,check=True,**kw)
def atoms(path):
 data=path.read_bytes();off=0;out=[]
 while off+8<=len(data):
  n,typ=struct.unpack('>I4s',data[off:off+8]);h=8
  if n==1:n=struct.unpack('>Q',data[off+8:off+16])[0];h=16
  if n==0:n=len(data)-off
  out.append({'type':typ.decode(),'offset':off,'size':n});off+=n
 return out
prior=OUT/'verification.json'
results=json.loads(prior.read_text()) if prior.exists() else {}
for v in (sys.argv[1:] or BEATS):
 p=ROOT/f'public/media/memory-architecture/{v}.mp4';d=OUT/v;d.mkdir(exist_ok=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)]))
 (d/'probe.json').write_text(json.dumps(probe,indent=2))
 video=next(s for s in probe['streams'] if s['codec_type']=='video');audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
 count=int(video['nb_read_frames']);duration=count/30
 proc=call(FF+['-v','info','-xerror','-err_detect','explode','-i',str(p),'-map','0:v:0','-map','0:a:0','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True)
 log=proc.stderr.decode();(d/'decode-audio.log').write_text(log)
 peak=float(re.search(r'max_volume: ([\-\d.]+) dB',log).group(1))
 # Exact selected frame numbers, including absolute first and last.
 nums=sorted(set([0,count-1]+[round(t*30) for t in BEATS[v]]))
 expr='+'.join(f'eq(n\\,{n})' for n in nums)
 call(FF+['-v','error','-i',str(p),'-vf',f'select={expr}','-fps_mode','vfr','-threads','2',str(d/'selected_%03d.png')])
 names=[]
 for j,n in enumerate(nums,1):
  f=d/f'selected_{j:03d}.png';q=d/f'frame_{n:04d}.png';f.replace(q);names.append(q)
  Image.open(q).resize((350,622)).save(d/f'phone_{n:04d}.png')
 for page in range((len(nums)+3)//4):
  sh=Image.new('RGB',(1400,652),'#222');draw=ImageDraw.Draw(sh)
  for j,n in enumerate(nums[page*4:page*4+4]):
   sh.paste(Image.open(d/f'phone_{n:04d}.png'),(350*j,0));draw.text((350*j+10,630),f'{v} {n/30:.3f}s / frame {n}',fill='white')
  sh.save(d/f'phone_sheet_{page:02d}.jpg')
 call(FF+['-v','error','-i',str(p),'-vf','fps=2,scale=180:320,tile=8x9','-frames:v','1','-threads','2',str(d/'contact.jpg')])
 call(FF+['-v','error','-i',str(p),'-lavfi','showspectrumpic=s=1600x400:fscale=log','-frames:v','1','-threads','2',str(d/'spectrogram.png')])
 pcm=call(FF+['-v','error','-i',str(p),'-vn','-ar','48000','-ac','2','-threads','2','-f','f32le','-'],capture_output=True).stdout
 samples=array.array('f');samples.frombytes(pcm)
 exactPeak=20*math.log10(max(abs(x) for x in samples))
 scene='memory-architecture.js' if v=='baseline' else 'scene.js'
 js=f"const f=require('./video/memory-architecture/{v}/engine/flow-engine.js');require('./video/memory-architecture/{v}/{scene}');const s=f.createScene(f.lastScene);console.log(JSON.stringify(s.audioCues()));"
 cues=json.loads(subprocess.check_output(['node','-e',js]))
 cueChecks=[]
 for c in cues:
  a=max(0,int(c['t']*48000)*2);b=min(len(samples),a+int(.16*48000)*2)
  rms=math.sqrt(sum(x*x for x in samples[a:b])/max(1,b-a))
  cueChecks.append({'time':c['t'],'preset':c['name'],'rmsDbFS':round(20*math.log10(max(rms,1e-12)),2)})
 (d/'cue-analysis.json').write_text(json.dumps(cueChecks,indent=2))
 first=Image.open(names[0]).convert('RGB');last=Image.open(names[-1]).convert('RGB')
 same=ImageChops.difference(first,last).getbbox() is None
 at=atoms(p);types=[a['type'] for a in at];fast=types.index('moov')<types.index('mdat')
 checks={'fullDecode':True,'codec':video['codec_name'],'width':video['width'],'height':video['height'],'fps':video['r_frame_rate'],'pixFmt':video['pix_fmt'],'audioCodec':audio['codec_name'],'duration':duration,'frameCount':count,'faststart':fast,'firstLastPixelsEqual':same,'volumedetectPeakDbFS':peak,'decodedSamplePeakDbFS':round(exactPeak,4),'cueCount':len(cues),'allCueWindowsNonSilent':all(c['rmsDbFS']>-70 for c in cueChecks),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'audioHeard':False,'selectedFrames':nums,'atoms':at}
 checks['passed']=all([video['codec_name']=='h264',video['width']==1080,video['height']==1920,video['r_frame_rate']=='30/1',video['pix_fmt']=='yuv420p',audio['codec_name']=='aac',fast,same,exactPeak<=-.5,checks['allCueWindowsNonSilent']])
 results[v]=checks
 print(v,json.dumps({k:val for k,val in checks.items() if k not in ['atoms','selectedFrames']}),flush=True)
(OUT/'verification.json').write_text(json.dumps(results,indent=2))
assert all(v['passed'] for v in results.values()),'Verification failure: inspect report'

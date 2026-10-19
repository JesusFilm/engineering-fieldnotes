"""Encoded checks for this topic only. Run from repository root. No listening claim."""
from pathlib import Path
import subprocess,json,hashlib,struct,re
import numpy as np
from PIL import Image,ImageDraw
R=Path('reviews/comparisons/loop-engineering');S=R/'scratch/final'
FF=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(a,**kw):return subprocess.run(a,check=True,**kw)
def capture(a):return subprocess.check_output(a)
TIMES={'baseline':[0,1.5,3,4.5,6,7.5,9,10.5,12,12.8,13.7,14.5,16,17.5,19,19.5,20.5,22,23.5], 'astra':[0,1.4,2,3.5,4.7,5.8,6.5,8.5,9.5,10.7,11.5,12.5,14,14.5,15.7,17,18.3,19,20.5,21.5,23,25,27.9], 'fable':[0,.9,1.5,2.7,3.5,4.7,6.2,7.2,8.2,9.8,10.7,11.5,12.5,13.5,14.2,15.5,16.5,17.2,18,19.2,20.4,21.8,22.7,24,25.4,26,26.8,27.5,29,30.7]}
results={}
for name in TIMES:
 p=S/f'{name}.mp4';out=S/name;out.mkdir(exist_ok=True)
 probe=json.loads(capture(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 (out/'ffprobe.json').write_text(json.dumps(probe,indent=2)+'\n')
 v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio')
 assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'],v['avg_frame_rate'],a['codec_name'])==('h264',1080,1920,'yuv420p','30/1','30/1','aac')
 dec=subprocess.run(FF+['-xerror','-i',str(p),'-map','0:v:0','-map','0:a:0','-f','null','-'],capture_output=True,text=True)
 (out/'decode.log').write_text(dec.stderr);assert dec.returncode==0 and not dec.stderr
 hashes=capture(FF+['-i',str(p),'-map','0:v:0','-f','framemd5','-']).decode();(out/'frames.md5').write_text(hashes)
 h=[l.split(',')[-1].strip() for l in hashes.splitlines() if not l.startswith('#') and l.strip()]
 assert len(h)==int(v['nb_frames']);assert h[0]==h[-1],(name,'boundary mismatch',h[0],h[-1])
 raw=p.read_bytes();atoms=[];pos=0
 while pos+8<=len(raw):
  size,typ=struct.unpack('>I4s',raw[pos:pos+8]);size=struct.unpack('>Q',raw[pos+8:pos+16])[0] if size==1 else size
  if size==0:size=len(raw)-pos
  atoms.append({'type':typ.decode('ascii','replace'),'offset':pos,'size':size});pos+=size
 assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
 pcm=np.frombuffer(capture(FF+['-i',str(p),'-vn','-f','f32le','-acodec','pcm_f32le','-ac','2','-ar','44100','-threads','2','-']),dtype='<f4').reshape(-1,2)
 peak=float(20*np.log10(np.max(np.abs(pcm))));assert peak<=-.5
 timeline=json.loads((S/f'{name}-timeline.json').read_text());cues=[]
 for cue in timeline['cues']:
  t=cue['t'];win=pcm[int(t*44100):int((t+.15)*44100)]
  rms=float(20*np.log10(max(1e-12,np.sqrt(np.mean(win**2)))))
  cues.append({'t':t,'sound':cue['name'],'rmsFirst150msDBFS':rms});assert rms>-65,(name,t,'silent cue')
 (out/'audio-cues.json').write_text(json.dumps(cues,indent=2)+'\n')
 run(FF+['-i',str(p),'-lavfi','showspectrumpic=s=1200x420:fscale=log:legend=1','-frames:v','1','-threads','2',str(out/'spectrum.png')])
 # Constant title ROI: every decoded frame should match its stable title except deliberate fades.
 pixels=np.frombuffer(capture(FF+['-i',str(p),'-vf','crop=1080:200:0:240,scale=270:50','-pix_fmt','gray','-f','rawvideo','-threads','2','-']),dtype=np.uint8).reshape(-1,50,270)
 visible={'baseline':[(.5,12.4),(13.7,22.8)],'astra':[(.9,25.5)],'fable':[(.6,13.55),(15.05,29.65)]}[name]
 ref=pixels[30].astype(float);diff=np.abs(pixels.astype(float)-ref).mean(axis=(1,2));stable=[i for i in range(len(pixels)) if any(lo<=i/30<hi for lo,hi in visible)]
 titlemax=float(max(diff[stable]));assert titlemax<1.5,(name,'title dropout',titlemax)
 for t in TIMES[name]:
  run(FF+['-ss',str(t),'-i',str(p),'-frames:v','1','-threads','2',str(out/f't{t}.png')])
 run(FF+['-i',str(p),'-vf',f'select=eq(n\\,{len(h)-1})','-fps_mode','passthrough','-threads','2',str(out/'last.png')])
 for start in range(0,len(TIMES[name]),5):
  subset=TIMES[name][start:start+5];sheet=Image.new('RGB',(350*len(subset),650),'#101010');d=ImageDraw.Draw(sheet)
  for i,t in enumerate(subset):
   im=Image.open(out/f't{t}.png');im.resize((350,622)).save(out/f'phone-t{t}.png');sheet.paste(im.resize((350,622)),(i*350,28));d.text((i*350+10,8),f'{name} {t:.2f}s',fill='white')
  sheet.save(out/f'phone-{start}.png')
 run(FF+['-i',str(p),'-vf','fps=1,scale=270:480,tile=6x6','-frames:v','1','-threads','2',str(out/'contact.png')])
 results[name]={'sha256':hashlib.sha256(raw).hexdigest(),'duration':float(probe['format']['duration']),'frames':len(h),'video':'h264 1080x1920 30fps yuv420p','audio':a['codec_name'],'maxAudioDBFS':peak,'fullDecode':True,'firstLastExact':True,'boundaryMD5':h[0],'faststart':True,'atoms':atoms,'titleROImaxMeanAbsoluteDifference':titlemax,'cueWindowsChecked':len(cues),'audioHeard':False,'inspectedFrameCandidates':TIMES[name]}
 print(name,results[name],flush=True)
(R/'encoded-checks.json').write_text(json.dumps(results,indent=2)+'\n')

#!/usr/bin/env python3
"""Topic-only encoded verification. Writes solely inside this comparison folder.
Run from repository root: python3 reviews/comparisons/timeouts-and-retries/verify.py
Requires ffmpeg/ffprobe, Node, Pillow and NumPy. Does not constitute listening.
"""
from pathlib import Path
import subprocess,json,hashlib,re,struct,wave
import numpy as np
from PIL import Image,ImageDraw
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
SCRATCH=BASE/'scratch'/'final';SCRATCH.mkdir(parents=True,exist_ok=True)
FF=['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-filter_complex_threads','2']
BEATS={
'baseline':[0,.9,1.6,2.3,3.2,3.9,5.5,6.2,7.5,8.2,9.97,10.1,11,12.1,12.6,13.17,13.4,14.47,14.6,14.9,15.4,16.2,16.7,17.2,18.3,19.47,19.9,20.4],
'astra':[0,.8,1.3,2.3,3.4,4.3,5,6.97,7.2,7.7,8.3,9.2,12.97,13.2,14,14.97,15.2,15.5,16,18,19.97,20.2,20.8,21.2,22.3,22.63,23.3,24.6,25.2,25.6],
'sol':[0,.6,1,1.65,2.5,3.2,3.6,5.5,6.15,6.7,7,7.45,7.85,8.2,8.6,9.3,9.75,10.05,10.6,11.2,11.5,11.95,12.35,12.65,13.1,13.5,13.8,14.3,15.7,16.3,17.8,18.65,19.3,19.6,20.2,20.8,21.6,21.9,22.5,23.3,24.4,24.7,25.2,26.1,26.5,28,29.5,30,30.5]
}
def run(args,**kwargs):return subprocess.run(args,check=True,capture_output=True,**kwargs)
reports={}
for cut,times in BEATS.items():
 d=SCRATCH/cut;d.mkdir(exist_ok=True)
 media=ROOT/f'public/media/timeouts-and-retries/{cut}.mp4';data=media.read_bytes()
 probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(media)]).stdout)
 (d/'probe.json').write_text(json.dumps(probe,indent=2))
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['avg_frame_rate'],v['pix_fmt'])==('h264',1080,1920,'30/1','30/1','yuv420p')
 assert a['codec_name']=='aac'
 count=int(v['nb_frames']);assert count==round(float(v['duration'])*30)
 dec=run(FF+['-v','error','-xerror','-i',str(media),'-threads','2','-f','null','-']);assert not dec.stderr
 (d/'full-decode.txt').write_text('Full audiovisual decode: exit 0, no warnings.\n')
 md5=run(FF+['-v','error','-i',str(media),'-map','0:v','-threads','2','-f','framemd5','-']).stdout.decode()
 (d/'framemd5.txt').write_text(md5);rows=[x for x in md5.splitlines() if x and not x.startswith('#')]
 assert len(rows)==count
 first,last=[rows[i].split(',')[-1].strip() for i in [0,-1]];assert first==last,(cut,'YUV boundary mismatch')
 raw=run(FF+['-v','error','-i',str(media),'-vf',f'select=eq(n\\,0)+eq(n\\,{count-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','-']).stdout
 frame_bytes=1080*1920*3;assert len(raw)==frame_bytes*2 and raw[:frame_bytes]==raw[frame_bytes:]
 for name,chunk in [('first',raw[:frame_bytes]),('last',raw[frame_bytes:])]:Image.frombytes('RGB',(1080,1920),chunk).save(d/f'{name}.png')
 atoms=[];offset=0
 while offset+8<=len(data):
  size,typ=struct.unpack('>I4s',data[offset:offset+8]);header=8
  if size==1:size=struct.unpack('>Q',data[offset+8:offset+16])[0];header=16
  if size==0:size=len(data)-offset
  assert size>=header;atoms.append([typ.decode(),offset,size]);offset+=size
 assert next(a[1] for a in atoms if a[0]=='moov')<next(a[1] for a in atoms if a[0]=='mdat')
 volume=run(FF+['-i',str(media),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode()
 (d/'volume.txt').write_text(volume);peak=float(re.search(r'max_volume: ([-\d.]+) dB',volume)[1]);assert peak<=-.5
 run(FF+['-y','-v','error','-i',str(media),'-map','0:a','-ac','2','-c:a','pcm_s16le','-threads','2',str(d/'decoded.wav')])
 scene='timeouts-and-retries.js' if cut=='baseline' else 'scene.js'
 js="const F=require('./engine/flow-engine.js');require('./"+scene+"');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues()));"
 cues=json.loads(run(['node','-e',js],cwd=ROOT/f'video/timeouts-and-retries/{cut}').stdout)
 with wave.open(str(d/'decoded.wav')) as w:
  rate=w.getframerate();pcm=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,2).astype(float)/32768
 cue_evidence=[]
 for cue in cues:
  t=cue['t'];seg=pcm[int(t*rate):int((t+.18)*rate)]
  p=float(20*np.log10(max(np.abs(seg).max(),1e-10)));assert p>-55,(cut,cue,p)
  cue_evidence.append({'t':t,'preset':cue['name'],'decodedPeakWithin180msDbFS':round(p,2)})
 (d/'cue-evidence.json').write_text(json.dumps(cue_evidence,indent=2))
 run(FF+['-y','-v','error','-i',str(media),'-lavfi','showspectrumpic=s=1400x400:fscale=log:legend=1','-frames:v','1','-threads','2',str(d/'spectrogram.png')])
 # Exact chosen frame numbers, one sequential decode rather than approximate seeks.
 ns=sorted(set([round(t*30) for t in times]+[count-1]));expr='+'.join(f'eq(n\\,{n})' for n in ns)
 run(FF+['-y','-v','error','-i',str(media),'-vf','select='+expr,'-fps_mode','passthrough','-threads','2',str(d/'frame-%03d.png')])
 manifest=[]
 for i,n in enumerate(ns):
  p=d/f'frame-{i+1:03d}.png';im=Image.open(p);im.resize((350,622),Image.Resampling.LANCZOS).save(d/f'phone-{i+1:03d}.png')
  manifest.append({'frame':n,'time':n/30,'full':p.name,'phone':f'phone-{i+1:03d}.png'})
 for j in range(0,len(ns),9):
  sheet=Image.new('RGB',(1050,650*3),'#141414');draw=ImageDraw.Draw(sheet)
  for k,item in enumerate(manifest[j:j+9]):
   x=(k%3)*350;y=(k//3)*650;sheet.paste(Image.open(d/item['phone']),(x,y+28));draw.text((x+4,y+5),f"{cut} {item['time']:.3f}s n={item['frame']}",fill='white')
  sheet.save(d/f'beats-{j//9+1}.jpg',quality=95)
 (d/'frame-manifest.json').write_text(json.dumps(manifest,indent=2))
 poster=media.with_suffix('.jpg');poster_probe=json.loads(run(['ffprobe','-v','error','-show_streams','-of','json',str(poster)]).stdout)['streams'][0]
 assert poster_probe['codec_name']=='mjpeg' and (poster_probe['width'],poster_probe['height'])==(1080,1920)
 reports[cut]={'sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),'duration':float(v['duration']),'frames':count,'bytes':len(data),'codec':v['codec_name'],'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'fullDecode':True,'firstLastExactRGB':True,'firstFrameMd5':first,'lastFrameMd5':last,'faststart':True,'atoms':atoms,'audioPeakDbFS':peak,'auditedCueCount':len(cue_evidence),'audioPhysicallyHeard':False,'frameManifest':str((d/'frame-manifest.json').relative_to(BASE))}
 print(cut,'passed',reports[cut]['sha256'],peak,'dBFS',flush=True)
(BASE/'encoded-verification.json').write_text(json.dumps(reports,indent=2)+'\n')

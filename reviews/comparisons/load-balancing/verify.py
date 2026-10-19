"""Topic-only final encoded checks. Run from repository root; outputs stay in this review."""
from pathlib import Path
import subprocess,json,hashlib,struct,re,array,math
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[3]
REVIEW=Path(__file__).resolve().parent
FF=['ffmpeg','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):return subprocess.run(list(map(str,args)),capture_output=True,check=True).stdout
report={}
beats={'baseline':[0,1.5,3.5,6.8,7.05,7.4,8.2,10.5,12.4,13.1,13.45,13.8,14.7,15.5,17.5,19,20],
'astra':[0,2.5,4.5,7,9,10,11.9,12.7,14.5,15.9,16.5,18,19.5,20.5,22,22.6,23.2,24.8,26.4,27],
'fable':[0,2,4,6,7.5,8.8,10.5,12.5,13.6,14.3,14.8,15.2,15.4,15.9,16.9,18.5,19,20.1,21.7,22.7,23.5,24.6,24.9,25.4,26.9,28.5,30,31.3]}
for n in beats:
 p=ROOT/f'public/media/load-balancing/{n}.mp4';out=REVIEW/'scratch'/n/'final';out.mkdir(parents=True,exist_ok=True)
 probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',p]));v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['avg_frame_rate'],v['pix_fmt'],a['codec_name'])==('h264',1080,1920,'30/1','30/1','yuv420p','aac')
 nf=int(v['nb_frames']);d=p.read_bytes();assert len(d)<3_000_000
 decode=subprocess.run(list(map(str,FF+['-xerror','-i',p,'-threads','2','-f','null','-'])),capture_output=True,check=True);assert not decode.stderr
 boundary=run(FF+['-i',p,'-vf',f'select=eq(n\\,0)+eq(n\\,{nf-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','-']);framebytes=1080*1920*3
 assert len(boundary)==framebytes*2 and boundary[:framebytes]==boundary[framebytes:],n+' seam'
 for k,label in enumerate(['first','last']):Image.frombytes('RGB',(1080,1920),boundary[k*framebytes:(k+1)*framebytes]).save(out/f'{label}.png')
 boxes=[];pos=0
 while pos+8<=len(d):
  length,kind=struct.unpack('>I4s',d[pos:pos+8]);kind=kind.decode();boxes.append({'type':kind,'offset':pos})
  if length==1:length=struct.unpack('>Q',d[pos+8:pos+16])[0]
  if length==0:length=len(d)-pos
  assert length>=8;pos+=length
 assert next(b['offset'] for b in boxes if b['type']=='moov')<next(b['offset'] for b in boxes if b['type']=='mdat')
 volume=subprocess.run(list(map(str,FF+['-hide_banner','-loglevel','info','-i',p,'-vn','-af','volumedetect','-threads','2','-f','null','-'])),capture_output=True,check=True).stderr.decode();(out/'volume.log').write_text(volume)
 peak=float(re.search(r'max_volume: ([-\d.]+) dB',volume)[1]);assert -40<peak<=-0.5
 pcm=array.array('f',run(FF+['-i',p,'-vn','-ar','44100','-ac','2','-threads','2','-f','f32le','-']))
 cues=json.loads(run(['node', REVIEW/'extract-cues.cjs', ROOT/f'video/load-balancing/{n}']));cuelevels=[]
 for c in cues:
  samples=pcm[int(c['t']*44100)*2:int((c['t']+.16)*44100)*2]
  cp=max(abs(x) for x in samples);db=20*math.log10(max(cp,1e-9));assert db>-55,(n,c,db)
  cuelevels.append({'time':c['t'],'cue':c['name'],'windowPeakDbFS':round(db,2)})
 run(FF+['-y','-i',p,'-lavfi','showspectrumpic=s=1400x450:fscale=log','-frames:v','1','-threads','2',out/'spectrogram.png'])
 # Exact frame indexes, not approximate keyframe seeks.
 ts=beats[n]+[(nf-1)/30]
 indexes=sorted(set(min(round(t*30),nf-1) for t in ts))
 expr='+'.join(f'eq(n\\,{i})' for i in indexes)
 run(FF+['-y','-i',p,'-vf',f'select={expr}','-fps_mode','passthrough','-threads','2',out/'beat-%03d.png'])
 for start in range(0,len(indexes),9):
  rows=math.ceil(min(9,len(indexes)-start)/3);sheet=Image.new('RGB',(1080,rows*650),'#242424');draw=ImageDraw.Draw(sheet)
  for k,idx in enumerate(indexes[start:start+9]):
   im=Image.open(out/f'beat-{start+k+1:03d}.png').resize((350,622));x=k%3*360;y=k//3*650;sheet.paste(im,(x,y+24));draw.text((x+6,y+4),f'{n} {idx/30:.3f}s frame {idx}',fill='white')
  sheet.save(out/f'phone-{start//9}.jpg')
 (out/'frames.json').write_text(json.dumps([{'file':f'beat-{k+1:03d}.png','frame':i,'time':i/30} for k,i in enumerate(indexes)],indent=2))
 # Regenerate revised posters from final encodes; baseline poster remains authored.
 poster=p.with_suffix('.jpg')
 if n!='baseline':run(FF+['-y','-ss',12.7 if n=='astra' else 14,'-i',p,'-frames:v','1','-q:v','2','-threads','2',poster])
 picture=Image.open(poster);assert picture.size==(1080,1920)
 # Every static title-band frame is checked for raster dropout, not only samples.
 titlecheck=None
 if n!='baseline':
  small=run(FF+['-i',p,'-an','-vf','crop=800:150:140:260,scale=80:15','-pix_fmt','rgb24','-threads','2','-f','rawvideo','-']);counts=[]
  for idx in (range(30,792) if n=='astra' else range(nf)):
   pix=small[idx*3600:(idx+1)*3600];counts.append(sum(pix[k]>100 and pix[k+1]>70 and pix[k+2]<90 for k in range(0,len(pix),3)))
  assert min(counts)>100,(n,min(counts));titlecheck={'frames':len(counts),'minimumYellowPixels':min(counts)}
 report[n]={'sha256':hashlib.sha256(d).hexdigest(),'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),'duration':float(v['duration']),'frames':nf,'bytes':len(d),'videoCodec':v['codec_name'],'dimensions':[1080,1920],'fps':30,'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'fullDecode':True,'firstLastIdentical':True,'boundaryRGBSha256':hashlib.sha256(boundary[:framebytes]).hexdigest(),'faststart':True,'boxes':boxes,'audioPeakDbFS':peak,'audioHeard':False,'cueWindowCount':len(cuelevels),'cueWindows':cuelevels,'titleRaster':titlecheck,'sampledFrames':len(indexes)}
 print(n,report[n]['sha256'],peak,len(d),flush=True)
(REVIEW/'encoded-checks.json').write_text(json.dumps(report,indent=2)+'\n')

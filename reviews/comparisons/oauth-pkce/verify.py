"""Topic-only final encoded checks. Re-run from repository root; no shared manifests."""
from pathlib import Path
import subprocess,json,hashlib,struct,re,array,math,datetime,argparse
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
SCRATCH=HERE/'scratch';SCRATCH.mkdir(exist_ok=True)
TIMES={
'baseline':[1.5,3.2,6.5,9.1,9.4,9.7,12.2,13.6,16,17,19.4,21,23,25.966],
'astra':[1.5,2.5,4.3,7.5,9.5,11.8,12.5,13.5,14.5,15.6,18.6,19.8,21.5,23.5,24.6,26.6,28.6,29.966],
'sol':[1.5,2.3,3.9,5.9,6.9,7.6,8.5,10.9,11.7,12.6,13.7,14.6,15.5,16.6,17.2,17.9,18.9,19.9,20.7,22.5,23.2,24.2,25.4,26.4,27.2,28.5,30.7,31.966]}
def ff(*args):
 return subprocess.check_output(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)])
parser=argparse.ArgumentParser();parser.add_argument('--cut',choices=list(TIMES));args=parser.parse_args()
reports=json.loads((HERE/'verification.json').read_text())['cuts'] if args.cut and (HERE/'verification.json').exists() else {}
for cut,times in TIMES.items():
 if args.cut and cut!=args.cut:continue
 media=ROOT/f'public/media/oauth-pkce/{cut}.mp4';out=SCRATCH/f'final-{cut}';out.mkdir(exist_ok=True)
 data=media.read_bytes();probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(media)]))
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'],a['codec_name'])==('h264',1080,1920,'30/1','yuv420p','aac')
 n=int(v['nb_frames']);dur=float(v['duration']);assert n==round(dur*30)
 dec=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(media),'-threads','2','-f','null','-'],capture_output=True,check=True);assert not dec.stderr
 boundary=ff('-i',media,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1')
 size=1080*1920*3;assert len(boundary)==2*size
 first,last=boundary[:size],boundary[size:];assert first==last,(cut,'boundary mismatch')
 for label,b in [('first',first),('last',last)]:Image.frombytes('RGB',(1080,1920),b).save(out/f'{label}.png')
 vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(media),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
 (out/'volume.txt').write_text(vol);peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1));assert -40<peak<=-.5
 boxes={};pos=0
 while pos+8<=len(data):
  length,kind=struct.unpack('>I4s',data[pos:pos+8])
  if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0]
  if length==0:length=len(data)-pos
  assert length>=8;boxes[kind.decode()]=pos;pos+=length
 assert boxes['moov']<boxes['mdat'];assert len(data)<3_000_000
 scene='oauth-pkce.js' if cut=='baseline' else 'scene.js'
 js="const F=require('./engine/flow-engine.js');require('./%s');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"%scene
 cues=json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT/f'video/oauth-pkce/{cut}'))
 pcm=array.array('h',ff('-i',media,'-vn','-ac','1','-ar','44100','-threads','2','-f','s16le','pipe:1'))
 checks=[]
 for c in cues:
  xs=pcm[int(c['t']*44100):int((c['t']+.15)*44100)]
  rms=20*math.log10(max(1e-10,math.sqrt(sum(x*x for x in xs)/max(1,len(xs)))/32768))
  assert rms>-55,(cut,c,rms);checks.append({**c,'decodedRmsDbfs':round(rms,2)})
 (out/'cues.json').write_text(json.dumps(checks,indent=2)+'\n')
 ff('-i',media,'-lavfi','showspectrumpic=s=1400x420:fscale=log:legend=1','-frames:v','1','-threads','2',out/'spectrogram.png')
 ff('-i',media,'-vf','fps=2,scale=350:-1','-threads','2',out/'seq-%03d.jpg')
 files=sorted(out.glob('seq-*.jpg'))
 for start in range(0,len(files),12):
  sheet=Image.new('RGB',(1400,1953),'#222');draw=ImageDraw.Draw(sheet)
  for j,f in enumerate(files[start:start+12]):
   x=j%4*350;y=j//4*651;sheet.paste(Image.open(f),(x,y+25));draw.text((x+8,y+6),f'{cut} {(start+j)*.5+.25:.2f}s',fill='white')
  sheet.save(out/f'contact-{start//12}.jpg')
 for t in times:
  p=out/f'full-{t:g}.png';ff('-ss',t,'-i',media,'-frames:v','1','-threads','2',p)
  Image.open(p).resize((350,622)).save(out/f'phone-{t:g}.png')
 poster=media.with_suffix('.jpg');pt={'baseline':17,'astra':24.6,'sol':20.9}[cut]
 ff('-ss',pt,'-i',media,'-frames:v','1','-q:v','2','-threads','2',poster)
 reports[cut]={'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'duration':dur,'frames':n,'codec':'h264','width':1080,'height':1920,'fps':'30/1','pixelFormat':'yuv420p','audioCodec':'aac','audioPeakDbfs':peak,'faststart':True,'mp4BoxOffsets':boxes,'fullDecode':True,'matchingBoundaryFrames':True,'firstFrameRgbSha256':hashlib.sha256(first).hexdigest(),'lastFrameRgbSha256':hashlib.sha256(last).hexdigest(),'cueCount':len(cues),'cueWindowsAboveMinus55Dbfs':True,'audioHeard':False,'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),'nativeAndPhoneFrameTimes':times}
 print(cut,peak,len(data),reports[cut]['sha256'],flush=True)
(HERE/'verification.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'cuts':reports},indent=2)+'\n')

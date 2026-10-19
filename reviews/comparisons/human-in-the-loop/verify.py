"""Reproducible encoded verification; all FFmpeg workers/filter pools <= 2."""
import array,hashlib,json,math,struct,subprocess,sys
from pathlib import Path
from PIL import Image,ImageChops,ImageDraw
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent/'scratch/final'
OUT.mkdir(parents=True,exist_ok=True)
TIMES={'baseline':[0,1.7,3.1,5.3,6.7,7.3,8.8,11.3,12.2,14.3,16.5,17.9,18.7,20.7,21.5,24.4,25.966667], 'astra':[0,1.2,4.2,6.2,6.8,9.5,10.5,12.2,13.2,13.8,14.8,18.3,20.7,21.7,23.5,24.2,25.8,28.4,29.966667], 'fable':[0,1.6,2.2,3.8,4.6,6.6,7.2,7.9,8.8,9.8,10.7,11.9,13.3,14.6,14.95,15.5,15.85,16.5,18.2,19.2,21.2,22.5,23.9,24.8,26.0,27.5,29.0,30.166667]}
report={}
def ff(*args):return subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args],capture_output=True,check=True)
for name in TIMES:
 p=ROOT/'public/media/human-in-the-loop'/f'{name}.mp4'
 if name=='fable' and '--candidate-fable' in sys.argv:p=OUT.parent/'fable-revised.mp4'
 dest=OUT/name;dest.mkdir(exist_ok=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)]))
 (dest/'probe.json').write_text(json.dumps(probe,indent=2))
 v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio')
 assert(v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'])==('h264',1080,1920,'30/1','yuv420p')
 assert a['codec_name']=='aac'
 decode=ff('-xerror','-i',str(p),'-map','0:v:0','-map','0:a:0','-f','null','-');(dest/'decode.log').write_bytes(decode.stderr)
 count=int(v['nb_read_frames'])
 atoms=[];buf=p.read_bytes();i=0
 while i+8<=len(buf):
  size,typ=struct.unpack('>I4s',buf[i:i+8]);size=struct.unpack('>Q',buf[i+8:i+16])[0] if size==1 else size or len(buf)-i
  atoms.append({'type':typ.decode(),'offset':i,'size':size});i+=size
 types=[x['type'] for x in atoms];assert types.index('moov')<types.index('mdat')
 sel='+'.join(f'eq(n\\,{n})' for n in sorted(set(round(t*30) for t in TIMES[name])|{0,count-1}))
 ff('-i',str(p),'-vf',f'select={sel}','-fps_mode','vfr','-threads','2',str(dest/'full-%03d.png'))
 frames=sorted(dest.glob('full-*.png'));nums=sorted(set(round(t*30) for t in TIMES[name])|{0,count-1})
 assert len(frames)==len(nums)
 first=Image.open(frames[0]);last=Image.open(frames[-1]);assert ImageChops.difference(first,last).getbbox() is None, name+' loop mismatch'
 (dest/'frame-times.json').write_text(json.dumps(dict(zip([f.name for f in frames],[n/30 for n in nums])),indent=2))
 for idx in range(0,len(frames),4):
  sheet=Image.new('RGB',(1400,650),(24,24,24));draw=ImageDraw.Draw(sheet)
  for j,f in enumerate(frames[idx:idx+4]):
   phone=Image.open(f).resize((350,622));phone.save(dest/f'phone-{nums[idx+j]:04d}.png');sheet.paste(phone,(j*350,0));draw.text((j*350+5,628),f'{name} {nums[idx+j]/30:.3f}s',fill='white')
  sheet.save(dest/f'panel-{idx//4}.jpg')
 # Decode floating-point audio: peaks can exceed 1, unlike signed PCM conversion.
 raw=ff('-i',str(p),'-map','0:a:0','-c:a','pcm_f32le','-threads','2','-f','f32le','-').stdout
 samples=array.array('f');samples.frombytes(raw);peak=max(abs(x) for x in samples);db=20*math.log10(peak)
 assert db<=-0.5,(name,db)
 sr=int(a['sample_rate']);ch=a['channels'];rms=[]
 for off in range(0,len(samples),int(sr*.05)*ch):
  block=samples[off:off+int(sr*.05)*ch];rms.append(20*math.log10(max(1e-12,math.sqrt(sum(x*x for x in block)/len(block)))))
 (dest/'audio-windows.json').write_text(json.dumps({'stepSeconds':.05,'rmsDbfs':rms},indent=2))
 ff('-i',str(p),'-lavfi','showspectrumpic=s=1400x400:legend=1:fscale=log','-frames:v','1','-threads','2',str(dest/'spectrum.png'))
 report[name]={'sha256':hashlib.sha256(buf).hexdigest(),'duration':float(v['duration']),'frames':count,'codec':'h264','width':1080,'height':1920,'fps':30,'pixelFormat':'yuv420p','audioCodec':'aac','audioPeakDbfs':round(db,4),'fullDecode':True,'firstLastPixelsEqual':True,'firstFrameRgbSha256':hashlib.sha256(first.tobytes()).hexdigest(),'lastFrameRgbSha256':hashlib.sha256(last.tobytes()).hexdigest(),'faststart':True,'atoms':atoms,'audioHeard':False,'fullSizeAnd350pxFrameTimes':[n/30 for n in nums]}
 print(name,report[name]['sha256'],count,round(db,3),flush=True)
(OUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')

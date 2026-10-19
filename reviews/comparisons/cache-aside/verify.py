"""Topic-only encoded checks; outputs stay in this comparison folder. No shared manifest writes."""
from pathlib import Path
import json,subprocess,hashlib,struct,re,wave,array,math
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
S=HERE/'scratch/final';S.mkdir(parents=True,exist_ok=True)
FF=['ffmpeg','-hide_banner','-y','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def ff(args):return subprocess.run(FF+args[:-1]+['-threads','2',args[-1]],capture_output=True,check=True)
beats={'baseline':[0,.6,2,3.6,5.5,6.5,8.5,10.4,11.6,13.7,14.5,16.4,17.5,19,21.3,22.2,23.3], 'astra':[0,1.3,2.7,4.7,6.5,9.6,11.5,12.4,14.5,15.3,18.7,20.1,21.2,22,23.6,26.7,28.5,29.5,30.4], 'fable':[0,1.8,2.8,4.4,5,5.8,7.1,7.8,9,10.5,11,11.6,12,12.7,13.2,14,16,17.1,19.6,20.6,22.3,23.1,24.5,25.7,26.6,27.2,28,30.2,31.2]}
subprocess.run(['node',str(HERE/'cues.cjs')],cwd=ROOT,check=True)
results={}
for v,times in beats.items():
 d=S/v;d.mkdir(exist_ok=True);f=ROOT/f'public/media/cache-aside/{v}.mp4'
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)]))
 video=next(x for x in probe['streams'] if x['codec_type']=='video');audio=next(x for x in probe['streams'] if x['codec_type']=='audio');n=int(video['nb_frames']);duration=float(probe['format']['duration'])
 assert [video[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate']]==['h264',1080,1920,'yuv420p','30/1'];assert audio['codec_name']=='aac'
 dec=ff(['-v','error','-xerror','-err_detect','explode','-i',str(f),'-map','0:v:0','-map','0:a:0','-f','null','-']);assert not dec.stderr
 (d/'decode.log').write_bytes(dec.stderr)
 idxs=sorted(set([round(t*30) for t in times]+[n-1]));sel='+'.join(f'eq(n\\,{i})' for i in idxs)
 ff(['-v','error','-i',str(f),'-vf','select='+sel,'-fps_mode','passthrough',str(d/'frame_%03d.png')])
 for j,idx in enumerate(idxs,1):
  p=d/f'frame_{j:03d}.png';p.rename(d/f'{idx/30:06.2f}.png');im=Image.open(d/f'{idx/30:06.2f}.png');im.resize((350,622)).save(d/f'{idx/30:06.2f}-350.png')
 first=Image.open(d/'000.00.png');last=Image.open(d/f'{(n-1)/30:06.2f}.png');assert first.tobytes()==last.tobytes()
 for start in range(0,len(idxs),4):
  sheet=Image.new('RGB',(1400,646),'#222');draw=ImageDraw.Draw(sheet)
  for j,idx in enumerate(idxs[start:start+4]):sheet.paste(Image.open(d/f'{idx/30:06.2f}-350.png'),(350*j,24));draw.text((350*j+8,5),f'{v} {idx/30:.2f}s',fill='white')
  sheet.save(d/f'phone_{start//4}.jpg')
 ff(['-v','error','-i',str(f),'-vf','fps=2,scale=240:-1,tile=6x2','-fps_mode','passthrough',str(d/'contact_%02d.jpg')])
 vol=ff(['-i',str(f),'-vn','-af','volumedetect','-f','null','-']).stderr.decode();(d/'volume.log').write_text(vol)
 peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1));assert peak<=-.5
 ff(['-v','error','-i',str(f),'-lavfi','showspectrumpic=s=1600x400:legend=1:fscale=log','-frames:v','1',str(d/'spectrogram.png')])
 ff(['-v','error','-i',str(f),'-vn','-acodec','pcm_s16le',str(d/'audio.wav')])
 with wave.open(str(d/'audio.wav'),'rb') as w:sr=w.getframerate();ch=w.getnchannels();samples=array.array('h',w.readframes(w.getnframes()))
 timeline=json.loads((HERE/f'scratch/{v}-timeline.json').read_text());energies=[]
 for cue in timeline['cues']:
  t=cue['t'];seg=samples[int(t*sr)*ch:int((t+.12)*sr)*ch];rms=20*math.log10(max(1e-9,math.sqrt(sum(x*x for x in seg)/len(seg))/32768));assert rms>-65,(v,t,rms)
  energies.append({'t':round(t,4),'cue':cue['name'],'rmsDbFS':round(rms,2)})
 blob=f.read_bytes();pos=0;atoms=[]
 while pos+8<=len(blob):
  size,kind=struct.unpack('>I4s',blob[pos:pos+8]);head=8
  if size==1:size=struct.unpack('>Q',blob[pos+8:pos+16])[0];head=16
  if size==0:size=len(blob)-pos
  assert size>=head;atoms.append({'type':kind.decode(),'offset':pos});pos+=size
 assert next(a['offset'] for a in atoms if a['type']=='moov')<next(a['offset'] for a in atoms if a['type']=='mdat')
 record={'sha256':hashlib.sha256(blob).hexdigest(),'duration':duration,'frames':n,'video':{k:video[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate']},'audio':{k:audio[k] for k in ['codec_name','sample_rate','channels']},'fullDecodeClean':True,'firstLastDecodedPixelsIdentical':True,'firstFrameTime':0,'lastFrameTime':(n-1)/30,'faststart':True,'atoms':atoms,'audioPeakDbFS':peak,'cueEnergyChecks':energies,'audioHeard':False,'exactBeatFrames':[i/30 for i in idxs],'technicalChecksPass':True}
 results[v]=record;print(v,n,peak,'PASS',flush=True)
(HERE/'encoded-checks.json').write_text(json.dumps(results,indent=2)+'\n')

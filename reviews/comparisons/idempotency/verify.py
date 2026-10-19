"""Hash-bound encoded evidence. Run from the repository root; no shared files are written."""
import array,hashlib,json,math,pathlib,re,struct,subprocess
from PIL import Image,ImageDraw
ROOT=pathlib.Path(__file__).resolve().parents[3]
HERE=pathlib.Path(__file__).resolve().parent
SCR=HERE/'scratch'/'final';SCR.mkdir(parents=True,exist_ok=True)
BEATS={'baseline':[1.5,2.9,4.3,7.8,10.3,11.8,14.3,17.3,18.8,20.4,22.3,24.7,25.96], 'astra':[1.8,3.9,6.95,9.9,11.5,13.7,16.9,19.3,21.7,23.4,25.3,28.7,29.96], 'fable':[2.5,5.7,7.5,9.7,10.9,12.1,13.9,15.9,16.3,16.6,17.2,17.6,19.5,20.1,22.1,23.6,24.7,25.7,26.5,28.8,29.66]}
def run(args):return subprocess.run(args,capture_output=True,check=True)
def ff(*args):return run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)])
def pcm(path):
 a=array.array('h');a.frombytes(ff('-i',path,'-vn','-ac','1','-ar','8000','-threads','2','-f','s16le','pipe:1').stdout);return a
def onset(samples,t):
 start=round((t-.04)*8000);stop=round((t+.12)*8000);step=8
 bins=[math.sqrt(sum(x*x for x in samples[max(0,i):i+step])/step) for i in range(start,stop,step)]
 peak=max(bins);return ((start+next((i for i,x in enumerate(bins) if x>=peak*.15),0)*step)/8000,peak)
results={}
for name,times in BEATS.items():
 p=ROOT/'public/media/idempotency'/f'{name}.mp4';out=SCR/name;out.mkdir(exist_ok=True)
 probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]).stdout);(out/'probe.json').write_text(json.dumps(probe,indent=2))
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio');frames=int(v['nb_frames'])
 assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'],v['avg_frame_rate'],a['codec_name'])==('h264',1080,1920,'yuv420p','30/1','30/1','aac')
 dec=ff('-xerror','-i',p,'-threads','2','-f','null','-');assert not dec.stderr
 raw=ff('-i',p,'-vf',f'select=eq(n\\,0)+eq(n\\,{frames-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1').stdout
 size=1080*1920*3;assert len(raw)==size*2 and raw[:size]==raw[size:]
 for key,data in [('first',raw[:size]),('last',raw[size:])]:Image.frombytes('RGB',(1080,1920),data).save(out/f'{key}.png')
 vol=run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(p),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode();(out/'volume.log').write_text(vol)
 peak=float(re.search(r'max_volume: ([-\d.]+)',vol)[1]);assert -40<peak<=-.5
 data=p.read_bytes();pos=0;boxes={}
 while pos+8<=len(data):
  length,kind=struct.unpack('>I4s',data[pos:pos+8]);boxes[kind.decode()]=pos
  if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0]
  if length==0:length=len(data)-pos
  assert length>=8;pos+=length
 assert boxes['moov']<boxes['mdat']
 ff('-i',p,'-vf','fps=2','-threads','2',out/'f_%03d.png')
 allframes=sorted(out.glob('f_*.png'))
 for start in range(0,len(allframes),12):
  sheet=Image.new('RGB',(1080,1500));draw=ImageDraw.Draw(sheet)
  for j,f in enumerate(allframes[start:start+12]):
   x=j%4*270;y=j//4*500;sheet.paste(Image.open(f).resize((270,480)),(x,y+20));draw.text((x+4,y+3),f'{name} ~{(start+j)*.5:.1f}s',fill='white')
  sheet.save(out/f'contact_{start//12}.jpg')
 for t in times:
  f=out/f'beat_{t:g}.png';ff('-ss',t,'-i',p,'-frames:v','1','-threads','2',f)
  Image.open(f).resize((350,622)).save(out/f'phone_{t:g}.png')
 for start in range(0,len(times),4):
  sheet=Image.new('RGB',(1400,650));draw=ImageDraw.Draw(sheet)
  for j,t in enumerate(times[start:start+4]):
   sheet.paste(Image.open(out/f'phone_{t:g}.png'),(350*j,28));draw.text((350*j+4,5),f'{name} {t}s',fill='white')
  sheet.save(out/f'phone_sheet_{start//4}.png')
 ff('-i',p,'-lavfi','showspectrumpic=s=1400x400:fscale=log','-threads','2',out/'spectrogram.png')
 engine=ROOT/'video/idempotency'/name/('runtime' if name=='baseline' else 'engine')
 scene=engine.parent/('idempotency.js' if name=='baseline' else 'scene.js')
 js=f"const F=require({json.dumps(str(engine/'flow-engine.js'))});require({json.dumps(str(scene))});const s=F.createScene(F.lastScene);const S=require({json.dumps(str(engine/'sfx.js'))});require('fs').writeFileSync({json.dumps(str(out/'reference.wav'))},Buffer.from(S.toWav(S.render(s.audioCues(),s.meta.renderDuration,{{presets:s.sounds,master:.8}}))));console.log(JSON.stringify(s.audioCues()));"
 cues=json.loads(run(['node','-e',js]).stdout);source=pcm(out/'reference.wav');encoded=pcm(p);sync=[]
 for cue in cues:
  expected,reference_peak=onset(source,cue['t']);actual,energy=onset(encoded,cue['t']);delta=round(1000*(actual-expected),3)
  sync.append({'t':cue['t'],'name':cue['name'],'onsetDeltaMs':delta,'windowPeakRms':round(energy,2)})
 # Relative-window onset measures alignment, not isolation of overlapping sounds or perceptual quality.
 assert all(abs(c['onsetDeltaMs'])<=1000/30 and c['windowPeakRms']>1 for c in sync),sync
 poster=Image.open(p.with_suffix('.jpg'));assert poster.size==(1080,1920)
 result={'sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(p.with_suffix('.jpg').read_bytes()).hexdigest(),'bytes':len(data),'duration':float(v['duration']),'frames':frames,'video':'H.264 1080x1920 30fps yuv420p','audio':'AAC','audioPeakDbfs':peak,'fullDecode':True,'matchingBoundaryFrames':True,'boundarySha256':hashlib.sha256(raw[:size]).hexdigest(),'faststart':True,'atoms':boxes,'cueSync':sync,'maxOnsetDeltaMs':max(abs(c['onsetDeltaMs']) for c in sync),'beatFrames':times,'audioHeard':False}
 results[name]=result;print(name,frames,peak,len(sync),'cues',result['maxOnsetDeltaMs'],'ms',flush=True)
(HERE/'encoded-checks.json').write_text(json.dumps({'method':'Full FFmpeg decode; byte-identical first/last RGB; ffprobe; MP4 atoms; volumedetect; 1ms RMS onset comparison to source synthesis in -40/+120ms windows; rendered frame review recorded separately. Audio analysed, not heard.','cuts':results},indent=2)+'\n')

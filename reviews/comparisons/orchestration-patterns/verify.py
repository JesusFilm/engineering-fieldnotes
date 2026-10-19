"""Review-only encoded checks. Run from repository root; no publication or Git operations."""
from pathlib import Path
import array,hashlib,json,math,struct,subprocess,sys
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[3]; BASE=Path(__file__).resolve().parent;SCR=BASE/'scratch'
FF=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):return subprocess.run(list(map(str,args)),capture_output=True,check=True).stdout
all_results={}
for variant in sys.argv[1:] or ['baseline','astra','fable']:
 p=ROOT/f'public/media/orchestration-patterns/{variant}.mp4';d=SCR/('final-'+variant);d.mkdir(exist_ok=True)
 probe=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',p]));(d/'probe.json').write_text(json.dumps(probe,indent=2)+'\n')
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio');n=int(v['nb_read_frames']);duration=float(probe['format']['duration'])
 assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
 assert a['codec_name']=='aac' and n==round(duration*30)
 dec=subprocess.run(list(map(str,FF+['-xerror','-i',p,'-map','0:v:0','-map','0:a:0','-f','null','-'])),capture_output=True,check=True);assert not dec.stderr
 (d/'full-decode.txt').write_text('PASS: full video and audio decode; exit 0; no stderr.\n')
 raw=run(FF+['-i',p,'-vf',f"select='eq(n,0)+eq(n,{n-1})'",'-fps_mode','passthrough','-pix_fmt','yuv420p','-threads','2','-f','rawvideo','-']);fsize=1080*1920*3//2
 assert len(raw)==2*fsize
 same=raw[:fsize]==raw[fsize:]
 for idx,name in [(0,'first'),(n-1,'last')]:
  run(FF+['-i',p,'-vf',f'select=eq(n\\,{idx})','-frames:v','1','-threads','2',d/f'{name}.png'])
 data=p.read_bytes();boxes=[];off=0
 while off+8<=len(data):
  size,tag=struct.unpack('>I4s',data[off:off+8]);header=8
  if size==1:size=struct.unpack('>Q',data[off+8:off+16])[0];header=16
  if size==0:size=len(data)-off
  assert size>=header
  boxes.append({'type':tag.decode(),'offset':off,'size':size});off+=size
 assert next(b['offset'] for b in boxes if b['type']=='moov')<next(b['offset'] for b in boxes if b['type']=='mdat')
 pcm=array.array('f',run(FF+['-i',p,'-vn','-ac','2','-ar','48000','-f','f32le','-']));peak=20*math.log10(max(abs(x) for x in pcm));assert peak<=-.5
 vd=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(p),'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True,check=True);(d/'audio-levels.txt').write_text(vd.stderr)
 scene='orchestration-patterns.js' if variant=='baseline' else 'scene.js';engine='runtime' if variant=='baseline' else 'engine';src=ROOT/f'video/orchestration-patterns/{variant}'
 cues=json.loads(subprocess.check_output(['node','-e',f"const F=require('./{engine}/flow-engine.js');require('./{scene}');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"],cwd=src))
 cuecheck=[]
 for c in cues:
  seg=pcm[int(c['t']*96000):int((c['t']+.15)*96000)];rms=20*math.log10(max(1e-12,math.sqrt(sum(x*x for x in seg)/max(1,len(seg)))))
  assert rms>-65,(c,rms)
  cuecheck.append({'time':c['t'],'preset':c['name'],'rms150msDbfs':round(rms,2)})
 (d/'cue-signal.json').write_text(json.dumps(cuecheck,indent=2)+'\n')
 run(FF+['-i',p,'-lavfi','showspectrumpic=s=1100x350:fscale=log:legend=1','-frames:v','1','-threads','2',d/'spectrogram.png'])
 run(FF+['-i',p,'-vf','fps=1,scale=216:384','-threads','2',d/'second-%03d.jpg'])
 files=sorted(d.glob('second-*.jpg'));sheet=Image.new('RGB',(1296,410*((len(files)+5)//6)))
 for i,f in enumerate(files):
  x=i%6*216;y=i//6*410;sheet.paste(Image.open(f),(x,y));ImageDraw.Draw(sheet).text((x+6,y+386),f'{variant} sample {i}',fill='white')
 sheet.save(d/'contact.jpg')
 report={'sha256':hashlib.sha256(data).hexdigest(),'duration':duration,'frames':n,'video':'h264','width':1080,'height':1920,'fps':30,'pixelFormat':'yuv420p','audio':'aac','fullDecode':True,'faststart':True,'mp4Boxes':boxes,'maxAudioDbfs':peak,'firstLastIdentical':same,'firstFrameYuvSha256':hashlib.sha256(raw[:fsize]).hexdigest(),'lastFrameYuvSha256':hashlib.sha256(raw[fsize:]).hexdigest(),'cueCount':len(cues),'allCueWindowsHaveSignal':True,'physicalListening':False}
 (d/'verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:val for k,val in report.items() if k!='mp4Boxes'}));assert same,'Exact loop frames differ'
 all_results[variant]=report
(BASE/'verification.json').write_text(json.dumps(all_results,indent=2)+'\n')

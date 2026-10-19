"""Independent encoded checks. Decode every frame; exact frame indices, no seek approximation."""
from pathlib import Path
import subprocess,json,hashlib,struct,re,array,math,sys
from PIL import Image, ImageChops
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent/'scratch'
def run(args):
 p=subprocess.run(args,capture_output=True);assert p.returncode==0,p.stderr.decode();return p
results={}
for name in sys.argv[1:] or ['baseline','astra','fable']:
 src=ROOT/'public/media/guardrails-and-permissions'/f'{name}.mp4'
 if name=='fable' and (OUT/'fable-revised.mp4').exists():src=OUT/'fable-revised.mp4'
 out=OUT/('final-'+name);out.mkdir(exist_ok=True)
 probe=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(src)]).stdout)
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
 checks={'format':v['codec_name']=='h264' and v['width']==1080 and v['height']==1920 and v['pix_fmt']=='yuv420p' and v['r_frame_rate']=='30/1' and v['avg_frame_rate']=='30/1' and a['codec_name']=='aac','frameCount':v['nb_read_frames']==v['nb_frames']}
 data=src.read_bytes();atoms=[];pos=0
 while pos+8<=len(data):
  size,kind=struct.unpack('>I4s',data[pos:pos+8]);size=struct.unpack('>Q',data[pos+8:pos+16])[0] if size==1 else size
  atoms.append({'type':kind.decode(),'offset':pos,'size':size});pos+=size or len(data)
 checks['faststart']=next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
 base=['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(src)]
 dec=run(base+['-v','error','-map','0:v:0','-map','0:a:0','-threads','2','-f','null','-']);checks['fullDecode']=not dec.stderr.strip()
 vol=run(base+['-af','volumedetect','-threads','2','-f','null','-']).stderr.decode();(out/'volume.txt').write_text(vol)
 peak=float(re.search(r'max_volume: ([\d.-]+)',vol)[1]);checks['audioPeak']=peak<=-.5
 for label,n in [('first',0),('last',int(v['nb_frames'])-1)]:
  run(base+['-y','-v','error','-vf',f'select=eq(n\\,{n})','-frames:v','1','-threads','2',str(out/(label+'.png'))])
 im1=Image.open(out/'first.png');im2=Image.open(out/'last.png');checks['exactEndpointMatch']=im1.tobytes()==im2.tobytes()
 run(base+['-y','-v','error','-lavfi','showspectrumpic=s=1200x400:legend=1:fscale=log','-frames:v','1','-threads','2',str(out/'spectrum.png')])
 # Decode final audio and compare energy around each scheduled audible cue.
 pcm=run(base+['-v','error','-vn','-ac','1','-ar','48000','-f','f32le','-']).stdout;samples=array.array('f');samples.frombytes(pcm)
 folder=ROOT/'video/guardrails-and-permissions'/name
 engine=folder/('runtime' if name=='baseline' else 'engine')/'flow-engine.js';scene=folder/('guardrails-and-permissions.js' if name=='baseline' else 'scene.js')
 js="const F=require(process.argv[1]);require(process.argv[2]);const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"
 cues=json.loads(run(['node','-e',js,str(engine),str(scene)]).stdout);energies=[]
 for cue in cues:
  segment=samples[int(cue['t']*48000):int((cue['t']+.2)*48000)];rms=math.sqrt(sum(x*x for x in segment)/max(1,len(segment)));energies.append({'t':round(cue['t'],3),'name':cue['name'],'rmsDBFS':round(20*math.log10(max(rms,1e-10)),2)})
 checks['cueWindowsHaveAudio']=all(e['rmsDBFS']>-65 for e in energies)
 result={'path':str(src.relative_to(ROOT)),'sha256':hashlib.sha256(data).hexdigest(),'duration':probe['format']['duration'],'videoFrames':int(v['nb_frames']),'video':{k:v[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate','avg_frame_rate']},'audioCodec':a['codec_name'],'maxAudioDBFS':peak,'atoms':atoms,'checks':checks,'cueAudioEnergy':energies,'audioHeard':False,'allPassed':all(checks.values())}
 (out/'checks.json').write_text(json.dumps(result,indent=2));results[name]=result;print(name,json.dumps(checks),peak,flush=True)
(OUT/('checks-'+('-'.join(results))+'.json')).write_text(json.dumps(results,indent=2))
assert all(r['allPassed'] for r in results.values()),'Encoded checks failed'

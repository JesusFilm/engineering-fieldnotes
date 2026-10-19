"""Topic-scoped encoded verification; no shared manifests or cached checks written."""
from pathlib import Path
import array, hashlib, json, math, struct, subprocess, sys
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
OUT=HERE/'scratch'/'final';OUT.mkdir(parents=True,exist_ok=True)
def ff(*args):
 return subprocess.check_output(['ffmpeg','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)])
def snapshot(f,t,out,width=None):
 args=['-ss',str(t),'-i',str(f),'-frames:v','1']
 if width:args+=['-vf',f'scale={width}:-1']
 ff(*args,'-threads','2','-y',out)
times={
 'baseline':[0,1.5,3.5,5.8,7.8,8.9,9.8,13.5,14.6,15.5,16.3,17.6,18.8,20.6,21.6,23.3,24.1,24.8,25.3],
 'astra':[0,1.5,3.5,5,6.3,8.5,9.7,10.8,11.2,12.5,14.5,14.8,15.4,15.9,16.9,17.3,19.2,20.4,22.3,23.5,24.7,25.3,25.7,26.5,27.5,28.6],
 'sol':[0,1.8,3.8,5.4,5.6,6,6.65,8,9.8,11.2,13.3,15.5,16.9,17.6,18.5,20.8,21.2,21.7,22.15,22.4,23,24.2,24.8,25.5,27.5,28.5]
}
results={}
for cut in ['baseline','astra','sol']:
 f=ROOT/f'public/media/queues-and-backpressure/{cut}.mp4';d=OUT/cut;d.mkdir(exist_ok=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)]));(d/'probe.json').write_text(json.dumps(probe,indent=2))
 v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio');n=int(v['nb_frames'])
 assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'])==('h264',1080,1920,'30/1','yuv420p')
 assert a['codec_name']=='aac'
 decode=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-i',str(f),'-threads','2','-f','null','-'],capture_output=True,check=True)
 assert not decode.stderr; (d/'decode.txt').write_text('Full audio/video decode: exit 0, no warnings or errors.\n')
 boundary=ff('-i',f,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1')
 size=1080*1920*3;assert len(boundary)==size*2;assert boundary[:size]==boundary[size:],cut+' boundaries differ'
 for name,data in [('first',boundary[:size]),('last',boundary[size:])]:Image.frombytes('RGB',(1080,1920),data).save(d/f'{name}.png')
 pcm=array.array('f');pcm.frombytes(ff('-i',f,'-vn','-ac','2','-ar','44100','-c:a','pcm_f32le','-threads','2','-f','f32le','pipe:1'))
 peak=max(abs(x) for x in pcm);db=20*math.log10(peak);assert db<=-.5,(cut,db)
 windows=[]
 for i in range(0,len(pcm),8820):
  w=pcm[i:i+8820];rms=math.sqrt(sum(x*x for x in w)/len(w));windows.append({'start':i/88200,'rmsDbfs':20*math.log10(max(rms,1e-12)),'peakDbfs':20*math.log10(max(max(abs(x) for x in w),1e-12))})
 (d/'audio-windows.json').write_text(json.dumps(windows,indent=2))
 ff('-i',f,'-lavfi','showspectrumpic=s=1200x360:fscale=log:legend=1','-frames:v','1','-threads','2','-y',d/'spectrum.png')
 data=f.read_bytes();boxes=[];pos=0
 while pos+8<=len(data):
  sizeb,kind=struct.unpack('>I4s',data[pos:pos+8]);header=8
  if sizeb==1:sizeb=struct.unpack('>Q',data[pos+8:pos+16])[0];header=16
  if sizeb==0:sizeb=len(data)-pos
  assert sizeb>=header;boxes.append({'type':kind.decode(),'offset':pos});pos+=sizeb
 offsets={b['type']:b['offset'] for b in boxes};assert offsets['moov']<offsets['mdat']
 ff('-i',f,'-vf',f'fps=2,scale=216:384,tile=6x5','-threads','2','-y',d/'contact-%02d.jpg')
 frames=[]
 for t in times[cut]:
  out=d/f'{t:06.2f}.png';snapshot(f,t,out);im=Image.open(out).resize((350,622));ImageDraw.Draw(im).text((5,5),f'{cut} {t:.2f}s',fill='white');im.save(d/f'phone-{t:06.2f}.png');frames.append(im)
 for j in range(0,len(frames),6):
  sheet=Image.new('RGB',(1050,1260))
  for k,im in enumerate(frames[j:j+6]):sheet.paste(im,((k%3)*350,(k//3)*630))
  sheet.save(d/f'phone-sheet-{j//6+1}.png')
 if cut in ['baseline','sol']:snapshot(f,11 if cut=='baseline' else 19.2,f.with_suffix('.jpg'))
 poster=f.with_suffix('.jpg');p=Image.open(poster);assert p.size==(1080,1920)
 result={'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'duration':float(v['duration']),'frames':n,'codec':v['codec_name'],'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'audioSamplePeakDbfs':db,'fullDecode':True,'exactBoundaryPixelsEqual':True,'firstFrame':0,'lastFrame':n-1,'boundaryPixelSha256':hashlib.sha256(boundary[:1080*1920*3]).hexdigest(),'faststart':True,'boxes':boxes,'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),'audioHeard':False,'inspectedFrames':times[cut]}
 assert len(data)<3000000
 results[cut]=result; print(cut,result['sha256'],round(db,3),'dBFS',len(data),'bytes',flush=True)
(HERE/'encoded-verification.json').write_text(json.dumps(results,indent=2)+'\n')

"""Verify only Astra-owned media; produce hash-bound evidence, never shared manifests."""
from pathlib import Path
import hashlib,json,re,struct,subprocess
import numpy as np
from PIL import Image,ImageDraw
B=Path(__file__).resolve().parent
R=B.parents[2]
M=R/'public/media/queues-and-backpressure/astra.mp4'
P=M.with_suffix('.jpg')
E=B/'evidence';E.mkdir(exist_ok=True)
S=B/'scratch';S.mkdir(exist_ok=True)

def cmd(*args):return subprocess.check_output([str(x) for x in args])
def ff(*args):return cmd('ffmpeg','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args)
def probe(p):return json.loads(cmd('ffprobe','-v','error','-show_streams','-show_format','-of','json',p))

def main():
 cmd('node',B/'export-cues.cjs')
 p=probe(M);v=next(x for x in p['streams'] if x['codec_type']=='video');a=next(x for x in p['streams'] if x['codec_type']=='audio')
 assert (v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['r_frame_rate'])==('h264','yuv420p',1080,1920,'30/1')
 assert a['codec_name']=='aac'
 duration=float(p['format']['duration']);n=int(v['nb_frames']);data=M.read_bytes()
 assert 22<=duration<=35 and n==900 and len(data)<2_000_000
 dec=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(M),'-threads','2','-f','null','-'],capture_output=True,check=True)
 assert not dec.stderr
 raw=ff('-i',M,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1')
 size=1080*1920*3
 assert len(raw)==2*size and raw[:size]==raw[size:],'First/last decoded pixels differ'
 Image.frombytes('RGB',(1080,1920),raw[:size]).resize((350,622)).save(E/'first.png')
 Image.frombytes('RGB',(1080,1920),raw[size:]).resize((350,622)).save(E/'last.png')
 vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(M),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
 peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1));assert -40<peak<=-.5
 (E/'volume.txt').write_text(vol)
 boxes={};pos=0
 while pos+8<=len(data):
  length,kind=struct.unpack('>I4s',data[pos:pos+8]);header=8
  if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0];header=16
  if length==0:length=len(data)-pos
  assert length>=header;boxes[kind.decode()]=pos;pos+=length
 assert boxes['moov']<boxes['mdat']
 ff('-y','-ss','12.8','-i',M,'-frames:v','1','-q:v','2','-threads','2',P)
 poster=probe(P)['streams'][0];assert poster['codec_name']=='mjpeg' and (poster['width'],poster['height'])==(1080,1920)
 # Encoded beat midpoints, busiest transitions, and ending.
 times=[3.7,10.7,11.2,12.8,15.4,16.9,18,23.5,26,27.5]
 sheet=Image.new('RGB',(350*3,660*4),'#050506');draw=ImageDraw.Draw(sheet)
 for i,t in enumerate(times):
  full=S/f'encoded-{t}.png';phone=E/f'phone-{t}.png'
  ff('-y','-ss',t,'-i',M,'-frames:v','1','-threads','2',full)
  im=Image.open(full);im.resize((350,622)).save(phone)
  x=(i%3)*350;y=(i//3)*660;sheet.paste(Image.open(phone),(x,y+30));draw.text((x+15,y+10),f'{t:.1f}s',fill='white')
 sheet.save(E/'beat-sheet.png')
 # Inspect one frame on either side of every meaningful discrete event.
 events=json.loads((B/'events.json').read_text());cues=json.loads((B/'cues.json').read_text())
 boundary_times=sorted(set(round(max(0,e['t']+offset),4) for e in events for offset in [-1/30,1/30]))
 # Single decode for transition samples; each numbered frame is retained in scratch.
 selected=sorted(set(round(t*30) for t in boundary_times))
 expr='+'.join(f'eq(n\\,{i})' for i in selected)
 ff('-y','-i',M,'-vf',f'select={expr},scale=270:480,tile=8x{(len(selected)+7)//8}','-fps_mode','vfr','-frames:v','1','-threads','2',E/'boundary-sheet.png')
 ff('-y','-i',M,'-lavfi','showspectrumpic=s=1500x450:legend=1:fscale=log','-threads','2','-frames:v','1',E/'spectrogram.png')
 # Detect missing title content in EVERY non-fading encoded frame.
 title=np.frombuffer(ff('-i',M,'-vf','crop=800:90:140:285,scale=80:9','-pix_fmt','gray','-threads','2','-f','rawvideo','pipe:1'),dtype=np.uint8).reshape(n,9,80)
 means=title.mean(axis=(1,2))[30:860]
 assert means.min()>25 and means.max()-means.min()<3,('title raster instability',means.min(),means.max())
 # Audible energy at every authored cue; sample-accurate timeline is shared with visuals.
 pcm=np.frombuffer(ff('-i',M,'-vn','-ac','1','-ar','44100','-threads','2','-f','f32le','pipe:1'),dtype='<f4')
 energy=[]
 for c in cues:
  window=pcm[int(c['t']*44100):int((c['t']+.13)*44100)]
  db=20*np.log10(max(float(np.max(np.abs(window))),1e-12));assert db>-50,(c,db)
  energy.append({'t':round(c['t'],5),'preset':c['name'],'windowPeakDbfs':round(float(db),2)})
 assert all(any(abs(e['t']-c['t'])<1/30 for c in cues) for e in events),'A semantic event has no sound cue'
 # The normalized cross-correlation peak checks AAC track alignment with synthesized source.
 wav=S/'sfx.wav';assert wav.exists(),'Render with --wav scratch/sfx.wav'
 rawwav=np.frombuffer(ff('-i',wav,'-ac','1','-ar','44100','-threads','2','-f','f32le','pipe:1'),dtype='<f4')
 # Use six seconds containing the complete full/pause/resume sequence, every 44th sample.
 ref=rawwav[10*44100:17*44100:44].astype(np.float64)
 correlations=[]
 for lag in range(-2205,2206,44):
  target=pcm[10*44100+lag:17*44100+lag:44].astype(np.float64)
  score=float(np.dot(ref,target)/np.sqrt(np.dot(ref,ref)*np.dot(target,target)))
  correlations.append((score,lag))
 # Include exact-zero because the step grid may omit it.
 target=pcm[10*44100:17*44100:44].astype(np.float64)
 correlations.append((float(np.dot(ref,target)/np.sqrt(np.dot(ref,ref)*np.dot(target,target))),0))
 corr,lag=max(correlations);assert corr>.90 and abs(lag/44100)<1/30,(corr,lag)
 (E/'cue-energy.json').write_text(json.dumps(energy,indent=2)+'\n')
 # Validate counts, FIFO, exclusive execution, and the held job's admission.
 queue=[];active=None;done=[]
 for e in events:
  if e['type']=='enqueue':queue.append(e['job']);assert len(queue)<=3
  if e['type']=='dequeue':assert active is None and queue.pop(0)==e['job'];active=e['job']
  if e['type']=='complete':assert active==e['job'];active=None;done.append(e['job'])
 assert done==list('ABCDEF') and not queue and active is None
 assert not any(e['type']=='enqueue' and 11.6<e['t']<15.8 for e in events)
 checks={'author':'gpt-6-astra','reasoning':'high','date':'2026-10-19','sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(P.read_bytes()).hexdigest(),'duration':duration,'bytes':len(data),'frames':n,'width':1080,'height':1920,'fps':30,'videoCodec':'h264','pixelFormat':'yuv420p','audioCodec':'aac','audioPeakDbfs':peak,'fullDecode':True,'matchingBoundaryFrames':True,'faststart':True,'mp4AtomOffsets':boxes,'cueCount':len(cues),'semanticEventCount':len(events),'everyEventHasCueWithinOneFrame':True,'allCueWindowsAboveMinus50Dbfs':True,'sourceAudioCorrelation':round(corr,6),'audioAlignmentLagSeconds':round(lag/44100,6),'titleRegionMeanRange':[round(float(means.min()),3),round(float(means.max()),3)],'fifoAndBoundsChecked':True,'physicalListening':False,'encodedReviewTimes':times,'sourceHashes':{str(f.relative_to(B)):hashlib.sha256(f.read_bytes()).hexdigest() for f in [B/'scene.js',B/'engine/flow-engine.js',B/'engine/render.mjs',B/'engine/sfx.js',B/'engine/preview.html']}}
 (B/'verification.json').write_text(json.dumps(checks,indent=2)+'\n');print(json.dumps(checks,indent=2))

if __name__=='__main__':main()

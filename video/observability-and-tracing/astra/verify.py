"""Run from this directory; all generated scratch stays local; encoders run sequentially."""
import json,subprocess,hashlib,struct,math,re,wave
from pathlib import Path
ROOT=Path(__file__).resolve().parent
OUT=ROOT.parents[2]/'public/media/observability-and-tracing/astra.mp4'
SCRATCH=ROOT/'scratch';SCRATCH.mkdir(exist_ok=True)
def run(args):
 p=subprocess.run(args,check=True,capture_output=True)
 return p.stdout
FF=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(OUT)]))
(SCRATCH/'probe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(x for x in probe['streams'] if x['codec_type']=='video');a=next(x for x in probe['streams'] if x['codec_type']=='audio')
# Full A/V decode; also decode ALL video frames to hashes, not just seeked endpoints.
run(FF+['-i',str(OUT),'-f','null','-'])
hashes=run(FF+['-i',str(OUT),'-map','0:v','-f','framemd5','-']).decode()
(SCRATCH/'framemd5.txt').write_text(hashes)
rows=[x for x in hashes.splitlines() if x and not x.startswith('#')]
first,last=[x.split(',')[-1].strip() for x in (rows[0],rows[-1])]
# MP4 atom order checks streaming metadata is actually ahead of media.
data=OUT.read_bytes();atoms=[];pos=0
while pos<len(data):
 size,tag=struct.unpack_from('>I4s',data,pos);header=8
 if size==1:size=struct.unpack_from('>Q',data,pos+8)[0];header=16
 if size==0:size=len(data)-pos
 atoms.append({'type':tag.decode('ascii'),'offset':pos,'size':size});pos+=size
pcm=run(FF+['-i',str(OUT),'-map','0:a','-f','f32le','-acodec','pcm_f32le','-'])
samples=struct.unpack('<%df'%(len(pcm)//4),pcm);peak=max(abs(x) for x in samples);peakdb=20*math.log10(peak)
# The event schedule is shared by image and sound. Verify encoded audio energy near every scheduled onset.
js="const F=require('./engine/flow-engine.js');require('./scene.js');console.log(JSON.stringify(F.createScene(F.lastScene).audioCues()))"
cues=json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT));rate=int(a['sample_rate']);channels=a['channels']
with wave.open(str(SCRATCH/'sfx.wav'),'rb') as source:
 assert source.getframerate()==rate and source.getnchannels()==channels
 raw=source.readframes(source.getnframes())
 reference=struct.unpack('<%dh'%(len(raw)//2),raw)
for cue in cues:
 start=int(cue['t']*rate)*channels;end=int((cue['t']+.15)*rate)*channels
 window=samples[start:end];cue['encodedWindowRmsDb']=round(20*math.log10(max(1e-12,math.sqrt(sum(x*x for x in window)/len(window)))),2)
 # Compare RMS envelopes to avoid periodic-tone phase ambiguity and AAC noise differences.
 binframes=int(rate*.002)
 indices=range(max(0,start-int(rate*.02)*channels),min(len(reference),end),binframes*channels)
 ref=[]
 for i in indices:
  chunk=reference[i:i+binframes*channels:channels]
  ref.append(math.sqrt(sum((x/32768)**2 for x in chunk)/len(chunk)))
 correlations=[]
 for ms in range(-40,41):
  shift=round(ms*rate/1000)*channels
  actual=[]
  for i in indices:
   chunk=samples[max(0,i+shift):max(0,i+shift)+binframes*channels:channels]
   actual.append(math.sqrt(sum(x*x for x in chunk)/len(chunk)))
  xy=sum(x*y for x,y in zip(ref,actual));xx=sum(x*x for x in ref);yy=sum(y*y for y in actual)
  correlations.append((xy/math.sqrt(max(1e-30,xx*yy)),ms))
 best=max(correlations)
 cue['bestAlignmentMs']=best[1]
 cue['envelopeCorrelation']=round(best[0],4)
(SCRATCH/'cue-audit.json').write_text(json.dumps(cues,indent=2)+'\n')
# Beat and boundary images extracted from final encoded output.
for t in [0,3.5,4.97,5,6.05,8.8,10.97,11,14.5,15.3,16.77,16.8,19.8,21.17,21.2,23.8,25.3,27.97]:
 name=f'{t:05.2f}'
 # Decode from the beginning and select the exact frame; avoid seek timestamp ambiguity.
 full=SCRATCH/f'beat-{name}-full.png'
 run(FF+['-i',str(OUT),'-vf',f'select=eq(n\\,{round(t*30)})','-fps_mode','passthrough','-frames:v','1','-threads','1',str(full)])
 run(FF+['-i',str(full),'-vf','scale=350:-1','-frames:v','1','-threads','1',str(SCRATCH/f'beat-{name}-350.png')])
run(FF+['-i',str(SCRATCH/'beat-23.80-full.png'),'-frames:v','1','-q:v','2','-threads','1',str(OUT.with_suffix('.jpg'))])
run(FF+['-i',str(OUT),'-lavfi','showspectrumpic=s=1400x450:legend=1:fscale=log','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
checks={'dimensions':(v['width'],v['height'])==(1080,1920),'fps':v['r_frame_rate']=='30/1','codec':v['codec_name']=='h264','pixelFormat':v['pix_fmt']=='yuv420p','audioCodec':a['codec_name']=='aac','under2MB':OUT.stat().st_size<2000000,'duration':float(probe['format']['duration'])==28,'fullDecode':True,'frameCount':len(rows)==840,'exactLoopEquality':first==last,'audioPeak':peakdb<=-.5,'cueEnergy':all(c['encodedWindowRmsDb']>-60 for c in cues),'cueSync':all(abs(c['bestAlignmentMs'])<=20 and c['envelopeCorrelation']>.9 for c in cues),'faststart':next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')}
result={'checks':checks,'bytes':OUT.stat().st_size,'duration':float(probe['format']['duration']),'frameCount':len(rows),'firstFrameMD5':first,'lastFrameMD5':last,'audioPeakDbFS':round(peakdb,4),'audioCues':len(cues),'atoms':atoms,'sha256':hashlib.sha256(data).hexdigest(),'physicalListening':False}
(SCRATCH/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
assert all(checks.values()),'Verification failed; inspect scratch/verification.json'

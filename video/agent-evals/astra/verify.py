"""Run from any working directory: python3 video/agent-evals/astra/verify.py."""
from pathlib import Path
import array, hashlib, json, math, re, struct, subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SCRATCH=HERE/'scratch'
MOVIE=ROOT/'public/media/agent-evals/astra.mp4'
POSTER=ROOT/'public/media/agent-evals/astra.jpg'
SCRATCH.mkdir(exist_ok=True)
def run(args):
    return subprocess.run([str(a) for a in args],check=True,capture_output=True)
def ff(args):
    return run(['ffmpeg','-y','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args])
probe=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',MOVIE]).stdout)
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac' and v['nb_read_frames']=='840'
assert float(probe['format']['duration'])==28 and MOVIE.stat().st_size<2_000_000
# Decode both streams entirely, treating decoding errors as failure.
full=ff(['-v','error','-xerror','-i',MOVIE,'-map','0:v:0','-map','0:a:0','-threads','2','-f','null','-'])
assert not full.stderr.strip(),full.stderr.decode()
md5=ff(['-v','error','-i',MOVIE,'-map','0:v:0','-threads','2','-f','framemd5','-']).stdout.decode()
(SCRATCH/'frames.md5').write_text(md5)
frames=[line.split(',')[-1].strip() for line in md5.splitlines() if line and not line.startswith('#')]
assert len(frames)==840 and frames[0]==frames[-1]
levels=ff(['-i',MOVIE,'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode()
(SCRATCH/'audio-levels.txt').write_text(levels)
peak=float(re.search(r'max_volume: ([-\d.]+)',levels).group(1))
assert peak<=-0.5
# Inspect MP4 top-level atoms rather than infer faststart from CLI flags.
data=MOVIE.read_bytes();offset=0;atoms=[]
while offset+8<=len(data):
    size,kind=struct.unpack('>I4s',data[offset:offset+8]);header=8
    if size==1:size=struct.unpack('>Q',data[offset+8:offset+16])[0];header=16
    if size==0:size=len(data)-offset
    assert size>=header
    atoms.append({'type':kind.decode(),'offset':offset,'size':size});offset+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
# Source cues and decoded PCM: each cue has measurable local energy.
source=run(['node','-e',f"const F=require({json.dumps(str(HERE/'engine/flow-engine.js'))});require({json.dumps(str(HERE/'scene.js'))});console.log(JSON.stringify(F.createScene(F.lastScene).audioCues()))"])
cues=json.loads(source.stdout)
(SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
pcm=ff(['-v','error','-i',MOVIE,'-vn','-ac','1','-ar','44100','-c:a','pcm_f32le','-threads','2','-f','f32le','-']).stdout
samples=array.array('f');samples.frombytes(pcm)
energies=[]
for cue in cues:
    lo=int(cue['t']*44100);hi=int((cue['t']+.16)*44100)
    window=samples[lo:hi]
    db=20*math.log10(max(1e-12,max(abs(x) for x in window)))
    assert db>-60,(cue,db)
    energies.append({'time':cue['t'],'preset':cue['name'],'peakNext160msDbFS':round(db,2)})
# Estimated cue alignment at isolated starts: find threshold crossings ±30ms.
onsets=[]
for t in [.15,1.1,5.8,10.5,14,18.3,23,26.7]:
    lo=int((t-.03)*44100);hi=int((t+.1)*44100)
    threshold=max(abs(x) for x in samples[lo:hi])*.12
    idx=next(i for i in range(lo,hi) if abs(samples[i])>=threshold)
    delta=idx/44100-t
    assert abs(delta)<1/30,(t,delta)
    onsets.append({'scheduled':t,'detected':round(idx/44100,5),'offsetMs':round(delta*1000,2)})
# Encoded beat captures, transitions and poster.
for t in [4,8.8,12.3,17.8,21.5,24.7]:
    ff(['-v','error','-ss',str(t),'-i',MOVIE,'-frames:v','1','-threads','2',SCRATCH/f'beat-{t:05.1f}.png'])
    ff(['-v','error','-ss',str(t),'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{t:05.1f}.png'])
for t in [0,1.45,3.3,6.2,8.033,10.9,11.333,14.033,19.95,23.4,26.7,27.966667]:
    ff(['-v','error','-ss',str(t),'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'boundary-{t:06.2f}.png'])
ff(['-v','error','-i',MOVIE,'-lavfi','showspectrumpic=s=1600x450:legend=1:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png'])
ff(['-v','error','-ss','12.3','-i',MOVIE,'-frames:v','1','-q:v','2','-threads','2',POSTER])
report={'duration':28,'bytes':MOVIE.stat().st_size,'frames':len(frames),'video':{k:v[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate']},'audio':{k:a[k] for k in ['codec_name','sample_rate','channels']},'fullDecode':'pass','firstLastEqual':True,'firstLastFrameMD5':frames[0],'audioMaxDbFS':peak,'faststart':True,'atoms':atoms,'cueCount':len(cues),'cueEnergy':energies,'isolatedCueOnsets':onsets,'mp4SHA256':hashlib.sha256(data).hexdigest(),'audioPhysicallyHeard':False}
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['duration','bytes','frames','fullDecode','firstLastEqual','audioMaxDbFS','faststart','cueCount','isolatedCueOnsets']},indent=2))

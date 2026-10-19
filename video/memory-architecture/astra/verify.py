#!/usr/bin/env python3
"""Verify encoded media; sequential FFmpeg processes, each limited to two threads."""
import array, hashlib, json, math, re, struct, subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SCRATCH=HERE/'scratch'
MEDIA=ROOT/'public/media/memory-architecture/astra.mp4'
SCRATCH.mkdir(exist_ok=True)
def run(args):
 return subprocess.run([str(a) for a in args],check=True,capture_output=True)
def ff(*args):
 return run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args])
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',MEDIA]).stdout)
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['codec_name'],v['pix_fmt'],v['r_frame_rate'])==(1080,1920,'h264','yuv420p','30/1')
assert a['codec_name']=='aac'
assert float(probe['format']['duration'])==28
assert MEDIA.stat().st_size<2_000_000
# Full A/V decode must complete without any reported error.
dec=ff('-xerror','-i',MEDIA,'-f','null','-')
assert not dec.stderr,dec.stderr
frames=ff('-i',MEDIA,'-map','0:v:0','-f','framemd5','-').stdout.decode()
(SCRATCH/'frames.md5').write_text(frames)
rows=[s for s in frames.splitlines() if not s.startswith('#')]
assert len(rows)==840
first=rows[0].split(',')[-1].strip();last=rows[-1].split(',')[-1].strip()
assert first==last,(first,last)
levels=run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',MEDIA,'-af','volumedetect','-vn','-f','null','-']).stderr.decode()
(SCRATCH/'audio-levels.txt').write_text(levels)
peak=float(re.search(r'max_volume: ([-\d.]+) dB',levels)[1])
assert peak<=-.5
# Read top-level MP4 atom offsets rather than merely trusting the mux command.
data=MEDIA.read_bytes();pos=0;atoms=[]
while pos+8<=len(data):
 size,kind=struct.unpack('>I4s',data[pos:pos+8])
 if size==1: size=struct.unpack('>Q',data[pos+8:pos+16])[0]
 if size==0: size=len(data)-pos
 atoms.append({'type':kind.decode('ascii'),'offset':pos,'size':size});pos+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
# Native scene times and decoded audio energy establish alignment without claiming listening.
js="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"
cues=json.loads(subprocess.run(['node','-e',js],cwd=HERE,check=True,capture_output=True).stdout)
(SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
pcm=ff('-i',MEDIA,'-vn','-ar','48000','-ac','2','-f','f32le','-').stdout
samples=array.array('f');samples.frombytes(pcm)
windows=[]
for cue in cues:
 start=int(cue['t']*48000)*2;end=int((cue['t']+.22)*48000)*2
 p=max(abs(x) for x in samples[start:end]);db=20*math.log10(max(p,1e-12))
 assert db>-60,(cue,db)
 windows.append({'time':cue['t'],'preset':cue['name'],'peak_dbfs_first_220ms':round(db,2)})
# One full-size and 350px image per beat, plus key transition boundaries.
times=[4.5,7,9,11.8,12.9,13.8,14.4,16.5,18.6,20.8,22.4,24]
for t in times:
 name=f'{t:05.1f}'
 ff('-ss',t,'-i',MEDIA,'-frames:v','1','-threads','2',SCRATCH/f'beat-{name}.png')
 ff('-ss',t,'-i',MEDIA,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{name}.png')
ff('-i',MEDIA,'-lavfi','showspectrumpic=s=1600x500:legend=1:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png')
ff('-ss','14.4','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',ROOT/'public/media/memory-architecture/astra.jpg')
report={'duration_seconds':28,'bytes':MEDIA.stat().st_size,'dimensions':[1080,1920],'fps':30,'video_codec':v['codec_name'],'pixel_format':v['pix_fmt'],'audio_codec':a['codec_name'],'decoded_frames':len(rows),'full_decode':'pass','first_frame_md5':first,'last_frame_md5':last,'exact_first_last_equal':first==last,'audio_peak_dbfs':peak,'audio_listened':False,'faststart':True,'atoms':atoms,'cues':windows,'sha256':hashlib.sha256(data).hexdigest()}
(SCRATCH/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['atoms','cues']},indent=2))

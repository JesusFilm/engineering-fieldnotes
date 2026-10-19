#!/usr/bin/env python3
"""Portable, serial verification. Run from any directory with Python 3 + ffmpeg."""
import array,hashlib,json,math,struct,subprocess,wave
from pathlib import Path
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
MEDIA=ROOT/'public/media/loop-engineering/astra.mp4'
SCRATCH=BASE/'scratch'
SCRATCH.mkdir(exist_ok=True)
COMMON=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def ff(args):
 r=subprocess.run(COMMON+list(map(str,args)),capture_output=True,check=True)
 return r.stdout
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]))
(SCRATCH/'probe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['codec_name'],v['pix_fmt'],v['r_frame_rate'])==(1080,1920,'h264','yuv420p','30/1')
assert a['codec_name']=='aac'
assert int(v['nb_frames'])==840
assert float(probe['format']['duration'])==28
assert MEDIA.stat().st_size<2_000_000
# Decode every video frame and every audio sample, treating decoder errors as fatal.
ff(['-xerror','-i',MEDIA,'-map','0:v:0','-map','0:a:0','-f','null','-'])
(SCRATCH/'decode.log').write_text('Full video + audio decode completed with -xerror; exit 0; no stderr.\n')
# Frame MD5 covers all decoded frames, including the literal encoded boundaries.
hashes=ff(['-i',MEDIA,'-map','0:v:0','-an','-threads','2','-f','framemd5','-']).decode()
(SCRATCH/'frames.md5').write_text(hashes)
rows=[line for line in hashes.splitlines() if line and not line.startswith('#')]
assert len(rows)==840
first,last=rows[0].split(',')[-1].strip(),rows[-1].split(',')[-1].strip()
assert first==last,(first,last)
# Top-level MP4 atom order, not merely presence of faststart CLI flag.
data=MEDIA.read_bytes(); off=0; atoms=[]
while off+8<=len(data):
 size,typ=struct.unpack('>I4s',data[off:off+8]); head=8
 if size==1: size=struct.unpack('>Q',data[off+8:off+16])[0]; head=16
 if size==0: size=len(data)-off
 assert size>=head
 atoms.append({'type':typ.decode('ascii'),'offset':off,'size':size}); off+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
# Encoded frames: beat landings, busiest return packet, disruption, and exact boundaries.
times=[0,3.9,5.1,5.8,11.9,16.9,18.8,22.6,27.9666666667]
for t in times:
 name=f'{t:05.2f}'
 ff(['-ss',t,'-i',MEDIA,'-frames:v','1','-threads','2',SCRATCH/f'encoded-{name}.png'])
 ff(['-ss',t,'-i',MEDIA,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'phone-{name}.png'])
ff(['-ss','18.9','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',ROOT/'public/media/loop-engineering/astra.jpg'])
ff(['-i',MEDIA,'-lavfi','showspectrumpic=s=1600x500:legend=1:fscale=log','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png'])
levels=subprocess.run(['ffmpeg','-v','info','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(MEDIA),'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True,check=True)
(SCRATCH/'volume.log').write_text(levels.stderr)
ff(['-i',MEDIA,'-vn','-c:a','pcm_s16le','-threads','2',SCRATCH/'decoded.wav'])
with wave.open(str(SCRATCH/'decoded.wav')) as w:
 sr=w.getframerate(); channels=w.getnchannels(); samples=array.array('h',w.readframes(w.getnframes()))
peak=max(map(abs,samples))/32768
peak_db=20*math.log10(peak)
assert peak_db<=-0.5
# Timeline and audio export from the actual local scene.
node="const F=require('./engine/flow-engine.js'); require('./scene.js'); const s=F.createScene(F.lastScene); console.log(JSON.stringify({events:s.meta.events,cues:s.audioCues()},null,2))"
timeline=json.loads(subprocess.check_output(['node','-e',node],cwd=BASE))
(BASE/'timeline.json').write_text(json.dumps(timeline,indent=2)+'\n')
checks=[]
for e,cue in zip(timeline['events'],timeline['cues']):
 assert e['t']==cue['t'] and e['sound']==cue['name']
 start=int(e['t']*sr)*channels; end=int((e['t']+0.2)*sr)*channels
 p=max(map(abs,samples[start:end]))/32768
 db=20*math.log10(p) if p else -math.inf
 assert db>-48,(e,db)
 checks.append(dict(e,encodedPeakFirst200ms=round(db,2)))
# AAC PCM is compared to the synthesized reference to check timestamp alignment.
# Sparse sample cross-correlation avoids external Python dependencies.
with wave.open(str(SCRATCH/'sfx.wav')) as w:
 assert w.getframerate()==sr and w.getnchannels()==channels
 reference=array.array('h',w.readframes(w.getnframes()))
indices=range(4000,min(len(reference),len(samples))-4000,131)
def corr(shift):
 xy=xx=yy=0
 for i in indices:
  x=reference[i]; y=samples[i+shift*channels]
  xy+=x*y; xx+=x*x; yy+=y*y
 return xy/math.sqrt(xx*yy) if xx and yy else 0
coarse=max(range(-512,513,16),key=corr)
fine=max(range(coarse-16,coarse+17),key=corr)
correlation=corr(fine)
assert abs(fine)<=int(sr/30) and correlation>0.9,(fine,correlation)
report={
 'author':'gpt-6-astra','reasoning':'high','date':'2026-10-19',
 'media':'public/media/loop-engineering/astra.mp4','bytes':MEDIA.stat().st_size,
 'sha256':hashlib.sha256(data).hexdigest(),'duration':28,'frames':840,
 'video':'H264 1080x1920 yuv420p 30fps','audio':'AAC stereo 44100 Hz',
 'fullDecode':'passed','firstFrameMD5':first,'lastFrameMD5':last,'exactBoundaryEquality':True,
 'atoms':atoms,'faststart':True,'audioPeakDBFS':round(peak_db,3),
 'referenceCorrelation':round(correlation,6),'audioOffsetSamples':fine,
 'audioOffsetMilliseconds':round(fine/sr*1000,3),
 'cueChecks':checks,'physicalListening':False,
 'limitations':['No physical listening performed; audio verified by decoded signal analysis and spectrogram.',
 'Visual review is performed separately using encoded full-size and 350px images.',
 'Illustrative task and timing; result-gate policy must be enforced by harness code.']
}
(BASE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['cueChecks','atoms','limitations']},indent=2))

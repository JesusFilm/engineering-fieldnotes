#!/usr/bin/env python3
"""Verify only the owned Astra cut. Does not write shared verification manifests."""
from pathlib import Path
import subprocess,json,hashlib,re,struct,wave
import numpy as np
from PIL import Image
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
SCRATCH=BASE/'scratch';SCRATCH.mkdir(exist_ok=True)
MEDIA=ROOT/'public/media/timeouts-and-retries/astra.mp4'
POSTER=MEDIA.with_suffix('.jpg')
FF=['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args):
 return subprocess.run(args,check=True,capture_output=True)
def frame(t,path,width=None):
 args=FF+['-y','-v','error','-ss',str(t),'-i',str(MEDIA),'-frames:v','1']
 if width:args+=['-vf',f'scale={width}:-1']
 run(args+['-threads','2',str(path)])
probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(MEDIA)]).stdout)
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac';assert int(v['nb_frames'])==780
assert abs(float(probe['format']['duration'])-26)<.05
assert MEDIA.stat().st_size<2_000_000
run(FF+['-v','error','-xerror','-i',str(MEDIA),'-threads','2','-f','null','-'])
# Fully decoded frame hashes, including codec's actual first and last pixels.
hashes=run(FF+['-v','error','-i',str(MEDIA),'-map','0:v','-threads','2','-f','framemd5','-']).stdout.decode()
(SCRATCH/'framemd5.txt').write_text(hashes)
rows=[l for l in hashes.splitlines() if l and not l.startswith('#')]
assert len(rows)==780;first=rows[0].split(',')[-1].strip();last=rows[-1].split(',')[-1].strip();assert first==last
atoms=[];data=MEDIA.read_bytes();offset=0
while offset+8<=len(data):
 size,typ=struct.unpack('>I4s',data[offset:offset+8]);header=8
 if size==1:size=struct.unpack('>Q',data[offset+8:offset+16])[0];header=16
 if size==0:size=len(data)-offset
 atoms.append((typ.decode('ascii'),offset,size));offset+=size
 assert size>=header
assert next(x[1] for x in atoms if x[0]=='moov')<next(x[1] for x in atoms if x[0]=='mdat')
volume=run(FF+['-i',str(MEDIA),'-af','volumedetect','-threads','2','-f','null','-']).stderr.decode();(SCRATCH/'volume.txt').write_text(volume)
peak=float(re.search(r'max_volume: ([\-\d.]+) dB',volume)[1]);assert peak<=-.5
run(FF+['-y','-v','error','-i',str(MEDIA),'-map','0:a','-c:a','pcm_s16le','-threads','2',str(SCRATCH/'decoded.wav')])
js="const fs=require('fs');const F=require('./engine/flow-engine.js');require('./scene.js');const sc=F.createScene(F.lastScene);const S=require('./engine/sfx.js');fs.writeFileSync('scratch/cues.json',JSON.stringify(sc.audioCues(),null,2));fs.writeFileSync('scratch/expected.wav',Buffer.from(S.toWav(S.render(sc.audioCues(),sc.meta.renderDuration,{presets:sc.sounds}))));"
subprocess.run(['node','-e',js],cwd=BASE,check=True)
def wav(p):
 with wave.open(str(p)) as w:return w.getframerate(),np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float).reshape(-1,2)/32768
rate,decoded=wav(SCRATCH/'decoded.wav');r,expected=wav(SCRATCH/'expected.wav');assert r==rate
n=min(len(decoded),len(expected));correlation=float(np.corrcoef(decoded[:n].ravel(),expected[:n].ravel())[0,1]);assert correlation>.96
cue_evidence=[]
for cue in json.loads((SCRATCH/'cues.json').read_text()):
 t=cue['t'];segment=decoded[int(t*rate):int((t+.15)*rate)]
 db=float(20*np.log10(max(np.abs(segment).max(),1e-10)));assert db>-55
 cue_evidence.append({'t':t,'preset':cue['name'],'peakWithin150msDbFS':round(db,2)})
# Regenerate actual encoded review views, not source stills.
for t in [5,11,14,17,23]:
 frame(t,SCRATCH/f'beat-{t}-full.png');frame(t,SCRATCH/f'beat-{t}-350.png',350)
for t in [0,.2,.7,1.3,4.6,6.97,7,7.4,8,8.3,12.97,13,14.97,15,15.3,19.97,20,20.8,21.1,22.3,22.6,24.8,25.4,25.966667]:
 frame(t,SCRATCH/f'boundary-{t}.png',350)
frame(17,POSTER)
run(FF+['-y','-v','error','-i',str(MEDIA),'-vf','fps=1,scale=240:-1,tile=6x5','-frames:v','1','-threads','2',str(SCRATCH/'contact.png')])
run(FF+['-y','-v','error','-i',str(MEDIA),'-lavfi','showspectrumpic=s=1800x500:fscale=log','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
paths=[SCRATCH/f'boundary-{t}.png' for t in [0,.2,.7,1.3,4.6,6.97,7,7.4,8,8.3,12.97,13,14.97,15,15.3,19.97,20,20.8,21.1,22.3,22.6,24.8,25.4,25.966667]]
out=Image.new('RGB',(350*6,622*4))
for i,p in enumerate(paths):out.paste(Image.open(p),(350*(i%6),622*(i//6)))
out.save(SCRATCH/'boundaries.jpg')
report={'media':'public/media/timeouts-and-retries/astra.mp4','sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(POSTER.read_bytes()).hexdigest(),'bytes':len(data),'duration':float(probe['format']['duration']),'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'codec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'frames':len(rows),'fullDecode':True,'firstLastExact':True,'firstFrameMd5':first,'lastFrameMd5':last,'faststart':True,'atoms':atoms,'maxVolumeDbFS':peak,'decodedAudioReferenceCorrelationZeroLag':correlation,'cues':cue_evidence,'audioPhysicallyHeard':False}
(BASE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['cues','atoms']},indent=2))

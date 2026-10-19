"""Verify only this cut; write all evidence/scratch inside its owned directory."""
import array
import hashlib
import json
import math
import pathlib
import re
import struct
import subprocess
from datetime import datetime, timezone

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
VIDEO = ROOT / 'public/media/queues-and-backpressure/sol.mp4'
POSTER = VIDEO.with_suffix('.jpg')
SCRATCH = HERE / 'scratch'
SCRATCH.mkdir(exist_ok=True)

def run(args, **kwargs):
    return subprocess.run(args, check=True, capture_output=True, **kwargs)

def ff(args):
    return run(['ffmpeg', '-y', '-hide_banner', '-threads', '2', '-filter_threads', '2', '-filter_complex_threads', '2', *args])

probe = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(VIDEO)]).stdout)
(SCRATCH / 'ffprobe.json').write_text(json.dumps(probe, indent=2)+'\n')
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (v['codec_name'], v['pix_fmt'], v['width'], v['height'], v['r_frame_rate']) == ('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name'] == 'aac'
assert int(v['nb_frames']) == 900 and abs(float(v['duration']) - 30) < 0.001
assert 22 <= float(probe['format']['duration']) <= 35
assert VIDEO.stat().st_size < 2_000_000
# Decode both streams, treating any decoding error as fatal.
decode = ff(['-v','error','-xerror','-i',str(VIDEO),'-map','0:v','-map','0:a','-threads','2','-f','null','-'])
assert not decode.stderr
# Exact decoded RGB equality, not merely source-frame equality or perceptual similarity.
raw = ff(['-v','error','-i',str(VIDEO),'-vf','select=eq(n\\,0)+eq(n\\,899)','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1']).stdout
frame_bytes = 1080*1920*3
assert len(raw) == frame_bytes*2 and raw[:frame_bytes] == raw[frame_bytes:], 'Boundary mismatch'
volume = ff(['-i',str(VIDEO),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode()
(SCRATCH / 'volume.txt').write_text(volume)
peak = float(re.search(r'max_volume: ([-\d.]+) dB', volume).group(1))
assert -40 < peak <= -0.5
# Top-level MP4 atom ordering.
data=VIDEO.read_bytes(); pos=0; boxes={}
while pos+8 <= len(data):
    length, kind = struct.unpack('>I4s', data[pos:pos+8])
    if length == 1: length=struct.unpack('>Q',data[pos+8:pos+16])[0]
    if length == 0: length=len(data)-pos
    assert length >= 8
    boxes[kind.decode()] = pos
    pos += length
assert boxes['moov'] < boxes['mdat']
# Extract actual encoded review media, never source canvas substitutes.
beats=[4.3,14.5,19.2,22.65,26.4]
for i,t in enumerate(beats,1):
    ff(['-v','error','-ss',str(t),'-i',str(VIDEO),'-frames:v','1','-threads','2',str(SCRATCH/f'beat-{i}-1080.png')])
    ff(['-v','error','-i',str(SCRATCH/f'beat-{i}-1080.png'),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(SCRATCH/f'beat-{i}-350.png')])
for t in [17.25,17.75,21.6,22.35,24.8,25.5]:
    ff(['-v','error','-ss',str(t),'-i',str(VIDEO),'-frames:v','1','-threads','2',str(SCRATCH/f'transition-{t}.png')])
ff(['-v','error','-i',str(VIDEO),'-vf','fps=1,scale=240:-1,tile=6x5','-frames:v','1','-threads','2',str(SCRATCH/'contact-sheet.png')])
ff(['-v','error','-i',str(SCRATCH/'beat-%d-350.png'),'-vf','tile=5x1','-frames:v','1','-threads','2',str(SCRATCH/'beat-sheet-350.png')])
ff(['-v','error','-ss','19.2','-i',str(VIDEO),'-frames:v','1','-q:v','3','-threads','2',str(POSTER)])
ff(['-v','error','-i',str(VIDEO),'-lavfi','showspectrumpic=s=1800x500:fscale=log:legend=1','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
# The same scene timeline drives canvas and audio. Measure actual AAC cue-window energy.
node = "const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues()));"
cues=json.loads(run(['node','-e',node],cwd=HERE).stdout)
(SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
pcm=ff(['-v','error','-i',str(VIDEO),'-vn','-ac','2','-ar','44100','-c:a','pcm_s16le','-threads','2','-f','s16le','pipe:1']).stdout
samples=array.array('h');samples.frombytes(pcm)
windows=[]
for c in cues:
    lo=round(c['t']*44100)*2
    hi=min(len(samples),lo+round(0.25*44100)*2)
    values=samples[lo:hi]
    rms=math.sqrt(sum(x*x for x in values)/max(1,len(values)))/32768
    assert rms > 0.00001, f"Silent cue window: {c}"
    windows.append({'t':round(c['t'],4),'sound':c['name'],'windowRmsDbfs':round(20*math.log10(rms),2)})
# Compare the AAC-decoded signal with the exact scheduled synth mix to detect mux offsets.
reference_script = "const F=require('./engine/flow-engine.js'),S=require('./engine/sfx.js'),fs=require('node:fs');require('./scene.js');const s=F.createScene(F.lastScene);fs.writeFileSync('./scratch/reference.wav',Buffer.from(S.toWav(S.render(s.audioCues(),30,{presets:s.sounds}))));"
run(['node','-e',reference_script],cwd=HERE)
import wave
with wave.open(str(SCRATCH/'reference.wav'),'rb') as f:
    reference=array.array('h');reference.frombytes(f.readframes(f.getnframes()))
# Downsample comparison only, preserving the production 44.1kHz files.
stride=8
ref=[(reference[i]+reference[i+1])/65536 for i in range(0,len(reference)-1,stride*2)]
actual=[(samples[i]+samples[i+1])/65536 for i in range(0,len(samples)-1,stride*2)]
rate=44100/stride
alignment=[]
for t in [0.6,5.5,15,17.25,21,22.2,25.3,28]:
    begin=round(t*rate);length=round(0.3*rate)
    x=ref[begin:begin+length];xx=sum(v*v for v in x)
    best=(-1,None)
    for lag in range(-round(0.06*rate),round(0.06*rate)+1):
        y=actual[begin+lag:begin+lag+length]
        yy=sum(v*v for v in y)
        corr=sum(a*b for a,b in zip(x,y))/math.sqrt(xx*yy) if yy else 0
        if corr>best[0]: best=(corr,lag/rate)
    assert best[0]>0.85 and abs(best[1])<=1/30, (t,best)
    alignment.append({'eventTime':t,'offsetMs':round(best[1]*1000,3),'correlation':round(best[0],5)})
# Individual cue-window energy does not prove every overlapping sound is perceptually distinct.
checks={
    'verifiedAt':datetime.now(timezone.utc).isoformat(),
    'sha256':hashlib.sha256(data).hexdigest(),
    'posterSha256':hashlib.sha256(POSTER.read_bytes()).hexdigest(),
    'sourceSha256':{str(f.relative_to(HERE)):hashlib.sha256(f.read_bytes()).hexdigest() for f in [HERE/'scene.js',*(HERE/'engine').glob('*.*')]},
    'duration':float(v['duration']), 'bytes':len(data), 'frames':int(v['nb_frames']),
    'video':'h264 yuv420p 1080x1920 30fps', 'audio':'aac',
    'audioPeakDbfs':peak, 'fullDecode':True, 'faststart':True,
    'matchingBoundaryFrames':True,
    'boundaryRgbSha256':hashlib.sha256(raw[:frame_bytes]).hexdigest(),
    'audioCues':len(cues), 'allCueWindowsNonSilent':True, 'decodedAudioAlignment':alignment,
    'cueWindows':windows, 'physicallyListened':False,
    'visualInspectionRequired':['contact-sheet.png','beat-sheet-350.png','beat-1-1080.png through beat-5-1080.png','transition frames','spectrogram.png'],
    'visualReview':'See review.md; automated checks alone do not establish legibility or causal clarity.'
}
(HERE/'verification.json').write_text(json.dumps(checks,indent=2)+'\n')
print(json.dumps({k:val for k,val in checks.items() if k not in ['cueWindows','visualInspectionRequired']},indent=2))

#!/usr/bin/env python3
"""Check only this cut; never writes the repository's shared review manifest."""
from pathlib import Path
import array
import datetime
import hashlib
import json
import math
import re
import struct
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MEDIA = ROOT / 'public/media/oauth-pkce/sol.mp4'
POSTER = MEDIA.with_suffix('.jpg')
SCRATCH = HERE / 'scratch'
EVIDENCE = HERE / 'evidence'
SCRATCH.mkdir(exist_ok=True)
EVIDENCE.mkdir(exist_ok=True)

def run(*args):
    return subprocess.check_output([str(a) for a in args])

def ff(*args):
    return run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-filter_threads', '2', '-filter_complex_threads', '2', *args)

data = MEDIA.read_bytes()
probe = json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',MEDIA))
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (v['codec_name'], v['pix_fmt'], v['width'], v['height'], v['r_frame_rate']) == ('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name'] == 'aac'
assert float(v['duration']) == 32 and int(v['nb_frames']) == 960
assert len(data) < 2_000_000
ff('-xerror','-i',MEDIA,'-threads','2','-f','null','-')
frames = ff('-i',MEDIA,'-vf','select=eq(n\\,0)+eq(n\\,959)','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1')
size = 1080*1920*3
assert len(frames) == size*2 and frames[:size] == frames[size:]
volume = subprocess.run(['ffmpeg','-hide_banner','-threads','2','-i',str(MEDIA),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
peak = float(re.search(r'max_volume: ([-\d.]+) dB', volume).group(1))
assert -40 < peak <= -0.5
(SCRATCH/'volume.txt').write_text(volume)
pos, boxes = 0, {}
while pos + 8 <= len(data):
    length, kind = struct.unpack('>I4s', data[pos:pos+8])
    if length == 1: length = struct.unpack('>Q',data[pos+8:pos+16])[0]
    if length == 0: length = len(data)-pos
    assert length >= 8
    boxes[kind.decode()] = pos
    pos += length
assert boxes['moov'] < boxes['mdat']

ff('-ss','20.9','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',POSTER)
times = [4.6,8.5,15.3,20.9,28.5]
for i,t in enumerate(times,1):
    ff('-ss',t,'-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',SCRATCH/f'beat-{i}-full.jpg')
    ff('-ss',t,'-i',MEDIA,'-vf','scale=350:-1','-frames:v','1','-q:v','2','-threads','2',EVIDENCE/f'beat-{i}-350.jpg')
ff('-i',MEDIA,'-vf','fps=1,scale=240:-1,tile=6x6','-frames:v','1','-q:v','2','-threads','2',EVIDENCE/'contact-sheet.jpg')
ff('-i',MEDIA,'-lavfi','showspectrumpic=s=1600x480:fscale=log:legend=1','-frames:v','1','-threads','2',EVIDENCE/'spectrogram.png')

# Cue windows are evaluated on DECODED AAC, not merely on the source WAV.
scene = json.loads(subprocess.check_output(['node','-e',"const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);console.log(JSON.stringify({cues:s.audioCues(),meta:s.meta}));"],cwd=HERE))
pcm = array.array('h',ff('-i',MEDIA,'-vn','-ac','1','-ar','44100','-threads','2','-f','s16le','pipe:1'))
def rms(start,end):
    xs = pcm[int(start*44100):int(end*44100)]
    value = math.sqrt(sum(x*x for x in xs)/max(1,len(xs)))/32768
    return 20*math.log10(max(value,1e-10))
checks=[]
for c in scene['cues']:
    level=rms(c['t'],min(32,c['t']+.14))
    assert level > -55, (c,level)
    checks.append({**c,'decodedWindowRmsDbfs':round(level,2)})
(EVIDENCE/'cue-checks.json').write_text(json.dumps(checks,indent=2)+'\n')

# Cross-correlate an isolated mismatch cue with its deterministic source sound.
# The same synthesis timeline controls the visual event and the audio cue.
synth = subprocess.check_output(['node','-e',"const F=require('./engine/flow-engine.js'),S=require('./engine/sfx.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(Buffer.from(S.toWav(S.render(s.audioCues(),32,{presets:s.sounds}))));"],cwd=HERE)
import io, wave
with wave.open(io.BytesIO(synth),'rb') as wav:
    channels=wav.getnchannels(); rate=wav.getframerate()
    raw=array.array('h',wav.readframes(wav.getnframes()))
    source=[sum(raw[i:i+channels])/channels for i in range(0,len(raw),channels)]
assert rate == 44100
start,end=int(18.75*rate),int(18.95*rate)
ref=source[start:end:8]
best=(-1,None)
for lag in range(-880,881,8):
    target=pcm[start+lag:end+lag:8]
    corr=sum(x*y for x,y in zip(ref,target))/math.sqrt(sum(x*x for x in ref)*sum(y*y for y in target))
    if corr>best[0]: best=(corr,lag)
assert best[0]>.95 and abs(best[1]/rate)<1/30

report={
 'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'sha256':hashlib.sha256(data).hexdigest(),
 'posterSha256':hashlib.sha256(POSTER.read_bytes()).hexdigest(),
 'bytes':len(data),'duration':32,'frames':960,'width':1080,'height':1920,
 'videoCodec':'h264','pixelFormat':'yuv420p','fps':'30/1','audioCodec':'aac',
 'fullDecode':True,'matchingBoundaryFrames':True,
 'boundaryRgbSha256':hashlib.sha256(frames[:size]).hexdigest(),
 'audioPeakDbfs':peak,'faststart':True,'mp4BoxOffsets':boxes,
 'cueCount':len(checks),'allCueWindowsAboveMinus55Dbfs':True,
 'mismatchCueCorrelation':round(best[0],6),'audioLagMilliseconds':round(best[1]/rate*1000,3),
 'physicalListening':False,
 'visualReview':'Pending manual inspection of final encoded evidence',
}
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))

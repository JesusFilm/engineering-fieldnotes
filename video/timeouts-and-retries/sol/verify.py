#!/usr/bin/env python3
"""Validate this cut; regenerate review images, audio analysis, poster and hash report."""
import hashlib, json, math, re, struct, subprocess, wave
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
CUT = ROOT / 'video/timeouts-and-retries/sol'
SCRATCH = CUT / 'scratch'
MOVIE = ROOT / 'public/media/timeouts-and-retries/sol.mp4'
POSTER = MOVIE.with_suffix('.jpg')
SCRATCH.mkdir(exist_ok=True)

def run(args, binary=False):
    result = subprocess.run(args, cwd=ROOT, check=True, capture_output=True)
    return result.stdout if binary else result.stdout.decode()

def ff(*args):
    return ['ffmpeg', '-hide_banner', '-v', 'error', '-threads', '2', '-filter_threads', '2', '-filter_complex_threads', '2', *map(str,args)]

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()

def frame(t):
    return run(ff('-ss',t,'-i',MOVIE,'-frames:v',1,'-pix_fmt','rgb24','-threads','2','-f','rawvideo','-'),True)

info = json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(MOVIE)]))
v = next(s for s in info['streams'] if s['codec_type']=='video')
a = next(s for s in info['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac'
assert int(v['nb_frames'])==960
assert abs(float(info['format']['duration'])-32)<.04
assert MOVIE.stat().st_size<2_000_000
# Fail on any video or audio decoder error, across the complete movie.
run(ff('-xerror','-i',MOVIE,'-map','0:v','-map','0:a','-threads','2','-f','null','-'))
first,last=frame(0),frame(959/30)
assert len(first)==1080*1920*3 and first==last
# Confirm MP4 top-level atom order, rather than trusting encoder command flags.
raw=MOVIE.read_bytes(); atoms=[]; offset=0
while offset+8<=len(raw):
    size,kind=struct.unpack('>I4s',raw[offset:offset+8]); header=8
    if size==1: size=struct.unpack('>Q',raw[offset+8:offset+16])[0]; header=16
    elif size==0: size=len(raw)-offset
    assert size>=header
    atoms.append(kind.decode('ascii')); offset+=size
assert atoms.index('moov')<atoms.index('mdat')
# Inspect the final encoded AAC, not just the pre-mux WAV.
levels=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(MOVIE),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,check=True).stderr.decode()
(SCRATCH/'audio-levels.txt').write_text(levels)
peak=float(re.search(r'max_volume: ([-\d.]+) dB',levels).group(1)); assert peak<=-.5
run(ff('-y','-i',MOVIE,'-vn','-c:a','pcm_s16le','-threads','2',SCRATCH/'encoded-audio.wav'))
cue_code="const F=require('./video/timeouts-and-retries/sol/engine/flow-engine.js');require('./video/timeouts-and-retries/sol/scene.js');const sc=F.createScene(F.lastScene);console.log(JSON.stringify(sc.audioCues()));"
cues=json.loads(run(['node','-e',cue_code])); (SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
with wave.open(str(SCRATCH/'encoded-audio.wav')) as wav:
    sr=wav.getframerate(); channels=wav.getnchannels(); data=wav.readframes(wav.getnframes())
    samples=struct.unpack('<'+'h'*(len(data)//2),data)
cue_checks=[]
for cue in cues:
    start=int(cue['t']*sr)*channels; end=int((cue['t']+.18)*sr)*channels
    chunk=samples[start:end]; rms=math.sqrt(sum(x*x for x in chunk)/len(chunk))/32768
    assert rms>.0001, (cue,rms)
    cue_checks.append({'time':cue['t'],'preset':cue['name'],'rms_180ms_dbfs':round(20*math.log10(rms),2),'nearest_frame_delta_ms':round(abs(cue['t']-round(cue['t']*30)/30)*1000,3)})
# Encoded frames at every beat, transitions, each upper retry, and busy packet moments.
times=[0,.2,.75,1.85,3.8,5.3,6.7,9.7,10.6,14.7,16.3,17.8,18.6,19.3,20.5,21.6,22.9,24.4,25.1,26.05,27.4,29.7,959/30]
for t in times:
    im=Image.frombytes('RGB',(1080,1920),frame(t))
    im.save(SCRATCH/f'encoded-{t:.2f}.png')
    im.resize((350,622),Image.Resampling.LANCZOS).save(SCRATCH/f'phone-{t:.2f}.png')
beats=[3.8,9.7,14.7,17.8,22.9,27.4]
canvas=Image.new('RGB',(1050,1244))
for i,t in enumerate(beats): canvas.paste(Image.open(SCRATCH/f'phone-{t:.2f}.png'),((i%3)*350,(i//3)*622))
canvas.save(SCRATCH/'encoded-beats-350.png')
boundaries=[.75,5.3,6.7,10.6,16.3,19.3,24.4,25.1,26.05]
canvas=Image.new('RGB',(1050,1866))
for i,t in enumerate(boundaries): canvas.paste(Image.open(SCRATCH/f'phone-{t:.2f}.png'),((i%3)*350,(i//3)*622))
canvas.save(SCRATCH/'encoded-boundaries-350.png')
Image.open(SCRATCH/'encoded-27.40.png').save(POSTER,quality=90,optimize=True)
run(ff('-y','-i',MOVIE,'-lavfi','showspectrumpic=s=1800x500:fscale=log','-frames:v',1,'-threads','2',SCRATCH/'spectrogram.png'))
report={
    'checked_at_utc':datetime.now(timezone.utc).isoformat(),
    'movie_sha256':sha(MOVIE),'poster_sha256':sha(POSTER),'scene_sha256':sha(CUT/'scene.js'),
    'movie_bytes':MOVIE.stat().st_size,'poster_bytes':POSTER.stat().st_size,
    'duration':float(info['format']['duration']),'frames':int(v['nb_frames']),
    'video':{k:v[k] for k in ['codec_name','width','height','pix_fmt','r_frame_rate']},
    'audio':{k:a[k] for k in ['codec_name','sample_rate','channels','bit_rate']},
    'max_volume_dbfs':peak,'full_decode':'passed','first_last_exact_rgb_equality':True,
    'first_last_rgb_sha256':hashlib.sha256(first).hexdigest(),'top_level_atoms':atoms,'faststart':True,
    'sound_cues':len(cues),'cue_window_checks':cue_checks,
    'physical_listening':False,'manual_visual_review':'Recorded separately in review.md',
    'source_files_sha256':{str(p.relative_to(CUT)):sha(p) for p in sorted((CUT/'engine').glob('*')) if p.is_file()},
}
(CUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['movie_sha256','movie_bytes','poster_bytes','duration','frames','max_volume_dbfs','full_decode','first_last_exact_rgb_equality','faststart','sound_cues']},indent=2))

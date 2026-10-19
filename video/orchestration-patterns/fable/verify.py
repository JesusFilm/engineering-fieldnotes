#!/usr/bin/env python3
"""Technical checks for the encoded fable cut. Writes verification.json and review images under scratch/.
It does not claim visual QA or listening; those are recorded by hand in review.md and variant.json."""
import array, hashlib, json, math, struct, subprocess
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MEDIA = ROOT / 'public/media/orchestration-patterns/fable.mp4'
POSTER = ROOT / 'public/media/orchestration-patterns/fable.jpg'
SCRATCH = HERE / 'scratch'
SCRATCH.mkdir(exist_ok=True)
FF = ['ffmpeg', '-y', '-v', 'error', '-threads', '2', '-filter_threads', '2']
POSTER_T = 27.5   # resolved hold: all rows green, dependency bracket solid, orchestrator chimed
BEATS = [1.3, 3.7, 4.6, 7.7, 9.4, 11.3, 13.4, 16.9, 19.9, 20.9, 22.9, 24.5, 26.1, 27.5]
BOUNDARIES = [0, 0.3, 0.8, 1.0, 1.7, 3.5, 4.5, 6.3, 7.0, 8.9, 9.2, 9.6, 11.0, 13.2, 14.2, 15.4, 15.9, 16.6, 17.0, 19.5, 20.3, 20.5, 22.8, 23.7, 23.85, 24.45, 25.9, 26.9, 29.1, 29.7, 29.97]

def run(args):
    return subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True).stdout

probe = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(MEDIA)]))
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (v['codec_name'], v['pix_fmt'], v['width'], v['height'], v['r_frame_rate']) == ('h264', 'yuv420p', 1080, 1920, '30/1')
assert a['codec_name'] == 'aac'
duration = float(probe['format']['duration'])
frames_n = int(v['nb_frames'])
assert 22 <= duration <= 35, duration
assert frames_n == round(duration * 30), (frames_n, duration)
size_bytes = MEDIA.stat().st_size
assert size_bytes < 2_000_000, size_bytes
assert float(v['start_time']) == 0 and float(a['start_time']) == 0

# Full decode with errors promoted to failures; any stderr output counts as a warning.
dec = subprocess.run(FF + ['-xerror', '-i', str(MEDIA), '-f', 'null', '-'], capture_output=True, check=True)
assert not dec.stderr, dec.stderr

# Exact first/last frame equality on decoded pixels (yuv420p and rgb24 both).
for fmt, size in (('yuv420p', 1080 * 1920 * 3 // 2), ('rgb24', 1080 * 1920 * 3)):
    raw = run(FF + ['-i', str(MEDIA), '-vf', f"select='eq(n,0)+eq(n,{frames_n - 1})'", '-fps_mode', 'passthrough', '-pix_fmt', fmt, '-f', 'rawvideo', '-'])
    assert len(raw) == size * 2, (fmt, len(raw))
    assert raw[:size] == raw[size:], fmt + ': first/last frame differ'
first_sha = hashlib.sha256(raw[:size]).hexdigest()

# Decoded audio: sample peak and presence of energy at every authored cue.
audio = run(FF + ['-i', str(MEDIA), '-vn', '-ac', '2', '-ar', '44100', '-f', 'f32le', '-'])
samples = array.array('f', audio)
peak = max(abs(x) for x in samples)
peak_db = 20 * math.log10(peak)
assert peak_db <= -0.5, peak_db
cuejs = "const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues()))"
cues = json.loads(subprocess.check_output(['node', '-e', cuejs], cwd=HERE))
def rms_db(start_s, length_s):
    i0 = int(start_s * 44100) * 2; i1 = i0 + int(length_s * 44100) * 2
    w = samples[i0:i1]
    return 20 * math.log10(max(math.sqrt(sum(x * x for x in w) / max(1, len(w))), 1e-12))
quiet_floor = rms_db(5.2, 0.6)   # hold after the first join, before beat 2 dispatch
for c in cues:
    c['decoded_rms_dbfs'] = round(rms_db(c['t'], 0.18), 2)
    assert c['decoded_rms_dbfs'] > -60, (c['t'], c['name'], c['decoded_rms_dbfs'])

# Timing: cross-correlate 10 ms RMS envelopes of the authored WAV and the decoded AAC.
ref = array.array('f', run(FF + ['-i', str(SCRATCH / 'sfx.wav'), '-ac', '2', '-ar', '44100', '-f', 'f32le', '-']))
def envelope(data):
    hop = 882; n = min(len(data), int(duration * 44100) * 2)
    return [math.sqrt(sum(x * x for x in data[i:i + hop]) / hop) for i in range(0, n - hop + 1, hop)]
re_, de = envelope(ref), envelope(samples)
def corr(lag):
    pairs = [(re_[i], de[i + lag]) for i in range(10, min(len(re_), len(de)) - 10)]
    return sum(p * q for p, q in pairs) / math.sqrt(sum(p * p for p, _ in pairs) * sum(q * q for _, q in pairs))
best = max(range(-10, 11), key=corr)
assert abs(best) <= 3 and corr(best) > 0.98, (best, corr(best))

# faststart: moov precedes mdat at the top level.
b = MEDIA.read_bytes(); atoms = []; off = 0
while off < len(b):
    length, kind = struct.unpack('>I4s', b[off:off + 8]); head = 8
    if length == 1: length = struct.unpack('>Q', b[off + 8:off + 16])[0]; head = 16
    if length == 0: length = len(b) - off
    assert length >= head
    atoms.append(kind.decode()); off += length
assert atoms.index('moov') < atoms.index('mdat'), atoms

# Poster from the encoded movie, then review images (beats at full size and 350 px, boundary sheet, spectrogram).
run(FF + ['-ss', str(POSTER_T), '-i', str(MEDIA), '-frames:v', '1', '-q:v', '2', str(POSTER)])
pic = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(POSTER)]))['streams'][0]
assert pic['codec_name'] == 'mjpeg' and (pic['width'], pic['height']) == (1080, 1920)
(SCRATCH / 'beats').mkdir(exist_ok=True)
for t in BEATS:
    p = SCRATCH / 'beats' / f'{t:05.1f}'
    run(FF + ['-ss', str(t), '-i', str(MEDIA), '-frames:v', '1', str(p) + '.png'])
    run(FF + ['-i', str(p) + '.png', '-vf', 'scale=350:-1', '-frames:v', '1', str(p) + '-350.png'])
run(FF + ['-pattern_type', 'glob', '-i', str(SCRATCH / 'beats' / '*-350.png'), '-vf', 'tile=6x2', '-frames:v', '1', str(SCRATCH / 'beats-350-sheet.png')])
(SCRATCH / 'boundaries').mkdir(exist_ok=True)
for i, t in enumerate(BOUNDARIES):
    run(FF + ['-ss', str(t), '-i', str(MEDIA), '-vf', 'scale=270:480', '-frames:v', '1', str(SCRATCH / 'boundaries' / f'{i:02d}.png')])
run(FF + ['-pattern_type', 'glob', '-i', str(SCRATCH / 'boundaries' / '*.png'), '-vf', 'tile=9x3', '-frames:v', '1', str(SCRATCH / 'boundary-sheet.png')])
run(FF + ['-i', str(MEDIA), '-lavfi', 'showspectrumpic=s=1800x500:fscale=log:legend=1', '-frames:v', '1', str(SCRATCH / 'spectrogram.png')])

report = {'duration': duration, 'frames': frames_n, 'dimensions': [1080, 1920], 'fps': 30, 'video': 'h264', 'pixelFormat': 'yuv420p', 'audio': 'aac',
          'bytes': size_bytes, 'decode': 'passed (-xerror, no warnings)', 'firstLastExact': True, 'firstFrameSHA256_rgb24': first_sha,
          'audioSamplePeakDbfs': round(peak_db, 3), 'quietHoldRmsDbfs': round(quiet_floor, 2), 'audioEnvelopeLagMs': best * 10, 'audioEnvelopeCorrelation': round(corr(best), 6),
          'faststart': True, 'posterTime': POSTER_T, 'cueCount': len(cues), 'cues': cues,
          'visualReview': 'Inspect scratch/beats, scratch/beats-350-sheet.png, scratch/boundary-sheet.png and scratch/encoded-sheet.png by eye; this script does not judge them.',
          'listened': False}
(HERE / 'verification.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({k: v for k, v in report.items() if k != 'cues'}, indent=2))


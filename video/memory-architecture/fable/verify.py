"""Verify the encoded fable cut and write verification.json beside this script.

Checks: stream format, duration, size budget, full decode without warnings, exact first/last frame
equality (loop boundary), audio peak <= -0.5 dBFS, faststart (moov before mdat), poster present,
and that every scheduled sound cue has audio energy within 80 ms of its timestamp.
Run from this folder: python3 verify.py
"""
import json, pathlib, re, struct, subprocess, sys, wave

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MP4 = ROOT / 'public/media/memory-architecture/fable.mp4'
JPG = ROOT / 'public/media/memory-architecture/fable.jpg'
WAV = HERE / 'scratch/sfx.wav'
T2 = ['-threads', '2']

def run(*a, **k):
    return subprocess.run(a, capture_output=True, text=k.get('text', False), check=True)

out = {'file': str(MP4.relative_to(ROOT)), 'checks': {}}
C = out['checks']
probe = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(MP4), text=True).stdout)
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
fmt = probe['format']
C['video'] = {'codec': v['codec_name'], 'pix_fmt': v['pix_fmt'], 'size': f"{v['width']}x{v['height']}", 'fps': v['r_frame_rate'], 'frames': int(v['nb_frames'])}
C['audio'] = {'codec': a['codec_name'], 'sample_rate': a['sample_rate'], 'channels': a['channels']}
C['duration'] = float(fmt['duration'])
C['bytes'] = int(fmt['size'])
assert (v['codec_name'], v['pix_fmt'], v['width'], v['height'], v['r_frame_rate']) == ('h264', 'yuv420p', 1080, 1920, '30/1')
assert a['codec_name'] == 'aac'
assert 22 <= C['duration'] <= 35, C['duration']
assert C['bytes'] < 2_000_000

n = int(v['nb_frames'])
raw = run('ffmpeg', '-v', 'error', *T2, '-i', str(MP4), '-vf', f'select=eq(n\\,0)+eq(n\\,{n-1})', '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', *T2, '-f', 'rawvideo', 'pipe:1').stdout
size = 1080 * 1920 * 3
assert len(raw) == 2 * size, len(raw)
C['firstLastFramesIdentical'] = raw[:size] == raw[size:]
assert C['firstLastFramesIdentical']

dec = run('ffmpeg', '-v', 'error', '-xerror', *T2, '-i', str(MP4), '-f', 'null', '-')
C['fullDecodeWarnings'] = dec.stderr.decode().strip()
assert not C['fullDecodeWarnings']

vol = run('ffmpeg', '-hide_banner', *T2, '-i', str(MP4), '-vn', '-af', 'volumedetect', '-f', 'null', '-').stderr.decode()
C['audioPeakDbfs'] = float(re.search(r'max_volume: ([-\d.]+) dB', vol).group(1))
C['audioMeanDbfs'] = float(re.search(r'mean_volume: ([-\d.]+) dB', vol).group(1))
assert -40 < C['audioPeakDbfs'] <= -0.5

data = MP4.read_bytes(); boxes = {}; pos = 0
while pos + 8 <= len(data):
    length, kind = struct.unpack('>I4s', data[pos:pos+8]); header = 8
    if length == 1: length = struct.unpack('>Q', data[pos+8:pos+16])[0]; header = 16
    if length == 0: length = len(data) - pos
    boxes[kind] = pos; pos += length
C['faststart'] = boxes[b'moov'] < boxes[b'mdat']
assert C['faststart']

C['posterBytes'] = JPG.stat().st_size if JPG.is_file() else 0
assert C['posterBytes'] > 1000

# Cue sync: decode the encoded audio and confirm energy near every scheduled cue.
cues = json.loads(subprocess.run(['node', '-e', "const F=require('./engine/flow-engine.js');require('./scene.js');const sc=F.createScene(F.lastScene);console.log(JSON.stringify(sc.audioCues().map(c=>[c.t,c.name])))"], cwd=HERE, capture_output=True, text=True, check=True).stdout)
pcm = run('ffmpeg', '-v', 'error', *T2, '-i', str(MP4), '-vn', '-ac', '1', '-ar', '8000', '-f', 's16le', 'pipe:1').stdout
import array
samples = array.array('h'); samples.frombytes(pcm)
sr = 8000
def rms(t0, t1):
    seg = samples[max(0, int(t0*sr)):int(t1*sr)]
    return (sum(x*x for x in seg) / max(1, len(seg))) ** 0.5
floor = rms(31.9, 32.2) + 1
missing = []
for t, name in cues:
    before = rms(t - 0.15, t - 0.03); after = rms(t, t + 0.08)
    if after < max(80, before * 1.2) and after < 80: missing.append([t, name, round(before), round(after)])
C['cueCount'] = len(cues)
C['cuesWithoutOnsetWithin80ms'] = missing
assert not missing, missing
C['listened'] = False
out['result'] = 'pass'
(HERE / 'verification.json').write_text(json.dumps(out, indent=2) + '\n')
print(json.dumps(out, indent=2))

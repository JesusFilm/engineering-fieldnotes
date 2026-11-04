#!/usr/bin/env python3
"""Encoded-file verification for this cut. Run from the repository root:
python3 video/timeouts-and-retries/motion-v2/03/verify.py
Writes scratch frames (ignored by Git) and prints a JSON evidence summary."""
import hashlib, json, os, re, struct, subprocess, sys

CUT = 'video/timeouts-and-retries/motion-v2/03'
MP4 = os.path.join(CUT, 'video.mp4')
SCR = os.path.join(CUT, 'scratch', 'verify')
FPS = 30
# (label, playback seconds) for every beat midpoint and boundary.
POINTS = [
    ('open', 0.0), ('send1', 1.6), ('wait1', 4.5), ('timeout', 6.2), ('timeout+', 6.4), ('ghost2', 7.7),
    ('hold1', 9.0), ('cardOpenA', 10.0), ('cardOpenB', 10.3), ('matchOp', 11.2), ('readOnly', 12.4), ('afterTimeout', 13.6),
    ('enabled', 15.0), ('hold2', 16.6), ('cardCloseA', 17.2), ('cardCloseB', 17.5), ('sameQ', 18.7), ('send2', 20.0),
    ('wait2', 21.2), ('response', 22.3), ('arrival', 22.7), ('arrival+', 22.8), ('use', 23.7), ('hold3', 25.6),
    ('writeOpenA', 26.75), ('writeOpenB', 27.0), ('writeChanges', 27.9), ('writeRetry', 29.1), ('key', 30.5), ('keyNote', 31.6),
    ('hold4', 33.5), ('writeCloseA', 34.2), ('writeCloseB', 34.5), ('finalHold', 35.6), ('fade', 37.0), ('last', None)]

def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)

def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''): h.update(b)
    return h.hexdigest()

def atoms(p):
    out, off, size = [], 0, os.path.getsize(p)
    with open(p, 'rb') as f:
        while off < size:
            f.seek(off); hdr = f.read(16)
            n, typ = struct.unpack('>I4s', hdr[:8])
            if n == 1: n = struct.unpack('>Q', hdr[8:16])[0]
            out.append((typ.decode('latin1'), off, n)); off += n if n else size
    return out

os.makedirs(os.path.join(SCR, 'native'), exist_ok=True)
os.makedirs(os.path.join(SCR, 'w350'), exist_ok=True)
probe = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-count_frames', '-of', 'json', MP4]).stdout)
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
nframes = int(v['nb_read_frames'])
dec = run(['ffmpeg', '-v', 'error', '-xerror', '-i', MP4, '-f', 'null', '-'])
vd = run(['ffmpeg', '-hide_banner', '-i', MP4, '-af', 'volumedetect', '-vn', '-f', 'null', '-']).stderr
ast = run(['ffmpeg', '-hide_banner', '-i', MP4, '-af', 'astats=measure_overall=Peak_level:measure_perchannel=none', '-vn', '-f', 'null', '-']).stderr
max_vol = float(re.search(r'max_volume: (-?[\d.]+) dB', vd).group(1))
mean_vol = float(re.search(r'mean_volume: (-?[\d.]+) dB', vd).group(1))
peak = float(re.findall(r'Peak level dB: (-?[\d.]+)', ast)[-1])
order = [t for t, _, _ in atoms(MP4)]

frames = []
for label, t in POINTS:
    idx = nframes - 1 if t is None else min(nframes - 1, round(t * FPS))
    for sub, vf in (('native', 'select=eq(n\\,%d)' % idx), ('w350', 'select=eq(n\\,%d),scale=350:-1:flags=lanczos' % idx)):
        out = os.path.join(SCR, sub, '%04d_%s.png' % (idx, label))
        r = run(['ffmpeg', '-v', 'error', '-y', '-i', MP4, '-vf', vf, '-vsync', '0', '-frames:v', '1', out])
        if r.returncode or not os.path.exists(out): sys.exit('frame extract failed ' + label)
    frames.append({'label': label, 'frame': idx, 'time_s': round(idx / FPS, 3)})
# Contact sheet from the exact 350px frames, and a spectrogram.
run(['ffmpeg', '-v', 'error', '-y', '-pattern_type', 'glob', '-i', os.path.join(SCR, 'w350', '*.png'),
     '-vf', 'tile=9x4:padding=4', '-frames:v', '1', os.path.join(SCR, 'contact-350.png')])
run(['ffmpeg', '-v', 'error', '-y', '-i', MP4, '-lavfi', 'showspectrumpic=s=1800x500:fscale=log:legend=1', os.path.join(SCR, 'spectrogram.png')])
print(json.dumps({
    'sha256': sha(MP4), 'bytes': os.path.getsize(MP4),
    'format_duration_s': float(probe['format']['duration']),
    'video': {'codec': v['codec_name'], 'width': v['width'], 'height': v['height'], 'pix_fmt': v['pix_fmt'],
              'r_frame_rate': v['r_frame_rate'], 'frames_decoded': nframes, 'duration_s': float(v['duration'])},
    'audio': {'codec': a['codec_name'], 'sample_rate': int(a['sample_rate']), 'channels': a['channels'], 'duration_s': float(a['duration'])},
    'full_decode': {'exit_code': dec.returncode, 'errors': dec.stderr.strip()},
    'audio_levels': {'volumedetect_max_db': max_vol, 'volumedetect_mean_db': mean_vol, 'astats_peak_db': peak, 'ceiling_db': -0.5,
                     'pass': max(max_vol, peak) <= -0.5},
    'top_level_atoms': order, 'moov_before_mdat': order.index('moov') < order.index('mdat'),
    'frames': frames}, indent=1))

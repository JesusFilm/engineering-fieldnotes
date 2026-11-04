#!/usr/bin/env python3
"""Encoded-file verification for this cut. Run from the repository root:
python3 video/timeouts-and-retries/motion-v2/04/verify.py
Writes scratch frames (ignored by Git) and prints a JSON evidence summary."""
import hashlib, json, os, re, struct, subprocess, sys

CUT = 'video/timeouts-and-retries/motion-v2/04'
MP4 = os.path.join(CUT, 'video.mp4')
SCR = os.path.join(CUT, 'scratch', 'verify')
FPS = 30
# (label, playback seconds) for every beat midpoint and boundary.
POINTS = [
    ('open', 0.0), ('fadein', 0.5), ('send1', 1.6), ('arrive1', 2.0), ('fail', 2.55), ('errors', 3.2), ('errBack', 3.55), ('hold1', 4.8),
    ('hypHead', 5.5), ('hypMarks', 6.1), ('hypHold', 7.5), ('hypDismiss', 8.6), ('hypGone', 9.0), ('backoffHead', 9.3), ('eqBars', 10.0),
    ('eqFrame', 10.9), ('eqFrameOff', 12.1), ('jitterHead', 12.3), ('drawA', 13.0), ('drawB', 13.4), ('drawC', 13.8), ('caveat', 14.6),
    ('waitStart', 15.5), ('waitMid', 16.7), ('relA', 17.45), ('arrA', 18.05), ('errA', 18.85), ('relB', 19.65), ('arrB', 20.25), ('errB', 21.05),
    ('relC', 21.45), ('arrC', 22.05), ('errC', 22.85), ('cursorOff', 23.0), ('hold4', 23.9), ('spreadHead', 24.5), ('firstPulse', 25.0),
    ('pulseA', 26.05), ('pulseB', 27.15), ('pulseC', 28.05), ('stillHead', 28.7), ('stillPulse', 29.0), ('hold5', 30.0), ('limitHead', 30.7),
    ('stopA', 31.35), ('stopB', 31.8), ('stopC', 32.3), ('finalHold', 33.5), ('fadeMid', 34.9), ('last', None)]

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
     '-vf', 'tile=10x5:padding=4', '-frames:v', '1', os.path.join(SCR, 'contact-350.png')])
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

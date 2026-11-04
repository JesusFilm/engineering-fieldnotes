#!/usr/bin/env python3
"""Encoded-file verification for this cut. Run from the repository root:
python3 video/timeouts-and-retries/motion-v2/05/verify.py
Writes scratch frames (ignored by Git) and prints a JSON evidence summary.
Frames are selected by exact decoded index (select=eq(n,N)), never by seeking."""
import hashlib, json, os, re, struct, subprocess, sys

CUT = 'video/timeouts-and-retries/motion-v2/05'
MP4 = os.path.join(CUT, 'video.mp4')
SCR = os.path.join(CUT, 'scratch', 'verify')
FPS = 30
# (label, frame index) for every beat midpoint and boundary; None = last frame.
# Policy boundaries: try 1 timeout = frame 420, sleep ends = 594, deadline = 1020.
POINTS = [
    ('open', 0), ('laneIn', 27), ('budgetIn', 57), ('perTry', 102), ('send1', 138), ('gateGo1', 150), ('arrive1', 171),
    ('run1Start', 180), ('run1Mid', 300), ('preTimeout1', 419), ('timeout1', 420), ('postTimeout1', 421), ('chip7', 456),
    ('sleepIn', 492), ('sleepMid', 546), ('preWake', 593), ('wake', 594), ('chip5', 624), ('send2', 648), ('gateGo2', 666),
    ('overhead', 696), ('rearm', 714), ('noReset', 738), ('arrive2', 765), ('run3Start', 780), ('run3Mid', 900),
    ('preDeadline', 1019), ('deadline', 1020), ('postDeadline', 1023), ('deadlineHold', 1050), ('ghost3', 1080),
    ('refuse3', 1092), ('refuseHold', 1116), ('result', 1149), ('finalHold', 1215), ('fadeMid', 1284), ('last', None)]

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

for sub in ('native', 'w350'):
    d = os.path.join(SCR, sub); os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(os.path.join(d, f))
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
for label, idx in POINTS:
    idx = nframes - 1 if idx is None else min(nframes - 1, idx)
    for sub, vf in (('native', 'select=eq(n\\,%d)' % idx), ('w350', 'select=eq(n\\,%d),scale=350:-1:flags=lanczos' % idx)):
        out = os.path.join(SCR, sub, '%04d_%s.png' % (idx, label))
        r = run(['ffmpeg', '-v', 'error', '-y', '-i', MP4, '-vf', vf, '-vsync', '0', '-frames:v', '1', out])
        if r.returncode or not os.path.exists(out): sys.exit('frame extract failed ' + label)
    frames.append({'label': label, 'frame': idx, 'time_s': round(idx / FPS, 3)})
run(['ffmpeg', '-v', 'error', '-y', '-pattern_type', 'glob', '-i', os.path.join(SCR, 'w350', '*.png'),
     '-vf', 'tile=10x4:padding=4', '-frames:v', '1', os.path.join(SCR, 'contact-350.png')])
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


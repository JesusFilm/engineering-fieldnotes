#!/usr/bin/env python3
"""Verify public/media/guardrails-and-permissions/fable.mp4 against the project's media requirements.

Run from anywhere: python3 video/guardrails-and-permissions/fable/verify.py
Writes verification.json beside this script and exits non-zero on any failed check.
Checks: container/codec/geometry/fps/pixel format, faststart (moov before mdat), size < 2 MB,
full decode without errors, frame count, audio stream present, audio peak <= -0.5 dBFS,
decoded first and last frames identical, scheduled sound cues all inside the duration,
and that every cue has a visible scene change within 0.15 s (from the scene's own schedule).
"""
import json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MP4 = os.path.join(ROOT, 'public', 'media', 'guardrails-and-permissions', 'fable.mp4')
JPG = os.path.join(ROOT, 'public', 'media', 'guardrails-and-permissions', 'fable.jpg')
TH = ['-threads', '2']

def sh(args, text=True):
    if args[0] == 'ffmpeg':
        args = [args[0], '-filter_threads', '2', '-filter_complex_threads', '2', *args[1:-1], '-threads', '2', args[-1]]
    return subprocess.run(args, capture_output=True, text=text)

checks = {}
def check(name, ok, detail):
    checks[name] = {'ok': bool(ok), 'detail': detail}
    print(('PASS' if ok else 'FAIL'), name, '-', detail)

probe = json.loads(sh(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', MP4]).stdout)
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next((s for s in probe['streams'] if s['codec_type'] == 'audio'), None)
dur = float(probe['format']['duration'])
size = int(probe['format']['size'])
check('video_codec', v['codec_name'] == 'h264' and v['pix_fmt'] == 'yuv420p', f"{v['codec_name']} {v['pix_fmt']}")
check('geometry', v['width'] == 1080 and v['height'] == 1920 and v['r_frame_rate'] == '30/1', f"{v['width']}x{v['height']} @ {v['r_frame_rate']}")
check('audio_stream', a is not None and a['codec_name'] == 'aac', a['codec_name'] if a else 'none')
check('duration_22_35s', 22 <= dur <= 35, f'{dur:.2f}s')
check('size_under_2MB', size < 2_000_000, f'{size} bytes')
with open(MP4, 'rb') as fh:
    head = fh.read(4096)
check('faststart', b'moov' in head and (b'mdat' not in head or head.find(b'moov') < head.find(b'mdat')), 'moov atom before mdat')
check('poster_exists', os.path.exists(JPG) and os.path.getsize(JPG) > 10_000, f'{os.path.getsize(JPG) if os.path.exists(JPG) else 0} bytes')

dec = sh(['ffmpeg', '-hide_banner', '-v', 'error', *TH, '-i', MP4, '-f', 'null', '-'])
check('full_decode_clean', dec.returncode == 0 and dec.stderr.strip() == '', dec.stderr.strip() or 'no decoder errors')
frames = sh(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_frames', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', MP4]).stdout.strip()
check('frame_count', frames == str(round(dur * 30)), f'{frames} frames')

vol = sh(['ffmpeg', '-hide_banner', *TH, '-i', MP4, '-af', 'volumedetect', '-f', 'null', '-']).stderr
peak = float(re.search(r'max_volume: (-?[\d.]+) dB', vol).group(1))
mean = float(re.search(r'mean_volume: (-?[\d.]+) dB', vol).group(1))
check('audio_peak_le_-0.5dBFS', peak <= -0.5, f'max {peak} dB, mean {mean} dB')

with tempfile.TemporaryDirectory(dir=os.path.join(ROOT, 'reviews', 'comparisons', 'guardrails-and-permissions', 'scratch')) as td:
    first, last = os.path.join(td, 'first.raw'), os.path.join(td, 'last.raw')
    sh(['ffmpeg', '-y', '-v', 'error', *TH, '-i', MP4, '-vf', 'select=eq(n\,0)', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', first])
    sh(['ffmpeg', '-y', '-v', 'error', *TH, '-i', MP4, '-vf', f'select=eq(n\\,{int(frames)-1})', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', last])
    fa, fb = open(first, 'rb').read(), open(last, 'rb').read()
    check('first_last_frames_identical', fa == fb and len(fa) == 1080 * 1920 * 3, 'byte-identical decoded RGB' if fa == fb else 'differ')

# Cue/visual synchrony from the scene schedule (what the renderer actually used).
js = r'''
const F=require(process.argv[1]); require(process.argv[2]);
const sc=F.createScene(F.lastScene); const S=sc.s;
console.log(JSON.stringify({renderDuration: sc.meta.renderDuration, speed: sc.meta.speed, cues: sc.audioCues().map(c=>({t:+c.t.toFixed(3), name:c.name}))}));
'''
out = sh(['node', '-e', js, os.path.join(HERE, 'engine', 'flow-engine.js'), os.path.join(HERE, 'scene.js')]).stdout
sched = json.loads(out)
cues = sched['cues']
check('cues_within_duration', all(0 <= c['t'] < dur for c in cues), f"{len(cues)} cues, last at {cues[-1]['t']}s of {dur:.2f}s")
check('render_duration_matches', abs(sched['renderDuration'] - dur) < 0.05, f"scene {sched['renderDuration']:.2f}s vs file {dur:.2f}s")

# Visual change per cue: compare decoded frames just before and 0.15 s after each cue.
def frame_bytes(t):
    r = sh(['ffmpeg', '-v', 'error', *TH, '-ss', f'{max(0,t):.3f}', '-i', MP4, '-frames:v', '1', '-vf', 'scale=270:480', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], text=False)
    return r.stdout
silent = []
for c in cues:
    b0, b1 = frame_bytes(c['t'] - 0.1), frame_bytes(c['t'] + 0.15)
    changed = sum(1 for x, y in zip(b0, b1) if abs(x - y) > 24)
    if changed < 40: silent.append((c['t'], c['name'], changed))
check('every_cue_has_visible_change', not silent, 'all cues paired with a frame change' if not silent else f'unpaired: {silent}')

result = {'file': os.path.relpath(MP4, ROOT), 'poster': os.path.relpath(JPG, ROOT), 'duration': round(dur, 2), 'size': size,
          'audio_max_dbfs': peak, 'audio_mean_dbfs': mean, 'frames': int(frames), 'cues': len(cues), 'checks': checks,
          'audio_heard': False, 'note': 'Audio was analysed (volumedetect, spectrogram, cue schedule), not listened to.'}
json.dump(result, open(os.path.join(HERE, 'verification.json'), 'w'), indent=2)
ok = all(c['ok'] for c in checks.values())
print('ALL CHECKS PASSED' if ok else 'SOME CHECKS FAILED')
sys.exit(0 if ok else 1)


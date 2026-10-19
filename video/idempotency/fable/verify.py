"""Verify the fable idempotency cut: probe, boundaries, decode, audio, faststart, poster, review images.
Run from the repository root: python3 video/idempotency/fable/verify.py [--poster-time 27.0]
Writes video/idempotency/fable/verification.json and review images under scratch/. FFmpeg is limited to 2 threads.
"""
import argparse, hashlib, json, pathlib, re, struct, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
HERE = pathlib.Path(__file__).resolve().parent
MP4 = ROOT / 'public/media/idempotency/fable.mp4'
JPG = ROOT / 'public/media/idempotency/fable.jpg'
SCR = HERE / 'scratch'
BEATS = [3.4, 7.7, 9.9, 13.9, 17.6, 20.1, 24.7, 26.4]

def run(*a, **k):
    return subprocess.run(a, capture_output=True, text=True, check=True, **k)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--poster-time', type=float, default=27.0); ap.add_argument('--no-poster', action='store_true')
    args = ap.parse_args()
    out = {'file': 'media/idempotency/fable.mp4', 'poster': 'media/idempotency/fable.jpg', 'checks': {}, 'ok': True}
    c = out['checks']
    probe = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(MP4)).stdout)
    v = next(s for s in probe['streams'] if s['codec_type'] == 'video'); a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
    dur = float(probe['format']['duration']); frames = int(v['nb_frames']); size = MP4.stat().st_size
    c['container'] = {'codec': v['codec_name'], 'pix_fmt': v['pix_fmt'], 'width': v['width'], 'height': v['height'], 'fps': v['r_frame_rate'], 'audio': a['codec_name'], 'audio_rate': a['sample_rate'], 'duration': dur, 'frames': frames, 'bytes': size, 'faststart_flags': probe['format'].get('tags', {})}
    c['container_ok'] = (v['codec_name'], v['pix_fmt'], v['width'], v['height'], v['r_frame_rate'], a['codec_name']) == ('h264', 'yuv420p', 1080, 1920, '30/1', 'aac') and 22 <= dur <= 35 and size < 2_000_000
    # exact first/last frame equality
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(MP4), '-vf', f'select=eq(n\,0)+eq(n\,{frames-1})', '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', '-threads', '2', '-f', 'rawvideo', 'pipe:1'], capture_output=True, check=True).stdout
    n = 1080 * 1920 * 3
    c['boundary'] = {'frames_extracted': len(raw) // n, 'first_sha256': hashlib.sha256(raw[:n]).hexdigest(), 'last_sha256': hashlib.sha256(raw[n:2*n]).hexdigest()}
    c['boundary_ok'] = len(raw) == 2 * n and raw[:n] == raw[n:]
    # full decode with -xerror
    dec = subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-threads', '2', '-i', str(MP4), '-f', 'null', '-'], capture_output=True, text=True)
    c['decode'] = {'returncode': dec.returncode, 'stderr': dec.stderr.strip()[:500]}
    c['decode_ok'] = dec.returncode == 0 and not dec.stderr.strip()
    # audio levels
    vol = subprocess.run(['ffmpeg', '-hide_banner', '-threads', '2', '-i', str(MP4), '-vn', '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    peak = float(re.search(r'max_volume: ([-\d.]+) dB', vol).group(1)); mean = float(re.search(r'mean_volume: ([-\d.]+) dB', vol).group(1))
    c['audio'] = {'max_volume_dbfs': peak, 'mean_volume_dbfs': mean}
    c['audio_ok'] = -40 < peak <= -0.5
    # faststart: moov before mdat
    data = MP4.read_bytes(); boxes = {}; pos = 0
    while pos + 8 <= len(data):
        length, kind = struct.unpack('>I4s', data[pos:pos+8]); header = 8
        if length == 1: length = struct.unpack('>Q', data[pos+8:pos+16])[0]; header = 16
        if length == 0: length = len(data) - pos
        boxes[kind.decode('latin1')] = pos; pos += max(length, header)
    c['faststart_ok'] = boxes.get('moov', 1e18) < boxes.get('mdat', -1); c['boxes'] = boxes
    # poster
    if not args.no_poster:
        run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-ss', str(args.poster_time), '-i', str(MP4), '-frames:v', '1', '-q:v', '3', str(JPG))
    pic = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(JPG)).stdout)['streams'][0]
    c['poster'] = {'codec': pic['codec_name'], 'width': pic['width'], 'height': pic['height'], 'bytes': JPG.stat().st_size, 'time': args.poster_time}
    c['poster_ok'] = pic['codec_name'] == 'mjpeg' and abs(pic['width'] / pic['height'] - 9 / 16) < 0.002 and JPG.stat().st_size > 1000
    # review images: encoded beat frames at full size and 350px, contact sheet, spectrogram
    enc = SCR / 'encoded'; enc.mkdir(parents=True, exist_ok=True)
    for t in BEATS:
        full = enc / f'beat_{t:05.1f}s.png'
        run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-ss', str(t), '-i', str(MP4), '-frames:v', '1', str(full))
        run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-i', str(full), '-vf', 'scale=350:-1', str(enc / f'beat_{t:05.1f}s-350.png'))
    run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-i', str(MP4), '-vf', 'fps=1,scale=180:-1,tile=10x3', '-frames:v', '1', str(SCR / 'contact-sheet.png'))
    run('ffmpeg', '-y', '-v', 'error', '-threads', '2', '-i', str(MP4), '-lavfi', 'showspectrumpic=s=1800x500:fscale=log', str(SCR / 'spectrogram.png'))
    # audio cue / onset alignment: compare scheduled cue times with energy onsets in the decoded audio
    pcm = subprocess.run(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(MP4), '-vn', '-ac', '1', '-ar', '8000', '-f', 's16le', 'pipe:1'], capture_output=True, check=True).stdout
    import array
    sam = array.array('h'); sam.frombytes(pcm)
    win = 80  # 10 ms
    env = [sum(abs(x) for x in sam[i:i+win]) / win for i in range(0, len(sam) - win, win)]
    onsets = [i * 0.01 for i in range(1, len(env)) if env[i] > 250 and env[i] > env[i-1] * 2.5]
    cues = json.loads(run('node', '-e', "const F=require('./video/idempotency/fable/engine/flow-engine.js');require('./video/idempotency/fable/scene.js');const sc=F.createScene(F.lastScene);console.log(JSON.stringify(sc.audioCues().map(c=>[+c.t.toFixed(3),c.name])))", cwd=ROOT).stdout)
    matched = []
    for t, name in cues:
        near = [o for o in onsets if abs(o - t) <= 0.06]
        matched.append({'t': t, 'name': name, 'onset_within_60ms': bool(near)})
    c['cue_alignment'] = {'cues': len(cues), 'onsets_detected': len(onsets), 'matched': sum(1 for m in matched if m['onset_within_60ms']), 'unmatched': [m for m in matched if not m['onset_within_60ms']]}
    c['sha256'] = hashlib.sha256(data).hexdigest(); c['poster_sha256'] = hashlib.sha256(JPG.read_bytes()).hexdigest()
    out['ok'] = all(c[k] for k in ('container_ok', 'boundary_ok', 'decode_ok', 'audio_ok', 'faststart_ok', 'poster_ok'))
    out['listening'] = 'Audio analysed numerically (peak, spectrogram, onset alignment); not physically listened to.'
    (HERE / 'verification.json').write_text(json.dumps(out, indent=2) + '\n')
    print(json.dumps({k: c[k] for k in c if k.endswith('_ok')} | {'duration': dur, 'bytes': size, 'peak': peak, 'cues': c['cue_alignment']['cues'], 'matched': c['cue_alignment']['matched'], 'unmatched': [(m['t'], m['name']) for m in c['cue_alignment']['unmatched']]}, indent=1))
    sys.exit(0 if out['ok'] else 1)

if __name__ == '__main__':
    main()


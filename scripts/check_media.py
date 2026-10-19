"""Validate actual media, cache by content hash, and retain reproducible evidence."""
import argparse
import hashlib
import json
import pathlib
import re
import struct
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
EVIDENCE = ROOT / 'reviews/media-checks.json'


def run(*args):
    return subprocess.check_output(args)


def check(concepts=None):
    evidence = json.loads(EVIDENCE.read_text()) if EVIDENCE.exists() else {}
    files = sorted((ROOT / 'public/media').rglob('*.mp4'))
    if concepts:
        known = json.loads((ROOT / 'content/order.json').read_text())
        assert set(concepts) <= set(known), 'Unknown concept ID'
        files = [file for file in files if file.parent.name in concepts]
    for file in files:
        key = str(file.relative_to(ROOT / 'public'))
        data = file.read_bytes(); digest = hashlib.sha256(data).hexdigest()
        poster = file.with_suffix('.jpg')
        poster_digest = hashlib.sha256(poster.read_bytes()).hexdigest() if poster.exists() else None
        previous = evidence.get(key, {})
        if previous.get('schemaVersion') == 2 and previous.get('sha256') == digest and previous.get('posterSha256') == poster_digest: continue
        probe = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(file)))
        video = next(s for s in probe['streams'] if s['codec_type'] == 'video')
        audio = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
        assert (video['codec_name'], video['pix_fmt'], video['width'], video['height'], video['r_frame_rate']) == ('h264', 'yuv420p', 1080, 1920, '30/1'), key
        assert audio['codec_name'] == 'aac', key
        assert 5 < float(probe['format']['duration']) < 60, key
        assert len(data) < 3_000_000, key + ': over 3 MB per-cut budget'
        count = int(video['nb_frames'])
        frames = run('ffmpeg', '-v', 'error', '-threads', '2', '-i', str(file), '-vf', f'select=eq(n\\,0)+eq(n\\,{count-1})', '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', '-threads', '2', '-f', 'rawvideo', 'pipe:1')
        size = 1080 * 1920 * 3
        assert len(frames) == size * 2 and frames[:size] == frames[size:], key + ': boundary mismatch'
        decode = subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-threads', '2', '-i', str(file), '-f', 'null', '-'], capture_output=True, check=True)
        assert not decode.stderr, key + ': decode warnings'
        volume = subprocess.run(['ffmpeg', '-hide_banner', '-threads', '2', '-i', str(file), '-vn', '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True, check=True).stderr
        peak = float(re.search(r'max_volume: ([-\d.]+) dB', volume).group(1))
        assert -40 < peak <= -0.5, key + ': audio level outside bounds'
        boxes, pos = {}, 0
        while pos + 8 <= len(data):
            length, kind = struct.unpack('>I4s', data[pos:pos+8]); header = 8
            if length == 1: length = struct.unpack('>Q', data[pos+8:pos+16])[0]; header = 16
            if length == 0: length = len(data) - pos
            assert length >= header
            boxes[kind] = pos; pos += length
        assert boxes[b'moov'] < boxes[b'mdat'], key + ': faststart missing'
        assert poster.is_file() and poster.stat().st_size > 1000, key + ': poster missing'
        picture = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(poster)))['streams'][0]
        assert picture['codec_name'] == 'mjpeg' and abs(picture['width'] / picture['height'] - 9/16) < 0.002, key + ': invalid portrait poster'
        evidence[key] = {'schemaVersion': 2, 'sha256': digest, 'posterSha256': poster_digest, 'duration': float(video['duration']), 'bytes': len(data), 'frames': count, 'audioPeakDbfs': peak, 'matchingBoundaryFrames': True, 'fullDecode': True, 'faststart': True}
        EVIDENCE.write_text(json.dumps(evidence, indent=2) + '\n')
        print(f'{key}: verified ({peak} dBFS)', flush=True)
    print(f'{len(files)} media files checked against hash-bound evidence.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--concept', action='append', help='Check one concept; may be repeated. The default checks the whole library.')
    check(parser.parse_args().concept)

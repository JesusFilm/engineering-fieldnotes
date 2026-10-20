"""Verify complete lesson coverage and encoded media; cache only exact file hashes."""
from pathlib import Path
import hashlib, json, re, struct, subprocess
ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / 'reviews/sequence-media-checks.json'
def run(*args):
    return subprocess.check_output(args)
def check():
    evidence = json.loads(REPORT.read_text()) if REPORT.exists() else {}
    order = json.loads((ROOT/'content/order.json').read_text())
    total = 0
    for topic in order:
        manifest = ROOT/f'video/{topic}/sequence/lessons.json'
        assert manifest.exists(), f'{topic}: no sequence'
        lessons = json.loads(manifest.read_text())
        assert len(lessons) >= 3, f'{topic}: not broken into focused lessons'
        for number, lesson in enumerate(lessons, 1):
            total += 1
            key = lesson['src']; file = ROOT/'public'/key
            poster = ROOT/'public'/lesson['poster']
            assert file.exists() and poster.exists(), key
            data = file.read_bytes()
            digest = hashlib.sha256(data).hexdigest()
            poster_digest = hashlib.sha256(poster.read_bytes()).hexdigest()
            scene = ROOT/f'video/{topic}/sequence/{number:02}.js'
            engine = ROOT/('video/load-balancing/sequence/engine' if topic == 'load-balancing' else 'video/shared/sequence-engine')
            source_digest = hashlib.sha256(scene.read_bytes()+b''.join((engine/name).read_bytes() for name in ['flow-engine.js','sfx.js','render.mjs','preview.html'])).hexdigest()
            old = evidence.get(key, {})
            if topic != 'load-balancing':
                stamp_path = scene.parent/f'scratch/{number:02}.render.json'
                if stamp_path.exists():
                    stamp = json.loads(stamp_path.read_text())
                    assert stamp['sourceHash'] == source_digest and stamp['mediaHash'] == digest, f'{key}: render source mismatch'
                else:
                    assert old.get('sourceSha256') == source_digest and old.get('sha256') == digest, f'{key}: no matching render provenance; render this lesson first'
            if old.get('sourceSha256') == source_digest and old.get('sha256') == digest and old.get('posterSha256') == poster_digest and old.get('expectedDuration') == lesson['duration']:
                continue
            probe = json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',str(file)))
            video = next(s for s in probe['streams'] if s['codec_type']=='video')
            audio = next(s for s in probe['streams'] if s['codec_type']=='audio')
            assert (video['codec_name'], video['pix_fmt'], video['width'], video['height']) == ('h264','yuv420p',1080,1920), key
            assert audio['codec_name']=='aac', key
            duration = float(probe['format']['duration'])
            assert abs(duration-lesson['duration']) < .15, (key,duration)
            decode = subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-i',str(file),'-f','null','-'],capture_output=True,check=True)
            assert not decode.stderr, key
            volume = subprocess.run(['ffmpeg','-hide_banner','-threads','2','-i',str(file),'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True,check=True).stderr
            peak = float(re.search(r'max_volume: ([-\d.]+) dB',volume).group(1))
            assert -40 < peak <= -.5, (key,peak)
            boxes, pos = {}, 0
            while pos+8 <= len(data):
                length,kind = struct.unpack('>I4s',data[pos:pos+8])
                if length==1: length=struct.unpack('>Q',data[pos+8:pos+16])[0]
                if length==0: length=len(data)-pos
                assert length>=8
                boxes[kind]=pos; pos+=length
            assert boxes[b'moov']<boxes[b'mdat'], key
            picture=json.loads(run('ffprobe','-v','error','-show_streams','-of','json',str(poster)))['streams'][0]
            assert abs(picture['width']/picture['height']-9/16)<.002, key
            evidence[key]=dict(sha256=digest,sourceSha256=source_digest,posterSha256=poster_digest,expectedDuration=lesson['duration'],duration=duration,audioPeakDbfs=peak,fullDecode=True,faststart=True,audioReview='analysed, not listened',visualReview='separate review required')
            REPORT.write_text(json.dumps(evidence,indent=2)+'\n')
            print('Verified',key,flush=True)
    print(f'{len(order)} topics, {total} lessons verified.')
if __name__=='__main__': check()

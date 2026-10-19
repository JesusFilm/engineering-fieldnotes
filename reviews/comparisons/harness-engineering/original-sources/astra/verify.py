#!/usr/bin/env python3
"""Run from any directory. Outputs are confined to this variant and its media."""
from pathlib import Path
import array, hashlib, json, math, re, struct, subprocess, sys, wave

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SCRATCH = HERE / 'scratch'
MEDIA = ROOT / 'public/media/harness-engineering/astra.mp4'
SCRATCH.mkdir(exist_ok=True)

def run(args):
    return subprocess.run([str(a) for a in args], check=True, capture_output=True, text=True)

def ff(*args):
    return run(['ffmpeg', '-y', '-v', 'error', '-threads', '2',
                '-filter_threads', '2', '-filter_complex_threads', '2', *args])

probe = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format',
                        '-of', 'json', MEDIA]).stdout)
(SCRATCH / 'probe.json').write_text(json.dumps(probe, indent=2) + '\n')
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate']) == ('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name'] == 'aac'
duration = float(probe['format']['duration'])
assert 22 <= duration <= 35
assert MEDIA.stat().st_size < 2_000_000

# Full video decode, not just probing. Retain hashes for every decoded frame.
decoded = ff('-i',MEDIA,'-map','0:v:0','-an','-threads','2','-f','framemd5',SCRATCH/'frames.md5')
assert not decoded.stderr.strip(), decoded.stderr
rows = [r for r in (SCRATCH/'frames.md5').read_text().splitlines() if r and not r.startswith('#')]
first_hash,last_hash = (r.split(',')[-1].strip() for r in [rows[0],rows[-1]])
assert len(rows) == 840
assert first_hash == last_hash, 'Decoded first and last frames differ'

# Full audio decode and measured peak on the actual AAC track.
ff('-i',MEDIA,'-map','0:a:0','-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-threads','2',SCRATCH/'decoded.wav')
levels = run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',MEDIA,
              '-vn','-af','volumedetect','-threads','2','-f','null','-'])
(SCRATCH/'audio-levels.txt').write_text(levels.stderr)
peak = float(re.search(r'max_volume: ([\-\d.]+) dB',levels.stderr)[1])
assert peak <= -0.5, peak

# Get the actual scheduled cues from the authored scene, not a duplicated list.
js = "const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"
cues = json.loads(subprocess.run(['node','-e',js],cwd=HERE,check=True,capture_output=True,text=True).stdout)
(SCRATCH/'cues.json').write_text(json.dumps(cues,indent=2)+'\n')
with wave.open(str(SCRATCH/'decoded.wav')) as w:
    rate=w.getframerate(); samples=array.array('h',w.readframes(w.getnframes()))
if sys.byteorder != 'little': samples.byteswap()
cue_measurements=[]
for c in cues:
    # AAC decoded sound in the first 180ms after the scheduled visible event.
    window=samples[int(c['t']*rate):int((c['t']+.18)*rate)]
    rms=math.sqrt(sum(x*x for x in window)/len(window))/32768
    db=20*math.log10(max(rms,1e-10))
    assert db > -50, (c,db)
    cue_measurements.append({'time':c['t'],'sound':c['name'],'rmsFirst180msDbfs':round(db,2)})

# Parse top-level atoms rather than searching strings that might occur in payloads.
atoms=[]
with MEDIA.open('rb') as f:
    while f.tell()<MEDIA.stat().st_size:
        pos=f.tell(); h=f.read(8)
        size,tag=struct.unpack('>I4s',h)
        if size==1: size=struct.unpack('>Q',f.read(8))[0]
        if size==0: size=MEDIA.stat().st_size-pos
        assert size>=8
        atoms.append({'type':tag.decode('ascii'),'offset':pos,'size':size})
        f.seek(pos+size)
assert next(x['offset'] for x in atoms if x['type']=='moov') < next(x['offset'] for x in atoms if x['type']=='mdat')

# Phone-size and full-resolution frames from the encoded asset.
for t in [3.5,7.5,10,13,19.5,23]:
    for width in [350,1080]:
        ff('-ss',t,'-i',MEDIA,'-vf',f'scale={width}:-1','-frames:v','1','-threads','2',SCRATCH/f'beat-{t:g}-{width}.png')
ff('-ss','23','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',MEDIA.with_suffix('.jpg'))
ff('-i',MEDIA,'-lavfi','showspectrumpic=s=1800x500:fscale=log:legend=1','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png')
# Contact sheet around every semantic transition, before and after at 30fps.
transitions=[.5,1.8,2.55,5,5.75,6.6,9.2,10.4,11.4,12.2,15,15.75,17.4,18.15,21,21.75,25.5,26.5]
frames=sorted(set(max(0,round(t*30)+offset) for t in transitions for offset in [-1,3]))
selection='+'.join(f'eq(n,{n})' for n in frames)
ff('-i',MEDIA,'-vf',f"select='{selection}',scale=240:-1,tile=6x6",'-frames:v','1','-threads','2',SCRATCH/'boundaries.png')

report={'duration':duration,'bytes':MEDIA.stat().st_size,'width':v['width'],'height':v['height'],
        'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],
        'audioCodec':a['codec_name'],'audioSampleRate':int(a['sample_rate']),
        'decodedFrames':len(rows),'firstFrameMd5':first_hash,'lastFrameMd5':last_hash,
        'firstLastExactlyEqual':True,'audioMaxDbfs':peak,'faststart':True,'atoms':atoms,
        'cueMeasurements':cue_measurements,'physicalListening':False,
        'sha256':hashlib.sha256(MEDIA.read_bytes()).hexdigest()}
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['atoms','cueMeasurements']},indent=2))

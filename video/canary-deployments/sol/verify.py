"""Encoded verification; run from any directory. Only this cut's owned outputs change."""
from pathlib import Path
import array, hashlib, json, math, re, struct, subprocess
from datetime import datetime, timezone
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
SCRATCH=BASE/'scratch'
MOVIE=ROOT/'public/media/canary-deployments/sol.mp4'
POSTER=MOVIE.with_suffix('.jpg')
SCRATCH.mkdir(exist_ok=True)
def run(args):
    return subprocess.run(args,check=True,capture_output=True)
def ff(*args):
    return run(['ffmpeg','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)])
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(MOVIE)]).stdout)
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac'
assert float(probe['format']['duration'])==28
assert int(v['nb_frames'])==840
assert MOVIE.stat().st_size<2_000_000
# Decode every frame and every audio packet; the same pass measures encoded audio levels.
decode=run(['ffmpeg','-hide_banner','-xerror','-threads','2','-filter_threads','2','-i',str(MOVIE),'-af','volumedetect','-threads','2','-f','null','-'])
log=decode.stderr.decode(); (SCRATCH/'decode.log').write_text(log)
assert not re.search(r'Error while|Invalid data|corrupt',log,re.I)
peak=float(re.search(r'max_volume: ([\-\d.]+)',log).group(1)); assert peak<=-.5
# Compare decoded pixels, not merely source canvas states.
hashes=ff('-i',MOVIE,'-vf',"select=eq(n\\,0)+eq(n\\,839)",'-fps_mode','passthrough','-an','-f','framemd5','-').stdout.decode()
lines=[l for l in hashes.splitlines() if l and not l.startswith('#')]
assert len(lines)==2
first,last=[l.split(',')[-1].strip() for l in lines];assert first==last
(SCRATCH/'boundary.framemd5').write_text(hashes)
# ISO BMFF atoms: moov must precede mdat for fast start.
b=MOVIE.read_bytes(); offset=0;atoms=[]
while offset+8<=len(b):
    size,kind=struct.unpack('>I4s',b[offset:offset+8]); header=8
    if size==1: size=struct.unpack('>Q',b[offset+8:offset+16])[0];header=16
    if size==0: size=len(b)-offset
    assert size>=header
    atoms.append({'type':kind.decode('ascii'),'offset':offset,'size':size});offset+=size
assert next(x['offset'] for x in atoms if x['type']=='moov')<next(x['offset'] for x in atoms if x['type']=='mdat')
# Extract all beats and boundaries from the delivery encode, including the busiest traffic.
times=[0,3.3,8.8,11.9,14.6,17.5,18.5,20,24.3,27.966667]
for i,t in enumerate(times):
    ff('-y','-ss',t,'-i',MOVIE,'-frames:v','1','-threads','2',SCRATCH/f'beat-{i:02d}-full.png')
    ff('-y','-ss',t,'-i',MOVIE,'-vf','scale=350:-1','-frames:v','1','-threads','2',SCRATCH/f'beat-{i:02d}-350.png')
ff('-y','-ss','14.6','-i',MOVIE,'-frames:v','1','-q:v','2','-threads','2',POSTER)
ff('-y','-i',MOVIE,'-lavfi','showspectrumpic=s=1800x500:fscale=log:legend=1','-frames:v','1','-threads','2',SCRATCH/'spectrogram.png')
# Cue timestamps are the same schedule used by the frame and synthesized-audio renderers.
js="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()))"
cues=json.loads(subprocess.run(['node','-e',js],cwd=BASE,check=True,capture_output=True).stdout)
(BASE/'cue-map.json').write_text(json.dumps(cues,indent=2)+'\n')
pcm=ff('-i',MOVIE,'-vn','-ar','44100','-ac','1','-f','f32le','-').stdout
samples=array.array('f'); samples.frombytes(pcm)
cue_checks=[]
for t in sorted(set(c['t'] for c in cues)):
    portion=samples[int((t+.015)*44100):int((t+.115)*44100)]
    rms=math.sqrt(sum(x*x for x in portion)/len(portion)); db=20*math.log10(max(rms,1e-12))
    assert db>-60,(t,db)
    cue_checks.append({'time':t,'rms_dbfs_15_to_115ms_after_cue':round(db,2)})
# Compare the decoded failure sound to its deterministic source to measure AAC timing.
reference_js="const fs=require('node:fs'),F=require('./engine/flow-engine.js'),S=require('./engine/sfx.js');require('./scene.js');const s=F.createScene(F.lastScene);fs.writeFileSync('scratch/reference.wav',Buffer.from(S.toWav(S.render(s.audioCues(),28,{presets:s.sounds}))))"
subprocess.run(['node','-e',reference_js],cwd=BASE,check=True)
ref_bytes=ff('-i',SCRATCH/'reference.wav','-ar','44100','-ac','1','-f','f32le','-').stdout
reference=array.array('f');reference.frombytes(ref_bytes)
indices=range(int(14.13*44100),int(14.4*44100),4)
r=[reference[i] for i in indices]; r_norm=math.sqrt(sum(x*x for x in r))
best=(-1,None)
for shift in range(-2204,2205,4):
    d=[samples[i+shift] for i in indices]
    score=sum(x*y for x,y in zip(r,d))/(r_norm*math.sqrt(sum(x*x for x in d)))
    if score>best[0]:best=(score,shift)
lag_ms=best[1]/44.1
assert best[0]>.95 and abs(lag_ms)<1000/30,best
report={
 'verified_at':datetime.now(timezone.utc).isoformat(),
 'movie_sha256':sha(MOVIE),'poster_sha256':sha(POSTER),
 'source_sha256':{str(p.relative_to(BASE)):sha(p) for p in [BASE/'scene.js',*sorted((BASE/'engine').glob('*'))] if p.is_file()},
 'size_bytes':MOVIE.stat().st_size,'duration':28,'video_codec':'h264','pixel_format':'yuv420p','resolution':[1080,1920],'fps':30,'frames':840,
 'audio_codec':'aac','audio_peak_dbfs':peak,'full_decode_pass':True,'first_last_decoded_md5':first,'first_last_exactly_equal':True,
 'faststart':True,'atoms':atoms,'cue_count':len(cues),'audio_energy_at_every_cue_time':cue_checks,'aac_alignment':{'failure_cue_time':14.1,'correlation':round(best[0],6),'lag_ms':round(lag_ms,3),'maximum_visual_quantization_ms':round(max(math.ceil(c['t']*30)/30-c['t'] for c in cues)*1000,3)},
 'listening':'Audio analysed, not physically listened to.','inspection_times':times,
 'visual_review':'Requires manual view_image review; see review.md bound to movie hash.'
}
(BASE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['size_bytes','duration','audio_peak_dbfs','first_last_exactly_equal','faststart','cue_count','movie_sha256']},indent=2))

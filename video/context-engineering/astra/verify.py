#!/usr/bin/env python3
"""Reproduce technical checks, extraction and audit artifacts; does not mark visual QA passed."""
import array, hashlib, json, math, struct, subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
MEDIA=ROOT/'public/media/context-engineering/astra.mp4'
SCRATCH=HERE/'scratch'
SCRATCH.mkdir(exist_ok=True)
def run(args):
    p=subprocess.run(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True)
    return p.stdout
FF=['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2']
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['avg_frame_rate'])==('h264','yuv420p',1080,1920,'30/1')
assert a['codec_name']=='aac'
assert float(probe['format']['duration'])==30
assert int(v['nb_frames'])==900
assert MEDIA.stat().st_size<2_000_000
assert float(v['start_time'])==0 and float(a['start_time'])==0
run(FF+['-xerror','-i',str(MEDIA),'-threads','2','-f','null','-'])
frames=run(FF+['-i',str(MEDIA),'-vf',"select='eq(n,0)+eq(n,899)'",'-vsync','0','-pix_fmt','yuv420p','-threads','2','-f','rawvideo','-'])
size=1080*1920*3//2
assert len(frames)==size*2
assert frames[:size]==frames[size:]
# Decoded AAC sample peak and cue-local RMS; exact source schedule comes from the scene.
audio=run(FF+['-i',str(MEDIA),'-vn','-ac','2','-ar','44100','-threads','2','-f','f32le','-'])
samples=array.array('f',audio)
peak=max(abs(v) for v in samples)
peak_db=20*math.log10(peak)
assert peak_db<=-0.5
cuejs="const F=require('./engine/flow-engine.js');require('./scene.js');const s=F.createScene(F.lastScene);process.stdout.write(JSON.stringify(s.audioCues()))"
cues=json.loads(subprocess.check_output(['node','-e',cuejs],cwd=HERE))
for c in cues:
    start=int(c['t']*44100)*2; end=start+int(0.18*44100)*2
    window=samples[start:end]
    rms=math.sqrt(sum(x*x for x in window)/len(window))
    c['decoded_rms_dbfs']=round(20*math.log10(max(rms,1e-12)),2)
    assert c['decoded_rms_dbfs'] > -65, (c['t'],c['name'])

# Cross-correlate 10 ms RMS envelopes against the exact authored WAV, after mux gain.
# This tests retained timing through AAC/muxing, not perceived loudness or listening.
source=run(FF+['-i',str(SCRATCH/'sfx.wav'),'-af','volume=0.8','-ac','2','-ar','44100','-threads','2','-f','f32le','-'])
reference=array.array('f',source)
def envelope(data):
    hop=882
    return [math.sqrt(sum(x*x for x in data[i:i+hop])/hop) for i in range(0,min(len(data),30*44100*2)-hop+1,hop)]
ref_env=envelope(reference); dec_env=envelope(samples)
def corr(lag):
    pairs=[(ref_env[i],dec_env[i+lag]) for i in range(10,len(ref_env)-10)]
    return sum(a*b for a,b in pairs)/math.sqrt(sum(a*a for a,b in pairs)*sum(b*b for a,b in pairs))
best_lag=max(range(-10,11),key=corr)
assert abs(best_lag)<=3 and corr(best_lag)>0.98

# Top-level atom order proves faststart; a video tag alone would not.
b=MEDIA.read_bytes(); atoms=[];off=0
while off<len(b):
    length,kind=struct.unpack('>I4s',b[off:off+8]);head=8
    if length==1:length=struct.unpack('>Q',b[off+8:off+16])[0];head=16
    if length==0:length=len(b)-off
    assert length>=head
    atoms.append({'type':kind.decode(),'offset':off,'size':length});off+=length
names=[x['type'] for x in atoms]
assert names.index('moov')<names.index('mdat')
beats=[4.8,8.8,14.5,17.7,19.5,24.5,26.8]
(SCRATCH/'beats').mkdir(exist_ok=True)
for t in beats:
    prefix=SCRATCH/'beats'/f'{t:05.1f}'
    run(FF+['-ss',str(t),'-i',str(MEDIA),'-frames:v','1','-threads','2',str(prefix)+'.png'])
    run(FF+['-i',str(prefix)+'.png','-vf','scale=350:-1','-frames:v','1','-threads','2',str(prefix)+'-350.png'])
# Boundary and busy in-flight frames supplement the per-second contact sheet.
boundaries=[0,0.4,1,2,3.6,6.3,7.4,8.4,10.3,11.6,13.2,13.8,16,18.1,21.4,23.2,23.8,26,28.6,29.5]
(SCRATCH/'boundaries').mkdir(exist_ok=True)
for i,t in enumerate(boundaries):
    run(FF+['-ss',str(t),'-i',str(MEDIA),'-vf','scale=270:480','-frames:v','1','-threads','2',str(SCRATCH/'boundaries'/f'{i:02d}.png')])
run(FF+['-pattern_type','glob','-i',str(SCRATCH/'boundaries'/'*.png'),'-vf','tile=5x4','-frames:v','1','-threads','2',str(SCRATCH/'boundary-sheet.png')])
run(FF+['-i',str(MEDIA),'-lavfi','showspectrumpic=s=1800x500:fscale=log:legend=1','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
run(FF+['-ss','26.8','-i',str(MEDIA),'-frames:v','1','-q:v','2','-threads','2',str(ROOT/'public/media/context-engineering/astra.jpg')])
report={'duration':30,'frames':900,'dimensions':[1080,1920],'fps':30,'video':'h264','pixelFormat':'yuv420p','audio':'aac','bytes':len(b),'decode':'passed (-xerror)','firstLastExact':True,'firstLastSHA256':hashlib.sha256(frames[:size]).hexdigest(),'audioSamplePeakDbfs':round(peak_db,3),'faststart':True,'audioEnvelopeLagMs':best_lag*10,'audioEnvelopeCorrelation':round(corr(best_lag),6),'atoms':atoms,'cues':cues,'visualReview':'Inspect generated images manually; not inferred by this script.','listened':False}
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
(SCRATCH/'ffprobe.json').write_text(json.dumps(probe,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['atoms','cues']},indent=2))

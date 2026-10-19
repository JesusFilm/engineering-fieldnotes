#!/usr/bin/env python3
"""Verify only this cut; never writes shared media evidence or manifests."""
import array, hashlib, json, math, pathlib, re, struct, subprocess
HERE=pathlib.Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SCRATCH=HERE/'scratch'
MEDIA=ROOT/'public/media/idempotency/astra.mp4'
POSTER=MEDIA.with_suffix('.jpg')
FF=['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-filter_complex_threads','2']
def run(args): return subprocess.run(args,check=True,capture_output=True)
def ff(args): return run(FF+args)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
p=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]).stdout)
v=next(s for s in p['streams'] if s['codec_type']=='video')
a=next(s for s in p['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],v['codec_name'],v['pix_fmt'])==(1080,1920,'30/1','h264','yuv420p')
assert a['codec_name']=='aac'
assert float(v['duration'])==30 and int(v['nb_frames'])==900
assert MEDIA.stat().st_size<2_000_000
full=ff(['-v','error','-xerror','-i',str(MEDIA),'-threads','2','-f','null','-'])
assert not full.stderr
raw=ff(['-v','error','-i',str(MEDIA),'-vf',r'select=eq(n\,0)+eq(n\,899)','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','-']).stdout
size=1080*1920*3
assert len(raw)==size*2 and raw[:size]==raw[size:], 'First/last decoded RGB differ'
level=ff(['-i',str(MEDIA),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr.decode()
peak=float(re.search(r'max_volume: ([-\d.]+) dB',level)[1]);assert -40<peak<=-.5
b=MEDIA.read_bytes();pos=0;boxes={}
while pos+8<=len(b):
 n,k=struct.unpack('>I4s',b[pos:pos+8]);assert n>=8
 boxes[k.decode()]=pos;pos+=n
assert boxes['moov']<boxes['mdat']
ff(['-v','error','-y','-ss','17.6','-i',str(MEDIA),'-frames:v','1','-q:v','2','-threads','2',str(POSTER)])
frames=SCRATCH/'encoded';frames.mkdir(exist_ok=True)
phones=SCRATCH/'phone';phones.mkdir(exist_ok=True)
times=[2,4.6,7.1,10.2,13.2,17.6,19.6,21.9,23.7,26.5]
expr='+'.join(f'eq(n\\,{round(t*30)})' for t in times)
ff(['-v','error','-y','-i',str(MEDIA),'-vf','select='+expr,'-fps_mode','passthrough','-threads','2',str(frames/'beat-%02d.png')])
ff(['-v','error','-y','-i',str(frames/'beat-%02d.png'),'-vf','scale=350:-1','-threads','2',str(phones/'beat-%02d.png')])
ff(['-v','error','-y','-i',str(phones/'beat-%02d.png'),'-vf','tile=5x2','-frames:v','1','-threads','2',str(SCRATCH/'encoded-phone-sheet.png')])
ff(['-v','error','-y','-i',str(MEDIA),'-lavfi','showspectrumpic=s=1500x500:fscale=log:legend=1','-frames:v','1','-threads','2',str(SCRATCH/'spectrogram.png')])
cues=json.loads(run(['node',str(HERE/'cues.cjs')]).stdout)
# Decode AAC to PCM; check each scheduled cue has energy in its first 120 ms.
pcm=ff(['-v','error','-i',str(MEDIA),'-vn','-ac','1','-ar','44100','-c:a','pcm_s16le','-threads','2','-f','s16le','-']).stdout
samples=array.array('h');samples.frombytes(pcm)
checks=[]
for c in cues:
 lo=round(c['t']*44100);hi=lo+round(.12*44100)
 part=samples[lo:hi];rms=math.sqrt(sum(x*x for x in part)/len(part))/32768
 db=20*math.log10(max(rms,1e-12));assert db>-65,(c,db)
 checks.append({'time':c['t'],'preset':c['name'],'first120msRmsDbfs':round(db,2)})
result={'author':'gpt-6-astra','reasoning':'high','reviewed':'2026-10-19','sha256':sha(MEDIA),'posterSha256':sha(POSTER),'bytes':len(b),'duration':30,'frames':900,'format':'1080x1920/30fps H.264 yuv420p + AAC','fullDecode':True,'exactFirstLastRgbEquality':True,'boundaryRgbSha256':hashlib.sha256(raw[:size]).hexdigest(),'audioPeakDbfs':peak,'faststart':True,'mp4Atoms':boxes,'cueCount':len(cues),'cueEnergy':checks,'encodedFrameTimes':times,'phoneWidth':350,'physicalListening':False}
(HERE/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
(SCRATCH/'probe.json').write_text(json.dumps(p,indent=2)+'\n')
(SCRATCH/'volume.txt').write_text(level)
print(json.dumps({k:v for k,v in result.items() if k not in ('cueEnergy','mp4Atoms')},indent=2))

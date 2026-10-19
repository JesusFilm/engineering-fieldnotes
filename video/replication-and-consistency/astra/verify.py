#!/usr/bin/env python3
"""Sequential FFmpeg checks and review captures. Run from any directory."""
from pathlib import Path
import subprocess,json,hashlib,re,struct,array,math
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
MEDIA=ROOT/'public/media/replication-and-consistency/astra.mp4'
E=HERE/'evidence';E.mkdir(exist_ok=True)
S=HERE/'scratch';S.mkdir(exist_ok=True)
def run(args):
 return subprocess.run([str(x) for x in args],check=True,capture_output=True)
def ff(args,verbosity='error'):
 return run(['ffmpeg','-y','-v',verbosity,'-threads','2','-filter_threads','2','-filter_complex_threads','2',*args])
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',MEDIA]).stdout)
(E/'ffprobe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac' and int(v['nb_frames'])==900
assert float(probe['format']['duration'])==30 and MEDIA.stat().st_size<2_000_000
# Decode every video/audio packet, fail on corruption.
full=ff(['-xerror','-i',MEDIA,'-map','0:v','-map','0:a','-threads','2','-f','null','-'])
assert not full.stderr,full.stderr.decode()
# Exact decoded equality, not a perceptual similarity metric.
hashes=ff(['-i',MEDIA,'-map','0:v','-an','-threads','2','-f','framemd5','-']).stdout.decode()
rows=[x for x in hashes.splitlines() if not x.startswith('#') and x.strip()]
assert len(rows)==900
first,last=[x.split(',')[-1].strip() for x in [rows[0],rows[-1]]]
assert first==last,(first,last)
(E/'frame-hashes.txt').write_text(hashes)
for t in [4,8.8,13.7,19.6,24.8,5.8,7.5,12.2,16.6,23]:
 ff(['-ss',str(t),'-i',MEDIA,'-frames:v','1','-vf','scale=350:-1','-threads','2',E/f'phone-{t:g}.png'])
for n in [0,899]:
 ff(['-i',MEDIA,'-vf',f'select=eq(n\\,{n})','-frames:v','1','-threads','2',E/f'boundary-{n}.png'])
ff(['-ss','13.7','-i',MEDIA,'-frames:v','1','-threads','2',E/'encoded-full.png'])
ff(['-ss','19.6','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',MEDIA.with_suffix('.jpg')])
ff(['-i',MEDIA,'-lavfi','showspectrumpic=s=1800x500:legend=1:fscale=log','-frames:v','1','-threads','2',E/'spectrogram.png'])
levels=ff(['-i',MEDIA,'-vn','-af','volumedetect','-threads','2','-f','null','-'],'info').stderr.decode()
(E/'audio-levels.txt').write_text(levels)
peak=float(re.search(r'max_volume: ([\-\d.]+)',levels).group(1));assert peak<=-0.5
# Verify cue energy in decoded AAC. This confirms signal, not subjective audibility.
pcm=ff(['-i',MEDIA,'-vn','-ac','1','-ar','44100','-threads','2','-f','f32le','-']).stdout
samples=array.array('f');samples.frombytes(pcm)
cues=json.loads((HERE/'cues.json').read_text())
energies=[]
for c in cues:
 start=int(c['t']*44100);window=samples[start:start+int(.14*44100)]
 rms=math.sqrt(sum(x*x for x in window)/len(window));db=20*math.log10(max(rms,1e-12))
 assert db > -65,(c,db)
 energies.append({'t':c['t'],'preset':c['name'],'rms_dbfs_140ms':round(db,2),'frame_grid_error_ms':round(abs(c['t']*30-round(c['t']*30))/30*1000,6)})
(E/'cue-energy.json').write_text(json.dumps(energies,indent=2)+'\n')
# Atom-level faststart verification.
b=MEDIA.read_bytes();pos=0;atoms=[]
while pos+8<=len(b):
 size,kind=struct.unpack('>I4s',b[pos:pos+8]);name=kind.decode('ascii');
 if size==1:size=struct.unpack('>Q',b[pos+8:pos+16])[0]
 if size==0:size=len(b)-pos
 atoms.append({'type':name,'offset':pos,'bytes':size});pos+=size
order=[x['type'] for x in atoms];assert order.index('moov')<order.index('mdat')
report={'author':'gpt-6-astra','reasoning':'high','date':'2026-10-19','sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'duration':30,'frames':len(rows),'video':'H264 1080x1920 30fps yuv420p','audio':'AAC stereo 44100Hz','fullDecode':True,'exactFirstLastEquality':True,'boundaryMD5':first,'maxVolumeDbfs':peak,'faststart':True,'atoms':atoms,'cueCount':len(cues),'allCuesHaveDecodedEnergy':True,'maxCueFrameGridErrorMs':max(x['frame_grid_error_ms'] for x in energies),'physicalListening':False}
(HERE/'checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))

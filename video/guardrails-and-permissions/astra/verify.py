"""Run from repository root: python3 video/guardrails-and-permissions/astra/verify.py."""
from pathlib import Path
import subprocess,json,hashlib,re,struct,array,math
ROOT=Path(__file__).resolve().parents[3]
BASE=Path(__file__).resolve().parent
MEDIA=ROOT/'public/media/guardrails-and-permissions/astra.mp4'
S=BASE/'scratch';S.mkdir(exist_ok=True)
def ff(args):
 return subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*map(str,args)],check=True,capture_output=True)
p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(MEDIA)]))
v=next(x for x in p['streams'] if x['codec_type']=='video'); a=next(x for x in p['streams'] if x['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'])==('h264',1080,1920,'yuv420p','30/1')
assert a['codec_name']=='aac' and float(p['format']['duration'])==28
assert MEDIA.stat().st_size<2000000
ff(['-xerror','-i',MEDIA,'-map','0','-threads','2','-f','null','-'])
ff(['-i',MEDIA,'-map','0:v:0','-threads','2','-f','framemd5',S/'frames.md5'])
hashes=[x.split(',')[-1].strip() for x in (S/'frames.md5').read_text().splitlines() if not x.startswith('#')]
assert len(hashes)==840 and hashes[0]==hashes[-1],(len(hashes),hashes[0],hashes[-1])
raw=ff(['-i',MEDIA,'-vn','-ar','48000','-ac','2','-threads','2','-f','f32le','-']).stdout
pcm=array.array('f');pcm.frombytes(raw);peak=max(abs(x) for x in pcm); db=20*math.log10(peak);assert db<=-0.5
cues=json.loads((BASE/'cues.json').read_text()); cuechecks=[]
for c in cues:
 start=int(c['t']*48000)*2; block=pcm[start:start+int(.15*48000)*2]
 rms=math.sqrt(sum(x*x for x in block)/len(block)); assert rms>0.0001,(c,rms)
 cuechecks.append({'t':c['t'],'preset':c['name'],'rms_first_150ms_dbfs':round(20*math.log10(rms),2)})
# MP4 top-level atom order establishes faststart, rather than searching payload bytes.
data=MEDIA.read_bytes();atoms=[];offset=0
while offset+8<=len(data):
 size,kind=struct.unpack('>I4s',data[offset:offset+8]);atoms.append(kind.decode('ascii'))
 if size==1:size=struct.unpack('>Q',data[offset+8:offset+16])[0]
 if size==0:break
 offset+=size
assert atoms.index('moov')<atoms.index('mdat')
times=[3.8,6.8,12.8,18.7,24.3]
for i,t in enumerate(times,1):
 ff(['-ss',t,'-i',MEDIA,'-frames:v','1','-threads','2',S/f'beat-{i}-full.png'])
 ff(['-ss',t,'-i',MEDIA,'-vf','scale=350:-1','-frames:v','1','-threads','2',S/f'beat-{i}-350.png'])
for t in [0,1.7,5.7,6.1,6.5,9.9,12.6,15.2,15.6,18.5,21.4,21.8,26.4,27.966667]:
 ff(['-ss',t,'-i',MEDIA,'-frames:v','1','-threads','2',S/f'boundary-{t}.png'])
ff(['-i',MEDIA,'-lavfi','showspectrumpic=s=1400x400:fscale=log','-frames:v','1','-threads','2',S/'spectrogram.png'])
ff(['-ss','19','-i',MEDIA,'-frames:v','1','-q:v','2','-threads','2',MEDIA.with_suffix('.jpg')])
report={'author':'gpt-6-astra','reasoning':'high','retrievalDate':'2026-10-19','file':str(MEDIA.relative_to(ROOT)),'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'duration':float(p['format']['duration']),'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'fullDecode':'pass','frames':len(hashes),'firstLastExact':True,'firstFrameMD5':hashes[0],'lastFrameMD5':hashes[-1],'audioPeakDbfs':round(db,3),'faststart':True,'atomOrder':atoms,'cueChecks':cuechecks,'audioPhysicallyHeard':False}
(BASE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='cueChecks'},indent=2))

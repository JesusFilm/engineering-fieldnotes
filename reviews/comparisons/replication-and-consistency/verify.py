"""Verify only the three released cuts, retaining evidence in this review folder."""
from pathlib import Path
import array,hashlib,json,re,struct,subprocess
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SCRATCH=HERE/'scratch';SCRATCH.mkdir(exist_ok=True)
def run(*args):return subprocess.check_output(list(map(str,args)))
def ff(*args):return run('ffmpeg','-v','error','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args)
results={}
for cut in ['baseline','astra','sol']:
 movie=ROOT/f'public/media/replication-and-consistency/{cut}.mp4';data=movie.read_bytes()
 probe=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',movie));(SCRATCH/f'{cut}-final-probe.json').write_text(json.dumps(probe,indent=2))
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio');n=int(v['nb_frames'])
 assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'],v['avg_frame_rate'])==('h264',1080,1920,'yuv420p','30/1','30/1')
 assert a['codec_name']=='aac'
 decode=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-filter_threads','2','-i',str(movie),'-threads','2','-f','null','-'],capture_output=True,check=True);assert not decode.stderr
 edges=ff('-i',movie,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1');size=1080*1920*3
 assert len(edges)==2*size and edges[:size]==edges[size:]
 ff('-y','-i',movie,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','vfr','-threads','2',SCRATCH/f'{cut}-final-edge-%02d.png')
 vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(movie),'-vn','-af','volumedetect','-threads','2','-f','null','-'],capture_output=True,text=True,check=True).stderr
 (SCRATCH/f'{cut}-audio.txt').write_text(vol);peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1));assert -40<peak<=-.5
 boxes={};pos=0
 while pos+8<=len(data):
  length,kind=struct.unpack('>I4s',data[pos:pos+8]);header=8
  if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0];header=16
  if length==0:length=len(data)-pos
  assert length>=header
  boxes[kind.decode()]=pos;pos+=length
 assert boxes['moov']<boxes['mdat']
 raw=ff('-i',movie,'-vn','-ac','1','-ar','48000','-threads','2','-f','f32le','pipe:1');samples=array.array('f');samples.frombytes(raw)
 cues=json.loads(subprocess.check_output(['node','-e',"const F=require('./engine/flow-engine.js');require('./scene.js');console.log(JSON.stringify(F.createScene(F.lastScene).audioCues()))"],cwd=ROOT/f'video/replication-and-consistency/{cut}'))
 checks=[]
 for cue in cues:
  t=cue['t'];window=samples[int((t+.005)*48000):int((t+.16)*48000)];amp=max(map(abs,window));assert amp>.001,(cut,t,amp)
  checks.append({'t':t,'name':cue['name'],'windowPeak':amp})
 ff('-y','-i',movie,'-lavfi','showspectrumpic=s=1500x400:fscale=log','-frames:v','1','-threads','2',SCRATCH/f'{cut}-spectrogram.png')
 poster=movie.with_suffix('.jpg');pp=json.loads(run('ffprobe','-v','error','-show_streams','-of','json',poster))['streams'][0];assert (pp['width'],pp['height'])==(1080,1920)
 results[cut]={'sha256':hashlib.sha256(data).hexdigest(),'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),'frames':n,'duration':float(v['duration']),'codec':'H264 1080x1920 30fps yuv420p + AAC','fullDecode':True,'matchingExactBoundaryFrames':True,'boundaryRGBSHA256':hashlib.sha256(edges[:size]).hexdigest(),'faststart':True,'atomOffsets':boxes,'peakDbfs':peak,'audioHeard':False,'audioCueChecks':checks}
 print(cut,n,peak,results[cut]['sha256'],flush=True)
(HERE/'encoded-checks.json').write_text(json.dumps(results,indent=2)+'\n')

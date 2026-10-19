"""Verify encoded artifacts; deliberately does not claim visual review or listening."""
import subprocess,json,pathlib,hashlib,struct,re
R=pathlib.Path(__file__).resolve().parent
ROOT=R.parents[2]
S=R/'scratch'/'final';S.mkdir(parents=True,exist_ok=True)
report={}
def run(args):
 return subprocess.run(args,check=True,capture_output=True,text=True)
for v in ['baseline','astra','fable']:
 p=ROOT/f'public/media/tool-design/{v}.mp4'
 data=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]).stdout)
 video=next(s for s in data['streams'] if s['codec_type']=='video');audio=next(s for s in data['streams'] if s['codec_type']=='audio')
 assert (video['codec_name'],video['width'],video['height'],video['r_frame_rate'],video['pix_fmt'],audio['codec_name'])==('h264',1080,1920,'30/1','yuv420p','aac')
 prefix=['ffmpeg','-y','-v','error','-xerror','-threads','2','-filter_threads','2','-filter_complex_threads','2','-i',str(p)]
 run(prefix+['-map','0:v:0','-map','0:a:0','-threads','2','-f','null','-'])
 md=run(prefix+['-map','0:v:0','-an','-threads','2','-f','framemd5','-']).stdout
 (S/f'{v}-frames.md5').write_text(md)
 frames=[l for l in md.splitlines() if not l.startswith('#') and l.strip()]; first=frames[0].split(',')[-1].strip();last=frames[-1].split(',')[-1].strip()
 for n,label in [(0,'first'),(len(frames)-1,'last')]:
  run(prefix+['-vf',f'select=eq(n\\,{n})','-frames:v','1','-threads','2',str(S/f'{v}-{label}.png')])
 raw=p.read_bytes();at=0;atoms=[]
 while at+8<=len(raw):
  size,kind=struct.unpack('>I4s',raw[at:at+8]); header=8
  if size==1:size=struct.unpack('>Q',raw[at+8:at+16])[0];header=16
  if size==0:size=len(raw)-at
  atoms.append({'type':kind.decode('ascii'),'offset':at,'size':size});at+=size
 kinds=[a['type'] for a in atoms];assert kinds.index('moov')<kinds.index('mdat')
 level=run(['ffmpeg','-hide_banner','-threads','2','-filter_threads','2','-i',str(p),'-vn','-af','volumedetect','-threads','2','-f','null','-']).stderr
 (S/f'{v}-audio.txt').write_text(level);peak=float(re.search(r'max_volume: ([-\d.]+) dB',level)[1]);assert peak<=-.5
 run(prefix+['-vn','-ac','1','-ar','44100','-c:a','pcm_s16le','-threads','2',str(S/f'{v}.wav')])
 run(prefix+['-lavfi','showspectrumpic=s=1200x400:legend=1:fscale=log','-frames:v','1','-threads','2',str(S/f'{v}-spectrum.png')])
 run(prefix+['-vf','fps=1,scale=270:480,tile=6x5','-frames:v','1','-threads','2',str(S/f'{v}-sheet.png')])
 report[v]={'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'duration':float(data['format']['duration']),'decodedFrames':len(frames),'video':{k:video[k] for k in ['codec_name','width','height','r_frame_rate','pix_fmt']},'audioCodec':audio['codec_name'],'fullDecode':True,'firstFrameMD5':first,'lastFrameMD5':last,'exactEndpointsEqual':first==last,'atoms':atoms,'faststart':True,'maxAudioDBFS':peak,'audioHeard':False}
 print(v,json.dumps(report[v]))
(R/'checks.json').write_text(json.dumps(report,indent=2)+'\n')

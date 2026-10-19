from pathlib import Path
import subprocess,json,hashlib,re
root=Path(__file__).resolve().parents[3]
out=root/'reviews/sequences/load-balancing/scratch';out.mkdir(parents=True,exist_ok=True)
lessons=json.loads((root/'video/load-balancing/sequence/lessons.json').read_text());results=[]
def run(args):return subprocess.run(args,check=True,capture_output=True,text=True)
for n,l in enumerate(lessons,1):
 p=root/'public'/l['src'];probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(p)]).stdout)
 v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert (v['width'],v['height'],v['codec_name'])==(1080,1920,'h264');assert a['codec_name']=='aac'
 assert abs(float(probe['format']['duration'])-l['duration'])<.1;assert p.stat().st_size<3000000
 run(['ffmpeg','-v','error','-xerror','-i',str(p),'-f','null','-'])
 volume=run(['ffmpeg','-hide_banner','-i',str(p),'-af','volumedetect','-f','null','-']).stderr
 peak=float(re.search(r'max_volume: ([-.\d]+)',volume)[1]);assert peak<-.5
 data=p.read_bytes();assert data.index(b'moov')<data.index(b'mdat')
 for j,beat in enumerate(l['beats']):
  end=l['beats'][j+1]['time'] if j+1<len(l['beats']) else l['duration']
  t=(beat['time']+end)/2
  run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(p),'-frames:v','1',str(out/f'{n:02}-beat-{j+1}.png')])
 run(['ffmpeg','-v','error','-y','-i',str(out/f'{n:02}-beat-%d.png'),'-vf','scale=350:-1,tile=5x1','-frames:v','1',str(out/f'{n:02}-phone-beats.png')])
 run(['ffmpeg','-v','error','-y','-i',str(p),'-lavfi','showspectrumpic=s=1200x300:fscale=log','-frames:v','1',str(out/f'{n:02}-spectrum.png')])
 results.append(dict(src=l['src'],sha256=hashlib.sha256(data).hexdigest(),duration=l['duration'],bytes=len(data),peakDb=peak,decode=True,faststart=True,audio='analysed, not listened to',loop=False))
(root/'reviews/sequences/load-balancing/encoded-checks.json').write_text(json.dumps(results,indent=2)+'\n')
print('Six finite videos: full decode, dimensions, duration, AAC audio, headroom, faststart and size passed.')

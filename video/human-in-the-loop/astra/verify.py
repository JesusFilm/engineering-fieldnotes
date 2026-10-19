"""Run from repository root. Sequential FFmpeg processes, capped at two threads."""
import subprocess,json,hashlib,struct,re
from pathlib import Path
root=Path('video/human-in-the-loop/astra'); out=Path('public/media/human-in-the-loop/astra.mp4'); scratch=root/'scratch'; scratch.mkdir(exist_ok=True)
def ff(args,capture=True):
    return subprocess.run(['ffmpeg','-y','-threads','2','-filter_threads','2','-filter_complex_threads','2',*args],capture_output=capture,check=True)
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(out)]))
(scratch/'probe.json').write_text(json.dumps(probe,indent=2))
dec=ff(['-v','error','-xerror','-i',str(out),'-f','null','-']); (scratch/'decode.txt').write_bytes(dec.stderr or b'Full video and audio decode: exit 0\n')
frames=ff(['-v','error','-i',str(out),'-map','0:v:0','-f','framemd5','-']).stdout.decode(); (scratch/'frames.md5').write_text(frames)
hashes=[l.split(',')[-1].strip() for l in frames.splitlines() if not l.startswith('#') and l.strip()]
levels=ff(['-hide_banner','-i',str(out),'-af','volumedetect','-f','null','-']).stderr.decode(); (scratch/'audio-levels.txt').write_text(levels)
peak=float(re.search(r'max_volume: ([-\d.]+)',levels)[1])
for i,t in enumerate([4.7,9.9,15.3,21.9,26.5]):
    ff(['-v','error','-ss',str(t),'-i',str(out),'-frames:v','1','-threads','2',str(scratch/f'beat-{i+1}-full.png')])
    ff(['-v','error','-ss',str(t),'-i',str(out),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(scratch/f'beat-{i+1}-350.png')])
for i,t in enumerate([0,5.7,8.7,11.8,13.5,17,20.5,23.8,24.9,28.5,29.966667]):
    ff(['-v','error','-ss',str(t),'-i',str(out),'-vf','scale=350:-1','-frames:v','1','-threads','2',str(scratch/f'boundary-{i:02}.png')])
ff(['-v','error','-i',str(out),'-lavfi','showspectrumpic=s=1800x500:fscale=log:legend=1','-frames:v','1','-threads','2',str(scratch/'spectrogram.png')])
ff(['-v','error','-ss','15.3','-i',str(out),'-frames:v','1','-q:v','2','-threads','2','public/media/human-in-the-loop/astra.jpg'])
raw=out.read_bytes(); boxes=[]; at=0
while at+8<=len(raw):
    size,kind=struct.unpack('>I4s',raw[at:at+8]); boxes.append(kind.decode());
    if size==1: size=struct.unpack('>Q',raw[at+8:at+16])[0]
    if not size: break
    at+=size
v=next(s for s in probe['streams'] if s['codec_type']=='video'); a=next(s for s in probe['streams'] if s['codec_type']=='audio')
report={'bytes':out.stat().st_size,'duration':float(probe['format']['duration']),'frames':len(hashes),'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'maxVolumeDBFS':peak,'firstFrameMD5':hashes[0],'lastFrameMD5':hashes[-1],'exactFirstLast':hashes[0]==hashes[-1],'faststart':boxes.index('moov')<boxes.index('mdat'),'fullDecode':True,'sha256':hashlib.sha256(raw).hexdigest()}
(root/'verification.json').write_text(json.dumps(report,indent=2)+'\n'); print(json.dumps(report,indent=2))
assert report['bytes']<2000000 and report['exactFirstLast'] and peak<=-.5 and report['faststart']
assert (v['width'],v['height'],v['r_frame_rate'],v['codec_name'],v['pix_fmt'],a['codec_name'])==(1080,1920,'30/1','h264','yuv420p','aac')

import json, re, struct, subprocess, hashlib, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
def run(a): return subprocess.run(a, capture_output=True, text=True)
out = {}
d = open('video.mp4','rb').read(); i=0; boxes=[]
while i < len(d):
    s,t = struct.unpack('>I4s', d[i:i+8]); boxes.append(t.decode()); i += s
out['boxes'] = boxes
dec = run(['ffmpeg','-v','error','-xerror','-i','video.mp4','-f','null','-'])
out['decode'] = {'exit': dec.returncode, 'error_lines': len([x for x in dec.stderr.splitlines() if x.strip()])}
out['vframes'] = run(['ffprobe','-v','error','-count_frames','-select_streams','v','-show_entries','stream=nb_read_frames','-of','csv=p=0','video.mp4']).stdout.strip()
out['aframes'] = run(['ffprobe','-v','error','-count_frames','-select_streams','a','-show_entries','stream=nb_read_frames','-of','csv=p=0','video.mp4']).stdout.strip()
out['probe'] = json.loads(run(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_frames,duration,sample_rate,channels,pix_fmt:format=duration,size','-of','json','video.mp4']).stdout)
vd = run(['ffmpeg','-i','video.mp4','-vn','-af','volumedetect,astats=metadata=0','-f','null','-']).stderr
out['max_volume'] = float(re.search(r'max_volume: (-?[\d.]+)', vd).group(1)); out['mean_volume'] = float(re.search(r'mean_volume: (-?[\d.]+)', vd).group(1))
out['astats_peak'] = float(re.findall(r'Peak level dB: (-?[\d.]+)', vd)[-1])
# per-window peaks around key cues (playback seconds)
win = {}
for name, t in [('arrival_5.41', 5.41), ('deliver7_12.59', 12.59), ('store_21.88', 21.88), ('deliver8_29.06', 29.06)]:
    r = run(['ffmpeg','-v','info','-ss',str(t-0.05),'-t','0.6','-i','video.mp4','-vn','-af','volumedetect','-f','null','-']).stderr
    win[name] = float(re.search(r'max_volume: (-?[\d.]+)', r).group(1))
out['window_max_db'] = win
# alternate extraction: frame-index select vs time seek of the same frame
cmp = {}
for f in sorted(glob.glob('cut/scratch/enc/alt/*.png')):
    g = f.replace('/alt/', '/altseek/')
    r = run(['ffmpeg','-i',f,'-i',g,'-lavfi','psnr','-f','null','-']).stderr
    m = re.search(r'average:(\S+)', r); cmp[os.path.basename(f)] = m.group(1) if m else r[-200:]
out['alt_vs_seek_psnr'] = cmp
print(json.dumps(out, indent=1))

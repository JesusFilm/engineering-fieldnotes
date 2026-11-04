import json, re, struct, subprocess, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
def run(a): return subprocess.run(a, capture_output=True, text=True)
out = {}
d = open('video.mp4', 'rb').read(); i = 0; boxes = []
while i < len(d):
    s, t = struct.unpack('>I4s', d[i:i+8]); boxes.append(t.decode())
    if s == 1: s = struct.unpack('>Q', d[i+8:i+16])[0]
    i += s
out['boxes'] = boxes
dec = run(['ffmpeg', '-v', 'error', '-xerror', '-i', 'video.mp4', '-f', 'null', '-'])
out['decode'] = {'exit': dec.returncode, 'error_lines': len([x for x in dec.stderr.splitlines() if x.strip()])}
out['vframes'] = run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', 'video.mp4']).stdout.strip()
out['aframes'] = run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'a', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', 'video.mp4']).stdout.strip()
out['probe'] = json.loads(run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,nb_frames,duration,sample_rate,channels,pix_fmt:format=duration,size', '-of', 'json', 'video.mp4']).stdout)
vd = run(['ffmpeg', '-i', 'video.mp4', '-vn', '-af', 'volumedetect,astats=metadata=0', '-f', 'null', '-']).stderr
out['max_volume'] = float(re.search(r'max_volume: (-?[\d.]+)', vd).group(1)); out['mean_volume'] = float(re.search(r'mean_volume: (-?[\d.]+)', vd).group(1))
out['astats_peak'] = float(re.findall(r'Peak level dB: (-?[\d.]+)', vd)[-1])
win = {}
for name, t in [('store_v7_2.53', 2.53), ('deliver_ack8_10.12', 10.12), ('clock_11.18', 11.18), ('crash_15.65', 15.65), ('work_20.35', 20.35), ('arrive_promote_22.59', 22.59), ('deliver_read7_29.65', 29.65), ('miss_30.82', 30.82), ('silence_17.5', 17.5), ('silence_35.3', 35.3)]:
    r = run(['ffmpeg', '-v', 'info', '-ss', str(t - 0.05), '-t', '0.6', '-i', 'video.mp4', '-vn', '-af', 'volumedetect', '-f', 'null', '-']).stderr
    m = re.search(r'max_volume: (-?[\d.]+|-inf)', r); win[name] = m.group(1) if m else None
out['window_max_db'] = win
cmp = {}
for f in sorted(glob.glob('cut/scratch/enc/alt/*.png')):
    g = f.replace('/alt/', '/altseek/')
    r = run(['ffmpeg', '-i', f, '-i', g, '-lavfi', 'psnr', '-f', 'null', '-']).stderr
    m = re.search(r'average:(\S+)', r); cmp[os.path.basename(f)] = m.group(1) if m else r[-200:]
out['alt_vs_seek_psnr'] = cmp
print(json.dumps(out, indent=1))

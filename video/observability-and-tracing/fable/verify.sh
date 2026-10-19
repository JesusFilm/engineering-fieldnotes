#!/usr/bin/env bash
# Verify the encoded fable cut: stream format, full decode, exact first/last frame equality, audio peak, faststart, poster.
set -euo pipefail
cd "$(dirname "$0")"
mp4=../../../public/media/observability-and-tracing/fable.mp4
jpg=../../../public/media/observability-and-tracing/fable.jpg
mkdir -p scratch/verify
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,pix_fmt,nb_frames -of compact "$mp4"
frames=$(ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of csv=p=0 "$mp4")
ffmpeg -v error -xerror -threads 2 -i "$mp4" -f null - && echo "full decode: clean"
ffmpeg -y -v error -threads 2 -i "$mp4" -vf "select=eq(n\\,0)" -frames:v 1 -pix_fmt rgb24 -f rawvideo scratch/verify/first.raw
ffmpeg -y -v error -threads 2 -i "$mp4" -vf "select=eq(n\\,$((frames-1)))" -frames:v 1 -pix_fmt rgb24 -f rawvideo scratch/verify/last.raw
cmp scratch/verify/first.raw scratch/verify/last.raw && echo "first/last frames: identical"
ffmpeg -hide_banner -threads 2 -i "$mp4" -vn -af volumedetect -f null - 2>&1 | grep -E "max_volume|mean_volume"
ffmpeg -y -v error -threads 2 -i "$mp4" -lavfi showspectrumpic=s=1800x500:fscale=log scratch/verify/spec.png
ffmpeg -y -v error -threads 2 -i "$mp4" -vf "fps=1,scale=240:-1,tile=6x5" -frames:v 1 scratch/verify/sheet.png
for t in 0.5 4.5 7.2 12.6 15.6 18.6 23.6 27.0 29.3; do ffmpeg -y -v error -threads 2 -ss $t -i "$mp4" -frames:v 1 -vf scale=350:-1 scratch/verify/b_$t.png; done
python3 - "$mp4" "$jpg" <<'EOF'
import struct, sys, json, subprocess
data = open(sys.argv[1], 'rb').read(); boxes, pos = {}, 0
while pos + 8 <= len(data):
    length, kind = struct.unpack('>I4s', data[pos:pos+8]); header = 8
    if length == 1: length = struct.unpack('>Q', data[pos+8:pos+16])[0]; header = 16
    if length == 0: length = len(data) - pos
    boxes[kind] = pos; pos += length
print('faststart:', boxes[b'moov'] < boxes[b'mdat'], '| bytes:', len(data), '| under 2 MB:', len(data) < 2_000_000)
p = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-of', 'json', sys.argv[2]]))['streams'][0]
print('poster:', p['codec_name'], p['width'], 'x', p['height'])

#!/usr/bin/env bash
# Checks for the published fable cut: stream format, full decode, audio peak, faststart, first/last frame equality.
set -euo pipefail
cd "$(dirname "$0")"
MP4=../../../public/media/human-in-the-loop/fable.mp4
mkdir -p scratch/verify
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,pix_fmt,sample_rate -of default=nw=1 "$MP4"
ffmpeg -v error -threads 2 -xerror -i "$MP4" -f null - && echo "full decode ok"
ffmpeg -nostats -threads 2 -i "$MP4" -af volumedetect -f null - 2>&1 | grep -E 'max_volume|mean_volume'
python3 - "$MP4" <<'EOF'
import struct, sys, os
f = open(sys.argv[1], 'rb'); pos = 0; size = os.path.getsize(sys.argv[1]); order = []
while pos < size:
    f.seek(pos); n, t = struct.unpack('>I4s', f.read(8))
    if n == 1: n = struct.unpack('>Q', f.read(8))[0]
    order.append(t.decode()); pos += n
print('atom order', order, '(faststart ok)' if order.index('moov') < order.index('mdat') else '(NOT faststart)')

set -e
# Extracts encoded frames by time seek (1080 + 350 px Lanczos) and by frame index, then sheets and spectrogram.
cd "$(dirname "$0")/../.."
rm -rf cut/scratch/enc && mkdir -p cut/scratch/enc/350 cut/scratch/enc/alt cut/scratch/enc/altseek
TIMES="0.00 0.40 0.75 1.65 2.10 2.53 3.20 3.88 4.82 5.20 5.67 6.80 7.88 8.76 9.50 10.12 11.18 12.30 13.29 14.50 15.65 15.80 16.20 18.00 20.24 20.90 21.41 21.90 22.59 23.20 23.88 24.30 24.71 26.00 27.41 27.80 28.29 28.90 29.65 30.82 31.20 33.00 34.82 35.30 35.76 35.95"
for t in $TIMES; do
  f=$(printf 'cut/scratch/enc/f_%05.2f.png' "$t")
  ffmpeg -v error -y -ss "$t" -i video.mp4 -frames:v 1 "$f"
  ffmpeg -v error -y -i "$f" -vf scale=350:-1:flags=lanczos "cut/scratch/enc/350/$(basename "$f")"
done
for n in 0 50 76 116 236 304 335 395 470 472 607 642 677 716 783 822 889 925 1079; do
  ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,$n)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_$n.png
  ffmpeg -v error -y -ss "$(python3 -c "print(f'{($n-0.4)/30:.4f}')")" -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_$n.png
done
ffmpeg -v error -y -pattern_type glob -i 'cut/scratch/enc/350/*.png' -vf tile=12x4 cut/scratch/enc-350-sheet.png
ffmpeg -v error -y -pattern_type glob -i 'cut/scratch/enc/*.png' -vf scale=270:-1,tile=12x4 cut/scratch/enc-1080-sheet.png
ffmpeg -v error -y -i video.mp4 -lavfi showspectrumpic=s=1800x500:fscale=log cut/scratch/spectrogram.png
echo frames_done

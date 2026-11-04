set -e
# Run from anywhere: extracts encoded frames by time seek (1080 + 350 px) and by frame index, then sheets and spectrogram.
cd "$(dirname "$0")/../.."
rm -rf cut/scratch/enc && mkdir -p cut/scratch/enc/350 cut/scratch/enc/alt cut/scratch/enc/altseek
ffmpeg -v error -y -ss 0 -i video.mp4 -frames:v 1 cut/scratch/enc/f_00.00.png
ffmpeg -v error -y -i cut/scratch/enc/f_00.00.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_00.00.png
ffmpeg -v error -y -ss 0.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_00.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_00.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_00.40.png
ffmpeg -v error -y -ss 1.18 -i video.mp4 -frames:v 1 cut/scratch/enc/f_01.18.png
ffmpeg -v error -y -i cut/scratch/enc/f_01.18.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_01.18.png
ffmpeg -v error -y -ss 1.65 -i video.mp4 -frames:v 1 cut/scratch/enc/f_01.65.png
ffmpeg -v error -y -i cut/scratch/enc/f_01.65.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_01.65.png
ffmpeg -v error -y -ss 3 -i video.mp4 -frames:v 1 cut/scratch/enc/f_03.00.png
ffmpeg -v error -y -i cut/scratch/enc/f_03.00.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_03.00.png
ffmpeg -v error -y -ss 3.53 -i video.mp4 -frames:v 1 cut/scratch/enc/f_03.53.png
ffmpeg -v error -y -i cut/scratch/enc/f_03.53.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_03.53.png
ffmpeg -v error -y -ss 4.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_04.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_04.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_04.40.png
ffmpeg -v error -y -ss 5.41 -i video.mp4 -frames:v 1 cut/scratch/enc/f_05.41.png
ffmpeg -v error -y -i cut/scratch/enc/f_05.41.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_05.41.png
ffmpeg -v error -y -ss 5.7 -i video.mp4 -frames:v 1 cut/scratch/enc/f_05.70.png
ffmpeg -v error -y -i cut/scratch/enc/f_05.70.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_05.70.png
ffmpeg -v error -y -ss 6.35 -i video.mp4 -frames:v 1 cut/scratch/enc/f_06.35.png
ffmpeg -v error -y -i cut/scratch/enc/f_06.35.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_06.35.png
ffmpeg -v error -y -ss 6.7 -i video.mp4 -frames:v 1 cut/scratch/enc/f_06.70.png
ffmpeg -v error -y -i cut/scratch/enc/f_06.70.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_06.70.png
ffmpeg -v error -y -ss 8.5 -i video.mp4 -frames:v 1 cut/scratch/enc/f_08.50.png
ffmpeg -v error -y -i cut/scratch/enc/f_08.50.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_08.50.png
ffmpeg -v error -y -ss 10.12 -i video.mp4 -frames:v 1 cut/scratch/enc/f_10.12.png
ffmpeg -v error -y -i cut/scratch/enc/f_10.12.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_10.12.png
ffmpeg -v error -y -ss 10.6 -i video.mp4 -frames:v 1 cut/scratch/enc/f_10.60.png
ffmpeg -v error -y -i cut/scratch/enc/f_10.60.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_10.60.png
ffmpeg -v error -y -ss 11.29 -i video.mp4 -frames:v 1 cut/scratch/enc/f_11.29.png
ffmpeg -v error -y -i cut/scratch/enc/f_11.29.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_11.29.png
ffmpeg -v error -y -ss 12 -i video.mp4 -frames:v 1 cut/scratch/enc/f_12.00.png
ffmpeg -v error -y -i cut/scratch/enc/f_12.00.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_12.00.png
ffmpeg -v error -y -ss 12.59 -i video.mp4 -frames:v 1 cut/scratch/enc/f_12.59.png
ffmpeg -v error -y -i cut/scratch/enc/f_12.59.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_12.59.png
ffmpeg -v error -y -ss 13.2 -i video.mp4 -frames:v 1 cut/scratch/enc/f_13.20.png
ffmpeg -v error -y -i cut/scratch/enc/f_13.20.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_13.20.png
ffmpeg -v error -y -ss 15.06 -i video.mp4 -frames:v 1 cut/scratch/enc/f_15.06.png
ffmpeg -v error -y -i cut/scratch/enc/f_15.06.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_15.06.png
ffmpeg -v error -y -ss 16.6 -i video.mp4 -frames:v 1 cut/scratch/enc/f_16.60.png
ffmpeg -v error -y -i cut/scratch/enc/f_16.60.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_16.60.png
ffmpeg -v error -y -ss 18.12 -i video.mp4 -frames:v 1 cut/scratch/enc/f_18.12.png
ffmpeg -v error -y -i cut/scratch/enc/f_18.12.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_18.12.png
ffmpeg -v error -y -ss 19.3 -i video.mp4 -frames:v 1 cut/scratch/enc/f_19.30.png
ffmpeg -v error -y -i cut/scratch/enc/f_19.30.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_19.30.png
ffmpeg -v error -y -ss 20.59 -i video.mp4 -frames:v 1 cut/scratch/enc/f_20.59.png
ffmpeg -v error -y -i cut/scratch/enc/f_20.59.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_20.59.png
ffmpeg -v error -y -ss 20.9 -i video.mp4 -frames:v 1 cut/scratch/enc/f_20.90.png
ffmpeg -v error -y -i cut/scratch/enc/f_20.90.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_20.90.png
ffmpeg -v error -y -ss 21.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_21.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_21.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_21.40.png
ffmpeg -v error -y -ss 21.88 -i video.mp4 -frames:v 1 cut/scratch/enc/f_21.88.png
ffmpeg -v error -y -i cut/scratch/enc/f_21.88.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_21.88.png
ffmpeg -v error -y -ss 22.05 -i video.mp4 -frames:v 1 cut/scratch/enc/f_22.05.png
ffmpeg -v error -y -i cut/scratch/enc/f_22.05.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_22.05.png
ffmpeg -v error -y -ss 23.5 -i video.mp4 -frames:v 1 cut/scratch/enc/f_23.50.png
ffmpeg -v error -y -i cut/scratch/enc/f_23.50.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_23.50.png
ffmpeg -v error -y -ss 25.5 -i video.mp4 -frames:v 1 cut/scratch/enc/f_25.50.png
ffmpeg -v error -y -i cut/scratch/enc/f_25.50.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_25.50.png
ffmpeg -v error -y -ss 26.59 -i video.mp4 -frames:v 1 cut/scratch/enc/f_26.59.png
ffmpeg -v error -y -i cut/scratch/enc/f_26.59.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_26.59.png
ffmpeg -v error -y -ss 27.2 -i video.mp4 -frames:v 1 cut/scratch/enc/f_27.20.png
ffmpeg -v error -y -i cut/scratch/enc/f_27.20.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_27.20.png
ffmpeg -v error -y -ss 27.76 -i video.mp4 -frames:v 1 cut/scratch/enc/f_27.76.png
ffmpeg -v error -y -i cut/scratch/enc/f_27.76.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_27.76.png
ffmpeg -v error -y -ss 28.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_28.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_28.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_28.40.png
ffmpeg -v error -y -ss 29.06 -i video.mp4 -frames:v 1 cut/scratch/enc/f_29.06.png
ffmpeg -v error -y -i cut/scratch/enc/f_29.06.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_29.06.png
ffmpeg -v error -y -ss 29.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_29.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_29.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_29.40.png
ffmpeg -v error -y -ss 31 -i video.mp4 -frames:v 1 cut/scratch/enc/f_31.00.png
ffmpeg -v error -y -i cut/scratch/enc/f_31.00.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_31.00.png
ffmpeg -v error -y -ss 32.5 -i video.mp4 -frames:v 1 cut/scratch/enc/f_32.50.png
ffmpeg -v error -y -i cut/scratch/enc/f_32.50.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_32.50.png
ffmpeg -v error -y -ss 33.41 -i video.mp4 -frames:v 1 cut/scratch/enc/f_33.41.png
ffmpeg -v error -y -i cut/scratch/enc/f_33.41.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_33.41.png
ffmpeg -v error -y -ss 33.9 -i video.mp4 -frames:v 1 cut/scratch/enc/f_33.90.png
ffmpeg -v error -y -i cut/scratch/enc/f_33.90.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_33.90.png
ffmpeg -v error -y -ss 34.4 -i video.mp4 -frames:v 1 cut/scratch/enc/f_34.40.png
ffmpeg -v error -y -i cut/scratch/enc/f_34.40.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_34.40.png
ffmpeg -v error -y -ss 34.60 -i video.mp4 -frames:v 1 cut/scratch/enc/f_34.60.png
ffmpeg -v error -y -i cut/scratch/enc/f_34.60.png -vf scale=350:-1:flags=lanczos cut/scratch/enc/350/f_34.60.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,106)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_106.png
ffmpeg -v error -y -ss 3.5333 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_106.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,162)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_162.png
ffmpeg -v error -y -ss 5.4000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_162.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,303)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_303.png
ffmpeg -v error -y -ss 10.1000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_303.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,378)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_378.png
ffmpeg -v error -y -ss 12.6000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_378.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,452)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_452.png
ffmpeg -v error -y -ss 15.0667 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_452.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,543)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_543.png
ffmpeg -v error -y -ss 18.1000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_543.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,618)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_618.png
ffmpeg -v error -y -ss 20.6000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_618.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,656)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_656.png
ffmpeg -v error -y -ss 21.8667 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_656.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,665)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_665.png
ffmpeg -v error -y -ss 22.1667 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_665.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,798)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_798.png
ffmpeg -v error -y -ss 26.6000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_798.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,872)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_872.png
ffmpeg -v error -y -ss 29.0667 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_872.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,1002)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_1002.png
ffmpeg -v error -y -ss 33.4000 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_1002.png
ffmpeg -v error -y -i video.mp4 -vf "select=eq(n\,1040)" -fps_mode passthrough -frames:v 1 cut/scratch/enc/alt/n_1040.png
ffmpeg -v error -y -ss 34.6667 -i video.mp4 -frames:v 1 cut/scratch/enc/altseek/n_1040.png
ffmpeg -v error -y -pattern_type glob -i 'cut/scratch/enc/350/*.png' -vf tile=11x4 cut/scratch/enc-350-sheet.png
ffmpeg -v error -y -pattern_type glob -i 'cut/scratch/enc/*.png' -vf scale=270:-1,tile=11x4 cut/scratch/enc-1080-sheet.png
ffmpeg -v error -y -i video.mp4 -lavfi showspectrumpic=s=1800x500:fscale=log cut/scratch/spectrogram.png
echo frames_done

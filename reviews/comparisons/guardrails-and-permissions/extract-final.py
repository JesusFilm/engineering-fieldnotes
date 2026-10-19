from pathlib import Path
import subprocess
from PIL import Image,ImageDraw
r=Path(__file__).resolve().parent/'scratch';root=r.parents[3];out=r/'final-fable'
ts=[1.3,2.6,3.6,4.8,6,7.2,9.2,10.5,11.8,13.3,14.3,15.5,16.1,16.5,17.3,19.1,20.0,20.4,21.7,23,24.6,25.366667]
for t in ts:
 p=out/f'beat-{t:.3f}.png'
 subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-ss',str(t),'-i',str(r/'fable-revised.mp4'),'-frames:v','1','-threads','2',str(p)],check=True)
 Image.open(p).resize((350,622)).save(out/f'phone-{t:.3f}.png')
for k in range(0,len(ts),6):
 im=Image.new('RGB',(1050,1284),'#151515');d=ImageDraw.Draw(im)
 for j,t in enumerate(ts[k:k+6]):
  im.paste(Image.open(out/f'phone-{t:.3f}.png'),((j%3)*350,(j//3)*642));d.text(((j%3)*350+8,(j//3)*642+624),f'{t:.3f}s',fill='white')
 im.save(out/f'beats-{k//6}.png')
im=Image.new('RGB',(1050,1284),'#151515');d=ImageDraw.Draw(im)
for i,n in enumerate(['baseline','astra','fable']):
 for j,label in enumerate(['first','last']):
  im.paste(Image.open(r/f'final-{n}'/(label+'.png')).resize((350,622)),(i*350,j*642));d.text((i*350+8,j*642+624),f'{n}: exact {label}',fill='white')
im.save(r/'all-endpoints.png')

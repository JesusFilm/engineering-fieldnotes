import subprocess, pathlib
from PIL import Image, ImageDraw
root=pathlib.Path.cwd(); out=root/'reviews/comparisons/canary-deployments/fresh-scratch'
for name,duration in [('baseline',26),('astra',30),('sol',28)]:
 d=out/name; d.mkdir(exist_ok=True)
 subprocess.run(['ffmpeg','-v','error','-threads','2','-i',str(root/f'public/media/canary-deployments/{name}.mp4'),'-vf','fps=1','-threads','2',str(d/'%03d.png')],check=True)
 files=sorted(d.glob('*.png'))
 for start in range(0,len(files),15):
  sheet=Image.new('RGB',(5*270,3*510),'#191919'); draw=ImageDraw.Draw(sheet)
  for j,p in enumerate(files[start:start+15]):
   im=Image.open(p).resize((270,480)); x=j%5*270;y=j//5*510;sheet.paste(im,(x,y+25));draw.text((x+8,y+5),f'{name} {start+j+0.5:.1f}s',fill='white')
  sheet.save(out/f'{name}-sheet-{start//15}.jpg')

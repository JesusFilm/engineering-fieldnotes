from PIL import Image,ImageDraw
from pathlib import Path
p=Path(__file__).parent
beats={'baseline':[2,6,10,16,18,21,24],'astra':[3,7,13,18,20,23,26,28],'sol':[3,6,11,14,17,19,22,24]}
for name,times in beats.items():
 sheet=Image.new('RGB',(350*len(times),648),'#191919');d=ImageDraw.Draw(sheet)
 for j,t in enumerate(times):
  im=Image.open(p/name/f'{t+1:03}.png'); im.resize((350,622)).save(p/name/f'phone-{t}.png');sheet.paste(im.resize((350,622)),(350*j,26));d.text((350*j+10,5),f'{name} ~{t+.5}s',fill='white')
 sheet.save(p/f'{name}-phone.png')

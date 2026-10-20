"""Render selected topics, resuming only when source hashes still match."""
from pathlib import Path
import subprocess,json,hashlib,sys
ROOT=Path(__file__).resolve().parent.parent
engine=ROOT/'video/shared/sequence-engine'
for key in sys.argv[1:]:
 subprocess.run(['python3',str(engine/'compile.py'),key],check=True,cwd=ROOT)
 folder=ROOT/f'video/{key}/sequence';out=ROOT/f'public/lessons/{key}';out.mkdir(parents=True,exist_ok=True)
 scratch=folder/'scratch';scratch.mkdir(exist_ok=True)
 lessons=json.loads((folder/'lessons.json').read_text())
 for i,l in enumerate(lessons,1):
  name=f'{i:02}';scene=folder/f'{name}.js';movie=out/f'{name}.mp4';poster=out/f'{name}.jpg';stamp=scratch/f'{name}.render.json'
  digest=hashlib.sha256(scene.read_bytes()+b''.join((engine/n).read_bytes() for n in ['flow-engine.js','sfx.js','render.mjs','preview.html'])).hexdigest()
  if stamp.exists() and movie.exists() and poster.exists() and json.loads(stamp.read_text()).get('sourceHash')==digest and json.loads(stamp.read_text()).get('mediaHash')==hashlib.sha256(movie.read_bytes()).hexdigest():
   print('Cached',key,name,flush=True);continue
  print('Rendering',key,name,l['title'],flush=True)
  temporary_movie=scratch/f'{name}.mp4';temporary_poster=scratch/f'{name}.jpg'
  with (scratch/f'{name}.render.log').open('w') as log:
   subprocess.run(['node',str(engine/'render.mjs'),str(scene),str(temporary_movie),'--sheet',str(scratch/f'{name}-sheet.png')],cwd=ROOT,stdout=log,stderr=log,check=True)
  subprocess.run(['ffmpeg','-v','error','-y','-ss','1','-i',str(temporary_movie),'-frames:v','1',str(temporary_poster)],check=True)
  temporary_movie.replace(movie);temporary_poster.replace(poster)
  stamp.write_text(json.dumps(dict(sourceHash=digest,mediaHash=hashlib.sha256(movie.read_bytes()).hexdigest()))+'\n')
 print('Rendered topic',key,flush=True)

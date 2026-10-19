import sys,importlib.util,json,shutil
from pathlib import Path
sys.dont_write_bytecode=True
r=Path.cwd();b=r/'video/queues-and-backpressure/astra';out=b/'scratch/site'
spec=importlib.util.spec_from_file_location('fieldnotes_build',r/'scripts/build.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
m.OUT=out
c=json.loads((r/'content/concepts/queues-and-backpressure.json').read_text())
m.concepts=[c]
m.by_id={x.stem:json.loads(x.read_text()) for x in (r/'content/original').glob('*.json')}
m.originals={c['id']:json.loads((r/'content/original/queues-and-backpressure.json').read_text())}
m.baseline=json.loads((r/'reviews/baseline-media-checks.json').read_text())
out.mkdir(parents=True,exist_ok=True)
for name in ['style.css','app.js','favicon.svg']:shutil.copyfile(r/'src'/name,out/name)
for name in ['media','fonts']:
 if (r/'public'/name).exists() and not (out/name).exists():(out/name).symlink_to(r/'public'/name,target_is_directory=True)
m.chapter(c,0)
print('Isolated preview:',out)

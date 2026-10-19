"""Build only this chapter/comparison into owned scratch without touching shared dist."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import importlib.util,json,shutil
here=Path(__file__).resolve().parent;root=here.parents[2]
spec=importlib.util.spec_from_file_location('fieldnotes_build',root/'scripts/build.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
b.OUT=here/'scratch/site';b.OUT.mkdir(exist_ok=True,parents=True)
g=json.loads((root/'content/concepts/replication-and-consistency.json').read_text());b.concepts=[g];b.by_id={g['id']:g}
for key in g['related']+g['learning']['prerequisites']:b.by_id[key]=json.loads((root/f'content/concepts/{key}.json').read_text())
b.baseline={g['id']:{'duration':26}};b.originals={g['id']:json.loads((root/'content/original/replication-and-consistency.json').read_text())};b.variant_order={g['id']:['baseline','astra','sol']}
for name in ['style.css','app.js','favicon.svg']:shutil.copy2(root/'src'/name,b.OUT/name)
media=b.OUT/'media';media.mkdir(exist_ok=True)
target=media/g['id']
if not target.exists():target.symlink_to(root/'public/media'/g['id'],target_is_directory=True)
b.chapter(g,0)
print(b.OUT)

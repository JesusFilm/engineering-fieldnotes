#!/usr/bin/env python3
"""Render only the assigned content into owned scratch; never mutate shared dist."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import importlib.util,json,shutil
here=Path(__file__).resolve().parent;root=here.parents[2]
spec=importlib.util.spec_from_file_location('fieldnotes_build',root/'scripts/build.py')
b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
b.OUT=here/'scratch/site';b.OUT.mkdir(exist_ok=True,parents=True)
g=json.loads((root/'content/concepts/replication-and-consistency.json').read_text())
v=json.loads((here/'variant.json').read_text())
b.concepts=[g];b.by_id={g['id']:g}
for key in g['related']+g['learning']['prerequisites']:
 b.by_id[key]=json.loads((root/f'content/concepts/{key}.json').read_text())
b.media_for=lambda c:[v]
for name in ['style.css','app.js','favicon.svg']:
 shutil.copy2(root/'src'/name,b.OUT/name)
for asset in (root/'public').iterdir():
 target=b.OUT/asset.name
 if not target.exists():target.symlink_to(asset,target_is_directory=asset.is_dir())
b.chapter(g,0)
print(b.OUT/'concepts/replication-and-consistency/index.html')

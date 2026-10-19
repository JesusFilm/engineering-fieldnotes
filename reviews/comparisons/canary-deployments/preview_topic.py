"""Use repository page generators with output confined to this review's scratch."""
from pathlib import Path
import importlib.util,json,shutil
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
b=module('fieldnotes_build',ROOT/'scripts/build.py');b.OUT=HERE/'fresh-scratch/site';b.OUT.mkdir(exist_ok=True)
c=b.read('content/concepts/canary-deployments.json');b.concepts=[c]
b.by_id={x['id']:x for p in (ROOT/'content/concepts').glob('*.json') for x in [json.loads(p.read_text())]}
b.baseline={c['id']:{'duration':26}};b.originals={c['id']:c};b.variant_order={c['id']:['baseline','astra','sol']}
for name in ['style.css','app.js','favicon.svg']:shutil.copy2(ROOT/'src'/name,b.OUT/name)
if (ROOT/'public/fonts').exists():shutil.copytree(ROOT/'public/fonts',b.OUT/'fonts',dirs_exist_ok=True)
(b.OUT/'media').mkdir(exist_ok=True)
link=b.OUT/'media/canary-deployments'
if not link.exists():link.symlink_to(ROOT/'public/media/canary-deployments',target_is_directory=True)
b.chapter(c,0)
review=json.loads((HERE.parent/'canary-deployments.json').read_text());vs=b.media_for(c)
assert len(vs)==3 and vs[2]['model']=='gpt-6.1-sol' and review['recommended']=='astra'
page=(b.OUT/'concepts/canary-deployments/index.html').read_text()
assert 'astra.mp4' in page and 'baseline.mp4' not in page
compare=(b.OUT/'concepts/canary-deployments/compare/index.html').read_text()
assert all(n+'.mp4' in compare for n in ['baseline','astra','sol']) and 'Fable' not in compare
checks=json.loads((HERE/'fresh-encoded-checks.json').read_text())['checks']
media={f'media/canary-deployments/{n}.mp4':{'schemaVersion':2,'sha256':x['sha256'],'posterSha256':x['posterSha256']} for n,x in checks.items()}
e=HERE/'fresh-scratch/scoped-media-checks.json';e.write_text(json.dumps(media))
m=module('fieldnotes_check_media',ROOT/'scripts/check_media.py');m.EVIDENCE=e;m.check(['canary-deployments'])
print('Two topic pages generated; recommendation, variants, provenance and media hashes checked.')

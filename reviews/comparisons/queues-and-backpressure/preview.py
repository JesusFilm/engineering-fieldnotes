"""Generate only this topic's chapter/comparison under ignored review scratch."""
import importlib.util, json, pathlib, shutil, sys
sys.dont_write_bytecode = True
ROOT = pathlib.Path(__file__).resolve().parents[3]
KEY = 'queues-and-backpressure'
spec = importlib.util.spec_from_file_location('fieldnotes_build', ROOT / 'scripts/build.py')
b = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b)
b.OUT = pathlib.Path(__file__).resolve().parent / 'scratch/site'
b.OUT.mkdir(parents=True, exist_ok=True)
c = b.read(f'content/concepts/{KEY}.json')
b.concepts = [c]
b.by_id = {KEY: c}
b.baseline = {KEY: {'duration': 26}}
b.originals = {KEY: b.read(f'content/original/{KEY}.json')}
b.variant_order = {KEY: ['baseline', 'astra', 'sol']}
# Linked destinations are outside this topic's scope; only their labels are needed.
for key in set(c['related'] + c['learning']['prerequisites']):
    b.by_id[key] = {'id': key, 'title': key.replace('-', ' ').capitalize()}
for name in ('style.css', 'app.js', 'favicon.svg'):
    shutil.copy2(ROOT / 'src' / name, b.OUT / name)
(b.OUT / 'media').mkdir(exist_ok=True)
for source, target in [(ROOT / 'public/media' / KEY, b.OUT / 'media' / KEY),
                       (ROOT / 'public/fonts', b.OUT / 'fonts')]:
    if source.exists() and not target.exists():
        target.symlink_to(source, target_is_directory=True)
b.chapter(c, 0)
print(b.OUT)

"""Check editorial completeness, local navigation, and initial-load budgets."""
import argparse
import hashlib
import json
import pathlib
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.videos, self.scripts = [], set(), [], []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'Duplicate anchor {a["id"]}'
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'video': self.videos.append(a)
        if tag == 'script': self.scripts.append(a)
        for key in ('href', 'src', 'poster'):
            if a.get(key): self.links.append(a[key])


def check(draft=False):
    order = json.loads((ROOT / 'content/order.json').read_text())
    assert len(order) == len(set(order)) == 18, 'Expected 18 unique concept IDs'
    variants_by_concept = json.loads((ROOT / 'content/variants.json').read_text())
    assert set(variants_by_concept) == set(order)
    concepts = [json.loads((ROOT / f'content/concepts/{key}.json').read_text()) for key in order]
    media_checks = json.loads((ROOT / 'reviews/media-checks.json').read_text()) if not draft else {}
    if not draft:
        assert len(list((ROOT / 'public/media').rglob('*.mp4'))) == 54, 'Expected exactly three cuts per concept'
    for c in concepts:
        variants = variants_by_concept[c['id']]
        assert len(variants) == len(set(variants)) == 3 and variants[0] == 'baseline'
        assert c['id'] in order
        assert set(c['related']) <= set(order) - {c['id']}
        assert c['sources'] and all(urlsplit(s['url']).scheme == 'https' for s in c['sources'])
        if draft: continue
        learning = c['learning']
        assert learning['placement'] in ('core', 'reference', 'defer')
        assert set(learning['prerequisites']) <= set(order) - {c['id']}
        assert all(learning.get(k) for k in ('relevance', 'outcomes', 'workflow', 'walkthrough', 'pitfalls', 'exercise', 'reviewed'))
        assert all(learning['workflow'].get(k) for k in ('before', 'after', 'human'))
        assert len(learning['exercise']['success']) >= 2
        comparison = json.loads((ROOT / f'reviews/comparisons/{c["id"]}.json').read_text())
        assert comparison['id'] == c['id'] and comparison.get('contentVerdict')
        assert comparison['recommended'] in variants
        assert comparison.get('verified') and comparison.get('rationale') and comparison.get('findings')
        assert set(comparison['scores']) == set(variants)
        for scores in comparison['scores'].values():
            assert set(scores) == {'clarity', 'accuracy', 'pacing', 'visual'}
            assert all(isinstance(value, (int, float)) and 1 <= value <= 5 for value in scores.values())
        assert len(json.loads((ROOT / f'video/{c["id"]}/baseline/transcript.json').read_text())) >= 3
        for variant in variants:
            media_key = f'media/{c["id"]}/{variant}.mp4'
            digest = hashlib.sha256((ROOT / 'public' / media_key).read_bytes()).hexdigest()
            assert media_checks[media_key].get('schemaVersion') == 2, f'Outdated media checks: {media_key}'
            assert media_checks[media_key]['sha256'] == digest, f'Media checks stale: {media_key}'
            assert comparison['hashes'][variant] == digest, f'Comparative review stale: {media_key}'
            poster = ROOT / 'public' / media_key.replace('.mp4', '.jpg')
            assert media_checks[media_key]['posterSha256'] == hashlib.sha256(poster.read_bytes()).hexdigest(), f'Poster checks stale: {media_key}'
        models = set()
        for variant in variants[1:]:
            v = json.loads((ROOT / f'video/{c["id"]}/{variant}/variant.json').read_text())
            assert v['id'] == variant and v['concept'] == c['id'] and v['verified']
            assert all((ROOT / 'public' / v[k]).is_file() for k in ('src', 'poster'))
            assert len(v.get('transcript', [])) >= 3, f'Missing accessible beat descriptions: {c["id"]}/{variant}'
            assert all(isinstance(beat, str) or isinstance(beat, dict) and isinstance(beat.get('text'), str) for beat in v['transcript']), f'Unsupported transcript beat: {c["id"]}/{variant}'
            models.add(v['model'])
        assert len(models) == 2, 'Alternatives must record distinct model provenance'
    pages = {}
    for file in OUT.rglob('*.html'):
        p = Page(); p.feed(file.read_text()); pages[file.resolve()] = p
        assert p.h1 == 1, f'{file}: expected one chapter title'
        assert 'main' in p.ids, f'{file}: missing skip target'
        assert file.stat().st_size < 100_000, f'{file}: HTML exceeds 100 KB'
        for v in p.videos:
            assert v.get('preload') == 'none' and 'autoplay' not in v, f'{file}: eager video'
            assert 'controls' in v and v.get('aria-label')
        assert all(not urlsplit(s.get('src', '')).scheme for s in p.scripts), 'External runtime script'
    for file, page in pages.items():
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc: continue
            path = unquote(url.path)
            target = (OUT / path.removeprefix('/engineering-fieldnotes/')).resolve() if path.startswith('/engineering-fieldnotes/') else (file.parent / path).resolve() if path else file
            assert target.is_relative_to(OUT.resolve()), f'Link leaves site: {link}'
            if target.is_dir(): target /= 'index.html'
            assert target.exists(), f'{file.relative_to(OUT)}: missing {link}'
            if url.fragment and target in pages:
                assert unquote(url.fragment) in pages[target].ids, f'{file}: missing anchor {link}'
    expected_pages = 39
    assert len(pages) == expected_pages, f'Expected book pages; got {len(pages)}'
    initial = sum((OUT / p).stat().st_size for p in ['index.html', 'style.css', 'app.js', 'fonts/font-0.woff', 'fonts/font-2.woff', 'fonts/font-4.woff'])
    assert initial < 220_000, f'Index exceeds 220 KB uncompressed budget: {initial}'
    print(f'Checked {len(concepts)} concepts, {len(pages)} pages, all local links and anchors. Index + runtime + fonts: {initial:,} bytes; no video preload.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--draft', action='store_true')
    check(parser.parse_args().draft)

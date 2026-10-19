"""Check optional 3D coverage, reproducible assets and reviews bound to shipped files.

Structural checks complement, rather than replace, spatial/visual browser review.
Run with --draft while authors and reviewers are still working.
"""
import argparse
import hashlib
import json
from pathlib import Path
import struct
import subprocess

ROOT = Path(__file__).resolve().parent.parent
FILES = ('scene.glb', 'scene.json', 'interaction.js', 'poster.png')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check(draft=False):
    order = json.loads((ROOT / 'content/order.json').read_text())
    manifest = json.loads((ROOT / 'content/spatial.json').read_text())
    assert set(manifest) == set(order), 'Every concept requires an explicit spatial decision'
    accepted = 0
    for key in order:
        item = manifest[key]
        folder = ROOT / 'public/spatial' / key
        status = item['status']
        assert status in {'candidate', 'accepted', 'omitted'}
        if draft and not all((folder / name).exists() for name in FILES):
            print(f'{key}: authoring incomplete')
            continue
        assert item['authorModel'] == 'anthropic/claude-opus-5-5'
        assert item['reviewerModel'] == 'gpt-6-astra' and item['reviewerEffort'] == 'low'
        for name in FILES:
            assert (folder / name).is_file(), f'{key}: missing {name}'
        assert (ROOT / 'spatial' / key / 'build_scene.py').is_file(), f'{key}: missing reproducible Blender source'
        assert (ROOT / 'spatial' / key / 'scene.blend').is_file(), f'{key}: missing Blender scene'
        data = (folder / 'scene.glb').read_bytes()
        magic, version, size = struct.unpack_from('<4sII', data)
        assert magic == b'glTF' and version == 2 and size == len(data), f'{key}: invalid GLB'
        length, kind = struct.unpack_from('<I4s', data, 12)
        assert kind == b'JSON'
        gltf = json.loads(data[20:20 + length])
        assert gltf.get('meshes') and gltf.get('nodes'), f'{key}: no physical model'
        assert len(data) < 12_000_000, f'{key}: GLB exceeds 12 MB optional-download budget'
        assert (folder / 'poster.png').read_bytes().startswith(b'\x89PNG\r\n\x1a\n')
        config = json.loads((folder / 'scene.json').read_text())
        for field in ('title', 'description', 'initialCaption', 'fallback'):
            assert config.get(field), f'{key}: missing {field}'
        for field in ('position', 'target'):
            assert len(config['camera'][field]) == 3, f'{key}: camera {field}'
        subprocess.run(['node', '--input-type=module', '--check'], input=(folder / 'interaction.js').read_text(), text=True, check=True, capture_output=True)
        intent = json.loads((ROOT / 'reviews/spatial' / key / 'intent.json').read_text())
        assert intent.get('spatialBenefit') and intent.get('beyondVideoTest'), f'{key}: unexplained spatial purpose'
        if not draft:
            assert status != 'candidate', f'{key}: decision not completed'
            review = json.loads((ROOT / 'reviews/spatial' / key / 'review.json').read_text())
            assert review['reviewerModel'] == 'gpt-6-astra' and review['reasoningEffort'] == 'low'
            revision = json.loads((ROOT / 'reviews/spatial' / key / 'revision.json').read_text())
            assert revision['authorModel'] == 'anthropic/claude-opus-5-5'
            assert revision.get('executionModel') == 'anthropic/claude-opus-5-5', f'{key}: final revision requires actual Opus execution'
            assert revision.get('changes'), f'{key}: no recorded Opus revision after critique'
            assert revision.get('critiqueSha256') == digest(ROOT / 'reviews/spatial' / key / 'review.json'), f'{key}: revision not bound to Astra critique'
            assert revision.get('hashes') == {name: digest(folder / name) for name in FILES}, f'{key}: assets changed since revision'
            chapter = (ROOT / 'dist/concepts' / key / 'index.html').read_text()
            if status == 'accepted':
                accepted += 1
                assert f'data-spatial-src="../../spatial/viewer.html?concept={key}"' in chapter
                assert 'data-media-panel="spatial" hidden' in chapter
                assert '<iframe' not in chapter, f'{key}: 3D eagerly loaded in reading page'
                verification = json.loads((ROOT / 'reviews/spatial' / key / 'verification.json').read_text())
                assert verification.get('spatialGate') == 'pass'
                assert verification.get('browserChecks') and verification.get('screenshots')
                assert verification['hashes'] == {name: digest(folder / name) for name in FILES}, f'{key}: stale verification'
                assert verification.get('viewerHash') == digest(ROOT / 'public/spatial/shared/viewer.js'), f'{key}: shared viewer changed after verification'
                for capture in verification['screenshots']:
                    assert (ROOT / capture).is_file(), f'{key}: missing browser capture {capture}'
            else:
                assert item.get('reason'), f'{key}: omission needs a reason'
                assert 'data-spatial-src' not in chapter, f'{key}: rejected illustration exposed on chapter'
                assert not (ROOT / 'dist/spatial' / key).exists(), f'{key}: rejected illustration copied into release'
        print(f'{key}: {status}, {len(gltf["meshes"])} meshes, {len(data):,} bytes')
    if not draft:
        print(f'All {len(order)} concepts evaluated; {accepted} accepted, {len(order)-accepted} omitted.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--draft', action='store_true')
    check(parser.parse_args().draft)

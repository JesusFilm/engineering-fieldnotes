"""Build a static reading library; chapters work without client-side JavaScript."""
import argparse
import html
import hashlib
import json
import pathlib
import re
import shutil
from functools import lru_cache

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'
e = lambda value: html.escape(str(value), quote=True)


def read(path):
    return json.loads((ROOT / path).read_text())


def paragraphs(value):
    values = value if isinstance(value, list) else [value]
    return ''.join(f'<p>{e(v)}</p>' for v in values if v)


def listing(values, ordered=False):
    tag = 'ol' if ordered else 'ul'
    if ordered:
        values = [re.sub(r'^\d+[.)]\s+', '', str(v)) for v in values]
    return f'<{tag}>' + ''.join(f'<li>{e(v)}</li>' for v in values) + f'</{tag}>'


def transcript_html(beats):
    items = []
    for beat in beats:
        if isinstance(beat, str):
            items.append(f'<li>{e(beat)}</li>')
            continue
        time = beat.get('time', beat.get('start', beat.get('t', '')))
        if isinstance(time, (int, float)):
            end = beat.get('end')
            time = f'{time:g}–{end:g}s' if isinstance(end, (int, float)) else f'{time:g}s'
        items.append(f'<li><span class="timestamp">{e(time)}</span> {e(beat["text"])}</li>')
    return '<ol>' + ''.join(items) + '</ol>'


def shell(title, body, prefix='./', description='', page='chapter'):
    css_revision = hashlib.sha256((ROOT / 'src/style.css').read_bytes()).hexdigest()[:12]
    js_revision = hashlib.sha256((ROOT / 'src/app.js').read_bytes()).hexdigest()[:12]
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)} — Fieldnotes</title><meta name="description" content="{e(description)}">
<link rel="icon" href="{prefix}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="{prefix}style.css?v={css_revision}">
<script src="{prefix}app.js?v={js_revision}" defer></script></head><body data-page="{page}">
<a class="skip" href="#main">Skip to content</a>
<header><a class="brand" href="{prefix}">Fieldnotes<span> / engineering</span></a><nav aria-label="Main"><a href="{prefix}">Contents</a><a href="{prefix}about/">About this book</a></nav></header>
<main id="main" tabindex="-1">{body}</main>
<footer><span>A working book for engineers.</span><a href="https://github.com/JesusFilm/engineering-fieldnotes">Source &amp; corrections</a></footer></body></html>'''


def write(path, content):
    target = OUT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content)


def media_for(c):
    key = c['id']
    check = baseline[key]
    result = [{'id': 'baseline', 'concept': key, 'title': 'Original explanation',
               'model': 'Original prototype; model not recorded', 'lesson': originals[key]['summary'],
               'src': f'media/{key}/baseline.mp4', 'poster': f'media/{key}/baseline.jpg',
               'duration': check['duration'], 'verified': True}]
    transcript = ROOT / f'video/{key}/baseline/transcript.json'
    if transcript.exists(): result[0]['transcript'] = json.loads(transcript.read_text())
    baseline_revision = ROOT / f'video/{key}/baseline/variant.json'
    if baseline_revision.exists():
        revision = json.loads(baseline_revision.read_text())
        if revision.get('verified'):
            for field in ('title', 'lesson', 'duration', 'transcript', 'editedBy', 'limitations'):
                if field in revision: result[0][field] = revision[field]
    for variant in variant_order[key][1:]:
        file = ROOT / f'video/{key}/{variant}/variant.json'
        if file.exists():
            item = json.loads(file.read_text())
            if item.get('verified'):
                result.append(item)
    return result


@lru_cache(maxsize=None)
def media_revision(path):
    return hashlib.sha256((ROOT / 'public' / path).read_bytes()).hexdigest()[:12]


def player(v, prefix, title):
    source = f"{prefix}{e(v['src'])}?v={media_revision(v['src'])}"
    poster = f"{prefix}{e(v['poster'])}?v={media_revision(v['poster'])}"
    return f'''<video controls playsinline preload="none" poster="{poster}" aria-label="{e(title)}: {e(v['title'])}">
<source src="{source}" type="video/mp4"><p><a href="{source}">Open the video</a></p></video>'''


def chapter(c, index):
    key, title = c['id'], c['title']
    learning = c.get('learning', {})
    variants = media_for(c)
    review_path = ROOT / f'reviews/comparisons/{key}.json'
    comparison = json.loads(review_path.read_text()) if review_path.exists() else {}
    selected = next((v for v in variants if v['id'] == comparison.get('recommended')), variants[0])
    placement = learning.get('placement', 'core' if c['category'] == 'Agent systems' else 'reference')
    sections = '<section id="idea"><h2>The idea</h2>' + paragraphs(c['overview']) + '</section>'
    sections += '<section id="practice"><h2>Where it helps</h2>' + paragraphs(c['why']) + paragraphs(learning.get('relevance')) + paragraphs(c['example']) + '</section>'
    if learning.get('outcomes'):
        sections += '<section id="outcomes"><h2>What you will be able to check</h2>' + listing(learning['outcomes']) + '</section>'
    workflow = learning.get('workflow')
    if workflow:
        sections += '<section id="workflow"><h2>What changes in the team</h2><dl class="workflow">' + ''.join(f'<dt>{label}</dt><dd>{e(workflow[field])}</dd>' for field, label in [('before', 'Today'), ('after', 'With an agent'), ('human', 'Still your responsibility')]) + '</dl></section>'
    if learning.get('walkthrough'):
        sections += '<section id="walkthrough"><h2>Work through an example</h2>' + listing(learning['walkthrough'], True) + '</section>'
    sections += '<section id="judgement"><h2>The engineering decision</h2>' + paragraphs(c['judgment']) + listing(learning.get('pitfalls', [])) + '</section>'
    exercise = learning.get('exercise')
    if exercise:
        sections += f'<section id="exercise" class="exercise"><h2>Try it with your team</h2><h3>{e(exercise["title"])}</h3>' + listing(exercise['steps'], True) + '<h3>You have an answer when…</h3>' + listing(exercise['success']) + '</section>'
    sections += '<section id="sources"><h2>Read further</h2>' + paragraphs(c['next']) + '<ul class="sources">' + ''.join(f'<li><a href="{e(s["url"])}">{e(s["title"])}</a></li>' for s in c['sources']) + '</ul></section>'
    related = [by_id[x] for x in c['related'] if x in by_id]
    sections += '<section id="related"><h2>Connected ideas</h2><ul class="related">' + ''.join(f'<li><a href="../{e(x["id"])}/">{e(x["title"])}</a></li>' for x in related) + '</ul></section>'
    prerequisites = [by_id[x] for x in learning.get('prerequisites', []) if x in by_id]
    prereq = '<p class="prerequisites">Helpful first: ' + ', '.join(f'<a href="../{e(x["id"])}/">{e(x["title"])}</a>' for x in prerequisites) + '.</p>' if prerequisites else ''
    contents = [('idea', 'The idea'), ('practice', 'Where it helps')]
    if workflow: contents.append(('workflow', 'Team workflow'))
    if exercise: contents.append(('exercise', 'Team exercise'))
    contents.append(('sources', 'Sources'))
    body = f'<a class="back" href="../../">← Contents</a><div class="article-grid"><div class="article-head"><p class="eyebrow">{e(c["category"])} · {"Start here" if placement == "core" else "Reference" if placement == "reference" else "Under review"}</p><h1>{e(title)}</h1><p class="deck">{e(c["summary"])}</p>{prereq}<a class="read-first" href="#idea">Read the guide ↓</a></div>'
    body += '<div class="prose">' + sections + '</div><aside aria-label="Video and chapter navigation">'
    body += player(selected, '../../', title)
    body += f'<p class="media-label">{round(selected["duration"])} sec · Sound optional</p><p class="video-lesson">{e(selected["lesson"])}</p><a class="compare-link" href="compare/">Compare {len(variants)} video cuts →</a>'
    if selected.get('transcript'):
        body += '<details class="transcript"><summary>Read the video sequence</summary>' + transcript_html(selected['transcript']) + '</details>'
    body += '<nav class="chapter-nav" aria-label="On this page"><h2>In this chapter</h2>' + ''.join(f'<a href="#{anchor}">{label}</a>' for anchor, label in contents) + '</nav></aside></div>'
    links = []
    for idx, direction in [(index - 1, 'Previous'), (index + 1, 'Next')]:
        if 0 <= idx < len(concepts):
            other = concepts[idx]
            links.append(f'<a href="../{e(other["id"])}/"><span>{direction} chapter</span>{e(other["title"])}</a>')
    body += '<nav class="chapter-turn" aria-label="Chapter navigation">' + ''.join(links) + '</nav>'
    if learning.get('reviewed'): body += f'<p class="review-date">Content reviewed {e(learning["reviewed"])}. <a href="../../about/#review">How reviews work</a></p>'
    write(f'concepts/{key}/index.html', shell(title, body, '../../', c['summary']))
    compare(c, variants, comparison)


def compare(c, variants, review):
    body = f'<a class="back" href="../">← {e(c["title"])}</a><div class="comparison-head"><p class="eyebrow">Watch &amp; compare</p><h1>{e(c["title"])}</h1><p class="deck">Different ways to see the same idea. Play one cut at a time, then return to the guide to try it yourself.</p></div>'
    if review.get('rationale'):
        recommended = next((v for v in variants if v['id'] == review.get('recommended')), variants[0])
        body += '<details class="recommendation"><summary>Why we recommend ' + e(recommended['title']) + '</summary>' + paragraphs(review['rationale']) + '</details>'
    body += '<div class="comparison-grid">'
    for v in variants:
        tag = 'Recommended' if v['id'] == review.get('recommended') else ('Revised original' if v.get('editedBy') else 'Original') if v['id'] == 'baseline' else 'Alternative'
        author_label = {"gpt-6-astra": " · Astra", "anthropic/claude-fable-5-1": " · Fable", "gpt-6.1-sol": " · Sol"}.get(v["model"], "")
        body += f'<section class="cut"><p class="eyebrow">{tag}{author_label} · {round(v["duration"])} sec</p><h2>{e(v["title"])}</h2>' + player(v, '../../../', c['title']) + paragraphs(v['lesson'])
        if v.get('transcript'):
            body += '<details class="transcript"><summary>Read the video sequence</summary>' + transcript_html(v['transcript']) + '</details>'
        body += '<details><summary>About this cut</summary>' + paragraphs('Production: ' + v['model'] + '.')
        if v.get('editedBy'): body += paragraphs('Revision: ' + v['editedBy'] + '.')
        body += paragraphs(v.get('limitations', [])) + '</details></section>'
    body += '</div><p class="comparison-note">These animations use sound effects rather than narration. The written guide explains the mechanism and its limits. Model names describe how a cut was made, not a quality ranking.</p>'
    if review.get('findings'):
        body += '<section class="comparison-findings"><h2>What the review found</h2>' + listing(review['findings']) + '</section>'
    write(f'concepts/{c["id"]}/compare/index.html', shell(c['title'] + ' · Video comparison', body, '../../../', c['summary'], 'comparison'))


def index_page():
    shelves = {c.get('learning', {}).get('placement', 'core' if c['category'] == 'Agent systems' else 'reference') for c in concepts}
    shelf_options = ''.join(f'<option value="{key}">{label}</option>' for key, label in [('core', 'Start here'), ('reference', 'Systems reference'), ('defer', 'Under review')] if key in shelves)
    body = '<div class="intro"><h1>Engineering<br>with agents.</h1><p>Practical guides for teams learning to delegate software work.</p></div>'
    body += '<div class="start-note"><h2>A useful first pass</h2><p>Begin with <a href="concepts/tool-design/">tool design</a>, <a href="concepts/guardrails-and-permissions/">permissions</a>, and <a href="concepts/agent-evals/">evaluations</a>. Then bring one small, repeatable task into your team’s workflow.</p></div>'
    body += f'<form class="toolbar" role="search"><label class="search">Find a concept<input id="search" type="search" placeholder="Try “retry” or “context”" autocomplete="off"></label><label>Reading shelf<select id="shelf"><option value="all">All concepts</option>{shelf_options}</select></label><label>Team role<select id="role"><option value="all">All roles</option><option>Application</option><option>Platform</option><option>Tech lead</option></select></label><button type="reset" class="reset" hidden>Clear filters</button></form>'
    body += f'<div class="results-heading"><p id="count" role="status">{len(concepts)} concepts</p><p>Short guides · Practical exercises</p></div><div class="catalogue">'
    for i, c in enumerate(concepts):
        placement = c.get('learning', {}).get('placement', 'core' if c['category'] == 'Agent systems' else 'reference')
        search = ' '.join([c['title'], c['summary'], c['overview'], c['category']]).lower()
        body += f'<a class="concept-row" href="concepts/{e(c["id"])}/" data-concept="{e(c["id"])}" data-search="{e(search)}" data-shelf="{placement}" data-roles="{e("|".join(c["roles"]))}"><span class="number">{i+1:02}</span><h2>{e(c["title"])}</h2><p>{e(c["summary"])}</p><span class="shelf-label">{"Start here" if placement == "core" else "Reference" if placement == "reference" else "Under review"}</span><span class="arrow" aria-hidden="true">→</span></a>'
    body += '</div><div class="empty" hidden><h2>No matching concepts</h2><p>Try a shorter search, or clear the filters to see the whole book.</p><button type="button" id="clear-empty">Show all concepts</button></div><noscript><p>All chapters are listed above. Search and filters need JavaScript; reading and video controls work without it.</p></noscript>'
    write('index.html', shell('Engineering with agents', body, description='Practical guides, exercises and animated explanations for software teams adopting AI and agentic workflows.', page='index'))


def build():
    global concepts, by_id, baseline, originals, variant_order
    parser = argparse.ArgumentParser()
    parser.add_argument('--draft', action='store_true', help='Build while reviews and alternatives are in progress')
    args = parser.parse_args()
    order = read('content/order.json')
    variant_order = read('content/variants.json')
    concepts = [read(f'content/concepts/{key}.json') for key in order]
    by_id = {c['id']: c for c in concepts}
    originals = {key: read(f'content/original/{key}.json') for key in order}
    baseline = read('reviews/baseline-media-checks.json')
    if not args.draft:
        for c in concepts:
            assert c.get('learning'), f'Written review missing: {c["id"]}'
            assert len(media_for(c)) == 3, f'Video alternatives missing: {c["id"]}'
            assert (ROOT / f'reviews/comparisons/{c["id"]}.json').exists(), f'Comparison missing: {c["id"]}'
    if OUT.exists(): shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(ROOT / 'public', OUT, dirs_exist_ok=True)
    for name in ('style.css', 'app.js', 'favicon.svg'): shutil.copy2(ROOT / 'src' / name, OUT / name)
    index_page()
    for i, c in enumerate(concepts): chapter(c, i)
    about = '<div class="about prose"><p class="eyebrow">About this book</p><h1>A book to use<br>at work.</h1><p class="deck">Fieldnotes is for software engineers bringing models and agents into a team that already knows how to build software.</p><section><h2>Use a chapter at work</h2><p>Choose a task you understand well enough to inspect. Read the mechanism, watch the example, and use the exercise to test one decision in your own environment. The systems references are here for the failure modes you will meet along the way.</p></section><section id="review"><h2>How reviews work</h2><p>These guides and animations were developed with AI assistance. Each concept is reviewed against primary sources for relevance, accuracy, and a concrete team exercise. Video alternatives are independently authored with different models, then compared for clarity, accuracy, pacing, and visual legibility. The original explanation stays in the comparison; corrections are attributed with each cut.</p><p>Model review is fallible. Sources, limitations, scene code, and review evidence are retained in the repository so a reader can check the reasoning and propose a correction. Audio checks are analytical unless a review explicitly records listening.</p></section><section><h2>A small, durable library</h2><p>Reading pages are static HTML. There are no accounts, trackers or third-party scripts. Videos load on demand. The code and learning material live together so future editorial work can be reviewed as a change to the book.</p></section><section><h2>Help improve it</h2><p><a href="https://github.com/JesusFilm/engineering-fieldnotes/issues">Report an unclear explanation or propose a correction</a>. Include the chapter, the claim or timestamp, and evidence for the change.</p></section></div>'
    write('about/index.html', shell('About this book', about, '../', 'How to use and contribute to Engineering Fieldnotes.'))
    write('404.html', shell('Page not found', '<div class="prose"><h1>This page is missing.</h1><p>The chapter may have moved. Return to the contents to find it.</p><a href="/engineering-fieldnotes/">Open the contents →</a></div>', '/engineering-fieldnotes/'))
    write('.nojekyll', '')
    print(f'Built {len(concepts)} chapters and comparison pages ({"draft" if args.draft else "reviewed"}).')


if __name__ == '__main__': build()

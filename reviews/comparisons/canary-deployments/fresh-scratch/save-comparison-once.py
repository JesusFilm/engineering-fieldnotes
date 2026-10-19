"""Save the completed review only against already checked, unchanged encodes."""
from pathlib import Path
import json,hashlib
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
checks=json.loads((HERE/'fresh-encoded-checks.json').read_text())
for name,c in checks['checks'].items():
 p=ROOT/f'public/media/canary-deployments/{name}.mp4'
 assert hashlib.sha256(p.read_bytes()).hexdigest()==c['sha256']
 assert c['fullDecode'] and c['exactFirstLastRGB'] and c['faststart'] and c['audioPeakDbfs']<=-.5
 assert c['everyCueHasEnergy']
 p=ROOT/f'video/canary-deployments/{name}/variant.json'
 v=json.loads(p.read_text())
 snap=HERE/'fresh-scratch'/f'{name}-metadata-before.json'
 if not snap.exists():snap.write_text(json.dumps(v,indent=2)+'\n')
 v['verified']=True
 v['previousEditedBy']=v['editedBy']
 v['editedBy']='gpt-6.1-sol comparative review'
 v['reviewers']=['gpt-6-astra comparative review','gpt-6.1-sol comparative review']
 v['comparativeVerification']={'reviewerModel':'gpt-6.1-sol','date':'2026-10-19','sha256':c['sha256'],'evidence':'reviews/comparisons/canary-deployments/fresh-encoded-checks.json','physicalListening':False}
 v.setdefault('corrections',[]).append({'date':'2026-10-19','editedBy':'gpt-6.1-sol comparative review','scope':'Verification metadata only; scene, encode, poster and transcript unchanged','changes':['Completed fresh blind comparative review and renewed hash-bound encoded verification. Earlier gpt-6-astra comparative-review corrections and original model provenance are preserved.']})
 p.write_text(json.dumps(v,indent=2,ensure_ascii=False)+'\n')
result={
'id':'canary-deployments',
'reviewerModel':'gpt-6.1-sol',
'recommended':'astra',
'rationale':'Split the signal makes the chapter’s most useful release decision concrete: a green 0.4% pooled error rate conceals 40% failures in candidate exports, so promotion must wait for the right breakdown. Its same-window denominators and retained failed window make it the strongest main entry for the guide and exercise. The original is a simpler routing-and-latency introduction, while Canary the outcome adds a useful agent-prompt example where HTTP 200 coexists with failed PR tests and a visible gate returns new sessions to control.',
'findings':[
'Baseline 00:05–00:15 shows three 4:1 routing cycles and longer candidate work before comparing p95 900ms with 120ms; it gives the clearest service-flow intuition, but its small version labels and 7.5× badge are harder to read at 350px than the alternatives’ cards.',
'Astra 00:06–00:18.6 clears the prior window, collects a new one, then replaces 40/10,000 overall errors with same-window export counts 0/900 versus 40/100. That denominator contrast teaches a release decision the other two cuts do not show.',
'Sol 00:11.2–00:19 separates successful API responses from required PR-test failure, sends that failure into STOP, and feeds the gate back to session routing. This is the clearest explicit enforcement path and the most direct application to shared agent prompts; it does not establish a population failure rate.',
'Astra 00:23.1–00:28.6 explicitly labels the retained 40% result FAILED WINDOW after withdrawal. Baseline 00:18.5–00:24 and Sol 00:19–00:26 also retain failed evidence while fresh work uses control, but leave its historical scope implicit.',
'All three allow the failure and recovery to land. Baseline 00:06–00:15 repeats the latency contrast longest; Astra 00:06–00:13 uses a collecting window before its metric reveal; Sol 00:05.7–00:10.62 packs thirty routing events into a short burst. These are stylized ratios, not adequate measured samples or prescribed observation times.',
'Astra 00:14.65 and Sol 00:12.25–00:14.20 confirm that the interrupted reviewer’s border-emphasis and artifact-gutter repairs keep critical text clear. Full encoded checks pass for all three final files, including exact first/last RGB equality; audio has measurable cue energy and safe peaks but was not heard.'
],
'scores':{'baseline':{'clarity':4,'accuracy':4,'pacing':3,'visual':3},'astra':{'clarity':5,'accuracy':5,'pacing':4,'visual':5},'sol':{'clarity':5,'accuracy':4,'pacing':4,'visual':4}},
'hashes':{n:c['sha256'] for n,c in checks['checks'].items()},
'contentVerdict':'Keep as reference. Canary evaluation changes a concrete exposure-and-recovery decision when agent-assisted code or shared agent tooling reaches live users; it is not a prerequisite to ordinary local AI-assisted coding. The guide correctly connects concurrent version/operation measurements, explicit pass/fail/insufficient-evidence policy, human-owned release limits, and rollback compatibility to a local exercise with observable success criteria. Primary sources support those boundaries; the fixture counts and five-percentage-point gate are illustrative editorial choices, not universal safety thresholds.',
'verified':True,
'defectsFixed':[
'Earlier partial review, gpt-6-astra comparative review: Astra 00:14.50 metric-centred ripple replaced by border emphasis; confirmed clear in the current encode.',
'Earlier partial review, gpt-6-astra comparative review: Sol 00:12.00–00:14.10 PR artifacts rerouted through the centre gutter and status-centred ripples replaced by border emphasis; confirmed clear in the current encode.',
'Earlier partial review, gpt-6-astra comparative review: baseline transcript timings aligned to the unchanged encode; current source and frames agree.',
'Fresh gpt-6.1-sol comparative review: completed missing comparison, renewed encoded checks, and resolved pending verified metadata while retaining original author models and earlier correction attribution. No further scene or media repair was warranted.'
],
'limitations':[
'Audio was analysed through full-track levels, spectrograms and cue-window energy, not physically heard. Overlapping energy does not prove isolated audibility or comfortable sound on hardware.',
'Inspection used decoded contact sheets, full-resolution and 350px frames including beat transitions, routing cycles and exact endpoints; it is not a real-phone playback test.',
'All data, traffic weights and video observation times are illustrative. The animations omit statistical power and do not demonstrate pass and insufficient-evidence branches; the guide supplies those policies.',
'Baseline p95 and Sol retained test results have implicit historical scope; Astra labels the failed window explicitly. Tests alone cannot establish complete artifact correctness, and a strict test abort does not prove causal attribution.',
'Withdrawal redirects new traffic or sessions; it does not undo data, PRs, external effects or automatically cancel existing work. Shared dependencies can affect the control, so absolute health checks remain necessary.',
'Fresh review is independent of author commentary until before.md was saved, but it is model review and is fallible. Earlier author verification files describe older encodes; the fresh hash-bound checks are the current evidence.'
]}
(HERE.parent/'canary-deployments.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n')
print('Saved verified comparison:',HERE.parent/'canary-deployments.json')

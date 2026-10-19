from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[3];out=Path(__file__).resolve().parent
checks=json.loads((out/'encoded-checks.json').read_text())
for name,c in checks.items():
 assert c['fullDecode'] and c['matchingBoundaryFrames'] and c['faststart'] and c['audioPeakDbfs']<=-.5
 assert hashlib.sha256((root/f'public/media/observability-and-tracing/{name}.mp4').read_bytes()).hexdigest()==c['sha256']
comparison={
'id':'observability-and-tracing',
'recommended':'astra',
'rationale':'Follow the tool is the clearest chapter entry: a tool starts a separate trace, propagation is repaired for a new run, and the same 2.4-second operation becomes connected without becoming faster. Its large labels and distinct trace/span identifiers make the guide’s exercise easier to reproduce. The baseline is a useful follow-up on nested retry cost, while Fable shows how to find the matching downstream failure among unrelated service records.',
'findings':[
'Astra 5.0–10.0s versus Fable 8.35–17.56s: both expose missing context, but Astra isolates one disconnected tool with explicit trace/span identities; Fable adds the useful complication of unrelated API traffic and requires more visual tracking.',
'Astra 11.0–19.2s versus Fable 17.56–24.8s: both reset and execute a new task after propagation changes. Astra preserves 0.6s model, 2.4s tool and 3.0s total; Fable preserves the 500 error. Neither repair claims to fix the underlying performance or failure.',
'Baseline 13.5–20.4s uniquely reveals the 1,200ms failed attempt, 200ms gap and 600ms successful attempt inside a 2,000ms operation. The revised 17.0s chip says attempt 2, making the first retry unambiguous; these nested intervals are not extra time to add to the parent.',
'Fable 25.36–28.56s now routes the blue join to only the matching 7e2d row and dims unrelated history. The red error remains visible inside the blue selection, so successful correlation is distinguishable from successful execution.',
'At 350px, Astra 16.0–22.5s has the clearest operation names and identity key; baseline 19.5s has the simplest readable waterfall; Fable 25.7–27.5s is legible but denser, with smaller operation strings and abbreviated IDs. The matching-row selection improves its ending without eliminating that reading cost.',
'Baseline 20.4–23.0s, Astra 21.2–25.3s and Fable 25.36–28.56s all hold the diagnostic result before fading. Astra’s final hold is generous and slightly slow, while Fable needs its hold to read the matching failure; all three final encoded endpoints exactly match their openings.'
],
'scores':{'baseline':{'clarity':4,'accuracy':4,'pacing':4,'visual':4},'astra':{'clarity':5,'accuracy':5,'pacing':4,'visual':5},'fable':{'clarity':4,'accuracy':4,'pacing':4,'visual':3}},
'hashes':{name:c['sha256'] for name,c in checks.items()},
'contentVerdict':'Keep as core for teams delegating multi-operation tasks to agents. The guide teaches a concrete early debugging practice—connect task/model/tool evidence before changing prompts—and its deterministic broken-boundary exercise has observable success criteria. It correctly separates tracing from evaluation, authorization and performance improvement, covers privacy and missing telemetry, and warns that GenAI conventions are Development. Larger monitoring deployments remain problem-driven reference work; the chapter does not require them.',
'verified':True,
'defectsFixed':[
'Baseline: corrected retry 2 to attempt 2 at 17.0–17.6s; rerendered, regenerated poster and clarified the transcript while retaining unrecorded original-model provenance.',
'Fable: replaced the whole API-history glow with a join and selection of only the matching error span at 25.36s; unrelated rows dim and error status stays red. Rerendered and regenerated poster with original model provenance retained.',
'Fable: corrected transcript timings and dotted-line description against encoded frames; clarified receiver instrumentation/export requirements and that identical storage backends are not a protocol requirement.',
'Guide: added retrieval dates to the seven primary references accessed during this review.'
],
'limitations':[
'Audio was analysed via decoded PCM, per-cue energy and inspected spectrograms; it was not listened to. Device audibility and subjective timbre remain untested.',
'This is an author-material-blind first pass, not randomized identity blinding: supplied filenames expose variant labels. before.md predates author source and metadata inspection.',
'Visual review used decoded contact sheets, every causal beat at 350px, full-resolution key/busy frames and exact endpoints; continuous real-time playback was not used.',
'All three are illustrative synchronous examples. Sampling loss, export failure, asynchronous links, fan-out, sensitive-data controls and correctness evaluation are addressed by the guide rather than animated.',
'Fable omits concrete parent/span IDs and is denser on a phone; baseline omits propagation repair. Scores assess suitability as teaching artifacts, separately from the encoded-media checks.',
'Recommendation is saved editorial review evidence; no release, Git or publication operation was performed.'
]}
(root/'reviews/comparisons/observability-and-tracing.json').write_text(json.dumps(comparison,indent=2)+'\n')
print(json.dumps({'recommended':comparison['recommended'],'hashes':comparison['hashes']},indent=2))

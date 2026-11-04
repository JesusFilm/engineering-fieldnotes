# Review a concrete action — encoded comparison

**Decision: pass.** Prefer the local candidate for exposing the approved record and the executor's artifact/target comparisons before production changes. No reproducible objective blocker was established. No media edits or publication were performed.

## Scope and method

Grounding: item 4 of `video/guardrails-and-permissions/sequence/lessons.json`. The agent proposes a release, the reviewer inspects artifact/target/evidence and approves that action, a separate executor enforces the binding, and the agent remains read-only.

Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted. Viewed individual native-width 350×622 frames: candidate periodic samples 001–007; baseline 001, 003, 005. Exact candidate frames at 10, 16, 18, 22, 25, 28, 30, 32, 36 and 41 seconds; baseline at 8, 16 and 22 seconds. Candidate 30 seconds was also inspected at full encoded resolution. Periodic indices are not asserted exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning and selected exact frame indices into full-resolution PNGs, followed by Pillow Lanczos resize to JPEG. Settled comparison labels were checked at both scales; no missing-text or clipping fault was established. Isolated display omissions are not flagged as encoded defects. Evidence remains in `scratch/04/`. This is sampled frame/transition inspection, not continuous playback or an exhaustive every-frame visual audit.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Persistent release record exposes action, artifact, target and evidence. Approved versus to-run columns make executor binding visible. | Three-node overview and captions state the binding, but executor checks are not shown as concrete comparisons. |
| Accuracy | Reviewer approval precedes checks; both artifact and target match before deployment. Separate deployer is named and agent read-only persists. | Correct reviewer/executor separation, deployment and final read-only reminder. |
| Pace | 42.2 seconds separates record preparation, inspection, approval, comparison and execution with readable holds. | 28 seconds provides a concise but more abstract sequence. |
| Legibility | Core release values, comparisons and states are readable at native 350px; small role/status labels supplement larger content. | Main labels and two-line captions are readable. |
| Meaningful variety | Review highlights, approved/to-run alignment, individual match marks and live release update each convey a different step. | Repeated boxes and approval packets convey the broad workflow with less inspectable state. |

## Observed sequence

- Early periodic frames show reviewer engineer, agent investigator/read-only and production r41/not started. Release r42 fills with deploy, abbreviated artifact a91f…7c2e, target prod and tests 12/12 passed.
- 10 and 16 seconds: reviewer is inspecting the release and artifact/target/evidence are emphasized while executor remains waiting.
- 18 seconds: reviewer and release record are approved. Production still r41, not started. At 22 seconds the executor has approved values and approved by reviewer status, but execution has not begun.
- 25 seconds: approved and to-run values appear side by side. 28 seconds: artifact has a match mark while target is being checked. 30 seconds: both match marks are present and production still has not started.
- 32 seconds: deployment is underway, still showing r41 during this sampled intermediate state. 36 seconds: live r42 is attributed to deployer; executor says match · ran r42. Agent stays read-only. 41 seconds retains the result and exact-value comparison for the ending hold.
- Baseline 8 seconds sends r42 + EVIDENCE, 16 seconds shows check approval, and 22 seconds shows deployed r42 to prod with agent still read-only. Its core story agrees, but the candidate makes the matching operation concrete.

## Accuracy limits and optional refinements

The digest is visibly abbreviated. A real executor must compare the full immutable artifact identifier, not only the displayed characters. The illustrated test count supports review but neither proves deployment safety nor supplies authorization. Trusted reviewer identity/approval validation is represented by approved by reviewer; its authentication implementation is not demonstrated. This successful path does not test altered targets, replay or expiry. Agent read-only is a depicted configured state, not proof about all alternate credential paths.

Optional: specify the service as well as prod in the target, and name the test suite more specifically. The existing record and matching values satisfy this focused lesson; these additions would improve realism without fixing an objective fault. No repair is required.

## Technical checks and audio limitation

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1266 frames, 42.2 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Signal measurements: candidate mean −32.4 dB, maximum −5.3 dB; baseline mean −41.3 dB, maximum −10.5 dB. Both have signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, synchronization and subjective balance are not listening-verified.

## Hash binding

- Candidate before: `26b4f367c671e8e6ce39b446c1508faa15c335523c4b156fc4b80af363906557`
- Candidate after: `26b4f367c671e8e6ce39b446c1508faa15c335523c4b156fc4b80af363906557`
- Baseline before: `1b98a74b8d5f9ecbade1dd105a0a613bdeea5048601caf1cccc96c3adc720e9d`
- Baseline after: `1b98a74b8d5f9ecbade1dd105a0a613bdeea5048601caf1cccc96c3adc720e9d`

Both hashes remained unchanged. This decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.

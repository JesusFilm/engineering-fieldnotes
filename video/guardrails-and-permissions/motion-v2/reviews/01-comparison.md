# Intent versus permission — encoded comparison

**Decision: pass.** Prefer the local candidate for showing why authorization denies the operation and corroborating non-execution with a stable call count and release value. No reproducible objective blocker was established. No media edits or publication were performed.

## Scope and evidence

Grounding: item 1 of `video/guardrails-and-permissions/sequence/lessons.json`: instructions express intent; a contrary deployment request is checked against identity permissions and rejected before deployment execution. Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted during inspection.

Viewed individual native-width 350×622 frames: candidate periodic samples 001–006; baseline 001, 003, 005. Exact candidate frames inspected at 8, 11, 16, 18, 20, 22, 25, 29, 35 and 38 seconds; baseline at 8, 16 and 22 seconds. Candidate 35 seconds was also inspected at full encoded resolution. Periodic filenames identify samples rather than exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning, selected exact frame indices into full-size PNGs, then resized with Pillow Lanczos to JPEG. Full-size inspection confirms the complete settled labels; no isolated display omission is treated as an encoded defect. No candidate visual fault was established after these checks. Evidence remains in `scratch/01/`. This is sampled frame and transition inspection, not continuous playback or an exhaustive every-frame visual audit.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Do not deploy remains visible beside the contrary request. Session identity, action, target and missing grant explain the denial outside the model. | Three-node overview explains instruction versus authorization mainly through captions and generic not-authorized state. |
| Accuracy | Identity is explicitly from session. Read-log permission is distinct from deploy-prod permission. DENIED / 403 leaves calls at 0 and live release at r41. | Correct high-level rejection and not-executed result, but less explicit about trusted identity and unchanged resource state. |
| Pace | 38.8 seconds gives request, identity inspection, permission comparison, denial and unchanged-state verification separate emphasis. Final hold supports comparison. | 28 seconds uses broad seven-second phases with less concrete information. |
| Legibility | Main instruction, request, identity, action, permission and denial are readable at native 350px. Secondary annotations are smaller but redundant with the larger state labels. | Main labels and two-line captions are readable. |
| Meaningful variety | Nested application boundary, request inspector, grant comparison and execution register each serve the lesson; state and data replace paragraph captions. | Repeated boxes and one travelling request provide a simpler topology but little inspectable permission evidence. |

## Observed sequence

- Opening samples show the instruction and execution register before the request. Calls is 0 and live release is r41.
- 8 seconds: deploy r42 → prod is present while Do not deploy remains unchanged. The instruction has not prevented request generation.
- 11 seconds: authorization identifies investigator from session. 16 seconds: deploy and prod are visible, along with the investigator's read logs grant. 18 seconds emphasizes action and target.
- 20 seconds: needs deploy prod has no grant; result is DENIED / 403. Calls remains 0. At 22 seconds the denied state persists without activity in the deployment service.
- 25 seconds: the originating request is marked denied. 29 seconds: never called and unchanged annotations reinforce calls 0 and r41. 35 seconds juxtaposes instruction as intent with the missing permission and denial.
- 38 seconds: stage fades toward the finite ending. No request reaches deployment execution, no call increment or release change is visible in inspected states.
- Baseline 8 seconds shows DEPLOY REQUEST travelling toward authorization; 16 seconds shows not authorized; 22 seconds shows deploy service not executed. Its semantics agree, but it does not expose the grants or live release evidence.

## Accuracy limits and optional refinements

The application check receives the request; the downstream deploy service is the component that remains uninvoked. Authentication is assumed established, and from session distinguishes trusted identity from a model-supplied claim. A read logs grant is displayed, not an actual successful log-read demonstration. The diagram assumes applicable execution paths enforce this policy; it does not prove protection from alternate credentials or bypass routes. No human approval or successful deployment is introduced.

Optional: make the target more specific than prod, such as checkout/prod, if space permits; slightly increase secondary annotation size/contrast for from session and no grant. Neither is necessary to understand this denied operation, and neither warrants a blocker.

## Technical checks and audio limits

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1164 frames, 38.8 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Audio signal measurements: candidate mean −33.8 dB, maximum −4.8 dB; baseline mean −47.0 dB, maximum −15.1 dB. Both have signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, synchronization and subjective balance are not listening-verified.

## Hash binding

- Candidate before: `5c4c07a1ef6794139bc699badf1c8cd075e798a0dbbc018dc17840f96ad77e5f`
- Candidate after: `5c4c07a1ef6794139bc699badf1c8cd075e798a0dbbc018dc17840f96ad77e5f`
- Baseline before: `e2be4cf18fa2c676caadb1d9dec253387a5efb8ecd5a10b9aa29f9886256029f`
- Baseline after: `e2be4cf18fa2c676caadb1d9dec253387a5efb8ecd5a10b9aa29f9886256029f`

Both hashes remained unchanged. This decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.

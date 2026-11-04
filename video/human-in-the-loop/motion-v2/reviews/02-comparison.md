# Lesson 02 comparison — Give the reviewer evidence

**Pass.** Prefer the local candidate. Its concrete request, inspectable checks, risk/recovery details and retained action-specific decision teach more than the baseline's abstract evidence transfer. No reproducible objective blocker was found in the inspected samples. Optional refinements are not blockers.

## Scope and method

Grounded in `video/human-in-the-loop/sequence/lessons.json` item 2: identify artifact and environment, inspect evidence/risks, record the human decision against that action, and require the executor to check the same identity. Earlier planning context is acknowledged but not used as encoded evidence. No author source, current plan or self-review was read.

Viewed individual actual native350-width frames: seven candidate and five baseline periodic samples using FFmpeg `fps=1/6,scale=350:-1`. Alternate extraction decoded by frame index from the beginning, then used Pillow Lanczos resizing to350×622 and JPEG output. Exact candidate times inspected: 0,5,10,12,16,18,20,22,26,28,30,32,34,36,40,42,43s. Baseline: 7,14,21,27s. Also inspected candidate40s at full resolution. This is sampled state/transition analysis, not continuous playback or an every-frame audit. Alternate extraction corroborated content/layout; no unconfirmed visual fault is flagged.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Vague request becomes deploy checkout / artifact A / production. Tests and risks are inspected before approval. Action, target and artifact then populate the decision record. | Correct proposal→reviewer→record flow, but evidence and risks are largely described by captions. |
| Accuracy | Tests remain separate from approval. Request and decision contain matching identifiers; executor explicitly has not run and will check A. | Correctly binds approval to A; less complete visible action/target record. |
| Pace | 44s gives separate reading time for tests, risk, identity review, approval and recorded scope. | 28s, four caption phases; readable but more abstract. |
| Native350 legibility | Main field values, checks, risk/recovery and recorded decision are readable. Source line and secondary labels are smaller but discernible. | Spacious labels and readable prose, with smaller reviewer sublabel. |
| Meaningful variety | Tabbed evidence, fixed action fields, explicit review control and populated decision record each carry different state. | Three similar boxes and labeled transfer chips. |

## Timestamped observations

- Initial periodic sample presents `ship the fix?` as vague. At5s action is becoming concrete; by10s deploy checkout, A/digest and production are established.
- At12s empty-password rejection appears. At16–18s both empty rejection and valid acceptance are visible with source `test run T7 on A`. The decision remains pending while results receive review emphasis.
- At20s the panel switches to Risks; at22–26s brief-restart risk and prior-release recovery are visible. The action header remains stable.
- At28s artifact identity is emphasized before the decision. At30s Approve A is selected and the decision becomes approved with reviewer R1.
- At32s the action row is recorded; at34s the decision includes action, production target and matching A/digest. At36s this complete record is held.
- At40–42s executor says `not run` and `will check A` with the same displayed identity. Approval is not shown as deployment. At43s the stage clears after the final hold.
- Baseline7/14/21s samples show evidence, review and stored approval phases. At27s it correctly states execution must check the same identity, without the candidate's concrete decision fields.

## Accuracy limits

The digest is visibly abbreviated with an ellipsis; the video is an illustrative identity display, not proof of a secure full-digest comparison. A real executor must check the full identity and action/target under protected authorization state. The depicted tests are bounded evidence, not exhaustive correctness proof. Brief restart and prior-release recovery are summaries, not a complete rollout plan or guaranteed rollback. R1 represents a reviewer; authentication and storage protections are not demonstrated. No stale-artifact or actual-deployment scenario is introduced.

Optional improvements:

1. Consider expanding “pw” to “password” for beginners, using the available evidence-panel width.
2. Consider labeling the executor reminder “check full artifact ID” to make the abbreviated digest display explicitly distinct from the identity value checked in a real implementation.

## Technical verification and hash binding

Both files are1080×1920 with audio. Candidate44.000s at30fps; baseline28.000s at20fps. Full audio/video decode completed with exit code0 for both; moov precedes mdat in each. Candidate levels: mean_volume: -33.7 dB, max_volume: -8.3 dB. Baseline: mean_volume: -41.7 dB, max_volume: -10.5 dB. Audio was analyzed, **not heard**; actor-specific timbre, subjective mix and perceptual synchronization are not certified.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/human-in-the-loop/motion-v2/02/video.mp4 | `afb623e3822059bd0d63a963a19504a7afda5977a6bd13eb9a1641512ef643f3` |
| public/lessons/human-in-the-loop/02.mp4 | `767bf4e0b88ba0769d80f508d61688e5613b304ad1d3c902571497df3f90c437` |

Decision applies only to this candidate hash. Any repair/new encode requires renewed actual encoded inspection and a fresh hash-bound decision. No media edits. Writes are restricted to this comparison, decision JSON and scratch/02 evidence.

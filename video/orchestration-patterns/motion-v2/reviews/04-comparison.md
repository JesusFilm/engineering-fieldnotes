# Join before deciding — encoded comparison

**Decision: pass.** Prefer the local candidate for explicitly separating report receipt, findings and release assessment. No reproducible objective blocker was established. Optional refinements are not blockers. No media was edited or published.

## Scope and method

Grounding: item 4 of `video/orchestration-patterns/sequence/lessons.json`. API finishes first, the coordinator waits for migration, migration returns a risk, and that risk blocks release even with both reports present. Earlier planning context is acknowledged; no author source, plan reread or self-review was consulted during this encoded inspection.

Viewed individual native-width 350×622 frames: candidate periodic samples 001–006; baseline 001, 003, 005. Exact candidate frames inspected at 4, 6, 16, 18, 20, 21, 22, 24, 30 and 36 seconds; baseline at 8, 16 and 22 seconds. Candidate 6 seconds was also viewed at full encoded resolution. Periodic indices are not claimed as exact timestamps.

Periodic frames used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning, selected exact frame indices into full-size PNGs, then used Pillow Lanczos resizing to JPEG. An apparent dropped prefix in the displayed 6-second thumbnail was checked against the full-size frame: the encoded label is incomplete, as intended. It is not a visual defect. The tally lag is visible through both extraction paths and is assessed as optional timing polish below. Evidence is under `scratch/04/`. This is sampled frame/transition inspection, not continuous playback or an exhaustive every-frame visual audit.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Named receipt rows expose precisely what is missing. A separate finding column and release panel make completeness versus acceptability concrete. | The dependency diagram and captions explain waiting, then blocking, but receipt and assessment share one coordinator node. |
| Accuracy | One received report leaves WAITING; the migration finding becomes Row loss risk and produces BLOCKED. Reports 2 / 2 and complete persist alongside the blocked outcome. | Correct overall sequence: 1 of 2, 2 of 2, then release blocked. The underlying risk remains generic. |
| Pace | 37 seconds provides a sustained waiting interval, visible report travel, blocking transition and final reading hold. | 28 seconds is concise, with broad phases and caption-based explanation. |
| Legibility | Essential table labels, receipt states, risk and release reason remain readable at native 350px. Short labels avoid paragraph captions. | Node labels and two-line captions are readable but require more prose reading. |
| Meaningful variety | Worker activity, receipt matrix, count, specific finding and separate release state have distinct explanatory functions. | Conventional nodes, progress bar and travelling risk token provide a simpler topology view. |

## Timestamped observations

- Opening samples show API finished while migration runs; the API report travels to its named row.
- At 4 seconds API is received with No blocker; at 6 seconds the count has settled to 1 / 2 and incomplete. Release remains WAITING throughout these inspected states.
- At 16 seconds the migration receipt is still waiting, Reports 1 / 2 is emphasized, and the reason says Needs migration report. A running activity bar distinguishes pending work from a missing success check.
- At 18 seconds migration has found a risk, while the coordinator still waits for its report. At 20 seconds the MIG token travels toward the migration row.
- At 21 seconds migration is received with Row loss risk and release is already BLOCKED. The count still reads 1 / 2 briefly. At 22 seconds it reads 2 / 2; the full migration reason is visible. Blocking is not delayed until the count settles.
- At 24 and 30 seconds complete receipt coexists with BLOCKED and the persistent risk. No approval or automatic repair is shown. At 36 seconds the stage has faded to a title-only finite ending.
- Baseline 8 seconds shows 1 of 2 reports; 16 seconds shows 2 of 2 reports after migration risk; 22 seconds shows release blocked. It teaches the same outcome but does not retain a concrete finding in a separate coordinator row.

## Accuracy limits and optional improvements

The example assumes usable reports and a release policy under which the migration risk blocks. It does not demonstrate report validation, stale snapshots, worker failure, timeout or conflict reconciliation; those broader takeaway concerns should not be inferred as implemented. No blocker is a finding attributed to the API row, not a whole-release guarantee. A finished worker is not a passed release. The risk is a review finding, not a depicted test execution.

1. Synchronize each count increment with its received row. The brief 0 / 2 after API receipt at 4 seconds and 1 / 2 after migration receipt at 21 seconds are staged tally updates. Settled states and the immediate blocked outcome remain clear, so this is timing polish rather than a blocker.
2. No blocker reported would qualify the API finding more explicitly. The existing column context already attributes it to that report, so this is optional wording refinement.

## Technical checks and audio limitation

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1110 frames, 37 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both contain moov before mdat.

Signal measurements: candidate mean −34.5 dB, maximum −6.1 dB; baseline mean −43.6 dB, maximum −12.5 dB. These indicate signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, subjective balance and synchronization are not listening-verified.

## Hash binding

- Candidate before: `49cea6b7c7fb5b4eb7630828a2897ae4bff22b323b21e5971d3d3e8e7243de54`
- Candidate after: `49cea6b7c7fb5b4eb7630828a2897ae4bff22b323b21e5971d3d3e8e7243de54`
- Baseline before: `ff4d129a4658408ff89692fd0358467cc67d19b7a85e258f642182c9cfb16089`
- Baseline after: `ff4d129a4658408ff89692fd0358467cc67d19b7a85e258f642182c9cfb16089`

Both hashes remained unchanged. This decision applies to the candidate hash above. Any repair or replacement encode needs renewed actual encoded inspection and a decision bound to the new full hash; changing the hash alone is insufficient.

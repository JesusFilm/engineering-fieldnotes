# Grant only needed access — encoded comparison

**Decision: pass.** Prefer the local candidate: its permission grid makes the action/resource intersection explicit and its read counters corroborate the two outcomes. No reproducible objective blocker was established. No media edits or publication were performed.

## Scope and inspection method

Grounding: item 2 of `video/guardrails-and-permissions/sequence/lessons.json`. An investigation identity may read checkout logs; each request is checked against both action and resource; the allowed read returns data; a payments-log read is denied. Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted.

Viewed individual native-width 350×622 frames: candidate periodic samples 001–008 and baseline 001, 003, 005. Exact candidate frames inspected at 12, 16, 18, 22, 24, 26, 30, 34, 36, 40 and 46 seconds; baseline at 8, 18 and 22 seconds. Candidate 40 seconds was also viewed at full encoded resolution. Periodic sample filenames are indices, not asserted exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning, selected exact frame indices into full-resolution PNGs, then resized with Pillow Lanczos to JPEG. No candidate clipping or missing-text fault was established through these checks; isolated display omissions are not flagged as defects. Evidence is retained under `scratch/02/`. This is sampled frame/transition inspection, not continuous playback or an exhaustive every-frame visual audit.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | The same investigator and read column persist; checkout versus payments selects a different permission cell. Read counters expose actual execution. | Captions explain scope while generic incident-agent, authorization and approved-logs boxes show the route. |
| Accuracy | Session identity, fixed grants, one checkout read and zero payments reads support scoped access. The second request receives a fresh check. | Correct allowed-then-denied sequence, but the generic approved-logs node retains its earlier success while payments is denied. |
| Pace | 47 seconds gives row/column matching, execution, returned data, reset, second check and denial separate reading time. | 28 seconds is economical but relies more on captions and fewer inspectable intermediate states. |
| Legibility | Request, resource names, action headers, grant states and read counts are readable at native 350px. Secondary annotations are smaller but redundant. | Main labels and two-line captions are readable. |
| Meaningful variety | Grid intersection, request/status changes, authorized read travel, data return and invariant denied-resource counter each teach a different part of the mechanism. | Repeated boxes and moving chips give a simpler topology with less concrete authorization evidence. |

## Timestamped observations

- Opening samples establish investigator from session, a single checkout/read allow cell, other cells with no grant, and both read counters at zero.
- 12 seconds: read column and checkout row are highlighted together. 16 seconds: read checkout travels toward the log service only after the matching allow cell is selected.
- 18 seconds: checkout reads becomes 1 while payments remains 0. At 22 seconds the request is marked allowed and result timeout x3 is visible. This is presented as the returned log observation.
- 24 seconds retains the allowed result. At 26 seconds the request changes to read payments logs, status returns to pending, and the old result clears. Identity, grants and read counts persist.
- 30 seconds highlights the same read column for the new request. 34 seconds shows the payments/read no-grant cell and returning 403 response. 36 seconds shows denied and no payments grant; the payments read count remains zero.
- 40 seconds contrasts the two cells while showing checkout reads 1 and payments reads 0 / never read. 46 seconds fades toward the finite ending. No forbidden log payload is visible in the inspected sequence.
- Baseline 8 seconds dispatches READ checkout; 18 seconds marks approved logs read permitted; 22 seconds begins READ payments; the final periodic sample shows payments denied. The intended distinction is correct but less directly evidenced.

## Accuracy limits and optional refinements

The grid illustrates effective grants for this example, not every possible policy condition. Authentication is assumed established; from session distinguishes the identity from an arbitrary request claim. The write column concerns these log resources and is not a deployment permission. No deployment attempt or permission expansion is depicted. Counter and response values are instructional visual evidence, not a real service audit.

Optional: label timeout x3 more explicitly as log data so it cannot be mistaken for a timeout of the successful read itself. The allowed status and incremented checkout counter already support the intended reading. Secondary annotation contrast could also be increased slightly if phone testing warrants it. Neither refinement is a blocker.

## Technical verification and audio limits

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1410 frames, 47 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Signal measurements: candidate mean −33.7 dB, maximum −5.0 dB; baseline mean −41.5 dB, maximum −10.4 dB. Both have signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, synchronization and subjective balance are not listening-verified.

## Hash binding

- Candidate before: `641610d072384d684501c1cc2d84d8afe5e22b060f83e4d30cda666712fd972a`
- Candidate after: `641610d072384d684501c1cc2d84d8afe5e22b060f83e4d30cda666712fd972a`
- Baseline before: `ab2ec6c5afc117306f9e1c9d1a13f8add6f23548dc2768c9c7737ac3367a8d7d`
- Baseline after: `ab2ec6c5afc117306f9e1c9d1a13f8add6f23548dc2768c9c7737ac3367a8d7d`

Both hashes remained unchanged. This decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.

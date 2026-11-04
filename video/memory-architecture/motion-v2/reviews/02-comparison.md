# Memory architecture 02 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Choose the memory scope.” It demonstrates independent thread histories, a keyed shared read, and the distinction between memory scope and backend durability. No reproducible objective blocker was found in the inspected frames and transitions. This recommendation does not promote public media.

## Grounding and method

Grounded in item 2 of `video/memory-architecture/sequence/lessons.json`: thread state belongs to one conversation; shared records can span conversations; a new conversation reads its relevant scope; restart retention depends on the backend rather than the scope name.

Earlier planning context was acknowledged, but no author source or self-review was consulted. Viewed actual individual native 350 × 622 frames: candidate periodic samples 001–009; baseline 001, 003, 004, 006. Periodic files use ffmpeg `fps=1/5`; filenames are sample numbers, not exact timestamps. Additional exact frame-index extracts were inspected at candidate 15, 18, 19, 20, 23, 25, 28, 30, 32, 33, 34, 36, 40 and 45s; baseline 7.3, 14.3, 18 and 21.3s. Candidate 45s was also inspected full-size. Both videos were computationally decoded completely; visual inspection was sampled, not continuous playback.

Alternate extraction selected exact frames from full decoding to full-size PNG, then resized with Pillow Lanczos to native350 JPEG, separately from the initial ffmpeg-scaled PNG route. Apparent truncated static text in some displayed small images was not classified as an encode defect. Full-size 45s confirms complete thread labels, progress values, namespace/key labels and restart outcomes. No missing-text blocker is asserted.

## Comparison

| Criterion | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Thread B starts with distinct progress, reads the billing command and explicitly does not read A's state | Generic thread/store/new-session stack; captions explain separation |
| Accuracy | Both scopes lose data in the in-memory example and retain it in the database example | Correct caption distinguishes scope/durability, but backend behavior is not demonstrated |
| Pacing | 46.8s supports separate scope selection and restart-test phases, with substantial reading holds | 28s with four approximately seven-second phases; simpler but more abstract |
| Native 350px legibility | Essential records, lost/kept labels and final takeaway readable; dense secondary fields are modest in size | Larger simple boxes and readable explanatory captions |
| Meaningful variety | Scope-specific record layout changes focus to a two-by-two backend comparison | Mostly static three-box arrangement with one scoped-record transfer |

## Observed mechanism and transitions

- Periodic samples 001–003 establish Thread A's `step 2 of 4` and a tentative `flaky e2e?` guess, plus separate billing/catalog namespace records. The guess stays in A rather than being promoted to shared policy.
- **15–18s:** Thread B appears with its own `step 1 of 3` and an empty command field. Its progress differs from A's. A request path reaches the shared store.
- **19–20s:** the billing `npm test` value is selected and a response travels to B. The unrelated catalog `pytest` value remains separate.
- **23–25s:** B has `npm test`; the dashed A-to-B route is marked `not read`. A's progress and guess remain in A. This makes noninheritance explicit without erasing the source thread.
- **28–30s:** earlier scope examples dim and the restart test appears below, with columns `one thread` and `shared`, and rows `backend: in-memory` and `backend: database`. Before restart, all four example cells contain data.
- **32–33s:** the process-restart indicator runs, then changes to `after restart`. Results are revealed in stages; the 33s frame precedes the loss/retention markings rather than being the settled conclusion.
- **34s:** both in-memory examples show `lost` and no value. **36s:** both database examples show `kept` with their original values. Scope names remain fixed.
- **40–45s:** the completed comparison holds, followed by `scope ≠ durability`. A thread record surviving restart directly counters the misconception that thread scope necessarily means RAM.
- **Baseline 7.3/14.3/18/21.3s:** the shared namespace is introduced, a scoped-record token moves toward the new session, and the caption changes to the durability distinction. The final periodic sample repeats the scope/durability caption without showing a backend experiment. The baseline is accurate but relies more heavily on prose.

## Accuracy and interpretation limits

The restart matrix is an illustrative comparison of backend configurations, not a measured production durability guarantee. Retained database values assume successful durable writes and a backend available after restart; the example does not cover database failure, retention deletion or backup recovery. An in-memory fixture with no external restoration loses its data. Thread A's dimmed upper diagram is prior explanatory context, not a contradictory surviving live RAM record after restart.

Namespace/key organization is not an authorization check. The animation demonstrates selection of the relevant shared record, not a security boundary. `npm test` and `pytest` are illustrative saved values; no applicability check, approval, command execution or test result is established. A new conversation need not always have exactly the displayed starting progress; this fixture simply has independent task state.

No incorrect settled state, reproduced essential-text clipping or essential held-label collision was found. Lower contrast in the old diagram is deliberate focus management. The dense restart area is readable at native350, though it could use the available stage more effectively.

## Optional improvements, not blockers

1. Remove or shrink the inactive upper diagram during the restart comparison and enlarge the active matrix labels.
2. Add a short “backend examples” label to make the illustrative configuration comparison explicit.

## Technical and audio checks

Both complete decodes returned exit 0 with no reported errors. Candidate: 46.8s, 1080 × 1920, 30fps, 1404 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both place `moov` before `mdat`.

Signal analysis: candidate mean −34.1dB / maximum −6.5dB; baseline mean −46.9dB / maximum −15.3dB. Measured peaks leave headroom. **Audio was not actually heard.** These measurements cannot establish actor timbres, audible event synchronization or listening comfort.

No media was edited. Any later repair or new encode requires renewed encoded inspection bound to its new full hash, not replacement of the hash alone.

## Hash binding

**Candidate** `video/memory-architecture/motion-v2/02/video.mp4`

- Before: `2fa054449d2d5bca591acb8b6a81d81052fef03b9ce7ab834378803c3ceb7d4c`
- After: `2fa054449d2d5bca591acb8b6a81d81052fef03b9ce7ab834378803c3ceb7d4c`
- Unchanged: yes.

**Baseline** `public/lessons/memory-architecture/02.mp4`

- Before: `61dae169add8e69da4d2729763cc77cba52c975860eaf65725e975903ea4b94c`
- After: `61dae169add8e69da4d2729763cc77cba52c975860eaf65725e975903ea4b94c`
- Unchanged: yes.


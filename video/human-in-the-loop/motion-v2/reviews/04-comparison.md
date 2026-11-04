# Human-in-the-loop lesson 04 — Reject an approval mismatch: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/human-in-the-loop/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson; that context is acknowledged. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/human-in-the-loop/motion-v2/04/video.mp4` | `8ab396bace8fcbbe6f62b80b038f40fe22822a5c6cd15f2552ce739908004f5b` | 45.0 s | h264 1080×1920, 30 fps, 1350 frames | aac |
| public `public/lessons/human-in-the-loop/04.mp4` | `fb1cd80579bd44658c0f826176071324c8c5a0cb8303ea99643568f3ce0c2b11` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows each of the lesson's four beats as a state change: the current build moves to B while the recorded approval keeps naming A, a field-by-field comparison marks only the artifact as different, the executor blocks with `deploy calls 0` and production unchanged, and a separate review for B opens with B's own evidence and a pending decision. The public cut is a valid, readable alternative, but it carries the lesson in sentence captions over three generic boxes, and its fourth beat (review B with its own evidence) has no visual at all. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled for orientation (`c1–c4.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 1.5, 4.4, 6.5, 8.6, 10.4, 14.6, 16.4, 18.6, 21.3, 29.4, 32.4, 39.4 and 44.6 s (`t350/`, `t350_a.png`, `t350_b.png`).
- Full-resolution frames by accurate seek (14.6, 16.4, 18.0, 18.6, 19.2, 21.3 s) and by frame-number select (frames 492 and 558), cropped to the compare and executor panels (`full/`, `full/crops.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (45 s).** A stacked dashboard: BUILDS (with a `current` pointer), COMPARE (field / `approved · R1` / `requested`), EXECUTOR (result, `deploy calls 0`, `production previous`), and REVIEW.

| time | beat | evidence |
|---|---|---|
| 0–9 s | the artifact changes; the approval still names A | build `A · 7c2e…91af` with `current A`; compare panel fills: approved `deploy / production / A · 7c2e…`, requested the same; build `B · 92bd…04c8` appears and the pointer becomes `current B` (≈ 5.6 s); the requested artifact flips to `B · 92bd…` (≈ 6.6 s) while approved stays `A · 7c2e…`, then the approved header and A cell pulse (≈ 8.4 s) |
| 9.5–17.5 s | the executor compares identities | executor panel lights (`result —`, `deploy calls 0`, `production previous`) and turns `checking`; rows outlined in turn: action ✓ (≈ 14 s), target ✓ (≈ 14.6 s), artifact both cells outlined (≈ 16 s) then ✗ (≈ 17.5 s) |
| 18–27.5 s | execution is blocked; no deployment | `result mismatch` highlighted (18.0 s); executor turns red `blocked` with the loudest sound (20.2 s, −5.6 dB); `deploy calls 0` and `production previous` pulse in turn (≈ 21.6, 22.8 s) and do not change; hold to ≈ 28 s |
| 28–39 s | review B with its own evidence; approval does not transfer | a dot runs to the REVIEW panel, which becomes `REVIEW B · new`; rows `artifact B · 92bd…04c8`, `evidence T8 on B`, `decision pending` appear in turn; status `pending`; the approved header and A cell pulse unchanged (≈ 37 s); `decision pending` highlighted (≈ 39 s) |
| 39–45 s | hold and fade | final state held ≈ 4 s, then fade to an empty stage under the title |

**Public (28 s).** Three boxes (CURRENT ARTIFACT B, APPROVAL A approved, EXECUTOR) with two-line captions per 7 s beat. Motion: a `B` chip and an `APPROVAL A` chip travel to the executor (≈ 7–12 s); the executor box turns red `blocked` at 14 s. Nothing changes from 15 to 28 s; the review of B exists only as a caption. Six sound onsets.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 4.5 | 2.5 | Candidate shows that only the artifact differs (✓ ✓ ✗ at 14–17.5 s) and that the block follows from that row; the public cut shows two chips meeting and a red box without saying which field failed. |
| accuracy | 4.5 | 3.5 | Candidate keeps approval naming A throughout, never relabels it, keeps `deploy calls 0` and `production previous` unchanged, and gives B its own evidence and a pending decision. Public is accurate but omits B's review. |
| pacing | 4 | 2 | Candidate events 0.8–1.4 s apart, holds of ≈ 4–5 s after the block and at the end. Public has a 14 s static tail. |
| legibility at 350 px | 3.5 | 4.5 | Public text is larger. Candidate row text is small (roughly 11–12 px at 350) but readable in every inspected frame; truncated digests `A · 7c2e…` / `B · 92bd…` remain distinguishable by letter and colour. No clipping or overlap found. |
| meaningful variety | 3 | 1 | Candidate's comparison table suits a field-by-field identity check. It reuses the same dashboard look as the lesson 03 candidate (stacked mono panels), so the chapter's visual vocabulary varies less than its content. Public is the generic three-box pattern with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.6 dB (below −0.5 dB) | −15.1 dB |
| loudest event | executor block at 20.2 s | n/a |
| sound on visible events | onsets at 0.6–8.4 s (builds, compare fill, pointer), 11.0–15.6 s (scan), ≈ 17.5 s (✗), 20.2–22.8 s (block and unchanged checks), 28.0–33.2 s (review B), 37–39 s (final pulses) | six onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; 23.3–28.0 s and 39–43 s are holds after beats | 15–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Investigated items (not defects)

- **Stray text across the executor panel in a crop montage.** In `full/crops.png` a line `A · 7c2e…91af  B · 92bd…04c8` appears to sit inside the executor panel. This is the seam of the montage: the second row of crops begins at y = 560, which is the builds row. The individual 350 px seek frames and the uncropped full frames show `deploy calls 0` in that position. Not a video fault.
- **Row highlight wider than `result mismatch` text** at 18.0 s. It is a deliberate full-row highlight that fades by 19.2 s (seek and select frames agree). Not a fault.
- **✓/✗ marks near the compare panel's right border.** At full resolution the marks sit inside the border with clear space and do not touch the requested cells' outlines.

## Optional improvements (not blockers)

1. **Make the mismatch audible.** The ✗ at ≈ 17.5 s peaks at −20.4 dB, quieter than the routine ticks (≈ −10 to −12 dB). A clearer `miss` on the artifact row would let the ear catch the discovery before the block at 20.2 s.
2. **Explain `T8`.** `evidence T8 on B` assumes the viewer knows T8 is a test run. `tests on B` or `test run T8 · B` would be plainer for beginners.
3. **Raise row text size** in the compare and review panels; readable but small at 350 px.
4. **Vary the chapter's look.** The lesson 03 and 04 candidates share the same stacked dashboard; a geometry closer to a diff (two columns with the differing cell drawn apart) would make lesson 04 more distinct.
5. **Trim the post-block hold slightly** (23.3–28.0 s, ≈ 4.7 s) if it reads slack when watched; the guideline is 1.5–2.5 s, though a longer hold here is defensible.

## Scratch evidence

`video/human-in-the-loop/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, full-resolution seek and select frames, the crop montage, and the candidate spectrogram.


# Human-in-the-loop lesson 03 — Pause without guessing: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/human-in-the-loop/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson; that context is acknowledged. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/human-in-the-loop/motion-v2/03/video.mp4` | `8c43114fd8ea64d03b97920d1885cff5220a97a3859f1383e157d5b4166486bb` | 49.0 s | h264 1080×1920, 30 fps, 1470 frames | aac 44.1 kHz stereo |
| public `public/lessons/human-in-the-loop/03.mp4` | `af02835ae971aae3ad352b0fd47bb6dfd20f835a6c2cf23df4f13509a8d36169` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac 44.1 kHz stereo |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It teaches every beat of the lesson through state changes on screen, adds the concrete failures the lesson's intro names (a worker restart and 24 hours of waiting), and passes every objective check. The public cut remains a valid, readable alternative but carries its teaching in paragraph captions over three nearly static generic boxes. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled for orientation (`c1–c4.png`, `p1–p2.png`).
- Individual native 350 px frames inspected at 6, 12, 18, 29, 35 and 45 s (`n350a.png`) and at transition points 4.6, 9.4, 17.15, 20.8, 31.2, 36.3, 37.6, 39.6 and 48.6 s, produced by a separate accurate-seek extraction from the source (`t350/`, `t350_row.png`).
- Full-resolution frames by accurate seek at 2, 5, 9.5, 16.5, 28–32, 36, 39, 41, 44, 47 and 48.5 s, and by frame-number select (frames 915, 1080, 1320) (`full/`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.** Statements about sound come from levels, onsets and the spectrogram.

## What each cut shows

**Candidate (49 s).** A stacked software dashboard: a workflow header (`WORKFLOW W7 · deploy A · production`), a stage list (prepare / review / revalidate / execute), worker and reviewer panels, a saved-state panel, and an executor strip with `deploy calls 0`.

| time | beat | evidence |
|---|---|---|
| 0–8 s | the run reaches the review boundary | prepare → `done`; review → `paused` (accent); execute `not run` outlined at 6 s; reviewer panel lights with `no decision · waited 0 h` |
| 9–12.3 s | save the state and artifact | saved-state header `saving…` → `saved`; rows `run W7`, `action deploy A · production`, `stage review`, `decision pending` written one at a time with matching tones (9.9, 10.45, 11.0, 11.55 s) |
| 17–23.6 s | the pause survives a restart | worker turns red `offline` with the loudest sound (17.0 s, −3.5 dB); memory becomes `mem —`; saved rows stay and pulse; worker returns `online` empty (20.8 s), then `restored` with `mem W7 · A`; review still `paused` |
| 26–32.3 s | waiting is not consent | `waited 2 h → 8 h → 24 h` with three ticks (27, 28, 29 s); a grey dot runs from the reviewer down the right gutter and ends in a grey × beside the decision row (31.1 s, −6.0 dB, second loudest); decision stays `pending`, review `paused`, `deploy calls 0` |
| 36–42.6 s | a decision resumes; revalidate before execution | reviewer `approve A · R1` (36 s); saved decision → `approved · R1` (≈ 38 s); review → `resumed`; stage → `revalidate` `checking`; saved action row highlighted; execute stays `not run` |
| 42.6–49 s | hold and fade | final state held ≈ 5 s, then fade to an empty stage under the title |

**Public (28 s).** Three boxes (WORKFLOW, SAVED STATE, REVIEWER) with two-line sentence captions under each 7 s beat. State changes: `SAVE STATE` chip at ≈ 7–8 s, saved state → `pending A` (9 s), workflow `still paused` (14 s), an `A: YES` chip from reviewer to workflow (21–22 s), workflow `decision: revalidate` (23 s). Six sound onsets in total. Long stretches have no motion (0–7 s, 9–14 s, 14–21 s, 23–28 s).

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 4.5 | 2 | Candidate shows why the pause must be durable (memory lost at 17–18 s, rows survive, reload at 21–22 s) and that time cannot decide (24 h, refused dot at 31 s). In the public cut, "do not interpret waiting as consent" exists only as a caption at 14–21 s; nothing on screen waits or refuses. |
| accuracy | 4.5 | 3.5 | Both stay within the lesson. Candidate keeps execute `not run` and `deploy calls 0` throughout, records the reviewer (`R1`) and saves the action with the state. Its revalidation is shown as `checking` with no visible result, which is accurate but incomplete. The public `A: YES` decision goes straight to the workflow without being stored and shows no revalidation beyond a label. |
| pacing | 4 | 2.5 | Candidate events sit 0.5–1 s apart with holds of 3.4–4.6 s after each beat; no unexplained stillness. Public has 5–7 s static stretches carried by captions. |
| legibility at 350 px | 3.5 | 4.5 | Public text is large. Candidate row text is small at 350 px (roughly 11–12 px font) but readable in every inspected frame; headers, `paused`, `offline`, `waited 24 h` and `approved · R1` are clear. No clipping or overlap found. |
| meaningful variety | 4 | 1 | Candidate uses a software dashboard whose rows change state in place. Public is the generic three-box diagram with paragraph captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat (moov before mdat) | same |
| audio peak | −3.5 dB (below −0.5 dB) | −10.5 dB |
| loudest event | crash at 17.0 s, as the disruption | n/a |
| sound on every visible event | yes: onsets match beat events (pause 3.2–6.3 s, saves 9.0–12.3 s, crash 17.0 s, restore 20.6–23.6 s, ticks 27–29 s, refusal 31.1 s, decision and resume 36–42.6 s) | sparse: six onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; quiet stretches are holds after beats | 5–7 s static stretches |
| ending | finite, ≈ 5 s hold then fade | ends on the caption frame |

## Investigated mark: grey × in the right gutter (not a defect)

From 31.1 s a grey dot travels from the reviewer's `waited 24 h` row down a dashed gutter line at x ≈ 1052 and ends in a grey × beside the saved-state decision row. The dashed line and × remain to the end, including from ≈ 38 s when the adjacent row reads `approved · R1`.

Reproduced by two extraction methods: accurate seek at 29.5, 30.0, 30.5, 31.0, 32.0, 36.0, 44.0 and 47.0 s, and frame-number select (frame 1080 = 36.0 s) (`full/edge.png`, `full/late.png`). It is a real encoded element: inside the frame, clear of the panel border (≈ 1020) and of all text. It reads as a deliberate retained trace ("time was refused"), so it is not a blocker. Its persistence next to the approved decision is a teaching ambiguity, listed below as an optional improvement.

## Optional improvements (not blockers)

1. **Clear or reposition the refusal ×** when the decision arrives (≈ 36–38 s). Beside `approved · R1` it can read as "approval rejected". Fading it when the reviewer approves keeps the timer refusal and the real decision distinct.
2. **Show the revalidation result.** The video ends at `revalidate checking` (40–47 s). A brief comparison mark (saved action matches, target still ready) before the hold would make "revalidate before execution" visible rather than a label, while keeping execute `not run`.
3. **Raise row text size** in the stage and saved-state panels. Rows are readable at 350 px but small; the panels have spare width for larger monospace.
4. **Clear memory together with the crash.** At 17.15 s the worker is already red `offline` while still showing `mem W7 · A`; memory clears a moment later. Making them simultaneous would make "process state is lost on crash" crisper.

## Scratch evidence

`video/human-in-the-loop/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 transition frames, full-resolution seek and select frames, the right-edge crop comparison, and the candidate spectrogram.


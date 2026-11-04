# Replication and consistency lesson 01 — Keep another copy: comparison review (render 2)

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/replication-and-consistency/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an application wired to a primary, primary and replica record cards for R42 side by side with an `=`/`≠` mark, a `replication` link, and a closing `2 copies · rev 8`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

This is a renewed review of a new encode. Render 1 (`fe774ae86de2c3fdd7eb9337be640925c5be81b31d981602b72e81b005de457d`) was marked `fix_needed` because the mark stayed `≠` for ≈ 3 s after both cards read `ready · 8`; its evidence is kept in `scratch/01/render1/`. This review is bound only to render 2.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/replication-and-consistency/motion-v2/01/video.mp4` (render 2) | `540a5cfe04c63ca54c3a1f51a3654ed3673b624416335ba640a49220a0553bda` | 33.0 s | h264 1080×1920, 30 fps, 990 frames | aac |
| public `public/lessons/replication-and-consistency/01.mp4` | `4ce425123f751a43c997807afc050d2e55a3df402f854d1e930687042d3e5312` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/01/render2/hash-before.txt`) and after (`scratch/01/render2/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** The render 1 blocker is fixed: the mark now changes from `≠` to `=` in the same frame the replica's rows become `ready · 8`. The cut teaches the mechanism clearly: the application's `R42 → ready` write reaches only the primary (`ready · rev 8`), the replica stays `draft · 7` as an `old copy` with `≠`, a `ready · rev 8` change travels along the `replication` link, the replica goes `applying` and then `copy updated` with `=`, and the cut ends on `2 copies · rev 8`. The public cut is accurate but shows the same steps as label changes in three stacked boxes with captions. Decision: `pass`, no blockers.

## Blocker check from render 1 (resolved)

- **Agreement mark versus replica values.** A per-frame colour scan of the mark region across frames 640–720 shows the amber `≠` through frame 663 and the green `=` from frame 665 (22.17 s); the replica's rows read `ready · 8` from the same frame. The only other change detected (≈ frame 712–713) is the replica highlight briefly dimming before the paired highlight of both rev rows; the mark stays `=`. Confirmed by frame-number selection of frames 645–675 every 3 frames (`render2/sel_exact.png`) and by accurate seeks at 21.5, 22.0, 22.3, 22.6 and 23.0 s (`render2/seek_mark.png`): `applying · draft 7 · ≠` at 21.5 and 22.0 s, `copy updated · ready 8 · =` from 22.3 s.

## Method

- One frame per second at 350 px wide (`scratch/01/render2/cand350/`), tiled (`c1.png`, `c13.png`, `c25.png`). The public cut's 1 fps frames and sheets from render 1's review are unchanged (`scratch/01/render1/pub350/`, `p1–p2.png`; same public hash).
- Individual native 350 px frames by accurate seek at 10.4, 18.6, 24.0 and 28.0 s (`render2/t350/`, `t350_a.png`), viewed at native size.
- Per-frame extraction of frames 640–720 with a colour scan of the mark region, a frame-number strip and an accurate-seek strip around the update (`render2/full/`).
- Whole-file decode with `-xerror`; atom order; `volumedetect` overall and per event; `silencedetect` onsets; spectrogram (`render2/cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (33.0 s).** Title `Keep another copy`, subtitle `REPLICATION`. An `application` box above `primary` and `replica` cards (`R42` status and `rev`), a replica tag (`copy` / `old copy` / `applying` / `copy updated`), an `=`/`≠` mark and a `replication` route.

| time | beat | evidence |
|---|---|---|
| 0–8 s | the primary stores data; the replica holds another copy | both cards `R42 draft · rev 7`; `=`; primary then replica highlighted |
| 8–17 s | a change is written to the primary; it has revision 8 | application `R42 → ready`; chip to the primary; primary `ready · 8` (≈ 10.2 s, loudest cue −6.9 dB); `≠`; replica `draft · 7` amber, `old copy` |
| 17–22 s | the change travels to the replica; the replica must apply it | `ready · rev 8` chip along the `replication` route (≈ 17.6–20.2 s); replica `applying` with a progress line |
| 22–33 s | the replica reaches revision 8; both copies contain the change | replica `ready · 8`, `copy updated`, and `=` together at ≈ 22.17 s; both rev rows highlighted; `2 copies · rev 8` (≈ 25 s); hold and fade |

**Public (28 s).** `APPLICATION`, `PRIMARY revision 7`, `REPLICA revision 7` stacked; a `WRITE v8` chip makes the primary `revision 8`; a `CHANGE v8` chip goes to the replica, which fills a progress line and becomes `revision 8`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the write landing only on the primary, the replica marked `old copy` with `≠`, the change travelling and being applied, and agreement returning exactly when it applies. Public shows the same order with less state. |
| accuracy | 5 | 4.5 | Candidate's mark now always matches the card values; single writer; no claims about reads or lag. Public is consistent but abstract. |
| pacing | 4.5 | 3 | Events 0.8–2.6 s apart; holds after the write and the update; ≈ 7 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Card values, mark, tags, the travelling chip and `2 copies · rev 8` read at native 350; the `REPLICATION` subtitle and `replication` route label are the smallest text. Public box text is small. |
| meaningful variety | 4.5 | 2 | Two copies of one record with an agreement mark open the chapter distinctly. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.9 dB (below −0.5 dB) | −10.5 dB |
| loudest events | primary applies r8 (10.2 s), change reaches the replica (20.2 s, −7.0 dB) | n/a |
| sound on visible events | onsets for intro pulses (1.9–4.2 s, quiet), the write (8.2–13.1 s), the change and apply (17.6–22.1 s), agreement and note (23.6–25.0 s) | sparse |
| state consistency | mark matches card values in every inspected frame | consistent |
| clipping, overlap, off-stage | none found | none found |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Raise the intro cues.** The cues introducing the primary and replica (≈ 1.9–4.2 s) peak at about −20 to −35 dB, far below the rest.
2. **Enlarge the `replication` route label.** It names the link the change travels but is among the smallest text at 350 px.
3. **Note in the write-up** that receiving and applying are separate stages in PostgreSQL (lesson 04), so this cut's single `applying` step is a simplification.

## Scratch evidence

`video/replication-and-consistency/motion-v2/reviews/scratch/01/render2/`: hash files, 1 fps 350 px frames, tiled sheets, native 350 seek frames, per-frame extraction and strips around the agreement mark, and the spectrogram. `scratch/01/render1/` holds the evidence for the superseded render 1.


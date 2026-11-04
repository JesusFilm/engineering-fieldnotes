# Cache-aside lesson 02 — A cache hit: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/cache-aside/sequence/lessons.json` item 2. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an application above a cache and a database side by side, `1 check` / `2 source` order labels, a database with unread `rev ?` rows and `source reads: 0`, a closing `current?` tag) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/cache-aside/motion-v2/02/video.mp4` | `2a6d897ebe4d164518366da8e3cecfec56f5dc308d3bf48617e76c33b929bee8` | 35.0 s | h264 1080×1920, 30 fps, 1050 frames | aac |
| public `public/lessons/cache-aside/02.mp4` | `cd3c8a7cd410b580f25ad426f970de47f8d3f4a296ff64f5bae6a65c47c843e3` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/02/hash-before.txt`) and after (`scratch/02/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the cache-aside order (`1 check` before `2 source`), a lookup that finds `runbook:api rev 1` in the cache (`HIT · key found`), the copy arriving in the application (`received a copy`), and a database whose revisions stay `rev ?` and whose `source reads` stays `0` throughout. The closing `current?` tag on the application's `rev 1`, with the database's `runbook:api rev ?` row outlined beside it, poses the lesson's question without answering it. The public cut is accurate in its captions but shows the database labelled `revision 1` from the start, which quietly implies the copy matches the source; the lesson's point is that a hit cannot establish that. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/02/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 9.8, 11.4, 17.0, 24.4 and 30.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Full-resolution seek frame at 24.4 s with text-band measurement (`full/`); card titles ≈ 34–39 px glyph bands, consistent with ≈ 40 px type.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (35.0 s).** Title `A cache hit`, subtitle `CACHE-ASIDE`. An `Application` panel (`runbook:api rev ?`, a status line); order labels `1 check` and `2 source`; a `Cache · reusable copies` card (`runbook:api rev 1`, `runbook:ops rev 4`) and a `Database · source of record` card (`runbook:api rev ?`, `runbook:ops rev ?`) side by side; `source reads: 0` under the database.

| time | beat | evidence |
|---|---|---|
| 0–7 s | a cache holds a reusable copy; the application checks it first | cache card with `runbook:api rev 1`; database card with `rev ?` rows; `source reads: 0`; `1 check` highlighted |
| 7–12 s | the requested key is present: a cache hit | `checking cache`; a `runbook:api` chip travels to the cache; `runbook:api rev 1` outlined green, `runbook:ops` dimmed; `HIT · key found` (≈ 11 s) |
| 12–19 s | the cache returns revision 1; no database read | `rev 1` chip rises (≈ 15.5–16.8 s); application `runbook:api rev 1`, `received a copy`; `2 source` and the database stay unchanged; `source reads: 0` turns green (≈ 19 s) |
| 19–35 s | a hit avoids this source read; is the copy still current? | `current?` appears beside the application's `rev 1` (≈ 23 s); the database's `runbook:api rev ?` row is outlined; hold and fade |

**Public (28 s).** `APPLICATION`, `CACHE revision 1` and `DATABASE revision 1` stacked vertically; a `READ` chip goes to the cache, which becomes `CACHE HIT`; an `r1` chip returns and the application shows `revision 1`; captions per beat, ending "A hit avoids this source read. But is the copy still current?" over an unchanged frame.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate shows the check order, the key match, and an untouched database with `source reads: 0`, so "no database read" is visible rather than stated. Public shows a hit and a return but states "no database read" in a caption. |
| accuracy | 5 | 4 | Candidate never shows the database's revision, so it makes no freshness claim; `current?` stays open. Public labels the database `revision 1` throughout, which visually confirms the copy is current, in tension with the lesson's takeaway. |
| pacing | 4.5 | 3 | Events about 1–1.5 s apart; holds after the hit and after the return; ≈ 12 s final hold on the open question, slightly long. Public's final 7 s are static. |
| legibility at 350 px | 4.5 | 3.5 | Card titles, rows, `HIT · key found`, `source reads: 0` and `current?` read at native 350; `reusable copies` / `source of record` subtitles and the two-line `rev` rows are the smallest text but readable. Public labels are small. |
| meaningful variety | 4.5 | 1.5 | Two stores side by side with an unused path suits a hit and differs from lesson 01's vertical stack. Public reuses stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.6 dB (below −0.5 dB) | −10.5 dB |
| loudest events | lookup reaches cache (9.7 s, −6.6 dB), hit (11.1 s, −7.7 dB), copy received (16.8 s) | n/a |
| sound on visible events | onsets 0.8–5.8 s (cards and order), 8.4–11.1 s (lookup, arrival, hit), 15.5–16.8 s (return, received), 19.0 s (`source reads: 0`), 24.0 s (`current?`); no database read cue | five onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; the 24–35 s stretch is the closing hold on the question | 21–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Shorten the final hold slightly.** The question holds ≈ 11 s before the fade; 6–8 s would still let it land.
2. **Put `rev` on the same line as the key in the cache and database rows.** The rows wrap as `runbook:api` / `rev 1`; a single line would read faster at 350 px if the cards can widen.
3. **Note in the write-up that authorization still applies on a hit**, as the concept's judgement says; the cut does not show it.

## Scratch evidence

`video/cache-aside/motion-v2/reviews/scratch/02/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, a full-resolution frame, and the candidate spectrogram.


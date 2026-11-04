# Load balancing lesson 01 — One request: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an `app` card with empty profile fields above, a `server` card with two work rows below, separate request and response lanes) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/01/video.mp4` | `0f9ce915d6b431d509d391acc55ca4e730398f8356120e2205bf65b4b4dcd02a` | 34.1 s | h264 1080×1920, 30 fps, 1023 frames | aac |
| public `public/lessons/load-balancing/01.mp4` | `f07b1c85301dfd26e884fdc6fed0bdf4d4f5fd7e5a9db3f03f46436f16843321` | 32.0 s | h264 1080×1920, 24 fps, 768 frames | aac |

Hashes were recorded before inspection (`scratch/01/hash-before.txt`) and after (`scratch/01/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It answers the lesson's question ("what is the server doing while the application waits?") on screen: the app shows `waiting` with empty `name` and `plan` fields while the server's two rows, `find user 42` and `build profile`, fill and tick one after the other; the response `200 OK · Maya · pro` travels up only after both are done, and only then do the app's fields fill. The public cut is a valid, honest alternative (it even labels itself "illustration · not measured timing") but explains the steps in captions over two plain boxes and a progress bar. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/01/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `p1–p2.png`). (A fourth candidate tile was not produced because the 34 s file has only 34 one-second frames.)
- Individual native 350 px frames by accurate seek at 5.6, 7.6, 12.5, 18.4, 19.4, 20.6, 21.9, 23.4, 24.4 and 26.0 s (`t350/`, `t350_a.png`, `t350_b.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (34.1 s).** Title `One request`, subtitle `ASK · WORK · ANSWER`. An `app` card (`user 42`, empty `name` and `plan` fields, a status pill) above a `server` card (status, two work rows with checkboxes and progress lines), joined by a `request` lane (down, left) and a `response` lane (up, right).

| time | beat | evidence |
|---|---|---|
| 0–5 s | meet the application and server | app pill `Load profile`; server `idle`; the two cards pulse in turn |
| 5–9 s | the application sends a request | app pill `waiting`; `GET /users/42` appears by the request lane; a dot travels down it (≈ 7–8.8 s); server ripple |
| 9–19 s | the server processes the request | server `working`; `find user 42` fills and checks (≈ 10.6–14 s), then `build profile` fills and checks (≈ 15–18.2 s), with work ticks; app stays `waiting` with empty fields |
| 19–23 s | the server sends a response | server `ready` and green; `200 OK · Maya · pro` appears by the response lane; a dot rises (≈ 20.6–22 s); server returns to `idle` |
| 23–28 s | the application receives the result | app pill `received` (loudest cue, 23.4 s), `name Maya`, `plan pro` fill in turn, pill `loaded` |
| 28–34 s | hold and fade | final state, then fade to the title |

**Public (32 s).** `APPLICATION` above `SERVER A` with a status line and a progress bar; a `GET PROFILE` chip travels down, `SERVER A` turns `WORKING` while the bar fills, a `PROFILE` chip travels up; two-line captions explain each beat (`Request = the ask.`, `The server is processing the request. The application waits for its result.`, `Ask → process → respond.`).

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate's empty fields and `waiting` pill set against two concrete work rows show what the server does while the app waits, and the fields fill only after the response lands. Public shows a progress bar and explains the same thing in captions. |
| accuracy | 4.5 | 4.5 | Both keep one app, one server, one request and avoid timing claims. Candidate's response label appears beside its lane slightly before the dot travels, a presentation choice rather than an error. Public adds an explicit "not measured timing" note. |
| pacing | 4.5 | 3.5 | Candidate's processing beat is ≈ 9 s with steady work ticks; holds of ≈ 3 s after the intro and ≈ 5 s at the end. Public is evenly paced but has a 13 s static tail. |
| legibility at 350 px | 4.5 | 4 | Candidate labels, rows and lane text read clearly at native 350. Public's box text is small and its captions do the explaining. |
| meaningful variety | 4.5 | 2 | Candidate's screen-and-work-rows view suits a single request and introduces the chapter's app/server vocabulary. Public uses the generic box layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.2 dB (below −0.5 dB) | −9.3 dB |
| loudest event | response arrives at the app, 23.4 s | n/a |
| sound on visible events | onsets 1.0–2.1 s (cards), 5.0 s (`waiting`), 7.2–8.8 s (request travels and arrives), 10.6–18.2 s (work ticks), 19.2 s (server ready), 21.8–23.4 s (response travels and arrives), 25.2–26.7 s (fields fill, `loaded`) | five onsets |
| app silent while waiting | yes: no app cue between 8.8 and 23.4 s; only server work ticks | n/a |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | 19–32 s largely static |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Reveal lane content with the travelling dot.** `GET /users/42` appears by the request lane at ≈ 5–5.6 s, before the dot moves (≈ 7–8.8 s); `200 OK · Maya · pro` appears at ≈ 19.4 s, before its dot rises. Letting the label travel with the dot, or appear on arrival, would stop a beginner reading the message as already delivered.
2. **Add the chapter context to the subtitle.** `ASK · WORK · ANSWER` is apt but omits that this is lesson 1 of the load-balancing chapter; the public cut shows `LOAD BALANCING / 1 OF 6`.
3. **Consider an "illustrative timing" note in the write-up.** The candidate shows no numbers, but the processing duration is pacing, not measurement.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/01/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.


# Idempotency lesson 04 — Retry the same key: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/idempotency/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a caller with `same key` and an attempt line, a service with `lookup k7` splitting into `found · return saved` and a dashed `new · create ticket`, a database with `tickets: 1`, and a closing `2 attempts · 1 ticket`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/idempotency/motion-v2/04/video.mp4` | `83ce76fd6a892c63056a965c60b552851dc7c1737e848d2b752bad9fe1b247ba` | 40.0 s | h264 1080×1920, 30 fps, 1200 frames | aac |
| public `public/lessons/idempotency/04.mp4` | `b9d818815d9db9b00481ff562b37fe790ec7b4d35458cd2657be26bf322278de` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the retry choosing a path: the caller reuses `key k7 · release v1` (tagged `same key`) with `attempts: 2 · retry`; the service's `lookup k7` finds `k7 → 47` in `operation keys`, reads `lookup k7 → 47`, and lights the `found · return saved` branch while the dashed `new · create ticket` branch stays dim; the `tickets` table still holds only `47 v1` with `tickets: 1`; the caller then `got ticket 47` and `knows: ticket 47`, closing on `2 attempts · 1 ticket`. The public cut is accurate but shows a `LOOKUP k7` chip and a `TICKET 47` chip between three boxes with captions; the "no second ticket" point is a caption plus the label `one ticket`. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 12.4, 19.0 and 32.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (40.0 s).** Title `Idempotency`, subtitle `RETRY THE SAME KEY`. A `Caller` card (key row, attempts line, `knows` line, state), `request` / `reply` lanes, a `Service` card with `lookup k7` and two branch boxes, and a `Database` card with `operation keys` and `tickets` and a `tickets: N` count.

| time | beat | evidence |
|---|---|---|
| 0–8 s | the caller still needs its result; it reuses the saved key k7 | caller `outcome unknown`, `attempts: 1 · reply lost`, `knows: nothing`; then `retrying`, `attempts: 2 · retry`, key row tagged `same key`; database already `k7 → 47`, `47 v1`, `tickets: 1` |
| 8–15 s | the service looks up k7; its record points to ticket 47 | `retry v1 · k7` chip down the request lane (≈ 8–9.4 s); service `looking up`; a probe reaches `operation keys` and the `k7 → 47` row is outlined (≈ 11.3 s, loudest cue −4.9 dB); `lookup k7 → 47`, service `found` |
| 15–24 s | the existing result is returned; no second ticket is created | `found · return saved` lights green (≈ 17 s); `new · create ticket` stays dashed and dim; `tickets` row `47 v1` outlined, `tickets: 1` unchanged |
| 24–30 s | the caller receives ticket 47; the effect remains one ticket | service `replied`; `ticket 47` chip up the reply lane; caller `got ticket 47`, `knows: ticket 47` (≈ 25.7 s); `2 attempts · 1 ticket` (≈ 29.8 s) |
| 30–40 s | hold and fade | final state; fade |

**Public (28 s).** `CALLER key k7`, `TICKET SERVICE`, `DATABASE k7 → ticket 47`; a `k7 + v1` chip goes down; a `LOOKUP k7` chip goes to the database; a `TICKET 47` chip goes up from the database to the caller, which shows `ticket 47`; the database label becomes `one ticket`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the key selecting a code path: `found` lights, `create` stays dark, and the ticket count does not move. Public shows the lookup and the returned ticket but states "no second ticket" in a caption. |
| accuracy | 5 | 4.5 | Candidate marks the retry as the same key and same payload, writes nothing, and counts `2 attempts · 1 ticket`. Public is accurate; it does not show that a create path exists and was skipped. |
| pacing | 4.5 | 3 | Events 0.8–1.9 s apart; holds after the lookup hit and the branch choice; ≈ 10 s final hold, slightly long. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Key row, `same key`, attempts line, `knows`, `lookup k7 → 47`, branch labels, table rows and `tickets: 1` read at native 350; the dashed `new · create ticket` is dim by design but still legible. Public box text is small. |
| meaningful variety | 4.5 | 2 | A two-branch decision inside the service is new in this chapter and suits "the retry takes the lookup path". Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −4.9 dB at the lookup hit (11.3 s), below −0.5 dB | −10.5 dB |
| loudest events | lookup hit (11.3 s), caller receives ticket 47 (25.7 s, −5.6 dB) | n/a |
| sound on visible events | onsets for the intro and retry (1.2–4.9 s), the request (8.0–9.4 s), lookup and hit (10.2–13.2 s), found branch (17.0–18.6 s), reply and receipt (24.5–27.4 s), closing line (28.5–29.8 s); no database-write cue | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | ≈ 18.6–24.5 s is a hold on the chosen branch; otherwise none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Shorten the final hold** (≈ 30–40 s) to about 6 s.
2. **Show the probe returning.** The lookup reaches `operation keys` and the service line updates to `lookup k7 → 47`, but the return of the answer is implied rather than shown as motion.
3. **Note in the write-up** that replay depends on key retention and on the service contract (for example, whether saved failures are replayed).

## Scratch evidence

`video/idempotency/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.


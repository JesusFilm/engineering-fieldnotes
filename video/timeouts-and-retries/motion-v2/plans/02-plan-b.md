# Lesson 02 plan: A timeout is not a rollback

## Mechanism

A caller reads remote CI status. Its attempt timeout expires, so the caller stops waiting. In this one illustrated run the CI job keeps working and later finishes, but the expired attempt does not accept that late answer. The caller has no response, so it records the outcome as unknown. It must not record a failed build. Stopping or undoing the remote work would need separate cancellation or rollback code, and the scene shows that code as absent.

The viewer should be able to say: "The timer ended my wait. It did nothing to the job."

## Claims the scene must not make

- All remote work always continues after a timeout. Present continuation as this run with the sparse label `this run: still running`.
- The timeout cancels, kills, or interrupts work. No packet, arrow, colour change, or sound may travel from the caller lane to the CI lane after the request.
- The timeout undoes work. The CI bar never shrinks, rewinds, or goes red.
- The late result was accepted. The late chip stops at a closed attempt marker and dims, and the caller's final state never shows `passed`.
- The build failed. Red appears only on the rejected `build: failed` guess, and the timeout itself uses amber and grey.
- Retries, backoff, deadlines across attempts, or idempotency. These belong to later lessons. Show one request and one attempt, with no second send.

## Layout: a two-lane sequence diagram

Use a 1080×1920 vertical stage drawn as a software sequence diagram, with time running downward. This replaces the usual caller-above-callee box stack. Engineers already read trace and sequence diagrams this way, and the shape makes "one side stopped while the other kept going" visible at a glance.

| Element | Position | Notes |
|---|---|---|
| Title | y≈300 | `Timeout ≠ rollback` at about 92 px. Measure the width; if it exceeds 960 px, split it across two lines. |
| Subtitle | y≈390 | `ONE CI STATUS CALL` |
| Caller header | x=270, y≈560 | `laptop` icon with label `release agent` |
| CI header | x=810, y≈560 | `rack` with 3 slots, label `CI service` |
| Lifelines | x=270 and x=810, y 640→1760 | dim dotted wires. The caller lifeline stays visible throughout because the caller keeps running and only this wait ends. |
| Request arrow | y≈700 | chip `GET status #4812` travels from left to right |
| Caller wait bar | x=270, from y=720 | vertical activation bar, amber while waiting |
| Timeout bracket | caller lane, y 720→1060 | thin tick ruler beside the wait bar labelled `attempt timeout`, with an end tick at y=1060 |
| CI work bar | x=810, from y=720 | vertical activation bar, white with an orange edge while busy, extending to y≈1320 |
| Timeout line | y=1060, caller lane only, x 120→520 | dashed grey line labelled `stopped waiting`. It must end before the centre line so it does not reach the CI lane. |
| Continuation label | CI lane, y≈1160 | `this run: still running` |
| Late response | y≈1320, from right to left | chip `passed` stops at the closed attempt marker at about x=330 |
| Caller verdict | caller lane, y≈1460 | the rejected guess `build: failed`, then the badge `outcome: unknown` |
| Missing code | y≈1620 | two dashed outline sockets, `cancel()` and `rollback()`, each with sublabel `separate code`. A dashed stub points toward the CI lane and stops at x≈540, unconnected. |

### Engine extension

Copy the pinned engine beside the scene, as required by the editorial workflow. Add one general node type, `vbar`, a vertical activation bar with animated `fill` (0–1 of `h`), `color`, `edge`, `capColor` and `alpha`. Add its half-size to `s.pt`. The ruler can reuse `bar` drawn vertically or be a small `ruler` type with `ticks`. Keep both extensions local to the cut and report them.

### Legibility at 350 px

At 350 px the stage scales to 0.324. Use at least 40 px for labels and 44 px for chips (about 13–14 px on a phone), and use the mono font for code chips. Keep labels at least 30 px clear of bars and moving chips. Keep each lane's text within its 540 px half so labels never cross the centre. There are at most six text items on screen at once.

## Sound map

Each actor has its own pitch and stereo side. Caller sounds pan left (≈-0.5) on E. CI sounds pan right (≈+0.5) on C.

| Actor or event | Preset | Pitch and level | Purpose |
|---|---|---|---|
| Caller sends the request | `send` | E6, quiet | departure |
| Request lands at CI | `arrive` | C5 | the job starts |
| Caller waiting | `clock` | E6 short tick every 1.0 s, gain about 0.35 | the left side's audible wait |
| CI working | `work` | low C (C3) every 0.5 s, offset 0.25 s from the clock, gain about 0.4 | the right side's audible work, unbroken across the timeout |
| CI step advances | `arrive` | E5, then G5, quiet | slot 1 and slot 2 start |
| Timeout fires | custom `latch` via `s.sound` | 15 ms high-passed noise click plus a sine E4 falling to D#4 over 120 ms, no echo | the loudest cue but softer in character than `crash`, marking a stop rather than a breakage |
| CI finishes | `store` | C5 | the remote work completes |
| Late chip leaves CI | `send` | C6, quiet | departure |
| Late chip reaches the closed attempt | `thump` | low gain, short, no echo, panned left | deliberately no `arrive` note, unlike the first arrival |
| Rejected `build: failed` guess | `thump` | lower and dull | the wrong conclusion is rejected |
| `outcome: unknown` appears | custom `unresolved` | E5 then F#5, triangle-free sine mallet, slight echo, unresolved | the open question, avoiding `chime`, `hit` and `miss` |
| `cancel()` and `rollback()` sockets | custom `hollow` | soft low woodblock, two taps 0.7 s apart | absent code, with no confirmation tone |

The key audio moment is at 9.5 s. The left clock ticks stop and the latch sounds, while the right work ticks continue on schedule. A listener should hear one side stop and the other keep going. Check that the mix peaks below -1 dB and that the work ticks stay audible after the latch.

## Beat sheet

Author at speed 1 with a total of about 36 s. Set `meta.speed` 0.9 for a playback length of about 40 s.

| Time | Motion | State change | Sound |
|---|---|---|---|
| 0.0–1.4 | Headers and lifelines fade in, then hold | idle stage | none |
| 1.5–2.3 | `GET status #4812` chip runs along y≈700 | the request is in flight | `send` E6 left |
| 2.3 | ripple at the CI header | rack slot 0 busy | `arrive` C5 right |
| 2.5–9.5 | both vertical bars grow downward together; the caller bar fills toward the bracket end tick | caller amber and waiting; CI busy | caller `clock` each 1 s; CI `work` each 0.5 s |
| 5.5 | CI slot 1 lights | the job advances | `arrive` E5 quiet |
| 9.5 | the caller bar hits the end tick, gets a flat cap, turns grey and jolts 6 px; the dashed `stopped waiting` line draws across the caller lane in 0.4 s; the caller icon dims to 60% | the caller wait has ended | `latch`; the clock stops |
| 9.5–12.0 | hold; only the CI bar keeps growing below the line | contrast: wait ended, work did not | CI `work` continues |
| 12.0 | brief white pulse on the CI bar below the timeout line, then `this run: still running` fades in | this run continues | none extra |
| 13.5 | CI slot 2 lights | the job advances | `arrive` G5 quiet |
| 13.5–16.0 | the CI bar keeps growing | continuation | `work` |
| 16.0 | the CI bar tip turns teal and the slots turn done; `work` ticks stop | the remote work finished in this run | `store` C5 right |
| 17.0–18.0 | the `passed` chip travels left at y≈1320 | a late answer exists | `send` C6 right |
| 18.0 | a small grey closed marker (a short horizontal end cap labelled `attempt closed`) appears on the caller lifeline; the chip stops 20 px short of it and dims to 30% | the expired attempt does not take the result | `thump` low, left |
| 18.0–20.0 | hold | no acceptance | silence |
| 20.5 | a dashed red outline chip `build: failed` pops at y≈1460 | the tempting wrong verdict | none |
| 21.2 | the guess jolts, gets a red × ripple and fades out by 21.8 | the guess is rejected | dull `thump` |
| 22.5 | the amber badge `outcome: unknown` pops with overshoot at the same spot | the correct verdict | `unresolved` E5→F#5 |
| 22.5–25.5 | hold | the verdict lands | silence |
| 26.0 | the `cancel()` socket draws as a dashed outline with its stub ending at the centre line | cancel needs its own code | `hollow` |
| 26.7 | the `rollback()` socket draws the same way | rollback needs its own code | `hollow` |
| 26.7–33.0 | long hold on the complete diagram; the CI bar stays teal and full | final state | silence |
| 33.0–33.8 | `s.fade` to black | finite ending | none |
| 33.8–36.0 | black tail | — | none |

Through the whole scene, the late `passed` chip and the CI bar never change the caller verdict, nothing travels from caller to CI after 2.3 s, and red appears only on the rejected guess.

## Pacing rules

Events stay at least 0.7 s apart, and each lesson point gets a hold of 2–3 s: after the timeout, the late chip, the verdict, and the sockets. The longest still stretch is the final hold (about 6 s), which is intended. During the 2.5–9.5 wait the bars grow and the ticks continue, so nothing is frozen. If the wait feels slack, shorten the bracket to end at 8.5 and shift every later beat by -1 s.

## Lesson text alignment

The current lesson item has beats at 0, 7, 14 and 21 s for a 28 s cut. This plan moves the corresponding moments to about 2, 9.5, 12–18 and 20.5–23 s of authored time (×1/0.9 at playback). The coordinator should update the lesson `duration` and beat `time` values to match the final encode. The beat text does not need to change, apart from optionally adding that cancellation and rollback must be implemented separately, which the intro and takeaway already state.

## Production and verification

1. Write the scene and its local engine copy in the assigned `motion-v2/02` variant folder. Before rendering, use the Node timing dry run to confirm the cue list: one `send` from the caller only, a `latch` at 9.5, `work` cues continuing past 9.5, and no caller-to-CI cue after 2.3.
2. Render stills at 1.8, 6, 9.7, 12.5, 18.3, 21.0, 23.5 and 28 s, then view them as one row and each at full size. Downscale each to 350 px wide and confirm that every label is readable and no text overlaps.
3. Render the MP4 with a contact sheet. Generate a spectrogram and confirm the left clock stops at the latch while the right work ticks continue. Check `volumedetect` (max below -1 dB), `ffprobe` duration, the audio stream and faststart metadata, and decode the whole file.
4. Run the skill's defect pass and improvement review. Record whether audio was listened to or only analysed.
5. Check the copy for over-claiming. The words `cancelled`, `rolled back`, `retry` and `failed` may appear only in the rejected guess and the socket labels.

## Known limitations

The scene shows one possible outcome. In other systems the server may notice a cancelled context and stop, the job may fail, or a late response may be logged for reconciliation. The scene does not claim that any of these never happen; it claims only that the caller's timeout by itself guarantees none of them. The bracket length and the illustrative build ID are teaching values. A sequence diagram assumes viewers can read time running downward; the parallel bar growth from 2.5 to 9.5 s teaches that convention before the timeout depends on it.

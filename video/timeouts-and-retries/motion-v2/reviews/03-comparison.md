# Lesson 03 "Retry only when safe": encoded comparison

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). I read only AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review guide and item 3 of `video/timeouts-and-retries/sequence/lessons.json` before inspecting the media. I read no author source, self-review, plan, ledger or prior review.

| | Candidate (motion-v2) | Original (published) |
|---|---|---|
| File | `video/timeouts-and-retries/motion-v2/03/video.mp4` | `public/lessons/timeouts-and-retries/03.mp4` |
| SHA256 (before = after) | `87bae9e0ecc9ba095cddeaedee3dcac3be9077f689dbc13584d535f79d67f226` | `dcc1a557990be3d25291ddeacd973bace50612c398bf1b2dd8d0cb85a94c2b41` |
| Stream | 1080x1920 h264 yuv420p, 30 fps, 1128 frames, AAC 44.1 kHz stereo | 1080x1920 h264 yuv420p, 20 fps, 560 frames, AAC 44.1 kHz stereo |
| Duration | 37.6 s | 28.0 s |
| Full decode | clean, no errors | clean, no errors |
| Fast start | moov at byte 36, before mdat | moov at byte 36, before mdat |
| Audio | max -7.3 dB, mean -32.9 dB | max -10.2 dB, mean -40.7 dB |
| Captions burned in | none | the four beat sentences |

**Recommendation: the candidate.** Its decision status is **pass**, with no reproducible objective faults. The original also has no false claims. However, it fails the review guide's rule that something should change at least every 3 s, and it never shows the timeout or the contract check, so it relies entirely on its captions.

## Method

I selected frames by exact frame index (`select=eq(n,N)`) rather than time seeking. I inspected individual frames at native 1080x1920 and at 350 px wide (Lanczos) for every beat, boundary and transition. I also built a 1 fps overview sheet of each video for orientation only.

Motion was measured as changed pixels per frame at 270x480. The lower stage was measured across both candidate panel swaps. I mapped audio onsets from a 50 ms RMS envelope and spectrograms. **The audio was analysed only, not heard.** Scratch material is under `reviews/scratch/03/`.

## Beat by beat

| Lesson beat | Candidate (frame / time) | Original (frame / time) |
|---|---|---|
| 1. First status read timed out; another attempt may obtain the result | The chip "Build 42?" leaves on the request line (n40, 1.33 s, with a sound at 1.2 s) and reaches the CI service (n69, 2.30 s; sound 2.0 s). The CI service already shows "Build 42 passed" and an orange request #1 that is still running. The "wait ≤ 5 s" bar fills with quiet ticks at 3.2, 4.2 and 5.2 s (n150, 5.00 s). It turns orange (n175, 5.83 s), then reads "timed out" with status "?" (n200, 6.67 s; loudest cue at 6.2 s). | Caller "status unknown" and the remote service box are static from 0 to 6.95 s (n0, n125, n139 are identical apart from a slight fade). No request or timeout is shown, and the beat is silent. |
| 2. Check whether repetition is safe; this operation only reads CI status | "#2 retry ?" appears dimmed (n240, 8.00 s; sound 7.4 s). The "contract" control lights (n295, 9.83 s; 9.6 s). An "example contract" card opens (n310, 10.33 s; 10.15 s). Read status is matched to request #1 (n345, 11.50 s; 11.0 s), then shows "changes build: no" (n375 / n400, 12.5–13.3 s; 12.2 s) and "retry after timeout: yes" (n440, 14.67 s; 13.4 s), while "retry ok" turns green (n500, 16.67 s; 14.6 s). A dimmed Start build row waits below. | The caller label changes to "safe read" with a green border (n141, 7.05 s; sound 7.0 s). Nothing else changes until 13.95 s (n265). The safety claim is stated without a visible contract. |
| 3. Send a second bounded attempt; it is the same question, asked again | The card fades out (n510–n519, 17.0–17.3 s; 17.0 s), and the CI service returns by n533 (17.8 s). Row #2 becomes the identical boxed request "Read status · Build 42" marked "same question" (n570, 19.0 s; 18.05 s). It gets its own "wait ≤ 5 s" bound and reaches the service (n615, 20.5 s; loud cue 20.4 s), where a #2 badge appears beside the unresolved #1 (n640, 21.33 s; 21.6–21.9 s). | The chip "READ STATUS" travels down (n282, 14.10 s; sound 14.0 s, and n300, 15.0 s). The service turns orange as "attempt 2" (n325, 16.25 s; 16.0 s), then holds still until 20.95 s (n405). |
| 4. Use the response if it arrives; a write would need its own contract | The green chip "passed" returns on the separate response line (n662, 22.07 s; loud cue 22.7 s). Row #2 shows "received" inside its bound (n690, 23.0 s), and status becomes "passed" (n705 / n760, 23.5–25.3 s; 23.5 s), with #1 still unresolved. The contract card returns (n800–n820, 26.7–27.3 s; 26.7 s). Start build is highlighted orange and shows "changes build: yes" (n850, 28.33 s; 28.8 s) and "retry after timeout: ?" (n885, 29.5 s). An "idempotency key" chip appears (n915, 30.5 s; 30.2 s), followed by "key helps only if service supports it" (n945, 31.5 s; 31.2 s). The resolved read state returns from 34.0 s (n1022–n1043; 34.0 / 35.0 s) and fades to the title by n1127 (37.57 s). | An orange chip "BUILD PASSED" returns (n425, 21.25 s; sound 21.0 s, and n445, 22.25 s). The caller shows "status known" (n470, 23.5 s; 23.0 s), then holds to the end (n559, 27.95 s). The write appears only in the caption. |

## Objective checks (review guide, Pass 1)

**Candidate: no faults found.**

- **Legibility:** the smallest native text is the "CI STATUS READ" subtitle, about 26 px tall. The CI service badges and the idempotency note are about 28–36 px. Nothing is clipped, and no label overlaps another or the title band.
- **Transitions:** the lower stage empties only during deliberate 0.17 s crossfades. Its brightness falls to the floor for frames 519–523 (17.30–17.43 s) and 1029–1033 (34.30–34.43 s). The neighbouring frames confirm a smooth fade on each side, with no single-frame glitch.
- **Stillness:** the longest run with no change is 31.53–33.30 s (1.8 s). It is a hold after the idempotency note lands.
- **Audio:** every onset matches a visible event, and every main event has a cue. The peak is -7.3 dB, so nothing clips.
- **Lingering state:** request #1 stays as an unresolved orange spinner at the service. This is deliberate and correct, because the timeout does not prove the remote side did nothing.

**Original: one fault, reproduced.**

- **Stillness:** frames are unchanged from 1.05 to 6.90 s (5.9 s), 7.25 to 12.45 s (5.2 s) and 16.65 to 20.95 s (4.3 s). I confirmed this on exact frames n0, n125 and n139, n141 and n265, and n325 and n405. Each span is longer than the guide's limit of about 3 s and comes before its beat has landed. The first beat's timeout is also never shown and has no sound.

## Scope and accuracy

| Requirement | Candidate | Original |
|---|---|---|
| The timeout does not prove no remote action | Yes. #1 stays running at the service after "timed out" and after #2 succeeds. | Not shown. The service is idle during the timeout beat. |
| Retry safety comes from a documented contract | Yes, from an "example contract" card with explicit rows. | Asserted with a "safe read" label only. |
| The second attempt is bounded and asks the same question | Yes. The request text is identical, marked "same question", and has its own "wait ≤ 5 s" bound. | "attempt 2", with the bound given only in the caption. |
| Use the response if it arrives | Yes. It reads "received", then status "passed". | Yes, with "status known". |
| An effectful write needs its own contract | Yes. Start build shows "changes build: yes" and "retry after timeout: ?". | Caption only. |
| An idempotency key helps only if the service implements it | Yes, with "key helps only if service supports it". | Not covered. |
| Avoids implying all errors justify retry, or that all reads are always safe | Yes. The scenario is a timeout, and the contract is labelled as an example. | Yes. |
| Avoids implying retry always succeeds | Mostly. The success is not generalised, but no visible "if received" condition is shown. | The caption says "if it arrives". |
| No backoff, jitter or overall deadline; no paragraphs or metaphors | Yes. | Yes. |
| No long padding at the end | Yes. About 3 s back on the resolved state, then a 0.5 s fade. | 4.4 s static end hold. |

## Scores (reviewer judgements, 1–5; these do not measure learning)

| | Causal clarity | Accuracy | Pacing | Visual legibility |
|---|---|---|---|---|
| Candidate | 4.5 | 4.5 | 4 | 4 |
| Original | 2 | 3.5 | 1.5 | 4.5 |

Accuracy is scored separately from factual verification. Neither video was checked against external sources here; the scores judge the claims each video makes against the brief.

## Concrete advantages and disadvantages

**Candidate advantages**

- The timeout is shown as a filling bound that turns orange, and the request it cut off stays visibly unresolved (1.3–6.7 s).
- The safety decision is visibly sourced from contract rows (10.3–16.7 s).
- "Same question" is shown by an identical request string (19.0 s).
- The write contrast and the key's limit are on screen (28.3–31.5 s).
- Sound tracks each state change.

**Candidate disadvantages**

- At 37.6 s it runs 34% longer than the 28 s lesson metadata, and its beat times differ from the lesson's 0/7/14/21 s.
- The screen is dense at 350 px. The note "key helps only if service supports it" and the #1/#2 badges are the smallest readable text.
- The timeout cue (-15.6 dB at 6.2 s) is barely louder than the arrival at 20.4 s, the response at 22.7 s and "changes build: yes" at 28.8 s (all about -16 dB).
- From 7.4 to 9.6 s, only the pending "retry ?" and the #1 spinner move.

**Original advantages**

- It is the simplest frame, with large, highly legible captions at 350 px.
- It fits the 28 s metadata exactly.
- Its claims are carefully worded.

**Original disadvantages**

- It is static for most of its length.
- The timeout, contract and write are never visualised.
- The response chip is the same orange as the request chip, which weakens the request/response distinction (21.25 s).

## Optional improvements to the candidate (none block it)

1. **Make the timeout the clear sound peak** (6.2 s, S): it is currently tied with the 20.4, 22.7 and 28.8 s cues. Lowering those by about 3 dB would let the disruption stand out.
2. **Enlarge the fine print for phone width** (21–37 s and 31.5 s, S): enlarge the CI service #1/#2 badges and the idempotency note so they read comfortably at 350 px.
3. **Tighten the "retry ?" wait** (7.4–9.6 s, S): pulse "contract" sooner, or trim about 1 s.
4. **Signal that the response is conditional** (20.5–23.0 s, S): keep #2's bound marker visibly armed until "received", so arrival reads as a condition met rather than a guarantee.
5. **Trim the closing return** (34.0–37.6 s, S): it repeats the 23.5–26.5 s state, so about 1 s could go.
6. **Retime the lesson metadata if adopted** (manifest, coordinator): the duration and beat times in `lessons.json` (28 s; 0/7/14/21 s) do not match this cut. The candidate's beats land near 0, 7.4, 18 and 22.7 s, with the write contrast at about 27–34 s. This is an integration step for the coordinator, not a fault in the video.


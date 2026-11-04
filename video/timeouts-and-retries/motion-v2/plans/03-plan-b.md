# Lesson 03 — Retry only when safe: motion plan B

## Mechanism

A caller's first CI status read times out. Before sending another attempt, the caller checks the operation's documented contract. This contract says the operation only reads status and permits a retry after a timeout. The caller sends a second bounded attempt asking exactly the same question and uses the response that arrives within that attempt's timeout. A closing contrast shows a write row in the same contract, where the decision depends on that operation's own retry contract. The viewer should come away with one rule: the contract decides whether to retry, and the fact that an attempt failed does not.

Claims the cut must not make, checked at every beat:

- A timeout does not justify every retry. The contract row names the specific failure it covers ("timeout"), and no other error type appears.
- A retry is not guaranteed to succeed. Attempt 2 has its own visible timeout bar with an end tick, and the response lands partway along it. This shows success happened within the bound on this run.
- A timeout does not show that nothing happened remotely. The attempt 1 work indicator at the service stays faintly visible as "#1 ?" and is never cleared, cancelled or rolled back on screen. This carries forward lesson 2.
- Some reads are not safe to retry. The cut presents this read as safe because its contract says so, and the contract card is the visible source of the decision.
- An idempotency key is not shown on screen. The lesson takeaway text handles it, with its condition. Without room for "only when the service implements it", a key icon would over-claim.
- Backoff waits, jitter, attempt-count budgets, overall deadlines and attempt-history policy are left for later lessons. Attempt 2 starts after the contract check lands. A short pause for reading is not drawn as a delay or timer.

## Actors and layout (1080×1920, software-native)

The layout is a developer-tool screen with three regions: the request path on the left, an API contract card on the right and a trace log along the bottom. There are no physical metaphors (doors, locks, traffic lights) and no row of three identical boxes.

| Actor | Node / form | Position | Notes |
|---|---|---|---|
| Title band | title "Retry only when safe", subtitle "CHECK THE CONTRACT" | y 250–420 | unchanged |
| Caller: release assistant | 'box' 380×130, label "release assistant" | x 260, y 620 | left column |
| Attempt timer | 'bar' w 360 h 18, 'ticks' at end, label "attempt 1" → "attempt 2" | x 260, y 760 | reuses lesson 2's timeout bar grammar so the viewer recognises it |
| CI status API | 'box' with a 'busy'-style spinner, label "CI status API", sublabel slot | x 260, y 1260 | wire runs straight down x 260 from 700 to 1190 |
| Contract card (API docs) | 'store' with 2 rows, w 480, header label "API contract" | x 780, y 880–1120 | row 0 "GET status" / field "read · retry on timeout"; row 1 "POST release" / field "write · own contract". Row 1 rests at 30% alpha until the final beat |
| Trace log | 'store' with 2 rows, w 900, header "trace" | x 540, y 1520–1680 | row texts: "#1 GET status  timed out", "#2 GET status  passed" |

Wires: caller.bottom → API.top (dotted). A short dotted lookup wire runs caller.right → card.left at y≈880 and is shown only in beat 2.

Legibility at 350px wide (scale ≈0.32): keep the 1080-wide minimum at **40px** for labels and fields, **44–48px bold mono** for chips, and 96–104px for the title. These sizes come out at about 13–15px on a 350px phone preview. Keep the chip text to "GET status", "timed out", "passed", "POST release" and "not sent". If a contract field cannot fit at 40px inside 480px, shorten it to "read · retry ok" instead of reducing the type size. No on-screen phrase should run past five words.

## Beat sheet (authored at speed 1)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Stage fades in: caller, empty attempt bar labelled "attempt 1", API idle, contract card collapsed to its header, empty trace | — | none (silence before the first event) |
| 1.2 | Chip "GET status" leaves caller down the wire (0.6 s) | caller glows white; timer bar starts filling linearly | 'send' C6, caller pan, low gain |
| 1.8 | Chip arrives at API | API spinner busy; sublabel "#1" | 'arrive' G4 (API pitch) |
| 2.0–6.0 | Timer bar fills toward its end tick; no response travels | bar colour mid → accent amber over the last 1.5 s | 'clock' ticks every 0.5 s, quiet, panned to caller |
| 6.0 | Bar reaches end tick | caller jolts ~8 px; badge "timed out" (amber) pops beside caller; wire turns dashed; API sublabel becomes "#1 ?" at 50% alpha, spinner keeps turning slowly | 'thump' low (≈110 Hz) layered with a short muted 'miss' buzz; no crash sound, because nothing broke |
| 6.4 | Trace row 0 writes "#1 GET status  timed out" in amber | row fill | 'store' soft, trace pan |
| 6.6–8.6 | **Hold.** Only the faint "#1 ?" spinner moves | — | none |
| 8.8 | Lookup wire appears; a ghost copy of "GET status" slides caller → contract card | card expands to two rows; row 1 dim | 'send' E6 (contract pitch family), very quiet |
| 9.6 | Ghost chip docks on row 0 "GET status" | row 0 outline white, pulse | 'arrive' E5 (contract pitch) |
| 10.4 | Field "read" lights teal | — | 'ack' E5 |
| 11.2 | Field "retry on timeout" lights teal; check ripple on row 0 | — | 'chime' E5→G5, small |
| 11.4–13.6 | **Hold.** Row 0 lit; row 1 visibly dim; trace row 0 amber; "#1 ?" faint | — | none |
| 13.8 | Lookup wire and "timed out" badge fade; timer bar resets to empty (0.3 s); label "attempt 1" → "attempt 2" with a pulse; wire returns to dotted | fresh per-attempt bound | short 'recover' sweep at low gain (reset) |
| 14.6 | Trace row 1 writes "#2 GET status" directly under row 0, so the identical request text aligns vertically | — | 'store' soft |
| 15.2 | Chip "GET status" leaves caller (same text, colour and route as 1.2) | bar starts filling | 'send' C6, same pitch and gain as attempt 1, so the same question sounds the same |
| 15.8 | Chip arrives at API | API sublabel "#2" appears beside the still-faint "#1 ?" | 'arrive' G4, identical to attempt 1 |
| 16.0–18.2 | Bar fills to ~55%; clock ticks as in beat 1 | — | 'clock' ticks |
| 18.2 | API "#2" turns teal (done); chip "passed" (teal) travels API → caller (0.6 s) | — | 'work' tick at API, then 'send' G5 from API |
| 18.8 | Chip lands at caller | caller glows teal; bar freezes at ~55% and turns teal, with its end tick still visible ahead; trace row 1 appends "passed" in teal | 'deliver' high (fast, good outcome) + 'chime' C5–G5 |
| 19.0–21.5 | **Hold** on the resolved read: two aligned trace rows, one amber and one teal; frozen bar short of its end | — | none |
| 21.8 | Read path dims to 30% (caller wire, API, timer bar); contract row 0 dims | focus moves to card | soft low swell defined with 's.sound', low gain |
| 22.6 | Contract row 1 "POST release" rises to full alpha with an amber outline | — | 'arrive' A3 (new low pitch for the write row) |
| 23.4 | Field "write" lights amber | — | 'ack' A3 |
| 24.2 | Field "own contract" lights amber; small amber ripple on row 1, no check mark | — | two-note falling mallet A3→F3, mid gain |
| 24.6 | Ghost chip "POST release" appears at caller.right in amber outline and stays where it is | badge "not sent" (amber) under the ghost chip | no 'send' sound, because nothing leaves; one quiet 'thump' at 30% gain on the badge |
| 25.0–28.0 | **Hold** on the contrast: read row teal with check, write row amber with no decision shown; "#1 ?" still faintly present on the dim API | — | none |
| 28.0–28.8 | 's.fade' to black | — | none |

At speed 1 this runs to about 29 s. Set 'meta.speed' to about 0.7 for a playback length of about 41 s. If 0.7 makes the packets feel sluggish, use 0.8 and lengthen each hold by 0.5 s. Do not add a beat. The finite ending fades to black and does not need to loop back to the opening state.

## Sound map (actor-specific)

| Actor / event | Preset | Pitch | Pan |
|---|---|---|---|
| Caller sends | 'send' | C6 (identical on both attempts) | caller x 260 |
| API receives / finishes | 'arrive' / 'work' | G4 | API x 260 |
| Response reaches caller | 'deliver' + 'chime' | high, C5–G5 | caller |
| Waiting | 'clock' | default, quiet | caller |
| Timeout expiry | 'thump' + muted 'miss' | ≈110 Hz | caller |
| Contract card lookup and fields | 'send' / 'arrive' / 'ack' / 'chime' | E5 family | card x 780 |
| Write row (contrast) | 'arrive' / 'ack' / two-note fall | A3, A3→F3 | card |
| Trace writes | 'store' | soft, default | trace x 540 |

Keep the mix sparse, with one sound per event. The timeout thump is the loudest event; peak at or below −1 dBFS and confirm with volumedetect. The repeated attempt must sound identical to the first in send and arrive pitch, because hearing the same question again is part of the lesson.

## Pitfalls to watch in review

- Clutter at 350px: the caller column, card and trace together could read as a dashboard. Check one still per beat at 350px. If the card's field text blurs, shorten fields before shrinking the type.
- Stale state: the "timed out" badge must be gone before attempt 2 sends. "#1 ?" must stay on purpose and faint, and it must not turn red or vanish.
- Focus: in beat 2 the timer bar and API sit still, so the only motion is the card. In the write contrast, the read path stays dim.
- The "not sent" ghost should read as the caller holding off and must not read as an error. Use amber, never red.
- Leave out attempt counters such as "2/3", drawn wait intervals and overall budget bars, since these belong to lessons 4–5.

## Production and verification

The production agent writes the scene source under 'video/timeouts-and-retries/motion-v2/03/<variant>/', copies engine scripts beside it only if an extension is needed (the existing 'box', 'bar', 'store', 'badge' and chip packets should cover this), and records the exact relative render command. Verification follows the editorial workflow: stills at 1.5, 7, 11.5, 19.5 and 26 s (speed-1 times) at full size and at 350px; the contact sheet; a full decode; a spectrogram showing a sound on every beat; volumedetect; and ffprobe for duration, the audio stream and faststart metadata. Note whether the audio was heard or only analysed. A comparative review against the other lesson 3 variants is needed before any recommendation.

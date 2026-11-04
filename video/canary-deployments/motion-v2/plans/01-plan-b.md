# Canary deployments — lesson 01 "Keep a control version" — motion plan B

## One mechanism

Version 1 keeps serving as the **control** while version 2, the **candidate**, receives a limited share of traffic. Both versions are measured over the same window with the same metric. A rule written **before** the rollout turns that comparison into one of three decisions: promote, pause or abort. A timer that only lets traffic grow slowly is shown once and then rejected because it never consults the evidence.

Out of scope for this lesson: automatic rollback, analysis tooling (Argo and similar), header or cohort routing, rollback safety, pooled versus per-operation error rates in depth, and multi-step weight schedules. The candidate is never shown as guaranteed healthy, and the traffic share is never presented as a fixed or recommended percentage.

## Stage (1080×1920, varied from the stock top-to-bottom request tree)

| Zone | y | Content |
|---|---|---|
| Title | 250–420 | "Canary deployments" / subtitle KEEP A CONTROL |
| Traffic | ≈560 | three `phone` callers at x 270 / 540 / 810, no labels |
| Router + share | ≈760 | `box` "router" with 2 ports; a 2-segment `bar` (w 640, h 22) at y≈860 showing the share. Grey segment = v1, orange segment = v2 |
| Versions | ≈1090 | two columns. Left `rack` at x 300 labelled "v1"; right `rack` at x 780 labelled "v2". Role labels below each ("control" teal-grey, "candidate" orange) |
| Scorecards | ≈1330 | one `store` (2 rows) under each rack: row 0 "requests", row 1 "errors". The rows sit at identical positions so the eye compares across |
| Gate | ≈1600 | wide `box` "decision rule" with three stacked rows: PROMOTE / PAUSE / ABORT, each a short condition. Above it, a thin `bar` with `ticks` acts as the observation window |
| Footnote | ≈1780 | small persistent chip "illustrative values" (left aligned, dim) |

v1 owns grey/white (`#8B9099` / `#E6E8EC`) and v2 owns accent orange (`#F5A524`) on rack, wire, packets, bar segment and scorecard. Green and red are reserved for gate outcomes and never colour a version, so the video does not imply that one version is "good".

## 350px legibility budget

At 350 px wide one design pixel is 0.324 px, so the skill's 24 px floor gives about 8 px on the phone, which is unreadable. Minimums for this cut: node labels 48 px, role labels 44 px, scorecard numbers 60 px mono bold, gate row text 42 px mono, footnote 34 px. Each gate condition must fit one line at 42 px within a 900 px box, which caps it at roughly 26 characters:

- PROMOTE  gap ≤ 5 pts
- PAUSE    v2 < 100 req
- ABORT    gap > 5 pts

"gap" means the v2 error rate minus the v1 error rate. Spell this out once on the card header in 34 px: "gap = v2 err% − v1 err%". Two words at most on any packet chip. During the busiest moment the screen holds two numbers per scorecard, one share bar and the gate, and nothing else.

## Beat sheet (speed 1, total ≈44 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–4.0 | Six envelopes, phones → router → v1, every 0.6 s | v1 slots go busy → done; v2 absent; share bar fully grey | send C6 quiet on leave; arrive C5 at v1 |
| 4.0–5.5 hold | — | v1 label gains role "control" (pulse) | single soft chime C5 + E5 |
| 5.5–8.0 | v2 rack fades in dim and then to full; wire router.port1 → v2 draws in | role "candidate" under v2; scorecards appear empty ("–") | `store` thud on v2 appearance, panned right |
| 8.0–9.5 hold | — | — | silence |
| 9.5–15.5 | Share bar tweens: a small orange segment grows. Then a denser stream of 12 packets at 0.45 s spacing (travel 0.4 s); 2 go to v2 (5th and 11th) | the router pointer slides to port1 for the v2 packets; the orange segment carries the chip "small share" (no number) | v1 arrivals C5 at gain 0.35; v2 arrivals G5 at full gain, so the minority stands out |
| 15.5–17.0 hold | — | — | — |
| 17.0–21.0 contrast | "timer only": a clock fades in beside the share bar, hands spin, and the orange segment steps wider twice. Each step is stamped with a dim chip "evidence?" | the scorecards stay "–"; nothing reads them | `clock` ticks; each widening plays a flat, unresolved two-note blip with no chime |
| 21.0–22.5 | The clock and the "evidence?" chips get a red ripple ×; the share bar tweens back to the small share; the clock fades | the contrast is dismissed | `thump` (single, low) |
| 22.5–26.0 | The gate box rises in from below; its three rows type in one at a time, 0.7 s apart; header "set before rollout" | rows rest dim grey | `store` tick per row, rising pitch C5 → E5 → G5 |
| 26.0–27.0 hold | — | — | — |
| 27.0–31.5 window 1 | The observation-window bar fills (ticked ends). Traffic continues at low visual density. Chips "same window" and "same metric" sit over both scorecards at once | scorecards count up live: v1 requests 0 → 360, errors 0; v2 requests 0 → 40, errors 0 | `work` ticks every 0.25 s while the window fills; on close, a short double `ack` |
| 31.5–34.0 | The gate reads both cards: a dotted line from each scorecard to the gate. The PAUSE row lights orange; its "v2 < 100 req" cell pulses; v2's "40" pulses in sync | the share bar does not grow. Chip near the bar: "hold share" | a suspended two-note mallet (E5 → A5, no resolution) |
| 34.0–35.5 hold | the "0 errors" on v2 stays visible beside PAUSE; the lesson is that zero errors on 40 requests is not a pass | — | — |
| 35.5–40.0 window 2 | The window bar clears and refills; counts continue: v1 → 900 requests, 6 errors; v2 → 100 requests, 9 errors. Each new v2 error makes a small red tick on v2's error row only (2–3 visible) | at the window close, rates appear in 60 px: v1 "0.7%", v2 "9%" | v2 error ticks as quiet `thump` panned right; the window close plays `ack` |
| 40.0–42.0 | Gate check: PAUSE dims (100 met); the ABORT row lights red, with ripple ×. A chip under the gate reads "stop expansion · investigate" | the share bar's orange segment greys and stays at its small width; v1 stays fully lit | the loudest moment: `crash`-lite layering (noise burst + falling sweep, no sub thump) |
| 42.0–44.5 hold | final frame: v1 control serving, v2 greyed at its small share, ABORT lit, PROMOTE and PAUSE visible but dim | — | silence, then `s.fade` 44.5–45.2 |

The finite ending is deliberate: the fade keeps a loop clean without pretending the story returns to its start.

## Honesty constraints carried into the frames

- **Comparable outcomes:** both scorecards always show the same row labels, the same window and the same metric at the same moment. Rates appear only beside their denominators ("9 / 100"), never alone.
- **No causal or statistical claim:** the abort chip says "stop expansion · investigate". It never says "v2 caused errors" or "significant". The gate fires because a pre-set rule was met; the frames make no claim about why.
- **Tiny samples:** window 1 demonstrates that an empty-looking result on 40 requests pauses instead of promoting. The 100-request minimum and 5-point gap are training parameters only; the "illustrative values" footnote stays on screen whenever numbers are visible.
- **No automatic rollback:** the abort result stops the share from growing and greys the candidate. No packet visibly reroutes on its own, and no "rollback" label appears.
- **No guaranteed healthy candidate or fixed share:** the share has no number on screen; the candidate is visibly allowed to fail.

## Sound map summary

v1 = C5 (arrive) / C6 (send), always quieter. v2 = G5, full gain, so the minority share is audible. Router = no note of its own; the pointer move is silent. Gate rows typing in = C5/E5/G5 ticks. PAUSE = suspended E5→A5. ABORT = loudest event, layered noise with a falling sweep. The timer contrast uses `clock` and unresolved blips, then one `thump`. Pan every cue with `s.panOf`. Check that the v1 arrival gain stays audible under the 12-packet stream and that `max_volume` stays below −1 dB.

## Pacing notes

Event spacing is 0.45–0.8 s. Holds of 1.5–2.5 s fall after the role labels, after the share appears, after PAUSE and at the end. No beat exceeds 3 s without change apart from those holds. The timer contrast is kept to about 5.5 s so it reads as an aside. If the total exceeds 50 s, shorten the first v1-only stretch to 4 packets before cutting any hold.

## Build and verify

The scene goes to `video/canary-deployments/motion-v2/01/`, with the engine copied from the repository's pinned renderer per the editorial workflow. New drawing helpers (a multi-row gate card, if `box` sublabels cannot hold three rows) stay local to the cut and are named for their shape (`card`), not the topic. Verify with stills at 2, 7, 13, 19, 25, 30, 33, 38, 41 and 43.5 s, at full size and downscaled to 350 px, plus a contact sheet, spectrogram, `volumedetect`, a full decode and ffprobe for the duration and audio stream. Record whether the audio was heard or only analysed.

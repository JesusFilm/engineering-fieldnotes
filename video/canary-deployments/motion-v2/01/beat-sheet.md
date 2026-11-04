# Canary deployments 01: Keep a control version (motion-v2 cut 01)

## Mechanism

v1 keeps serving as the **control** while v2, the **candidate**, receives a limited example share of requests. Both are measured over the same operation and the same window. A rule written before any v2 traffic turns that comparison into pause, abort or promote. A timer that only widens the share is shown once and rejected, because it never reads the evidence.

All numbers are illustrative: the 90 / 10 split, the 10 min window, the 1,000-request minimum, the 5-point limit and the 90 / 9,000 and 90 / 1,000 results. "Illustrative numbers" stays on screen from 5.8 s until the fade. The 1%, 9% and 8-point values are derived arithmetically in `scene.js` from the stored counts. The 20 animated markers illustrate routing only; they are not the sample behind the counts.

## A/B plan choices

The two anonymous plans were compared on content only.

| Topic | Taken from | Choice |
| --- | --- | --- |
| Request markers, service panels | A | Small square data markers; software cards, not racks or envelopes |
| Panels morph into aligned result rows | A | Same cards become full-width rows, so identity carries through |
| Denominators that matter | A | 90 / 9,000 vs 90 / 1,000 with equal error counts |
| Rule card with stacked rows | A | Three wide rows, outcome word at the right |
| Ending summary | A | Limit traffic → Compare both → Decide by rule, then a finite fade |
| Abort consequence | A | Decision chip first, then the share drains to 0 and v2 dims; no reroute animation, no "rollback" label |
| Timer-only contrast | B | Clock widens the share twice, then gets a red × and "No comparison"; share returns to 10% |
| Pause from too little data | B (simplified) | Amber "v2 under 1,000 → Pause" chip while v2's count is below the minimum |
| Colour discipline | B + A | v1 cyan, v2 violet; amber, red and green only mark rule outcomes |
| Persistent illustrative note | B | Footnote at the bottom |
| Not used | A | Separate "Release decision" control and an 8-point connector; the delta chip plus arrow carry this more simply |
| Not used | B | Two observation windows and a crash-like abort sound; replaced by one window and a low thump |

## Beat sheet (speed 1, 47.5 s, 30 fps)

| Time (s) | What moves | State change | Sound |
| --- | --- | --- | --- |
| 0.0–2.8 | Three markers: Requests → Router → v1 | v1 card glows on each arrival; router port lights cyan | Router send G5 (quiet), v1 arrive C5 |
| 2.9–3.6 | v2 card fades in with a violet ring | v2 "candidate", its wire dim, no traffic | store E5, panned right |
| 3.9–5.6 | Ring on v1 | v1 label changes current → **control**; hold | role C5+G5 |
| 5.6–12.0 | Rule card rises; rows reveal at 6.4, 7.9, 9.4 | "Rule, set before rollout": Either under 1,000 requests → Pause; v2 errors > v1 + 5 points → Abort; Otherwise → Promote. Hold 9.8–12.0 | store G4 per row |
| 12.6–13.4 | Share bar fills; v2 wire brightens | Example split 90 / 10 | store E5 |
| 13.6–18.9 | 20 markers in two groups; pointer slides to port 1 for markers 5 and 15 | 18 to v1, 2 to v2 | Quiet C5 for v1 (accented at group starts), full E5 for each v2 arrival |
| 19.4–22.2 | Clock appears and spins; share widens to 70/30, then 40/60 | "Timer only" while the share grows | Clock ticks A6, flat D4 double note per widening |
| 22.3–23.8 | Red × ripple and shake on clock; share returns to 10% | "No comparison" in red | thump E4 |
| 24.0–25.7 | Routing fades; v1 and v2 cards morph into rows one after the other | Rows keep their v1 control / v2 candidate identity | Noise swish per card; ack G4 when the scope chip appears |
| 25.5–29.4 | Window bar fills; counts climb | "GET /items · same 10 min"; errors / requests for both rows; amber "v2 under 1,000 → Pause" from 26.5 until v2 nears 1,000 | Clock at start and end; faint C5/E5 pairs while counting; pending A4→D5 for Pause |
| 29.9–32.3 | Percentages land, then the delta chip | 1% and 9%, then "9% − 1% = 8 points". Hold | store C5, store E5, ack G4 |
| 32.4–37.0 | Same rule card returns; arrow from the delta | "Same rule, set before rollout"; Pause row dims with a dash; Abort row gets a red check and outline; Promote dims. Hold 35.4–37.0 | store G4, send G4, ack G4, thump G3 |
| 37.0–39.0 | Rows morph back into routing cards; routing returns at 90 / 10 | Comparison cleared | Swish per card, router send G5 |
| 39.3–41.0 | "Decision: abort" chip; then the v2 share drains to 0, v2 dims and its wire dashes | "v2: no new traffic" | thump G3, poof C5 on v2, ack G4 |
| 41.4–43.0 | Two markers go to v1 | v1 control keeps serving | send G5, arrive C5 |
| 43.3–46.5 | Three linked pills appear 0.6 s apart. Hold 44.8–46.5 | Limit traffic → Compare both → Decide by rule | store G4 each |
| 46.5–47.5 | Whole frame including header fades to black | Finite ending | silence |

## Sound map

Each actor has its own pitch, and pitch marks identity, never health: v1 C5, v2 E5, router G5 send, rule and decision G4, threshold failure G3 thump. The timer gets its own clock ticks and a flat D4 double note, and its rejection uses an E4 thump. Card morphs use an unpitched noise swish. Cues are panned to the actor's x position. The majority v1 arrivals stay quiet during the dense stream so the minority v2 notes stand out.

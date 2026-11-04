# Canary deployments 02 · Limit the exposure — beat sheet

**Mechanism.** One illustrative window of 10,000 requests is split 9,000 to v1 (current, control) and 1,000 to v2 (candidate). Each version is counted and measured on its own denominator. A small share limits how many requests reach the candidate, but the requests it does receive belong to real users, so harm is still possible and a small rollout proves nothing about safety.

**Accounting.** 100 squares, 1 square = 100 requests. 90 squares are v1 and 10 are v2. The candidate squares sit at irregular positions (3, 14, 18, 37, 41, 52, 66, 71, 79, 95), so the picture does not imply an "every tenth request" rule. Counters change only when a square arrives, and pending + v1 + v2 = 10,000 at every change, which the Node check in verification.json confirms. The explanatory insets never change a count. All values are authored teaching data, not measurements, unique-user counts or a recommended percentage.

**Pitch identities.** v1 = C (low C4 taps, C5 for panel events). v2 = E (bright E5 with echo). Users = G. Exposure emphasis is amber; red appears only for the one hypothetical failed response.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.2–3.6 | Title and "Example window" chip appear. 10 rows of grey squares fill from 0.9 to 2.3 s. Counter steps 1,000 → 10,000. Legend "1 square = 100 requests" appears at 2.9 s; one square outline brightens at 3.2 s. | A finite window exists before any split. | One quiet G5 row tick per row; store C5 + white ripple at 10,000 (2.42); ack on the unit highlight (3.2). |
| 3.6–5.4 | Hold. | — | Silence. |
| 5.4–7.2 | Cyan sweeps through 90 squares row by row; "v1 · control" key. At 6.7 s, 10 scattered squares turn violet with a brief outline; "v2 · candidate" key. | Every square belongs to exactly one version. | Arrive C4 on the sweep; arrive E5 on the violet squares. |
| 7.2–8.6 | Hold. | — | Silence. |
| 8.6–9.6 | Grid shrinks upward and becomes the pending source. The router, two dotted wires, empty v1 block (9×10) and v2 column (1×10), labels, "pending 10,000" and the unit key fade in. | Routing stage. | Soft noise swoosh. |
| 9.6–18.1 | 100 squares leave in reading order through the router. They move slowly for the first 20, then speed up. Violet squares exit right, cyan exit left; packets pass inside the router edges. A source square empties at departure; its destination square fills at arrival. | v1 0 → 9,000; v2 0 → 1,000; pending 10,000 → 0. | Every v1 arrival is a low C4 tap, louder for the first 20 and quieter later. Every v2 arrival is a bright E5 note with echo (10 in total). |
| 18.2 | Both counters pulse with coloured ripples. | Split complete. | Store C4 (left) then E5 (right). |
| 18.4–20.0 | Hold on 9,000 / 1,000. | — | Silence. |
| 20.0–22.1 | Source, router and wires fade. "share of 10,000 requests" strip fills to 90% cyan, then 10% violet, with external 90% / 10% labels. Blocks and counts remain below. | Same split as a share (810 px + 90 px of 900 px). | Store C4 at 90%; store E5 at 10%. |
| 22.1–24.2 | Hold. | — | Silence. |
| 24.2–27.95 | Blocks fade, strip dims. Chip becomes "Requests ≠ users". An inset shows user A (phone) and user B (laptop); lines draw to "request 1", "request 2" (both user A) and "request 3" (user B). "3 requests · 2 users" appears. | A request count is not a user count. | Swoosh on the chip; G5 send per request line; arrive G4 on the summary. |
| 27.95–29.6 | Hold, then the inset clears. | — | Silence. |
| 30.0–33.45 | Chip becomes "Measure each version". Strip returns to full. A cyan connector drops to a v1 panel ("v1 · control", "n = 9,000"), then a violet connector to a v2 panel ("v2 · candidate", "n = 1,000"). Empty "errors" and "latency" fields appear in each panel. | Separate panels and denominators; no results claimed. | Arrive C5 on v1 panel, E5 on v2 panel; work C4 / E4 as fields appear. |
| 33.45–35.6 | Hold. | — | Silence. |
| 35.6–37.6 | Panels clear. Chip becomes amber "Possible impact". Cyan segment dims. "9,000 stay on v1" (cyan) and "1,000 exposed to v2" (amber) appear under the strip. An amber line drops from the violet segment into an inset with three devices and three neutral "response" rows. | Exposure is limited to v2's 1,000 requests. | Low thump (right) on "exposed"; E5 send as responses appear. |
| 38.5 | The middle response turns red and reads "failed"; it jolts, a red × ripple marks it, and its device turns red. | A possible, hypothetical failure for one affected user. | Custom failure: sine sweep E4 → E3 with a short noise layer. The loudest event in the film. |
| 39.5 | "Affected users can be harmed" appears. | — | Quiet work E4. |
| 39.9–42.0 | Hold. | — | Silence. |
| 42.0–44.4 | Inset clears; chip returns to "Example window"; cyan restored. "9,000 → v1", "1,000 → v2", amber pill "Small share ≠ proven safe", then "Illustrative window". | Final qualified summary. | Ack per count line; neutral C4 + E4 dyad on the pill (no success chime). |
| 44.4–46.0 | Final hold. | — | Silence. |
| 46.0–46.8 | Whole frame fades to black. Finite ending. | — | Tail of the dyad only. |

Beats 4–8 start 1.005 s later than the authored base times. The scene derives that shift from the computed landing time so the post-landing hold is about 1.8 s.

## Neutral A/B choices

The two anonymous plans were combined as follows. Each line names the source of the idea; none implies a quality ranking between the plans.

- **Counting unit:** Plan B's 100-square grid (1 square = 100 requests), chosen so the 9 : 1 ratio is visible and audible across a stream. Plan A's caution against implying a fixed order is kept through irregular candidate positions; Plan A's ten 1,000-request tiles were not used.
- **Arrival-only counting and the pending + v1 + v2 = 10,000 invariant:** Plan A.
- **Router and two dotted wires, slow-then-accelerating stream, quiet low majority taps against a bright minority note:** Plan B.
- **900 px 90/10 strip (810 + 90) with external percentage labels:** Plan A.
- **Requests ≠ users:** Plan A's request rows linked to a client, drawn with Plan B's device icons. Plan B's zoomed micro-grid was not used.
- **Measure separately:** Plan B's per-version panels with their own n, plus Plan A's connector from each strip segment to its own panel only. Metric fields are left empty, a variation on both plans (Plan A's em dashes, Plan B's empty meters), so no reading or zero is implied.
- **Possible harm:** Plan A's explicitly hypothetical red failed response under "Possible impact" and its down-sweep failure sound. Plan B's reservation of amber for exposure emphasis. Plan B's amber "?" cells and minor-second cue were not used, and no failure count is shown.
- **Summary:** Plan B's three summary items (wording "Small share ≠ proven safe") with Plan A's "Illustrative" qualifier. Finite fade to black from both plans.
- **Colours:** neither plan's palette. Cyan v1 / violet v2 continue lesson 01 of this sequence.

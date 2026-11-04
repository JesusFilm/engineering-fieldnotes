# Canary deployments, lesson 04: Compare the same operation (plan B)

## Lesson

One mechanism: to judge a canary, compare the candidate with the control on the **same operation in the same observation window**, then read each version's rate from its own numerator and denominator.

The viewer should leave with these facts:

- Only export requests count; other operations are filtered out before counting.
- Both versions are observed in one shared window.
- v1 control: 0 failed exports / 900 exports = 0%.
- v2 candidate: 40 failed exports / 100 exports = 40%.
- The candidate looks worse, so this comparison argues against promoting v2. A person still decides; nothing rolls out or rolls back on screen.

Limits the video must respect:

- The counts are authored and illustrative, with no benchmark claim. A small closing chip reads `illustrative counts`.
- The video shows no cause for the failures and no universal threshold. No "5 pp" or "1%" line appears.
- Unrelated requests are never added to either denominator. The pooled 10,000 / 0.4% figure from lesson 03 does not appear.
- Traffic weights never shift and v2 is never removed. The decision node only changes state.

The video ends on its final state and fades out; it does not need to loop. Target length is about 44 s. The `lessons.json` captions currently assume a 28 s video with beats at 0/7/14/21. The coordinator owns that file; the proposed caption times are listed at the end.

## Stage (1080×1920, flow top to bottom)

| Element | Type | Position | Notes |
|---|---|---|---|
| Title | meta | y≈330 | "Compare the same operation" |
| Subtitle | meta | y≈405 | `EXPORTS VS EXPORTS` |
| `requests` | `box` 300×90 | (540, 540) | Mixed traffic enters here. Label 44px. |
| `filter` | `box` 560×110, 1 port | (540, 730) | Label `op = export`, 48px mono. A rule, drawn as software. |
| `other` | `label` | (930, 730) | Dim grey `other ops`, 40px, right of the filter. Excluded chips slide here and fade. |
| `window` | `bar` 860×22, ticks | (540, 900) | Label `same window` 40px above it. Spans both columns, so it is visibly shared. |
| `v1` | `box` 400×140 | (290, 1090) | Label `v1 control` 46px. |
| `v2` | `box` 400×140 | (790, 1090) | Label `v2 candidate` 46px. |
| `v1frac` / `v2frac` | `label` mono | (290/790, 1290) | Fraction `fail / exports`, 84px bold. |
| `v1rate` / `v2rate` | `bar` 400×30 | (290/790, 1420) | A 0–100% track on the same scale for both. One fail segment. |
| `v1pct` / `v2pct` | `badge` | (290/790, 1540) | `0%` and `40%`, about 110px. |
| `decide` | `box` 520×100 | (540, 1720) | Label `promote v2?` 46px. Later: `against promotion`. |
| `note` | `label` | (540, 1810) | `illustrative counts`, 40px grey. Appears only at the end, inside the stage, and clear of the decision box. |

Wires: requests→filter (vertical), filter→v1 and filter→v2 (dotted, angled via (290, 980) and (790, 980)), and filter→other (short horizontal, grey). The window bar sits between the filter and the versions. Packets cross it, so the wires must pass through gaps or behind it without hiding the bar label. Check this in stills.

Colour use: v1 is green `#3FB68B` for healthy results, and v2 uses the accent orange `#F5A524` as its identity on the label underline, wire and packets. Failure is red `#E5484D`. Excluded requests are grey `#3A3E45`. Colour always pairs with a number or a label, so no legend is needed.

## Legibility at 350px

At 350px wide the scale is 0.324. Every word therefore uses **40px or more** at 1080 (≈13px on the phone), and the fractions and percentages use **84–110px** (≈27–36px). Avoid thin weights for numbers. Keep at least 30px clear around every label when packets pass it. Show only three short chip texts (`export`, `search`, `login`), each 40px mono.

## Beat sheet

Times are playback seconds at speed 1. Events are spaced 0.3–0.9 s apart. Every beat ends with a deliberate hold, and no hold runs past 2.5 s.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.0 | Title and subtitle are already present; the stage fades up from black. | requests and filter appear. Everything else is at alpha 0. | Soft low `arrive` C4, gain 0.3. |
| **B1 Filter: exports only** 1.0–7.5 | 9 chips leave `requests` at 0.65 s intervals in the order export, search, export, login, export, search, export, export, login. | At the filter, each `export` chip turns white, passes, and waits at the port. Each `search`/`login` chip dims to grey, slides right to `other ops`, and fades. The `other ops` label pulses once on the first rejection. | `send` A6 gain 0.25 per departure. Pass: `ack` E6. Excluded: `thump` at gain 0.2, panned right, short and muted, so excluded traffic sounds discarded. |
| 7.5–9.0 hold | The waiting export chips fade. The `other` label stays dim (alpha 0.3) for the rest of the video. | Rule established | Silence |
| **B2 Same window, separate denominators** 9.0–18.0 | The window bar fades in and fills linearly from 9.6 to 16.6. Export dots leave the filter in a 9:1 pattern: nine to v1, then one to v2, for **three full cycles** at 0.22 s spacing, with packet dur 0.35 s. v1 and v2 boxes fade in at 9.3. | The fractions count up in step with the bar. v1's denominator runs `– / 90 → – / 270 → … → – / 900` (both numerators stay hidden until their result beat) and v2's runs `– / 10 → … → – / 100`, always 9:1 in every frame. v1 dots arrive green. On v2, each cycle that arrives includes red dots in the visual stream (roughly four red per ten), but **v2's numerator stays hidden** as `– / 100` until B4. At 16.6 the bar ends with a tick mark and both denominators lock, each with a white ripple. | `clock` tick every 0.7 s under the stream at gain 0.2. v1 arrival `arrive` C5 gain 0.18 (quiet majority). v2 arrival `arrive` G5 gain 0.32 (distinct minority pitch); a red v2 arrival uses G5 with a short low `miss` layer. Window close: `chime` E5–A5 at gain 0.4. |
| 18.0–19.5 hold | Still: two columns with different denominators. | Denominators locked | Silence |
| **B3 Control result** 19.5–25.0 | v1's numerator slot flashes and settles on `0`, so the fraction reads `0 / 900`. The v1 rate bar fades in with no red segment, and its track turns green-tinted. The `0%` badge pops in green with overshoot, then gets a green check ripple. | Control rate shown | `hit` C5 on the numerator, `chime` C5–E5 at the badge, panned left (−0.45). |
| 25.0–26.5 hold | v1 complete; v2 still `– / 100` | | Silence |
| **B4 Candidate result** 26.5–33.0 | v2's numerator counts 0→40 with an easing that slows near the end (counter ticks at 0, 10, 20, 30, 40). At each step, v2's red segment grows to the same share: 10%, 20%, 30%, 40%. At 40 the v2 box shakes (amp 10) and a red ripple spreads. The `40%` badge pops in red. | `40 / 100`, red segment exactly 40% of the track (160px of 400) | Each tick: `thump` G3 rising slightly in gain. The landing uses a short custom `regress` (noise burst, falling sweep G4→D4, sub thump), panned right (+0.45). This is the loudest event, with its peak at −3 dBFS. |
| 33.0–35.0 hold | Both results visible side by side on the same 0–100% scale | Comparison readable | Silence |
| **B5 Compare and decide** 35.0–41.5 | requests, filter and window dim to 30%. A thin white bracket draws under both rate bars (they share one scale). The `decide` box fades in at 36.0 with label `promote v2?` and a neutral grey stroke. At 37.2 a dot travels from v2pct and v1pct into `decide`. The box turns red, its label switches to `against promotion`, and a red × ripple appears. **No wire or traffic weight changes**; v2 keeps its route. | Decision evidence is shown, but no action happens | Two quiet `send` ticks (C6, G6) for the evidence dots. Decision: falling two-note `thump` D4→A3 at gain 0.6, below the B4 peak. |
| 41.5–43.3 hold | The `illustrative counts` chip fades in at 41.6 | Final state | Silence |
| 43.3–44.3 | `s.fade(43.3, 1, 0.9)` | End | Soft low pad tail from the decision decay, which needs no new cue |

Total: about 44.3 s. If a beat drags, cut B1 to 7 chips and shorten the B2 spacing before trimming any hold.

## Arithmetic guard

- Counter tables are generated by code, not typed by hand: `v1 = 90*k` and `v2 = 10*k` for k = 0..10, and v2 failures = `10*j` for j = 0..4. Assert `0/900 === 0` and `40/100 === 0.40` in a Node dry run before rendering.
- The rate bars share one track width (400px = 100%). v2's fail segment is `seg0 = 0.40`; v1's is `seg0 = 0`.
- No frame shows a sum across versions or across operations.
- The visual red-dot count in B2 may be approximate, because it is motion. The numbers on screen must be exact.

## Sound map

| Actor or event | Preset | Pitch | Pan | Gain |
|---|---|---|---|---|
| requests departure | `send` | A6 | 0 | 0.25 |
| filter pass | `ack` | E6 | 0 | 0.3 |
| excluded op | `thump` (short) | C3 | +0.35 | 0.2 |
| v1 export arrival | `arrive` | C5 | −0.45 | 0.18 |
| v2 export arrival | `arrive` | G5 | +0.45 | 0.32 |
| v2 failed arrival | `arrive` G5 + `miss` layer | G5/low | +0.45 | 0.32 |
| window ticking / close | `clock` / `chime` | — / E5–A5 | 0 | 0.2 / 0.4 |
| control result | `hit`, `chime` | C5, C5–E5 | −0.45 | 0.5 |
| candidate count | `thump` | G3 | +0.45 | 0.3→0.5 |
| candidate regression | custom `regress` | G4→D4 sweep | +0.45 | loudest, −3 dBFS peak |
| decision | `thump` pair | D4→A3 | 0 | 0.6 |

The design is sparse: each version keeps one pitch, the majority stream stays quiet, and the regression stands out. The mix must have no clipping (`max_volume` ≤ −1 dB).

## Production and checks

- Put the scene and its rendering commands under this lesson's assigned motion-v2 directory. Keep any engine extensions local to the cut, and use the repository's pinned renderer.
- Run a Node timing dry run. Confirm cue times line up with the beat sheet and that every beat has at least one cue.
- Render stills at 0.8, 4.5, 8.2, 13, 17.2, 22, 24.5, 30, 34, 39, 42.5 and 44.2. View each at full size and at `scale=350:-1`. Pass only if every label and number is readable at 350px, nothing overlaps (packets crossing the window label, the `other ops` label against the v2 wire, the note against the decision box), and nothing stale lingers (waiting chips, ripples, the "–" placeholder after B4).
- Make a contact sheet and a spectrogram, and run `volumedetect`. Decode the whole file, check `ffprobe` duration and the audio stream, and check streaming metadata (faststart).
- Record whether the audio was actually heard or only analysed.
- Run the defect pass from the skill's review guide, then write numbered suggestions. A comparative review against the other lesson 04 cut is required before any recommendation.

## Proposed caption timing (coordinator to apply)

- 0: "Compare exports with exports. Do not mix them with unrelated requests."
- 9: "Both versions are measured in the same window, each with its own denominator."
- 19.5: "Version 1: zero failures out of 900. Control exports have a 0% error rate."
- 26.5: "Version 2: 40 failures out of 100. Candidate exports have a 40% error rate."
- 35: "The candidate is worse on the same operation. The comparison argues against promotion."

The takeaway text stays as it is, including the note that the counts are authored, not benchmark results.

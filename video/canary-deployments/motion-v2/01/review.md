# Canary deployments 01 review (motion-v2 cut 01, render 5)

This is a self-review by the authoring session. It is not the independent comparison review the editorial workflow requires before recommendation.

## Accuracy and scope

- Teaches: v1 stays as the control; v2 gets a limited example share; both are compared on the same operation and window; a rule set before rollout decides pause, abort or promote; a timer that only widens the share is rejected as no comparison.
- Numbers: all are labelled "Illustrative numbers". The rates and the 8-point delta are computed from the stored counts. Animated markers show routing only.
- No causal or statistical claim: the frames show a rule being met ("v2 errors > v1 + 5 points → Abort"). No text says that v2 caused the errors, or calls the result significant or confident.
- No automatic rollback: "Decision: abort" appears first, then the share drains and "v2: no new traffic" appears. No rollback label is shown, and v2 stays visible but dimmed.
- No universal share: the split is always labelled "Example split". The timer contrast shows that the share is adjustable.
- Not covered: per-operation segmentation, sequential statistics, provider configuration, health-check recovery and staged weight schedules.

## Fixed before handover

- 0.0–47.5, all text: the engine's built-in text is 24–36 px. I added cut-local caption, card and list nodes so essential text is 44–66 px (the footnote is 40 px), which reads at actual 350 px width.
- 10.5 rule card: the bottom row touched the footnote, so I moved the card up 28 px.
- 21.6–22.8 timer label: at its first position "No comparison" ran past x=1010 and crowded the clock ripple. I moved the label and shrank the ripple.
- 24.3–25.7 and 37.3–38.9, card morph: the cards crossed mid-morph and subtitles smeared. Each card now moves vertically and horizontally in separate steps, the second card starts later, and subtitles hide during the morph.
- 26.5–29.4 pause chip: the chip stayed visible while v2 showed 1,000, which contradicted the Pause condition. Verified at encoded frames 879, 882, 886 and 888: the chip is fading at 969 requests and gone by 1,000. The original rule text "Under 1,000 requests each" was ambiguous, so it now reads "Either under 1,000 requests".
- 46.2 fade: the stock veil left the header visible, so the cut-local engine gained `meta.veilTop` and the whole frame now fades to black.
- 24.3, 25.0, 37.3, 37.8 and 38.8: morphs and the routing return had no sound. I added a swish per morph and a router send. The video frames are byte-identical to render 4 (framemd5 match), so the visual inspection carries over.

## Encoded inspection

I inspected 34 frames of the final encode individually at native 1080×1920, cropping to 1:1 when the viewer would have downscaled. I inspected the same 34 frames at actual 350×622, plus 8 more around the end of the window (frames 864–894). The frames cover every beat start, every label reveal, the densest routing moment (15.0, 17.4), both result rows, the selected Abort, the consequence, the summary, the fade and the last frame. The alternate-index pass found the pause-chip contradiction above, and the fix was confirmed on frames 879/882/886/888 of the final encode. I also checked a 1 fps contact sheet and a log-frequency spectrogram. Each beat has its cue, the stream from 13.6 to 18.9 shows the minority E5 notes, and the thumps at 22.3, 34.8 and 39.3 are the lowest, strongest events.

Audio was analysed, not heard. I have not listened to this encode.

## Suggested improvements

1. **Timer contrast is quick** (19.4–23.8, S). Saw: the share widens twice in about 2 s, then the × lands. Change: add 0.5 s before the ×, so the 40 / 60 state settles. Effect: the "slow rollout alone" point lands more clearly.
2. **The Pause chip is in amber text only** (26.5–29.2, S). Saw: the amber chip sits under the bar with no link to v2's count. Change: pulse v2's request count in amber while the chip is visible. Effect: shows which number holds the decision.
3. **Promote is never shown as reachable** (32.4–37.0, M). Saw: Promote only dims. Change: a 2 s variant ending in which equal rates select Promote. Effect: shows the rule can pass; this would need a separate cut or length.
4. **v1 arrival volume under the dense stream** (13.6–18.9, S). Saw: most v1 arrivals are set at gain 0.22, about 13 dB under the v2 arrivals. Change: raise them to about 0.3 if listening shows they disappear. Effect: keeps the 9:1 pattern audible.
5. **Requests box is empty during results** (24.0–37.0, S). The routing context disappears entirely. Consider keeping a faint router outline so the viewer remembers where the counts came from.

## Notes for the skill (not acted on)

- The stock engine has no text node above 36 px, no movable card and no full-frame fade. This cut's `caption`, `card`, `list`, `line`, square packet and `meta.veilTop` live only in `engine/flow-engine.js` beside the scene.

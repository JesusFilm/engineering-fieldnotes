# Canary deployments 02 · Limit the exposure — review (render 3)

The defect pass is clean on the final encode (sha256 c8f2f9cc…cc00, 46.80 s). The figures below come from encoded-frame inspection and numerical audio analysis. **The audio was not listened to.** Its timing and levels were checked only with a spectrogram, volumedetect/astats and the cue list. No comparative review against other cuts was performed; that belongs to a fresh reviewer.

## Fixed before handover

- Still at 37.5 s (pre-render stills): the failed response kept the text "response" because the scene set `text` instead of the box `label`. It now reads "failed".
- 18.2–19.0 s (render 0 dry run): the share strip started 0.4 s after the last arrival landed. Later beats now follow the computed landing time, giving a 1.8 s hold.
- 15.0 s (render 1, encoded frame 450): fast-stream packets passed through the "router" label. They now travel inside the box edges (x = 440 / 640), clear of the text; frames 450–452 confirm this.
- 33.4–36.2 s (render 1): about 3 s static on the empty measurement panels. The hold was trimmed to about 2.15 s.
- Render 1: several secondary labels were 42–46 px. The strip title, legend, unit key, user labels, field labels and qualifier were raised to 44–50 px.
- 2.4–3.0 s (render 2, frames 73–80): the arrival ripple around "10,000" reached into the "Example window" chip. Its radius is now 130 px; frames 73, 76 and 80 show it clear of the chip.
- 30.0–35.6 s (render 2, frame 975): the v2 panel's right edge sat at x ≈ 1005, past the 996 px safe bound. It is now at 994 px (frames 975, 976 and 1040 checked by pixel scan).

## Suggested improvements

1. **Use the lower stage** (20–46 s, size S). Saw: from the share strip onward, y ≈ 1500–1720 is mostly empty. Change: shift the strip-and-below composition down about 80 px. Effect: a calmer, more centred phone frame without adding elements.
2. **Shorten the fast stream** (12–18 s, size S). Saw: routing runs 8.5 s, the longest beat. Change: start the fast phase after 15 squares and end about 1.5 s sooner. Effect: keeps the 9 : 1 rhythm while reducing the chance a beginner disengages.
3. **Tie the users inset to the window** (24.2–28 s, size M). Saw: the inset appears as a separate illustration. Change: open it out of one v1 square and one v2 square with a short zoom. Effect: shows directly that one square's requests can come from fewer users.
4. **Show why the fields are empty** (32.9–35.6 s, size S). Saw: empty "errors" and "latency" fields are honest but static. Change: give each field a faint dotted fill path from its own n, with no value. Effect: reads as "collected per version" instead of "missing".
5. **Mark routing choices at the router** (9.6–18.1 s, size S). Saw: the router box never changes. Change: briefly light a left or right edge marker as each square passes. Effect: the router becomes the visible point where the split happens.
6. **Tighten the failure ripple** (38.5–39.1 s, size S). Saw: the red × ripple overlaps the failed row's left edge for about 0.5 s; the text stays clear. Change: anchor it 30 px further left. Effect: a cleaner focal point.
7. **Do a listening pass** (whole film, size S). Saw: analysis only. The 70 quieter v1 taps form a dense low band from 11 to 18 s. Change: have a person listen and, if the band blurs or tires the ear, thin it or lower it by 2–3 dB. Effect: confirms that the minority E5 notes stand out by ear as they do on the spectrogram.

## Notes for the skill (not acted on)

- A general `grid` node and `dx`/`dy` node offsets, written locally in this cut, would help other ratio scenes.
- Box nodes take `label` while captions take `text`; one name for both would prevent the stale-label defect above.

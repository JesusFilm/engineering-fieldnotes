# Bind code and challenge review (render 2)

This is a self-review from encoded frames, the contact sheet, the spectrogram and audio measurements. It is not a comparative review and carries no score. The audio was analysed but not listened to.

## Fixed before handover

- 8.8–10.3 s (stills, before the first encode): while the server checks ran, the parked Challenge A chip covered the "Authorization server" legend. Changed: the chip now waits at a gate point (805, 1160) above the panel edge, clear of the legend. After the checks it drops into the record along the right margin, then slides left into its row, so it never crosses another row.
- Render 1, 20.0 s and 27.05 s (frames 600, 812): during a row fill the "no code yet" placeholder and the "Code A" key cross-faded and overlapped. Changed (engine `field`): the placeholder clears in the first half of a fill and the key appears in the second half. Rechecked at frames 600, 606, 809, 811, 812, 813, 814 and 816.
- Render 1: row-landing ripples spread over the row key text (0.6, 1.4, 10.9, 20.1, 27.2 s). Changed: rows now land with a single glow of their own outline and no ring.
- Render 1, 16.6 s: the click ripple covered the Approve label. Changed: the cursor tip now sits on the button's lower-right corner and the ring is smaller (r 6→30, 0.35 s). In render 2 the ring still touches the final letter of "Approved" for about 3 frames (frames 499–502, rechecked at 499, 500, 501, 502). This is minor, but it's the one remaining transient contact.

Checked clean in render 2, at native 1080 and at 350 px: every beat and boundary frame listed in verification.json. Labels are readable at 350 px (keys about 17 px, tags about 13 px). Chips never overlap labels at rest. The verifier never leaves the client row. Request order is client → browser → server and return order is server → browser → client. Code A first appears at frame 600 (20.0 s), after "User approval" turns into a check at 18.4 s. No state lingers from an earlier beat; browser content clears after each visit.

## Suggested improvements

1. **Separate "waiting at server" from "outside server"** (8.8–10.3 s, M). Saw: the request chip waits on the server panel's top edge during the checks. A viewer might read it as not yet received. Change: give the server panel a small intake slot inside its top-right corner and park the chip there. Effect: it's clearer that the server received the request and is checking it.
2. **Strengthen the bind as the loudest moment** (21.6 s, S). Saw: the bind cue peaks at -7.4 dBFS against -8.4 for ordinary arrivals, a small margin. Change: raise the bind gain by about 2 dB or lower the arrival gain. Effect: the binding is clearly the event to remember.
3. **Tighten the opening** (0.6–5.6 s, S). Saw: four small client events take 5 s before anything travels. Change: move the "stays here" tag and the challenge focus 0.5 s earlier each. Effect: motion starts sooner without losing the verifier/challenge contrast.
4. **Make "bound" a little larger** (21.5 s onward, S). Saw: the 40 px caption is about 13 px at 350 px, readable but the smallest essential word. Change: 44–46 px, which still fits the 64 px gap. Effect: the key relationship holds up better at phone size.
5. **Hint that the browser only passes things along** (6.6–8.0 and 25.1–26.4 s, S). Saw: chips rest in the browser with only a state word. Change: dim the chip slightly while it passes through, or add a thin pass-through outline. Effect: it's clearer the browser carries values and doesn't create them.
6. **Check that the final amber outline on Challenge A isn't read as a comparison happening now** (32.0 s onward, S). Saw: the challenge row turns amber at the end alongside "Exchange must match". Change, if comparison viewers misread it: keep the challenge row blue and let only the dashed arrow carry the amber. Effect: lowers the risk of implying the exchange happens in this lesson.

## Notes for the skill (not acted on)

- The cut-local `field`, `status`, `button`, `cursor`, `link` and `panel` node types and the keyframed packets (`keys`) are general. Keyframed packets fix a one-frame gap that appears when one packet hands off to another at a rest point.
- Snap Chromium will not launch inside the command sandbox here, so rendering needed a scoped escalation.

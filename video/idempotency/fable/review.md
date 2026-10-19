# Idempotency "Same step, same key" review (fable, render 3)

Reviewed from the encoded file `public/media/idempotency/fable.mp4` (sha256 eafa637e…) via the 1 fps contact sheet, full-size and 350 px frames at each beat (`scratch/encoded/`), the spectrogram, `volumedetect` per segment, and onset-to-cue alignment in `verification.json`. Audio was analysed numerically; it was not physically listened to.

## Fixed before handover
- 24.7 s: the green check ripple on the keyed row sat on top of the row text `#502  key s2` (seen in the still). Ripples for writes and the hit now anchor at x = 770, inside the empty right part of the row.
- Boundary frames (render 1): source PNGs for 0.00 s and 29.60 s were identical but the crf encode decoded to frames differing by up to 22/255 in a few blocks, because the static tail inherited residue from the fade. Render 2 switched to constant QP 22 with mbtree off and a forced keyframe on the last frame; first and last decoded frames are now byte-identical (checked with raw RGB extraction).
- 15.9 s: the rewind swoosh was broadband and almost as prominent as the crash on the spectrogram, which blurred "the duplicate is the disruption". Its gain went from 0.40 to 0.22 and the noise band from 2.5 kHz to 1.6 kHz; it now peaks at −22 dBFS against the crash at −1.8 dBFS.
- 2.0 / 6.4 / 11.6 / 18.9 / 24.2 s: the tool→store tick (send G6, gain 0.9) was masked by the echo tail of the arrive note; onset detection missed all five. Gain raised to 1.6; all five now register as onsets.
- 9.6 / 22.1 s: the TIMEOUT pop peaked at −20 dBFS, weak for the moment the agent decides to retry. Gain raised to 1.9 (now −16.5 dBFS).

## Defect pass (render 3)
- Text: smallest on-screen text is the 30 px agent sublabel (`step 2`) and counter; chips 32 px, store rows 32 px, badges 32–34 px. All legible in the 350 px frames. No label overlaps a packet, badge or ripple at any beat frame; the DUPLICATE and SAME TICKET ripples cross the "Tickets" label only while expanding (0.8 s).
- Stage: everything sits between y = 565 and y = 1775; the title band is untouched.
- Lingering state: after the rewind (16.5 s) rows 1–2, the outcome badge, the red store outline and the counter are reset; TIMEOUT and the red dashed wire clear at each retry. Verified on the contact sheet frames 17–19 s.
- Sound ↔ event: 51 cues, each tied to a visible change (packets, row writes, label change, badge pops, fades); 50 match detected onsets within 60 ms; the remaining cue is the closing fade swoosh at 28.8 s, which peaks at −28 dBFS over digital silence and is deliberately soft.
- Levels: max −1.8 dBFS (bound ≤ −0.5), crash loudest, lost response −5.5, hit/chime mid, ticks quietest. 
- Stillness: longest holds are 2.7 s after SAME TICKET and 2.2 s after DUPLICATE, both deliberate.
- Loop: first and last decoded frames identical (title on black).

## Suggested improvements
1. **Show the key travelling with the step, not only beside the agent** (17.4–18.1 s, size M). Saw: the `key s2` badge pops at the agent, then the chip reads `create · key s2`. Change: animate a small orange dot from the badge into the chip as it departs. Effect: makes "the harness attaches the key" a visible handoff rather than a label coincidence.
2. **Let the viewer see the tool compare keys** (24.2–24.6 s, size M). Saw: the orange dot reaches the store and the keyed row glows. Change: flash the `key s2` text in the row orange for 0.3 s before the green check. Effect: the match on the key, not on the ticket id, becomes the explicit cause of the hit.
3. **Make the two takes read as one scenario** (15.9–17.3 s, size S). Saw: the rewind is a fade to black; a viewer may read it as a new story. Change: run the store counter backwards (`3 tickets` → `1 ticket`) and spin the clock backwards during the fade, with the rewind swoosh. Effect: stronger "same situation, different behaviour" contrast.
4. **Distinguish retry chips from first attempts by motion** (10.8 s and 23.4 s, size S). Saw: colour alone (orange) marks a retry. Change: start the retry chip with a short backward nudge before it travels. Effect: colour-blind viewers also perceive "this is the second attempt".
5. **Hold the DUPLICATE state slightly longer and dim the agent's green check** (12.9–13.5 s, size S). Saw: the agent still shows a green check 0.6 s before the store turns red. Change: fade the agent to grey as the store reddens. Effect: the irony "the agent believes it succeeded" lands without competing highlights.
6. **Let the store reject a mismatched payload** (after 26.1 s, size L). Saw: the cut does not show a reused key with different parameters. Change: a final beat where `key s2` arrives with a different chip and the row ripples red ×. Effect: completes the Stripe/AWS semantics; however the baseline cut already covers CONFLICT, so this may belong there rather than here.
7. **Show key retention ending** (size L). Saw: nothing shows the key expiring. Change: a draining bar under the keyed row. Effect: teaches finite retention, at the cost of a sixth beat and ~5 s.

## Honest limitations
- Illustrative scenario: the ticket tool here stores the key with the ticket atomically and looks it up before writing. Real tools only behave this way when they implement the key (Stripe, EC2 ClientToken) or when the harness wraps them; a key attached by a harness does nothing if the tool ignores it.
- The harness "minting" a key is shown as a badge appearing; the cut does not show how the key is derived (run id + step id) or that it must stay identical across retries and change for new logical steps.
- Concurrent duplicates (two identical keys in flight) and key retention are not shown.
- Audio verified by analysis only. No comparative review against the baseline or other alternatives was performed in this session; scores belong to a fresh reviewer.
- The sublabel `step 1/2` at 30 px is the smallest text; it is readable at 350 px but a larger stage would allow 34 px.

## Notes for the skill (optional)
- crf encoding cannot promise byte-identical boundary frames even from identical source frames; the local renderer gained a `--qp` mode (constant QP, mbtree off, forced final keyframe) that does.
- Engine text defaults (24 px box sublabel, 26 px chips and store rows, 30 px badges) sit at the legibility floor; size options were added locally (`subSize`, `textSize`, `rowH`, chip `size`, badge `size`).


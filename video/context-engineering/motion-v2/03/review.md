# Lesson 03 review (render 2)

The review uses encoded frames, the spectrogram, and levels from `video.mp4` (sha256 in `verification.json`). Audio was analysed only, never listened to.

## Fixed before handover

- **Reference link endpoint (dry run).** The ref link started 135 px below the `ref` row, inside the proposal area. It now starts at the `ref` row (y 1199).
- **Client marks in the title band (render 1, 4.75–8.8 s).** The ✓ and × marks above the client boxes expanded into the subtitle band. They now sit on each client's outer edge, inside the stage.

## Suggested improvements (ranked)

1. **The hypothetical sounds like the climax** (8.5–8.8 s, size S). Saw: the two thumps are the loudest events, louder than anything about the constraint itself. Change: lower the thump gain, and make the triple field highlight at 28.4–29.0 s slightly brighter. Effect: the preserved field becomes the memorable moment.
2. **Show the clients as still depending on the field at the end** (34.4–42 s, size M). Saw: the clients sit idle while the check is pending. Change: draw thin dashed lines from both clients to the field row, with the dashes meaning "not re-checked". Effect: ties "pending" to the people who would break. Cost: one more element during the hold.
3. **Mark the diff as pseudocode** (23.2 s, size S). Saw: the loading lines look like real code. Change: add a small `illustrative` tag to the `src/invoice.py` row. Effect: matches the accuracy limit without a caption.
4. **Shorten the final silent hold** (35.6–42.4 s, size S). Saw: about 7 s of stillness. Change: about 5 s. Effect: about 2 s shorter with the same reading time for the pending row.
5. **Link the diff's unchanged line to the response** (28.4 s, size M). Saw: three highlights in sequence connect by repetition only. Change: briefly draw a right-gutter trace from the unchanged diff line to the response field. Effect: makes "this line produces that field" explicit. Risk: more motion.
6. **Keep line stands out only by its mark** (14.0 s onward, size S). Saw: `keep total_cents` has the same weight as the goal line apart from the amber mark. Change: show the `keep` label in amber. Effect: the constraint reads first in the card.

## Notes for the skill (not acted on)

- Ripple marks anchored at `.top` can enter the title band for nodes high on the stage; a guard or a side anchor in examples would help.

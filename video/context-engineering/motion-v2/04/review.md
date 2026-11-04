# Lesson 04 review (render 1)

The review uses encoded frames, the spectrogram, and levels from `video.mp4` (sha256 in `verification.json`). Audio was analysed only, never listened to.

## Fixed before handover

- No objective defects were found in stills or encoded frames. The `keep` field shows an empty slot for one frame at 13.8 s as its text fades in; this is a transition, and the next inspected frame is filled.

## Suggested improvements (ranked)

1. **The incidental lines look incidental from the start** (0.8 s onward, size S). Saw: `search invoice`, `read README.md`, and `query abandoned` are grey from their first frame, which gives the beat-4 judgement away early. Change: show all seven lines in white and grey the three only when they are left out. Effect: the viewer sees the selection happen.
2. **Copy paths are faint in the 20 px gap** (11.1–19.1 s, size M). Saw: the path for `goal` is almost invisible because source and field share a row height; the others show as short vertical strokes. Change: widen the gap to about 40 px, or briefly outline source and field together. Effect: "copied from this line" reads more strongly.
3. **The three poofs form the widest band in the spectrogram** (35.0–35.8 s, size S). Saw: quiet but broad noise. Change: replace them with a soft low tick or lower their noise layer. Effect: leaving lines out sounds neutral rather than destructive.
4. **Add the revision to the handoff ref** (16.2 s, size S). Saw: the handoff field reads `ref api/v1.md` while the repository shows `api/v1.md · a17`. Change: `ref api/v1.md@a17` if it fits at 40 px (17 characters, tight), or widen the right column. Effect: the reference is precise, as the concept's judgement asks.
5. **Shorten the final hold** (38.3–45.8 s, size S). Saw: about 7.5 s of stillness. Change: about 5 s. Effect: about 2.5 s shorter.
6. **Empty space below the repository** (1580–1800 px, size S). Saw: about 220 px unused. Change: move the stage down about 60 px or enlarge the repository rows. Effect: better vertical balance on phones.

## Notes for the skill (not acted on)

- A "paired highlight" helper (outline a source and a destination together) would cover cases where a trace is too short to see.

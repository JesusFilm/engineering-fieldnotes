# Lesson 02 review (render 2)

The review uses encoded frames, the spectrogram, and levels from `video.mp4` (sha256 in `verification.json`). Audio was analysed only, never listened to.

## Fixed before handover

- **Highlight crossing the panel border (stills, 37.8–41.8 s).** The amber highlight on the supplied `keep total_cents` line overlapped the model input's bottom border. The task strip and open row height were tightened, the input panel grew to 460 px, and the records are now spaced 78 px apart, so the highlight sits inside the panel.
- **Speed.** At the plan's 0.9 speed, playback ran 55.6 s with long silent stretches. It now plays at speed 1 (50.0 s), keeping every authored hold.

## Suggested improvements (ranked)

1. **Bring the task into each decision** (13.0 s and 20.8 s, size M). Saw: the task strip lights once at 6.2 s, then plays no part in the decisions. Change: pulse the task row together with each decision line. Effect: relevance visibly means "relative to this task".
2. **Empty space below collapsed rows** (25–34 s and 42–48 s, size S). Saw: the results panel keeps its open height, leaving about 290 px of empty space. Change: animate the panel height with the open row, or fill the space with a dim `3 results` footer. Effect: a tighter frame and less dead area on a phone.
3. **Make the conflict more noticeable** (37.8 s, size S). Saw: two amber outlines appear 0.2 s apart with quiet acks. Change: hold both for 2 s, and give the pair a two-note interval (draft D4 against rule E5). Effect: the contradiction lands as the reason for leaving the draft out.
4. **Shorten the opening** (4.6–8.6 s, size S). Saw: 2.4 s of hold before the first inspection. Change: start inspecting at about 7.4 s. Effect: about 1 s shorter with no loss.
5. **Source stamp contrast** (26–50 s, size S). Saw: the grey source stamps read at 350 px but are the faintest text on screen. Change: brighten them slightly or bold the path part. Effect: "where it came from" reads at a glance.
6. **Add a fourth irrelevant result** (beat 1, size M). Saw: two of the three results are relevant, which makes search look more precise than it usually is. Change: add a row like `README.md · overview` that is skimmed and skipped quickly. Effect: a more honest picture of noisy retrieval, at the cost of about 3 s.

## Notes for the skill (not acted on)

- `accordion` is a general expandable-list node and could join the engine with `sheet` and `trace`.

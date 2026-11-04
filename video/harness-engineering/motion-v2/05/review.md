# Video 05 review (render 4, final)

**Bound to:** `video.mp4` SHA-256 `547b41b8c34e4dcdeb6886b964c627d0fe99ed3145262291910e30d972cc3ca3` (35.00 s). Any re-encode voids this review. It is the author's self-review; a fresh comparison reviewer is still required.

## Evidence scope

- **Frames:** decoded from this exact file with output-seek extraction at 0, 1.5, 2.6, 3.7, 6, 7.2, 8.6, 8.95, 9.6, 11.6, 12.25, 12.6, 13.4, 15.6, 16.6, 17.2, 18.5, 19.85, 21.5, 22.85, 23.85, 25.5, 27.6, 28.25, 28.6, 30.5, 32.5, 33.2 and 34.95 s (`scratch/final/`). Extra frames at 12.0, 12.25, 12.5, 28.2 and 28.5 s cover the request arrivals.
- **Views:**
  - a 350 px sheet of those frames (`scratch/final-350-sheet.png`) and a 2 fps 350 px sheet of the whole file (`scratch/final-350-2fps.png`);
  - six frames viewed individually at true 350 px width: 2.6, 8.95, 13.4, 19.85, 23.85, 30.5 s (`scratch/final-350-trio1.png`, `trio2.png`);
  - full-resolution 1080×1920 at 12.5 s, the busiest refusal frame;
  - native crops of the request arrival on the previous encodes, which led to the fixes below.
- **Audio:** spectrogram (`scratch/spectrogram.png`), per-cue peaks from the decoded audio (`scratch/cue-peaks.json`), `volumedetect`, full decode, and MP4 box order.
- **Heard:** nothing. The audio was **analysed, not listened to**.
- **Not covered:** site or browser checks, and comparison with other cuts.

## Accuracy checks

- **The rule exists first:** the rule card is visible and highlighted before any agent action, and it never changes.
- **Words change nothing:** after the `"tests pass"` claim, `access` still reads `no result` and the meter `0 of 2 met`.
- **Enforcement is at the branch:** both requests reach `main` and are refused there with a named reason. No button state is involved, and `tip b10` is identical in every inspected frame.
- **Bypass is controlled:** `bypass maintainers` flashes on the first refusal. The agent does not hold it.
- **Evidence is current and executed:** `running · d73`, then each case runs and passes in turn. `passed · d73` first appears at 23.8 s, after the second case passes at 22.8 s; the 22.85 s frame still shows `running`.
- **The pass is scoped:** after the pass the meter shows `1 of 2 met` and review stays `pending`. The final request is refused with `needs review`. No merge, approval or deployment is shown.

## Fixed before handover

- **Overlapping rule highlights (2.6 s, render 1):** the first highlight was still fading when the second appeared. The highlight holds are now shorter, and only one row is lit at a time.
- **Small moving chips (render 2):** `merge #42` was 36 px and `tests pass` 32 px, about 11 px tall at 350 px. They are now 44 px and 42 px. The claim chip stops below the PR edge, clear of the review row.
- **Final hold too long (render 2):** the stillness after the last beat ran about 6 s. The fade now starts at 32.6 s and the duration is 35 s.
- **Request chip over the main card (about 12.1 s, render 3):** the arriving chip covered `main` and the meter for about 0.2 s. The main card now starts at x 330, so the chip fades on the wire beside it. Verified in native crops.
- **Ripple grazing the "main" label (12.6 s, render 3):** the refusal ripple is now smaller and stays clear of the label at full size.
- **Clean on the final encode:**
  - all on-screen words are 40 px or larger, with most at 44–72 px, and every inspected 350 px frame is readable;
  - no stale state: the claim and the first refusal clear before the run;
  - every visible event has a cue, 24 in all, and each shows as a spectrogram onset;
  - the first refusal is the loudest cue (−2.9 dBFS), the overall peak is −2.0 dB, and nothing clips.

## Suggested improvements (ranked)

1. **Fill the empty case area early** (0–16 s, size S). The space between `access` and `review` is blank until the run starts. Showing faint, empty case rows from the start would tell the viewer up front what evidence the check needs.
2. **Mark the agent's role** (7 s, size S). The `AI` disc carries the agent identity. A short role tag would make the bypass flash read faster, but it would add a word; judge it in review.
3. **Listen to the cues** (whole video, size S). The audio was measured but not heard. Check that the thumps are not harsh and that the `miss` reads as no effect.
4. **Use the space below the refusal line** (y 1770–1900, size S). Lowering the agent and `main` group by about 40 px would balance the stage.

## Notes for the skill (not acted on)

- `icon` and `statusrow` are general: status by shape and colour, with a name and value. They could join the shared node set.


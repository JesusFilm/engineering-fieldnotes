# Join before deciding review (render 1)

Reviewed from encoded frames (40 timestamps covering every beat, delivery, receipt and blocking boundary, at full size and native 350 px), the contact sheet, the spectrogram and level analysis. Audio was analysed only, not listened to.

## Fixed before handover
- The final hold in the pre-render stills ran 7 s with nothing changing (29–36 s). The fade now starts at 34.4 s and the video is 37 s.
- No other objective faults were found in the encoded frames. Labels, chips and outlines stay clear of each other at native 350 px. The 0.3 s amber-to-white receipt cross-fade at 20.3 s is a deliberate transition.

Checks after the fixes:
- At 12.4 s only the API row is received and the release reads `WAITING` / `Needs migration report`.
- At 20.9 s `BLOCKED` is visible while the count still reads `1 / 2`; the risk is not delayed by the count.
- From 22 s, `Reports 2 / 2 complete` coexists with `BLOCKED`.
- No green or approved state appears at any point. Both findings persist to the fade.

## Suggested improvements (optional, ranked)
1. **API completion mark** (1.5 s onward, S). Saw: a blue ✓ beside `finished`; a beginner might read it as "passed". Change: replace it with a filled square or no mark. Effect: keeps execution completion distinct from approval.
2. **Column dividers** (all, S). Saw: the matrix columns are aligned only by text; `Migration` sits close to `received` at 350 px. Change: faint vertical dividers between columns. Effect: easier scanning on a phone.
3. **Gutter clearance** (3.3 s, 19.5 s, S). Saw: the API / MIG chips touch the coordinator panel's outer border while descending the gutters. Change: narrow the panels by 20 px or shorten the chips to `A` / `M`. Effect: cleaner travel.
4. **Early-blocker note** (17 s, M). Saw: the risk is found before the report arrives; the release stays `WAITING` until delivery. Change: none needed for accuracy, but a brief worker-to-coordinator delivery right at 17.5 s would shorten the gap. Effect: the blocker reaches the assessment sooner.
5. **Empty lower stage** (all, S). Saw: about 300 px of unused space below the release panel. Change: enlarge the matrix rows and release text by about 10%. Effect: better phone legibility.

## Notes for the skill (optional)
- This cut's engine copy adds third-column text, per-cell outlines and a `sweep` (indeterminate activity) node to the helpers copied from motion-v2/03. Not acted on.

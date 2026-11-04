# Tool design 04 — encoded comparison

**Decision: pass.** Prefer the local candidate for lesson 04, “Empty versus failed.” The sampled encode clearly distinguishes successful empty results, failed execution and a transport timeout without a tool result. No reproducible objective blocker was found. This is a local review decision, not publication approval.

## Grounding and method

Compared against item 4 of `video/tool-design/sequence/lessons.json`: a completed empty search supports no matches in its scope; a timeout does not; preserve execution errors and caller-observed transport failures. Earlier planning context was acknowledged. No author source or self-review was consulted.

Viewed individual native 350 × 622 frames, not a contact sheet: candidate periodic samples 001–009; baseline 001, 003, 004, 006. These periodic extracts use ffmpeg `fps=1/5`; filenames are sample numbers, not exact timestamps. Additional exact frame-index extracts were inspected at candidate 4, 6, 20, 22, 23, 24, 25, 29, 35, 36, 38 and 44.5s; baseline 7.3, 14.3 and 21.3s. Candidate 25s was also inspected at full resolution. All decoded media and extracts remained local.

Alternate extraction used full-stream frame-index selection into full-size PNG, followed by Pillow Lanczos resizing to 350px JPEG, separately from the periodic ffmpeg scaling route. The apparent missing portions of static text in some displayed small images were not flagged: the full-size 25s image contains the complete labels. The suspicious empty result following a timeout was independently reproduced and examined through its rejection/correction, rather than classified from one still.

This is sampled frame/transition inspection plus complete computational decode, not continuous video playback. Audio was analyzed, not heard.

## Comparison

| Aspect | Candidate | Baseline |
|---|---|---|
| Causal clarity | Side-by-side runs preserve the completed case while a second run reaches its deadline. Explicit bad mapping produces a bad answer, then both are rejected and corrected. | Clear search → result → model stack; captions carry much of the distinction. |
| Accuracy | Successful empty output retains scope; failure becomes unknown; transport variant explicitly has no tool result. | Correctly distinguishes empty success and error; does not visually develop the transport-no-result nuance. |
| Pace | 46s allows completion, empty evidence, failure, incorrect interpretation, correction and a final alternative. Reading holds are deliberate. | 28s, four orderly stages; simpler and quicker, but less concrete. |
| Native 350px legibility | Main fields and conclusions readable. Secondary headers/deadline labels smaller but usable. Two result columns fit the short fields. | Main labels and two-line explanatory captions readable. |
| Meaningful variety | Deadline strips, retained comparison, result fields, rejection mark and disappearing response each carry meaning. No unnecessary physical metaphor. | Repeated three-box layout and traveling chips; adequate direction, less state-specific geometry. |

## Timestamped observations

- **4–6s:** Run A has completed before its successful empty result settles. Its elapsed strip ends before the labeled deadline; this reads as time-to-completion rather than a half-finished search.
- **Periodic sample 003:** scope and `A: no matches in scope` are highlighted together. The claim is bounded to the displayed payments interval.
- **20s:** B reaches the deadline and is marked `timed out`, while A remains completed. Separate A/B labels keep A's correct conclusion from being mistaken for B's.
- **22–24s:** the film deliberately shows the bad adapter behavior: B receives gray `status: ok`, `items: []`, followed by `B: no matches`. This is briefly ambiguous until the next cue, but it is not the final lesson state.
- **25s:** a red cross and border reject B's result, while the incorrect answer is highlighted red. The full-resolution and alternate 350px extraction confirm this correction cue. Thus the temporary incorrect mapping is a demonstrated anti-pattern, not an unresolved factual error.
- **29s:** B now has `status: error`, `code: TIMEOUT`, `isError: true`; its incorrect conclusion has been removed. A's successful empty result remains intact.
- **35s:** the answer retains `A: no matches in scope` and `B: unknown · timed out`. The different evidence leads to different conclusions.
- **36–38s:** B's result border becomes dashed, fields disappear, and `transport timeout` / `no tool result` replace the error-response state. No error payload remains in the settled transport state.
- **44.5s:** the final comparison holds with A's bounded absence and B's uncertainty. Two B uncertainty lines are redundant but consistent, not contradictory.
- **Baseline boundaries:** 7.3s transfers `OK: []`; 14.3s resets the new call to unknown as the search times out; 21.3s transfers `SEARCH FAILED`. Its final sampled answer is uncertain, matching the intended lesson.

## Accuracy and review limits

The sample application fields are illustrative; `status`, `code` and `items` are not mandatory MCP fields. `isError` represents execution-error signaling. A transport timeout can leave the caller without a tool result and does not establish what the backend ultimately did. The film's elapsed bars prescribe no numeric production timeout. Neither the successful query nor its bounded answer proves source completeness or absence of all real incidents.

The transition to transport timeout is an illustrative alternative, not evidence of another executed request; a short “alternative” label would make this more explicit. No later pagination or retry lesson is needed to understand the outcome distinction.

## Technical checks and audio

Both complete decodes returned exit 0 with no reported errors. Both files are 1080 × 1920; candidate 46s / 30fps / 1380 frames, baseline 28s / 20fps / 560 frames. Both place `moov` before `mdat`.

Signal measurements: candidate mean −33.3dB, maximum −5.3dB; baseline mean −41.3dB, maximum −10.5dB. Neither measured peak approaches clipping. **Actual audio was not heard.** These measurements do not establish actor-specific timbre, audible synchronization or comfort.

## Optional refinements, not blockers

1. Identify the bad empty-result mapping as incorrect immediately on appearance, reducing the brief ambiguity before the 25s rejection.
2. Label the transport case as an alternative and consolidate its duplicate B answer lines.

No repair or media edit was made. A changed encode requires renewed actual encoded inspection bound to its new hash, not replacement of this hash alone.

## Before/after hashes

**Candidate** `video/tool-design/motion-v2/04/video.mp4`

- Before: `a3341577bcb5d6d213b4f0d6ad39fd895e3f90b11e6351b10ed705cf4e08a496`
- After: `a3341577bcb5d6d213b4f0d6ad39fd895e3f90b11e6351b10ed705cf4e08a496`
- Unchanged: yes.

**Baseline** `public/lessons/tool-design/04.mp4`

- Before: `8914bb38a231e49887d2e661edaf0327f90521dfbcf57925b3326ca0ea2bf85c`
- After: `8914bb38a231e49887d2e661edaf0327f90521dfbcf57925b3326ca0ea2bf85c`
- Unchanged: yes.


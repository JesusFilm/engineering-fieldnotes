# Video 03 encoded comparison

## Finding

The candidate is a substantial improvement in concrete execution, retained evidence, revision identity, phone legibility of the main data, and meaningful composition changes. Its strongest moment is the new revision appearing while the original failed run stays attached to the old revision. That makes the need for fresh evidence visible rather than a caption claim.

One intended-mechanism gap remains: the return to the agent visibly carries **exit status and revision only**, not the captured output or an explicit reference to the complete run. The run retains output correctly, but the encoded handoff does not demonstrate that output being supplied to the agent. Treat this as a teaching-completeness blocker for the requested mechanism, distinct from media corruption or a claim about unseen implementation. Optional polish is listed separately. No publication decision is made.

## Artifacts and method

Reviewed 2026-10-20. Observations bind to these exact bytes:

| Cut | Path | SHA-256 | Encoding |
|---|---|---|---|
| Candidate | `video/harness-engineering/motion-v2/03/video.mp4` | `3af7092dbfc1a8eb4378f5770971b0477708704f2c37f678b0e88a25a8517940` | 1080×1920 H.264, 30 fps, 41.100 s video; 41.111 s container; AAC audio |
| Existing | `public/lessons/harness-engineering/03.mp4` | `165f5e173bb6ac34c115a0dbf69329b4c6881ddef4098a435cd2374f129e05fc` | 1080×1920 H.264, 20 fps, 28.000 s; AAC audio |

Earlier planning context was present. No authoring source, author review, scores, or other reviews were read for this comparison. Inspected only the encoded cuts and derived evidence.

Inspection included whole-duration overview sheets sampled every three seconds; candidate native frames at 24 and 36 s, existing native frame at 9 s; individual 350×622 frames at candidate 24 and 36 s and existing 16 s; and half-second transition sequences. Candidate transition windows begin at 1, 8, 13, 17, 20, 23, 29, and 34 s; existing windows at 7, 14, and 21 s were inspected. Each motion sheet covers three seconds, reading left-to-right, top-to-bottom. Event boundaries inferred from sheets are approximate within 0.5 s. Exact sought stills have timestamps in their filenames.

Overview sheets were displayed reduced. Legibility conclusions use native/individual 350 px stills and the 350 px frames in motion sheets. Motion inspection was timestamped frame-sequence comparison, not uninterrupted real-time playback; it establishes causal order, geometry, and approximate timing but not frame-perfect smoothness. Audio was decoded and measured, **not listened to**. Sound character, actual audibility, and event synchronization are unverified.

Evidence files are under `scratch/03/`: hash records, probe JSON, decode/audio logs, overviews, native/350 stills, and transition sheets. Hashes were rechecked at completion.

## Mechanism comparison

| Aspect | Candidate evidence | Existing evidence | Assessment |
|---|---|---|---|
| Claim versus execution | Approximately 2–4 s: `"tests passed"` is explicitly marked `claim`, while revision A has `no run`. Around 6–10 s a real command request replaces it and opens Run #1. | Opening phase: `TEST COMMAND` moves to Test runner; caption explains execution. No unsupported claim is contrasted visually. | Candidate provides a useful contrast between saying and doing. The early claim’s travelling chip is less self-explanatory than the static claim/no-run pairing. |
| Actual run | Around 11–17 s: `$ npm test`, activity, `running`, and sequential output `8 passed`, `1 failed`, `export: FAIL`. Around 18 s activity ends and `exit 1` appears. | Roughly 2–7 s: a progress bar fills, followed by `EXIT + LOG` at 7–9 s. No actual command or output values are shown. | Candidate shows observable execution and separates output from process termination. |
| Retention | Around 20 s: run becomes `retained`; command, output, exit status, and revision all remain visible. At 24 s these are readable together. | At 9 s, Run record reads `evidence saved`; its contents are not visible. | Candidate clearly retains both required evidence components. Saving does not turn failure into success. |
| Tested revision binding | Run header says `rev a61c9e2`, attached beneath the matching revision. This identity survives panel narrowing and the new patch. | At 14–20 s, Run record changes to `revision + result`; caption explains association. | Candidate demonstrates identity rather than merely naming the association. |
| Supplied observation | Around 21–23 s the travelling chip says `exit 1 @ a61c9e2`; at 24 s the Agent panel repeats it with `observed`. The output remains only in Run #1. | At 21–23 s, generic `OBSERVATION` travels from Run record to Agent; caption says to return evidence. | Candidate establishes an observed nonzero outcome, but does not visibly return the output. Existing is too abstract to verify either component. See blocker below. |
| New patch needs own evidence | Around 27–32 s, `patch -> b84d102` precedes the new revision and current-selector movement. At 34–36 s, B says `no run`; A keeps its failed run and `for a61c9e2 only`. | At 14–20 s, the caption states that a new patch needs new evidence, but no new revision or empty evidence state appears. | Candidate’s decisive improvement: current code moves; old evidence does not. No second execution is necessary to communicate the missing evidence. |

## Accuracy and causal clarity

The candidate distinguishes a failed run from an absent run: A has red output and `exit 1`; B has a neutral dashed `no run` placeholder. The old evidence is preserved rather than erased, transferred, or declared false. This correctly limits the observed result to the tested revision. The new patch is not shown as fixed or passing.

The changing current ring and stationary attachment carry meaning even without the explanatory subtitle. The record’s content remains unchanged when its width contracts around 25–28 s. The hashes match across revision node, run header, returned status, and final limitation label.

A revision identifier alone is not a complete reproducibility guarantee: uncommitted changes, dependencies, configuration, and external state can matter. The animation can reasonably illustrate immutable tested snapshots, but supporting teaching should state that assumption. `exit 1` represents the invoked command’s unsuccessful exit, not a universal diagnosis. Neither the initial claim nor retained results should imply overall correctness.

## Blockers and objective checks

### Teaching-completeness blocker: output is not visibly supplied

**Candidate 21–25 s; especially native and 350 px frame at 24 s.** The only returning content is `exit 1 @ a61c9e2`. The receiving Agent panel contains that same status summary. `8 passed`, `1 failed`, and `export: FAIL` stay in the retained record; there is no visible record reference in the received observation and no shared-observation treatment connecting the full transcript to the agent.

The observed absence is objective; classifying it as a blocker is an editorial judgment against the explicit requirement that retained output plus exit status be supplied as observation. It does **not** establish that an unseen implementation omits logs. The video itself must make the handoff legible.

Suggested correction: have the receiving observation include a short concrete output line such as `export: FAIL`, alongside `exit 1` and the tested revision, with the retained record still visible. Alternatively, visibly supply/open `Run #1` as a complete observation containing all three. Reveal received evidence intact at arrival, rather than typing a new summary. Avoid a dense log dump or explanatory paragraph. Verify that the agent is visibly given more than a bare exit code.

### Technical checks

No decode error, clipped essential stable text, mismatched hash, or incorrect result mutation was found in inspected evidence. Both complete streams decoded. Peak audio levels were −6.2 dBFS candidate and −10.5 dBFS existing, below clipping. Mean levels were −32.5 and −41.3 dB, respectively; these include silence and do not establish perceived loudness. No sound-quality approval is implied.

The finite ending and deliberate holds are not loop defects. Continuous-motion playback and audio listening remain verification limitations.

## Pacing, legibility, and meaningful variety

**Pacing:** The approximately 41 s candidate earns most of its additional 13 s through a claim/observation contrast, concrete run output, and a genuinely new revision state. Individual result lines appear slowly enough to read, the completed run holds before return, and the final no-run contrast has several seconds before the fade. The 8–11 s expansion spends noticeable time showing an empty enlarged outline before the command/output begins; this can be tightened without compressing the substantive steps. Existing is shorter, but its 14–20 s revision section is effectively a static state plus explanatory text.

**350 px:** Candidate’s principal text is unusually strong here: command, output, `exit 1`, both hashes, and `no run` remain readable in the final narrow layout. Native 36 s confirms that `export: FAIL` fits without clipping. Small grey Agent statuses (`claim`, `request`, `observed`, `edit`) and the subtitle are weaker, but the main evidence does not depend on reading every qualifier. Existing’s actor labels and paragraph captions are readable; however, there is no concrete data to inspect. Candidate provides more useful information at comparable phone readability.

**Variety:** The revision graph, moving current selector, growing and narrowing transcript, and persistent historical attachment provide meaningful variation beyond generic box routing. The expansion lets one run occupy the stage; narrowing creates room for a contrasting revision without shrinking its text. Rectangles and travelling chips remain, particularly in the agent handoff, but they no longer define the entire lesson. This is a mechanism-specific composition, not a relabelled three-box flow or a static form filling in from top to bottom.

## Optional improvements

1. **Strengthen the claim/no-run contrast without an unexplained flight** — candidate 2–5 s, size S. The quoted claim moves down the right side while the run position stays empty. Emphasize the quote and empty position in succession, or end the attempted claim transfer visibly beside the unchanged no-run state. This would clarify that a claim creates no execution record without introducing a physical barrier metaphor.
2. **Use less time on the empty expansion** — candidate 8–11 s, size S. Reveal the run identity and command during the expansion, or shorten the empty-outline phase while keeping later output holds. This makes the motion feel like opening a concrete run rather than decorative resizing.
3. **Enlarge the role qualifiers selectively** — candidate 2–27 s, size S. Increase `claim` and `observed` particularly, maintaining the larger payload text. These two labels establish the epistemic contrast; they deserve more prominence than `request` and `edit`. Do not add paragraph captions.

Only this report and scratch evidence were written. No scene, media, publication metadata, or subsequent lesson was changed.

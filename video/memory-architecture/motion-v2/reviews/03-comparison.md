# Memory architecture 03 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Save a useful record.” It concretely distinguishes a supported command from an unsupported hypothesis, preserves source and revision in the saved record, and demonstrates selective retention. No reproducible objective blocker was found in the inspected encode. This is a local recommendation, not publication approval.

## Scope and method

Grounding: item 3 of `video/memory-architecture/sequence/lessons.json`: propose a useful fact, check support and scope, retain provenance/revision, and save only what policy permits. Earlier planning context was acknowledged. No author source or self-review was read.

Viewed actual individual 350 × 622 images: candidate periodic samples 001–009, baseline 001, 003, 004, 006. Periodic extraction uses ffmpeg `fps=1/5`; sample filenames are not exact timestamps. Also inspected exact frame-index extracts at candidate 10, 14, 18, 20, 24, 26, 29, 30, 31, 34, 36, 38, 41 and 44s, and baseline 7.3, 14.3 and 21.3s. Candidate 38s was inspected full-size. This is sampled visual/transition review and complete computational decoding, not continuous playback.

Alternate extraction selected exact frame indices into full-size PNG, then used Pillow Lanczos to generate native350 JPEG, independently of periodic ffmpeg scaling. Apparent static text omissions in some displayed images were not classified as encoded defects. Full-size 38s confirms complete session labels, policy target, and all five saved fields. No missing-text blocker is asserted.

## Comparison

| Criterion | Candidate | Public baseline |
|---|---|---|
| Causal clarity | A specific source supports a specific command; source/revision populate its record; policy evaluation precedes saving | Abstract session → policy → memory flow, with explanation mainly in captions |
| Accuracy | Hypothesis stays thread-only; command retains repo, key, value, source and revision; one of three candidates is saved | Correct command/revision concept but no explicit rejected example |
| Pacing | 45.6s allows separate proposal, support check, rejected guess, provenance, saving and scope-rejection stages | 28s with four approximately seven-second phases; concise but less concrete |
| Legibility | Essential short labels and values readable at native350, with modest secondary text; no paragraph captions | Readable larger box labels and two-line captions |
| Meaningful variety | Source excerpt, candidate rows, policy indicators and a persistent record editor each expose different evidence/state | Mostly fixed three-box structure and a moving command/revision chip |

## Timestamp evidence

- Periodic samples 001–002 establish `billing / AGENTS.md`, r1 and `Test: npm test`. The session proposes the command alongside `flaky e2e?` and `tabs > spaces`; the record initially lacks source/revision and saved count is zero.
- **10–14s:** policy targets test_cmd. Source becomes AGENTS.md, useful/supported checks appear, and repo/key highlight makes intended scope inspectable. No saved state appears yet.
- **18–20s:** policy target changes to guess. Useful can pass while supported fails; the hypothesis is not promoted to the command record. Its question mark remains.
- **24s:** the guess is marked thread-only and policy returns to test_cmd. All three command eligibility checks pass.
- **26–29s:** revision r1 arrives and the complete record holds as proposed. This preserves applicability metadata before writing.
- **30s:** status explicitly reads saving. **31s:** record becomes saved, command gets saved status, and count changes to `candidates 3 · saved 1`. The write is not depicted as complete while still pending.
- **34–38s:** the preference is evaluated separately, ultimately fails in-scope and becomes not saved. The command record remains saved, with its own unchanged fields.
- **41–44s:** policy indicators reset to idle, while the saved command and three distinct candidate outcomes persist. Idle policy checks do not undo the completed write; they indicate no active candidate evaluation.
- **Baseline boundaries:** 7.3s shows policy's repo/revision command; 14.3s transfers COMMAND + r1; 21.3s shows the retained r1 command and the selective-retention caption. Correct but less demonstrative of eligibility failures and provenance structure.

## Accuracy limits and refinements

The policy criteria are an illustrative application design, not a memory-store guarantee. A source path and revision make the saved command traceable; they do not prove it executes successfully, remains current, or is authorized for every reader. The film performs no test execution or later revision comparison. Thread-only does not mean deleted or necessarily volatile.

The preference's supported check is an assumed property of the example, not visibly traced to a source. It is ultimately rejected and never saved, so this does not invalidate the supported-command mechanism. A short source/user-preference label would improve its explanation. The selected target labels test_cmd/guess/pref correctly distinguish the policy state from the command record beneath, though expanding that target label would reduce interpretation effort.

Optional improvements only:

1. Label the active policy target more explicitly, particularly during the preference check while the saved command remains below.
2. Establish the preference's support briefly before showing its supported check.

No reproducible essential held-text clipping, collision or incorrect final stored value was found. These refinements are not blockers.

## Technical and audio checks

Both full decodes returned exit 0 with no reported errors. Candidate: 45.6s, 1080 × 1920, 30fps, 1368 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both place moov before mdat.

Signal analysis: candidate mean −35.2dB / maximum −8.5dB; baseline mean −41.7dB / maximum −10.5dB. Measured peaks leave headroom. **Audio was not actually heard.** Frame/signal inspection does not establish audible synchronization, actor-specific timbre or listening comfort.

No media edits or repairs were made. Any changed encode requires renewed encoded inspection bound to its new full hash, not merely replacement of the hash in this decision.

## Hash binding

**Candidate** `video/memory-architecture/motion-v2/03/video.mp4`

- Before: `3cf048d696ad243427ddc183a76cd2769ce273296334112b0b0d81e8b2468eba`
- After: `3cf048d696ad243427ddc183a76cd2769ce273296334112b0b0d81e8b2468eba`
- Unchanged: yes.

**Baseline** `public/lessons/memory-architecture/03.mp4`

- Before: `3e86d964bf9538bb26afaba2eb635f46728c3f1aaba45b2806f2bfc6d60bc7e3`
- After: `3e86d964bf9538bb26afaba2eb635f46728c3f1aaba45b2806f2bfc6d60bc7e3`
- Unchanged: yes.


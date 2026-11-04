# Video 05 — encoded-first comparison

Reviewed 2026-10-20. **Recommend the 35-second candidate for the intended mechanism. No reproduced objective candidate blocker was found.** It shows rejected updates before and after real check execution, while keeping the branch unchanged and review independently pending. This is materially clearer than the published cut's green overall merge-path ending.

## Artifact binding and inspection

| Artifact | SHA-256 before and after inspection | Duration |
|---|---|---|
| `video/harness-engineering/motion-v2/05/video.mp4` | `547b41b8c34e4dcdeb6886b964c627d0fe99ed3145262291910e30d972cc3ca3` | 35.000s |
| `public/lessons/harness-engineering/05.mp4` | `e2bf45daea1932b22820c0b1b97336caca6c33d38274e0f6c767fef2f3bed34f` | 28.000s |

**Not stale at completion:** hashes match the initial samples and the user's specified final candidate hash. All candidate samples are from the 35-second encode, not an earlier longer cut. Any subsequent hash change invalidates this comparison for the new artifact.

Inputs were the intended mechanism and these two encoded files. No author scene/source, author reviews, production.json, other cuts, or other plans were read for this comparison. Author verification is not used as evidence of quality.

Both files fully decoded using `ffmpeg -v error -i INPUT -f null -`: exit 0, no error output. Probe results, hashes, and alternate extraction checks are in [scratch/05/inspection.json](scratch/05/inspection.json). Encoded frame inspection included individual full-resolution 1080×1920 images and individual native 350×622 reductions, not only overview sheets. Specific full-resolution frames viewed: candidate 12s and 29s, published 24s. Individual 350px frames viewed: candidate 3, 12, 21, 24, 29s and published 24s. Timed transition strips were inspected at half-second intervals over candidate 10–13, 21–25, and 26–30s. Three-second overview sheets supplied broader context. Extracted `native-T` and `350-T` filenames identify exact requested seconds; numbered 1fps files are sample indices.

To guard against image-display artefacts, independently decoded candidate 12/21/24/29s and published 24s using output seek and compared RGB pixels with the input-seek PNGs: all matched exactly. Candidate 12/24s and published 24s were also decoded directly into padded JPEG displays. Some image displays showed inconsistent missing strokes/text; these are **not reported as encoded defects** without supporting pixel evidence. The 29s full-resolution and individual 350px views establish the final requirement state clearly. No claimed visual corruption is a basis for this verdict.

Audio sample-peak analysis: candidate −2.0dB, published −10.2dB, neither clipping by that measure. Audio was analysed, **not listened to**; perceptual sound quality/synchronization remains outside this review. This was sampled encoded-frame and transition inspection plus full decode, not a claim of continuous audiovisual playback or exhaustive frame-by-frame visual certification.

## Mechanism and causal sequence

The target is a configured required check, evidence for the current revision, a claim that cannot substitute for execution, controlled bypass permissions, and independent review that still blocks advancement.

- **Configuration, ~0–5s:** the candidate shows `Branch rule · main`, required `access`, required review `1 approval`, and bypass `maintainers`. Sequential highlights introduce the policy. PR #42 identifies `head d73`; access has no result and review is pending. This is an explicit configured rule rather than a prompt asking for tests.
- **Claim versus control, ~6–13s:** the AI's `"tests pass"` bubble does not change access or the `0 of 2 met` indicator. A `merge #42` request travels to main and is rejected for missing access evidence. The branch tip remains b10. The transition sequence shows an attempted operation with a denied effect, not merely a static “blocked” label.
- **Execution and matching revision, ~17–24s:** access runs on d73; own-tenant and other-tenant cases complete sequentially. At 21s the second case is still running and the overall check is unsatisfied. Both cases finish before `passed · d73` appears and the requirements indicator becomes `1 of 2 met`. The current head and checked revision remain visible together. No green result is inferred from the earlier assertion.
- **Independent review, ~26–31s:** a second merge request is rejected with `needs review`; the pending review row and required-review rule are highlighted. Access stays passed, the requirements bar stays partial, and main stays at b10. Passing the scoped check does not make the whole change mergeable.

The published cut supplies the general sequence “unverified patch → required check → recorded pass.” Its captions mention current evidence and other review requirements. However, it does not show a concrete revision ID, named policy or bypass role, a claim-versus-execution contrast, or a denied update. At 24s `MERGE PATH / gate satisfied` turns green while `PATCH / review pending` remains above it. The caption qualifies that other requirements still apply, but the overall merge-path visual leaves the wrong emphasis for this specific brief.

## Comparative assessment

Scores are editorial judgements on a 1–5 scale, not factual proof: 1 absent/unclear, 3 usable with limitations, 5 especially clear.

| Axis | Candidate | Published | Rationale |
|---|---:|---:|---|
| Causal clarity | 5 | 3 | Two actual rejected update attempts and stable main b10 show the consequence of each unmet requirement. The published flow mostly moves labelled chips between generic boxes and relies on captions. |
| Accuracy against the intended mechanism | 4 | 3 | Candidate separates policy, claim, d73 execution, result and review. Bypass is explicitly role-controlled. Published preserves a review-pending label but its overall green merge-path state is ambiguous. Neither animation proves a real repository configuration. |
| Pace | 4 | 3 | Candidate fits five understandable phases into 35s, with sequential case completion and time to read the final denial. Published is shorter at 28s but has longer stretches of generic state with explanatory captions. Candidate's opening policy is the densest reading moment. |
| Legibility | 4 | 4 | Both read at native 350px in the inspected frames. Candidate uses short meaningful labels, visible revision IDs, distinct pending/running/passed states and large rejection messages. Its case subrows and policy are denser; published has simpler geometry but more caption reading. |

Candidate evidence: [configuration, 3s](scratch/05/candidate-350-3.png), [claim and attempted update, 12s](scratch/05/candidate-350-12.png), [running second case, 21s](scratch/05/candidate-350-21.png), [review still blocks, 29s](scratch/05/candidate-350-29.png), [29s full resolution](scratch/05/candidate-native-29.png). Published ending: [24s at 350px](scratch/05/published-350-24.png), [24s full resolution](scratch/05/published-native-24.png). Published ending wording/state was independently reproduced with an alternate extraction before making the comparative criticism.

## Objective blockers versus optional improvements

**Candidate objective blockers: none reproduced.** No evidence of premature overall success, branch advancement while review is pending, or accepting the claim as a result was found in the inspected sequence. Both files decode cleanly. Do not treat this as an audit of live enforcement, an audio-listening sign-off, or certification of every unsampled frame.

The published cut's missing explicit configuration/bypass and claim contrast are limitations against this brief, rather than technical playback defects. Its green merge-path ending is a pedagogical ambiguity, not proof that it asserts all review requirements have been satisfied: the caption explicitly says otherwise. These distinctions favour the candidate without inventing an objective corruption blocker for either file.

Optional candidate refinements, not required for recommendation:

1. **~0–5s: make the actor's bypass relationship explicit if beginners struggle.** `bypass maintainers` plus rejected AI updates implies this actor has no bypass permission. A short actor-role cue could make that connection explicit without adding a separate bypass demonstration. Do not imply the word “maintainer” automatically grants bypass in every real hosting setup; it is the configured role in this example.
2. **~17–24s: retain the revision match as the focal detail.** `head d73` and `running/passed · d73` are readable; a brief synchronized emphasis would strengthen their relationship. No revision change or stale-result rejection is shown, so the cut demonstrates a matching current result, not the separate mechanism of invalidating old evidence. Adding that whole lesson is unnecessary here.
3. **~0–5s: preserve the sequential policy highlights.** If the opening is later shortened, avoid compressing the three distinct settings into one rapid flash. The current 35-second pace is acceptable; further shortening is not required.

For the published alternative, the highest-value optional redesign would retain the final overall path as blocked and show that only the check requirement clears. This is a change to that alternative's teaching, not a request to modify it in this task.

## Accuracy limits and recommendation

The candidate depicts a check runner executing two relevant cases; it does not expose commands, logs, trusted-provider identity, or skipped/neutral-result handling. Thus the video supports the conceptual distinction between an unsupported claim and a recorded current-revision result, not a guarantee that any green hosting badge proves relevant tests ran. Two passing cases do not establish complete correctness. Configured bypass belongs to permissions; the animation does not claim bypass is impossible or demonstrate an authorized bypass. Review remains a separate requirement throughout.

**Recommend this exact candidate encode over the published alternative for video 05.** The meaningful outcome is “one requirement satisfied; merge still rejected,” which is visible in state, motion and branch identity. No media edits, promotion, or manifest changes were performed. Author final verification remains separate from this encoded-first comparison.

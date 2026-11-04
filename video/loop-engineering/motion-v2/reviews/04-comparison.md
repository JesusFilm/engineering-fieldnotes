# Lesson 04 encoded comparison

**Decision: pass.** Prefer the local motion-v2 candidate for teaching this lesson. No reproducible objective blocker was found in the inspected frames. This is a review recommendation, not a publication action.

## Scope and method

Compared `video/loop-engineering/motion-v2/04/video.mp4` with `public/lessons/loop-engineering/04.mp4` against lesson 04, “No tests is not a pass,” in `video/loop-engineering/sequence/lessons.json`. The required chain is: a mistyped selector selects nothing; no behavior was checked; under this repair-only policy stop code edits; preserve command and selection evidence for an engineer to repair setup. Assertion failure, collection error, and empty selection must remain distinct.

Earlier planning context was acknowledged. No author source, self-review, production ledger, other plans, or provenance was consulted for this comparison. Visual conclusions come from encoded frames, not plan compliance. Individual 350×622 frames were displayed at their native extracted size, not combined into contact sheets. This was sampled visual inspection plus a complete computational decode, not continuous audiovisual playback.

Evidence lives in `scratch/04/`: metadata and before/after hashes in `inspection.json`; per-video probes, audio analysis, one-second sampling, exact-time frames, and alternate frame-index extractions. Inspected candidate numbered samples: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 37; baseline: 2, 6, 9, 13, 16, 20, 23, 27. These fps-filter sample numbers are not exact timestamps. Additional individually inspected candidate exact-time samples include 8.5, 9.5, 12.5, 14.5, 18.5, 24.5, 31.5, and 37.1 seconds; baseline alternate samples include 14 and 23.5 seconds. Full-resolution candidate frames at 18.5 and 24.5 seconds were also examined.

## Comparison

| Criterion | Candidate | Public baseline |
| --- | --- | --- |
| Causal clarity | Concrete `pytest -k discunt` selector contrasted with `discount` test names; collected, selected, ran, and failed counts distinguish available tests from evidence. | Clear verbal explanation and actor handoff, but no concrete command or count distinction. |
| Accuracy | 12 collected, 0 selected, 0 ran, 0 failed; never asserts a pass. Empty selection routes to stop/engineer and no patch is made. | Correctly says no behavior was checked and stops edits under this policy. |
| Pacing | 37.2 seconds provides separate time for selection, count interpretation, decision, and evidence handoff. Final record remains readable before a finite title ending. | 28 seconds; four caption-led stages are readable but carry more of the teaching burden. |
| Phone legibility | Main command, zero selection, counts, stop state, and title are clear at 350px. Secondary labels and handoff record are small but readable with the hold. | Larger sentence captions and sparse boxes are easier to scan, with less concrete information. |
| Meaningful variety | A filtered test list becomes a numerical result, then an outcome-routing view and preserved evidence record. Persistent state supports each change. | Repeated AGENT / TEST RUNNER / ENGINEER boxes and moving tokens establish responsibility, with less mechanism-specific geometry. |

## Observed transitions and teaching

- Early samples show test names and the collected count reaching 12. Matching `discount` substrings and the mistyped `discunt` selector make the mismatch inspectable. At 8.5 seconds the list is fading; by 9.5 seconds `0 selected` and `no matches` replace it. Tests disappearing signifies filtering, not deletion.
- By 12.5 seconds the executed count is zero. At 14.5 seconds the zero-failed card briefly has teal emphasis while zero-selected and zero-ran remain amber. At 18.5 seconds failed is neutral and explicitly marked `not a pass`. Zero failures is numerically compatible with zero executions; it is not verification. The persistent title also rejects a pass. The color choice is an optional clarity refinement, not an objective false assertion.
- Around the next stage the outcome table distinguishes assertion failure, collection error, and empty selection. At 24.5 seconds the empty-selection row is active and the repair-only state reads `edits stopped`. The inactive rows are compact orientation, not additional repair workflows being performed.
- At 31.5 seconds the engineer record preserves `pytest -k discunt`, collected 12, selected 0, ran 0, and `setup check pending`; the stopped state says `no patch made`. This makes the handoff actionable without depicting an unauthorized fix or claiming a later successful test run.
- Later samples hold the record before the scene resolves to the title at 37.1 seconds. A finite ending is appropriate; a seamless loop is unnecessary.
- Baseline boundary evidence at 14 seconds shows `stop edits` and the instruction to keep command/output. At 23.5 seconds its final caption assigns the setup repair to an engineer. Both cuts preserve the policy, but the candidate shows the actual evidence rather than only naming a log token.

## Accuracy limits and alternate extraction

The test pane and four counters are a teaching abstraction, not a verbatim pytest terminal transcript or a claim about its exact exit code. The collection-error row does not demonstrate its repair procedure. The stop action is tied to the displayed repair-only policy, not presented as a universal prohibition on correcting selectors. Neither cut proves that software is correct or that setup has already been repaired.

Some displayed PNG views appeared to omit persistent text or panels. These were checked using independent frame-index extraction at original resolution and Pillow scaling, rather than relying only on seek-based FFmpeg scaling. At 18.5 seconds the full-resolution view retained the title/pane; at 24.5 seconds a JPEG display of the independently extracted frame retained the complete title, selection pane, counts, and engineer panel where a PNG display had appeared incomplete. Missing-element appearances were inconsistent across views and are not recorded as encoded defects. The teal zero-failed emphasis is visible in the independent 14.5-second extraction and is assessed above on its actual teaching meaning.

## Technical verification and audio limits

| Check | Candidate | Baseline |
| --- | --- | --- |
| Encoded duration | 37.200 s | 28.000 s |
| Video | H.264, 1080×1920, 30 fps, 1116 frames | H.264, 1080×1920, 20 fps, 560 frames |
| Audio | AAC, stereo, 44.1 kHz | AAC, stereo, 44.1 kHz |
| Complete decode | Exit 0; no errors | Exit 0; no errors |
| Analyzed mean / maximum level | −32.3 / −4.4 dB | −44.1 / −13.7 dB |
| Progressive metadata | moov before mdat | moov before mdat |

Audio was **not heard**. Stream presence and level measurements do not establish pleasantness, actor-specific sound quality, or perceptual synchronization. No analyzed peak reaches 0 dB; this is not a listening assessment.

## Optional improvements

1. Keep zero-failed neutral throughout, or show its explicit rejection alongside the initial teal emphasis, to reduce possible success-color inference.
2. Slightly enlarge secondary counter labels and the engineer record at 350px while preserving the final reading hold.

These refinements do not block the current cut. No media was changed. Any repaired or re-encoded candidate requires a fresh encoded inspection and a new hash-bound decision.

## Integrity

Both files were hashed before extraction and after review; each remained unchanged.

- Candidate before: `9d0284db0f8c0f548f86900b18f80f53dc9946715898188eacc3d81134d012cf`
- Candidate after: `9d0284db0f8c0f548f86900b18f80f53dc9946715898188eacc3d81134d012cf`
- Baseline before: `1d410cdd58c93d60a3fb134efe792e7b9d7727401c3b51c3c8aca5fc83345ddf`
- Baseline after: `1d410cdd58c93d60a3fb134efe792e7b9d7727401c3b51c3c8aca5fc83345ddf`

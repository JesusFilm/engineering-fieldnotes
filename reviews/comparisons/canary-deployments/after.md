# Canary deployments — completed independent comparison

Reviewer: **GPT-6.1 Sol**, 2026-10-19. Recommended main entry: **Astra / Split the signal**. Content verdict: **keep / reference**. The final machine-readable result is [canary-deployments.json](../canary-deployments.json).

## Decision and teaching value

Astra changes the reader's release decision most directly: at 00:13–00:16, a green pooled **40/10,000 = 0.4%** still leaves promotion pending; at 00:17–00:20, the same window exposes **0/900 versus 40/100 exports**. The severe candidate-operation regression is both numerically clear and relevant to the chapter exercise. Its large cards survive 350px viewing, and its **FAILED WINDOW** ending explicitly distinguishes retained evidence from current traffic.

Keep both complementary alternatives. Baseline gives the simplest service topology and visible slow-work contrast before the **900/120 = 7.5×** rollback decision (00:09.4–00:18.5). Sol gives the strongest agent-specific lesson: **HTTP 200** and failed required PR tests coexist, then the test failure visibly reaches **STOP** and changes session routing (00:11–00:19). Its actual author is **gpt-6.1-sol**; baseline's original model remains unrecorded, and Astra's author remains **gpt-6-astra**.

| Cut | Clarity | Accuracy | Pacing | Visual | Reason for differences |
| --- | ---: | ---: | ---: | ---: | --- |
| Baseline | 4 | 4 | 3 | 3 | Clear routing and latency; smaller version/ratio text and repeated middle; sample window and gate policy implicit. |
| Astra | 5 | 5 | 4 | 5 | Correct same-window denominator contrast, best phone legibility and historical evidence label; collecting/ending holds are generous. |
| Sol | 5 | 4 | 4 | 4 | Explicit artifact-check enforcement; busy routing burst and more scanning; one failed required check establishes neither a rate nor causality. |

Scores assess each cut's intended mechanism, with illustrative-data boundaries supplied by the guide. None demonstrates statistical sufficiency or every rollout branch. No pass/revision quota was used.

## Independence and coverage

[before.md](before.md) was saved before opening scenes, author identities, transcripts, previous reviews, scores or repair notes. It records fresh inspection of the **current** encodes, not the interrupted review's earlier encodes. [interrupted-before.md](interrupted-before.md) is retained separately.

Inspection covered newly decoded one-second contact sheets for all three durations, native 1080×1920 beat frames, and exactly 350px-wide beat frames. Subsequent checks covered transitions, each scheduled routing packet's busy midpoint, failure/decision/recovery states, and exact encoded endpoints. Additional native frames at Astra 00:14.65/00:20.20 and Sol 00:12.45/00:13.65 confirmed the repaired areas. Evidence is retained in `fresh-scratch/` and `fresh-scratch/final/`. This is decoded-frame inspection, not a claim of continuous real-time or physical-phone playback.

## Transcript and causal-sequence reconciliation

| Cut | Encoded sequence checked against current transcript |
| --- | --- |
| Baseline | 00:00–00:05 control only; 00:05–00:09.4 allocation and three 4:1 cycles begin; 00:09.4–00:15.2 candidate p95/work contrast; 00:15.2–00:18.5 ratio, rollback label at 00:17.4 and share return from 00:18; 00:18.5 onward new work uses control while bad candidate evidence remains; stage fades from 00:24 and title persists. |
| Astra | 00:00–00:05.5 prior window/control; release and new-window collection in 00:05.5–00:13, including two 9:1 cycles; 00:13–00:16.4 pooled result/pending; 00:16.4–00:22.6 same-window export split and blocked promotion; 00:22.6 onward withdrawal/new control traffic with failed evidence retained. |
| Sol | 00:00–00:05 current prompt and required tests; 00:05–00:11 cohort routing with three 9:1 patterns; 00:11–00:16.6 both HTTP responses succeed, artifacts travel through the gutter, control tests pass at 00:12.9 and candidate tests fail at 00:14.1; 00:16.6–00:20.5 gate/return signal; 00:20.5 onward control receives new work and candidate evidence remains failed. |

The current textual sequences match the encoded beats; no fresh transcript rewrite was needed. Traffic dots illustrate allocation, not measured sample size. Astra's 10,000-request window includes other operations: the two export denominators are subsets, not the whole population. Sol illustrates a configured strict required-test gate, not statistical proof that a prompt caused a population regression.

## Corrections and provenance

The interrupted **gpt-6-astra comparative review** had already repaired Astra's 00:14.50 metric-centred ripple into border emphasis, and Sol's text-crossing artifact paths/status ripples into gutter routing and border emphasis. Its Sol send cues are 00:12.00 and 00:13.20; test-result times remain 00:12.90 and 00:14.10. Its baseline transcript timing corrections also remain. Current frames confirm those repairs; original data and valid claims are preserved.

This fresh **gpt-6.1-sol comparative review** found no further substantial scene defect requiring another render. It completed the missing comparison and renewed verification, set the topic variant verification metadata, clarified historical self-review status, and exposed both reviewers' attribution. `model` remains the original author; `previousEditedBy`, `reviewers`, prior corrections and the new metadata-only correction preserve the earlier repair ownership. `editedBy` is now `gpt-6.1-sol comparative review`. The current scenes, MP4s, posters and transcripts were not changed in this fresh pass. Pre-update metadata snapshots remain in `fresh-scratch/`.

Potential later polish, in order: shorten baseline's repeated slow-work cycles while preserving the visible latency contrast; animate Astra's pooled population dividing into export subsets to reduce label dependence; simplify Sol's repeated control arrivals while preserving the artifact-to-gate return path. These are optional motion/pacing improvements, not unresolved objective defects or requests for more explanatory captions.

## Content and primary-source boundaries

**Keep as reference:** this material changes exposure, evaluation and recovery decisions when agent-assisted code or shared agent tooling reaches live users. It need not precede ordinary local AI-assisted coding. The guide's prerequisites, human-owned release limits and local exercise fit that role; mentioning agents alone does not justify core placement.

The primary documents were independently reopened/read in this fresh pass. [sources.md](sources.md) records retrieval date, inspected sections and concise paraphrases. [Google SRE](https://sre.google/workbook/canarying-releases/) supports representative concurrent measurements, operation breakdowns and attribution boundaries. [Argo analysis](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/) supports continue/abort/pause outcomes, while missing-data policy remains configured; its [canary strategy](https://argo-rollouts.readthedocs.io/en/stable/features/canary/) distinguishes timed waits from health evaluation and replica approximation from exact traffic routing. [AWS rollback safety](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/) supports compatibility checks for older readers/new writes. [Anthropic agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) supports evaluating resulting artifacts separately from successful API responses.

Fixture arithmetic is consistent: 40 errors / 10,000 total = 0.4%; 40 / 1,000 candidate requests = 4%; 40 / 100 candidate exports = 40%, against 0 / 900 control exports. The five-percentage-point gate and fixture sizes are authored exercise choices, not sourced universal thresholds. Missing candidate samples or a missing control denominator cannot justify passing. Withdrawal affects new work; it does not repair persisted data, undo external effects, or automatically cancel existing sessions. Shared dependencies can impair both cohorts, and passing tests cannot establish complete artifact correctness. Existing guide boundaries cover these limits; no fresh guide rewrite was necessary.

## Final encoded verification

Fresh mechanical evidence: [fresh-encoded-checks.json](fresh-encoded-checks.json), reproduced with `python3 reviews/comparisons/canary-deployments/fresh_verify.py`. FFmpeg decoder, encoder and filter work was limited to **two threads**. All three files fully decoded without errors; each is H.264, **1080×1920 / 30 fps / yuv420p**, with AAC, zero stream start times and **moov before mdat**. Exact decoded first/last RGB bytes match within each cut. Baseline retains its title at the boundary; the alternatives fade to black. Posters were checked as portrait JPEGs.

| Cut | Duration / frames | Peak dBFS | Scheduled cue windows with energy | Final MP4 SHA-256 |
| --- | --- | ---: | --- | --- |
| Baseline | 26 s / 780 | −10.1 | 71 / 71 | `421cba6f41c861b2e710ac1816cd08a3bb357c6317cdb62ce4c4dfcab30d50e8` |
| Astra | 30 s / 900 | −4.6 | 45 / 45 | `d70bf4b171079a1df38d94c28c12fe7aea62e7e64bece90541b19053aa3ac713` |
| Sol | 28 s / 840 | −3.2 | 85 / 85 | `58d27f9edd463ed9c8ee557349f1589ee4e748e72f2255a3eef5acc9143d5db6` |

All measured peaks satisfy the ≤ −0.5 dBFS requirement. Full-track levels, spectrograms and scheduled cue-window energy were inspected. **Audio was analysed, not heard.** Energy in overlapping windows cannot prove each individual sound is audible or comfortable on hardware. Author verification files describing older media remain historical; the fresh hash-bound evidence above governs this comparison.

Topic-only page generation and media consistency checks were confined to this review's scratch output. The coordinator owns the final whole-library browser and public-site playback pass. No Git, publication, shared build/app changes, installed skill edits or additional agents were used.

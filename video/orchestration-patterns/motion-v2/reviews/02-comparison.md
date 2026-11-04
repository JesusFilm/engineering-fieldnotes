# Route to one specialist — encoded comparison

**Decision: pass.** Prefer the local candidate for concrete beginner teaching. No reproducible objective blocker was established. Optional refinements do not require a repair. No media edits or publication were performed.

## Scope and evidence

Reviewed against `video/orchestration-patterns/sequence/lessons.json` item 2: request and criteria select one suitable specialist; selection does not prove correctness; unclear scope takes a fallback. Earlier planning context was acknowledged. No author source, plan reread, or self-review was consulted for this inspection.

Viewed actual individual 350×622 frames, not a contact sheet: candidate periodic samples 001–007 and baseline 001, 003, 005. Exact candidate frame-index samples: 10, 12, 16, 18, 20, 22, 28, 30, 34 seconds. Exact baseline samples: 8, 18, 22 seconds. Also viewed candidate 18 seconds at full encoded resolution. Periodic filenames are sample indices, not exact timestamps.

Two extraction paths were used: FFmpeg periodic scaled PNGs; and full decode with frame-index selection into full-size PNGs followed by Pillow Lanczos resize to JPEG. This guards against the previously observed display false positives. No missing-text or clipping allegation is made from an isolated display artifact. Evidence is retained in `scratch/02/`. This was sampled frame/transition inspection, not continuous playback or an every-frame visual audit.

## Comparative assessment

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Concrete question about removing /v1 highlights API clients, matches a visible scope row, then dispatches R1 only to API review. | Clear fan-out diagram, but request and criteria are largely summarized in captions. |
| Accuracy | Specialist task/tools are explicit; Answer: pending prevents selection from becoming a correctness verdict. R2 is separately identified and goes to clarification. | Correct routing/fallback sequence. Previous task done distinguishes the old request, but suitability is asserted mainly in prose. |
| Pacing | 40 seconds gives scope matching, selection, delivery, tools and fallback separate states. The fully populated API pane has a shorter hold than the final triage pane. | 28 seconds offers readable broad phases with less concrete state to inspect. |
| Legibility | Essential question, row labels, task/tools and clarification fit at native 350px. Secondary status is dimmer but readable in its settled state. | Labels and two-line captions are readable. |
| Meaningful variety | Request inspection, mutually exclusive radio selection, single-route transfer and destination details provide distinct explanatory actions within a stable UI. | Node outlines and travelling chips provide a simpler overview; amber on the unselected DB reviewer competes somewhat with active-route emphasis. |

## Timestamped observations

- Opening periodic frames: R1 asks whether removing /v1 breaks existing API clients. API clients is underlined; the matching scope cell is highlighted before the destination row is selected.
- 10 seconds: API row is selected, with other radio options empty. 12 seconds: its connector is drawn to the destination pane. Only one route is active.
- 16 seconds: API reviewer has R1, task client compatibility, and tools schema + callers. 18 seconds: Answer: pending is present. The video neither invents a correct answer nor depicts dispatch as approval.
- 20 seconds retains the API episode; 22 seconds has R2, Review this change, cleared destination details and reset choices. The reset distinguishes a new ambiguous request from failure of the specialist.
- 28 seconds: Unclear → Human triage is selected; other categories remain inactive. 30 seconds: R2 travels down that route. 34 seconds: Human triage has R2, Scope: unclear, Action: clarify.
- Final periodic sample shows the title-only ending after the diagram fades. A finite ending is acceptable.
- Baseline 8 seconds identifies DB reviewer as not selected; 18 seconds shows API working; 22 seconds introduces the unclear new request, with prior API work explicitly labelled as the previous task. Its routing remains understandable, but it shows less of the input-to-criterion relationship.

## Limits and optional refinements

The scope rows are illustrative classification criteria, not a universal keyword-matching algorithm. Schema/caller tools support this example but do not guarantee expertise or correctness. Human triage is this lesson's chosen fallback, not a claim that all ambiguity must always go to a human. Parallel work, joins and evaluation loops are correctly excluded.

1. At 10–12 and 28–30 seconds, the empty detail pane still says No destination after selection. Awaiting dispatch would describe that transient state more precisely. The selected row and subsequent delivery already disambiguate it; this is optional wording polish, not a causal blocker.
2. Consider a longer settled API detail hold before reset, especially for Answer: pending. Current text is readable and not essential to infer an unseen completed review; this remains a pacing refinement.

## Technical verification

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1200 frames, 40 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both have moov before mdat.

Audio signal measurements: candidate mean −33.0 dB, maximum −7.1 dB; baseline mean −42.0 dB, maximum −12.5 dB. Both have headroom. **Audio was analyzed, not actually heard.** Actor-specific sound, synchronization and subjective audibility are not listening-verified by this frame review.

## Hash binding

- Candidate before: `7945c85482e0bc7c2f515eec7529cff6bd2fbd910ae4e1402aaee63e2209bdb8`
- Candidate after: `7945c85482e0bc7c2f515eec7529cff6bd2fbd910ae4e1402aaee63e2209bdb8`
- Baseline before: `6be321bd510d9a78e1fdf0d111ccccd2c49b081c9877620335e02b2254488dd9`
- Baseline after: `6be321bd510d9a78e1fdf0d111ccccd2c49b081c9877620335e02b2254488dd9`

Both hashes remained unchanged. The decision is bound to the candidate hash above. A repaired or replacement encode requires renewed actual encoded inspection and a new hash-bound decision; updating the hash alone is insufficient.

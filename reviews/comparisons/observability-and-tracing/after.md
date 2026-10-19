# Completed comparative review — observability and tracing

2026-10-19. Reviewer: gpt-6-astra comparative review. Scope: this chapter, its three cuts, and this review directory only. `before.md` was saved before opening author metadata or scenes. The filenames were supplied with variant labels, so the initial review was blind to author material, not randomized or identity-concealed. No author scores informed the initial comparison.

## Recommendation and teaching judgment

Recommend **Astra / Follow the tool** as the chapter entry. Its isolated task/model/tool example demonstrates the exercise the reader should perform: lose context, execute the tool under another trace, repair propagation, run again, and inspect an unchanged 2.4-second tool operation. Distinct trace/span IDs and the explicit new-run reset make its causal structure strongest. No scene edit was needed.

Keep the baseline and Fable as complementary alternatives. Baseline's nested retry timeline makes elapsed-time accounting easier to learn. Fable shows the operational reason for correlation: the service has unrelated records, and the task still fails after propagation is fixed. A good alternate need not repeat the recommended cut's mechanism.

Final ordinal scores (1–5, not a measurement or factual-verification certificate):

| Cut | Clarity | Accuracy | Pacing | Visual |
|---|---:|---:|---:|---:|
| Baseline | 4 | 4 | 4 | 4 |
| Astra | 5 | 5 | 4 | 5 |
| Fable | 4 | 4 | 4 | 3 |

Baseline's progressive reveal is simple, but the animation does not directly distinguish trace IDs from span IDs or depict concrete nesting identifiers. Its 3–5.5s uncertainty hold and 20.4–23s final selection are purposeful; no unnecessary long pause needs surgery. The gap inside billing is scripted backoff, not evidence that every unexplained gap is backoff. The final metadata now says this explicitly.

Astra is the strongest on identity and chronology. The separate tool record at 6.05–10s is shown for comparison but lacks the bracket joining the agent's trace; it is not magically recovered later. At 11s a new run clears the bars. The 14–15.3s header packet precedes the new tool identity; the repaired grouping begins at 16.8s. Its 21.2–25.3s final selection is slightly generous, with a confirming pulse at 23.7s. The shorthand IDs are explicitly marked illustrative. Real HTTP client/server intermediary spans and explicit parent-ID values remain outside the animation.

Fable has more objects and smaller monospace strings at 350px. Its 8.35–17.56s failure-and-search beat must be read across two panels, so it is less useful as a first exposure. The repaired 25.36–28.56s ending now selects only the matching failure and leaves unrelated records dimmed. Red still means error; the blue check means correlation. This preserves the strongest distinguishing lesson and reduces the previous ambiguity without adding explanatory captions. The lack of concrete parent/span IDs remains an abstraction, disclosed in metadata.

## Corrections applied and checked

1. **Baseline, 17.0–17.6s:** changed the travelling chip from `retry 2` to `attempt 2`. There are two attempts, hence one retry. The failed attempt, gap, success, duration bars, soundtrack and overall timing are preserved. Regenerated MP4 and poster. Added metadata with `model: Original prototype; model not recorded` and the separate `editedBy` attribution. Clarified that this is inspection of previously recorded evidence.
2. **Fable, 25.36–28.56s:** removed the whole API-history glow. A new dotted join routes outside the history panel and terminates on row 7e2d. Rows 91c0, a7e3 and 0d12 dim; only the matching red error row receives a blue selection outline. The local engine adds a generic optional per-row highlight. The existing hit/chime cues accompany the selection; the failure remains visibly red. Regenerated MP4 and poster; the original Fable model string is unchanged.
3. **Fable transcript:** corrected the actual intervals to 0–8.35s / 8.35–17.56s / 17.56–19.96s / 19.96–25.36s / 25.36–29.57s. In particular, the propagation cue occurs at 18.26s, the next task starts at 19.96s and the correlation begins at 25.36s. The original text described a solid line; the encoded line is flowing and dotted. Both transcript copies now agree with the new frames.
4. **Fable technical limit:** receiver extraction, instrumentation and export are required to inspect the trace. Export to literally the same backend is convenient, not a W3C protocol requirement. The metadata now distinguishes those points and states that operation labels are illustrative rather than exact exported span names.
5. **Guide evidence:** added retrieval dates to all seven primary sources actually accessed. The guide's substantive claims and classification needed no rewrite.

Original changed scenes, renderer files and metadata are retained under `original-sources/`. Original MP4/poster bytes and decoded before/after captures are retained under ignored `scratch/`. Prior author reviews remain intact; current hash-bound evidence is `encoded-checks.json` and the comparison JSON. No installed skill files changed.

## Encoded evidence

Every video frame was decoded to RGB frame hashes and every audio sample to floating-point PCM, with FFmpeg errors treated as failures. Actual final public-file SHA-256 values were compared with the inspected candidate bytes after copying. All are H.264, 1080×1920, 30fps, yuv420p, with AAC audio and `moov` before `mdat`. All are below the repository's 3MB per-cut limit. Exact decoded first/last pixels match: baseline and Astra open/close black; Fable opens/closes on the same title card.

| Cut | Frames | Duration | Decoded PCM peak |
|---|---:|---:|---:|
| Baseline | 780 | 26.000s | −2.198 dBFS |
| Astra | 840 | 28.000s | −11.036 dBFS |
| Fable | 887 | 29.567s | −1.640 dBFS |

Audio was **not heard**. Inspected spectrograms and measured nonzero encoded energy in each scheduled cue window. The baseline failure at 14.7s, Astra context-loss/repair cues at 5s/11s and Fable failures near 11.65s/23.26s have corresponding encoded energy. Baseline and Fable have stronger failure transients than Astra's sparse connection-loss cues. These analytical checks do not establish subjective balance, masking, comfort or phone-speaker audibility.

Visual inspection covered one-second contact sheets and every causal beat at 350px, with original-resolution key/busy frames and exact endpoints. Before frames include A 1/3.5/6.5/8.5/12/15/17.5/19.5/22/24.5s; B 1.5/3.5/5.2/6.5/8.5/11.5/14.5/16/18/20/22.5/25.5s; C 1.5/3.5/5.5/7.5/9.5/11/12.5/14.5/16.5/18.5/20/21.5/23/24.5/26/28s. Revised baseline was checked at 1/3.5/6.5/8.5/11.7/14.9/17.3/19.5/22/23.5s; revised Fable at 1.5/3.5/5.5/7/9.5/11/12.5/14/15.7/18.5/20.3/22.5/24.5/25.7/27.5/28.9s. No observed clipped text, offstage content, or stale selected state. This is decoded-frame inspection, not a claim of continuous real-time playback.

Transcript cross-check: baseline covers total → recorded root/retrieval/billing → failed attempt/gap/second attempt → selected billing → fade. Astra's existing five timed entries agree with its encoded sequence and were retained. Fable's inaccurate time ranges were corrected as above. No textual sequence claims an unshown performance or correctness improvement.

## Reproduction and scope

From the repository root, baseline can be reproduced using the repository-pinned Puppeteer dependency:

```sh
FLOWVID_TMP=reviews/comparisons/observability-and-tracing/scratch node video/observability-and-tracing/baseline/runtime/render.mjs video/observability-and-tracing/baseline/observability-and-tracing.js reviews/comparisons/observability-and-tracing/scratch/revised-baseline.mp4
FLOWVID_TMP=reviews/comparisons/observability-and-tracing/scratch node video/observability-and-tracing/fable/engine/render.mjs video/observability-and-tracing/fable/observability-and-tracing.js reviews/comparisons/observability-and-tracing/scratch/revised-fable.mp4
python3 reviews/comparisons/observability-and-tracing/verify.py
```

Both changed renderers cap FFmpeg codec/filter threads at two. `verify.py` checks the current public files; a future encode requires renewed visual review before replacing the saved comparison. The review did not run the global build/release commands, which would write shared output. Instead it generated only this chapter and comparison into `scratch/site` with the existing build functions, leaving shared app/build files untouched. Browser results are recorded separately in `browser-checks.json`.

No Git, index, branch, publication or agent-spawning operations were performed. Recommendation is review evidence; curriculum promotion remains an editorial decision.


## Browser completion

Chapter and comparison were rendered with the existing build functions into the isolated review scratch site and inspected in Chrome at 1440px and 390px widths. Both have no horizontal overflow. The chapter selects the Astra media hash; comparison shows all three current hashes, the recommendation, corrected sequences and separate original/revision attribution. Reviewed screenshots include the first screen of both chapter widths, the desktop comparison and phone comparison recommendation, revised Fable poster, transcript and provenance. This was a local preview only.

Final JSON schema fields, integer score ranges, transcript-copy equality, preserved Fable model attribution and all three actual public MP4 hashes were checked at 2026-10-18T23:20:57.830917+00:00.

The first isolated preview omitted the bundled fonts. After linking the existing public fonts into scratch, all four browser checks were repeated with document.fonts.ready, no failed resources and no horizontal overflow; the final chapter/comparison screenshots at both widths were inspected. No application asset was changed.

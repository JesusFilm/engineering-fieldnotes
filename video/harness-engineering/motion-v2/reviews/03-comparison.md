# Harness engineering lesson 03 — encoded comparison (final)

Lesson: **Execute and retain evidence** (`video/harness-engineering/sequence/lessons.json`, item 3).

| | Candidate | Published |
|---|---|---|
| File | `video/harness-engineering/motion-v2/03/video.mp4` | `public/lessons/harness-engineering/03.mp4` |
| SHA-256 (before and after review) | `c5f993be7ece5ad7895077c5251a7d09b3a067f61b5c8a4871191700d920b317` | `165f5e173bb6ac34c115a0dbf69329b4c6881ddef4098a435cd2374f129e05fc` |
| Stream | H.264 1080×1920 yuv420p, 30 fps, 1233 frames; AAC 44.1 kHz stereo | H.264 1080×1920 yuv420p, 20 fps, 560 frames; AAC 44.1 kHz stereo |
| Duration | 41.11 s | 28.00 s |
| Full decode | clean, no errors | clean, no errors |
| moov before mdat (faststart) | yes | yes |
| Audio peak / mean / integrated | −6.2 dBFS / −32.5 dB / −23.4 LUFS | −10.5 dBFS / −41.3 dB / −28.5 LUFS |

**Verdict: candidate passes with no blockers. I recommend the candidate over the published cut.** It shows the mechanism through real artefacts: an unsupported claim is rejected, an actual command runs, its output and exit status are retained against a named revision, the result returns to the agent, and a later patch leaves the old evidence scoped to the old revision. The published cut is accurate but abstract, never shows the evidence itself, and stalls for about 7 s. Both cuts pass the objective checks I ran, so the published cut stays available as an alternative, though it is weaker.

Audio was **analysed, not heard**: I used volumedetect, EBU R128, spectrograms, a 25 ms onset envelope, sample-level transient search, and waveforms around 20.0 s and 26.65 s. I made no listening judgement.

## Method

I read the lesson item, `docs/editorial-workflow.md` and the post-production review reference before inspecting media. I did not read the candidate's scene source, beat sheet, self-review, verification file or earlier comparisons. I extracted exact frames by index (`select=eq(n,N)`) at native 1080×1920 and scaled them to 350 px wide. I viewed 38 candidate frames and 23 published frames individually at both sizes, covering every beat midpoint, every motion or sound boundary, and the first and last frames. Contact sheets, chip-travel strips, frame-difference stall detection and glyph-height measurements are in `reviews/scratch/03-final/`.

## How each cut teaches the lesson

**Candidate (41.1 s).** The beats below are inferred from the encoded motion and sound.

| Time | What happens on screen | Sound onset |
|---|---|---|
| 0–2.0 s | Agent panel, `current a61c9e2` revision dot, dashed `no run` slot | — |
| 2.0–5.0 s | Agent types `"tests passed"` (claim); a chip copy drops beside `no run` and fades at 4.2 s without filling it | 2.0, 4.2 |
| 6.65–9.0 s | Agent text becomes `run npm test` (request); an `npm test` chip takes the same path and is absorbed | 6.65, 8.875 |
| 9.0–11.6 s | Slot grows into a run card: `Run #1`, `rev a61c9e2` | 10.2, 11.55 |
| 12.5–18.7 s | `$ npm test`, running bar, `8 passed` (14.0 s), `1 failed` (16.2 s), `export: FAIL`, then `exit 1` and `exited` | 13.55, 14.875, 16.2, 17.775 (loudest, −11.5 dB peak) |
| 20.0 s | Footer changes to `retained` | 20.0 |
| 21.6–24.0 s | A red `export: FAIL · exit 1` chip rises to the agent; panel becomes `exit 1 @ a61c9e2 / export: FAIL`, labelled `observed · Run #1` | 21.55, 22.875 |
| 25.2–26.7 s | Run card narrows and settles | 26.65 |
| 27.8–31.9 s | Agent `patch -> b84d102`; timeline extends; `current` moves to `b84d102` | 27.775, 29.55, 31.875 |
| 33.1–36 s | New `no run` slot under b84d102; old card footer becomes `for a61c9e2 only` | 33.1, 34.875 |
| 35.8–38.9 s | Resolved state held | — |
| 39.0–41.1 s | Diagram fades out, leaving only the title | — |

**Published (28 s).** Three labelled boxes (AGENT, TEST RUNNER, RUN RECORD) with the lesson beat text burned in at 0/7/14/21 s. A `TEST COMMAND` chip moves down (0–2 s), the runner bar fills (2.25–7 s), an `EXIT + LOG` chip lands in the record (7–9 s), and the record turns green with `evidence saved` (9.25 s). At 14.0 s the record border turns amber and the label changes to `revision + result`. An `OBSERVATION` chip travels up the dotted side line to the agent (21–23 s), the agent glows (23.25 s), and the frame holds until 28 s.

## Scores

These are reviewer judgements on a 1–5 scale, not measured learning outcomes.

| Criterion | Candidate | Published |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 3 |
| Pacing | 4 | 2 |
| Visual legibility | 4 | 4 |

**Causal clarity.** The candidate sets a contrast at 2.0–5.0 s: a typed `"tests passed"` claim travels to the empty record and fades without filling it. The same path then succeeds for the real `npm test` request (8.9–11 s). This shows *why* a claim is not evidence without any caption. Streaming `8 passed` before `1 failed` and `exit 1` (14.0–18.7 s) also shows why partial output is not a result. The published cut's command, runner, record and observation are boxes and chips; nothing on screen distinguishes a claim from evidence, and the viewer depends on the burned-in captions.

**Accuracy.** The candidate binds evidence to a concrete revision throughout: `rev a61c9e2` on the card from 11.0 s, `exit 1 @ a61c9e2` returned to the agent at 24.0 s, and `for a61c9e2 only` next to an empty `no run` under `b84d102` from 36.0 s. That is the lesson's "a new patch needs new evidence" shown as state. All four lesson beats are present. The candidate puts the revision consequence after the return to the agent, while the lesson text puts it before; the lesson meaning is unchanged. It has no box labelled "test runner"; the run card's command line and running bar serve that role. The published cut's `revision + result` (14.0 s) never names a revision, never shows a patch, and its record says `evidence saved` without any exit status or output. That is correct as an outline but does not demonstrate the claim.

**Pacing.** The candidate has a sound onset every 1.2–3.8 s, each within about 0.1 s of a visible change. Its stillest stretches are a 2.0 s opening (frames 0–59, mean difference 0.006) and a 3.0 s final hold (frames 1076–1166), which comes after the last beat on purpose. At 41 s it runs long, and the empty enlarged card at 9.7–10.9 s and the unsounded card narrowing at 25.2–26.6 s add little. The published cut stalls with nothing changing from 14.05 to 20.95 s; frames 281, 360 and 419 are identical within about 0.01/255 mean difference. That reproduces the review guide's "nothing changes for more than about 3 s" fault in the published cut. It has only 7 sound onsets in 28 s.

**Legibility.** Neither cut has text below threshold at native 1080 width. The candidate's smallest measured glyph runs are the subtitle at 22 px cap height and `claim`, `edit` and `observed · Run #1` at about 24 px ascender to descender. The main content (`run npm test`, `exit 1`, revision IDs) is 40–60 px. At 350 px, every candidate frame I inspected stays readable; the small grey labels are faint but legible. The published cut uses larger, sparser text (box labels 32 px, captions 36 px), so it is the easier cut to read at 350 px, though it carries less information.

## Objective faults

**Candidate: none found.** The decode is clean. Audio peaks at −6.2 dBFS, so it does not clip. Every sound has a visible event, and the beat-level visible events have sounds. Nothing sits off stage or in the title band. No stale state remains: the claim chip fades, the bar becomes `exited` and then `retained`, and `current` moves cleanly. The site player uses `controls` without `loop`, so the fade to a blank title at 40–41.1 s does not need to match the first frame.

I checked these apparent issues and do not count them as faults:

- **Chips crossing box borders in motion.** The claim chip crosses the agent panel's lower edge (frames 86–94, about 2.9–3.1 s). The evidence chip crosses the run card's top edge (frames 650–654, about 21.7 s) and the agent panel's lower edge (frames 680–688, about 22.8 s). The chip's opaque fill covers only a border line, never text, and its own label stays fully readable at every sampled frame. The published cut does the same with `OBSERVATION` over the runner and agent borders (22.0 s, 22.8 s).
- **Full-band transients at 20.0 s and 26.65 s.** The waveforms show a soft tick followed by a struck, decaying tone, with no sample jump. They are designed attacks for `retained` and the settled card.

**Published:** a reproducible static stall from 14.05 to 20.95 s (frames 281–419). This is recorded for comparison only; it does not affect the candidate verdict.

## Optional refinements for the candidate (not blockers)

1. **Shorten slack stretches** (9.7–10.9 s, 25.2–26.6 s; size S). An empty enlarged card holds for about 1.3 s before `Run #1` appears, and the card narrows for 1.4 s before its settle sound. Starting the card header with the grow, and narrowing the card during the patch, would cut about 2–3 s and bring the next beat in sooner.
2. **Sound the start of the card narrowing** (25.2 s; size S). The narrowing begins silently and the tone arrives only as it settles at 26.65 s. Moving the tone to the start of the motion, or tying the narrowing to the patch sound at 27.8 s, would make the cause clearer.
3. **Route travelling chips around box borders** (2.9–3.1 s, 21.7 s, 22.8 s; size S). Arcing the chips into the agent panel's right margin, or fading them before they touch a border, would remove the brief border occlusion.
4. **Mark the runner role** (8.9–12.7 s; size S). The lesson text names a test runner; a brief motion cue such as a runner icon or a glow on `$ npm test` as it starts would tie that role to the run card without adding a caption.
5. **Promotion note (manifest work, not a media fault).** `lessons.json` item 3 lists `duration: 28` with beats at 0/7/14/21 s, and `scripts/check_sequences.py` requires the encoded duration within 0.15 s. Promoting this 41.1 s cut needs the coordinator to update that item's duration and beat timestamps (about 2, 6.7, 21.6 and 27.8 s from the observed motion) and the media hash fields.

## Recommendation

**Recommend the candidate** (`motion-v2/03/video.mp4`, SHA-256 `c5f993be…920b317`). It teaches the lesson's causal chain, from claim versus command to retained output and exit status, revision binding, return to the agent, and new revision with no evidence, through visible state instead of captions. It has no reproducible objective faults. The published cut has no media defect that blocks playback, but it has a 7 s stall and shows neither the evidence nor the revision. It stays available as an alternative.


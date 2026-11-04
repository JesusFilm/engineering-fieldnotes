# Missing and sensitive data

## Scope

One focused distinction: **removing an attribute preserves a span; losing an export removes that span from the viewer's evidence**. Show two operations that definitely ran, remove a synthetic secret field from A before export, and separately fail B's export. End with a viewer containing only sanitized A, while the demonstration's runtime record still shows both operations ended.

Five beats, approximately 46 seconds. No sampling algorithm, retry implementation, trace repair, security checklist, or claim that traces establish correctness. Sampling and missing instrumentation are accuracy limits in this plan, not additional animated mechanisms.

Grounding: `video/observability-and-tracing/sequence/lessons.json` item 5 and `content/concepts/observability-and-tracing.json`. [OpenTelemetry sensitive-data guidance](https://opentelemetry.io/docs/security/handling-sensitive-data/), inspected 2026-10-21, supports minimizing collected data and explicitly removing attributes. The concrete export failure is the repository lesson's illustrative scenario. The distinction between runtime activity and available trace evidence is the teaching judgment.

## Layout: runtime strip and export inspector

1080 × 1920. Background #050506; text #E6E8EC; secondary #8B9099; teal #3FB68B for retained telemetry; amber #F5A524 for active work; red #E5484D exclusively for the failed export. No physical sieve, shredder, trash can, or blocked-work metaphor.

Use a compact runtime strip at the top and one large tabbed span inspector below it. Attribute removal is a row edit inside that inspector. Export is a separate action/status line. The inspector later changes to a backend view, where only A is listed. The runtime strip never disappears, preventing missing telemetry from being mistaken for missing execution.

Coordinates x,y,width,height; all essential text at least 52 px, secondary states 48 px. Title 76 px. No miniature JSON or paragraph captions.

| Element | Coordinates | Content |
|---|---|---|
| Title | 90,140,900,180 | `Missing and` / `sensitive data` |
| Runtime heading | 90,370,900,70 | `Runtime · example`, 56 px |
| Operation A | 90,465,425,160 | `A · read config`, 52 px; state at y550 |
| Operation B | 565,465,425,160 | `B · run tests`, 52 px; state at y550 |
| Inspector heading | 90,730,900,70 | `Before export`, later `Trace viewer`, 60 px |
| Tabs | A (90,830,180,80), B (290,830,180,80) | 60 px; selection outlined |
| Span identity | 130,960,820,70 | `Span A` or `Span B`, 60 px |
| Attribute rows | 130,1070,820,90 and 130,1180,820,90 | `operation: read_config` and `secret: [FAKE]`, 52 px |
| Export status | 130,1400,820,140 | short two-line status, 56 px |
| Backend count | 90,1600,900,80 | `1 span received`, 56 px; only after A receipt |
| Footer | 90,1750,900,80 | `Partial evidence`, 56 px, final only |

For B, show only `operation: run_tests` at y1070. The fake secret is deliberately obvious and not credential-shaped; never use a real token or reveal an actual secret. Whole key/value row is removed, not merely replaced with masking dots.

The final backend layout replaces the local A/B tabs with a single A row at (90,850,900,110); the detail area below shows its operation attribute and no secret row. Do not draw an invented B placeholder inside the backend. The runtime strip is the demonstration's separate knowledge, not data inferred by the backend.

## Timed motion, state, and sound

Actor pitches: operation A C4, operation B E4, attribute-control G4, exporter A3, viewer G5. Sounds are planned preset cues, not previously produced or heard. Quiet reading holds; no music or continuous activity noise.

| Beat / playback | Motion and persistent state | Sound and hold |
|---|---|---|
| 1 · 0–9 s · Both operations occur | Establish runtime strip 0–1.5. A changes Ready→Running at 2, then Ended at 3.5. B changes Ready→Running at 4, then Ended at 6.0. At 6.5 show Before export inspector with A selected and its two attribute rows. Both runtime states remain Ended for the remainder. | A `work` C4 at 2, `ack` C4 at 3.5; B `work` E4 at 4, `ack` E4 at 6. Hold 7–9 on recorded span A plus its synthetic secret field. |
| 2 · 9–19 s · Remove the field, retain A | At 9.5 outline only the secret row. At 11 show `Remove attribute` in the status area. At 12–13 strike through then collapse that row to zero height; operation row and Span A identity remain fixed. At 14 status changes to `Attribute removed`. | Attribute-control `ack` G4 at 12.5. Hold 14.5–19. A's tab and runtime operation remain; no disappearing span, no red execution failure. |
| 3 · 19–27 s · Export sanitized A | At 19.5 status becomes `Export A`. A small duplicate record outline descends from (900,1010) to (900,1540) over 20–21, avoiding text; source identity remains. At 21 status becomes `A received`, and count becomes `1 span received`. | Exporter `send` A3 at 20; viewer `store` G5 at 21. Hold 22–27. No secret key, fake value, or masked placeholder is included in the exported representation. |
| 4 · 27–36 s · B fails to export | Select B at 27.5; update identity and operation together. At 29 status becomes `Export B`. Duplicate B record outline travels along the same route but stops at y1490 at 30; show a small red cross and status `Export failed`. Fade only this in-flight copy at 31.5. B's local inspector and runtime Ended state remain intact; received count stays 1. | Exporter `send` A3 at 29, short `thump` A3 at 30. No B runtime crash sound. Hold 31.5–36. This is a failed delivery in the illustrated observation window, not a failed test operation. |
| 5 · 36–46 s · Inspect the limited evidence | At 36.5 switch heading Before export→Trace viewer. Replace local tabs with the single received A row; open its sanitized attributes by 38.0. At 39.0 briefly outline both Ended runtime states together, then the single received A row. At 41 reveal Partial evidence footer. | Viewer `ack` G5 at 38; quiet viewer `ack` G5 at 41. Hold 41.5–46. No B appears in the viewer, and no assertion that B never ran appears anywhere. |

Every change has a distinct role: runtime status, field deletion, successful record receipt, failed record delivery, then backend inspection. Attribute deletion is local record shaping; it does not disable tracing. Export failure is not the sanitization rule rejecting B. The phase switch to Trace viewer must be unmistakable so the earlier local B tab is not mistaken for a previously exported span being deleted.

## Accuracy limits

- The example intentionally demonstrates removal of an already-present synthetic attribute before export. Prefer avoiding sensitive collection in the first place. Removing it here does not erase earlier copies or prove comprehensive privacy protection.
- The attribute-control action is explicit configuration, not an automatic ability to recognize every secret. Retained operation names are illustrative approved metadata.
- A missing span can also arise from absent instrumentation or sampling. This example knows B's export failed because it shows the producer/export side; a backend showing A alone cannot establish that cause.
- Retry and eventual delivery are out of scope. B is absent at the shown observation time; do not label it permanently lost or claim one transient error guarantees permanent loss.
- The runtime strip supplies demonstration ground truth independently of the incomplete backend. A real viewer cannot invent missing operation names, durations, or counts without another source.
- Ended does not mean tests passed. The video makes no output-correctness claim. A/B are span aliases, not wire-format identifiers.

## Native350 acceptance and later review

Requirements for a future encode, not completed validation:

- View actual individual frames at native 350 px width (~622 px high), plus full resolution. 52 px source labels become ~16.9 px; 48 px states ~15.6 px. Check `A · read config` fits its 425 px row; if necessary split name across two lines and extend the runtime cards downward while retaining the gap above the inspector. Do not reduce the font.
- Inspect holds at 7.5, 15, 24, 33, and 43 s and before/mid/after attribute collapse, A receipt, B failure, and backend-view switch. Contact sheets are not legibility evidence.
- At 15 s the secret attribute must be gone while A remains. At 24 s receipt count must be exactly 1. At 33 s B must still be Ended at runtime despite Export failed. At 43 s viewer must show sanitized A only while both runtime operations remain visible.
- No red cross may attach to B's runtime card. No privacy-removal animation may erase A or appear to cause B's export failure. No secret survives in a duplicate export graphic or final viewer.
- Select B atomically: never show Span B with A's operation field. Keep receipt count unchanged on failed export. Remove local B tab only during the clearly labeled switch to the backend view.
- Silent playback must communicate the two different omissions: one field deliberately removed, one whole span unavailable to the viewer. The final hold must give sufficient time to compare two runtime operations with one received record.
- Reproduce suspected visual defects using alternate extraction before flagging. Later decode the full MP4, check audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind encoded review to the full SHA-256 and renew review after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No render, public/site/shared-skill edit, Git operation, or other lesson work is included.

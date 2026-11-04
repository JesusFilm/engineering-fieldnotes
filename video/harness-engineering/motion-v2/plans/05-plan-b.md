# Cut 05 plan B — Require a passing check

Status: plan only. No render, no scene source, no edits outside this file. Authored blind: no other plan, review, or production manifest was read. Rendering is authorised once the blind synthesis is complete; no further approval is needed.

## One mechanism

A configured required check on the pull request's current revision mechanically keeps the merge path closed until a real, relevant, passing result for that exact revision arrives. Words do not move it: an agent asking to merge, or stating that tests pass, changes nothing. When the check runs on `a1f3c` and reports pass, the check requirement flips and the merge control visibly changes state. The review requirement in the same rule stays unmet, so the path is still closed for a different, visible reason. There is no bypass for the agent.

The viewer should feel three things with every word removed: (1) a refusal that jolts the merge control and points at the rule row that caused it, (2) a claim chip that dies at the panel edge while the status row stays grey, (3) a progress bar in the runner mirrored live inside the status row, followed by the merge control changing colour and the reason changing.

## Composition (different from cuts 01–04)

Cuts 01–04 used a runtime handoff with a file, a workspace baseline sheet, a revision graph with a test transcript, and an API expected/actual replay. This cut is a branch-protection view: a static rule panel at the top, a pull-request status list with a merge control in the middle, and a check runner at the bottom. Claims enter the status list from the left; evidence enters from the right. The configuration never moves; only state derived from it does.

Nothing is drawn as a physical gate, lock, barrier, or traffic light. The "gate" is the merge control's state plus its reason line, which is what an engineer actually sees.

Vertical 1080×1920, 30 fps, `meta.speed 1`, authored duration 42 s (allow 0.95 if the stills feel rushed; stay within 35–50 s). Title `Required check` (104 px, y≈330), subtitle `BRANCH PROTECTION` (y≈405).

### Stage coordinates (centres unless stated)

| id | type | x | y | size | initial state |
|---|---|---|---|---|---|
| `rule` | store, 3 rows | 540 | 590 | w 720 (spans 180–900, y 475–705) | row0 `require  check: tests`, row1 `require  review 1`, row2 `bypass  none`; all rows colour `dim`, panel colour `dim` |
| `rulecap` | label | 540 | 740 | 26 px, colour mid | `main` (the protected branch; the only caption on the panel) |
| `agent` | laptop | 150 | 1040 | 156×100 | colour mid |
| `agentcap` | label | 150 | 1130 | 26 px, mid | `agent` |
| `prcap` | label mono | 700 | 840 | 30 px, fg | `#42  a1f3c → main` |
| `pr` | store, 2 rows | 700 | 960 | w 520 (spans 440–960, y 878–1042); row0 centre y 927, row1 y 993 | row0 `tests   no status` (colour dim), row1 `review  0 / 1` (colour dim) |
| `merge` | box | 700 | 1190 | w 320 h 96 (spans 540–860, y 1142–1238) | label `Merge` 34 px; colour `dim`, labelColor `dim` (disabled) |
| `req` | bar, 2 segments, ticks | 700 | 1262 | w 320 h 12 | seg0 0, seg1 0; seg0Color ok, seg1Color accent; track dim |
| `reason` | label mono | 700 | 1310 | 26 px, mid | `blocked · tests: no status` |
| `ci` | box | 540 | 1560 | w 640 h 150 (spans 220–860, y 1485–1635) | label `check: tests` 32 px, sublabel `idle`, colour mid |
| `cibar` | bar, ticks | 540 | 1668 | w 560 h 14 | seg0 0, seg0Color accent |
| `out` | badge | 540 | 1740 | auto | text empty |

Wires (dotted, colour `wire`, lit `fg` with `flow 1` only while a packet travels):

- `ask`: agent.right `[246,1040]` → via `[330,1040]`, `[330,1190]` → merge.left `[540,1190]` (merge attempts).
- `say`: agent.right `[246,1040]` → via `[330,1040]`, `[330,927]` → pr.left `[440,927]` (the spoken claim; shares the first segment with `ask`, so draw `say` first and let `ask` overlap, or offset `say` start to `[246,1028]`).
- `run`: pr.right `[960,960]` → via `[1010,960]`, `[1010,1560]` → ci.right `[860,1560]` (revision down, status back up the same wire).

Stage stays within y 475–1770. Nothing enters the title band. The rule panel's right edge (900) clears the `run` wire (x 1010). The `reason` label at y 1310 clears `ci` (top 1485).

### Legibility budget

Every word is a chip, a row, a label, or a reason line; no sentences. Smallest text: 26 px mono (store rows, reason, captions) at 1080 wide. Chips: `merge?`, `tests pass`, `a1f3c`, `pass · a1f3c`. Row text is kept to two words plus a value so it fits w 520 at 26 px (max ≈ 28 characters inside the 476 px row).

## Sound map

| actor / event | preset | pitch | pan |
|---|---|---|---|
| agent sends anything | `send` | C6, gain 0.9 | panOf(agent) |
| merge attempt refused | `thump` (plus 8 px x-shake on `merge`, red × ripple at merge.left) | — | panOf(merge) |
| rule row that caused the refusal | `ack` | C5, gain 0.8 (quiet, 0.2 s after the thump) | panOf(rule) |
| claim dies at panel edge | `miss` | default | panOf(pr) |
| revision dispatched to runner | `send` | G6 | panOf(pr) |
| runner starts | `arrive` | E5 | panOf(ci) |
| runner working | `work` every 0.25 s for the bar's duration | — | panOf(ci) |
| runner result badge | `hit` | — | panOf(ci) |
| status chip leaves runner | `send` | E6 | panOf(ci) |
| status lands in row0 | `store` | — | panOf(pr) |
| check requirement satisfied (merge control changes) | `chime` | default | panOf(merge) |
| final refusal for review | `thump` at lower gain 0.7 | — | panOf(merge) |

The loudest moments are the first refusal (beat 1) and the chime (beat 4). Nothing else exceeds them.

## Storyboard (times at speed 1; every beat has a state change paired with a sound)

| t (s) | what moves | state that changes | sound |
|---|---|---|---|
| 0.0–1.5 | opening still | all idle as in the table; merge dim, reason `blocked · tests: no status` | — |
| 1.5 | agent lights (colour fg, glow 0.6, 0.3 s) | — | — (the send at 2.0 covers it) |
| 2.0 | chip `merge?` (fg) travels `ask`, dur 0.9 | `ask` lit | `send` C6 |
| 2.9 | chip reaches merge.left and vanishes | **merge shakes 8 px, 0.4 s; red ripple with × at `[540,1190]`; `reason` colour flashes bad for 0.5 s then returns to mid; merge box colour flashes bad 0.3 s then back to dim** | `thump` |
| 3.1 | rule row0 pulse | `rule` row0Color dim→accent (0.2 s) then back to dim (0.6 s) | `ack` C5 quiet |
| 3.5–7.5 | hold | agent glow fades to 0 by 4.0 | — |
| 7.5 | chip `tests pass` (accent) travels `say`, dur 0.9 | `say` lit | `send` C6 |
| 8.4 | chip reaches pr.left and fades over 0.3 s; small grey ripple r0 10→r1 40 | **row0 unchanged (still `tests   no status`, dim). This is the beat: a visible non-change.** | `miss` |
| 10.5 | chip `merge?` travels `ask`, dur 0.9 | `ask` lit | `send` C6 |
| 11.4 | refusal again | merge shake 8 px, red × ripple, reason flashes bad | `thump` |
| 11.6 | rule row2 pulse | `bypass  none` row2Color dim→accent→dim | `ack` C5 quiet |
| 12.0–15.5 | hold | — | — |
| 15.5 | row0 text → `tests   queued · a1f3c` (dur 0); row0Color accent | the status row now names the revision being checked | `send` G6 |
| 15.6 | chip `a1f3c` (accent) travels `run` downward, dur 1.2 | `run` lit | (same send) |
| 16.8 | chip arrives at ci.right; ripple fg | `ci` colour fg, glow 0.5; sublabel → `running  a1f3c` (subColor accent) | `arrive` E5 |
| 17.0–22.0 | `cibar` seg0 0→1 linear over 5 s; **`pr` row0Fill 0→1 over the same 5 s** (the row mirrors the runner); row0 text → `tests   running` at 17.0 | the PR's status row visibly tracks the actual run | `work` every 0.25 s (20 ticks) |
| 22.0 | badge `out` pops `exit 0 · a1f3c` (ok, scale 0→1 back ease); ci sublabel → `exit 0` (ok); ci glow 0 | run finished on the named revision | `hit` |
| 23.0 | chip `pass · a1f3c` (ok) travels `run` upward, dur 1.2 | `run` lit | `send` E6 |
| 24.2 | chip reaches pr.right; green ripple on row0 | **row0 text → `tests   pass · a1f3c`, row0Color ok, row0Fill stays 1** | `store` |
| 26.0 | gate state change | **`req` seg0 0→1 (0.5 s, ok); `merge` colour dim→accent, labelColor dim→fg (0.5 s); `reason` text → `waiting · review 0 / 1`, colour mid→accent; `rule` row0Color → ok and stays** | `chime` |
| 26.5–29.5 | hold | row1 `review  0 / 1` remains dim | — |
| 29.5 | chip `merge?` travels `ask`, dur 0.9 | `ask` lit | `send` C6 |
| 30.4 | refusal, softer | merge shake 5 px; accent (not red) ripple with × ; reason flashes accent | `thump` gain 0.7 |
| 30.6 | rule row1 pulse | `require  review 1` row1Color dim→accent→dim | `ack` C5 quiet |
| 31.0–37.5 | hold on the resolved-but-scoped state: row0 green with full fill, req bar half green, merge accent, reason `waiting · review 0 / 1`, runner badge green | — | — |
| 37.5 | `s.fade` to black below the title band, 1.0 s | — | — |
| 38.5–42.0 | black hold so the loop restarts on the opening state | — | — |

Beat boundaries for stills: 1.0, 2.9, 8.4, 11.4, 19.5, 24.2, 26.3, 30.4, 36.0, 41.5.

## What the viewer sees change (not labels only)

- The merge control is a drawn control whose stroke colour, label colour, shake, and ripple change; its reason line changes text and colour. Its state sequence is dim/disabled → (unchanged after words) → accent/waiting after evidence.
- The requirements bar under the control fills one of two segments; the second never fills in this cut.
- The PR status row fills in lockstep with the runner's bar, then turns green only when a chip carrying the revision arrives from the runner side.
- The rule panel never changes shape or text; a row flashes briefly at each refusal and row0 turns green once satisfied. That shows cause without captions.

## Accuracy limits (for the write-up, not the screen)

- This is an illustrative branch-protection view. Real systems differ in detail: a status context is posted by a CI app and matched by name and expected source; `exit 0 · a1f3c` stands in for that report and is not the literal protocol.
- Platforms document bypass lists for required checks; here the rule shows `bypass  none` so the agent's refusal is unconditional. With a bypass actor present the behaviour would differ, and the video does not cover that case.
- Some platforms treat skipped or neutral required checks as passing under certain settings. The cut shows a check that actually ran; it does not teach how a skipped job reads to the gate.
- A new commit after the pass would return row0 to `no status` for the new revision; cut 03 covers evidence binding, so this cut leaves that out.
- The review requirement is shown only as unmet. Approvals, dismissal on new commits, and code-owner rules are out of scope.
- The check is scoped: a green row proves the tested behaviour on `a1f3c`, nothing broader. The on-screen story never implies the change is correct.
- Timings are animation pacing, not measured latencies.

## Reproduction (relative to the repository root, once authored)

```
node video/harness-engineering/motion-v2/05/engine/render.mjs video/harness-engineering/motion-v2/05/scene.js --stills 1.0,2.9,8.4,11.4,19.5,24.2,26.3,30.4,36.0,41.5 --stills-dir video/harness-engineering/motion-v2/05/scratch/stills
node video/harness-engineering/motion-v2/05/engine/render.mjs video/harness-engineering/motion-v2/05/scene.js video/harness-engineering/motion-v2/05/video.mp4 --sheet video/harness-engineering/motion-v2/05/scratch/sheet.png
ffmpeg -i video/harness-engineering/motion-v2/05/video.mp4 -lavfi showspectrumpic=s=1800x500:fscale=log video/harness-engineering/motion-v2/05/scratch/spec.png
ffmpeg -i video/harness-engineering/motion-v2/05/video.mp4 -af volumedetect -f null -
```

The local engine copy under `05/engine` matches the shared skill engine; this plan uses only `store`, `box`, `bar`, `badge`, `label`, `laptop`, wires, packets, ripples, shake, and fade. If the author wants a visibly disabled control, a general `dashed` prop on `box` is the only extension worth adding; keep it in the local copy and report it. Scratch frames stay under ignored `scratch/`.

## Acceptance checks

Full resolution (1080 wide), one still per beat boundary above:

1. Every word is ≥ 26 px, no label overlaps a chip, ripple, wire, or another label; in particular `reason` (y 1310) and `prcap` (y 840) are clear of the `pr` panel edges, and the `out` badge clears `cibar`.
2. At 2.9 and 11.4 the merge control is mid-shake or just settled with a red × ripple, and the named rule row is accent at 3.1 / 11.6.
3. At 8.4 row0 still reads `tests   no status` in dim, with the claim chip gone and only a grey ripple at the panel edge.
4. At 19.5 `cibar` and `pr` row0Fill are at the same fraction (≈ 0.5).
5. At 24.2 row0 is green and reads `tests   pass · a1f3c`; the merge control is still dim (the chime has not happened yet).
6. At 26.3 `req` seg0 is green, seg1 empty; merge control accent with fg label; reason reads `waiting · review 0 / 1` in accent; rule row0 green.
7. At 36.0 nothing has changed since 31.0; at 41.5 the stage below the title is black; frame 0 matches the state after the fade resets (opening state).
8. No stale state: no leftover ripple, the agent glow is 0 outside its sends, `run` and `ask` wires are unlit when no packet travels.

Native 350 px width (downscale a still per beat with ffmpeg `scale=350:-1`; judge state, not text):

9. The merge control's colour change at 26.3 (dim → accent) is distinguishable from the 24.2 frame without reading text.
10. The red × ripple at 2.9 / 11.4 and the accent ripple at 30.4 are visible as distinct colours.
11. The two progress bars at 19.5 read as partially filled, and row0's green at 24.2 is visible against the dim row1.
12. The rule panel reads as a static grey block at the top in every frame; the single flashing row is noticeable at 3.1, 11.6, and 30.6.

Audio and container:

13. Spectrogram shows an event at every storyboard time; the two loudest events are 2.9 and 26.0; `max_volume` ≤ −0.5 dB; the quiet `ack` cues are visible on the spectrogram under silence (no steady traffic masks them).
14. `ffprobe` reports one video and one audio stream and duration 42 s (±0.2 s) at speed 1.
15. Record in the verification notes whether audio was heard in the preview or only analysed from the spectrogram and levels.

## Review handoff for the comparison reviewer

Intended lesson in one line: a configured required check holds the merge path closed until a passing result for the current revision arrives; asking for tests or claiming they passed does nothing, and a green check satisfies only its own requirement.

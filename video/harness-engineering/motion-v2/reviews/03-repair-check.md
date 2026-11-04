# Video 03 repair check

## Result

**The output-handoff gap is resolved for the reviewed hash.** The agent now visibly receives `export: FAIL` together with `exit 1 @ a61c9e2`, labelled `observed · Run #1`. The retained run remains available below. This is sufficient concrete output plus exit/revision evidence; a dense full log in the agent strip is unnecessary.

The taller strip accommodates the observed evidence and the other sampled states without clipping or collision. The ending preserves the old run under its tested revision while the current new revision has `no run`. No new blocker was found in this focused check.

## Hash and scope

- Artifact: `video/harness-engineering/motion-v2/03/video.mp4`
- SHA-256: `c5f993be7ece5ad7895077c5251a7d09b3a067f61b5c8a4871191700d920b317`
- Encoding: 1080×1920, H.264, 30 fps; video 41.100 s, container 41.111 s; AAC audio.
- Review date: 2026-10-20.
- Prior comparison remains unchanged in `03-comparison.md`, bound to old candidate hash `3af7092dbfc1a8eb4378f5770971b0477708704f2c37f678b0e88a25a8517940`. Its handoff finding is historical and superseded for this new hash only.

No authoring source or author review was consulted. This is a targeted encoded repair inspection, not a fresh full comparative review or publication decision. Only this report and `scratch/03-repair/` evidence were written.

## Timestamped findings

| Encoded time | Observed result | Assessment |
|---|---|---|
| 20.5–22.8 s | Run #1 retains command, output, exit, and `rev a61c9e2`. The returning chip reads `export: FAIL · exit 1`, traveling from the retained-run region toward Agent. Individual 22.6 and 22.8 s frames confirm both components remain readable in transit. | Output is now part of the visible handoff, not merely left behind in the record. The chip does not need to reproduce every log line. |
| Approximately 23 s | Agent switches to two complete lines: `exit 1 @ a61c9e2` and `export: FAIL`; the side label reads `observed · Run #1`. | The received observation contains concrete output, status, tested identity, and run reference. No character-by-character reconstruction was observed in the sampled receiving state. |
| 23.5–26 s | Both lines remain intact while the original transcript stays below and begins narrowing. Native and 350 px frames at 24 s show readable output and status with generous separation. | Repair passes. Values match the retained source: `export: FAIL`, `exit 1`, revision `a61c9e2`. No success claim substitutes for the observation. |
| 4 s | Taller Agent strip holds `"tests passed"` with `claim`; its second line is empty. | No collision with title, revision graph, or travelling claim. The claim remains distinguishable from the later observation. |
| 7–8 s | Request text is partially revealed at 7 s and complete as `run npm test` at 8 s, with `request`. | This is the request-state reveal, not a truncated received observation. Settled request fits the taller strip. |
| 28–28.5 s | At 28 s, `patch` is appearing while the old second line `export: FAIL` fades. By 28.5 s the strip cleanly reads `patch -> b84d102`, with `edit`, and the old output line is absent. | Brief transition overlap is separated onto different lines, not a text collision. No stale output persists in the settled edit state. |
| 29–32 s | New revision B appears; current selector moves from A to B. The retained transcript remains attached to A and its contents stay unchanged. | Evidence does not follow the current selector. Taller strip does not interfere with the graph. |
| 36 s | Current revision is `b84d102`, with neutral dashed `no run`. Old Run #1 remains attached to `a61c9e2`, including output, exit, and `for a61c9e2 only`. | Revision ending preserved. Failed evidence and missing evidence are distinct; B is not presented as passing or failing. |

## Native and 350 px readability

At native size, the observed Agent state has clear padding between `exit 1 @ a61c9e2`, `export: FAIL`, and the right-hand run label. At 350×622, both payload lines remain readily readable. The secondary `observed · Run #1` qualifier is smaller but decipherable; the lesson does not rely on reading it instead of the output and revision.

The 36 s native/350 pair confirms that the narrower old-run record still fits `$ npm test`, `export: FAIL`, and `exit 1`. The taller strip retains separation from the current marker, and its settled edit state has no leftover failure text. No required text clips, covers another label, or leaves the stage in the inspected samples.

## Evidence and limits

Scratch includes native and 350 px stills at 4, 7, 8, 20.5, 22, 22.6, 22.8, 23, 24, 25, 26, 28, 28.5, and 36 s; half-second transition sheets starting at 20.5, 23.5, and 29 s; probe JSON; hash record; and decode/audio log. Inspected native 24/36 s, individual 350 px states, and all three transition sheets. Sheets read left-to-right, top-to-bottom. Timing between samples remains approximate; exact onset of the intact observation is bounded by the 22.8 and 23 s samples.

Both streams decoded completely without reported errors. Audio peak is −6.2 dBFS, mean −32.5 dB. Audio was measured, **not listened to**. Inspection used timestamped frame sequences, not uninterrupted real-time playback; subjective sound quality and frame-perfect motion are not certified. The final file hash was rechecked and matched.

No further repair is required for the specific output-handoff finding. Earlier optional suggestions are not converted into new requirements by this check.

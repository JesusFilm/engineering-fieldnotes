# Load balancing — blind comparative findings

Recorded: 2026-10-18T23:23:32.599503+00:00. This file precedes any reading of authors' scenes, metadata, transcripts, prior reviews, scores, or provenance. File keys are only the supplied identifiers, not quality evidence. Inputs: AGENTS.md, editorial workflow, architecture-flow-video skill/review/style, the intended concept JSON, and decoded MP4 frames. Audio has not been heard or analysed at this stage.

## Coverage

One-second contact sheets cover all three files. Exact-index decoded beat frames include opening/end boundaries, normal flow, disruption, busiest states, recovery/policy changes, and resolution; timestamp lists are in scratch/blind-beats.json. All were inspected at 350px width; representative frames for every causal phase were also inspected at native 1080×1920 (baseline 3.5/7.4/10.5/13.1/13.8; astra 4.5/9/12/16.5/20.5/23; fable 4/8.8/13.8/16.2/21.2/26.5). Contact sheets are a temporal inspection, not a claim of real-time playback or listening.

## Initial comparative findings

1. **Main-entry preference: astra, provisionally.** At 11–14s Q4 visibly waits above A while B is idle. At 16–21s two new calls use B while Q4 remains on A; at 22–25s the original queue finally clears. This is the strongest causal bridge to agent tool fan-out: new routing decisions do not relocate already assigned work. Baseline's availability lesson is useful but does not teach unequal demand; fable's outcome is less causally controlled.
2. **Astra's counters need clearer semantics (4.5–26.5s).** The workers explicitly show 0/1 running, while a second counter says 1/2/3/4 calls and never decrements. Its intended cumulative meaning can be inferred, but the least-request phase makes it easy to mistake this for the dispatcher's live count. Label cumulative assignments explicitly. Q4 plus L1 also makes clear that running and outstanding are different; preserve that distinction. Larger labels and two workers make this by far the most readable cut at 350px.
3. **Baseline has a clear visual failure and a hurried discovery boundary (6.8–8.2s).** Red server, failed link, and routing to the outer servers communicate exclusion. Grey health probes are much subtler than bright request envelopes, and the exclusion seems nearly immediate. Check exact crash/check timing before calling this a fault. At 13.1s three server slots illuminate before a green check at about 13.8s; that may mean booting, not resumed work. Preserve the check-before-re-entry distinction. The opening has no title, but actors and rotation are understandable; the 18–20s empty-worker hold closes cleanly.
4. **Fable provides useful live counters but overstates an unqualified latency contrast (3–6/16–18/24–28s).** 180 ms and 2.5 s appear as measured results without an on-screen illustrative qualifier. Token count by itself does not establish response time. At 13.8s two active slots coexist on Replica 1 while Replica 3 is idle; the second slot starts progressing immediately, so this is contention/unequal concurrency, not a visible FIFO queue. Verify that its text does not describe a waiting request. The long requests and later least-in-flight workload are not visibly a matched replay.
5. **Fable's decisive second phase is under-explained by motion (18.8–26.5s).** Counts and port highlights lead the eye, but incoming work is difficult to track in the sampled frames after the switch. At 21.2s work appears on Replica 2; by 22.5s 2 and 3 are busy; Replica 1 then serves short work. The resulting policy choice is useful, but the request identity and routing step need close temporal checking. A second same-target request should visibly break rotation, rather than a reader accepting the LEAST IN-FLIGHT label as proof.
6. **Pacing/legibility trade-off.** Baseline (21s) is compact but health checks compete with constant traffic. Astra (28s) has the clearest 2s-plus contrasting holds and keeps the queued call visible through the policy change; its long job duration is justified by that continuity. Fable (31.77s) adds token chips, response-time badges, live counters and a small policy subtitle, splitting attention; those labels are technically legible at full size but the policy subtitle is small on a phone. Its final idle hold at 29–30s is adequate. Opening/last frames appear visually matched (black for baseline/astra; title only for fable), pending exact pixel and full-decode checks.

## Questions to resolve after unblinding

- Confirm baseline crash, failed-check, eligible-set change and recovery order against dense encoded frames.
- Distinguish cumulative assigned, running, and outstanding in astra; ensure later Q6 actually breaks round-robin selection.
- Check fable's missing/short-lived incoming paths, claimed latency units, concurrency versus queue language, and whether any claimed replay actually uses the same costs/arrivals.
- Independently verify primary sources and reference placement. No source is yet claimed checked.

Original MP4 SHA-256:

```json
{
  "baseline": "8f084c7b4806ddcc4a08475572cdda74d894d11c0e491d945f2d088c351c3858",
  "astra": "32e1ae92f59fd2bb47eef168dfcce925a8e81c2e15e256b12f7c0a7e294b2ee0",
  "fable": "7894be7ad4ac5fcc52930ca4bf5b92f3a0975a8c542159d2a1ab935266bd4d80"
}
```

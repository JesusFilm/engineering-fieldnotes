# Blind encoded comparison: observability and tracing

Recorded: 2026-10-18T23:12:56.203358+00:00. First comparative findings, before opening author scenes, metadata, transcripts, reviews, scores, or provenance. The supplied filenames already expose variant labels; this is author-material-blind, not a claim of randomized identity blinding. A/B/C follow the supplied file order. Only the chapter JSON, repository workflow, and video skill/review/style instructions informed the intended lesson.

Evidence: decoded one-second contact sheets; beat frames at 350px; original 1080px busy frames A 19.5s, B 16s, C 26s. Exact final frames inspected at 25.967/27.967/29.533s. No audio listened to; audio and complete-decode verification still pending. Findings are provisional until source and boundary checks.

## A — nested latency inspection (26 seconds)
- 0–6s: clear three-node support-agent setup, then 2,400ms and a question mark. Useful distinction between knowing total latency and knowing where it went; the uncertainty hold is slightly slow but purposeful.
- 6–14s: the root, short retrieval, and long billing bars reveal a recorded timeline progressively. Reading successive rows is easy at 350px. Playback reveal time is not runtime: the bars already have final durations while being revealed.
- 14–20s: a 1,200ms failed attempt and 600ms successful attempt fit inside the 2,000ms billing span, with a visible 200ms gap. This is a useful complementary mechanism to propagation. The chip “retry 2” at 17.5s ambiguously means a second retry rather than the second attempt; inspect and correct if source confirms.
- 21–24s: dimming retrieval isolates billing. This is an investigation target, not proof the remote service itself is the root cause. Enough hold before the fade; no text collisions found.
- Limitation: no distinct span/parent IDs or transport propagation demonstrated. Cannot be the best entry for this chapter's broken-boundary exercise despite being the easiest basic waterfall.

## B — same work, repaired boundary (28 seconds)
- 1–4s: three large nodes with TRACE / SPAN key and 7B/a, 7B/m introduce identities economically. Strongest mobile typography and explicit illustrative-ID boundary.
- 5–10s: red broken tool edge, tool trace 9C, and separate orange tool row teach a lost relationship without pretending execution disappeared. A detached span can still be shown for comparison; it should not be described as already a child of the agent.
- 11–17s: reset to RUN B and trace 8D makes a new execution explicit; a traceparent packet precedes the tool sharing 8D with its own /t span. This is the clearest causal repair.
- 18–23s: timeline nesting expands to include the tool; 0.6s model, 2.4s tool, and 3.0s total stay unchanged. The tool highlight correctly teaches improved visibility without a speedup.
- 23–26s: the final hold is generous, slightly slack; acceptable for reading the totals. Full fade at 27.967s. Parent relationship is graphically implied rather than shown as a parent-ID field.

## C — correlate an error amid other traffic (29.567 seconds)
- 1–8s: a successful agent/tool/API request gives the normal case; an unrelated API row follows. Useful setup for why timing alone does not establish correlation.
- 9–17s: task 8 and a downstream 500 fail with mismatched shortened trace IDs, followed by a red question on a broken relationship. More cognitive load than B: both trace containers, status, request motion, operation names and IDs compete.
- 18–24.5s: charge() gains traceparent, task 9 runs, and the API still fails. Excellent preservation of the key boundary: correlation is repaired, the failure is not.
- 25–28s: blue join and matching 7e2d IDs make the relationship visible. However the whole API history panel glows, including unrelated requests; this weakens the lesson that only the matching downstream operation belongs. Prefer selecting the matching row and routing the join to that row, while retaining unrelated rows as context.
- Mobile: readable with effort; monospace operation rows are much smaller than B's labels. “POST /charge 500 · 7e2d” is legible at full size, but requires sustained reading at 350px. No collision in the inspected full-size busy frame.
- Ending: title remains at 29.533s while stage disappears; first-frame matching needs verification, not assumption.

## Initial comparative judgment
B is the strongest chapter entry because it directly matches the guide and exercise: observe a disconnected tool, repair propagation, retain distinct span identities, and locate time without implying faster execution. A is a valuable follow-up on nested retry cost; C is a valuable follow-up on failure correlation in mixed traffic. Preserve complementary mechanisms. Investigate A's retry naming and C's overly broad final selection. Initial scoring withheld until technical/source/audio checks.

## Original encoded hashes
- A: `cc2c78e69620b0eb44f3466fcb9dd814bbe48c931b5cd40da6dbaf49db08c945`
- B: `6541372dd63774fd44ba11334a77e25797a4448767ca4f6529eb0d6e2132a768`
- C: `be47d610151bb9abac02dc178588ffd6b1989870a8bc4ddfd502bfd737ae177f`

# Lesson 03 — Return usable evidence

## Scope and grounding

One mechanism: replace a bare successful-search flag with inspectable evidence—record IDs, short summaries, and the searched interval—then carry those references and scope into the model's answer. Two returned records do not establish all incident history.

Grounding: item 3 of `video/tool-design/sequence/lessons.json` and overview/example/judgment in `content/concepts/tool-design.json`. Results should expose enough provenance to evaluate claims; a valid output shape does not prove source completeness or correctness.

[Primary tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools), checked in this conversation on 2026-10-20, distinguishes tool results and structured output schemas. The ID, summary, service, and interval display below is an illustrative application contract, not mandatory protocol fields. The completeness/correctness limitation follows the curriculum's judgment; no actual incident data or measured result is claimed.

Exclude pagination and partial-result handling, completed-empty results, timeouts, retries, authorization, validation implementation, follow-up fetch execution, root-cause diagnosis, and incident closure. Show one successful search result and one scoped answer. Do not use a count to imply exhaustive coverage.

## Design: evidence rows and a scoped answer

A response inspector expands a bare status into two concrete record rows under a persistent searched-scope header. Below it, a model answer receives short record references and the same interval. A small time axis shows that the searched window is a slice, with other history outside it left neutral and unknown. The mechanism is provenance and scope, not a generic three-box pipeline or physical metaphor.

Five beats, approximately 46 seconds, 1080×1920 at 30fps. Near-black #050506, primary white #E6E8EC, secondary #A8ADB5, amber #F5A524 for selected evidence/scope, teal #3FB68B for successful return only. Title 84px. Essential text at least 46px source (about 15px at native350); primary values 50–56px.

### Coordinates and exact display content

Rectangles are x/y/w/h; text anchors are baselines. Keep 24px interior padding. Use full-width rows, not narrow multi-column tables.

| Element | Coordinates | Content |
| --- | --- | --- |
| Title | 90/245/900/115 | `Return usable evidence` |
| Result header | 90/420/900/150 | `search_incidents`, (125,480), 54px; `status: ok`, (125,545), 48px |
| Scope header | 90/605/900/210 | `Searched: payments`, (125,665), 50px; `20 Oct 2026 · UTC`, (125,730), 46px; `09:00 ≤ time < 10:00`, (125,790), 48px |
| Record 1 | 90/850/900/160 | `INC-42`, (125,910), 54px; `Elevated error rate`, (125,975), 50px |
| Record 2 | 90/1040/900/160 | `INC-57`, (125,1100), 54px; `Slow payment responses`, (125,1165), 48px |
| Model answer | 90/1240/900/295 | `Model answer`, (125,1300), 48px; `Returned: 2 reports`, (125,1380), 52px; `INC-42 · INC-57`, (125,1450), 50px; final scope short line at y=1510, 46px |
| Time-scope strip | 90/1590/900/175 | Thin axis y=1670, from x=125 to x=955. Selected window x=370 to x=710; endpoint labels 09:00 and 10:00 at y=1640. `Outside search` at (125,1740), 46px; no counts or incident markers outside window. |

The final answer's scope line is `payments · 09:00–10:00 UTC`; the full inclusive-start/exclusive-end definition and date remain visible in the scope header. This is a display abbreviation, not a different interval.

Opening has only result header and a neutral diagnostic `Records? Scope?` at (125,690), 50px. The latter disappears before real scope appears. Record rows and answer are absent until their beats. Do not flash guessed incident IDs while status alone is visible.

## Five timed beats

| Time | Movement and reading holds | State / causal meaning | Sound |
| --- | --- | --- | --- |
| **0–8s: success alone is not evidence** | Title/result header settle by 1.2. status: ok appears at 2.0. At 3.5 Records? Scope? appears below. Brief focus outline surrounds the status then moves to the empty region at 4.5. Hold 5–8. | Successful operation status alone does not identify what was found or where the search looked. This is a comparison of result representations, not a failed backend operation. | Application return `arrive` C4 at 2.0; evidence-inspector low `ack` E4 at 3.5. No failure/crash sound. |
| **8–19s: return inspectable records** | Diagnostic fades 8–8.4. Scope header appears 8.8–10.0, with service then date/interval. Record 1 resolves 11.0–11.8; hold to 14.0. Record 2 resolves 14.5–15.3. Brief amber ID underlines at 16.0, then hold 16.5–19. | Concrete IDs, summaries and actual searched scope are now supplied. Status ok remains a small neutral/teal label, not a global truth guarantee. | Search/result source `store` G4 at 10.0, `arrive` G4 at 11.8 and 15.3; inspector `ack` E4 at 16.0. |
| **19–28s: cite returned records** | Model answer appears at 19.5 with Returned: 2 reports. At 21.0 highlight INC-42 in source; at 21.8 resolve the same ID in answer. At 23.0 highlight INC-57; at 23.8 resolve its answer ID. Hold 24.5–28. | The answer's citations come from the returned records. Count is explicitly returned reports, not total historical incidents. No root-cause inference or stronger operational claim is added. | Model `store` E4 at 19.5; source `ack` G4 at 21/23; model `arrive` E5 at 21.8/23.8. |
| **28–37s: preserve the searched scope** | At 28.5 underline the interval in the result header. At 29.5 copy service/interval into the answer's final line without moving or deleting the source. At 31.0 the time-scope strip appears; selected window fills amber 31.5–32.2, neutral axis continues on both sides. At 33.0 Outside search appears. Hold 33.5–37. | The claim is bounded by the returned interval. Outside-window history is not searched in this example and is not represented as empty. The strip illustrates scope, not query speed or incident frequency. | Source `ack` G4 at 28.5; model `store` E4 at 29.5; scope/inspector `arrive` C4 at 32.2; quiet `ack` C4 at 33.0. |
| **37–46s: leave an auditable answer** | At 37.5 pulse both IDs once, then scope line at 38.5. Keep status, source rows, answer and scope strip unchanged through 44.8. Fade lower stage 44.8–46; title remains. | Final record supports a narrow statement about what this search returned. It does not certify completeness, source correctness, or all history. No extra search or incident decision occurs. | Model/evidence `ack` E4 at 38.5. Silence through final hold/fade. |

## Motion and sound discipline

Application return C4; record source G4; model E4–E5; scope inspector C4. Use sparse arrive/store/ack cues. Sends are unnecessary where content is simply highlighted in an inspector. No clock, typing bed, narration, music, or success fanfare. Mute viewing must retain the full logic.

ID-to-answer links use short-lived focus traces in the left gutter: source row left edge (90,930) or (90,1120) via x=65 down to answer left edge (90,1450). Draw one at a time for 0.6s. Destination ID resolves only at its final position. Clear both traces before scope work. Never animate text through the other record or shrink a complete record into an unreadable token.

The time strip uses no incident dots. It is not a histogram or a claim about how many events occurred outside the window. Endpoint notation in the full header establishes the interval precisely; the axis is a simplified visual aid.

## Accuracy limits

- Two returned records are not all history and not necessarily all records even within the interval. No complete/exhaustive label appears. Pagination and coverage handling are separate lessons; this example makes only a returned-record claim.
- Status ok represents successful execution of this illustrative search, not guaranteed source truth, completeness, freshness, or correct interpretation. Schema conformity likewise cannot establish those properties.
- IDs, summaries, dates and service name are invented teaching data. Do not imply actual payment incidents, live retrieval, or measured model behavior.
- A summary is evidence about a reported record, not a definitive diagnosis. The model answer deliberately says Returned: 2 reports and cites them; it does not declare causes, severity, resolution, or an outage.
- A source ID aids follow-up inspection but is not a fetched detailed record. No follow-up tool call is shown or claimed.
- The example interval uses inclusive start and exclusive end as an application convention. It is not prescribed by the protocol. Keep the same interval in source and answer.
- Earlier/beyond-window regions remain unknown to this search. Do not add zero counts or green all-clear colors there.

## Native350 acceptance and eventual review

This is a plan only, not rendered verification.

1. Inspect individual encoded frames at 4,6,10.5,13,17,22,25,30,34,39,44s at 350×622 and full resolution. Inspect ±0.25s around scope reveal, citation insertion and final answer scope. Contact sheets alone are insufficient.
2. IDs, summaries, service, date, interval notation, returned count, and outside-search label must read without zoom. Keep essential text at least 46px source. Measure long labels; wrap intentionally or give more space rather than shrinking type.
3. Status-only phase must visibly lack records/scope; enriched result must contain both IDs, short summaries and searched interval. No guessed answer precedes the result.
4. Answer citations must exactly match returned INC-42/INC-57. Count must remain Returned: 2 reports. No all-history or exhaustive wording; no source record silently disappears during citation motion.
5. Source and answer interval must agree. Outside-search area has no incident markers, counts, or implied all-clear. The selected time window is not used as a progress bar.
6. Mute comprehension: viewer can identify what was found, which records support it, when/where the search looked, and why it does not establish all history. No paragraph caption should be necessary.
7. Final hold keeps answer and evidence together for at least 6.3s after the last focus cue. Extend duration if reading needs it. No automatic follow-up or incident closure at the ending.
8. Later production: whole-file decode, encoded beat/boundary inspection, audio peaks below −0.5dB, audio presence, moov-before-mdat. Report whether audio was heard or only analyzed. Reproduce suspected visual faults with alternate extraction before flagging display omissions.
9. Bind later comparison to actual encoded hashes before/after. Repaired encodes require renewed encoded inspection, not simply a replacement hash. Optional refinements alone are not blockers.

## Execution boundary

Write only this plan. No rendering, current other-plan/author-source inspection, other lesson work, production-state/provenance reads, public/site/shared-skill edits, commits, or deployment. Later production uses repository-pinned Puppeteer and local engine copies; drawing extensions stay local to the cut. Keep local candidates.

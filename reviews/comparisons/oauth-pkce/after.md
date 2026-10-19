# OAuth PKCE — final comparative review

Recorded: 2026-10-19, after the timestamped blind findings in `before.md` and after re-encoding all three corrected cuts. Reviewer/editor: **gpt-6-astra comparative review**. The score and recommendation concern the final hashes in `../oauth-pkce.json`, not the original author renders.

## Decision and audience

Recommend **Sol: One attempt, one verifier**, authored by **GPT-6.1 Sol**. A correct exchange comes first, so the reader has a concrete success case before tracking two overlapping attempts. The wrong verifier becomes visible in the sending record, travels with the wrong code, and produces a returned error. Fresh D then demonstrates recovery. This is the closest fit to the chapter's agent-host connector exercise.

Keep **Astra: One login, one verifier**, authored by GPT-6 Astra, as the larger-label alternative. Its simpler server layout is especially readable at phone width. It spends more of the opening establishing two attempts and withholds success until the last third. The revision makes the selected wrong verifier persist long enough to understand the causal mistake.

Keep the **baseline: Code interception protection**, whose authoring model is unrecorded, as a complementary explanation. It answers why possession of the code alone is insufficient. It is less directly useful for the chapter's concurrent-login debugging problem, but this is a different teaching purpose, not a reason to discard it.

Keep the written concept on the **reference** shelf. The practical skill is reviewing a maintained OAuth library's integration, transaction storage and callback/session binding. It belongs near protected connector work; it is not a general prerequisite for adopting coding agents. The exercise tests observable rejection, fresh correct-pair success, secret-free logs and independent write denial. These are proposed test criteria, not reported provider-test results. Primary-source claims and boundaries are recorded in `sources.md`.

## Encoded beat audit and sequence alignment

Every cut was decoded across its full duration. The visual review used all 2fps final contact sheets, targeted native 1080×1920 and exact 350px frames, busy states, packet transitions, result holds and exact endpoint frames. Native/phone extraction times are retained in `verification.json`. Contact-sheet timestamps are sampled positions, not exact event boundaries; event boundaries below were checked against scenes only after the blind record, then against encoded beat frames.

| Cut and time | Visible cause and effect | Sequence text / teaching judgement |
|---|---|---|
| Baseline 00:00–00:03.5 | Title fades in; verifier stays at the app; derived challenge travels to authorization server. | First transcript item agrees. The formula is the most explicit of the cuts but its small monospace type requires attention at 350px; guide supplies ASCII and unpadded base64url details. |
| Baseline 00:03.5–00:06.9 | Server retains challenge, binds code A, returns code A. | Binding badge supplies the causal link. The pause before returning the code gives this state time to register; browser consent occurs off-screen. |
| Baseline 00:09–00:09.8 | A copy of code A moves to interceptor while verifier remains private. | Corrected travel lane at y=735 passes below both actor labels. Native and phone frames at 9.1/9.4/9.7 verify the complete chip and both labels remain legible. |
| Baseline 00:11.8–00:15.6 | Interceptor submits code alone; verifier ∅ produces NO TOKEN. | Second transcript item agrees. The old invalid_grant was too specific for a missing parameter; the generic result preserves the reliable claim. |
| Baseline 00:15.6–00:19.8 | App sends code A + v; S256(v)=c; code becomes used; token returns to app. | Third transcript item agrees. Matching proof is illustrated, not a guarantee that every server retains a code after a failed exchange. This limitation is now explicit in the cut metadata. |
| Baseline 00:19.8–00:26 | Received token and consumed code hold, full fade 22.3–23.4, black remainder. | Adequate result hold; the roughly 2.6s black tail is longer than necessary but does not interrupt a causal beat. Title now participates in the endpoint fade. |
| Astra 00:00–00:06.4 | Host retains verifier A, sends challenge, receives code A with server binding. | First sequence item agrees. Larger labels make host/server state easy to scan. No complete success has yet been shown. |
| Astra 00:06.4–00:11.4 | B starts independently; both local records and server bindings remain. | Second item agrees. Two rows make concurrency less crowded than Sol's four-card presentation. |
| Astra 00:11.4–00:14.5 | B's verifier moves to A; at 12.3 the selected verifier in A visibly becomes B; A+B is sent. | Revised third item now describes the actual persistent state. Amber mutation and brief shake supplement the explicit text, so color alone is unnecessary. |
| Astra 00:14.5–00:18 | Derived B value disagrees with A's binding; invalid_grant/no token. | Error is correct for the supplied mismatch. It has a useful reading hold. This is a client correlation bug, not the OAuth issuer mix-up attack. |
| Astra 00:18–00:23.1 | Confused local attempts clear; fresh C obtains its own binding/code. | Fourth item agrees and explicitly says clearing is not revocation. Fresh attempt avoids assumptions about failed-code reuse. |
| Astra 00:23.1–00:30 | C submits its own verifier, matches, receives token; permissions remain separate; fade. | Fifth item agrees. The first fully successful exchange arrives late, around 24–27s, which makes this less useful as a first introduction than Sol. |
| Sol 00:00–00:05.3 | Agent host keeps verifier A; sends S256(A); server binds it to code A and returns code. | First item agrees; corrected actor name distinguishes the host client from the protected tool service. A is a symbolic random value, not a suggested literal verifier. |
| Sol 00:05.3–00:10 | A sends code+verifier; transformed value matches; token returns and code is consumed. | Second item agrees. Successful exchange before failure is its strongest teaching advantage. Other OAuth checks are assumed, not shown. |
| Sol 00:10–00:16 | Fresh B and C overlap; both retain distinct verifier/challenge/code records. | Third item agrees. Four cards at 15.5 are the busiest frame. Native and 350px checks preserve readable association labels, though scanning costs more effort than Astra's layout. |
| Sol 00:16–00:19.9 | C's verifier replaces B's selected value; code B plus verifier C reaches server; S256(C) differs from B's binding. | Fourth item agrees. Mutation, travel and comparison remain separately visible; the wrong pair does not depend only on a transient chip. |
| Sol 00:19.9–00:22 | Server returns invalid_grant and no token. | The returned error makes the response direction explicit. There is time to connect it to the mismatch. |
| Sol 00:22–00:28.5 | Failed flow clears; D starts fresh, obtains a binding, submits its own proof and receives token. | Fifth item agrees. Fresh D is a concrete repair example; it repeats the opening mechanism, which adds length but closes the failure constructively. |
| Sol 00:28.5–00:32 | Success and separate-permissions reminder hold, then full fade. | Result and boundary remain readable; no instruction implies PKCE controls arbitrary tool operations. Exact last frame equals first. |

The sequence prose explains omitted assumptions but does not invent visible browser, consent, permission-enforcement or revocation events. Baseline's broad time groups remain accurate; Astra's mutation description and Sol's host terminology were updated. All three still use symbols and simplified endpoints, and must be paired with the guide.

## Corrections and provenance

- Baseline: changed missing-verifier outcome to NO TOKEN; moved the interception chip below actor labels; corrected the local engine to fade the full frame; bounded FFmpeg work to two threads, constrained delivery encoding and attenuated audio. Added explicit revision metadata without guessing its original model.
- Astra: persisted the incorrect B selection in A at 12.3s with a brief local emphasis, matching the subsequent packet; updated transcript and appended the revision to its beat sheet.
- Sol: changed the client label and sequence from agent tool to agent host; preserved `model: gpt-6.1-sol` and appended the revision to its beat sheet.
- Guide: added initiating-client/browser-session binding, warning that an unchecked callback identifier is insufficient; recorded source retrieval dates. Existing scope, recommendations, exercise and valid claims remain.

Original scenes, metadata/transcripts and encoded media were retained in ignored review scratch before editing. Existing authored reviews/checks are historical evidence; they were not replaced with this review's scores. Each final variant records `editedBy`, corrections and final comparative verification. Original author limitation text is retained separately where historical self-review language no longer describes the current review state. No unfinished Fable material was inspected.

## Scores and their limits

Scores describe the final mechanism within the written guide's stated scope; they are editorial judgements, not empirical learning benchmarks. A 5 means no material concern found for that dimension in this review, not a complete OAuth implementation or universal effectiveness.

| Cut | Clarity | Accuracy | Pacing | Visual | Reason |
|---|---:|---:|---:|---:|---|
| Baseline | 4 | 4 | 4 | 3 | Clear interception story, but weaker match to the concurrency exercise; same-code continuation needs qualification; smallest phone text and longest empty tail. |
| Astra | 4 | 5 | 4 | 5 | Cleanest labels and revised mutation; sound narrow mismatch semantics; success arrives late after two setups. |
| Sol | 5 | 5 | 4 | 4 | Best success/failure/recovery chain and explicit response; denser busy state and repeated final success keep pacing/visual below 5. |

## Final verification

`verification.json` records the actual final media hashes, poster hashes, byte sizes, frame counts and levels. All cuts decode fully without errors: H.264, 1080×1920, 30fps, yuv420p, AAC, moov before mdat. Exact first/last decoded RGB frames match and were visually checked. All are under 3 MB. Final peaks are baseline −8.5, Astra −6.7, Sol −6.4 dBFS, below the −0.5 dBFS ceiling.

All 20/34/44 declared sound-cue windows respectively contain decoded audio above −55 dBFS RMS. Spectrograms were inspected. This verifies activity near declared events and level headroom; it does not prove every perceptual sound choice, exact synchronization or pleasant playback. **Audio was analysed, not physically heard.** No continuous real-time playback review is claimed.

A scoped preview uses the repository's real chapter/comparison generation functions and unchanged CSS/JS, writing only into this review's scratch directory. Browser results are in `browser-verification.json`: chapter and comparison at 1280px and 390px, all video metadata loaded, Sol selected in the chapter, three cuts retained in comparison, expanded sequences and correct Sol production/editor attribution, no horizontal overflow. Screenshots are retained in scratch. Whole-library release validation and publication remain outside this topic-only review.

Technical evidence and comparative output were saved only after final encoded checks passed. Final hash assertions guard against accidentally associating this judgement with an intermediate encode.

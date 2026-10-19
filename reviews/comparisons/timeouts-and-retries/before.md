# Blind encoded comparison — before source inspection

Recorded: 2026-10-18T23:58:10.455062+00:00. Scope: this topic only. Input: repository/editorial/skill instructions, intended teaching in `content/concepts/timeouts-and-retries.json`, and three encoded MP4s. No authors’ scenes, transcripts, reviews, scores or provenance metadata have been read. File identifiers and the user’s stated provenance were already visible, so this is a source/review-blind pass, not a claim of perfect model blinding. A/B/C are neutral viewing labels.

Method: decoded one-second contact sheets across the complete 32s/24s/26s sequences; selected exact beat, busy, transition and ending frames at 1080×1920 and 350px width. Exact first and last frames appear black for all three. Audio has not been heard or analysed yet. Full decoding/stream checks remain pending. Temporary image-display omissions in some batched original-size outputs were cross-checked by re-viewing the same frame and its 350px derivative; these are not being asserted as encoded defects.

## A — One retry owner

- **0.5–4.5s:** Normal read travels through agent → tool → index, returns a result, and lights one call slot. Strong concrete starting contrast; short labels survive at 350px.
- **5.5–10.6s:** Agent’s two tries wrap the tool’s three. Three downstream arrivals light successive slots before the second upstream request (visible 2/2 chip at 10.6s). This is the most useful of the three for exposing hidden retry amplification in an agent/tool stack. The tool’s timeout labels change fast; counting arrivals is easier than reading every state.
- **10.6–15.5s:** Second upstream request causes three further index calls. Six persistent slots and 2×3=6 make the multiplication inspectable instead of merely asserted. Holds the result long enough.
- **16.5–24.7s:** One owner is visually identified, agent stays at one try, downstream calls are spaced, deadline bar drains during waits. At 20.5s the 1.3s wait and later 1.8s wait show variable spacing, but one client cannot demonstrate fleet desynchronisation or prove randomized jitter. Needs source timing verification; the deadline appears shortly before actual dispatch.
- **25.5–29.6s:** Three calls, depleted deadline, STOP, then Hand off. Ending is clear as a stopping rule; less explicit about the unknown result than C. Approximately 3 seconds of final hold is tolerable but a little slack. No need to turn it into another version of C: its complementary mechanism is valuable.

## B — Timeouts / bounded retries

- **1.5–4.5s:** Simple two-actor normal read and response establish the flow. Much smaller teaching elements than A/C at 350px: attempt counter, deadline label, request chip and service state are readable only with attention. Full-resolution labels are not clipped.
- **4.5–7.0s:** Success lingers, server goes idle, then a second scenario begins without much framing. The viewer has to infer that this is a new operation.
- **7.5–13.4s:** Strongest unique causal beat: caller times out at about 10s while service visibly continues WORKING; service completes around 12s and sends a late response which is rejected around 13.3s. This directly challenges the dangerous inference that timeout cancels remote work. Retain this mechanism.
- **10–16s:** Six-second backoff occupies a quarter of the cut, with little new teaching after the late reply is rejected. Label “Backoff + jitter” does not demonstrate randomness. Backoff’s lower-screen bar and clock pull attention away from the crucial late reply. Shorten the idle tail and make the state readable at phone width.
- **16.3–21.5s:** Second GET succeeds. A stale previous service 200 OK persists at the next dispatch until new work begins; arguably a last-known state but easily confused with the current request. Completed backoff remains bright green through final hold, competing with the actual success. Remove it after use; reset the service state before retry dispatch.
- **Overall:** Shows a two-attempt allowance but never its exhaustion or an operation-wide deadline. This is a useful late-response reference, weaker as the main chapter entry than C. Ending success is legitimate; do not force every alternative to teach the same terminal case.

## C — Retry budget / CI status

- **1.5–6.5s:** Agent/runtime/service separation assigns retry responsibility to executable runtime. Large actor and state text is strongest at 350px. Normal response changes status to known.
- **7.2–13s:** New slow scenario resets the shared budget. First attempt receives no reply while budget drains. The five-second attempt timeout is inferable from the elapsed countdown, but is not explicitly shown as its own limit; guide must supply that distinction.
- **13–15s:** Two-second backoff visibly consumes the same budget. This is the strongest central illustration of the written lesson: sleeping is not free, and retry does not reset the clock.
- **15–20s:** Second attempt continues against the remaining five seconds. The long countdown is pedagogically justified by the twelve-second example, though it is visually quieter than A’s requests. An unexplained small white mark on the budget bar is not needed to understand it.
- **20–24.6s:** Deadline closes, agent receives STATUS UNKNOWN, a new request reaches the runtime but produces no third service call. This is the clearest agent-specific stopping boundary and better ending for the main entry than A’s generic handoff or B’s success.
- **Overall:** Provisional main-entry preference C, A as retry-ownership complement, B as timeout/cancellation complement. C does not show cancellation or write safety; A does not establish that one owner removes all transport retries; B does not prove jitter. These are boundaries to state in transcripts/guide, not reasons to homogenize the videos.

## Planned checks, not yet conclusions

Verify exact timing and textual video sequences after unlocking source; check whether B’s six-second wait and stale highlights are intentional and improve them if they impair the lesson. Check C’s five-second attempt arithmetic and A’s six-second deadline. Verify primary claims on shared deadlines, cancellation responsibility, retry multiplication, jitter, idempotency and transparent retries. No scores are inherited from author reviews.

## Original file binding

- A = `sol.mp4`: `15e7ece8b04a262106ed9bcd984d4beffc42de956784af3911de42bb22463cc9`
- B = `baseline.mp4`: `9b96cbfc0d18b5eefb6a44ee7d1ba19921e9201037a91c72f9cf47be168827f1`
- C = `astra.mp4`: `4b44dbe3e40a7e2c82f86a7f3b08524463e78629987c9abaed28d9860751c0db`

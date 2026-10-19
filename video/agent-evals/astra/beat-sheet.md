# Test the fix

Author: gpt-6-astra · reasoning: high · 2026-10-19.

Learning objective: given a plausible agent-generated fix, require evidence for both the requested behavior and behavior that must remain unchanged before advancing it to human review.

Independent design: this variant was developed from the original chapter and primary sources. No baseline or alternative scene source was read, and no encoded baseline was used. The original ticket-state example becomes a coding-agent regression example. A normal new-test pass precedes a regression failure; a revised artifact is then tested afresh. This is an illustrative mechanism, not an actual agent benchmark.

| Playback | What moves | State change | Sound |
|---|---|---|---|
| 0–5.8 s | Patch A travels down the left branch; result returns | Empty password is rejected; new requirement passes at 3.30 | C6 send, C5 arrival, work, E5 store, C5 chime |
| 5.8–10.5 s | Same patch travels down the right branch | Valid password is also rejected; regression fails at 8.00 | C6 send, E5 arrival, work, E5 store, C3 crash |
| 10.5–14 s | Green and red evidence join at the gate | Candidate is blocked at 11.30 despite one pass | C5 send, C3 thump |
| 14–23 s | Patch B replaces A; both branches run again | Old evidence clears; REJECT/ACCEPT produce two passes | C5 recover, matching branch sends/arrivals; C5/E5 chimes |
| 23–28 s | Both green results join at the gate | Advance to human review at 23.80, hold, fade at 26.70 | G5 send, G5 deliver; quiet C4 poof at fade |

Stage: patch (540,650); test cases (285,965)/(795,965); observed outputs (285,1230)/(795,1230); grades y1360; all-required gate (540,1590); pass count y1750. Wires route outside grade labels. Expectations remain visible inside the test nodes so REJECT can be correctly distinguished from FAIL.

This cut teaches one gate, not agent internals, repeated-trial statistics, judge calibration, permissions, or complete authentication testing. The guide covers those boundaries. Two checks passing is not release authorization. A→B is a changed artifact, not two independent samples from one configuration.

# Sequential-video pilot review — 20 October 2026

Status: ready for Jaco's learning review, not promoted to the release curriculum. Review is by the authoring assistant; it is not an independent learner study or comparative recommendation. Encoded file hashes and measured checks are in `encoded-checks.json`.

## Fixed before handover

- In lesson 3, descriptions of the preceding request persisted while the next request was being routed. Captions now change at 5, 13 and 21 seconds, with the corresponding route.
- In lessons 1, 2, 4 and 5, completion/running captions briefly lagged their state transitions. They now update with the relevant state, and lesson 4 explicitly introduces B's short lookup during its route.
- In lesson 6, the explanation of routing to B appeared only after B finished. It now starts at 23 seconds with the new request.
- Phone layout now puts the lesson introduction before its video, so viewers meet the explanation before pressing Play.

## Visual and encoded review

Inspected all six encoded contact sheets and beat frames at 350px width, plus representative frames at native 1080×1920. Actors, captions and states fit the canvas; labels do not overlap. Diagrams use actual application/server/load-balancer roles. Slow reading holds are intentional, and work progress continues during processing. These are finite lessons, with a resolved final hold rather than a loop seam.

All six videos decode, have H.264 picture and AAC sound, have the authored durations, remain below the 3 MB budget, and put metadata before video data for streaming. Audio was analysed through spectra and measured peaks, not heard. The signal aligns with sends, starts, completions, selection and timeout events; caption-only changes remain silent.

Browser coverage is recorded in `browser-checks.json`. It checks navigation, playback handoff, keyboard focus, direct lesson links, Back, completion, no eager MP4 requests, narrow-screen overflow, and the no-JavaScript fallback. The local Python server does not support media range seeking; the completion check plays at accelerated speed to generate a real ended event. This is a test-server limitation, not evidence of broken video encoding.

## Teaching review and possible next refinements

The existing recommended 28-second cut combined assignment, unequal work, a queue and a policy change. This pilot spends 214 seconds across six independent lessons and supplies explicit definitions, a takeaway and a prediction question per lesson. That difference is observable; whether it improves understanding needs Jaco's review.

1. **Make the rotation visible between requests** (lesson 3, 11–13s and 19–21s; S). A quiet next-server pointer could let viewers predict the next destination before the packet moves. Currently the repeated A/B routes and captions establish the rule.
2. **Show recovery as a separate follow-up** (after lesson 6, 38s; M). A later lesson could show successful probes restoring eligibility. Keeping that out of the present failure lesson avoids adding another mechanism before the current one is understood.

These are suggestions, not additional planned scope. Evaluate the current sequence first: can a newcomer describe the actors, predict the next server in lesson 3, explain the waiting request in lesson 4, and explain the detection delay in lesson 6?

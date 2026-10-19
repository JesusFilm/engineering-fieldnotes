# Join the checks

Author: gpt-6-astra, high reasoning. One objective: identify the join condition for parallel model reviews and reject failed or obsolete evidence before handing a patch to a human approver.

Five beats, 30 seconds. Top-to-bottom actors: frozen patch (540,600), API reviewer (285,915), DB reviewer (795,915), join (540,1270), approver (540,1590). Independent review analyses share one snapshot. The checks' implementation, repair work, and permission enforcement are deliberately outside the animation.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–9.4 | A fans out; both reports converge; a bundle reaches the approver | CHECK → PASS; join 0/2 → 1/2 → 2/2; approver WAIT → REVIEW → APPROVED | recover at .25; quiet C4 sends; C5/E5 work/chime; G5 join arrivals; C6 review and deliver |
| 9.4–13.8 | B replaces A and fans out; API result returns first | Both prior reports clear; new checks start; join reaches 1/2 while DB is still running | C4 poof/reset and sends; C5/E5 work; C5 chime; G5 arrive |
| 13.8–17.5 | DB failure report reaches join; nothing crosses to the approver | DB FAIL jolts; join becomes BLOCKED; downstream wire turns red/dashed; approver remains WAIT | E5 crash at 13.8; send at 14.25; G5 thump at 15.05 |
| 17.5–24.3 | Repaired C replaces B; both results clear, both checks rerun | 0/2 after reset; fresh CHECK/PASS states; join reaches 2/2 at 23.65 | C4 poof at 17.5; dispatch 19.1; C5/E5 work and chimes; G5 arrivals |
| 24.3–30 | Fresh bundle reaches approver; resolved state holds, then fades | Human REVIEW at 25.1 and APPROVED at 26.3; clean loop by 29.3 | send 24.3; C6 arrive 25.1; deliver 26.3; poof 28.6 |

Recurring API/DB pitches distinguish branches. Each send, processing start, result, join update, review, approval, reset, and fade has a cue scheduled at the same time as the visible event. The baseline normal path precedes the problem, and the reset demonstrates why one old green result cannot accompany changed code. All explanatory prose lives in the guide/transcript; onscreen text is short labels and statuses.

Failure blocks the approval path, not visibility of the failing evidence. The engineer can inspect the failure and repair the patch while approval waits.

## Comparative revision (supersedes affected original timings)

15.15s: red failure notice leaves the still-blocked join (send). 15.95s: it reaches the approver, who switches to REPAIR (thump). Hold until the existing 17.5s new-snapshot reset. Other timings are unchanged; 30s total.

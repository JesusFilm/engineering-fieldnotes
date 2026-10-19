# Queued ≠ complete

Author: gpt-6-astra. Reasoning: high. Independent concept/example and scene; no other variant scene was read. This cut teaches a local bounded queue through six named agent-tool jobs, rather than making the original guide's broker acknowledgement/prefetch discussion its sequence.

**Learning objective:** Interpret an agent tool submission correctly: backpressure can delay admission, and admission gives a waiting place rather than a completed tool result. Follow documentation-check job F until its actual completion.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–5.5 s | A travels planner → queue → worker. Work bar advances. | A completes; waiting returns to zero. | C6 send; E5 store; G5 arrival/delivery; G3 work ticks. |
| 5.5–10.8 s | B starts; C, D, E arrive while B continues. | Three waiting places fill; worker remains one active job. | Same pitch grammar; E5 store per arrival. |
| 10.8–15 s | FULL travels back upstream; F stays at planner while B's bar advances. | Planner pauses; queue stays at three. B then completes. | C3 thump on feedback and pause, continuing G3 work ticks, G5 completion. |
| 15–19.8 s | C leaves; SPACE returns upstream; F enters the free place. | Planner resumes; F becomes QUEUED, not complete, while C runs. | E5 send, C4 recover, C5 chime, C6 send, E5 store. |
| 19.8–25.6 s | D and E leave and finish before F leaves its waiting place. | F stays QUEUED while earlier jobs execute, then becomes DISPATCHING. | E5 send, G5 arrivals/delivery, G3 work ticks. |
| 25.6–30 s | F reaches the worker; its progress bar fills. | F becomes RUNNING and then COMPLETE; empty queue, six finished; hold, fade. | G5 arrival/delivery, C6 final chime, soft C4 poof for fade. |

Three principal actors: documentation-check agent (550,600), queue (550,1000), search tool worker (550,1430). Three queue cells at x=370/550/730, y=1000. Forward arrivals travel down the right lane x=930; feedback travels up the left lane x=135. Completed count at (550,1635); F’s admission/execution state at (550,1720). Large labels (44–84 px for meaningful content), dark stage, orange waiting/paused, green completion. State is conveyed by occupancy, stationary F, moving feedback and advancing work, as well as labels.

The three-place limit counts waiting jobs; the running job and the one producer-held item are separate. SPACE represents a local put becoming eligible after get(), not a RabbitMQ acknowledgement or network protocol. Travel time, job durations and worker speed are illustrative. The finite batch drains; sustained overload would keep the producer waiting. A queue bound is not a rate, cost, timeout, durability or permission guarantee.

## Independence review

After the first independent render, encoded baseline frames were inspected (no source scenes). Its generic producer/worker sequence already demonstrates pause/resume. The alternative was strengthened directly: a documentation-check agent submits search work, and F’s explicit NOT ADMITTED → QUEUED → RUNNING → COMPLETE sequence extends the causal lesson through the result. Queue acceptance is visibly not the finish line. This change is a teaching/example revision, not a palette or timing variation.

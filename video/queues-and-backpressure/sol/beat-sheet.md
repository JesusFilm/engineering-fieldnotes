# Bound the backlog — Sol

Learning objective: when delegating tasks to agents, distinguish a runner's in-flight limit from the admission limit that bounds waiting work. A completed-and-acknowledged task permits the next delivery; dequeueing that next task frees one waiting slot, allowing the caller to resubmit one deferred task.

Independence: authored from `content/original/queues-and-backpressure.json` and primary documentation. Neither other variants' scene sources nor the partial Fable attempt were read. No baseline encoded media was consulted. This cut uses agent task admission, follows a refused task back to its caller, and ends with bounded demand still present. Model provenance: GPT-6.1 Sol, high reasoning.

| Playback | What moves | State change | Sound |
|---|---|---|---|
| 0–7.4 s | A passes intake, waits briefly, enters the runner; ACK returns | Normal: one running task, then completion and delivery credit released | C6 sends, E5 queue stores, G4 arrival, G3 work ticks, G5 completion chime, E5 ACK arrival |
| 7.4–15.3 s | B runs slowly; C, D, E fill three cells | The runner stays at one active task while waiting grows to three; gate closes | Clock at burst, store/arrival notes, sparse G3 work ticks; low C3 thump at full |
| 15.3–21 s | F reaches the closed gate and returns left to the caller | F is refused admission and remains deferred outside the queue; intake pauses | Send tick, strongest low rejection thump, return thump, falling miss at deferred |
| 21–23.6 s | B finishes, ACK travels right; C leaves the queue for the runner | Credit becomes available after ACK; dequeue reduces waiting from three to two and reopens intake | Completion chime, ACK blip/arrival, queue store note, rising recovery, C arrival |
| 23.6–30 s | Caller resubmits F; F fills the freed cell; stage fades | One active plus three waiting; full gate closes again; F accepted once | Retry blip, send/store notes, full thump, work pulses, closing poof |

Task IDs and limits are illustrative. B's drawn processing time is not a model benchmark. `ACTIVE` counts executing tasks; during delivery transit a task may be in flight but not yet executing. The example uses one consumer with manual acknowledgements and prefetch one, plus a separate application admission gate. Admission must atomically enforce the waiting limit: concurrent producers cannot independently check then enqueue. In production, reserve/release capacity safely across failures and define durable handling for deferred tasks. This drawing assumes one producer, reliable delivery and successful tasks.

The rejection return is a control response, not a consumer negative acknowledgement. The completion ACK is a consumer acknowledgement, not a publisher confirm. The gate is application/scheduler logic, not a built-in consequence of RabbitMQ prefetch. C/D/E retain FIFO order. Retry of F is deliberate and shown once; the scene does not prescribe an immediate automatic retry policy. Bounds do not ensure completion deadlines, exactly-once processing, permission enforcement, quality or capacity recovery. Persistent prompt instructions do not enforce these limits or tool permissions; implement admission and execution permissions in runtime code.

## Primary evidence

Retrieved 19 October 2026. Linked paraphrases only:

- [RabbitMQ: acknowledgements and prefetch](https://www.rabbitmq.com/docs/confirms#channel-qos-prefetch): the broker stops additional push delivery at the configured unacknowledged window and resumes when acknowledgements release credit. Consumer acknowledgements concern processing; publisher confirms concern publisher-to-broker responsibility. This supports ACK before the next task is delivered, not the separate intake policy.
- [RabbitMQ: consumer prefetch](https://www.rabbitmq.com/docs/consumer-prefetch): RabbitMQ can apply prefetch per consumer. One consumer and manual ACKs make a prefetch of one an upper bound on this example's unacknowledged deliveries. It does not cap queued messages or enforce application permissions.
- [Google SRE: Handling Overload](https://sre.google/sre-book/handling-overload/): admission control rejects excess work, and client throttling reduces outgoing demand. The chapter discusses overload-aware retry decisions and retry budgets. These support the gate and paused intake; the precise three-slot threshold and single resubmission are this video's design choices.

## Team exercise

Pause a test runner with prefetch one/manual ACKs and an application waiting cap of three. Submit six uniquely identified tasks: observe one running, three waiting and the remaining two explicitly deferred/rejected at intake. Complete and acknowledge the running task, let the next task dequeue, and resubmit exactly one deferred task. Success: waiting never exceeds three, running never exceeds one, a rejected task is not silently lost or reported accepted, and admission resumes only after space is reserved safely. Add a concurrent-submission check before shipping the policy.

## Reproduce from repository root

Requirements: Node >=22.12, Chrome, FFmpeg with libx264/AAC, Python 3. Repository root `package.json` pins `puppeteer-core` to **25.14.0**. If dependencies are absent, install that existing root lockfile with `npm ci`; do not change it. Dependency directories stay ignored; no installed personal skill is required to reproduce this cut.

```sh
node video/queues-and-backpressure/sol/engine/render.mjs video/queues-and-backpressure/sol/scene.js --stills 4.3,14.5,19.2,22.65,26.4 --stills-dir video/queues-and-backpressure/sol/scratch/stills
node video/queues-and-backpressure/sol/engine/render.mjs video/queues-and-backpressure/sol/scene.js public/media/queues-and-backpressure/sol.mp4 --sheet video/queues-and-backpressure/sol/scratch/contact-sheet.png
python3 video/queues-and-backpressure/sol/verify.py
```

Inspect stills before the movie, then inspect the encoded contact sheet, five full-resolution and five 350px beat frames, transitions, poster, and spectrogram. `verify.py` produces these under `scratch/`, regenerates the JPEG poster from the actual encode at 19.2 seconds, fully decodes audio/video, verifies exact first/last decoded RGB equality, AAC sample peak, faststart, dimensions, frame rate, size and duration. It also measures decoded cue-window energy and records hashes. Only after visual review passes should `variant.json` have `verified:true`.

For live preview, serve the repository over HTTP (e.g. `python3 -m http.server 4175`) and open [the local player](http://localhost:4175/video/queues-and-backpressure/sol/engine/preview.html?scene=../scene.js). Play enables sound. Space pauses; arrows step frames. Audio was analysed in production, not physically listened to.

Local engine changes: generic `cells` renderer; configurable title/sub-label sizing; larger packet chips; scratch directory local to the cut; maximum two FFmpeg/filter threads; constant-QP H264 with equal-QP forced first/last keyframes; AAC 64kb/s with headroom; strict root dependency version check. Engine and synthesizer were copied from the architecture-flow-video skill, then changed only inside this cut. Engine dependency is bundled source; Puppeteer is supplied by the pinned root installation. Copied `render.mjs` retains optional audition/music modes, but the reproduction above is the verified production path.


## Comparative corrections — 19 October 2026

Edited by `gpt-6-astra comparative review`; original author remains GPT-6.1 Sol. At 5.5s and 21s, ACTIVE now becomes zero as execution completes, although delivery credit stays occupied until ACK arrives. At 22.2s, SPACE FREED accompanies C’s dequeue and the reopening gate. C’s progress now continues beyond the visible window (nominal end 31s), so it cannot appear fully completed while labelled RUNNING during the fade. The original mechanism, timings, acknowledgement path and one-time resubmission remain. Updated encoded evidence is in `reviews/comparisons/queues-and-backpressure/`; the earlier author verification describes the earlier hash and is retained as history.

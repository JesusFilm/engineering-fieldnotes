# Video 04 beat sheet: Turn a failure into feedback

**Mechanism:** one cross-tenant access test. Tenant B sends `GET /invoices/7`, an invoice owned by tenant A.

1. The example contract expects 403. The first run returns 200 together with the invoice body.
2. The concrete mismatch, `expected 403` / `actual 200`, goes to the agent.
3. The agent adds an ownership condition and keeps the sign-in check: `allow if signed_in` gains `+ and tenant == owner`.
4. The change stays **unverified** until the same request reruns and returns `403`, `denied`, with no body.
5. The result is scoped: `PASS · 1 test`.

**Composition:** an API client view. A requester glyph (tenant B), the target invoice document (`#7`, `owner A`), the request line with an activity rail, and a live Response panel sit above a large expected/actual assertion pair and a verdict line. During feedback and editing, the Response panel turns into the agent's `auth check` editor, then returns for the rerun. There are no lanes, server boxes, or static form. The response body, the predicate, and the actual value all change state on screen.

Times are playback seconds for `video.mp4` (authored at speed 1, `meta.speed 0.9`). Duration 42.77 s, finite ending (hold, then the stage fades below the title).

## Synthesis decisions

| Choice | From | Reason |
|---|---|---|
| One cross-tenant test only, ending `PASS · 1 test` | Plan B | Plan A's control request plus a "1 of 1 cases" label would show two requests under a one-case count; one test keeps the count accurate |
| Fixed inputs on screen throughout (tenant B, invoice `#7` owned by A, `GET /invoices/7`, test name) | Plan B | The viewer can see the rerun used the same case |
| A leaking response body: `200` and a copy of `#7 · owner A` landing in the body (the source document stays put) | Plan B | Makes the wrong access observable, beyond a status number |
| Large expected/actual pair with `≠`/`=` and a verdict word; `expected 403` never changes | Plan B (pair) + Plan A (assertion as the comparison point) | The failure names the violated behaviour |
| Copies of `expected 403` and `actual 200` rise from the gap above the pair into the editor; the source values stay | Plan B | The agent receives the concrete mismatch, and no copy crosses the source text |
| Predicate shown as an **addition**: `allow if signed_in` plus a new line `+ and tenant == owner` | Neither plan as written | Both plans replaced `signed_in`, which would imply removing authentication; this keeps sign-in as a prerequisite |
| `unverified` verdict, with the old `200 ≠` dimmed as the old code's result, then reset to `—` before the rerun | Plan B (unverified) + Plan A (hold after the change) | A proposed repair is not yet a verified one |
| The rerun replays the identical execution: same tenant pulse, rail sweep, timing, and `work`/`arrive` cues | Plan A | The ear and eye recognise the same test; only the result differs |
| Rerun response `403` with `denied` and no body; `PASS · 1 test` in green | Plan B | Denial is observable; the pass is scoped to one test |
| Not used: Plan A's two tenant lanes, shared check box, and `1 of 1 cases` | — | A miscounted control case, and a lane topology close to a three-box flow |
| Not used: Plan A's off-stage feedback exit | — | The agent's editor makes receipt visible |

Sound map:

- Requester C5, owner E5, contract `ack` G5.
- The run is `work` C4 plus a neutral `arrive` E5 for the HTTP response, identical on both runs.
- The leaked body is a low `arrive` E4.
- The assertion failure is `miss`, the loudest cue at −7.7 dBFS.
- Feedback is `send` G6 then `deliver` G5; the predicate edit is `work` E4 then `store` E5.
- The reset is `ack` C6, the verified match a restrained `chime` G5, and the scope emphasis `ack` G5.
- `200` never gets a success sound.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–7.3 | **Who, whose, and the contract.** 1.67 tenant B pulses. 3.11 `owner A` is highlighted on invoice #7. 4.67 `expected 403` appears. | Requester differs from owner; the contract exists before any result; actual is `—` | 1.67 arrive C5 · 3.11 arrive E5 · 4.67 ack G5 |
| 2 | 7.3–15.8 | **First run fails.** 7.33 the request line lights and the rail sweeps. 9.56 the rail stops and the Response shows `200`. 10.22 a copy of `#7 · owner A` leaves the invoice and lands in the body at 11.33. 12.89 actual becomes `200` (red) with `≠` and `FAIL`, plus a small jolt. | Another tenant's invoice was returned; expected 403 ≠ actual 200 | 7.33 work C4 · 9.56 arrive E5 · 11.33 arrive E4 · 12.89 miss |
| 3 | 15.8–21.8 | **The mismatch goes to the agent.** 16.00 the Response panel becomes `Agent · auth check`. 16.89 copies of `expected 403` and `actual 200` rise from the gap above the pair. 18.44 they land as the editor's feedback row. 19.89 the current predicate `allow if signed_in` appears. | The agent holds the concrete mismatch; the source pair stays unchanged below | 16.00 arrive E5 · 16.89 send G6 · 18.44 deliver G5 · 19.89 ack E5 |
| 4 | 21.8–29.3 | **Change, unverified.** 21.78 `allow if signed_in` is selected (amber). 23.11 a new line `+ and tenant == owner` is added (amber), the old `≠ 200` dims, and the verdict becomes `unverified`. Hold. 27.33 the editor closes, the Response resets to `—`, and actual resets to `—`. | Ownership condition added and sign-in kept; nothing claims success; the old result belongs to the old code | 21.78 work E4 · 23.11 store E5 · 27.56 ack C6 |
| 5 | 29.3–35.8 | **Same test, rerun.** 29.33 the test name pulses and the identical execution plays (tenant pulse, rail). 31.56 the Response shows `403` and `denied`, with no body. 33.11 actual becomes `403` (green), `=`, `PASS · 1 test`. | Measured behaviour now matches the unchanged contract, for this test only | 29.33 work C4 · 31.56 arrive E5 · 33.11 chime G5 |
| 6 | 35.8–42.8 | **Scoped result.** 35.78 the test name pulses. Hold, fade from 40.7 to 41.8, then black below the title. | Tenant B, owner A, expected 403, actual 403, and denied remain together; no wider security claim | 35.78 ack G5 · silent hold |

## Reproduce

From the repository root:

```
node video/harness-engineering/motion-v2/04/engine/render.mjs video/harness-engineering/motion-v2/04/scene.js video/harness-engineering/motion-v2/04/video.mp4 --sheet video/harness-engineering/motion-v2/04/scratch/contact-sheet.png
```

The local engine starts from 03's local engine. It keeps the general `card`, `track`, `log`, `commit`, `ring`, and `edge` nodes, the chip `size` option, and `meta.veilTop`. It adds two general nodes:

- `disc`: an identity glyph with a label.
- `docv`: a document with two centred lines and a per-line highlight.

## Lesson text sync

`lessons.json` item 4 assumes 28 s with beats at 0/7/14/21. For this cut, retime it to duration 42.8 with beats at **0 / 15.8 / 21.8 / 29.3**. The first text beat ("Expected 403. Actual 200.") spans 0–15.8. This folder does not edit that file.

# Lesson 05 beat sheet: Verify the patch

**Mechanism:** a patch's claim is not evidence. The saved v1 fixture is pointed at the patch's actual revision and run. Its expected key is compared with the real response, and the narrow result (key present) is recorded with that revision. What the check does not cover (latency) is stated as not measured.

**Example (illustrative):** patch `rev b2` claims `keeps total_cents`; the fixture's target starts at the earlier `rev b1`. The endpoint, response values, and revisions are fictional, and no real execution is claimed.

Times are playback seconds in `video.mp4`. The scene is authored and played at speed 1. Duration is 42.8 s with a finite ending (fade to black).

## Neutral choices from plans A and B

| Idea | Source | Why |
| --- | --- | --- |
| A claim card with a status pill, `unverified` → `checked @ b2`; the claim text itself never changes | Plan B | The claim stays a claim; evidence sits beside it |
| The fixture's target starts at `rev b1` and is corrected to `rev b2` before running | Plan B | "Run it against the actual changed code," shown as a caught mismatch before any run |
| A narrow assertion: `key total_cents` present → `PASS · key present` | Plan A | A green result covers only what the fixture checks |
| Expected and actual columns, with the expected key level with the matching actual row and a bracket in the lane between them | Combined | The match is visible before any pass appears |
| A record row `rev b2 · v1 fixture · pass` and `latency: not measured` | Plan A | Binds the result to the revision and names what it doesn't cover |
| `rev b2` lights in the patch, the fixture target, and the record at the end | Both | The revision identity carries through |
| Not used: Plan B's three-field type check and its `verified @ b2` badge, plus Plan A's record view that replaces the panels | — | Narrower claims; all evidence stays visible together |

**Geometry (different from lessons 01–04):** a claim strip, a one-line fixture-run bar with a target and an endpoint, a two-column comparator with a check lane and a result row, and a record. Text is 36–42 px (12–14 px at 350 px wide; only the `expect`/`actual` column labels are 36 px).

## Beats

| # | Time | What moves | State change | Sound |
| --- | --- | --- | --- | --- |
| 1 | 0.0–9.6 **The claim needs evidence** | 0.4 `patch`; 0.8 `rev b2` (amber mark); 1.6 `claims: keeps total_cents`; 2.4 pill `unverified` (amber). 3.4 `fixture run` (`idle`), `target rev b1`, `GET /v1/invoice`. 4.2 `compare` with `expect` and `actual`; 4.6 `key total_cents`; actual reads `not run`; result row `no result`. 5.2 empty `record`. 6.6 the claim line and the `no result` row light together. Hold. | A claim exists; no run and no result. | 0.8 store C5 · 1.6 ack C5 · 2.4 ack C4 · 3.4 ack A5 · 4.6 store G5 · 5.2 ack E4 · 6.6 ack C4 |
| 2 | 9.6–21.4 **Run the fixture on the changed revision** | 9.6 `rev b2` lights; 10.2 `target rev b1` turns red with ×, and the bar jolts. 12.0 the target becomes `target rev b2` (amber mark); 12.8 both revisions light together. 15.4 `running` with a scan line. 16.6 a dot goes to the comparator; 17.0 `actual · rev b2`; 17.2 `invoice: 42`; 17.6 `total_cents: 1250`; 18.0 `done`. Hold. | The run targets b2; the actual response is shown, with no verdict yet. | 9.6 ack C5 · 10.2 miss (quiet) · 12.0 clock + 12.2 ack A5 · 12.8 ack C5 + 13.0 ack A5 · 15.4 send A6 · 15.7–16.3 work E4 ×4 · 17.2 store E5 · 17.6 store E5 · 18.0 arrive E5 |
| 3 | 21.4–28.8 **The response has the key** | 21.4 `key total_cents` lights; 22.0 a bracket crosses the lane; 22.5 `total_cents: 1250` lights; 23.0 a ✓ ripple in the lane; 23.8 `PASS · key present` (teal, ✓). The bracket turns teal. Hold. | The assertion passes for this fixture only. | 21.4 ack G5 · 22.0 send G6 · 22.5 ack E5 · 23.8 chime |
| 4 | 28.8–42.8 **Keep the result with the revision** | 28.8 a dot to the record; 29.2 `rev b2 · v1 fixture · pass` (teal, amber mark); 30.4 `latency: not measured`. 32.0 the claim pill reads `checked @ b2` (teal). 32.6 `rev b2` lights in the patch, the fixture target, and the record. Hold to 41.0; fade 41.0–42.2. | The evidence is bound to b2, with its limits stated. | 28.8 send G6 · 29.2 store E4 · 30.4 ack C4 · 32.0 arrive C5 · 32.6/32.8/33.0 ack C5/A5/E4 |

The video has 32 cues. Pitches: claim C5, fixture run A5, response E5, compare G5, record E4. The quiet `miss` marks the stale target only, and the single `chime` marks the assertion.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in the root `node_modules`:

```
node video/context-engineering/motion-v2/05/engine/render.mjs video/context-engineering/motion-v2/05/scene.js video/context-engineering/motion-v2/05/video.mp4 --sheet video/context-engineering/motion-v2/05/scratch/contact-sheet.png
ffmpeg -v error -y -ss 35.0 -i video/context-engineering/motion-v2/05/video.mp4 -frames:v 1 -q:v 3 video/context-engineering/motion-v2/05/poster.jpg
```

`engine/flow-engine.js` is lesson 04's engine copied unchanged: the clean engine plus the general `sheet`, `trace`, and `accordion` nodes. Other lessons were not modified.

## Lesson text sync

`sequence/lessons.json` item 5 declares duration 28 with beats at 0, 7, 14, and 21. For this cut, the coordinator should retime it to a duration of 42.8 with beats at **0, 9.6, 21.4, and 28.8**. The beat texts map one to one in order. This folder does not edit that file.

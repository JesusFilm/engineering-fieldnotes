# Catch an overbroad fix — lesson 03

## Scope and grounding

Teach one mechanism: a required regression case catches a patch that satisfies a new requirement by breaking behavior that must remain valid. Patch A rejects every login. Empty-password rejection matches its expectation; valid-password rejection contradicts its expectation. The grader rejects Patch A while retaining the first case's pass.

Grounding: `video/agent-evals/sequence/lessons.json` item 3; `content/concepts/agent-evals.json`, especially example, judgment, walkthrough step 3 and first pitfall. Source support: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), consulted 2026-10-20, for outcome-based grading against defined criteria. The authentication example and visual design are illustrative editorial choices from the local concept, not reported experimental findings.

Use five beats over approximately 46 seconds. The two inputs execute sequentially through the same unchanged patch, making the overbroad behavior visible. Do not introduce Patch B, repair, repeated trials, configuration rankings, subjective grading, hidden tests, release decisions or later lessons. No percentage score: one required failure must not disappear into an average.

## Software-native layout

1080×1920, 30fps. A compact code inspector above a two-row test-results worksheet. Each row expands while its case runs, then leaves evidence in place. This is a case comparison, not a three-node pipeline or a physical metaphor.

All bounds are top-left; text coordinates are baselines unless stated. Background #050506, primary text #E6E8EC, secondary #8B9099, active #F5A524, matching criterion #3FB68B, failed criterion #E5484D. Use 50–56px for useful labels (16–18px at 350px), 44px minimum for supporting labels. Do not encode meaning only in color.

| Element | Coordinates | Labels / persistent identity |
|---|---|---|
| Title | center x540, baselines y295 and y385 | `Catch an` / `overbroad fix`, 78px |
| Patch inspector | x90 y470 w900 h285 | `PATCH A` at (125,535); `login(password)` at (125,620); `return REJECT` at (180,705), 54px monospace |
| Worksheet heading | (110,835) | `REQUIRED CHECKS`, 48px |
| Empty-password row | x90 y880 w900 h300 | Header `Empty password` at (125,945); expected line y1030, observed line y1115 |
| Valid-password row | x90 y1220 w900 h300 | Header `Valid password` at (125,1285); expected line y1370, observed line y1455 |
| Row labels and values | label x125, value x540 | `Expected` / `Observed`; values `reject` / `accept`; observed begins as `—` |
| Case verdicts | right-aligned x955, respective header baselines | `not run` → `running` → `PASS` or `FAIL`, 44px; reserve x760–955 for status |
| Grader strip | x90 y1590 w900 h160 | `PATCH A` at (125,1650); verdict at (125,1720): `not graded` → `REJECT PATCH` |

Keep the code excerpt explicitly schematic: two lines describe this deliberately bad implementation, not a language-specific API. The unconditional return remains visible for both calls. Test expected values are fixed before either call.

Two routing gutters preserve legibility: requests go from a row's top-left corner (110,880) or (110,1220), via x60 to (60,620), then to code port (90,620). Returns leave (990,705), travel via x1020 to the active observation baseline minus20, and enter at that row's right edge. Short input chips use `empty` / `valid`; they move only in blank gutters. If those chips exceed available gutter width, use a small dot on the route and highlight the corresponding case name instead; never shrink text. No route goes through the other row's contents. A small pulse on the code line marks execution, then a neutral return dot arrives. The observed value appears only on arrival.

Row highlights and comparison marks are local. A pass must not turn the whole worksheet or patch green. Valid-login rejection is displayed neutrally until compared; the failed expectation then turns red. This distinguishes application rejection from a failed test.

## Beat sheet with granular events and sound

All times are playback seconds at speed1. State is retained unless explicitly changed. Holds have no decorative motion or ticking.

| Beat | Time, motion and state | Sound events |
|---|---|---|
| 1. Establish the overbroad code and both requirements | 0–1s: inspector reveals PATCH A. 1.7–2.5: `login(password)` and unconditional `return REJECT` reveal. 3.5–4.3: empty-password row appears with expected `reject`. 5.3–6.1: valid-password row appears with expected `accept`. Both observed fields are `—`; grader says `not graded`. Hold 6.1–9s. | Inspector `arrive` E5 at1s; quiet `work` E4 at2.5s; criterion `ack` G5 at4.3 and6.1s. No success sound. |
| 2. New requirement passes | 9s: empty row becomes active/running. 9.6–10.8: request travels to code; 11–11.6: return line pulses. 12–13.2: response reaches empty row and observed becomes `reject`. Hold13.2–15s with no verdict. 15–15.8: expected and observed values receive paired underlines; at16s show `PASS` and a small check. Hold16–19s. | Request `send` C6 at9.6; code `arrive` E5 at10.8 and `work` E4 at11; response `deliver` E5 at13.2; grader `chime` G5 at16. |
| 3. Existing valid behavior breaks | 19–19.6: active outline moves to valid row; empty row retains its pass and both values. 20–21.2: valid request reaches the same Patch A. 21.5–22.1: same unconditional return pulses. 22.5–23.7: observed `reject` lands in valid row. Expected stays `accept`. Hold23.7–27s on the mismatch, before giving the verdict. | `send` D6 at20 identifies valid input; same code `arrive` E5 at21.2, `work` E4 at21.5, and `deliver` E5 at23.7. The identical return sound reinforces that the code rejects both inputs. |
| 4. Regression check fails | 27–27.8: expected `accept` receives underline. 28.7–29.5: observed `reject` receives underline. At30s, a small × and `FAIL` appear on the valid row; only its border and mismatch become red. Hold30–34s with the empty row still passed. | Quiet grader `ack` G5 at27.8 and29.5; muted `thump` G3 at30. No crash sound or system shake: the code ran, but its result was wrong. |
| 5. Reject the patch, retain both results | 34–35s: a thin bracket at x1005 spans the two required rows, visually collecting both results. At35.8s grader strip changes from `not graded` to `REJECT PATCH`, red border. At37s PATCH A header briefly pulses red to tie verdict to that artifact; code and results remain visible. Hold38–46s on PASS / FAIL and the patch verdict. Finite ending; do not reset or erase the regression evidence. | Grader `store` G4 at35.8 for the retained decision; restrained `thump` E3 at37 ties rejection to Patch A. Final hold is silent. |

Actor map: empty case C, valid case D, executable patch E, grader G. Sender cues quieter than arrivals; pan to the emitting element. Avoid victory fanfare on the first pass. Audio must distinguish code returning a rejection from the grader rejecting a patch. The same causal story must work muted.

## Accuracy limits

- Both expected results are defined before execution. The second case is not an invented criterion added after seeing a failure.
- Assume a legitimate synthetic account and correct nonempty password for the valid case; do not expose real credentials. `valid` is an input-fixture label, not a claim inferred from the patch response.
- Empty and valid passwords both receive application rejection under Patch A. The first test passes and the second fails because their expectations differ, not because `reject` always means test failure.
- Keep Patch A unchanged between calls. Do not imply two versions, a new fix, or nondeterministic behavior.
- The single valid case is sufficient to disprove the required behavior for this patch. These two cases are not exhaustive authentication coverage, and a hypothetical pass of both would not guarantee safety.
- The grader's `REJECT PATCH` means the candidate fails required correctness criteria. It is neither permission enforcement nor an actual deployment action.
- No environment error, missing test, timeout or adversarial test tampering occurs in this example. Do not add those failure categories.

## Acceptance at native 350px and encoded review

These are later-production checks, not validation already performed.

1. Inspect individual actual encoded frames at 350px width, without zoom, near 6.5, 13.5, 16.5, 24, 30.5, 36 and45s. Inspect before/during/after each transfer and verdict at full resolution and native350, including the long valid-case return path. A contact sheet alone is insufficient.
2. Viewers can identify the unchanged patch, two different required expectations, identical observed rejections, opposite case grades and final patch rejection. The first pass stays visible when the second case fails.
3. `Expected accept` and `Observed reject` must be large enough to compare immediately. If the header/status collide, shorten status to `—` until running rather than compressing font size. Observe real text bounds at 350px.
4. No PASS before comparison; no patch rejection before the regression failure. No global green state after the first case. Valid response must not be shown as accepted merely because its input is valid.
5. Check gutters, moving chips/dots, bracket, marks and glows for text intersections and clipping. Reproduce any suspected defect using an alternate frame-extraction/display path before reporting it.
6. Confirm deliberate holds allow reading without competing motion. Keep both rows and verdict through the finite ending. Do not shorten mismatch exposure to fit a nominal duration.
7. Verify actor-specific sound by listening when possible; distinguish listening from waveform/peak analysis in the report. Decode the entire encode, inspect peaks below -0.5dBFS, confirm audio stream and moov before mdat.
8. Comparative review is against the public lesson and intended scope, not this plan's implementation fidelity. Hash both videos before/after; bind the decision to the actual candidate SHA-256. Any repaired encode requires fresh encoded inspection.

## Write and production boundary

Only this anonymous plan is authored this turn. No rendering, implementation source or other lesson work. A later implementation must use repository-pinned Puppeteer and a local engine copy; any custom worksheet geometry remains in the assigned cut. No public/site/shared-skill edits, commits or deployment. Stop after this deliverable for user confirmation before further work.

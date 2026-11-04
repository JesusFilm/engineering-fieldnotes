# Lesson 01 plan B: Wait for a response

## Mechanism

A caller sends one request and then has to wait. Network travel in both directions and the service's processing time all count toward that wait. When a response arrives, it is evidence about this particular request, and the caller can act on it. Some responses take longer than the caller is willing to wait, so an **attempt timeout** puts a limit on how long one attempt can wait. The viewer should leave with one picture: a single attempt has a fixed amount of waiting room, and every part of the round trip uses some of it.

The lesson ends when the caller stops waiting. It does not show what happens at the service afterwards. It also leaves out retries, backoff, an overall deadline across attempts, "outcome unknown" reporting, cancellation, late responses and idempotency, because later lessons cover them.

## Layout: request lanes above a two-row trace

The layout is software-native. The top half shows two systems joined by separate request and response lanes. The bottom half shows a small trace waterfall, like a distributed-tracing span view. The trace is the main teaching device, because it turns waiting into length and gives both attempts the same scale and the same timeout line.

| Element | Type | Position (1080×1920) | Notes |
|---|---|---|---|
| Title / subtitle | engine title | y 330 / 405 | "Timeouts and retries" / "WAIT FOR A RESPONSE" |
| Release assistant (caller) | box w 560 h 150 | (540, 640) | label 46 px; sublabel 38 px shows state: idle, `waiting` (amber), `#418: passed` (green), `stopped waiting` (mid grey) |
| CI service | box w 560 h 170 | (540, 1110) | label 46 px; contains a `bar` w 380 h 22 at (540, 1150) showing processing progress (amber fill) |
| Request lane | wire | (450, 715) → (450, 1025) | carries the request downward |
| Response lane | wire | (630, 1025) → (630, 715) | carries the response upward; at the timeout a short horizontal "gate" bar (new generic `gate` node, or a 120×10 `bar`) closes across its top end at (630, 740) |
| Trace axis | bar track / label | x 150 → 930, y 1430 | 780 px represents 5 illustrative seconds (156 px per s); faint tick dots at each second |
| Timeout line | vertical dashed rule | x 930, y 1440 → 1660 | label "5 s timeout" 40 px at (930, 1405), right-aligned so it stays inside the frame |
| Row 1 (first attempt) | `bar` w 780 h 34, 3 segments | y 1500 | seg0 network out (grey `#8B9099`), seg1 processing (amber), seg2 network back (grey) |
| Row 2 (second attempt) | `bar` w 780 h 34, 2 segments | y 1600 | seg0 network out, seg1 processing, which keeps growing until it reaches the timeout line |
| Result badges | badge 44 px | right of each row's fill end | "3 s" (green) at row 1; "timeout" (red) at the line on row 2 |

There are no axis numbers apart from "5 s timeout" and the "3 s" badge. The duration is carried by bar length and the ticking clock. Both chips use 40 px monospace: the request `status #418?` and the response `#418 passed`. Using the same build number in both shows that the response answers this request. Every element is at least 36 px tall or thick, and key text is 44 px or larger, which comes to about 13–15 px when the video is shown 350 px wide. Strokes are at least 6 px so the dashed timeout line and the gate are still visible at that width.

## Time scale

The attempt timer runs at one constant rate in both attempts: **1 illustrative second = 2.5 video seconds**, so a full 5 s attempt takes 12.5 s of video. Keeping the rate constant makes the length comparison between the rows honest. The clock ticks once per illustrative second, so the viewer can count them. The first attempt hears three, and the second hears four before the cutoff on the fifth. All times are illustrative policy values, as the lesson takeaway says.

## Beat sheet (authored at speed 1, about 35 s)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–3.5 | Caller fades in (0.4), then CI service (1.0), then both lanes (1.6), then the trace axis and timeout line (2.2) | Idle stage. Row 1 is an empty track. Hold from 2.6 to 3.5 | Caller reveal note G4; service reveal note C4; a soft tick as the timeout line draws |
| 3.5 | Caller pulses white; chip `status #418?` starts down the request lane (1.75 s, ease in-out, marching dots on the lane) | Row 1 seg0 grows grey in step with the chip; caller sublabel changes to `waiting` (amber) with a slow glow that breathes | Caller `send` G5 (quiet); quiet network whoosh falling over the travel |
| 5.25 | Chip lands at CI service | White ripple; service glows white; its progress bar starts filling amber; row 1 switches to seg1 (amber) | Service `arrive` C5; service `work` ticks (C3, every 0.25 s, low gain) while processing |
| 6.0, 8.5 | — | Caller still waiting while the service works and row 1 keeps growing | Caller clock ticks for illustrative seconds 1 and 2 (E6 short, panned to the trace) |
| 9.25 | Service finishes; chip `#418 passed` (green border) leaves up the response lane (1.75 s) | Service progress bar turns teal, then idle; row 1 switches to seg2 (grey) | Service soft done blip; network whoosh rising |
| 11.0 | Chip reaches the caller | Green ripple at the caller; row 1 stops at 3 s (60 % of the track) and gets a green outline; "3 s" badge pops in; the 2 s gap to the timeout line stays visible | `deliver` high (fast outcome), replacing the third clock tick |
| 11.4 | — | Caller sublabel changes to `#418: passed` (green) with a pulse, showing the caller can use the reported status | Caller `chime` G5→D6 |
| 11.4–14.5 | **Hold** | Everything is still. The full first attempt is readable as a request, processing and a response that fit inside the limit | Silence |
| 14.5–16.0 | Row 1 dims to 40 % and stays as a reference ghost; row 2 track appears; caller sublabel clears to idle; service bar clears | Second attempt is ready | Soft reset note, caller pitch G4 |
| 16.0 | Same request chip `status #418?` goes down the request lane | Row 2 seg0 grows; caller back to amber `waiting` | Caller `send` G5; whoosh |
| 17.75 | Chip lands at CI service | Ripple; processing bar starts but fills much more slowly (reaches about 40 % of its width by the timeout); row 2 seg1 amber keeps growing | Service `arrive` C5; `work` ticks resume |
| 18.5, 21.0 | — | Waiting continues | Clock ticks 1, 2 |
| 23.5 | Row 2's growing tip passes the end of the ghost row 1, where the first response arrived | The ghost's end marker and "3 s" badge pulse faintly; no chip appears on the response lane | Clock tick 3 plus a muted, lowpassed echo of `deliver`: the place where a response came before, now empty |
| 23.5–28.5 | Row 2 keeps creeping toward the timeout line; the caller's amber glow breathes faster over the last illustrative second | Waiting continues past the normal case | Clock tick 4 at 26.0; `work` ticks continue underneath |
| 28.5 | Row 2 reaches the timeout line | The line snaps red; "timeout" badge pops in red on row 2; the gate closes across the top of the response lane with a small `shake` (6 px); caller amber snaps to neutral grey and the sublabel changes to `stopped waiting`; row 2 freezes exactly at the line | Custom `cutoff`, the loudest cue (about -3 dBFS peak): a sharp click, a short noise burst, and a falling sine G4→G3 over 0.35 s, panned to the caller |
| 28.5–29.3 | CI service and both lanes dim to 30 % | The view stays on the caller. Nothing is drawn at the service: no ×, no completion, no stop mark | Work ticks fade out over 0.8 s along with the dim |
| 29.3–33.5 | **Hold** | Final comparison: the green row 1 ends inside the limit and the red row 2 ends at the limit, with the gate closed | Silence |
| 33.5–34.5 | `s.fade` to black | Stage clears so the loop restarts on the empty opening state | none |
| 34.5–35.0 | Black hold | — | — |

Suggested caption sync if the coordinator later retimes `lessons.json` for this cut: beat 1 at 0 s, beat 2 at 5.25 s, beat 3 at 11.0 s, beat 4 at 16.0 s, with the timeout landing at 28.5 s. The current item lists a 28 s duration and beats 7 s apart, so it would need updating by the coordinator. This plan leaves that file unchanged.

## Sound map

Each actor has its own pitch so the viewer can hear who is acting. The **caller** uses G: G4 for reveal and reset, G5 for sends, and a G5→D6 chime when it uses a result. The **CI service** uses C: C4 for reveal, C5 for arrival, and low C3 `work` ticks while processing. The **caller's attempt timer** is a dry, short E6 `clock` tick, once per illustrative second, panned to the trace panel. Its steady count measures waiting time, and its sound stays distinct from the service's busy ticks. The **network** is a very quiet filtered noise sweep: falling on the way down and rising on the way back. The fast response uses a high `deliver`. The timeout uses the custom `cutoff`, the only percussive event in the piece and the loudest. The `crash` preset is avoided because nothing has broken; the caller is applying its own limit. In the second attempt, the muted `deliver` echo at 3 s makes the missing response audible.

Mix rules: one cue per visible event. Sends sit under arrivals. Work ticks stay low enough that the clock ticks remain clear over them. The peak stays below -1 dBFS.

## Things to keep out of this lesson

Show a single second attempt only to contrast it with the first. The caller never sends again after the timeout, and nothing is labelled "retry". There is no overall deadline bar, no backoff gap, no late response chip and no "unknown" label. The service does not stop, fail or finish on screen after the cutoff; dimming it moves attention without making a claim about it. The "5 s" and "3 s" values are illustrative, matching the lesson takeaway.

## Build and verification notes

Write the scene in this variant's directory, using the repository's pinned engine copy. Put any generic `gate` node or dashed vertical rule in a local engine extension next to the scene, named for its shape. Before rendering, run a Node dry-run to confirm cue times: three clock-or-deliver cues in attempt one, four ticks plus the cutoff in attempt two, and no cue after 29.3 apart from the work-tick fade.

Render one still per beat at 2.6, 4.4, 7.5, 11.2, 13.0, 15.5, 20.0, 23.6, 28.7 and 31.0. Check each at full size and scaled to 350 px wide, and confirm that the chips, sublabels, "5 s timeout" and the badges can be read and do not collide with the lanes or ripples. Check every beat boundary for leftover state, especially the green status text and row 1's colour after the reset. Decode the whole file, view the spectrogram to confirm a cue on every beat and that `cutoff` is the loudest, check that `volumedetect` max is below -0.5 dB, and confirm `ffprobe` reports the duration, an audio stream and faststart metadata. Record whether the audio was listened to or only analysed.


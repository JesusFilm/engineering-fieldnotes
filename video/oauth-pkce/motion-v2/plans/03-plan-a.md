# Lesson 03 — Bind code and challenge

## Teaching target and boundary

One mechanism: the authorization server associates the issued code with the challenge supplied for this authorization attempt. Begin after challenge creation; finish at receipt of the code. The viewer should identify what stayed at the client, what crossed the browser, and which association remains at the server. Use only abstract labels: `Verifier A`, `Challenge A`, `Code A`, and `Attempt A`. A is a teaching identifier, never a literal protocol parameter or a secret value.

Plan a finite, approximately 40-second scene. The existing lesson's 28 seconds is reference metadata, not a required runtime. No rendered artifacts or implementation changes belong to this planning task. On-screen text consists of short labels and changing state fields; the explanatory prose here is production direction, not subtitles.

## Visual staging

Use a 1080 × 1920 dark canvas. Title at (540, 285), split over two lines: `Bind code` / `and challenge`, 78px. Four semantic actors: Client, Browser, Authorization server, and a User interaction represented by a cursor and an explicit approval control inside the browser. No model actor, protected resource, token endpoint, locks, keys, envelopes, or physical metaphors.

Three broad software panels keep the routing readable at phone size:

- Client: rectangle x=110–970, y=470–770. Header at y=515. Persistent local `Verifier A` row at y=600; outgoing challenge or received code row at y=690.
- Browser: rectangle x=110–970, y=910–1170. Header at y=955. One changing content area, centered near y=1065: authorization request, approval control, then redirect.
- Authorization server: rectangle x=110–970, y=1320–1730. Header uses two lines if needed. Transaction heading near y=1450; challenge row near y=1530; code row near y=1630. Show a logical record, not a claim about database schema or storage architecture.

Downward request segments run (540,770)→(540,910) and (540,1170)→(540,1320). Return segments use the same endpoints in reverse, activated only during the redirect beat. Moving chips stay in the inter-panel gaps; source and destination row highlights establish continuity without drawing through panel text. The verifier row has no connector. Never dim it below readable contrast.

All essential labels use 52–60px type (16.9–19.4px when displayed at 350px width); no essential microcopy. Use at least 6px strokes and 28px interior gaps. A 350 × 622 preview is the acceptance size, not a zoomed screenshot. Long actor names wrap, never shrink. Near-white text on #050506, amber for active focus, teal for completed local state. Matching A labels and shared row outlines carry identity without relying on color. Challenge and code use distinct named chips, never a morph that could imply the code is computed from the challenge.

## Beat sheet

| Time | What moves | Visible state change and meaningful hold | Sound |
| --- | --- | --- | --- |
| 0–5s | Client rows appear in sequence; a subtle focus outline moves from verifier to challenge. | `Verifier A` remains in the local row. `Challenge A` becomes the selected outgoing item. Hold the two distinct rows for 2s. Do not repeat challenge derivation. | Client `store`, C5, for local row; quiet `ack`, C5, for challenge selection. |
| 5–12s | Challenge chip travels client→browser, then browser→server, about 0.8s per segment. Browser content reads `Authorize` while active. A compact `S256` tag accompanies the challenge. | Browser changes to an active authorization request, then server's `Attempt A` record receives the challenge and method. Client verifier stays fixed. Hold arrival for 2s. Other OAuth request fields are intentionally abstracted, not declared absent. | Client `send` C6; Browser `arrive` E5, then `send` E6; server `store` G5 at the record write. |
| 12–18s | Server focus passes through a temporary `OAuth checks` status; browser content becomes a consent control labelled `Approve`. | Checks become a small completed status before the approval control is enabled. Server challenge remains recorded; code row is still empty. Hold the awaiting-user state for 2s. Authentication is assumed complete for this example; no credential-entry animation. | Server `work` G5 then `ack` G5; Browser `arrive` E5 as approval UI becomes available. |
| 18–24s | User cursor enters, clicks `Approve`, and an approval dot moves browser→server. | Browser displays `Approved`; server authorization status changes only after receiving the user decision. The challenge row stays in place throughout. Hold this causal ordering for 2s. | User `ack` A5 on click; Browser `send` E6; server `arrive` G5 at approval receipt. |
| 24–31s | A new `Code A` row appears beneath `Challenge A` inside the same server record. A short internal association line draws between the two rows; the common outline highlights once. | Empty code field becomes issued code; both rows remain visible together. Brief label `Bound` identifies the association. Hold for 2.5s before routing begins. Nothing travels into the server from the verifier row. | Server `store` G5 on code creation; a restrained `ack` G5 as the association completes. No token-success fanfare. |
| 31–40s | A copy of the issued code travels server→browser→client, about 0.8s per segment, with a 1.5s browser hold labelled `Redirect`. At client receipt, focus moves once between the received code, local verifier, and retained server association. | Browser shows the redirect before the client code row fills. Server record persists. Final short status appears: `Proof still required`, followed by `Later: match challenge`; show sequentially, not as a paragraph. Hold final state 2.5s and finish. The verifier never leaves the client in this lesson. | Server `send` G6; Browser `arrive` E5 then `send` E6; client `deliver` C5. Quiet server `ack` G5 when the retained association is highlighted. Silence during the ending hold. |

Timing is adjustable within these beats. Compress any empty interval instead of filling it with decorative pulses, looping traffic, typing delays, or a clock. Each motion must change ownership, UI status, or stored state. Sound follows event contact, not arbitrary beat boundaries.

## Sound and motion implementation directions

Use the skill's scene scheduling primitives: software panels and local store rows, `s.set` for discrete field/status changes, `s.packet` with chip/dot payloads, `s.wire` for the two browser-mediated segments, and modest `s.pulse` for row association. Prefer a local drawing helper if stock store typography cannot meet the actual 350px requirement. Do not modify the shared engine. All state should be deterministic when seeking to a time.

Client C5, Browser E5, server G5, and User A5 remain consistent throughout; sends use the sender's octave above. Keep send gain roughly half arrival gain. Center pan suits this vertical layout; pitch supplies actor distinction. No music, narration, crash, rejection, or celebratory chord. These are ordinary successful authorization events, not a completed token exchange. Finite ending preserves the final state; do not rewind or erase it to manufacture a loop.

## Accuracy constraints

The server record is an illustrative logical association. Include S256 in the recorded state, while avoiding a hashing diagram. The code is issued after approval, and its association is retained when a copy is returned. The browser conveys the authorization request and redirect; it neither generates the code nor possesses the verifier. The challenge is not described as secret. Request validation, user authorization, and eventual proof are visibly distinct states. `OAuth checks` is an abbreviation for normal validation, not a declaration that PKCE is sufficient. Do not show access granted, tokens, tool permission, a verifier transmission, a comparison algorithm, or a deliberately failed exchange. End with the obligation to prove possession later, not a simulated rejection of the current valid flow.

## Verification planned for implementation

Inspect encoded frames at each arrival, each state transition, and the busiest association frame at both full resolution and actual 350px width. Read every required label without zoom. Trace the verifier's position across all frames; ensure no travelling chip contains it. Verify that request order is client→browser→server and response order is server→browser→client. Check that no issued code precedes user approval, that record rows persist, and that code receipt does not trigger a token or access-success visual.

Play the scene muted: ownership, approval, binding, and redirect must remain understandable. Listen separately for distinct actor cues and absence of sounds during holds. Inspect event alignment and audio peaks below -0.5 dBFS, decode the full eventual encode, and check streaming metadata. These are future checks, not claimed completed results. No comparative score or recommendation is assigned by this plan.

A beginner's observable success test: pause on the final frame and ask them to point to the retained verifier, the returned code, and the server's challenge association; then ask whether receiving the code completes proof. Correct answers must be supported by the visible states without requiring exchange mechanics.

## Source basis

Primary references checked 2026-11-04:

- [RFC 7636 §§4.3–4.4](https://www.rfc-editor.org/rfc/rfc7636#section-4.3): challenge and method travel in the authorization request and are associated with the issued code. [§4.6](https://www.rfc-editor.org/rfc/rfc7636#section-4.6) supports the final later-proof requirement; its algorithm stays outside this scene.
- [RFC 6749 §§4.1.1–4.1.2](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1): authorization request validation, the user's authorization decision, and redirect response establish the ordering.
- [RFC 8252 §4.1](https://www.rfc-editor.org/rfc/rfc8252#section-4.1): external-browser authorization and return to a native client support the example's browser path.

Local scope references: repository AGENTS.md and docs/editorial-workflow.md; item 3 of video/oauth-pkce/sequence/lessons.json; content/concepts/oauth-pkce.json; architecture-flow-video SKILL.md and its style, engine API, and review references. Layout, pacing, pitches, and logical record presentation are editorial design choices, not protocol mandates.

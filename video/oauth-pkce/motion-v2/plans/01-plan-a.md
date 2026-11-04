# Lesson 01 — Delegate access

## Teaching contract

Plan only. One mechanism: a client obtains limited delegated API access through browser authorization, a returned code, and a separate token exchange; the API still makes its own access decision. Use a synthetic incident-reading application as the concrete example. The client is the application host, never the model. Target 46 seconds at 30 fps, with a finite ending. The sequence's existing 28-second duration is context, not a timing constraint for this proposed cut.

Keep “Simplified illustrative flow” visible beneath “Delegate access” throughout. This is a conceptual trace, not an implementation recipe. No verifier, challenge, hash, concurrent attempt, interception or PKCE comparison appears. Required security checks are elided, not declared optional. No identity profile, “logged in” badge, password form, universal sign-in promise or real credential appears. User authentication details and consent presentation vary; this example depicts an explicit approval action without claiming that every authorization repeats that screen.

## Stage and visual grammar

1080 × 1920, black background, light foreground, restrained amber focus and teal success. Use software panels, request rows, typed chips and local decision indicators. No keys, doors, tickets, people carrying objects or physical metaphors. The user is represented by a pointer labelled “User” within the browser, not a fifth infrastructure service. Actor names and shape remain stable across compositions.

Essential text is at least 48 px at source, approximately 15.6 px at actual 350 px width; actor names use 54–60 px and title 84 px. Two-line actor label “Authorization / server” is intentional. Main content stays inside x=72–1008, y=450–1710. All sentences in this plan are production instructions, never screen paragraphs. Keep at most one active request and one teaching focus at a time. Stable payload labels stay in their source or destination panel while a small corresponding shape travels, avoiding unreadable moving text.

Three purposeful compositions replace an unchanging network diagram:

1. **Need and browser authorization, 0–14 s.** Client panel centred (280,650), 380×240; resource API centred (800,650), 380×240. Browser centred (540,1110), 880×340; authorization server centred (540,1580), 760×200. Client-to-browser route runs from (280,770) to (280,940). Browser-to-server route connects (540,1280) to (540,1480). Initial client/API line is only an inactive intent line: no premature successful call.
2. **Return and exchange, 14–29 s.** Preserve the four actors through a 0.6 s position transition: browser centred (540,640), 880×260; client centred (270,1140), 380×280; authorization server centred (800,1140), 400×280. API rests as an inactive labelled panel centred (540,1580). Code travels server top (800,1000) → browser bottom (800,770), then browser bottom (270,770) → client top (270,1000). Direct exchange uses facing client/server edges (460,1140) and (600,1140); request/response occur sequentially. Browser route dims before this direct route activates. Server remains a single actor with its active operation changing from “Authorize” to “Token exchange”.
3. **API decision, 29–46 s.** Client centred (540,600), 840×220; API expanded at (540,1110), 880×600. Request route (540,710) → (540,810); response uses the reverse route after checks. API interior has three sequential status rows centred at y=1000, 1120, 1240. Browser and authorization server leave the stage by a continuity-preserving fade; do not collapse them into the API. Result appears inside client, not as a global success banner.

The browser displays the authorization server's approval UI, with a short origin label “auth.example”. This is not a separate client-owned approval form. Wire direction, actor labels and distinct shapes communicate ownership without requiring colour vision. A hollow chip labelled “Authorization code” and a filled chip labelled “Access token” never morph into one another. No token string, callback URL payload, JWT body or credential text is rendered.

## Beat sheet and granular timing

| Time | Motion | Visible state change and hold | Sound |
| --- | --- | --- | --- |
| 0–5 | At 0.4, client request row reveals “Read incidents”. At 1.2, API panel appears across from it; intent line stops short of API. At 2.2, client's “Connect” control becomes the focus. | Client needs resource access; no data has arrived. Hold the unresolved request 2.2–4.4, then begin browser opening over 0.6 s. | Client `work` C5 at 0.4, API `arrive` G5 at 1.2, quiet client `ack` C5 at 2.2. |
| 5–14 | At 5.0, client launches browser authorization over 0.7 s. Browser sends request to authorization server at 6.4–7.1; server response activates its approval UI in the browser at 7.8–8.5. Browser shows “Read incidents” and “Allow”. User pointer settles at 9.1, clicks at 10.0; approval travels to server at 10.3–11.0. | Browser is visibly the interaction surface; authorization server records “Read granted” at 11.6. API remains inactive. Hold 11.6–13.4; composition transition 13.4–14.0. | Client `send` C6; browser `arrive` D5; server `arrive` E5; browser `arrive` D5 on UI arrival; user `ack` A5 at click; server `store` E5 at grant recording. |
| 14–21 | Server produces the hollow “Authorization code” chip at 14.2. At 15.0–15.7 it reaches browser. Browser navigation strip changes to “Redirect”; at 16.6–17.3 the code reaches client callback. | At client, code rests in a row labelled “For exchange”. Separate short labels “Not a token” and then “Not a password” appear at 17.8 and 19.0; neither is represented as a transmitted value. Hold final distinction 19.0–20.5; dim browser route by 21.0. | Server `store` E5; browser `arrive` D5; client `arrive` C5; two subdued client `ack` C5 cues for the distinction labels. No success chime. |
| 21–29 | At 21.0–21.7, code travels directly from client to authorization server. At 22.3, server's “Check exchange” row activates; at 23.2 it completes. At 24.0–24.7, a new filled “Access token” chip returns directly to client. | Code row clears after successful exchange; token occupies a distinct row. The authorization server issues the token; the client does not transform the code locally. Hold token receipt 25.0–27.0. At 27.0, API request row becomes ready; transition to API inspection 28.4–29.0. | Client `send` C6, server `arrive` E5, server `work` E4 then `ack` E5, client `store` C5 on receipt. API `ack` G5 marks its upcoming focus. |
| 29–38 | At 29.3, “Read incidents” request row joins the access-token chip; both move together to API at 30.0–30.7. Inside API, rows activate sequentially: “Token valid?” at 31.2, “For this API?” at 32.3, “Read allowed?” at 33.4. Checks finish individually, never all at arrival. At 35.4–36.1 the response returns to client. | Each API row begins pending and then gains a check. This illustrates separate validation and permission responsibilities, not a prescribed validation implementation. Only after the last check does the API produce incident data. Client's empty result fills with two abstract incident rows at 36.1. Hold through 38.0. | Client `send` C6; API `arrive` G5, three sparse `work`/`ack` G5 cues, API `send` G6 then client `deliver` C5. |
| 38–46 | Client changes the operation to “Write incident” at 38.2, keeping the same access-token chip. Send at 38.9–39.6. API validation rows pass at 40.1 and 40.6; “Write allowed?” resolves with × at 41.4. Denial returns at 42.1–42.8. | This illustrative grant permits reading, not writing. Client shows “Write denied”; previously fetched read data remains visible and unchanged. At 43.2 settle on compact “Read ✓ / Write ×” statuses owned by the API. Hold 43.2–45.4, then fade to black through 46.0. No reset, reprise or padded outro. | Client `send` C6; API `arrive` G5 and two quiet `ack` G5 cues; muted API `thump` G3 on denial; client `arrive` C5 on error receipt. Silence during final hold and fade. |

## Token and permission boundaries

“Tokens” describes the exchange generally; this trace visualizes only the access token needed for the next API request. A refresh token may be issued, but is optional and outside this lesson. Do not invent an ID token. Never imply that an authorization code is an API credential, user password or identity proof. The API request carries an access token; code never travels to the API. For this illustrative bearer usage, the token belongs in the HTTP Authorization header, not a URL or model prompt. The animation uses a symbolic attachment, with no literal header value to copy.

The final write denial is an illustrative scope/permission restriction, not a claim that every token is read-only. API checks include token validity, intended resource and permission for the requested operation; local policy and resource-specific authorization may still deny an otherwise valid token. Do not depict JWT decoding as universally sufficient or an obligatory API-to-authorization-server call. The API owns the decision even when its validation implementation uses other services.

Authentication ceremony, client authentication requirements, redirect binding, transport protection and other validation details are deliberately outside the visualization. The simplified label must survive every scene. The later PKCE lesson explains additional protection without retroactively treating this abstraction as a complete secure implementation.

## Sound design

Stable synthesised actor pitches: client C5 (523 Hz), browser D5 (587 Hz), authorization server E5 (659 Hz), API G5 (784 Hz). User approval alone gets a brief A5 (880 Hz) click. Sender ticks use the actor's upper octave at lower gain; receiver mallets use its base note with at most one soft 80 ms echo. `work` cues are single short pulses rather than continuous ticking. Pan to the current actor position with modest stereo spread; preserve intelligibility in mono. No music, narration, borrowed effects or physical foley. Denial uses a short low API note, not a crash or alarm: the service is enforcing policy, not failing. Target peaks below −1 dBFS and audition quiet sends and loud denial together. Repositioning and fades require no decorative whooshes.

## Source basis and editorial choices

Primary references consulted 2026-11-04:

- [RFC 6749 §§1.1–1.4, 4.1 and 7](https://www.rfc-editor.org/rfc/rfc6749.html): role separation, authorization-code routing through the user agent, direct exchange and protected-resource access. Code and access token have distinct purposes; refresh-token issuance is optional.
- [RFC 6750 §§2.1, 3.1 and 5](https://www.rfc-editor.org/rfc/rfc6750.html): bearer-token header usage, rejection for inadequate scope, and disclosure protection.
- [RFC 9700 §§2.1.1 and 2.3](https://www.rfc-editor.org/rfc/rfc9700.html): modern authorization-code protections and access-token privilege restriction. Omitting PKCE mechanics here is a teaching boundary, not security advice to omit PKCE.
- [RFC 8252 §4.1](https://www.rfc-editor.org/rfc/rfc8252): external-browser authorization for the native-host example.

Local inputs: lesson item 1, the oauth-pkce concept, editorial workflow, and architecture-flow-video style, engine API and review references. The incident scenario, panel positions, timings, pitches and denied-write contrast are editorial design decisions, not protocol requirements. No other plans or production records inform this proposal.

## Planned acceptance checks

These checks are for a future render; no rendering, listening or visual verification is claimed by this plan.

- Inspect encoded frames at every listed event boundary and the busiest moment, both full size and physically downscaled to 350×622. Read every essential label without zoom; reflow or remove text rather than reducing below 48 px source size. Confirm two-line labels and long code label fit their panels.
- Watch once muted: identify who grants, where browser redirection carries the code, who issues the access token, and which actor denies the write. Ask a beginner to trace those four facts; success requires all four and recognition that the code is not the access token.
- Scrub return/exchange boundaries: no direct server-to-client code shortcut, token appearing in browser, code reaching API, successful data preceding API checks or permission spreading across the whole scene.
- Verify holds teach a newly settled state; no unexplained inactivity longer than three seconds, competing packet motions or accidental carryover. If the flow reads sooner, shorten it rather than inserting padding to meet 46 seconds.
- Decode the entire future MP4; inspect duration, audio peaks and streaming metadata. Listen to every actor cue, including in mono; distinguish actual listening from waveform-only inspection. A finite cut need not match its opening frame.
- Keep factual verification separate from aesthetic scoring. This plan does not recommend a production winner or imply comparative review has happened.

# Lesson 02 — Create a verifier

## Teaching intent and boundary

One mechanism: prepare each authorization attempt independently, retain its private verifier, and derive the challenge that leaves first. The viewer should track two different kinds of state: a persistent transaction record and a derived outbound value. A later attempt repeats generation into a different record; it never renames or consumes the earlier record.

This is a finite approximately 43-second scene, not a required loop. No narration or explanatory paragraphs on screen. Small labels name software objects and operations; motion supplies the relationships. The plan concerns only this lesson. Do not introduce authorization codes, server-side binding, callback lookup, comparisons, tokens, rejection, or exchange animation. “Later exchange” is only a retention-purpose label.

Technical anchor: S256 computes `code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))`, with no padding. Generation must be cryptographically unpredictable for every attempt. The authorization request carries the challenge and S256 method; the verifier stays private with its transaction until the later exchange. Verified against [RFC 7636 §§4.1–4.3 and §3](https://www.rfc-editor.org/rfc/rfc7636), retrieved 2026-11-04. Local teaching inputs: item 2 of `video/oauth-pkce/sequence/lessons.json` and `content/concepts/oauth-pkce.json`. Visual decisions below are proposed teaching choices, not protocol requirements.

## Stage and readable vocabulary

Use a 1080 × 1920 canvas, 30 fps, near-black background, restrained outlines and generous space. Title is two lines, “Create a” / “verifier”, centered at (540, 275), 88 px. A small “02” is optional only if readable. Software panels replace device pictures, envelopes, locks, keys, vaults, dice, and other physical metaphors.

A persistent client boundary spans x=70–1010, y=450–1450. Its heading is “Client”. Inside it:

- Generation operation centered at (540, 600), size 820 × 140, label “Crypto random”. This is an explicit cryptographic source, not a username, timestamp, counter or typed password.
- Transaction view centered at (540, 865), size 820 × 300, heading “Private transactions”. Two stacked records have centers (540, 830) and (540, 950). Each fits “Attempt A” / “Verifier A” or “Attempt B” / “Verifier B” on separate aligned parts of the row. Initially only the empty A record is visible. Reveal B only when it begins.
- A working panel centered at (540, 1225), size 820 × 350, reserved for the transform and outgoing challenge. It presents one large operation at a time; a compact completed operation stack may remain while the next stage activates.

The destination is a simple external endpoint panel centered at (540, 1675), size 900 × 160, labeled on two lines “Authorization” / “server”. A short vertical route joins (540, 1400) to (540, 1595). It appears only when the outbound challenge is ready. This is a conceptual authorization route through the browser, not a claim about a direct back-channel HTTP call; browser choreography is outside this lesson.

Use 52–60 px body labels, at least 48 px for operation labels, giving approximately 16–19 px and 15.6 px respectively at an actual 350-pixel output width. Never shrink text to fit the full formula in a single line. Display the equivalent ordered operations `ASCII` → `SHA256` → `BASE64URL` as successive states, with “No padding” under the last operation. The exact nested formula above is implementation guidance for the scene author. All text, including subtitle and route labels, must pass the 350px check.

A is cyan and B is amber, but every object also carries its attempt letter. Verifier and challenge are named separately and use different outline treatments: verifier is a solid record cell; challenge is a double-outline value chip. These are abstract placeholders, not real strings, hashes, secrets, runnable examples, or shortened credentials. Do not animate random characters or display a password-style input. A tiny generation pulse communicates a fresh invocation, while the explicit source label communicates unpredictability. A/B are human tracking labels, never generator inputs.

## Beat sheet

| Time | What moves | State change and meaningful hold | Sound |
| --- | --- | --- | --- |
| 0–6 s | By 0.8 s the A record appears. At 1.4 s “Crypto random” activates once. A “Verifier A” placeholder resolves at its output and moves into A's empty cell over 0.8 s. | A changes from empty to populated at about 3.8 s. Its cell remains solid and visible. Hold to 6 s so generation and ownership register. | Client creation `ack` C5 at 0.8 s; generator `work` E5 at 1.4 s; transaction `store` C5 at 3.8 s. |
| 6–12 s | A short internal connector reveals the stored value's use by the transform panel. A separate input representation appears in that panel; the stored cell never leaves, fades or becomes the challenge. | At 7 s the record gains the short purpose label “Later exchange”. Working input shows “Verifier A”; the operation header becomes “S256”. Hold the simultaneous retained original and working input from 9.5–12 s. | Internal input `send` C6 followed by transform `arrive` E5. A soft `ack` C5 marks the retention-purpose label. |
| 12–22 s | The input progresses through three aligned operation states. `ASCII` activates at 12 s, `SHA256` at 14.5 s, and `BASE64URL` with “No padding” at 17 s. Each transition takes about 0.6 s and then settles. At 19.5 s the panel yields “Challenge A”. | The working value's role changes at each stage; the A record stays unchanged. Label SHA256 as “Hash” in a short secondary label, not encryption. No backward arrows or reconstruction. Hold the completed challenge from 20–22 s. | Transform `work` E5 at each active stage, with a slightly brighter `arrive` E5 when Challenge A appears. No looping tick or fake progress duration. |
| 22–29 s | The operation labels clear. Challenge A becomes the payload in a compact “Authorization request” panel with the short method chip “S256”. It moves down the outbound route over 1 s; the stored verifier does not move. | At 25.5 s the server's incoming request display contains “Challenge A” and “S256”. This represents only the PKCE portion of the request, not its complete parameter list. The A transaction remains readable with “Later exchange”. Hold the departure/retention contrast for 2 s, then quiet the route and received display without an acknowledgement or response. | Client `send` C6 at departure; server `arrive` G5 at receipt. No success chime, token cue or implied authorization decision. |
| 29–38 s | At 29 s a new “Attempt B” row appears below A. The same crypto source activates again at 30 s. A separately created “Verifier B” settles into B at 32 s. A remains unchanged. Briefly select A at 34.5 s, then B at 35.5 s, using a thin row highlight. | Two distinct transaction records are simultaneously populated. The repeated source invocation, separate target and stable A row establish freshness and separation. B also gains “Later exchange” as a shared column heading or short shared footer, avoiding duplicate text. Hold the two records from 36–38 s. Do not derive B by modifying A or teach an overwrite failure. | Generator `work` E5 and transaction `store` C5 repeat their established identities. Row selections use soft `ack` C5. B does not get a new actor pitch: it is still client storage. |
| 38–43 s | Working panel clears fully. The final composition places both private transaction rows above the already-received Challenge A, with the client boundary still separating them. A brief single highlight visits the stored rows, then the received challenge, in that order. | Retained values and sent value remain visibly different. No new instructions or summary paragraph. Hold 40–42.5 s; fade the entire composition over the final 0.5 s, or end on the held frame if the player handles finite endings better. | One quiet client `ack` C5 and one quiet server `ack` G5 accompany those highlights; then silence. No sound on the fade. |

The timing budget is a starting point. Trim dead time before increasing speed, and keep the transform stages readable. The only holds longer than two seconds are deliberate first-view comparisons; no title-only opening, empty countdown, idle spinner, end card padding or forced reset. If the scene reads cleanly in 38 seconds, end there.

## Motion and audio rules

Animate only one focal event at a time. The storage panel must remain at full text contrast during every derivation and send event; dim inactive borders, not essential text. Internal derivation connectors are short, solid and confined to the client. The outbound route is dotted and directional. A working copy means local use of the retained value, not a second durable secret store. Challenge A changes representation during derivation, while the original record keeps its identity.

Use the skill engine's `box`, `store`, `label`, `wire`, `packet`, `set`, `pulse` and `sfx` vocabulary where it fits. Large row cells or stacked operation labels may use scene-local drawing helpers; no shared engine changes are proposed. Schedule at speed 1, with explicit beat boundaries rather than slowing everything globally. Avoid checkmarks that could suggest security approval.

Pitch identities: client/transaction storage C5, internal generator and transform E5, authorization server G5. Sends are quiet C6; arrivals and storage writes are slightly stronger. All sources lie near center, so keep panning centered and never use stereo separation as the only meaning. Sounds mark events rather than spelling out a melody. Use short decays; no music bed, narration, alarm, crash or triumph cue. Each meaningful motion has a cue; intentional holds are quiet. The lesson must remain understandable muted.

## Review criteria for a future render

These are acceptance checks, not claims that a video has been produced or reviewed.

1. Inspect encoded frames near 3.8, 9.5, 13, 15.5, 18, 21, 25.5, 32, 36 and 41 seconds, plus every transition boundary. Resize to exactly 350 px wide and inspect without enlargement. Long labels must wrap cleanly within their assigned areas; reduce competing content rather than reduce font size.
2. Track Verifier A frame by frame through derivation and send: it remains in A's record. At no time is a verifier placeholder on the external route or in the initial request. The sender's payload contains the challenge and S256 method only as the displayed PKCE subset.
3. Confirm the transform order and unpadded base64url label. No encrypted-value appearance, reversible animation, password entry, human-chosen value, actual secret, global security badge or claim of universal protection.
4. Confirm B triggers an independent generation event and fills its own transaction record while A stays intact. Do not add callback IDs, code pairing, shared-variable errors, server binding or comparison mechanics to explain the contrast.
5. Perform a mute comprehension check: after one viewing, a beginner should point to what stays private, what leaves first, and which row owns the later attempt's verifier. Ask them to name the generator requirement from its short label. If ownership is unclear, improve the persistent row identity and path, not the amount of prose.
6. Listen to event timing and actor pitches; separately inspect audio peak levels and full-file decoding. Report listening only if actually performed. Keep peaks below -0.5 dB and sends audible. Confirm duration and streaming metadata after any eventual encode. No first/last-frame match is required for this finite ending.

Only this plan is the present deliverable. Rendering, scene code, media registration, comparative scoring and publication are outside this planning task.

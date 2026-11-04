# Lesson 04 — Prove the verifier matches

## Teaching contract

Plan a finite, approximately 43-second vertical animation. One mechanism: the token endpoint derives a challenge from the submitted verifier and compares it with the challenge associated with the submitted code. Begin after the callback, with code A and the original verifier A already in the client. Do not replay authorization, verifier generation, or concurrent-login storage bugs.

The visible distinction is between a completed PKCE comparison and an eligible token response. The former changes exactly one validation status. Other OAuth validation remains pending until separately completed. A deliberately different verifier produces a different computed challenge, rejection, and no token. No user portraits, identity badges, access-granted labels, resource actions, keys, locks, doors, or other physical metaphors.

Use abstract chips only: `code A`, `verifier A`, `challenge A`, and, in the alternative case, `verifier B` and `challenge B`. These are illustrative aliases, never literal credential strings, hash examples, or logging output. A compact opening label `Illustrative values` establishes that convention.

## Stage and visual grammar

1080×1920, 30 fps, near-black background, high-contrast white labels, amber active operations, green checks, red failure. Retain literal A/B letters and =/≠ symbols so color never carries the distinction alone. Use a software request inspector and validation rows, without decorative hardware. Only two actors: Client and Authorization server. S256 and comparison are operations inside the server, not independent services.

Keep the title at (540,270), on two lines if necessary. Client is a 900×240 panel centered at (540,540). Server boundary spans x=70–1010, y=760–1750. Place `Token endpoint` at (540,820). Request travel runs from (540,660) to (540,880). A request row at y=930 retains code A while the verifier copy moves to S256 at (540,1060). A saved association row at y=1190 reads `code A → challenge A`; it is already present, not written by the incoming request. A small `S256` label beside this row identifies the previously bound method.

At y=1330 and 1430, place full-width `Computed` and `Saved` rows, with their challenge chips horizontally aligned. Equality appears between them at x=850, clear of text. Validation status occupies y=1550; the dependent token state occupies y=1670. Reveal these rows only when relevant. Draw short local connectors from S256 to Computed and from the saved association to Saved; endpoints (540,1100)→(540,1290) and (180,1230)→(180,1390), with the latter routed along x=115 to avoid the computed row. A return response uses the server's right margin x=970 to reach the client, never crossing comparison labels.

Use essential text at 52–60 source pixels: approximately 17–19 pixels at an actual 350-pixel presentation width. Title 76 pixels. Maintain 48-pixel side margins and at least 24 pixels between label bounds and moving elements. Do not shrink to the skill's generic 24-pixel source minimum. Long labels such as `Authorization server` can occupy two lines. Display only one expanded operation at a time; collapse comparison details before expanding other validation.

## Beat sheet

| Time | What moves | State change and reading hold | Sound |
|---|---|---|---|
| 0–6 s | At 0.5 s, client chips highlight together. At 2 s, a single request containing stacked code A and verifier A travels to the token endpoint in 0.7 s. | The request row fills. Code A selects the existing saved association; that row highlights while verifier A remains distinct. Hold the selected association from 4–6 s. | Client `send` C6, server `arrive` E5; server `ack` E5 when the association is selected. |
| 6–13 s | Verifier A copies into the server's S256 operation. A compact operation stack reveals `SHA-256` then `base64url`, one active row at a time. Its output travels to Computed. | Input becomes computed challenge A; the saved row is untouched. Reveal `no padding` briefly with base64url. Land the result by 11 s and hold until 13 s. | Server `work` E4 on each actual transformation, then `arrive` E5 on output placement. No continuous fake CPU ticks. |
| 13–19 s | The saved challenge copies into Saved. A thin scan underline crosses the two challenge A chips, then an equals sign appears. | Only `PKCE ✓` becomes green. `Other OAuth checks …` stays neutral and `Token —` stays empty. Hold this visibly incomplete outcome for 2 s. | Server `ack` E5 at equality; restrained single note, not a final success flourish. |
| 19–27 s | Comparison rows compact into a PKCE status row. An `Other OAuth checks` panel expands into `Code valid`, `Client binding`, and `Redirect match`, completing sequentially. | This example assumes all applicable checks pass. Only after their completion does `Token issued` appear and an abstract token response return to Client. Hold receipt for 1.5 s. Timing depicts explanatory dependency, not mandated server execution order or measured latency. | Server `work` E4 per status change, `chime` E5 only at issuance, then client `deliver` C5. |
| 27–34 s | A short `Alternative case` transition clears all response and validation state. Restore the pre-exchange illustration; replace verifier A with verifier B while preserving code A and its challenge A association. Send the new illustrated request and run the same S256 sequence. | Computed now holds challenge B. Saved still holds challenge A. The reset must read as a separate hypothetical case, never a retry of a redeemed code. Settle the two values by 32 s and hold until 34 s. | Client `send` C6, server `arrive` E5, then the same server `work` E4 cues and output note as before. |
| 34–43 s | The comparison scan stops on differing A/B suffixes. Show ≠ and a red × attached only to the PKCE status. An `invalid_grant` response returns to Client. | Other validation is inactive; no token is created or sent. Replace the empty token status with `No token`. Hold the complete failure state about 2 s, then fade to a finite ending by 43 s. Do not add a lengthy closing card or automatically repair the verifier. | Server `thump` E3 for rejection; client low `arrive` C4 for the error. Fade silently; no crash or recovery sound. |

## Sound and implementation detail

Client owns the C pitch family and authorization server the E family, including all its internal operations. Pan by actor position only; both actors are centered, so distinct pitch and event timbre must work in mono. Sends quieter than arrivals, rejection clearly audible without an alarm or music. No sound for decorative transitions. Keep peaks below -0.5 dBFS and listen to the actual encoded audio during a later implementation pass.

Use timed `s.set`, `s.packet`, `s.pulse`, `s.ripple`, and `s.sfx`; simple boxes, labels and status rows are sufficient. Request fields must travel together, not appear as two independent HTTP requests. Do not animate a verifier transforming into the stored challenge or show the server keeping the original verifier. The association panel is a logical representation, not a claim that every server uses a database table. No browser, resource server or model actor is needed.

## Technical grounding and limits

References checked 2026-11-04:

- [RFC 7636 §§4.2, 4.4–4.6](https://www.rfc-editor.org/rfc/rfc7636): S256 is base64url(SHA256(ASCII(verifier))) without padding; code-associated method and challenge guide verification. A mismatch returns invalid_grant; equality permits normal OAuth processing. The diagram abbreviates ASCII conversion rather than adding another screen label.
- [RFC 6749 §§4.1.3–4.1.4](https://www.rfc-editor.org/rfc/rfc6749): token processing includes code validity, client binding, redirect matching when applicable, and client authentication where required. The three visible rows are representative, not exhaustive; applicable authentication is included in the grouped other checks. Valid, authorized requests can receive tokens.

These rules govern the illustration. PKCE is not identity authentication, and token possession is not permission for every operation. No protected-resource access is depicted. Do not imply PKCE chooses the token's scope. Challenge B differs in this illustrative mismatch; the mechanism compares the computed values, not the placeholder letters themselves.

Planning inputs: repository AGENTS.md and editorial workflow; sequence lessons.json item 4; oauth-pkce concept; architecture-flow-video skill and its style, engine API, and review references. The sequence's earlier 28-second duration is context, not a constraint on this plan. The proposed timing is editorial judgement, adjustable after checking causal clarity.

## Acceptance checks for later production

- At actual 350-pixel width, inspect request arrival, transform output, equality with token still absent, token issuance, alternative reset, and rejection. Verify every essential label without zoom, including invalid_grant and the A/B suffixes.
- Inspect beat boundaries for stale success ticks or tokens leaking into the alternative. The saved challenge A must remain fixed throughout each case.
- Ask a muted viewer to point out what the client submits, what the server computes, which two values are compared, and why the first green check does not yet produce a token.
- Ask whether the mismatch yields any token, and whether the second case looks like code reuse. Revise motion or reset framing if either answer is wrong.
- Check full playback for useful 1.5–2.5-second holds and no unexplained idle stretches. Shorten a beat if it adds no new information; do not stretch to meet a runtime target.
- Later rendering requires encoded-frame inspection, full decode, audio listening and peak checks, and streaming metadata verification. This document is planning only; no render, listening, score, or comparative recommendation is claimed.

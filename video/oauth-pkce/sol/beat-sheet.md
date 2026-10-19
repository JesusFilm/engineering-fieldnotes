# One attempt, one verifier

Independent cut by **gpt-6.1-sol**, high reasoning. Lesson: when an agent tool runs concurrent OAuth sign-ins, retain the verifier for each authorization attempt; the token endpoint rejects a code paired with another attempt's verifier.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–5.3 s | A's S256 challenge travels down; code A returns | Client keeps verifier A private; server binds code A to S256(A) | C5 store, send, arrive |
| 5.3–10 s | Code A and verifier A travel to token endpoint; token A returns | Server compares transformed verifier, matches, consumes code | C5 work, hit, chime |
| 10–16 s | Independent B and C challenges go down; codes return | Two sign-ins coexist with different verifier/challenge bindings | B at C5; C at E5; store/send/arrive |
| 16–22 s | Wrong verifier C crosses into B, then code B + verifier C goes down; error returns | S256(C) differs from B's stored S256(B); no token | E5 send; C5 miss, work, louder thump, miss |
| 22–32 s | Failed flow clears; fresh D binds, exchanges, receives token | New transaction owns verifier D; match succeeds; stage fades | poof, C5 store/arrive/hit/chime, quiet poof |

## Stage and representation

1080×1920 at 30 fps, 32 s. Client cards at (290,735) and (790,735); authorization-server binding cards at (290,1345) and (790,1345). Dotted lanes join (x,860) to (x,1220); moving chips stop at y=1120 to clear the server label at y=1190. Token endpoint comparison sits at y=1500, outcome at y=1590. The horizontal wrong-verifier transfer is at y=885. All protocol field text is 36–48 px; moving chips are 38 px. Attempt colors and literal letters provide redundant identity cues. Five short phase labels contain no explanatory prose.

This concurrency example was authored from the original concept JSON and RFCs. No baseline or alternative scene source or encoded video was consulted. It complements the original mobile/code-interception example by making a client transaction-storage error observable.

## Primary evidence (retrieved 19 October 2026)

- [RFC 7636 §4.1–4.2](https://www.rfc-editor.org/rfc/rfc7636#section-4.1): each request uses a fresh cryptographically random verifier. S256 means base64url without padding of SHA-256 of the verifier's ASCII bytes. Letters A–D stand for full compliant values, not literal one-character verifiers.
- [RFC 7636 §4.4–4.6](https://www.rfc-editor.org/rfc/rfc7636#section-4.4): bind the challenge and method to the issued code, then compare the transformed supplied verifier at token exchange. A mismatch produces invalid_grant. A matching verifier permits normal token-request processing; other checks can still reject it.
- [RFC 9700 §2.1.1](https://www.rfc-editor.org/rfc/rfc9700.html#section-2.1.1): PKCE values must be specific to the transaction and securely bound to its client/user agent. Public clients must use PKCE; S256 keeps the verifier out of the authorization request. The authorization server must enforce the verifier check when a challenge was supplied.
- [RFC 9700 §4.2.4](https://www.rfc-editor.org/rfc/rfc9700.html#section-4.2.4): authorization codes must be invalidated after first use. The recovery therefore starts D rather than promising a failed B code remains usable.

## Team exercise and limits

Start two test sign-ins through your maintained OAuth client library. Deliberately submit B's code with C's verifier in a controlled test. Observe rejection and no token. Start a fresh sign-in with the correctly associated verifier and observe successful issuance with valid remaining request fields. Inspect transaction storage and redirect binding rather than putting credentials in agent prompts or logs.

The agent-tool scenario is an illustration, not a claim about a particular product. Browser redirects, user consent, TLS, client authentication where needed, redirect URI, state/issuer checks, expiry and resource scopes remain required but are omitted from the drawing. A token is issued only assuming those other checks pass. PKCE does not determine what an agent may do with the token, protect a stolen verifier/token, or turn persistent prompts into permission enforcement. Scope and resource authorization need separate controls. The two server cards are conceptual records in one server, not separate servers or endpoints.

## Comparative revision

Edited by gpt-6-astra comparative review on 2026-10-19. The client label and transcript now say agent host, the OAuth client in this chapter’s scenario. Original GPT-6.1 Sol authorship is retained. Timing and sound events are unchanged. See ../../../reviews/comparisons/oauth-pkce/after.md for final encoded verification.

# Lesson 05 — Recheck changed actions: beat sheet

Mechanism: the approvals ledger holds one approval, r42 with artifact digest `a91f 7c2e 04b8`. The current request is `deploy r43 → prod`. At execution time the executor confirms action and target are unchanged. It then compares the full approved digest with the current digest `b84a 9d10 3f6c` character by character, finds they differ, and blocks. Production stays r41 with 0 calls. The actual r43 artifact becomes a new ledger row, `pending review`. The r42 approval stays exactly as it was and is not reused.

## Neutral choices from plans A and B

- From A: the video ends with r43 pending review. There is no new approval or deployment, because the lesson's last beat asks only for review and lesson 04 already showed a matched execution. Action and target are confirmed `same` before the artifact check, so one changed field is enough to block. BLOCKED appears before any protected side effect. Production is invariant (`r41`, `calls 0 · not invoked`), and its route gets a grey ×. The referral names the exact new artifact. Finite fade.
- From B: an approvals ledger that gains a separate row for the new artifact while the r42 row stays untouched. The two digests are stacked in the executor so they are seen together.
- This cut's geometry: a character-level string comparison. A cursor sweeps both 12-character digests together, and each compared character turns red (different) or green (equal). Then a ≠ mark and `BLOCKED · artifact changed` appear. The sweep shows the whole identifier being compared, not a prefix. It differs from lesson 04's two-column diff and the grid and panel layouts of lessons 01–03.
- Illustrative values: the digests are 12 hex characters in groups of four, standing in for full immutable identifiers. Release names and target are illustrative.
- Excluded: approving r43, deployment, expiry or replay, rollback, credential changes, and changed targets.

## Timing (speed 1, 35.6 s) and sound

| t (s) | What moves / state change | Sound (actor) |
|---|---|---|
| 0.3–1.0 | Executor panel (`checking`) and production (`r41 · calls 0 · not invoked`) fade in | ack C4 quiet (executor) |
| 1.1–3.0 | Approvals ledger pops: `r42 a91f 7c2e 04b8 · approved`, outlined green | store G5 (ledger/reviewer) |
| 2.8–4.2 | Current request pops: `deploy r43 → prod · awaiting check` | store E5 (requester) |
| 4.2–7.0 | Hold: the saved approval names r42; the request is r43 | — |
| 7.0–7.6 | Chip `r43` into the executor; `deploy → prod` types in | send E6, arrive C5 |
| 8.6 | `current r43  b84a 9d10 3f6c` row appears (blue) | store C5 |
| 9.9–11.1 | Ledger r42 row outlined; lookup dot runs the right margin to the executor | send G6 |
| 11.1 | `approved r42  a91f 7c2e 04b8` row appears | arrive C4 |
| 12.3 | `action · target` outlined, tagged `same` | ack C5 |
| 12.3–15.0 | Hold: same action and target, two digests stacked | — |
| 15.0–17.6 | Cursor sweeps both digests; each compared character turns red | work C4 ×9, panned with the cursor |
| 17.9 | ≠ mark; `result BLOCKED · artifact changed`; panel flashes red and jolts | thump C3, loudest |
| 19.0 | Request tag `blocked`; request text dims | ack E4 quiet |
| 20.3 | Grey × on the route to production | custom `closed` low click |
| 21.4 | Production row outlined (still r41, 0 calls) | ack C4 quiet |
| 22.5–25.0 | Hold | — |
| 25.0–26.4 | Referral dot runs the left margin from the executor to the ledger | send C6 |
| 26.4 | New ledger row `r43 b84a 9d10 3f6c · pending review` (amber outline) | arrive G5 |
| 27.8 | r42 row outlined green beside it: a separate, unchanged record | ack G4 |
| 28.3–34.0 | Final hold | silence |
| 34.0–35.2 | Stage fades; title remains | — |

Actor pitches: requester E (E4–E6), executor C (C3–C6), ledger/reviewer G (G4–G6). Production never sounds because it is never invoked.

# Lesson 03 — Check the revision you need (motion-v2 cut)

Duration 35.5 s at speed 1, 30 fps, 1080 × 1920. Finite ending; no loop or fade.

## Mechanism

The check already needs revision 8 for record R42 (from the committed save). A replica query succeeds and returns revision 7, which leaves the check unverified. A fresh query started on the primary after the save committed returns revision 8; the check compares 8 with its unchanged need and only then reads `match`. This is an illustrative one-record, one-writer example. It shows no write, replication traffic, catch-up, received-versus-applied stage or failover, and it does not claim that every primary read is current.

## Plan choices (A/B, neutral)

| Choice | Taken from | Reason |
|---|---|---|
| Assertion with `need` / `seen` operand wells, ≠ then =, status word `unverified` → `match` | Plan A | One large comparison locus that reads at 350 px; the decision follows the comparison. |
| Endpoint tabs with selection underline, query text under the selected tab, one query sweep | Plan A | Software-native source selection; varies from lesson 01 record cards and lesson 02 sequence trace. |
| `fresh read R42` names the primary query | Both | Marks a new post-commit query; the replica query reads `read R42`. |
| Two source columns; each reply rises as a chip and stays; replica evidence dims instead of being erased | Plan B | Final frame shows two successful replies side by side, only one matching the need. |
| Seen operand is cleared before the new query; 7 never morphs into 8 | Plan A | The old observation is never relabelled as the primary result. |
| `ok` shown in white; teal kept for the comparison result | Plan A | A successful query must not look like verification. |
| Identical `deliver` cue for both replies; expected-value note A5 introduced at the need and resolved by the only chime | Plan B | Success sounds alike; only the comparison resolves. |
| Semitone rub (E5 + F5) on ≠, no error buzz | Plan B (Plan A used C5 + D♭5) | Unresolved without implying failure. |
| Revision rail with ring target and `next:` decision line | Plan B, not used | Would duplicate the operand comparison and add a second label to read. |
| Recap pulses (both `ok`, then the matching 8s) then a short hold | Plan B, shortened | Keeps the ending active; avoids a long silent freeze. |

## Beat sheet

| Time (s) | What moves | State | Sound (preset, note, pan) |
|---|---|---|---|
| **1 · The check needs 8 (0–5.4)** | | | |
| 0.2–1.0 | heading `verify R42`, `need`/`seen` captions, empty seen well, `unverified`, divider, tabs fade in | seen empty, status neutral | — |
| 1.0–1.4 | need-well corners draw in around `8` | requirement fixed | ack A5, left |
| 1.4–3.2 | hold | | — |
| 3.2–3.55 | underline grows under `replica`; `read R42` appears (3.3) | source chosen | ack E5, left |
| 3.6–5.4 | hold on the chosen source and empty result | | — |
| **2 · Successful reply, older revision (5.4–14.8)** | | | |
| 5.4–6.1 | query sweep under `read R42` | query runs | send C6, left |
| 6.3 | underline glows | replica answers | work E4, left |
| 6.6–7.4 | chip `ok · rev 7` rises and rests | reply succeeded | deliver C5, centre |
| 7.4–9.0 | hold on the successful reply | | — |
| 9.0 | chip glows | revision read | ack E5, left |
| 9.3–10.5 | copy of `7` follows a dotted guide up, across and into the seen well, growing to operand size | seen = 7 | arrive C5, right (10.5) |
| 10.5–12.0 | hold: need 8, seen 7, not yet compared | | — |
| 12.0–12.4 | amber ≠ pops in; seen corners, seen 7, chip `rev 7` and status turn amber | unverified, not failed | ack E5 + F5, centre |
| 12.4–14.8 | hold on insufficiency | | — |
| **3 · A new query on the primary (14.8–22.6)** | | | |
| 14.8–15.3 | seen 7 and ≠ fade; seen well back to dim; replica chip and query dim to half | requirement kept; evidence kept, quieter | ack C5, centre |
| 15.3–16.6 | hold | | — |
| 16.6–17.1 | underline slides to `primary`; `fresh read R42` appears (16.8) | new source, new query | ack G5, right |
| 17.1–18.8 | hold before execution | | — |
| 18.8–19.5 | query sweep under `fresh read R42` | query runs | send C6, right |
| 19.7 | underline glows | primary answers | work G4, right |
| 20.0–20.8 | chip `ok · rev 8` rises and rests | reply succeeded | deliver C5, centre (identical to 7.4) |
| 20.8–22.6 | hold: two `ok` chips, nothing decided | | — |
| **4 · Revision 8 is compared (22.6–30.0)** | | | |
| 22.6 | chip glows | revision read | ack G5, right |
| 22.9–23.85 | copy of `8` follows its guide into the seen well | seen = 8 | arrive C5, right (23.85) |
| 23.85–25.4 | hold: two equal operands, status still `unverified` | | — |
| 25.4–25.8 | teal = pops in; both wells turn teal | comparison holds | chime A5, centre |
| 26.8 | status becomes `match` (teal, small pop) | decision follows comparison | ack C5, centre |
| 26.8–30.0 | hold | | — |
| **5 · Revision decides (30.0–35.5)** | | | |
| 30.0–31.6 | both chips glow; replica chip briefly returns to full brightness | both queries succeeded | ack C6 left + right |
| 31.6–32.2 | matching chip, both wells and both 8s glow | only the needed revision decided | ack A5, centre |
| 32.2–35.5 | hold on the resolved frame; end | finite ending | — |

Cue dry run: 21 cues; `deliver` exactly twice (7.4, 20.8) with identical parameters; one `chime` (25.4); no crash, thump, miss, music or narration. These are scheduled cues and analysed audio, not a listening report.

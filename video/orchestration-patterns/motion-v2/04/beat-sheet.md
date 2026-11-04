# Join before deciding — beat sheet (motion-v2/04)

Mechanism: the release assessment needs both required reports. One early report cannot stand for the other. Receiving both (`Reports 2 / 2 complete`) is a different question from whether the release may proceed: the migration risk blocks it.

Layout: two worker status panels (API review in blue, Migration in amber) above the coordinator's matrix (`Review | Receipt | Finding` rows for API and Migration, plus a `Reports n / 2` receipt count with `incomplete` / `complete`), and a `Release assessment` panel below. Reports travel from each worker down its own side gutter into its named row.

Duration 37.0 s at 30 fps, speed 1. Finite ending: the stage fades below the title from 34.4 s.

## Neutral A/B decisions

| Adopted | From | Reason |
|---|---|---|
| Coordinator matrix with separate Receipt and Finding columns, receipt count and release panel | A | Separates "evidence complete" from "evidence acceptable" in fixed places |
| Migration activity as an indeterminate sweep | A | Running without a fake percentage or ETA |
| Missing receipt cell outlined, `incomplete`, `Needs migration report` while waiting | A | Shows what is missing and why one report is insufficient |
| Risk surfaces as `BLOCKED` immediately on receipt, before the count settles | A | A coordinator must not delay a known blocking finding |
| Closing comparison: `Reports 2 / 2 complete`, then the red finding, then `BLOCKED` | B (count vs decision) | Completeness and success read as different things |
| Neutral `received`, white `complete`; red only for the risk | A | No success colour for receipt |
| Rejected: B's `approve?` badge and refusal | — | Needs an unexplained actor proposing early approval |
| Rejected: B's percentage progress bars and green `2 of 2` | — | Imply progress figures and success |
| Rejected: B's release gate wire and chip | — | The release panel carries the state directly |

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0–1.5 | both worker sweeps move | both `running` | work E4 (API) / G4 (Migration) |
| 1.5 | API panel pulses, check pops | `finished` (execution completion only) | ack E5 |
| 2.4–4.0 | blue route appears; API chip travels the left gutter into the API row | — | send E6 |
| 4.0 | API row outlined | `received` · `No blocker` | arrive C5 (coordinator) |
| 4.6 | count | `Reports 1 / 2` · `incomplete` | — |
| 4.6–8.5 | hold; Migration sweep keeps moving | Migration row still `waiting`, release `WAITING` | work G4 at 6.2 |
| 8.5 | Migration receipt cell outlined amber | the missing report | ack C5 |
| 10.0 | count row outlined amber | `incomplete` | ack C5 |
| 11.5 | release reason types in | `Needs migration report` | store C5 |
| 11.5–17.0 | hold; sweep continues | one report cannot fill the other row | work G4 at 14.0 |
| 17.0 | Migration panel jolts; sweep stops; ✗ pops | `risk found` | thump G3 |
| 18.6–20.3 | red route; MIG chip travels the right gutter into the Migration row | — | send G6 |
| 20.3 | Migration row outlined red | `received` · `Row loss risk` | arrive C5 |
| 20.7 | release panel turns red and jolts | `BLOCKED` · `Migration: row loss risk` | thump C3 |
| 22.0 | count | `Reports 2 / 2` · `complete` (white) | ack C5 |
| 24.0 | count row outlined white | complete | ack C6 |
| 25.6 | Migration finding cell outlined red | the risk is still there | ack G4 |
| 27.2 | `BLOCKED` outlined red | the decision | thump C3 (quieter) |
| 29.0 | outlines fade | settled: 2 / 2 complete beside BLOCKED | — |
| 29–34.4 | reading hold | both reports and the risk retained | silence |
| 34.4–35.8 | stage fades below the title | finite ending | — |

18 sound cues. API E, Migration G, coordinator C. The risk thumps are the loudest events.

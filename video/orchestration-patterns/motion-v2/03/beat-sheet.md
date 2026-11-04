# Independent parallel work — beat sheet (motion-v2/03)

Mechanism: two read-only reviews of different concerns consume the same frozen snapshot and need nothing from each other, so they overlap in time. Each report keeps the snapshot id, and both become available to the coordinator.

Layout: a read-only review console with snapshot S7 (two files, `READ ONLY` tag) above two wide review lanes (Compatibility in blue, Migration in amber). Each lane has a check, a status/report row and an activity trace. A single white cursor marks the same instant on both traces. Inputs arrive and reports leave through the side gutters; below sits a `For coordinator` receipt panel. No arrow connects the two reviewers.

Duration 43.0 s at 30 fps, speed 1. Finite ending: the stage fades below the title from 40.6 s.

## Neutral A/B decisions

| Adopted | From | Reason |
|---|---|---|
| Review console: frozen snapshot header, two wide lanes, receipt area for the coordinator | A | Software-native; avoids the coordinator/boxes/bars stack |
| Activity traces on one shared time axis with unequal finish times (22 s vs 26 s) | A | Overlap and independence both visible; no speed claim |
| S7 on both lane tags and both reports; `READ ONLY` stays fixed | A + B | Results tied to the snapshot |
| Both assignments and both S7 deliveries at the same instant, as paired sounds 60 ms apart | B | Simultaneity heard as a pair |
| Closing pulse of every S7 location together | B (snapshot-id match), reshaped as a pulse | "Tied to the snapshot" without a success chime |
| Snapshot shown as two files, each highlighted in its reviewer's colour while read | Neither plan (new) | Makes "different concerns of the same input" concrete |
| One shared cursor tick on both traces | Neither plan (new) | Reads both timelines against the same instant without crossing lane text |
| Rejected: B's refused write attempt | — | Could suggest a reviewer misbehaved; read-only stays a fixed property |
| Rejected: B's `waits for both` coordinator state and A's arrival as a join | — | The join is the next lesson |
| Rejected: B's equal bars finishing together | — | Unequal finish times make independence tangible |

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.6 | file names fade in | `Snapshot S7`: `api/clients.ts`, `migrations/014.sql` | store C4 (snapshot) |
| 2.0 | snapshot outline lights; tag pops | `READ ONLY`, frozen | ack C5 |
| 2.0–7.0 | hold | one input, lanes empty | — |
| 7.0 | both lanes light in their colours; checks type in together | `Check: existing clients` / `Check: existing rows` | arrive E5 + G5 (60 ms apart) |
| 8.4–9.8 | gutter connectors appear; one S7 chip travels to each lane at the same time | — | send C6 ×2 (panned L/R) |
| 9.8 | both lane tags pop | `S7` on both | arrive E5 + G5 |
| 10.6 | each lane's file lights in its colour | both `reading` | — |
| 11.0 | both traces start at the same x; the shared cursor appears | concurrent work | work E4 + G4 |
| 13.5 | compatibility lane and its file flash; the migration trace keeps growing | — | work E4 |
| 15.5 | migration lane and its file flash; the compatibility trace keeps growing | — | work G4 |
| 17.5 | label | `overlapping work` | ack E5 + G5 |
| 19.5 | snapshot pulses; files unchanged | read-only | ack C5 |
| 22.0 | compatibility trace stops, end dot; its file highlight clears | `Report C · S7` (blue) | deliver E5 |
| 22–26 | the cursor and migration trace continue alone | migration still `reading` | — |
| 26.0 | migration trace stops, end dot | `Report M · S7` (amber) | deliver G5 |
| 26.3 / 27.5 | cursor, then label, fade | — | — |
| 29.5–31.0 | blue gutter connector; C chip travels to the receipt | `Report C · S7` in `For coordinator` | send E6 / arrive A5 (coordinator) |
| 31.5–33.0 | amber connector; M chip travels | `Report M · S7` | send G6 / arrive A5 |
| 35.0 | snapshot, both lanes and the receipt pulse together | the same S7 everywhere | ack C5 |
| 35–40.6 | reading hold | both reports available; no join, no verdict | silence |
| 40.6–42.0 | stage fades below the title | finite ending | — |

22 sound cues. Snapshot C, compatibility E, migration G, coordinator A. The paired events are 60 ms apart and panned left/right.

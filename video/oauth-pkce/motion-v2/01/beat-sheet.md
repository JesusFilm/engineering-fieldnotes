# OAuth PKCE 01 — Delegate access: beat sheet (motion-v2/01)

Mechanism: a client gets limited, delegated access to a resource API. The user authorizes in the browser with the authorization server. An authorization code returns through a browser redirect. The client exchanges the code directly for an access token. The API validates the token and authorizes each request itself.

Stage (1080×1920, fixed): Client app panel (255, 820) and Resource API panel (255, 1440) on the left. Browser window (825, 820) and Authorization server panel (825, 1440) on the right. Wires run client–API (vertical), client–browser (horizontal), browser–server (vertical) and a client–server diagonal (back channel). The code takes the browser path; the token takes the diagonal. Subtitle `SIMPLIFIED OAUTH FLOW` stays visible throughout, including during the fade.

Encoding: code is an amber, dashed, hollow tag (`code`); the access token is a solid teal tag (`access token`). A request carrying the token shows a solid teal tab on its chip. Dimmed actors (32% alpha) are not involved in the current step.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.3–0.9 | Client, then API, scale in | actors appear | client C5 mallet; API C4 woody tick |
| 1.8–2.4 | `GET /incidents` chip client → API | API pulses | send C6; API C4 |
| 2.5–2.85 | — | API row `no token` gets ×, API jolts red | light thump E4 |
| 3.3–3.85 | `401` chip API → client | client row `401 · no access` (red) | send C5; low deliver C4 |
| 3.85–5.4 | hold | need established | — |
| 5.6–6.1 | browser, server appear; API dims | new actors | browser E5 soft sine; server G5 bell |
| 6.8–7.35 | envelope client → browser | address bar `auth.example` | send C6; browser E5 |
| 7.85–8.4 | envelope browser → server | server status `authorize` | send E6; server G5 |
| 8.9–9.45 | envelope server → browser; client dims | browser shows `Sign in` + empty field | send G6; browser E5 |
| 9.95–10.45 | masked dots type in | field fills `••••••` | three quiet ticks E6 |
| 10.9–11.85 | masked tag browser → server only | status `verify user`, check mark | send E6; server G5; ack G6 |
| 12.3–12.85 | envelope server → browser | consent `read incidents?` + `Allow` | send G6; browser E5 |
| 13.3–14.25 | pointer moves, clicks | `Allow` turns teal | click A5 |
| 14.6–15.2 | teal dot browser → server | status `record grant`, row `grant: read` | send E6; server G5; store |
| 15.2–16.6 | hold | grant recorded, client still dimmed | — |
| 16.6 | client undims | server status `issue code`, row `code` (amber dashed) | store G6 |
| 17.1–17.7 | `code` server → browser (amber wire) | address `app.example/cb`, `redirect` | send G6; browser E5 |
| 18.2–18.8 | `code` browser → client | client row `code · use once` | send E6; client C5 |
| 18.8–20.6 | hold; browser dims at 20.0 | code held by client | — |
| 20.8–21.5 | `code` along diagonal client → server (marching amber) | status `check code` | send C6; server G5 |
| 21.85–22.65 | — | three work ticks, check mark on server's code row | work G4 ×3; ack G6 |
| 23.1 | — | code row disappears at server and client | poof |
| 23.7–24.4 | `access token` (solid teal) server → client on diagonal | client row `access token` filled teal | chime G5; client C5; store |
| 24.4–26.0 | hold; then browser and server dim, API undims | token held | — |
| 26.4–27.05 | `GET /incidents` + teal tab client → API | API pulses | send C6; API C4 |
| 27.3–28.85 | — | rows `token valid` ✓, `for this API` ✓, `read allowed` ✓ in sequence | ack C6, E6, G6 |
| 29.4–29.95 | `200` API → client | client row `200 · incidents` | send C5; high deliver C6 |
| 29.95–31.7 | hold | read succeeded | — |
| 31.7 | — | API rows and result clear; token stays | — |
| 32.1–32.75 | `DELETE /incidents/7` + same teal tab → API | API pulses | send C6; API C4 |
| 33.2–33.85 | — | `token valid` ✓, `for this API` ✓ (same as before) | ack C6, E6 |
| 34.55 | — | `delete allowed` ×, row red, API jolts | heavy thump E3 (loudest) |
| 35.15–35.7 | `403` API → client | client row `403 · denied`; token row stays teal | send C5; low deliver C4 |
| 35.7–37.6 | hold | denial with a still-valid token | — |
| 37.6 | browser + server undim; browser wires march amber | code route recap | browser E5 |
| 38.3 | diagonal marches teal | token route recap | server G5 |
| 39.0 | API wire marches teal, API pulses | token use recap | API C4 |
| 39.0–40.6 | hold | full map | — |
| 40.6–41.4 | stage fades to black under title | finite ending; final frame matches the opening empty stage | — |

Actor pitches: client C5 mallet with echo, browser E5 soft sine, authorization server G5 bell, API C4 woody triangle. Sends are quiet ticks an octave above the sender (API sends at C5).


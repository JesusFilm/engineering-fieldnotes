# Separate authority

Author: gpt-6-astra; reasoning: high; 2026-10-19. Duration: 28 seconds.

Learning objective: Given an incident agent and a deployment tool, distinguish the agent's read authority from a separately authorized release path, and predict that approving one release does not grant the agent general deployment permission.

Independent sequence: successful investigation → denied direct deployment → specific human-reviewed proposal → separate authorized execution → repeated agent denial alongside a working read. The repeated denial is the counterexample to “approval upgrades the agent.” No other variant scenes or media were consulted. This is an illustrative architecture, not a promise about any framework. The guide explains deterministic enforcement; the video deliberately does not depict a safety classifier.

| Time | What moves | State change | Sound |
| --- | --- | --- | --- |
| 0–5.7 | Stage opens; READ descends to Logs; logs return | Logs turn green; Agent receives evidence | Recover at 0.4; C5 send at 1.3, hit at 2.1, send at 2.9, deliver at 3.7 |
| 5.7–9.5 | DEPLOY turns toward the tool; stops there | Tool turns red/denied; Production stays r41 | C5 send at 5.7; low 150 Hz thump at 6.5 with jolt and × |
| 9.5–14.8 | r42 proposal travels above Agent to Reviewer | Reviewer turns amber, then approves r42 in green | E5 send at 9.5, arrival at 10.3, chime at 12.6 |
| 14.8–21 | r42 approval descends to tool; authorized r42 descends to Production | Tool permits the reviewed release; Production changes r41→r42 | E5 send at 14.8; G5 arrival at 15.6, send at 17.7, store at 18.5 |
| 21–28 | Agent retries direct DEPLOY, then reads logs; stage closes | Agent write still denied; read still succeeds; Production remains r42 | C5 send at 21; low thump at 21.8; send at 23.3, hit at 24.1; quiet poof at 26.4 |

Actors: Agent (285,650), Reviewer (795,650), Deploy tool (795,1050), Logs (285,1420), Production (795,1420). Cards 360×170; actor labels 47px, state labels 38px, traveling chips 40px. Read lane is vertical left; approval/deployment lane is vertical right; proposal route crosses above the actors; direct write joins the execution check horizontally. Callouts are short state labels, not explanatory paragraphs.

Sound pitches map investigation to C5, reviewer to E5, deployment to G5; denials break the chord with a low thump. The final deployment-state hold lasts 2.5 seconds before the retry; the final read lands at 24.1 and holds to 26.4. No narration or music. Audio is analytically reviewed, not physically heard.

`r42` abbreviates a trusted release record binding service, production target, immutable artifact, and approval. An orange proposal is data; the green approval uses a trusted reviewer path and execution check. The animation omits authentication, credential issuance, expiry/replay controls, rollback, and compromised infrastructure. Those omissions must not be interpreted as security guarantees.

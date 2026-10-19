# One login, one verifier

Author: gpt-6-astra; reasoning: high. Independent scene authored from the original concept and primary sources; no other variant scene read, no baseline media inspected.

Learning objective: identify why an agent host must retain a separate PKCE verifier for each concurrent authorization attempt, and recover from a crossed pair with a fresh login.

| Time | What moves | State change | Sound |
| --- | --- | --- | --- |
| 0–6.4 s | Login A sends hash A; code A returns | Host retains verifier A; server associates code A with hash A | C5 store, send and arrive |
| 6.4–11.4 s | Login B sends hash B; code B returns | A second distinct transaction remains alongside A | E5 store, send and arrive |
| 11.4–18 s | Verifier B crosses into A's request | hash B differs from code A's expected hash A; invalid_grant, no token | E5 send, low C3 thump and miss |
| 18–23.1 s | Old local records clear; fresh C sends hash and receives code | New transaction C replaces the failed attempt | poof, G5 recover, store and arrive |
| 23.1–30 s | Code C and verifier C descend; token returns | Matching comparison, then token held; fade from 28.4 to 28.9 | G5 hit, deliver via arrive, chime; soft poof |

The short labels are identifiers, not real verifier values. “hash” abbreviates the full S256 transform including base64url encoding. Browser approval, redirects, other token validation, resource requests and permission enforcement are omitted. The server's drawn rows show logical associations, not a mandated database design. Clearing the screen does not claim protocol-level revocation of A or B. Token issuance in C assumes all other OAuth checks succeed.

The callback-storage defect is an illustrative scenario, not an observed product incident and not the distinct OAuth authorization-server mix-up attack. The cut complements the original interception-focused prose by making per-transaction storage the visible cause of failure.

## Reproduce

From repository root:

```sh
# Existing repository node_modules must contain pinned puppeteer-core 25.14.0.
# Otherwise install only the local dependency:
npm ci --prefix video/oauth-pkce/astra/engine
sh video/oauth-pkce/astra/render.sh
```

Node >=22.12, Python 3, FFmpeg/ffprobe and Chrome are required. Set CHROME_PATH if needed. All rendering commands resolve relative to this cut; temporary render files, stills, PCM and inspection frames live in scratch/. The optional node_modules symlink points to the root's ignored dependency installation. The engine package lock permits a local install without that symlink. Only one encoder runs at a time, with at most two FFmpeg codec/filter threads.

Pre-render stills:

```sh
cd video/oauth-pkce/astra
node engine/render.mjs scene.js --stills 5.4,10.5,13.5,16.5,22.5,26.8 --stills-dir scratch/stills
```

For interactive preview on macOS, from repository root:

```sh
cd video/oauth-pkce/astra
open "file://$(pwd)/engine/preview.html?scene=../scene.js"
```

The Play button enables sound. This is not evidence of listening by the author.

Local engine changes: 44px packet labels and 76px chip height; 40px subtitle; full-frame fade for identical loop endpoints; scratch-local temporary storage; two-thread FFmpeg bounds; CRF 28 constrained to 430 kb/s with 64 kb/s AAC and 0.75 audio gain. Installed skill unchanged. Source dependencies are the copied engine, renderer, SFX synthesizer and preview, plus the pinned local package manifest/lock.

## Comparative revision

Edited by gpt-6-astra comparative review on 2026-10-19. At 12.3s login A now visibly retains the wrongly selected verifier B before submission. Timing and sound events are unchanged. See ../../../reviews/comparisons/oauth-pkce/after.md for final encoded verification.

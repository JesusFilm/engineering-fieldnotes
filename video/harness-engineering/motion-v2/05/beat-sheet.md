# Video 05 beat sheet: Require a passing check

**Mechanism:** a configured branch rule on `main` requires the `access` check and one review approval, with bypass limited to maintainers. The protected branch refuses a merge request until the required check has passed on the PR's current head. A claim or request from the agent does not count as evidence. A passing check clears only its own requirement, so review still blocks the merge.

**Composition:** a software status view in four parts:

- **Branch rule card:** `required check  access`, `required review  1 approval`, `bypass  maintainers`. It is never edited.
- **PR #42 card:** `head d73`, an `access` status row with two case rows that appear during the run, and a `review` row.
- **The agent (`AI`):** with its claim bubble.
- **The protected `main` card:** `tip b10` and a two-part requirement meter (`0 of 2 met`). Below it, a refusal line names the unmet requirement.

The agent's merge request travels a dotted path straight to `main` and is refused by the branch itself, not by a disabled button. `tip b10` never changes. Duration 35.0 s at speed 1, with a finite ending: the stage fades below the title from 32.6 to 33.6 s.

## Synthesis decisions (neutral plan labels)

| Choice | From | Reason |
|---|---|---|
| Rule shown and configured before any action | A | The control exists before anyone asks; it is not a suggestion in chat |
| Case rows (`own tenant`, `other tenant`) that execute one at a time; the check reads `passed · d73` only after both finish | A | Shows real execution evidence, bound to the current head |
| Review stays pending and blocks the final request | A + B | The check clears only its own requirement |
| A claim (`"tests pass"`) that dies at the PR panel edge, while `access` stays `no result` | B | A visible non-change: words do not satisfy the requirement |
| Two-segment requirement meter, `0 of 2` then `1 of 2 met` | B | Partial clearance is readable at 350 px without text |
| On each refusal, the rule row that caused it flashes | B | Cause without captions; the second refusal points at review |
| Bypass shown as `maintainers` and flashed on the first refusal | Neither as written (A had `Bypass: none`, B `bypass none`) | Bypass is a controlled permission; the agent does not have it |
| Merge request sent to the protected branch, which refuses it; no Merge button | Neither (A used a disabled button and cursor; B a merge control) | Enforcement sits at the protected update boundary, so it cannot be read as a cosmetic button state |
| Not used: A's stale c42 → d73 revision beat | — | Cut 03 already teaches evidence binding; `head d73` and `passed · d73` keep the binding visible |
| Not used: B's separate runner box with mirrored progress bar | — | The case rows inside the PR are a smaller slice that shows the same execution |

## Sound map

- **Rule rows:** `ack` at C5 (check), E5 (review), G5 (bypass). The same pitches mark the rule row that causes each refusal.
- **Agent sends:** the claim is `send` C6, the merge request `send` G6. The claim dying is a quiet `miss`.
- **Refusals:** `thump`. The first is the loudest cue (−2.9 dBFS peak); the second, for review, is softer (−6.9 dBFS).
- **The run:** `arrive` C5 when it starts, `work` E4 ticks during each case, `ack` E5 when each case passes, and `chime` E5 when the check passes.
- **The ending:** a silent final hold and fade, with no victory sound.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–7 | **The rule is configured.** The rule card pulses at 0.8 s. Its three rows highlight one by one at 1.4, 2.5 and 3.6 s. Hold. | The required check, required review and bypass limit exist before any action. `access` shows `no result`, review `pending`, main `tip b10`, `0 of 2 met` | 1.4 ack C5 · 2.5 ack E5 · 3.6 ack G5 |
| 2 | 7–16.5 | **Words move nothing.** 7.0 the agent posts `"tests pass"`. 8.3 a `tests pass` chip rises and dies at the PR edge (8.9) with a grey ripple. The `access` row flashes grey and stays `no result`. 11.0 a `merge #42` request travels to `main`. 12.2 main jolts red: `rejected · needs access`. 12.5 the `required check` and `access` rows flash red. 13.2 `bypass maintainers` flashes amber. Hold, then the refusal and claim clear by 15.9. | The claim and the request change no state; the branch refuses; the tip stays b10 | 7.0 send C6 · 8.9 miss · 11.0 send G6 · 12.2 thump · 12.5 ack C5 · 13.2 ack G5 |
| 3 | 16.5–27 | **The check runs on the current head.** 16.5 `head d73` flashes and `access` reads `running · d73` with a spinner. 17.0 the case rows appear. 17.6–19.8 `own tenant` runs, then passes. 20.6–22.8 `other tenant` runs, then passes. 23.8 `access` reads `passed · d73` with a tick, the rule's `access` turns green, the meter fills one segment, and the label reads `1 of 2 met`. Hold. | Evidence comes from execution on d73; success appears only after both cases pass | 16.5 arrive C5 · work E4 ×4 per case · 19.8 / 22.8 ack E5 · 23.8 chime E5 |
| 4 | 27–35 | **Only that requirement cleared.** 27.0 `merge #42` travels again. 28.2 main jolts amber: `rejected · needs review`. 28.5 the `required review` and `review` rows highlight, and review turns amber `pending`. Hold until 32.6, then fade to black below the title by 33.6. | The check is satisfied, review is still required, and main stays `tip b10` | 27.0 send G6 · 28.2 thump (softer) · 28.5 ack E5 |

## Reproduce

From the repository root, with the pinned `puppeteer-core` 25.14.0 from the root `package.json`:

```
node video/harness-engineering/motion-v2/05/engine/render.mjs video/harness-engineering/motion-v2/05/scene.js video/harness-engineering/motion-v2/05/video.mp4 --sheet video/harness-engineering/motion-v2/05/scratch/contact-sheet.png
ffmpeg -v error -i video/harness-engineering/motion-v2/05/video.mp4 -ss 30.5 -frames:v 1 -q:v 3 video/harness-engineering/motion-v2/05/poster.jpg
```

`engine/` started as the clean skill copy. `render.mjs`, `sfx.js` and `preview.html` are unchanged. `flow-engine.js` carries the general local helpers from the earlier motion-v2 cuts (`card`, `track`, `rule`, `log`, `commit`, `ring`, `edge`, `disc`, `docv`, chip `size`, `meta.veilTop`). It adds two general nodes:

- `icon`: a status icon that is empty, spinning, a tick or a cross, so status reads by shape as well as colour.
- `statusrow`: an icon, a name and a right-aligned value, with a highlight outline.

## Accuracy limits

This is an illustrative branch-protection view. The labels `b10`/`d73` are teaching identifiers, and real hosts evaluate checks against the revision their protection uses, which can be a test-merge or queue revision. Some hosts can accept skipped or neutral conclusions; this cut shows a check that actually executed both relevant cases. Bypass is a permission held by maintainers, and the depicted agent has none. A passing `access` check is evidence for its two cases only; it does not approve the change, prove broader correctness, or authorise a merge. The clip ends before review.


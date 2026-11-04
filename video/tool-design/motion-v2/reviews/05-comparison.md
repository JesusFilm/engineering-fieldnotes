# Tool design 05 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Expose more pages.” It demonstrates the cursor dependency, partial coverage and stopping condition more concretely than the public baseline. No reproducible objective blocker was found in the inspected frames and transitions. Recommendation is local; no media or publication change was made.

## Scope and inspection method

Grounding: item 5 of `video/tool-design/sequence/lessons.json`. A bounded first page is partial when continuation is available. A following request reuses its cursor and scope when needed and affordable; a successful response with no continuation ends paging.

Earlier planning context was acknowledged, but no author source, other plan, or self-review was read for this comparison. Inspected actual individual 350 × 622 images, not a contact sheet: candidate periodic samples 001–008 and baseline 001, 003, 004, 006. Periodic extracts use ffmpeg `fps=1/5`; file numbers identify samples, not exact timestamps.

Additional exact frame-index extracts were viewed at candidate 14, 17, 18, 19, 20, 23, 25, 28, 29, 30, 32 and 38.5s, and baseline 7.3, 14.3 and 21.3s. Candidate 32s was also viewed full-size. An additional extracted 9s frame was not used as visual evidence. Full videos were computationally decoded, but visual review was sampled rather than continuous playback.

Alternate extraction selected exact frames from the full decode into 1080px PNG, then used Pillow Lanczos to produce 350px JPEG, independent of the initial ffmpeg-scaled periodic PNGs. Apparent omissions of static text in displayed small images were not treated as encoded defects. The full 32s frame confirms the complete title, scope, result fields and both collected IDs from page 1. No missing-text fault is asserted.

## Comparison

| Criterion | Local candidate | Public baseline |
|---|---|---|
| Causal clarity | Exact `k7Q` token moves from response to request; accumulated records remain partial until the next response is consumed | Generic cursor and next-page chips explain direction, with captions supplying the detailed rule |
| Accuracy | Preserves the payments interval and limit; includes `need more · budget ok`; highlights absent next cursor before stopping | Correct core progression but no concrete scope/token values or budget decision |
| Pacing | 40s with separate holds for first page, continuation, second response and completion | 28s with four approximately seven-second stages; readable but less detailed |
| Native 350px legibility | Essential fields, IDs and states readable; short secondary headers fit the layout | Main node names and two-line captions readable |
| Meaningful variety | Horizontal backend record selection, cursor return path and accumulated page rows have different jobs | Vertical actor/result stack and loopback connector remain largely unchanged |

## Timestamp evidence

- Periodic samples 001–003 establish `limit: 2`, select INC-42 and INC-57, then return those IDs plus `next_cursor: k7Q`. Both the response and collection show partial coverage.
- **14s:** first-page evidence is held intact, with no premature total-completion claim.
- **17–20s:** `need more · budget ok` precedes the follow-up. The exact token travels via the left margin into `cursor: k7Q`. Query scope remains payments, 09:00–10:00Z; limit remains 2. The token is copied rather than incremented or interpreted.
- **23–25s:** the backend selector moves from the first two IDs to INC-63. The response clears while the first-page collection persists. At 23s the label already reads page 2 during selector travel: a small timing refinement, not an incorrect settled result.
- **28–29s:** response 2 contains INC-63 and highlights `next_cursor: (none)`. Response completion appears while the collection is still partial, making room for the subsequent collection update.
- **30s:** INC-63 is appended under p2 and collection becomes complete; p1 retains both original IDs.
- **32–38.5s:** request status reads `stop paging`; no next request is shown in these final samples. The prior request's `cursor: k7Q` remains historical input, while the latest response's absent next cursor determines stopping. The final held state is readable and resolves the lesson.
- **Baseline 7.3/14.3/21.3s:** PAGE + CURSOR travels toward the result; CURSOR returns along the loopback; PAGE 2 travels toward the result. Final periodic sample shows no next cursor and query complete. It is accurate but leaves concrete token reuse and accumulated records to inference.

## Limits and optional refinements

The count limit bounds records, not necessarily bytes or tokens. The example's application fields are not mandatory MCP tool-result fields; backend record selection is illustrative and does not expose a real database implementation. The third placeholder under “Backend matches” is an omniscient teaching view, not evidence already returned to the model. Completion means the pages exposed by this successful query contract are consumed; it does not prove source completeness or all real-world incidents. `(none)` is a display representation of no cursor, not a token sent to the backend.

No reproducible clipping, overlapping essential held text or contradictory settled state was found. Optional refinements only:

1. Change the page-selection label after its selector reaches page 2, avoiding a transient association with the old IDs at 23s.
2. Increase the cursor route's left margin. The 18s alternate extract shows the chip readable but close to the edge; this is not demonstrated clipping.

## Technical and sound checks

Both videos decode completely with exit 0 and no reported errors. Candidate: 40s, 1080 × 1920, 30fps, 1200 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both have `moov` before `mdat`.

Audio signal analysis reports candidate mean −33.4dB / maximum −8.2dB and baseline mean −39.7dB / maximum −10.2dB, with measured headroom. **Audio was not actually heard.** Signal measurements and frames do not establish actor-specific timbre, audible synchronization or listening comfort.

No repair was made. Any subsequent encode requires renewed encoded inspection bound to the new hash; replacing the hash in this decision is insufficient.

## Hash binding

**Candidate** `video/tool-design/motion-v2/05/video.mp4`

- Before: `8200705b60adc6a1beab9987adb0917166644dcdf854023fb85c5cf9051c83be`
- After: `8200705b60adc6a1beab9987adb0917166644dcdf854023fb85c5cf9051c83be`
- Unchanged: yes.

**Baseline** `public/lessons/tool-design/05.mp4`

- Before: `80ccfae115bbd5731701101c007773bc5f61384555faed02530bb3ce588f4e83`
- After: `80ccfae115bbd5731701101c007773bc5f61384555faed02530bb3ce588f4e83`
- Unchanged: yes.


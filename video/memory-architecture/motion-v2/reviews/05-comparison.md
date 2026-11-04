# Memory architecture 05 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Correct outdated memory.” It preserves the original command and provenance, links the superseded record to its replacement, and separates later retrieval from checking. No reproducible objective blocker was found in the inspected frames and transitions. This is a local recommendation, not publication approval.

## Grounding and method

Grounding: item 5 of `video/memory-architecture/sequence/lessons.json`. When authoritative instructions change, supersede retained notes under policy, preserve history, store the new command/source and validate later retrieval against the task. Earlier planning context was acknowledged. No author source or self-review was consulted.

Inspected actual individual native 350 × 622 images: candidate periodic samples 001–008 and baseline 001, 003, 004, 006. Periodic files use ffmpeg fps=1/5; their filenames identify samples, not exact timestamps. Additional exact frame-index extracts were inspected at candidate 4, 5, 8, 10, 12, 15, 16, 18, 20, 24, 26, 28, 29, 30, 33 and 39s, and baseline 7.3, 14.3 and 21.3s. Candidate 29s was also viewed full-size. Both files were fully decoded computationally; visual review was sampled rather than continuous playback.

Alternate extraction selected exact frames from full decode into full-size PNG, then resized with Pillow Lanczos to 350px JPEG, independently of the periodic ffmpeg-scaled PNG route. Full-size 29s confirms complete values, source revisions, replacement label and later-session state. Apparent display omissions were not treated as encode defects. No unconfirmed visual fault is flagged.

## Comparison

| Criterion | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Source changes first; owner action supersedes the old note; separate r2 record and replacement link appear; later read is checked | Correct branched flow, with captions carrying more of the correction story |
| Accuracy | r1's original value and source remain; r2 has its own source; retrieval starts as a candidate | Preserves r1 identity, but its displayed command is replaced by a status label |
| Pace | 40.6s separates source change, supersession, replacement, retrieval and comparison, with long final hold | 28s with four approximately seven-second stages; concise but less concrete |
| Native350 legibility | Essential short values, revisions and state labels readable; secondary labels modest but usable | Readable larger node labels and explanatory captions |
| Meaningful variety | Persistent history rows, explicit replacement bracket and later-session comparison expose different relationships | Fixed source/saved-note/retrieval graph with traveling tokens |

## Timestamp evidence

- Periodic sample 001 establishes r1/npm test as initially active. **4s:** authoritative source now shows r2/pnpm test while storage still contains r1. **5–8s:** retained r1 is marked outdated, preserving its earlier command/source.
- **10s:** owner billing initiates supersede r1. **12–15s:** the row becomes superseded while npm test and AGENTS.md @ r1 remain visible. Supersession does not erase or rewrite history.
- **16–18s:** owner action changes to store r2/link; a separate active r2 row appears with pnpm test and AGENTS.md @ r2.
- **20s:** replaced-by link joins the two records, with r2 provenance highlighted. The two revisions remain distinct.
- **24s:** later session at checkout r2 is reading with no result yet. **26s:** it receives pnpm test @ r2 as a candidate, not immediately checked evidence.
- **28s:** checkout r2 and retrieved r2 highlight together. **29–30s:** status becomes checked. No test execution or test pass is shown.
- **33–39s:** replacement/history receives emphasis and the final state holds. r1 remains superseded, r2 active, and the later session has the matching command.
- **Baseline 7.3/14.3/21.3s:** old note becomes superseded; source r2 transfers to the saved-r2 node; an r2 note transfers toward later retrieval. Final sampled state says r2 matches task. This is correct but less explicit about original command provenance and candidate-versus-checked states.

## Accuracy limits

The shown owner is a maintenance actor, not evidence that access controls are enforced. The sequence's core correction mechanism is demonstrated; permission enforcement remains assumed and would benefit from a concise explicit cue. Neither namespaces nor owner labels alone authorize writes.

Superseded means no longer current for this illustrated r2 workflow, not that the old note was never valid. The film retains both records and does not claim indefinite historical retention is universally required. Publication is staged with no concurrent reader shown; it makes no atomic-write or failure-recovery guarantee.

The later check visibly compares revisions for the displayed task. It does not prove all applicability dimensions, command success, model obedience or source authority. There is no active-context refresh shown or implied. Values are fictional teaching data, not verified commands for the working repository.

No reproducible essential held-text clipping, collision or contradictory final state was found. Historical text remains readable rather than being erased. Highlighted transitions resolve to stable readable states.

## Optional improvements, not blockers

1. Add an explicit application write-permission cue beside the owner action, distinguishing ownership from enforcement.
2. Label the later comparison as an applicability check, clarifying the meaning of checked without implying execution.

## Technical and audio checks

Both full decodes returned exit 0 with no reported errors. Candidate: 40.6s, 1080 × 1920, 30fps, 1218 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both place moov before mdat.

Audio signal analysis: candidate mean −34.8dB / maximum −7.7dB; baseline mean −41.6dB / maximum −10.4dB. Measured peaks leave headroom. **Audio was not actually heard.** Frame/signal analysis does not establish actor-specific timbre, audible synchronization or listening comfort.

No media edits or repairs were made. A changed encode requires renewed actual encoded inspection bound to its new full SHA-256, not replacement of this hash alone.

## Hash binding

**Candidate** `video/memory-architecture/motion-v2/05/video.mp4`

- Before: `fdcd71856dac5de7ea876ed7d30a5f228781ab87813391824819ce7c5060c68f`
- After: `fdcd71856dac5de7ea876ed7d30a5f228781ab87813391824819ce7c5060c68f`
- Unchanged: yes.

**Baseline** `public/lessons/memory-architecture/05.mp4`

- Before: `4387cddfe382213d79b39595c905a81590a0a2cc4059afe0b0c8fa5f1d0bce31`
- After: `4387cddfe382213d79b39595c905a81590a0a2cc4059afe0b0c8fa5f1d0bce31`
- Unchanged: yes.


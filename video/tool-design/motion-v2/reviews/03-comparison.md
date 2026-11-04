# Tool design 03 — encoded comparison

Decision: **pass**. Prefer the local candidate for “Return usable evidence.” No reproducible objective blocker was found in the inspected frames and transitions. This decision applies only to the candidate hash below; it does not authorize publication.

## Scope and method

Compared the two MP4 encodes against lesson 03 in `video/tool-design/sequence/lessons.json`: return record IDs and short summaries, retain the searched interval, cite the returned records, and keep claims within that evidence. Earlier planning context was acknowledged, but author source and self-review were not consulted for this inspection.

Inspected individual 350 × 622 images, not a contact sheet: candidate periodic samples 001–008 and baseline 001, 003, 004, 006. Additional exact frame-index extracts were inspected at candidate 7, 8, 18, 22, 26, 28, 30, 34 and 41 seconds, and baseline 6.8, 7.3, 13.8, 14.3, 20.8, 21.3 and 27.9 seconds. The candidate 22-second full-resolution frame was also inspected. Scratch includes some extra extracted frames not used as visual evidence. This is sampled visual review plus complete computational decoding, not a claim of continuous playback or listening.

Alternate extraction decoded exact frame indices to full-size PNG, then resized using Pillow Lanczos to 350px JPEG, independently of the periodic ffmpeg-scaled PNG route. Apparent omissions of title/other static text in displayed small images were not treated as encode defects: the full 22-second extraction contains the title, headers, and complete labels. No missing-text blocker is asserted.

## Comparative findings

| Criterion | Local candidate | Public baseline |
|---|---|---|
| Concrete evidence | Two named records, INC-42 and INC-57, each with a short incident summary | IDs appear, but summaries are requested in captions rather than demonstrated |
| Causality | Bare `status: ok` leaves an answer with “nothing to cite”; records then support an answer carrying the same IDs | Search/result/model stack and moving evidence labels explain direction but leave more work to the captions |
| Scope accuracy | Visible payments interval, highlighted timeline, explicit overclaim and correction | Caption explains that two records are not all history; no visible counterexample or correction |
| Phone legibility | Main record summaries, IDs, result count and interval readable at native 350px; secondary gray labels smaller but usable on held states | Labels and two-line captions readable; less concrete material to inspect |
| Pacing | 42 seconds gives separate holds for bare result, records/scope, citations, overclaim and correction | 28 seconds with four approximately seven-second stages; orderly but more compressed |
| Meaningful variety | Result rows, citation highlighting, interval geometry and answer validation retain state | Stable three-box stack with packet labels and changing captions |

## Observed progression

- At 7–8s the bare success status is highlighted and the answer has nothing to cite. This establishes the limitation of a success flag rather than treating successful execution as evidence completeness.
- By 18s the result contains two summaries and `searched: payments 09:00–10:00Z`; two timeline marks lie inside the highlighted interval. The old vague answer is dimmed during the transition.
- At 22s the first returned record and the answer’s ID row are highlighted. By 26s both records and their IDs are retained, with the answer marked “cited.” Identity persists across the result and answer instead of being replaced by a generic evidence token.
- At 28s “No other incidents today” appears in red. At 30s the answer explicitly reads “over-claims” and red marks emphasize the outside interval. This is an intentionally wrong intermediate claim, subsequently corrected, not the lesson’s conclusion.
- At 34s the answer is “within scope,” retains “Returned: 2 reports” and both IDs, and states “Only 09:00–10:00Z searched.” Outside regions read “not searched.” The 41s sample shows the finite ending fade after the corrected state has had a substantial hold.
- Baseline boundary samples show the IDs/interval token at 7.3s, evidence transfer at 14.3s, and scope caption by 21.3s. Its final state remains stable through 27.9s.

The candidate demonstrates the mechanism with persistent software-native state and sparse useful labels. It does not require a paragraph caption to explain its main conclusion. Transient dimming is separated from held reading states; no reproduced collision, clipping or unreadable essential held label was found.

## Accuracy limits

A record ID makes support inspectable; it does not establish that the source is correct or complete. “Within scope” is appropriately a claim-limit label, not independent verification of incident truth. The example does not establish coverage of every incident even inside the interval. The timeline illustrates the search window; it is not a precise event-time audit. Dates, pagination and source auditing are not taught here. The change of fictional ID between cuts is immaterial to the lesson. A success flag alone also does not prove that incidents were found: the initial vague answer is presented as insufficient, then replaced by actual returned evidence.

## Technical and audio checks

Both files decoded completely with no reported errors. Both are H.264 at 1080 × 1920; candidate is 42s, 30fps, 1260 frames, baseline 28s, 20fps, 560 frames. Both place `moov` before `mdat`.

Audio signal analysis: candidate mean −34.2 dB / maximum −7.3 dB; baseline mean −38.8 dB / maximum −7.6 dB. These measurements show headroom, not perceptual quality. **Audio was not heard**; actor-specific timbre, synchronization and listening comfort remain unassessed by this visual review.

## Optional improvements

- Add a date or brief UTC label to make the incident example more self-contained.
- Highlight each corresponding ID individually during citation transfer for a more exact mapping.

Neither refinement is a blocker. No repair was made. Any later encode must receive a fresh inspection bound to its new full hash.

## Hash binding

**Candidate** `video/tool-design/motion-v2/03/video.mp4`

- Before: `fd17077cc46339e7d1527c9ce782a0f17a147e29e7f23d6db39d90ca4821e34a`
- After: `fd17077cc46339e7d1527c9ce782a0f17a147e29e7f23d6db39d90ca4821e34a`
- Unchanged: yes.

**Baseline** `public/lessons/tool-design/03.mp4`

- Before: `ce1aa99900cde974ff81ab3be2926a3ed09ee7b90c5da19210ba69058d871b09`
- After: `ce1aa99900cde974ff81ab3be2926a3ed09ee7b90c5da19210ba69058d871b09`
- Unchanged: yes.


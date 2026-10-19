# Reading and interaction review — 19 October 2026

The local release review is complete: all 18 guides and 54 videos passed the full release checker. Live deployment checks remain below.

## Design reference

Read the supplied [AI-slop web design reference](https://jaxsbr.github.io/wiki/topics/ai-slop-web-design/). Applied its design-system approach: retain Option A's typography, paper/ink palette and ruled index; define chapter and comparison layouts deliberately; use functional copy and controls. No decorative badges, sales cards, gradients or animation were introduced.

## Browser evidence

Local preview: port 4174. Screenshots retained in ignored `captures/`.

- Desktop index: the hierarchy, serif title and ruled rows remain recognizably Option A. Search is labelled; filter controls are native. The first revision had a long introductory paragraph; shortened it to put more of the index in view.
- Search originally failed to match `retry` against `retries`, despite that suggested query. Added common y/ies normalization and verified the query survives reload, returns Timeouts and retries, and opens the chapter with Enter.
- Search for `zzzznothing` visibly produced zero concepts and an explanatory empty state. “Show all concepts” restored the index and search focus. Selecting the reference shelf produced eight entries in the draft; the final editorial selection has six reference entries. URL query parameters reflected the state.
- Desktop chapter: the video sits alongside the introduction and body, with 17px text and a bounded line length. Sources and related chapters are ordinary links.
- Phone-width chapter: the completed Observability and tracing guide also passed the long-title, reading-jump and zero-horizontal-overflow check.
- Phone-width chapter: browser viewport override requested 390×844 (document content width 375px with scrollbar); measured document scrollWidth equalled clientWidth. The tall video pushed reading down; added and tested “Read the guide” to jump directly to the prose. Body text remained readable without horizontal scrolling.
- Supporting text measures 5.64:1 and links 6.87:1 against the paper background. The input underline measured only 1.86:1, so darkened functional input/button borders to 3.38:1; decorative rules remain lighter. These checks do not claim a complete accessibility audit.
- Phone index: reduced introductory copy and hide the Clear filters control until a filter is active, avoiding an unnecessary third control row.
- Harness comparison: all three distinct cuts were visible. Before playback, unplayed videos had readyState 0 and zero buffered ranges. Playing the baseline loaded it (readyState 4) while the others remained unloaded. Starting Astra paused the baseline and loaded only Astra; Fable remained unloaded. Paused playback afterwards.
- Once full recommendations arrived, their opening paragraphs pushed videos below the initial desktop view. Moved the rationale into a native disclosure labelled with the recommended cut’s title, keeping the full evidence available.
- Comparison layout: desktop uses three aligned columns, tablet two, mobile a single column. Verified the updated two-column layout at 900px. Expanded Astra’s timestamped transcript and confirmed it renders readable text rather than serialized objects. Reduced the secondary page's title/intro spacing to give the videos more room. Each cut exposes a textual beat sequence and provenance via native disclosure controls.
- An isolated, unpublished fixture pointed the player at a missing file. After playback failed, the visible recovery message offered the direct video link and the written guide. Added a source-element error listener because that event does not bubble to the video element. The fixture is removed by the next build.
- A skip link, section anchors, visible focus style, native playback controls, and print/reduced-motion rules are implemented. Tab reached the visible skip link on the about page; Enter moved focus to the main landmark. On the Tool design chapter, the skip link moved focus into main and the next Tab reached Contents. Final chapter/comparison checks remain on the release checklist.

## Automated evidence

`python3 scripts/check.py --draft` checked 39 generated pages, one H1 per page, local assets, all internal links and fragment targets, no eager video preload or autoplay, and no external runtime scripts. The final index + CSS + JavaScript + used fonts total 131,947 bytes uncompressed, under the 220 KB budget. This is a file-size budget and observed preload behaviour, not a simulated connection-speed benchmark.

## Remaining release checks

- Full reviewed build passed, with all content and comparison records present.
- Final desktop and phone screenshots after recommendations populate.
- Keyboard traversal, unknown-route screen, and deployed GitHub Pages paths/media.
- Check the actual recommended cut for every concept against comparative evidence; do not infer quality from a successful encode.

Published diagnostic records normalize machine-specific project prefixes to `<project>`; measured values and observed browser results are unchanged.

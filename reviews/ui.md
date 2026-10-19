# Reading and interaction review — 19 October 2026

## Optional spatial investigations (local branch review)

Four scenes pass the new spatial gate; fourteen attempts are excluded from the
production build. Video stays selected initially and no iframe exists until the
reader chooses Explore in 3D. Switching back removes the iframe and leaves video
paused. The index identifies qualifying chapters with a quiet 3D label.

Actual browser review covered each accepted scene's causal states, keyboard
controls, reset and 420px framing. The chapter layout was tested at 390px with
no horizontal overflow. Enlarged the desktop stage and corrected narrow camera
framing for the bridge and test bed. Small engravings remain secondary to the
geometry and caption; zoom is useful on a phone.

The viewer's animation queue could multiply when a scene invalidated during an
update. Fixed it to keep one pending frame, reproduced the previously stalled
canary interaction successfully, and added a regression using the actual host
functions. Also fixed cached-page disposal and added a module-independent load
failure fallback. A missing-module fixture visibly showed the fallback and was
removed afterward. Back navigation worked; the cached lifecycle branch has a
source-based test. These checks are not a complete accessibility audit.

Per-scene screenshots and observations are under `reviews/spatial/<concept>/`;
the [release review](spatial-release.md) records all decisions and limitations.
These additions are locally verified, not claims of a new public deployment.

The local release review is complete: all 18 guides and 54 videos passed the full release checker. The public deployment and live checks also passed.

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
- A skip link, section anchors, visible focus style, native playback controls, and print/reduced-motion rules are implemented. Tab reached the visible skip link on the about page; Enter moved focus to the main landmark. On the Tool design chapter, the skip link moved focus into main and the next Tab reached Contents. Final chapter/comparison checks passed on the deployed site.

## Automated evidence

`python3 scripts/check.py --draft` checked 39 generated pages, one H1 per page, local assets, all internal links and fragment targets, no eager video preload or autoplay, and no external runtime scripts. The final index + CSS + JavaScript + used fonts total 131,947 bytes uncompressed, under the 220 KB budget. This is a file-size budget and observed preload behaviour, not a simulated connection-speed benchmark.

## Published release verification

The first public deployment succeeded in [GitHub Actions run 39180635517](https://github.com/JesusFilm/engineering-fieldnotes/actions/runs/39180635517). The full release checker validated 39 pages; the following was also observed in the live browser:

- All 18 chapter routes rendered their own heading and the recommended cut from the final comparative record: 17 Astra, OAuth PKCE Sol.
- All 18 comparison routes exposed three cuts. Every one of the 54 videos reached buffered readiness and responded to its native playback control. Starting a new cut paused the prior cut. Recorded per-cut results are in [live-browser-checks.json](live-browser-checks.json). These are start/compatibility checks, not claims of real-time full-length viewing.
- Some cold video requests were still pending at the first observation. Checks were completed after fresh browser snapshots showed readiness; a navigation network-idle timeout was not treated as either a broken page or proof of successful playback.
- Search for `retry` returned Idempotency and Timeouts and retries; its query survived reload. An unmatched query displayed the explanatory empty state. Show all concepts reset to 18; the final reference shelf displayed six.
- Tab exposed the skip link and Enter focused the main landmark. The unknown nested path `/unknown/chapter/` showed the custom missing-page screen and its contents link returned to the correct project root. The About route rendered correctly.
- Final desktop chapter review retained readable prose beside the video, restrained supporting text and ordinary source links. Final phone chapter and comparison checks measured scrollWidth equal to clientWidth (375px); the reading shortcut jumped past the video to readable prose. Comparison videos stack in one column on a phone.
- Final screenshots are retained locally in ignored `captures/fieldnotes-live.png`, `captures/chapter-live-desktop.png`, `captures/chapter-live-mobile.png` and `captures/comparison-live-mobile.png`.
- The live video response advertises `Accept-Ranges: bytes` and `Content-Type: video/mp4`. Hash-versioned media and posters prevent a changed file from sharing the old URL. No connection-speed benchmark is claimed.

Published diagnostic records normalize machine-specific project prefixes to `<project>`; measured values and observed browser results are unchanged.

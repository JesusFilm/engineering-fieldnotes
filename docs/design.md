# Reading design

Reference: https://jaxsbr.github.io/wiki/topics/ai-slop-web-design/ (read 19 October 2026).

Keep Option A's ruled index, warm paper background, dark ink, restrained green links, Caslon titles and DM Sans body. Use typography and spacing to make hierarchy visible. Chapter text should fit roughly 60–72 characters per line, at least 17px with generous leading. Supporting text remains readable and passes contrast checks.

The index helps a working engineer choose the next useful lesson. The chapter opens with the problem and its relevance to team work; a short practical exercise supplies an outcome the reader can inspect. Sources explain what evidence supports the guide. Related links and previous/next chapters support continued reading.

Videos belong beside the reading on wide screens and after the introduction on narrow screens. Start with a poster and explicit play action. Alternative cuts live in a comparison section with meaningful lesson labels, durations, provenance and review rationale. No autoplay, synchronized playback, background video, or eager video downloads. A new video choice stops the prior player.

Use plain rectangular controls, thin rules, and underlined prose links. Avoid decorative badges, generic sales copy, ornamental gradients and motion. Retain visible focus, a skip link, comfortable hit targets, reduced-motion behaviour, useful empty states and a printable article.

Review index, chapter, comparison, sources, exercise, navigation, no-results and unknown-path states at desktop and phone sizes. Record observed problems and repairs in `reviews/ui.md`, with screenshots and actual browser checks.

The default chapter uses the approved Option A: topic heading, a direct lesson index, and one portrait player. Supporting explanation and the full source-backed guide are closed disclosures. No marketing subtitles, introductory text wall, or previous/next lesson carousel. On narrow screens a labelled selector replaces the side index.

Selecting a lesson pauses other videos and swaps content within the same player footprint without scrolling or moving focus. The explanation remains open if the reader opened it, with a stable reading area. Query links preserve the selection and browser Back works. Legacy lesson hashes normalize to query links so opening one does not hide the mobile selector. Playback starts only on request and ends without advancing. Without JavaScript, every lesson remains readable and playable.

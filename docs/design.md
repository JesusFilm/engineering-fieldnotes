# Reading design

Reference: https://jaxsbr.github.io/wiki/topics/ai-slop-web-design/ (read 19 October 2026).

Keep Option A's ruled index, warm paper background, dark ink, restrained green links, Caslon titles and DM Sans body. Use typography and spacing to make hierarchy visible. Chapter text should fit roughly 60–72 characters per line, at least 17px with generous leading. Supporting text remains readable and passes contrast checks.

The index helps a working engineer choose the next useful lesson. The chapter opens with the problem and its relevance to team work; a short practical exercise supplies an outcome the reader can inspect. Sources explain what evidence supports the guide. Related links and previous/next chapters support continued reading.

Videos belong beside the reading on wide screens and after the introduction on narrow screens. Start with a poster and explicit play action. Alternative cuts live in a comparison section with meaningful lesson labels, durations, provenance and review rationale. No autoplay, synchronized playback, background video, or eager video downloads. A new video choice stops the prior player.

Use plain rectangular controls, thin rules, and underlined prose links. Avoid decorative badges, generic sales copy, ornamental gradients and motion. Retain visible focus, a skip link, comfortable hit targets, reduced-motion behaviour, useful empty states and a printable article.

Review index, chapter, comparison, sources, exercise, navigation, no-results and unknown-path states at desktop and phone sizes. Record observed problems and repairs in `reviews/ui.md`, with screenshots and actual browser checks.

The local load-balancing sequence pilot (`--draft`) introduces one lesson at a time. A numbered lesson list, Previous/Next links, stable player area, visible position, and explicit completion keep navigation predictable. Introductions precede videos in reading order, including on phones. Switching lessons pauses the previous player; playback starts only on request. Deep links and browser Back work, and all six lessons remain readable and playable without JavaScript. No learner account or saved progress is required.

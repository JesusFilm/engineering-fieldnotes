# One attempt, one verifier — Sol

Authored by gpt-6.1-sol with high reasoning. Independent concurrency example, based on the original concept and linked primary RFCs. No alternative scene was inspected. The scene, copied engine, sound synthesizer and renderer live entirely in this directory. The shared library build, UI and manifests are outside this cut's ownership.

From the repository root:

```sh
# Install the root lockfile dependency only if it is absent:
npm ci
bash video/oauth-pkce/sol/render.sh
```

Requirements: Node >=22.12, the repository-root pinned puppeteer-core 25.14.0, Chrome, FFmpeg/ffprobe with libx264 and AAC, Python 3. Override Chrome discovery with CHROME_PATH. There is no dependency on the installed personal skill at reproduction time. An optional ignored sol/node_modules symlink points to ../../../node_modules; the renderer also resolves the root install directly. Do not commit dependency directories. Scratch images, WAVs and intermediate video stay in sol/scratch/.

The local engine adds a general record card, enlarges moving chips to 38 px and the subtitle to 36 px, and fades the whole canvas to identical black endpoints. The local renderer limits FFmpeg decoder/filter/encoder threads to two, uses CRF 29 / slow H.264 yuv420p, AAC 64k with 0.72 output gain, and faststart. No installed skill files were changed. Encoders run sequentially.

For stepwise visual review, run the first node command in render.sh, inspect stills, then run the second node command and verify.py. Inspect evidence/contact-sheet.jpg, every evidence/beat-*-350.jpg and scratch/beat-*-full.jpg, plus the spectrogram. Verification is hash-bound and checks the complete decode, exact decoded RGB boundary equality, dimensions/rate/codecs, duration/size, faststart, audio peak, each cue's decoded window energy and synchronization against the deterministic source. It does not claim physical listening or perceptual sound quality. A new encode requires renewed visual review. The metadata is intentionally written only after final inspection.

Local live preview (serve from the repository root if file access is restricted):

```sh
python3 -m http.server 4175
# Open the URL below in a browser; click Play to enable sound.
```

[Preview](http://localhost:4175/video/oauth-pkce/sol/engine/preview.html?scene=../scene.js). The preview has a scrubber, frame steps and a speed picker. The encoded MP4 remains the reviewed deliverable. Beat sheet, linked evidence and the team exercise are in beat-sheet.md; final inspection findings are in review.md.

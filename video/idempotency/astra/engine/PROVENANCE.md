# Local runtime provenance

Copied on 2026-10-19 from the installed architecture-flow-video skill scripts, without modifying the installed files. Authored scene and local modifications: gpt-6-astra, high reasoning.

Local changes:
- Generic panel/frame nodes for large phone-readable values, with animated values read via p().
- Larger title, subtitle, and travelling chip typography.
- Scratch files kept below this variant; two-thread encoding/filter limits; fixed QP and frame-index keyframe selection for exact loop boundaries.
- Sparse AAC at 48 kbit/s nominal, gain 0.70, and faststart.

The sound synthesizer and preview were copied unchanged. puppeteer-core 25.14.0 matches the repository pin; package-lock.json records dependency resolution. Reproduction does not load the installed skill.

Source hashes at copy time:

```json
{
  "flow-engine.js": "af17dffdf846f7d5e17d1efeeb8553953b39f54c098f6aa482030ba0ce31cf6d",
  "render.mjs": "6973f64a4f7c924c6970657282519bad41bead9085b194fa08f6ab955726d717",
  "sfx.js": "e3fb7e9fb3f44c703a6cab9d518618b23f8732e55fc68bfa1792a751b79b070e",
  "preview.html": "d8dc098079b502b6c55904be3aec065a348e9e4bed2c1f1c6cf9b8eba47643cf"
}
```

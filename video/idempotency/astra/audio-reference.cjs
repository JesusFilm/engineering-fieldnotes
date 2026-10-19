// Deterministic reference for checking mux timing, not a second encode.
const fs=require('node:fs');const path=require('node:path');
const F=require('./engine/flow-engine.js');const SFX=require('./engine/sfx.js');require('./scene.js');
const s=F.createScene(F.lastScene);
fs.writeFileSync(path.join(__dirname,'scratch/reference.wav'),Buffer.from(SFX.toWav(SFX.render(s.audioCues(),s.meta.renderDuration,{presets:s.sounds}))));

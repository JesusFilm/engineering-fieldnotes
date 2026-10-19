// Timing dry-run: prints scene duration and every sound cue (playback seconds) without rendering.
const path = require('path');
const F = require(path.join(__dirname, 'engine/flow-engine.js'));
require(path.join(__dirname, 'scene.js'));
const sc = F.createScene(F.lastScene);
console.log('scene duration', sc.meta.duration.toFixed(2), 's; playback', sc.meta.renderDuration.toFixed(2), 's at speed', sc.meta.speed);
for (const c of sc.audioCues()) console.log(c.t.toFixed(2).padStart(6), c.name, c.note || '');

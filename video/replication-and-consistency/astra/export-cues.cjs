const fs=require('node:fs');
const path=require('node:path');
const F=require('./engine/flow-engine.js');
require('./scene.js');
const scene=F.createScene(F.lastScene);
fs.writeFileSync(path.join(__dirname,'cues.json'),JSON.stringify(scene.audioCues(),null,2)+'\n');
console.log(`${scene.audioCues().length} cues over ${scene.meta.renderDuration} seconds`);

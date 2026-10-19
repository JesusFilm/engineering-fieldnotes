const fs=require('node:fs');
const F=require('./engine/flow-engine.js');require('./scene.js');
const sc=F.createScene(F.lastScene);
fs.writeFileSync(__dirname+'/cues.json',JSON.stringify(sc.audioCues(),null,2)+'\n');
fs.writeFileSync(__dirname+'/events.json',JSON.stringify(globalThis.ASTRA_EVENTS,null,2)+'\n');

const F=require('./engine/flow-engine.js');require('./scene.js');
const sc=F.createScene(F.lastScene);console.log(JSON.stringify(sc.audioCues()));

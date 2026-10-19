// Read the current local scene's audio schedule without a browser or ignored scratch dependencies.
const path = require('node:path');
const dir = path.resolve(process.argv[2]);
const engine = require(path.join(dir, 'engine/flow-engine.js'));
require(path.join(dir, 'scene.js'));
process.stdout.write(JSON.stringify(engine.createScene(engine.lastScene).audioCues()));

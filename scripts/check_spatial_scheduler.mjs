// Exercise the actual host scheduler: scene updates are allowed to invalidate.
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../public/spatial/shared/viewer.js',import.meta.url),'utf8');
const scheduler=source.slice(source.indexOf('let dirty='),source.indexOf('function resize()'));
const pending=new Map();
let serial=0,renders=0,updates=0;
const context=vm.createContext({
  document:{hidden:false},
  requestAnimationFrame(fn){pending.set(++serial,fn);return serial;},
  renderer:{render(){renders++;}},scene:{},camera:{},
  experience:{update(){updates++;vm.runInContext('invalidate()',context);return updates<30;}},
  showError(error){throw error;},
});
vm.runInContext(scheduler+'\ninvalidate();',context);
for(let frame=0;frame<32&&pending.size;frame++){
  const [id,fn]=pending.entries().next().value;pending.delete(id);fn(frame*16.67+1);
  assert(pending.size<=1,'An invalidating update scheduled duplicate animation frames');
  if(updates>=30)context.experience.update=()=>false;
}
assert.equal(pending.size,0,'Idle scene should stop requesting frames');
assert(renders>=30,'Final animated pose must be rendered');
context.document.hidden=true;
vm.runInContext('invalidate()',context);
assert.equal(pending.size,0,'Hidden scenes must not schedule rendering');
const listeners={};
let disposals=0;
context.window={addEventListener(name,fn){listeners[name]=fn;}};
context.cancelAnimationFrame=id=>pending.delete(id);
context.experience.dispose=()=>disposals++;
context.controls={dispose(){disposals++;}};
context.renderer.dispose=()=>disposals++;
const lifecycle=source.slice(source.indexOf("  window.addEventListener('pagehide'"),source.indexOf("  document.querySelector('#loading').hidden=true;stage.setAttribute"));
vm.runInContext(lifecycle,context);
listeners.pagehide({persisted:true});
assert.equal(disposals,0,'Back-forward cache entry must retain WebGL resources');
context.document.hidden=false;
listeners.pageshow({persisted:true});
assert.equal(pending.size,1,'Restoring cached viewer must request a frame');
listeners.pagehide({persisted:false});
assert.equal(disposals,3,'A real departure must dispose scene, controls and renderer');
assert.equal(pending.size,0,'Departure must cancel pending rendering');
console.log('Spatial scheduler: queue, final pose, idle, hidden and page lifecycle checks passed.');

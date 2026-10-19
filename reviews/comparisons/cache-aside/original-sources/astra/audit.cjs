const fs=require('node:fs');
const path=require('node:path');
const F=require('./engine/flow-engine.js');
require('./scene.js');
const def=F.lastScene;
const events=[];
const sc=F.createScene({...def,build(s){
  for(const name of ['set','packet','sfx']){
    const original=s[name];
    s[name]=(...args)=>{events.push({kind:name,args});return original(...args);};
  }
  def.build(s);
}});
const cues=sc.audioCues();
const at=t=>cues.some(c=>Math.abs(c.t-t)<0.00001);
const packets=events.filter(e=>e.kind==='packet').map(e=>e.args[0]);
for(const p of packets){if(!at(p.t)||!at(p.t+p.dur))throw Error('unsounded packet '+p.t);}
const semantic=events.filter(e=>e.kind==='set'&&['value','text'].includes(e.args[2]));
for(const e of semantic){if(!at(e.args[0]))throw Error('unsounded state '+JSON.stringify(e));}
const result={model:'gpt-6-astra',reasoning:'high',duration:sc.meta.renderDuration,fps:sc.meta.fps,cues,packets,semanticStates:semantic,allPacketDeparturesAndArrivalsCued:true,allSemanticStatesCued:true};
fs.writeFileSync(path.join(__dirname,'timing-audit.json'),JSON.stringify(result,null,2)+'\n');
console.log(`${packets.length} packets, ${semantic.length} semantic changes, ${cues.length} cues: synchronized.`);

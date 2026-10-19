const fs=require('node:fs');const path=require('node:path');
for(const v of ['baseline','astra','fable']){
 const root=path.resolve('video/cache-aside',v);const F=require(path.join(root,v==='baseline'?'runtime':'engine','flow-engine.js'));require(path.join(root,'scene.js'));
 const def=F.lastScene;const events=[];
 const sc=F.createScene({...def,build(s){for(const method of ['set','packet','sfx','pulse','ripple','fade']){const orig=s[method];s[method]=(...args)=>{events.push({method,args});return orig(...args)}}def.build(s)}});
 fs.writeFileSync(`reviews/comparisons/cache-aside/scratch/${v}-timeline.json`,JSON.stringify({meta:sc.meta,cues:sc.audioCues(),events},null,2));
}

import fs from 'node:fs';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
import {pathToFileURL} from 'node:url';
const vendor=pathToFileURL(process.cwd()+'/public/spatial/shared/vendor/');
registerHooks({resolve(specifier,context,next){
 if(specifier==='three')return {url:new URL('three.module.js',vendor).href,shortCircuit:true};
 return next(specifier,context);
}});
const THREE=await import(new URL('three.module.js',vendor));
const {GLTFLoader}=await import(new URL('addons/loaders/GLTFLoader.js',vendor));
const root=process.cwd();
for(const id of ['replication-and-consistency','canary-deployments']){
 for(const reducedMotion of [false,true]){
 const buf=fs.readFileSync(`${root}/public/spatial/${id}/scene.glb`);
 const {scene:model}=await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),'');
 const buttons=[];let caption='';let invalidates=0;
 const exp=(await import(`${root}/public/spatial/${id}/interaction.js`)).default({model,THREE,reducedMotion,caption:t=>caption=t,addAction:(s,fn)=>{const b={textContent:s,fn};buttons.push(b);return b;},onPick(){},invalidate(){invalidates++;}});
 assert.equal(buttons.length,2);assert.equal(exp.update(.01),false);
 const settle=()=>{for(let i=0;i<100;i++)exp.update(.05);assert.equal(exp.update(.05),false);};
 const n=s=>model.getObjectByName(s);
 if(id==='canary-deployments'){
   const check=(rate)=>{
    model.updateMatrixWorld(true);let volume=0;
    for(const g of ['v1_other','v1_export','v2_other','v2_export']){
     const o=n(g+'_Fail');const b=new THREE.Box3().setFromObject(o);const size=b.getSize(new THREE.Vector3());
     // Absolute signed triangle volume from actual transformed GLB vertices, not ideal footprints.
     const p=o.geometry.attributes.position;const ix=o.geometry.index;let v=0;
     for(let i=0;i<ix.count;i+=3){const a=new THREE.Vector3().fromBufferAttribute(p,ix.getX(i)).applyMatrix4(o.matrixWorld);const b=new THREE.Vector3().fromBufferAttribute(p,ix.getX(i+1)).applyMatrix4(o.matrixWorld);const c=new THREE.Vector3().fromBufferAttribute(p,ix.getX(i+2)).applyMatrix4(o.matrixWorld);v+=a.dot(b.cross(c))/6;}
     volume+=Math.abs(v);
     if(g==='v2_export')assert.ok(Math.abs(size.y/1.5-rate)<1e-6);
    }
    assert.ok(Math.abs(volume-.15)<1e-6,`volume ${volume}`);
   };
   check(.004);buttons[0].fn();settle();check(.04);buttons[1].fn();settle();check(.4);buttons[0].fn();settle();check(.04);buttons[1].fn();settle();check(.004);
   // Reverse order and interrupted input: final state must be both split.
   buttons[1].fn();exp.update(.12);buttons[0].fn();exp.update(.08);buttons[0].fn();exp.update(.08);buttons[0].fn();settle();check(.4);assert.match(caption,/40 of 100/);
   buttons[0].fn();exp.update(.1);exp.reset();settle();check(.004);
 }else{
   assert.equal(n('Display_v7').visible,true);
   buttons[1].fn();assert.equal(n('Display_v8').visible,true);
   buttons[0].fn();buttons[1].fn();assert.equal(n('Display_v8').visible,true);
   buttons[0].fn();assert.equal(n('Display_v7').visible,true);
   assert.equal(n('LogRecord').visible,true);exp.reset();assert.equal(n('Replica_v7').visible,true);
   buttons[0].fn();assert.equal(n('Display_v8').visible,true);assert.match(caption,/fresh replica/);
   exp.reset();assert.equal(n('Route_Replica').visible,true);
 }
 exp.dispose();console.log(id, 'reducedMotion='+reducedMotion,'PASS');
 }
}

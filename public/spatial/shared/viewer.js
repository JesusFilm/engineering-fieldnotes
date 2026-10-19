import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const stage=document.querySelector('#stage'),caption=document.querySelector('#caption');
const reset=document.querySelector('#reset'),fallback=document.querySelector('#fallback');
const concept=new URLSearchParams(location.search).get('concept');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let renderer,scene,camera,controls,experience,model,config;
let dirty=true,active=false,last=0,elapsed=0,frame=0,pick=null,disposed=false;
function invalidate(){if(disposed)return;dirty=true;if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function tick(now){
  frame=0;if(disposed||document.hidden)return;
  const dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;
  const wasActive=active;
  try{active=experience?.update?.(dt,elapsed)===true;}catch(error){showError(error);return;}
  if(dirty||active||wasActive){renderer.render(scene,camera);dirty=false;}
  // Scene updates may invalidate themselves. Keep one outstanding frame only.
  if(active&&!frame)frame=requestAnimationFrame(tick);
  if(!active)last=0;
}
function resize(){
  if(!renderer)return;
  const w=stage.clientWidth,h=stage.clientHeight;
  camera.aspect=w/h;
  const baseFov=config?.camera?.fov||38;
  const minAspect=config?.camera?.minAspect||1;
  camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(baseFov/2))/Math.min(1,camera.aspect/minAspect)));
  camera.updateProjectionMatrix();renderer.setSize(w,h);invalidate();
}
function view(position,target){camera.position.fromArray(position);controls.target.fromArray(target);controls.update();invalidate();}
function home(){view(config.camera?.position||[10,8,12],config.camera?.target||[0,1,0]);}
function showError(error){
  console.error('3D illustration:',error);document.querySelector('#loading').hidden=true;
  fallback.hidden=false;stage.setAttribute('aria-busy','false');
  document.querySelector('#fallback-description').textContent=config?.fallback||'Continue with the written guide or choose the video.';
  document.querySelector('#actions').replaceChildren();reset.disabled=true;
  if(frame)cancelAnimationFrame(frame);frame=0;disposed=true;
}
try{
  if(!concept||!/^[a-z0-9-]+$/.test(concept))throw Error('Unknown illustration');
  const base=`../${concept}/`;
  // URLs are relative to the document for fetch/loader and to this module for import.
  const response=await fetch(`./${concept}/scene.json`);
  if(!response.ok)throw Error('Illustration unavailable');config=await response.json();
  document.title=`${config.title} — Fieldnotes`;
  document.querySelector('h1').textContent=config.title;
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=1.4;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label',config.description||config.title);
  stage.prepend(renderer.domElement);
  scene=new THREE.Scene();scene.background=new THREE.Color('#f2f0e9');
  camera=new THREE.PerspectiveCamera(config.camera?.fov||38,1,.05,250);
  controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;
  controls.minDistance=3;controls.maxDistance=32;controls.maxPolarAngle=Math.PI*.92;
  controls.addEventListener('change',invalidate);
  scene.add(new THREE.HemisphereLight(0xfffdf5,0xb6b7ad,2.5));
  const key=new THREE.DirectionalLight(0xfffaf0,3);key.position.set(-6,12,8);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-10,right:10,top:10,bottom:-10});key.shadow.normalBias=.03;scene.add(key);
  const fill=new THREE.DirectionalLight(0xffffff,1);fill.position.set(7,5,-7);scene.add(fill);
  const asset=await new GLTFLoader().loadAsync(`./${concept}/scene.glb`);model=asset.scene;
  model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});scene.add(model);
  home();resize();
  let actions=0;
  const ctx={THREE,model,scene,camera,controls,reducedMotion,invalidate,view,
    caption(text){if(caption.textContent!==text)caption.textContent=text;},
    addAction(label,fn){
      if(++actions>2)throw Error('Illustrations allow at most two primary controls');
      const b=document.createElement('button');b.type='button';b.textContent=label;
      b.addEventListener('click',()=>{try{fn();invalidate();}catch(e){showError(e);}});
      document.querySelector('#actions').append(b);return b;
    },
    onPick(fn){pick=fn;}
  };
  caption.textContent=config.initialCaption||config.description;
  const module=await import(`${base}interaction.js`);experience=module.default(ctx)||{};
  reset.disabled=false;reset.onclick=()=>{try{experience.reset?.();home();invalidate();}catch(e){showError(e);}};
  let down=null;const raycaster=new THREE.Raycaster(),point=new THREE.Vector2();
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6){down=null;return;}down=null;
    if(!pick)return;const r=renderer.domElement.getBoundingClientRect();
    point.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
    raycaster.setFromCamera(point,camera);
    const visibleHits=raycaster.intersectObject(model,true).filter(hit=>{
      if(!hit.object.isMesh)return false;
      for(let o=hit.object;o;o=o.parent)if(!o.visible)return false;
      return true;
    });
    // An investigation must not let the pointer discover objects through solid walls.
    try{pick(visibleHits.slice(0,1));invalidate();}catch(error){showError(error);}
  });
  renderer.domElement.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();
    if(e.key==='Home'){home();return;}
    const offset=camera.position.clone().sub(controls.target),s=new THREE.Spherical().setFromVector3(offset);
    s.theta+=e.key==='ArrowLeft'?.12:e.key==='ArrowRight'?-.12:0;
    s.phi=THREE.MathUtils.clamp(s.phi+(e.key==='ArrowUp'?-.1:e.key==='ArrowDown'?.1:0),.1,Math.PI*.92);
    s.radius=THREE.MathUtils.clamp(s.radius*(['+','='].includes(e.key)?.9:e.key==='-'?1.1:1),3,32);
    camera.position.copy(new THREE.Vector3().setFromSpherical(s).add(controls.target));controls.update();invalidate();
  });
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();showError(Error('Graphics context lost'));});
  new ResizeObserver(resize).observe(stage);
  document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else invalidate();});
  window.addEventListener('pagehide',event=>{
    cancelAnimationFrame(frame);frame=0;last=0;
    if(event.persisted)return;
    disposed=true;experience.dispose?.();controls.dispose();renderer.dispose();
  });
  window.addEventListener('pageshow',event=>{if(event.persisted)invalidate();});
  document.querySelector('#loading').hidden=true;stage.setAttribute('aria-busy','false');invalidate();
}catch(error){showError(error);}

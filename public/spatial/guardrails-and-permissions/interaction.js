// Independent route inspection: instant counterfactuals, no choreographed walk.
export default function setup(ctx) {
  const {model, THREE} = ctx;
  const get = n => {const o=model.getObjectByName(n);if(!o)throw Error('Missing '+n);return o;};
  const agent=get('Agent'),lever=get('Lever'),barrier=get('Barrier');
  const home=agent.position.clone(), leverHome=lever.rotation.z;
  const locks=get('Locks'); locks.visible=true;
  const doors={Direct:[],Shell:[]};
  locks.traverse(o=>{if(o.name.startsWith('Lock_West'))doors.Direct.push(o);if(o.name.startsWith('Lock_North'))doors.Shell.push(o);});
  const routeNames=['Direct','Shell'];
  const paths=routeNames.map(n=>get('Path_'+n));
  const materials=[];
  paths.forEach(g=>g.traverse(o=>{if(o.isMesh){const original=o.material;o.material=original.clone();materials.push([o,original]);}}));
  let route=0,policy=0,inspected=false;
  const policies=['Guard only','Direct entrance protected','Both entrances protected'];
  const routeButton=ctx.addAction('Inspect direct route',()=>{if(inspected)route=1-route;inspected=true;apply();});
  const policyButton=ctx.addAction('Protect direct entrance',()=>{policy=(policy+1)%3;apply();});
  function apply(){
    const tag=routeNames[route];
    model.traverse(o=>{if(o.name.startsWith('Check_West_'))o.visible=policy>=1;if(o.name.startsWith('Check_North_'))o.visible=policy===2;});
    doors.Direct.forEach(o=>o.visible=policy>=1);
    doors.Shell.forEach(o=>o.visible=policy===2);
    // Model guard refusal separately from authorization: later trials allow the
    // proposal through the guard so the execution checks are actually exercised.
    barrier.rotation.x=policy===0?0:Math.PI/2;
    for(const [i,g] of paths.entries())g.traverse(o=>{if(o.isMesh)o.material.color.set(inspected&&i===route?'#d8952a':'#55514a');});
    policyButton.textContent=['Protect direct entrance','Protect both entrances','Use guard only'][policy];
    routeButton.textContent=inspected?'Inspect '+routeNames[1-route].toLowerCase()+' route':'Inspect direct route';
    lever.rotation.z=leverHome;
    if(!inspected){agent.position.copy(home);ctx.caption('Investigator: round token; deployer: square token — inspect the routes to production.');ctx.invalidate();return;}
    const guardDenied=route===0&&policy===0;
    const denied=guardDenied||(route===0?policy>=1:policy===2);
    // Explicit gap of 0.26/0.28 from execution doors: a pre-execution decision,
    // not a simulated collision. No read or write is sent past a denied check.
    const p=route===0?(guardDenied?[.4,0,-.3]:(denied?[1.05,0,-.3]:[2.3,0,-.3])):(denied?[3,0,-2.9]:[3,0,-1.05]);
    agent.position.fromArray(p);agent.rotation.y=route===0?Math.PI/2:0;
    if(!denied)lever.rotation.z=-leverHome;
    const outcome=guardDenied?'guard refuses this proposal; r41 unchanged':denied?'execution check denies investigator; r41 unchanged':'unchecked investigator credential reaches production; r42 written';
    ctx.caption(`New trial from r41 · ${policies[policy]} · ${tag.toLowerCase()}: ${outcome}; authorized deployer remains permitted.`);
    ctx.invalidate();
  }
  function reset(){route=0;policy=0;inspected=false;agent.rotation.y=Math.PI/2;apply();}
  // All essential comparisons use the two keyboard-accessible controls.
  ctx.onPick(()=>{});
  reset();
  return {update(){return false;},reset,dispose(){for(const [o,m]of materials){o.material.dispose();o.material=m;}}};
}

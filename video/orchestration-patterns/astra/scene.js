/* Authored independently by gpt-6-astra, high reasoning, 2026-10-19.
 * Illustrative fixed workflow. Green reports are not proof of correctness.
 * A changed snapshot clears both prior checks. Human approval is separate.
 */
FlowVideo.scene({
 meta: {title:'',duration:30,fps:30,speed:1},
 build(s) {
  const C=s.THEME;
  s.node('heading','label',{x:540,y:295,text:'Join the checks',size:82,weight:800,color:C.title,alpha:0});
  s.node('subheading','label',{x:540,y:397,text:'PARALLEL REVIEW',size:40,weight:600,color:C.fg,alpha:0});
  for(const id of ['heading','subheading']) {s.set(.25,id,'alpha',1,.45);s.set(28.6,id,'alpha',0,.7);}
  s.node('patch','box',{x:540,y:600,w:370,h:170,label:'PATCH A',sublabel:'frozen',labelSize:54,sublabelSize:42});
  s.node('api','box',{x:285,y:915,w:360,h:190,label:'API agent',sublabel:'WAIT',labelSize:50,sublabelSize:46});
  s.node('db','box',{x:795,y:915,w:360,h:190,label:'DB agent',sublabel:'WAIT',labelSize:50,sublabelSize:46});
  s.node('join','box',{x:540,y:1270,w:430,h:190,label:'JOIN',sublabel:'0 / 2',labelSize:56,sublabelSize:50});
  s.node('human','box',{x:540,y:1590,w:430,h:190,label:'Approver',sublabel:'WAIT',labelSize:54,sublabelSize:46});
  s.node('foot','label',{x:540,y:1795,text:'Illustrative workflow',size:38,color:C.mid});
  const routes={a:['patch.bottom',[285,735],'api.top'],b:['patch.bottom',[795,735],'db.top'],c:['api.bottom',[285,1120],'join.top'],d:['db.bottom',[795,1120],'join.top'],e:['join.bottom','human.top']};
  for(const [id,r] of Object.entries(routes))s.wire(id,r[0],r[r.length-1],{via:r.slice(1,-1)});
  s.fade(0,1,0); s.fade(.25,0,.55); s.fade(28.6,1,.7);
  s.sfx(.25,'recover',{gain:.25,note:'C4'});
  s.sfx(28.6,'poof',{gain:.35});
  const notes={patch:'C4',api:'C5',db:'E5',join:'G5',human:'C6'};
  function cue(t,id,preset,gain=.65){s.sfx(t,preset,{note:notes[id],gain,pan:s.panOf(id)});}
  function state(t,id,status,color,preset='arrive') {
   s.set(t,id,'sublabel',status,0);s.set(t,id,'subColor',color,0);s.set(t,id,'color',color,.15);s.pulse(t,id);cue(t,id,preset);
  }
  function move(t,route,color,id){s.packet({t,route:routes[route],dur:.8,color});cue(t,id,'send',.35);}
  function reset(t,rev){
   s.set(t,'patch','label','PATCH '+rev,0);s.set(t,'patch','color',C.accent,.15);s.pulse(t,'patch');
   for(const id of ['api','db','human','join']){s.set(t,id,'sublabel',id==='join'?'0 / 2':'WAIT',0);s.set(t,id,'color',C.mid,.15);s.set(t,id,'subColor',C.mid,0);}
   s.set(t,'wire:e','color',C.wire,.15);s.set(t,'wire:e','dashed',0,0);
   cue(t,'patch','poof');
  }
  function dispatch(t){
   move(t,'a',C.accent,'patch');move(t,'b',C.accent,'patch');
   state(t+.8,'api','CHECK',C.accent,'work');state(t+.8,'db','CHECK',C.accent,'work');
  }
  function result(t,id,ok,count){
   state(t,id,ok?'PASS':'FAIL',ok?C.ok:C.bad,ok?'chime':'crash');
   if(!ok)s.shake(t,id,15,.5);
   move(t+.45,id==='api'?'c':'d',ok?C.ok:C.bad,id);
   state(t+1.25,'join',ok?count+' / 2':'BLOCKED',ok?(count===2?C.ok:C.accent):C.bad,ok?'arrive':'thump');
   if(!ok){s.shake(t+1.25,'join',10,.4);s.set(t+1.25,'wire:e','color',C.bad,.15);s.set(t+1.25,'wire:e','dashed',1,0);}
  }
  function handoff(t){move(t,'e',C.ok,'join');state(t+.8,'human','REVIEW',C.accent);state(t+2,'human','APPROVED',C.ok,'deliver');}
  // Beat 1: normal path establishes the join and the separate human decision.
  dispatch(1.25);result(3.1,'api',true,1);result(4.4,'db',true,2);handoff(6.05);
  // Beats 2–3: a new change, one passing result, and a failing report.
  reset(9.4,'B');dispatch(10.1);result(12,'api',true,1);result(13.8,'db',false,1);
  // Comparative correction: a blocked approval must still notify the engineer.
  move(15.15,'e',C.bad,'join');state(15.95,'human','REPAIR',C.accent,'thump');
  // Beat 4: a repaired snapshot invalidates BOTH prior checks, visibly.
  reset(17.5,'C');s.set(17.5,'patch','sublabel','revised',0);dispatch(19.1);
  result(21,'api',true,1);result(22.4,'db',true,2);
  // Beat 5: only the fresh pair reaches the engineer. Hold, then clean loop.
  handoff(24.3);
 }
});

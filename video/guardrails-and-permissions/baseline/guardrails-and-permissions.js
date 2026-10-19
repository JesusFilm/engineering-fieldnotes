FlowVideo.scene({
 meta:{title:'Guardrails',subtitle:'PERMISSIONS',duration:24,fps:30,speed:1},
 build(s){
 const T=s.THEME;
 s.node('agent','box',{x:540,y:570,w:380,h:110,label:'Incident agent'});
 s.node('validation','box',{x:540,y:870,w:420,h:120,label:'Validation',sublabel:'tool-call schema'});
 s.node('gate','box',{x:540,y:1190,w:460,h:140,label:'Tool permissions',sublabel:'scope: metrics:read'});
 s.node('metrics','box',{x:270,y:1530,w:350,h:130,label:'Metrics',sublabel:'CPU 42%'});
 s.node('prod','box',{x:810,y:1530,w:350,h:130,label:'Production',sublabel:'version 7'});
 s.node('valid','badge',{x:850,y:870,text:'VALID',alpha:0,color:T.ok});
 s.node('decision','badge',{x:900,y:1190,text:'ALLOW',alpha:0,color:T.ok});
 s.node('result','badge',{x:270,y:1680,text:'CPU 42%',alpha:0,color:T.ok});
 s.node('unchanged','badge',{x:810,y:1680,text:'version 7',alpha:0,color:T.mid});
 s.wire('av','agent.bottom','validation.top');
 s.wire('vg','validation.bottom','gate.top');
 s.wire('gm','gate.bottom','metrics.top',{via:[[270,1380]]});
 s.wire('gp','gate.bottom','prod.top',{via:[[810,1380]]});
 const cue=(t,name,note,id,gain=.65)=>s.sfx(t,name,{note,pan:s.panOf(id),gain});
 const move=(t,label,route,color=T.fg)=>{s.packet({t,dur:.75,label,kind:'chip',route,color});cue(t,'send','C6','agent',.5);};
 const validate=t=>{s.set(t,'validation','color',T.ok,.1);s.set(t,'valid','alpha',1,.15);cue(t,'hit','E5','validation');};
 const decision=(t,allowed)=>{s.set(t,'gate','color',allowed?T.ok:T.bad,.1);s.set(t,'decision','text',allowed?'ALLOW':'DENY',0);s.set(t,'decision','color',allowed?T.ok:T.bad,0);s.set(t,'decision','alpha',1,.1);cue(t,allowed?'arrive':'thump',allowed?'G5':'C3','gate',allowed?.7:1);if(!allowed){s.shake(t,'gate',9,.4);s.ripple(t,'gate.left',T.bad,{mark:'x',r1:55});}};
 s.fade(0,1,0);s.fade(.25,0,.5);
 // Normal case: schema validation and independent authorization both pass.
 move(1,'metrics.read',['agent.bottom','validation.top']);validate(1.75);
 move(4,'metrics.read',['validation.bottom','gate.top']);decision(4.75,true);
 s.set(5,'wire:gm','color',T.ok,.2);
 move(6.5,'metrics.read',['gate.bottom',[270,1380],'metrics.top'],T.ok);
 s.set(7.25,'metrics','color',T.ok,.1);s.set(7.25,'result','alpha',1,.2);cue(7.25,'store','C5','metrics');
 move(8.2,'CPU 42%',['metrics.top',[110,1360],[110,570],'agent.left'],T.ok);
 s.pulse(8.95,'agent',T.ok);cue(8.95,'deliver','C5','agent');
 // Reset outcome badges before the second independent request.
 for(const id of ['valid','decision','result'])s.set(11,id,'alpha',0,.2);
 for(const id of ['validation','gate','metrics'])s.set(11,id,'color',T.mid,.2);
 s.set(11,'wire:gm','color',T.wire,.2);
 move(11.5,'deploy v8',['agent.bottom','validation.top'],T.accent);validate(12.25);
 move(14.5,'deploy v8',['validation.bottom','gate.top'],T.accent);decision(15.25,false);
 s.set(15.25,'wire:gp','alpha',.25,.2);s.set(15.25,'prod','alpha',.65,.2);
 s.set(15.25,'unchanged','alpha',1,.2);
 move(17.5,'DENIED',['gate.left',[100,1190],[100,570],'agent.left'],T.bad);
 s.pulse(18.25,'agent',T.bad);cue(18.25,'deliver','C3','agent');
 // Final comparison: valid request, denied execution, unchanged target.
 s.pulse(20.5,'prod',T.mid);cue(20.5,'ack','G4','prod',.5);
 s.fade(22.5,1,.7);
 }
});

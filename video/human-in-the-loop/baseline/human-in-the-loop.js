FlowVideo.scene({
 meta:{title:'Human approval',subtitle:'CHECKPOINT / REVALIDATE',duration:26,fps:30,speed:1},
 build(s){
 const T=s.THEME;
 s.node('agent','box',{x:260,y:590,w:300,h:120,label:'Agent',sublabel:'migration A'});
 s.node('human','box',{x:820,y:590,w:300,h:120,label:'Reviewer',sublabel:'prod / A / v7'});
 s.node('save','store',{x:540,y:900,w:430,rows:2,label:'Durable checkpoint'});
 s.node('gate','box',{x:540,y:1220,w:430,h:130,label:'Resume check',sublabel:'expected = actual'});
 s.node('db','db',{x:540,y:1530,w:250,h:160,label:'Production',sublabel:'schema v7'});
 s.node('result','label',{x:540,y:1770,text:'',size:38,mono:true,color:T.ok});
 s.wire('as','agent.bottom','save.top',{via:[[260,735],[540,735]]});
 s.wire('hs','save.top','human.bottom',{via:[[540,735],[820,735]]});
 const down=['save.bottom',[540,995],[250,995],[250,1100],[540,1100],'gate.top'];
 s.wire('sg','save.bottom','gate.top',{via:[[540,995],[250,995],[250,1100],[540,1100]]}); s.wire('gd','gate.bottom','db.top');
 s.set(0,'save','row0Text','—',0);s.set(0,'save','row1Text','—',0);
 s.fade(0,1,0);s.fade(0.3,0,0.6);
 const set=(t,id,k,v)=>s.set(t,id,k,v,0);
 const cue=(t,name,id,note,gain=0.65)=>s.sfx(t,name,{note,gain,pan:s.panOf(id)});
 function move(t,label,route,color=T.fg){s.packet({t,dur:0.7,kind:'chip',label,route,color});cue(t,'send',route[0].split('.')[0],'C6',0.4);}
 function checkpoint(t,id,v){
 move(t,id+' / prod / v'+v,['agent.bottom',[260,735],[540,735],'save.top']);
 set(t+0.7,'save','row0Text',id+' / prod / v'+v);set(t+0.7,'save','row0Color',T.accent);
 set(t+0.7,'save','row1Text','PENDING');set(t+0.7,'save','row1Color',T.accent);
 s.set(t+0.7,'save','row0Fill',1,0.2);s.set(t+0.7,'agent','alpha',0.3,0.2);
 cue(t+0.7,'store','save','C5');s.pulse(t+0.7,'save',T.accent);
 move(t+1.1,id+' / prod / v'+v,['save.top',[540,735],[820,735],'human.bottom'],T.accent);
 s.pulse(t+1.8,'human',T.accent);cue(t+1.8,'arrive','human','E5');
 }
 function approve(t,id){
 s.pulse(t,'human',T.ok);cue(t,'chime','human','E5');
 move(t+0.25,'APPROVE '+id,['human.bottom',[820,735],[540,735],'save.top'],T.ok);
 set(t+0.95,'save','row1Text','APPROVED '+id);set(t+0.95,'save','row1Color',T.ok);
 cue(t+0.95,'store','save','C5');s.pulse(t+0.95,'save',T.ok);
 }
 checkpoint(1,'A',7);
 approve(4.8,'A');
 move(6.4,'A / v7',down,T.ok);
 set(7.1,'gate','sublabel','v7 = v7');s.pulse(7.1,'gate',T.ok);cue(7.1,'hit','gate','G5');
 move(7.8,'APPLY A',['gate.bottom','db.top'],T.ok);
 set(8.5,'db','sublabel','schema v8');s.pulse(8.5,'db',T.ok);cue(8.5,'store','db','G5');
 set(8.5,'result','text','A  ✓  APPLIED');
 // A second proposal is saved against v8. Production changes during its review.
 s.set(11,'agent','alpha',1,0.25);set(11,'agent','sublabel','migration B');set(11,'human','sublabel','prod / B / v8');
 set(11,'result','text','');set(11,'gate','sublabel','expected = actual');cue(11,'arrive','agent','C5');s.pulse(11,'agent');
 checkpoint(11.4,'B',8);
 set(14.1,'db','sublabel','schema v9');s.pulse(14.1,'db',T.accent);cue(14.1,'work','db','G4',1);
 s.ripple(14.1,'db.right',T.accent,{r1:60});
 approve(16,'B');
 move(17.6,'B / v8',down,T.ok);
 set(18.3,'gate','sublabel','v8 ≠ v9');set(18.3,'gate','color',T.bad);set(18.3,'gate','subColor',T.bad);
 s.shake(18.3,'gate',10);s.ripple(18.3,'gate.right',T.bad,{mark:'x',r1:70});cue(18.3,'thump','gate','C3',1);
 set(18.3,'wire:gd','color',T.bad);set(18.3,'wire:gd','dashed',1);set(18.3,'result','text','B  ×  BLOCKED');set(18.3,'result','color',T.bad);
 // Return to the approval boundary; no APPLY packet reaches production.
 move(20.4,'STALE',[...down].reverse(),T.bad);
 set(21.1,'save','row1Text','REVIEW REQUIRED');set(21.1,'save','row1Color',T.accent);cue(21.1,'miss','save','C4');s.pulse(21.1,'save',T.accent);
 s.fade(24.5,1,0.7);
 }
});

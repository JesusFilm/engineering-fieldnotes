// Verified progress survives replacement of the model session.
FlowVideo.scene({meta:{title:'',subtitle:'',duration:26,fps:30,speed:1},build(s){
 const T=s.THEME;
 s.node('agent','box',{x:540,y:540,w:330,h:140,label:'Session 1',labelSize:44});
 s.node('runtime','box',{x:540,y:850,w:330,h:140,label:'Harness',labelSize:44});
 s.node('workspace','box',{x:270,y:1170,w:330,h:140,label:'Workspace',labelSize:40,sublabel:'A: pending'});
 s.node('checks','box',{x:810,y:1170,w:300,h:140,label:'Tests',labelSize:44,sublabel:'—'});
 s.node('record','store',{x:540,y:1540,w:430,rows:2,label:'Progress record',row0Text:'A: pending',row1Text:'B: pending',row0Color:T.mid,row1Color:T.mid});
 s.wire('ar','agent.bottom','runtime.top');
 s.wire('rw','runtime.left','workspace.top',{via:[[270,850]]});
 s.wire('wc','workspace.right','checks.left');
 s.wire('cp','checks.bottom','record.right',{via:[[810,1540]]});
 s.wire('restore','record.left','runtime.left',{via:[[75,1540],[75,850]]});
 s.set(0,'wire:restore','alpha',.25,0);
 s.fade(0,1,0);s.fade(.1,0,.4);s.fade(25,1,.6);
 function move(t,route,label,note,color=T.fg){
  s.packet({t,route,kind:'chip',label,dur:.7,color});s.sfx(t,'send',{note,gain:.5,pan:s.panOf(route[0])});
  const id=route[route.length-1].split('.')[0];s.pulse(t+.7,id,color);s.sfx(t+.7,'arrive',{note,pan:s.panOf(route[route.length-1]),gain:.7});
 }
 function work(t,feature,row){
  s.set(t,'agent','color',T.accent,.15);
  s.set(t,'checks','sublabel','—',0);s.set(t,'checks','color',T.mid,.1);
  move(t,['agent.bottom','runtime.top'],feature,'C5');
  move(t+1,['runtime.left',[270,850],'workspace.top'],feature,'E5');
  s.set(t+1.7,'workspace','sublabel',feature+': changed',0);s.set(t+1.7,'workspace','color',T.accent,.15);
  move(t+2.5,['workspace.right','checks.left'],feature,'G5');
  s.set(t+3.2,'checks','sublabel','RUN',0);s.set(t+3.2,'checks','color',T.accent,.15);
  s.sfx(t+3.5,'work',{note:'G4',pan:.5});
  s.set(t+4,'checks','sublabel','PASS',0);s.set(t+4,'checks','color',T.ok,.1);s.sfx(t+4,'hit',{note:'G5',pan:.5});
  move(t+4.7,['checks.bottom',[810,1540],'record.right'],'PASS','G5',T.ok);
  s.set(t+5.4,'record','row'+row+'Text',feature+': verified',0);s.set(t+5.4,'record','row'+row+'Color',T.ok,.15);s.set(t+5.4,'record','row'+row+'Fill',1,.2);s.sfx(t+5.4,'store',{note:'C5'});
  s.set(t+5.4,'workspace','color',T.mid,.2);s.set(t+5.4,'agent','color',T.mid,.2);
 }
 work(1,'A',0);
 // The durable workspace and record stay visible when the old session disappears.
 s.set(9,'agent','color',T.bad,0);s.shake(9,'agent',10,.45);s.sfx(9,'thump',{gain:.9});
 s.set(9.5,'agent','alpha',0,.4);s.set(9.5,'wire:ar','alpha',.2,.4);
 s.set(9.5,'checks','color',T.mid,.2);s.set(9.5,'checks','sublabel','—',0);
 s.set(11,'agent','label','Session 2',0);s.set(11,'agent','color',T.mid,0);s.set(11,'agent','alpha',1,.5);s.sfx(11,'recover',{note:'C5',gain:.65});
 s.set(12,'wire:restore','alpha',1,.15);
 move(12,['record.left',[75,1540],[75,850],'runtime.left'],'A ✓','E5',T.ok);
 s.set(13,'wire:ar','alpha',1,.15);move(13,['runtime.top','agent.bottom'],'B: pending','C5');
 // Runtime startup smoke check validates the recovered workspace before new edits.
 move(14,['runtime.left',[270,850],'workspace.top'],'INIT','E5');
 move(15,['workspace.right','checks.left'],'SMOKE','G5');
 s.set(15.7,'checks','sublabel','PASS',0);s.set(15.7,'checks','color',T.ok,.1);s.sfx(15.7,'hit',{note:'G5',pan:.5});
 s.set(16.2,'wire:restore','alpha',.25,.2);
 work(17,'B',1);
 // Resolved state holds 2.6 seconds before a matched blank boundary.
}});

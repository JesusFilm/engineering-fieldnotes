FlowVideo.scene({
 meta:{title:'Agent evals',subtitle:'STATE GRADER',duration:26,fps:30,speed:1,fullFrameFade:true},
 build(s){
  const C=s.THEME;
  s.node('trial','label',{x:540,y:510,text:'TRIAL 1',size:36,color:C.fg});
  s.node('task','box',{x:540,y:635,w:440,h:130,label:'Task fixture',sublabel:'close #42',labelSize:42});
  s.node('agent','box',{x:540,y:880,w:440,h:130,label:'Agent + harness',sublabel:'running',labelSize:40});
  s.node('claim','box',{x:275,y:1170,w:390,h:150,label:'Final message',sublabel:'—',labelSize:38});
  s.node('state','box',{x:805,y:1170,w:390,h:150,label:'Ticket #42',sublabel:'OPEN',labelSize:40});
  s.node('grader','box',{x:805,y:1460,w:390,h:150,label:'State grader',sublabel:'#42 == CLOSED',labelSize:40});
  s.node('result','badge',{x:805,y:1650,text:'',color:C.mid});
  s.node('past','badge',{x:275,y:1650,text:'',color:C.ok});
  s.wire('task-agent','task.bottom','agent.top');
  s.wire('claim','agent.bottom','claim.top',{via:[[540,1020],[275,1020]]});
  s.wire('write','agent.bottom','state.top',{via:[[540,1020],[805,1020]]});
  s.wire('read','state.bottom','grader.top');
  function fx(t,name,id,note,gain=.65){s.sfx(t,name,{note,gain,pan:s.panOf(id)});}
  function move(t,route,label,color,note){s.packet({t,route,kind:'chip',label,color,dur:.65});fx(t,'send',route[0],note,.4);}
  function trial(t,success){
   move(t,['task.bottom','agent.top'],'#42',C.accent,'C6');
   s.pulse(t+.65,'agent',C.accent);fx(t+.65,'arrive','agent','C5');
   move(t+1.35,['agent.bottom',[540,1020],[805,1020],'state.top'],'close',C.accent,'C6');
   if(success){
    s.set(t+2,'state','sublabel','CLOSED',0);s.set(t+2,'state','color',C.ok,.2);s.set(t+2,'state','subColor',C.ok,.2);
    s.ripple(t+2,'state',C.ok,{r0:80,r1:110,dur:.5});fx(t+2,'store','state','E5');
   }else{
    s.shake(t+2,'state',8,.4);s.pulse(t+2,'state',C.bad);fx(t+2,'thump','state','E3',.85);
   }
   move(t+2.8,['agent.bottom',[540,1020],[275,1020],'claim.top'],'Done',C.fg,'C6');
   s.set(t+3.45,'claim','sublabel','Done',0);s.set(t+3.45,'claim','color',C.fg,.2);
   s.set(t+3.45,'agent','sublabel','finished',0);fx(t+3.45,'arrive','claim','C5');
   move(t+5.5,['state.bottom','grader.top'],success?'CLOSED':'OPEN',success?C.ok:C.bad,'E6');
   s.pulse(t+6.15,'grader',C.accent);fx(t+6.15,'arrive','grader','G5');
   const color=success?C.ok:C.bad;
   s.set(t+6.8,'grader','color',color,.2);s.set(t+6.8,'result','text',success?'PASS':'FAIL',0);s.set(t+6.8,'result','color',color,0);
   s.set(t+6.8,'result','scale',.1,0);s.set(t+6.8,'result','scale',1,.4,'back');
   fx(t+6.8,success?'chime':'miss','grader',success?'G5':'G3',success?.65:1);
   s.ripple(t+6.8,[805,1565],color,{mark:success?'check':'x',r0:12,r1:36,dur:.6});
  }
  s.fade(0,1,0);s.fade(.4,0,.5);
  trial(1.2,true);
  // Restore the same independent test fixture before trial two.
  s.set(11,'past','text','1: PASS',0);s.set(11,'trial','text','TRIAL 2',0);
  for(const id of ['claim','state','grader'])s.set(11,id,'color',C.mid,.25);
  s.set(11,'state','sublabel','OPEN',0);s.set(11,'state','subColor',C.mid,.2);
  s.set(11,'claim','sublabel','—',0);s.set(11,'result','text','',0);s.set(11,'agent','sublabel','running',0);
  s.pulse(11,'task',C.info);fx(11,'recover','task','C5');
  trial(13,false);
  s.set(21.6,'result','text','2: FAIL',0);fx(21.6,'ack','result','G3',.45);
  s.fade(24,1,.6);
 }
});

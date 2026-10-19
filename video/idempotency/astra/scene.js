// Authored independently by gpt-6-astra, high reasoning, 2026-10-19.
// Illustrative in-house ticket service: one database transaction owns ticket + key.
// No other variant scene was inspected. Times are seconds at 30 fps.
FlowVideo.scene({
  meta:{title:'Retry the intent',subtitle:'IDEMPOTENCY',duration:30,fps:30,speed:1},
  build(s){
    const C=s.THEME;
    const change=(t,id,prop,value)=>s.set(t,id,prop,value,0);
    const cue=(t,name,note='E5',gain=.6,at=[540,960])=>s.sfx(t,name,{note,gain,pan:s.panOf(at)});
    const send=(t,route,label,color=C.accent,dur=.8)=>{
      s.packet({t,route,label,kind:'chip',color,dur});cue(t,'send','C6',.55,route[0]);
    };
    s.node('agent','panel',{x:540,y:610,w:780,h:210,label:'Release agent',value:'key k7 · v1',detail:'attempt 1',color:C.fg});
    s.node('tool','panel',{x:540,y:1000,w:780,h:190,label:'Ticket tool',value:'READY',color:C.mid});
    s.node('commit','frame',{x:540,y:1410,w:930,h:420,label:'ONE DATABASE',color:C.mid});
    s.node('record','panel',{x:310,y:1440,w:390,h:230,label:'Saved key',value:'—',detail:'',color:C.dim});
    s.node('ticket','panel',{x:770,y:1440,w:390,h:230,label:'Release ticket',value:'—',detail:'',color:C.dim});
    s.node('count','label',{x:540,y:1720,size:64,weight:700,text:'0 tickets',color:C.mid});
    s.node('status','label',{x:220,y:820,size:48,weight:700,text:'',color:C.bad});
    s.wire('request',[390,721],[390,899]);
    s.wire('response',[690,899],[690,721]);
    s.wire('write',[540,1101],[540,1200]);
    s.fade(0,1,0);s.fade(.3,0,.5);cue(.3,'ack','C5',.3);
    // 1. Normal work: stable logical identity, one atomic commit.
    send(1.5,[[390,721],[390,899]],'k7 · v1');
    change(2.3,'tool','value','CREATE');change(2.3,'tool','color',C.accent);cue(2.3,'arrive','E5');
    send(3.1,[[540,1101],[540,1190]],'WRITE',C.accent,.7);
    change(3.8,'record','value','k7 → #47');change(3.8,'record','detail','v1');change(3.8,'record','color',C.ok);
    change(3.8,'ticket','value','#47');change(3.8,'ticket','detail','v1');change(3.8,'ticket','color',C.ok);
    change(3.8,'commit','label','COMMITTED');change(3.8,'commit','color',C.ok);change(3.8,'count','text','1 ticket');change(3.8,'count','color',C.ok);
    s.pulse(3.8,'record');s.pulse(3.8,'ticket');cue(3.8,'store','G5',.7);
    change(5.7,'tool','value','#47');change(5.7,'tool','color',C.ok);cue(5.7,'ack','E5',.35);
    // 2. The return packet is lost; durable work remains visible.
    send(6.2,[[690,899],[690,810]],'#47',C.ok,.7);
    change(6.9,'status','text','REPLY LOST');s.ripple(6.9,[690,810],C.bad,{r1:80,mark:'x'});
    change(6.9,'agent','detail','outcome unknown');change(6.9,'agent','color',C.accent);s.shake(6.9,'agent',8);cue(6.9,'crash','C3',.7);
    // 3. A second attempt retains both key and payload; no second write.
    change(9.8,'agent','detail','attempt 2');change(9.8,'status','text','RETRY');change(9.8,'status','color',C.accent);cue(9.8,'clock','C5',.5);
    change(11.2,'status','text','');send(11.2,[[390,721],[390,899]],'k7 · v1');
    change(12,'tool','value','LOOKUP');change(12,'tool','color',C.accent);cue(12,'arrive','E5');
    send(12.8,[[390,1101],[310,1190],[310,1319]],'k7',C.accent,.8);
    s.pulse(13.6,'record');cue(13.6,'hit','G5',.7,'record');
    send(14.4,[[310,1319],[310,1190],[390,1101]],'#47',C.ok,.8);
    change(15.2,'tool','value','REPLAY #47');change(15.2,'tool','color',C.ok);cue(15.2,'arrive','E5');
    send(16,[[690,899],[690,721]],'#47',C.ok,.8);
    change(16.8,'agent','detail','received #47');change(16.8,'agent','color',C.ok);s.pulse(16.8,'agent');cue(16.8,'deliver','C6',.65);
    // 4. Changed intent is not the same operation: reject key reuse.
    change(19,'agent','value','key k7 · v2');change(19,'agent','detail','changed payload');change(19,'agent','color',C.accent);s.pulse(19,'agent');cue(19,'clock','C5',.6);
    send(20,[[390,721],[390,899]],'k7 · v2');
    change(20.8,'tool','value','COMPARE');change(20.8,'tool','color',C.accent);cue(20.8,'arrive','E5');
    s.pulse(21.6,'record');change(21.6,'tool','value','MISMATCH');change(21.6,'tool','color',C.bad);s.shake(21.6,'tool',10);cue(21.6,'thump','C3',.8);
    send(22.5,[[690,899],[690,721]],'REJECT',C.bad,.8);
    change(23.3,'agent','detail','rejected');change(23.3,'agent','color',C.bad);cue(23.3,'thump','C4',.6);
    // 5. Resolution: rejected input never overwrites the committed ticket.
    s.set(25,'agent','alpha',.35,.4);s.set(25,'tool','alpha',.35,.4);
    change(25,'commit','label','UNCHANGED');s.pulse(25,'ticket');cue(25,'chime','G5',.65,'ticket');
    s.set(25,'count','scale',1.12,.2,'out');s.set(25.2,'count','scale',1,.3,'out');
    s.fade(28.7,1,.6);cue(28.7,'poof','C4',.25);
  }
});

// Independent scene by gpt-6-astra, high reasoning. No other variant source consulted.
// Toy dispatcher: two equal workers, one execution slot each, one local waiting slot.
FlowVideo.scene({
  meta: {title:'Unequal work', subtitle:'LOAD BALANCING', titleSize:98, subtitleSize:44,
    duration:28, fps:30, speed:1, fadeAll:true},
  build(s) {
    const T=s.THEME;
    s.node('caller','box',{x:540,y:580,w:520,h:110,label:'AGENT TOOL CALLS',labelSize:44});
    s.node('router','box',{x:540,y:850,w:620,h:140,label:'ROUND ROBIN',labelSize:48,ports:2,portSpan:400,pointer:0});
    s.node('A','workstation',{x:290,y:1390,w:350,h:300,label:'Worker A'});
    s.node('B','workstation',{x:790,y:1390,w:350,h:300,label:'Worker B'});
    for(const id of ['A','B']) s.node(id+'count','label',{x:id==='A'?290:790,y:1605,text:'0 assigned',size:46});
    s.node('queue','box',{x:290,y:1120,w:300,h:90,label:'Q4 WAIT',labelSize:44,color:T.accent,alpha:0});
    s.node('limits','label',{x:540,y:1740,text:'ILLUSTRATIVE · 1 SLOT / WORKER',size:40});
    s.wire('in','caller.bottom','router.top');
    s.wire('A','router.port0','A.top',{via:[[290,1030]]});
    s.wire('B','router.port1','B.top',{via:[[790,1030]]});
    const pitch={A:'C5',B:'G5'};
    function sound(t,name,id,gain=1) { s.sfx(t,name,{note:pitch[id]||'E5',pan:id?s.panOf(id):0,gain}); }
    function active(t,id,task,end) {
      s.set(t,id,'active','1 running',0); s.set(t,id,'task',task,0); s.set(t,id,'color',T.accent,0);
      s.set(t,id,'progress',0.02,0); s.set(t,id,'progress',1,end-t,'linear');
      sound(t,'arrive',id); s.ripple(t,[id==='A'?290:790,1200],T.accent,{r1:28});
    }
    function done(t,id) {
      s.set(t,id,'active','0 running',0); s.set(t,id,'task','DONE',0); s.set(t,id,'color',T.ok,0);
      s.set(t,id,'progress',0,0); sound(t,'deliver',id,0.8);
      s.ripple(t,[id==='A'?290:790,1200],T.ok,{r1:28,mark:'check'});
      s.set(t+0.65,id,'task','IDLE',0); // same completion transition, not a new outcome
    }
    function request(t,id,task,count,end,queued=false) {
      s.packet({t,route:['caller.bottom','router.top'],dur:0.5,kind:'chip',label:task});
      sound(t,'send',null,0.8);
      s.set(t+0.5,'router','pointer',id==='A'?0:1,0.15); sound(t+0.5,'ack',id,0.8);
      s.set(t+0.5,'router','port'+(id==='A'?0:1),T.accent,0);
      s.set(t+0.5,'router','port'+(id==='A'?1:0),T.dim,0);
      s.packet({t:t+0.7,route:['router.port'+(id==='A'?0:1),[id==='A'?290:790,1030],queued?'queue.top':id+'.top'],dur:0.65,kind:'chip',label:task,color:T.accent});
      sound(t+0.7,'send',id,0.65);
      const land=t+1.35;
      s.set(land,id+'count','text',count+' assigned',0);
      if(queued) {
        s.set(land,'queue','alpha',1,0); s.shake(land,'queue',9); sound(land,'thump',id,1.25);
        s.set(land,'wire:A','color',T.accent,0);
      } else {active(land,id,task,end); done(end,id);}
    }
    s.fade(0,1,0); s.fade(0.3,0,0.55); sound(0.3,'ack',null,0.5);
    // 1. Normal: two short calls go to different workers.
    request(1.0,'A','Q1',1,3.25);
    request(2.6,'B','Q2',1,4.9);
    // 2. Equal counts, unequal occupancy. L1 is the expensive call.
    request(5.5,'A','L1',2,22.0);
    request(7.2,'B','Q3',2,9.8);
    // 3. Rotation selects the busy worker; Q4 waits while B is idle.
    request(10.5,'A','Q4',3,0,true);
    // 4. Policy changes for NEW calls. Existing queued work is not migrated.
    s.set(14.25,'router','label','LEAST REQUEST',0); s.pulse(14.25,'router',T.ok);
    sound(14.25,'recover',null,0.8);
    s.set(14.25,'B','color',T.ok,0); s.ripple(14.25,[790,1200],T.ok,{r1:28});
    request(15.0,'B','Q5',3,18.0);
    // A second consecutive B assignment makes the contrast with rotation observable.
    request(18.45,'B','Q6',4,20.9);
    // 5. The old queue only progresses after its original worker finishes L1.
    s.set(22.35,'queue','alpha',0,0);
    s.packet({t:22.35,route:['queue.bottom','A.top'],dur:0.5,kind:'chip',label:'Q4',color:T.accent});
    sound(22.35,'send','A'); active(22.85,'A','Q4',24.5); done(24.5,'A');
    s.set(24.5,'wire:A','color',T.wire,0);
    // Final resolved hold, then full-frame black for an exact decoded loop seam.
    s.fade(26.4,1,0.6); sound(26.4,'poof',null,0.35);
  }
});

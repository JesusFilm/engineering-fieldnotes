// Independent Sol cut. Reproduction and source evidence: beat-sheet.md.
// Task letters and limits are an illustrative application policy, not broker guarantees.
FlowVideo.scene({
  meta: { title: 'Bound the backlog', titleSize: 88,
    subtitle: 'QUEUES + BACKPRESSURE', duration: 30, fps: 30, speed: 1 },
  build(s) {
    const C=s.THEME;
    s.node('source','box',{x:540,y:580,w:470,h:144,label:'Task intake',labelSize:48,sublabel:'READY',subSize:36});
    s.node('gate','box',{x:540,y:825,w:510,h:112,label:'INTAKE · OPEN',labelSize:44,color:C.ok});
    s.node('queue','cells',{x:540,y:1110,count:3,label:'WAITING  0 / 3',color:C.accent});
    s.node('runner','box',{x:540,y:1480,w:620,h:240,label:'Agent runner',labelSize:48,sublabel:'IDLE',subSize:44});
    s.node('progress','bar',{x:540,y:1565,w:480,h:12,seg0:0,seg0Color:C.accent});
    s.node('active','label',{x:540,y:1660,size:44,text:'ACTIVE  0 / 1',color:C.fg});
    s.node('phase','label',{x:540,y:1780,size:42,weight:700,text:'NORMAL',color:C.mid});
    s.node('limit','label',{x:540,y:465,size:34,text:'ILLUSTRATIVE LIMITS',color:C.mid});
    s.wire('in','source.bottom','gate.top');
    s.wire('out','gate.bottom',[870,1110],{via:[[540,935],[870,935]]});
    s.wire('run',[370,1170],[540,1350],{via:[[370,1260],[540,1260]]});
    s.wire('ack',[860,1480],[805,1110],{via:[[950,1480],[950,1110]],color:C.dim});
    s.wire('return',[280,825],[300,580],{via:[[150,825],[150,580]],color:C.dim});
    // Blank title card at both ends; the stage fades to the same pixels.
    s.fade(0,1,0);s.fade(0.6,0,0.7);s.sfx(0.6,'recover',{gain:0.3,note:'C4'});
    const label=(t,id,prop,value)=>s.set(t,id,prop,value,0);
    function phase(t,text,color=C.mid){label(t,'phase','text',text);s.set(t,'phase','color',color,0);}
    function packet(t,route,task,color=C.fg,dur=0.65,preset='send'){
      s.packet({t,route,dur,kind:'chip',label:task,color});
      s.sfx(t,preset,{gain:0.7,note:color===C.bad?'C3':'C6',pan:s.panOf(route[0])});
    }
    let waiting=[];
    function queue(t,list){
      waiting=[...list];
      for(let i=0;i<3;i++) label(t,'queue','cell'+i,list[i]||'');
      label(t,'queue','label','WAITING  '+list.length+' / 3');
      s.sfx(t,'store',{gain:0.65,note:'E5'});
    }
    function admit(t,task,list){
      packet(t,['source.bottom','gate.top'],task);
      s.pulse(t+0.65,'gate',C.ok,0.25);s.sfx(t+0.65,'ack',{gain:0.8,note:'E5'});
      const cellX=370+(list.length-1)*170;
      packet(t+0.65,['gate.bottom',[540,935],[870,935],[870,1110],[cellX,1110]],task,C.accent,0.65);
      queue(t+1.3,list);
    }
    function start(t,task,remaining,done){
      queue(t,remaining);
      packet(t,[[370,1170],[370,1260],[540,1260],[540,1350]],task,C.accent,0.75);
      const at=t+0.75;
      label(at,'runner','sublabel',task+' · RUNNING');
      label(at,'active','text','ACTIVE  1 / 1');
      s.set(at,'runner','color',C.accent,0.15);
      s.set(at,'runner','subColor',C.accent,0);
      s.set(at,'progress','seg0',0,0);s.set(at,'progress','seg0',1,done-at,'linear');
      s.sfx(at,'arrive',{note:'G4',gain:0.9});
      for(let tick=at+0.7;tick<Math.min(done-0.3,28);tick+=0.9){
        s.sfx(tick,'work',{gain:0.55,note:'G3'});s.pulse(tick,'runner',undefined,0.18);
      }
    }
    function complete(t,task){
      label(t,'runner','sublabel',task+' · DONE');
      // Executing work ends now; delivery credit remains held until ACK returns.
      label(t,'active','text','ACTIVE  0 / 1');
      s.set(t,'runner','subColor',C.ok,0);s.set(t,'runner','color',C.ok,0.15);
      s.set(t,'progress','seg0Color',C.ok,0);s.sfx(t,'chime',{note:'G5',gain:0.8});
      packet(t+0.35,[[860,1480],[950,1480],[950,1110],[805,1110]],'ACK',C.ok,0.8,'ack');
      s.ripple(t+1.15,[805,1110],C.ok,{r1:50});s.sfx(t+1.15,'arrive',{note:'E5',gain:0.6,pan:0.4});
      label(t+1.15,'active','text','ACTIVE  0 / 1');
      label(t+1.15,'runner','sublabel','IDLE');s.set(t+1.15,'runner','subColor',C.mid,0);
      s.set(t+1.15,'runner','color',C.mid,0.15);s.set(t+1.15,'progress','seg0',0,0);
    }
    // 1. Normal: one accepted task, processed and then acknowledged.
    admit(1.5,'A',['A']);start(3.1,'A',[],5.5);complete(5.5,'A');
    // 2. A slower task holds the only delivery credit; waiting work accumulates.
    phase(7.4,'BURST',C.accent);s.sfx(7.4,'clock',{gain:0.6});
    s.set(7.4,'progress','seg0Color',C.accent,0);
    admit(7.6,'B',['B']);start(9.05,'B',[],21);
    admit(10.1,'C',['C']);admit(11.9,'D',['C','D']);admit(13.7,'E',['C','D','E']);
    // 3. Queue admission is separate from worker prefetch/concurrency.
    label(15,'gate','label','INTAKE · FULL');s.set(15,'gate','color',C.bad,0.15);
    s.set(15,'queue','color',C.bad,0.15);phase(15,'FULL',C.bad);
    s.sfx(15,'thump',{gain:0.9,note:'C3'});
    packet(16.6,['source.bottom','gate.top'],'F');
    s.shake(17.25,'gate',10,0.35);s.ripple(17.25,[280,825],C.bad,{r1:90,mark:'x'});
    s.sfx(17.25,'thump',{gain:1.2,note:'C3'});
    packet(17.55,[[280,825],[150,825],[150,580],[300,580]],'F',C.bad,0.9,'thump');
    label(18.45,'source','sublabel','F · DEFERRED');s.set(18.45,'source','subColor',C.bad,0);
    phase(18.45,'INTAKE PAUSED',C.bad);s.sfx(18.45,'miss',{gain:0.65});
    // 4. Completion is acknowledged first; only then may a new task start.
    complete(21,'B');phase(21,'WORK COMPLETES',C.ok);
    s.set(22.2,'progress','seg0Color',C.accent,0);
    // C continues beyond the illustrated window; do not show a full bar as RUNNING.
    start(22.2,'C',['D','E'],31);
    phase(22.2,'SPACE FREED',C.ok);
    // Space is available when C leaves the waiting queue, not merely when B finishes.
    label(22.2,'gate','label','INTAKE · OPEN');s.set(22.2,'gate','color',C.ok,0.2);
    s.set(22.2,'queue','color',C.accent,0.2);s.sfx(22.2,'recover',{note:'C4',gain:0.6});
    // 5. The deferred task is deliberately resubmitted once; no retry loop.
    phase(23.6,'RESUME WITH SPACE',C.ok);label(23.6,'source','sublabel','F · RETRY');
    s.set(23.6,'source','subColor',C.ok,0);s.sfx(23.6,'ack',{gain:0.7});
    admit(24,'F',['D','E','F']);
    label(25.3,'gate','label','INTAKE · FULL');s.set(25.3,'gate','color',C.bad,0.15);
    s.set(25.3,'queue','color',C.bad,0.15);s.sfx(25.3,'thump',{gain:0.75,note:'C3'});
    label(25.3,'source','sublabel','F · ACCEPTED');s.set(25.3,'source','subColor',C.ok,0);
    // End with bounded work in progress; do not imply that overload disappeared.
    s.fade(28,1,1);s.sfx(28,'poof',{gain:0.35});
  }
});

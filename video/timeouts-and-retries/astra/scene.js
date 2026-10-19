// Independently authored by gpt-6-astra, high reasoning, 2026-10-19.
// Illustrative runtime policy: GET status, max 2 attempts, 5s per attempt,
// 12s shared budget, one sampled 2s backoff. No claims about a specific SDK.
FlowVideo.scene({
  meta: {title:'Retry budget', subtitle:'CI STATUS • READ ONLY',duration:26,fps:30,speed:1},
  build(s) {
    const C=s.THEME;
    const cue=(t,name,note='E5',gain=.65)=>s.sfx(t,name,{note,gain});
    const label=(id,y,text,color=C.fg,size=50)=>s.node(id,'label',{x:540,y,text,color,size,weight:650});
    const state=(t,id,text,color)=>{s.set(t,id,'sublabel',text,0);s.set(t,id,'subColor',color,0);s.set(t,id,'color',color,.15);};
    const send=(t,from,to,color,note='E5')=>{s.packet({t,dur:.6,route:[from,to],color});cue(t,'send',note);s.ripple(t+.6,to,color,{r1:45});cue(t+.6,'arrive',note,.55);};
    s.node('agent','box',{x:540,y:600,w:560,h:170,label:'Agent',sublabel:'READ STATUS',labelSize:56,color:C.fg});
    s.node('runtime','box',{x:540,y:910,w:680,h:190,label:'Tool runtime',sublabel:'READY',labelSize:56,color:C.fg});
    s.node('ci','box',{x:540,y:1250,w:560,h:170,label:'CI service',sublabel:'READY',labelSize:56,color:C.fg});
    s.wire('a','agent.bottom','runtime.top');s.wire('b','runtime.bottom','ci.top');
    label('phase',470,'01  NORMAL',C.ok,46);
    label('budgetTitle',1450,'SHARED BUDGET',C.mid,46);
    s.node('budget','bar',{x:540,y:1530,w:760,h:32,seg0:1,seg0Color:C.ok,ticks:true});
    label('remaining',1620,'12 s',C.fg,64);
    label('policy',1740,'MAX 2 ATTEMPTS',C.mid,46);
    label('illustration',1820,'ILLUSTRATIVE POLICY',C.mid,38);
    s.fade(0,1,0);s.fade(.2,0,.5);cue(.2,'recover','C4',.35);cue(3.6,'clock','A6',.7);
    s.set(1.6,'budget','seg0',.75,3,'linear');
    for (const [t,remaining] of [[2.6,11],[3.6,10],[4.6,9]]) s.set(t,'remaining','text',`${remaining} s`,0);
    s.set(7,'budget','seg0',1,0);s.set(7,'remaining','text','12 s',0);
    // Beat 1: success returns a fact; the next task gets a new budget.
    send(1,'agent.bottom','runtime.top',C.fg,'C5');
    state(1.6,'runtime','ATTEMPT 1 / 2',C.accent);
    send(2,'runtime.bottom','ci.top',C.fg,'G5');
    state(2.6,'ci','COMPLETE',C.ok);
    send(3.1,'ci.top','runtime.bottom',C.ok,'G5');
    state(3.7,'runtime','RESULT RECEIVED',C.ok);
    send(4,'runtime.top','agent.bottom',C.ok,'C5');
    state(4.6,'agent','STATUS KNOWN',C.ok);cue(4.6,'chime','C6');
    // Beat 2: a separate logical read; the runtime owns both timers.
    s.set(7,'phase','text','02  SLOW RESPONSE',0);s.set(7,'phase','color',C.accent,0);
    state(7,'agent','READ STATUS',C.fg);state(7,'ci','READY',C.fg);state(7,'runtime','READY',C.fg);cue(7,'store');
    send(7.4,'agent.bottom','runtime.top',C.fg,'C5');
    state(8,'runtime','ATTEMPT 1 / 2',C.accent);
    s.set(8,'budget','seg0Color',C.accent,0);s.set(8,'budget','seg0',0,12,'linear');
    send(8,'runtime.bottom','ci.top',C.accent,'G5');
    state(8.6,'ci','NO REPLY YET',C.mid);
    for(let t=9;t<20;t++){s.set(t,'remaining','text',`${20-t} s`,0);cue(t,'clock','A6',.85);}
    // First attempt timeout at 13, but the shared budget has 7 seconds left.
    s.set(13,'phase','text','03  BACKOFF',0);
    state(13,'runtime','TIMEOUT • WAIT 2 s',C.accent);cue(13,'thump','E4',.8);s.shake(13,'runtime',9);
    s.node('wait','clock',{x:880,y:1100,r:36,alpha:0,color:C.accent});
    s.set(13,'wait','alpha',1,.15);s.set(13,'wait','time',2,2,'linear');
    // Beat 4: same shared budget, one retry; no fresh twelve seconds.
    s.set(15,'phase','text','04  ONE RETRY',0);s.set(15,'wait','alpha',0,.15);
    state(15,'runtime','ATTEMPT 2 / 2',C.accent);send(15,'runtime.bottom','ci.top',C.accent,'G5');
    s.mark(15,'budget',5/12,C.fg);
    // Beat 5: budget closes, late repeat cannot start downstream work.
    s.set(20,'phase','text','05  STOP',0);s.set(20,'phase','color',C.bad,0);
    s.set(20,'remaining','text','0 s • CLOSED',0);s.set(20,'remaining','color',C.bad,0);
    state(20,'runtime','DEADLINE REACHED',C.bad);cue(20,'crash','A5',.75);s.shake(20,'runtime');
    s.set(20,'wire:b','color',C.bad,0);s.set(20,'wire:b','dashed',1,0);
    send(20.5,'runtime.top','agent.bottom',C.accent,'C5');
    state(21.1,'agent','STATUS UNKNOWN',C.accent);cue(21.1,'deliver','C4',.6);
    // A hypothetical repeated request reaches the runtime gate, never CI.
    send(22,'agent.bottom','runtime.top',C.bad,'C5');
    state(22.6,'runtime','REPEAT BLOCKED',C.bad);s.shake(22.6,'runtime',10);cue(22.6,'thump','E4',.75);
    s.set(22.6,'policy','text','2 ATTEMPTS • NO THIRD',0);s.set(22.6,'policy','color',C.fg,0);
    cue(24.8,'poof','C5',.4);s.fade(24.8,1,.6);
  }
});

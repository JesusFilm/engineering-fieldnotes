/* Independent GPT-6.1 Sol cut. Times are illustrative, not a rollout prescription. */
FlowVideo.scene({
  meta: {title:'Canary rollouts', subtitle:'AGENT PROMPT CHANGE', duration:28, fps:30, speed:1, fadeTitle:true},
  build(s) {
    const C=s.THEME, old=285, next=795;
    s.node('tasks','box',{x:540,y:550,w:440,h:110,label:'PR draft sessions',labelSize:44,color:C.fg});
    s.node('router','box',{x:540,y:770,w:500,h:110,label:'Session router',labelSize:44,color:C.fg});
    s.node('share','bar',{x:540,y:910,w:780,h:26,segments:2,seg0:1,seg0Color:C.ok,seg1:0,seg1Color:C.accent});
    s.node('oldShare','label',{x:old,y:980,text:'100%',size:48,color:C.ok});
    s.node('newShare','label',{x:next,y:980,text:'0%',size:48,color:C.mid,alpha:0});
    s.node('oldRole','label',{x:old,y:1040,text:'CONTROL',size:36,color:C.mid});
    s.node('newRole','label',{x:next,y:1040,text:'CANARY',size:36,color:C.accent,alpha:0});
    s.node('v1','box',{x:old,y:1140,w:390,h:120,label:'Prompt v1',labelSize:46,color:C.ok});
    s.node('v2','box',{x:next,y:1140,w:390,h:120,label:'Prompt v2',labelSize:46,color:C.accent,alpha:0});
    for(const [key,x,a] of [['old',old,1],['new',next,0]]) {
      s.node(key+'Api','status',{x,y:1330,label:'API response',value:'—',alpha:a});
      s.node(key+'Tests','status',{x,y:1490,label:'Required PR tests',value:'—',alpha:a});
    }
    s.node('gate','box',{x:540,y:1730,w:620,h:110,label:'Rollout gate',labelSize:46,color:C.mid});
    s.wire('entry','tasks.bottom','router.top');
    s.wire('oldRoute','router.bottom','v1.left',{via:[[65,850],[65,1140]],color:C.ok});
    s.wire('newRoute','router.bottom','v2.right',{via:[[1015,850],[1015,1140]],color:C.accent,alpha:0});
    // Routes run outside the ratio and role labels to keep moving packets clear.
    s.wire('oldResult','v1.bottom',[old,1264],{color:C.ok});
    s.wire('newResult','v2.bottom',[next,1264],{color:C.accent,alpha:0});
    s.wire('feedback','gate.right',[798,770],{via:[[1030,1730],[1030,770]],alpha:0,color:C.bad});
    const cue=(t,name,id,note,gain=1)=>s.sfx(t,name,{note,gain,pan:id?s.panOf(id):0});
    function value(t,id,v,color,icon=0,preset='ack',note='C5') {
      s.set(t,id,'value',v,0);s.set(t,id,'color',color,0);s.set(t,id,'icon',icon,0);
      s.ripple(t,id,color,{r0:10,r1:48,dur:.45});cue(t,preset,id,note,.75);
    }
    function session(t,id,minor=false,dur=.4) {
      const x=id==='v1'?old:next;
      s.packet({route:['router.bottom',[id==='v1'?65:1015,850],[id==='v1'?65:1015,1140],id+(id==='v1'?'.left':'.right')],t,dur,kind:minor?'envelope':'dot',color:minor?C.accent:C.ok,fade:.035});
      cue(t,'send','router',minor?'E6':'C6',minor?.65:.24);
      s.pulse(t+dur,id);cue(t+dur,'arrive',id,minor?'E5':'C5',minor?.65:.2);
    }
    s.fade(0,1,0);s.fade(.3,0,.5);cue(.3,'recover',null,'C4',.5);
    // 1. Normal: a completed request and a useful PR are distinct observations.
    s.packet({route:['tasks.bottom','router.top'],t:1,dur:.4,kind:'envelope',color:C.fg});cue(1,'send','tasks','C6',.45);
    session(1.5,'v1');
    value(2.2,'oldApi','HTTP 200',C.ok,1,'ack','C6');
    value(2.8,'oldTests','PASS',C.ok,1,'chime','C5');
    // 2. Route new sessions, holding a prompt version through each session.
    for(const id of ['newShare','newRole','v2','newApi','newTests'])s.set(5,id,'alpha',1,.35);
    for(const id of ['newRoute','newResult'])s.set(5,'wire:'+id,'alpha',1,.35);
    s.set(5,'oldShare','text','90%',0);s.set(5,'newShare','text','10%',0);
    s.set(5,'newShare','color',C.accent,0);s.set(5,'share','seg0',.9,.4);s.set(5,'share','seg1',.1,.4);
    s.pulse(5,'v2');cue(5,'store','v2','E5',.9);
    // Three complete 9:1 patterns, presented as stylised sessions rather than measured confidence.
    for(let i=0;i<30;i++)session(5.7+i*.16,i%10===9?'v2':'v1',i%10===9,.28);
    // 3. Transport stays green; the artifact check exposes the regression.
    value(11.2,'oldApi','HTTP 200',C.ok,1,'ack','C6');
    value(11.6,'newApi','HTTP 200',C.ok,1,'ack','E6');
    s.packet({route:['v1.bottom',[old,1418]],t:12.4,dur:.5,kind:'envelope',color:C.ok});cue(12.4,'send','v1','C6',.4);
    value(12.9,'oldTests','PASS',C.ok,1,'chime','C5');
    s.packet({route:['v2.bottom',[next,1418]],t:13.6,dur:.5,kind:'envelope',color:C.accent});cue(13.6,'send','v2','E6',.45);
    value(14.1,'newTests','FAIL',C.bad,-1,'crash','A4');
    s.shake(14.1,'newTests',13,.45);
    // 4. A configured gate acts on the failed required check, not the HTTP status.
    s.packet({route:[[next,1556],[next,1635],'gate.top'],t:16.6,dur:.5,kind:'dot',color:C.bad});cue(16.6,'send','newTests','E4',.65);
    s.set(17.1,'gate','label','STOP',0);s.set(17.1,'gate','color',C.bad,0);s.shake(17.1,'gate',12,.4);cue(17.1,'thump','gate','E3',1);
    s.set(18,'wire:feedback','alpha',1,.1);
    s.packet({route:['gate.right',[1030,1730],[1030,770],'router.right'],t:18,dur:1,kind:'dot',color:C.bad});cue(18,'send','gate','E5',.65);
    s.set(19,'router','label','Prompt v1 only',0);s.pulse(19,'router',C.ok);cue(19,'recover','router','C4',.75);
    s.set(19,'oldShare','text','100%',0);s.set(19,'newShare','text','0%',0);
    s.set(19,'share','seg0',1,.45);s.set(19,'share','seg1',0,.45);
    s.set(19,'wire:newRoute','dashed',1,0);s.set(19,'wire:newRoute','color',C.bad,0);s.set(19,'wire:newRoute','alpha',.35,.3);
    s.set(19,'wire:newResult','alpha',.3,.3);s.set(19,'v2','alpha',.45,.3);s.set(19,'newShare','color',C.mid,.3);
    s.set(19.7,'wire:feedback','alpha',0,.3);
    // 5. New work returns to v1. The failed artifact remains failed: rollback is not undo.
    for(const t of [20.5,21.4,22.3])session(t,'v1',false,.5);
    value(23.1,'oldTests','PASS',C.ok,1,'chime','C5');
    s.set(23.1,'gate','label','Canary withdrawn',0);s.set(23.1,'gate','color',C.ok,.2);
    s.fade(26,1,.7);cue(26,'poof',null,'C4',.35);
  }
});

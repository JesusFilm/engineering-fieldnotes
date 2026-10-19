// Edited by gpt-6-astra comparative review: invalidate evidence atomically at PATCH 2.
// Independently authored by gpt-6-astra, high reasoning, 2026-10-19.
// Illustrative contract: own-tenant invoice -> 200; other-tenant invoice -> 403.
// The harness routes executable evidence back to the agent. Review stays human.
FlowVideo.scene({
  meta: { title: 'Prove the patch', titleSize: 98, subtitle: 'HARNESS ENGINEERING',
    subtitleSize: 40, subtitleSpacing: 3, duration: 28, fps: 30, speed: 1, fullFade: true },
  build(s) {
    const C = s.THEME;
    const box = (id,x,y,w,h,label,sub,extra={}) => s.node(id,'box',{
      x,y,w,h,label,sublabel:sub,labelSize:48,subSize:52,...extra
    });
    s.node('api','label',{x:540,y:480,text:'INVOICE API',size:44,color:C.mid});
    box('agent',540,650,470,180,'Agent','PATCH 1',{color:C.accent,subColor:C.accent});
    // Outer border is the execution/check boundary, not a separate model.
    box('harness',540,1100,960,480,'','',{color:C.dim});
    s.node('harnessName','label',{x:540,y:915,text:'Harness · checks',size:50,color:C.fg});
    box('own',300,1085,390,210,'Own tenant','—',{labelSize:46});
    box('other',780,1085,390,210,'Other tenant','—',{labelSize:46});
    s.node('ownExpected','label',{x:300,y:1260,text:'EXPECT 200',size:40,mono:true,color:C.mid});
    s.node('otherExpected','label',{x:780,y:1260,text:'EXPECT 403',size:40,mono:true,color:C.mid});
    box('review',540,1560,600,190,'Human review','WAIT',{color:C.dim,subColor:C.mid});
    s.wire('own','agent.bottom','own.top',{via:[[540,805],[300,805]]});
    s.wire('other','agent.bottom','other.top',{via:[[540,805],[780,805]]});
    s.wire('gate',[540,1345],'review.top');
    s.wire('feedback','other.right','agent.right',{via:[[1010,1085],[1010,650]]});
    s.set(0,'wire:feedback','alpha',0,0);
    const cue=(t,name,note,anchor,gain=0.65)=>s.sfx(t,name,{note,pan:s.panOf(anchor),gain});
    const move=(t,route,color,note,dur=0.75)=>{
      s.packet({t,route,color,dur}); cue(t,'send',note,route[0],0.5);
    };
    const result=(t,id,value,ok)=>{
      const color=ok?C.ok:C.bad;
      s.set(t,id,'sublabel',value,0); s.set(t,id,'subColor',color,0);
      s.set(t,id,'color',color,0); s.pulse(t,id);
      s.ripple(t,[id==='own'?300:780,1200],color,{r0:14,r1:45,mark:ok?'check':'x'});
      cue(t,ok?'arrive':'crash',ok?'E5':'C3',id,ok?0.65:0.95);
      if(!ok) s.shake(t,id,14);
    };
    // Beat 1: normal case, one check green is visibly only half the evidence.
    s.fade(0,1,0); s.fade(0.5,0,0.5); cue(0.5,'recover','C4','agent',0.4);
    move(1.8,['agent.bottom',[540,805],[300,805],'own.top'],C.accent,'C6');
    result(2.55,'own','200 ✓',true);
    // Beat 2: a successful HTTP response is a failed authorization test.
    move(5,['agent.bottom',[540,805],[780,805],'other.top'],C.accent,'C6');
    result(5.75,'other','200 ×',false);
    s.set(6.6,'review','sublabel','BLOCKED',0); s.set(6.6,'review','subColor',C.bad,0);
    s.set(6.6,'wire:gate','color',C.bad,0); s.set(6.6,'wire:gate','dashed',1,0);
    s.shake(6.6,'review',8); cue(6.6,'thump','C3','review');
    // Beat 3: failure evidence goes back; patch changes, old checks are invalidated.
    s.set(9.2,'wire:feedback','alpha',1,0.15);
    move(9.2,['other.right',[1010,1085],[1010,650],'agent.right'],C.bad,'G5',1.2);
    s.pulse(10.4,'agent'); cue(10.4,'arrive','C5','agent');
    s.set(11.4,'agent','sublabel','PATCH 2',0); s.shake(11.4,'agent',6,0.35);
    cue(11.4,'work','C4','agent');
    for(const id of ['own','other']) {
      s.set(11.4,id,'sublabel','—',0); s.set(11.4,id,'color',C.mid,0);
      s.set(11.4,id,'subColor',C.mid,0);
    }
    s.set(11.4,'wire:feedback','alpha',0,0.3); cue(11.4,'poof','C4','harness',0.45);
    // Beat 4: replay both cases against this version; passing means denied here.
    move(15,['agent.bottom',[540,805],[300,805],'own.top'],C.accent,'C6');
    result(15.75,'own','200 ✓',true);
    move(17.4,['agent.bottom',[540,805],[780,805],'other.top'],C.accent,'C6');
    result(18.15,'other','403 ✓',true);
    // Beat 5: evidence opens review, never an implied autonomous deployment.
    s.set(21,'wire:gate','dashed',0,0); s.set(21,'wire:gate','color',C.ok,0);
    move(21,[[540,1345],'review.top'],C.ok,'E6');
    s.set(21.75,'review','sublabel','READY',0); s.set(21.75,'review','subColor',C.ok,0);
    s.set(21.75,'review','color',C.ok,0); s.pulse(21.75,'review');
    cue(21.75,'chime','G5','review');
    // Deliberate resolved-state hold, then black bookends for exact loop equality.
    s.fade(25.5,1,1); cue(25.5,'poof','C4','review',0.3);
  }
});

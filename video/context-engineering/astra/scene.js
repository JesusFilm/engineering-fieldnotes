// Independent cut by gpt-6-astra, reasoning: high. Illustrative, not an agent trace.
FlowVideo.scene({
  meta: {title:'Keep the contract',subtitle:'CONTEXT HANDOFF',titleSize:88,subtitleSize:36,
    duration:30,fps:30,speed:1,fullFade:true},
  build(s) {
    const C=s.THEME;
    s.node('context','sheet',{x:540,y:660,w:800,h:260,label:'SESSION 1',
      row0Text:'Fix timeout',row0Color:C.fg,row1Text:'Keep total_cents',row1Color:C.accent});
    s.node('source','box',{x:265,y:1090,w:380,h:180,label:'v1 contract',labelSize:49,
      sublabel:'total_cents',sublabelSize:39,subColor:C.accent,alpha:0});
    s.node('agent','box',{x:780,y:1090,w:370,h:180,label:'Agent',labelSize:58,
      sublabel:'Session 1',sublabelSize:40});
    s.node('test','box',{x:540,y:1490,w:800,h:200,label:'v1 fixture',labelSize:56,
      sublabel:'WAIT',sublabelSize:48});
    s.node('review','label',{x:540,y:1715,text:'Human review',size:48,color:C.mid,alpha:0});
    s.wire('input',[780,796],'agent.top');
    s.wire('output','agent.bottom','test.top',{via:[[780,1310],[540,1310]]});
    s.wire('reload','source.top',[265,796]);s.set(0,'wire:reload','alpha',0,0);
    // Each visual event is coupled to a cue. Actors: context C5, agent E5, check G5.
    const cue=(t,name,at,note,gain=1)=>s.sfx(t,name,{note,gain,pan:s.panOf(at)});
    const travel=(t,from,to,label,color,note,via=[])=>{
      s.packet({t,dur:0.8,route:[from,...via,to],kind:label?'chip':'envelope',label,color});
      cue(t,'send',from,note,1.2);s.ripple(t+0.8,to,color,{r1:48});
      cue(t+0.8,'arrive',to,note,0.9);
    };
    const test=(t,pass)=>{
      s.set(t,'test','color',pass?C.ok:C.bad,0.15);
      s.set(t,'test','sublabel',pass?'PASS':'FAIL',0);
      s.set(t,'test','subColor',pass?C.ok:C.bad,0.15);
      if(!pass)s.shake(t,'test',14);
      cue(t,pass?'chime':'crash','test',pass?'G5':'C3',pass?0.8:1);
    };
    const output=(t,label,color)=>travel(t,'agent.bottom','test.top',label,color,'E5',[[780,1310],[540,1310]]);
    // 1. A compatible patch and a real check establish the normal case.
    s.fade(0,1,0);s.fade(0.4,0,0.6);cue(0.4,'recover','context','C5',0.4);
    travel(1.6,[780,796],'agent.top','',C.accent,'C5');
    s.pulse(2.4,'agent',C.accent);
    output(3.2,'total_cents',C.ok);test(4.2,true);
    // 2. A lossy handoff preserves the goal but visibly drops the constraint.
    s.set(6.3,'context','label','HANDOFF',0);s.pulse(6.3,'context');cue(6.3,'store','context','C5');
    s.set(7.4,'context','row1Color',C.bad,0.1);s.shake(7.4,'context',6);
    cue(7.4,'miss','context','C3',1.2);
    s.set(7.7,'context','row1Alpha',0,0.7);s.set(7.7,'context','row1Dashed',1,0);
    s.set(8.4,'context','row1Color',C.dim,0.3);
    // 3. Resume on incomplete context; a renamed field fails the same fixture.
    s.set(10.3,'agent','sublabel','Session 2',0);s.pulse(10.3,'agent');
    s.set(10.3,'test','sublabel','WAIT',0);s.set(10.3,'test','color',C.mid,0.2);
    s.set(10.3,'test','subColor',C.mid,0.2);cue(10.3,'clock','agent','E5',4);
    travel(11.2,[780,796],'agent.top','',C.fg,'C5');
    output(12.8,'amount',C.accent);test(13.8,false);
    // 4. Reopen authoritative evidence and repair the handoff before another attempt.
    s.set(16,'source','alpha',1,0.4);s.set(16,'wire:reload','alpha',1,0.4);
    cue(16,'recover','source','C5',0.8);
    travel(17.3,'source.top',[265,796],'total_cents',C.accent,'C5');
    s.set(18.1,'context','row1Alpha',1,0.3);s.set(18.1,'context','row1Color',C.accent,0.2);
    s.set(18.1,'context','row1Dashed',0,0);s.set(18.1,'context','label','CHECKED HANDOFF',0);
    s.pulse(18.1,'context');cue(18.1,'store','context','C5',0.8);
    // 5. Read the repaired packet, repair the field, rerun—not merely trust—the check.
    s.set(21,'test','sublabel','WAIT',0);s.set(21,'test','color',C.mid,0.2);
    s.set(21,'test','subColor',C.mid,0.2);
    travel(21,[780,796],'agent.top','',C.accent,'C5');s.pulse(21.8,'agent',C.accent);
    output(22.8,'total_cents',C.ok);test(23.8,true);
    s.set(26,'review','alpha',1,0.3);cue(26,'ack','review','G5',1.4);
    s.fade(28.6,1,0.9);cue(28.6,'poof','context','C5',0.3);
  }
});

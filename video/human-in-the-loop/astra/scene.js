// Independently authored by gpt-6-astra; illustrative executor, not a product guarantee.
FlowVideo.scene({
  meta: {title:'Approve the artifact', titleSize:82, fullFade:true, subtitle:'HUMAN-IN-THE-LOOP', duration:30, fps:30, speed:1},
  build(s) {
    const C=s.THEME;
    const label=(id,x,y,text,size=46,color=C.fg)=>s.node(id,'label',{x,y,text,size,color});
    const box=(id,x,y,w,label,sub,color=C.mid)=>s.node(id,'box',{x,y,w,h:170,label,sublabel:sub,labelSize:44,subSize:46,color});
    box('agent',280,580,350,'Agent','TESTING');
    box('human',800,580,350,'Reviewer','WAITING');
    box('artifact',280,900,350,'Artifact','—');
    box('approval',800,900,350,'Approval','NONE');
    box('executor',540,1220,640,'Executor','WAIT');
    s.node('barrier','barrier',{x:540,y:1410,w:300,open:0,color:C.accent});
    box('prod',540,1630,500,'Production','UNCHANGED');
    label('target',540,1765,'Illustrative release',38,C.mid);
    s.wire('build','agent.bottom','artifact.top');
    s.wire('sign','human.bottom','approval.top');
    s.wire('left','artifact.bottom','executor.top',{via:[[280,1080],[540,1080]]});
    s.wire('right','approval.bottom','executor.top',{via:[[800,1080],[540,1080]]});
    s.wire('deploy','executor.bottom','prod.top');
    const change=(t,id,sub,color,preset,note)=>{
      s.set(t,id,'sublabel',sub,0); s.set(t,id,'subColor',color,0); s.set(t,id,'color',color,0.15);
      s.pulse(t,id); s.sfx(t,preset,{note,gain:.65,pan:s.panOf(id)});
    };
    const move=(t,route,color=C.fg,dur=.8)=>{
      s.packet({t,route,color,dur}); s.sfx(t,'send',{note:'C6',gain:.45,pan:s.panOf(route[0])});
      s.sfx(t+dur,'arrive',{note:'E5',gain:.5,pan:s.panOf(route[route.length-1])});
    };
    s.fade(0,1,0); s.fade(.4,0,.45); s.sfx(.4,'send',{note:'C5',gain:.35});
    // 1: normal autonomous preparation. Tests do not confer deployment authority.
    change(1,'agent','TESTING',C.accent,'work','C5');
    change(2.5,'agent','TESTS PASS',C.ok,'chime','C5');
    move(3.3,['agent.bottom','artifact.top']);
    change(4.1,'artifact','A',C.info,'store','C5');
    // 2: a human approves A; the executor is still closed.
    move(5.7,['artifact.top',[280,730],[800,730],'human.bottom'],C.info,1);
    change(6.7,'human','REVIEW A',C.accent,'arrive','E5');
    change(8.3,'human','APPROVE A',C.ok,'chime','E5');
    move(8.7,['human.bottom','approval.top'],C.ok);
    change(9.5,'approval','A ✓',C.ok,'store','E5');
    // 3: a revision arrives before execution; old approval cannot cover it.
    change(10.2,'agent','TESTING',C.accent,'work','C5');
    change(10.9,'agent','TESTS PASS',C.ok,'chime','C5');
    move(11,['agent.bottom','artifact.top'],C.info);
    change(11.8,'artifact','B',C.accent,'miss','C5');
    move(12.7,['artifact.bottom',[280,1080],'executor.top'],C.accent);
    move(12.7,['approval.bottom',[800,1080],'executor.top'],C.ok);
    change(13.5,'executor','B ≠ A',C.bad,'crash','C3');
    s.shake(13.5,'executor',12); s.set(13.5,'barrier','color',C.bad,0);
    change(14.5,'approval','A · STALE',C.bad,'thump','E3');
    // 4: the changed proposal goes back to the person, not around the gate.
    move(17,['artifact.top',[280,730],[800,730],'human.bottom'],C.accent,1);
    change(18,'human','REVIEW B',C.accent,'arrive','E5');
    change(20,'human','APPROVE B',C.ok,'chime','E5');
    move(20.5,['human.bottom','approval.top'],C.ok);
    change(21.3,'approval','B ✓',C.ok,'store','E5');
    change(21.3,'executor','RECHECK',C.accent,'ack','G5');
    s.set(21.3,'barrier','color',C.accent,0);
    // 5: same artifact + new approval -> executor releases that artifact.
    move(23,['artifact.bottom',[280,1080],'executor.top'],C.accent);
    move(23,['approval.bottom',[800,1080],'executor.top'],C.ok);
    change(23.8,'executor','B = B',C.ok,'recover','G5');
    s.set(23.8,'barrier','color',C.ok,0); s.set(23.8,'barrier','open',1,.5);
    move(24.6,['executor.bottom','prod.top'],C.ok,1);
    change(25.6,'prod','B LIVE',C.ok,'chime','G5');
    s.fade(28.5,1,.7); s.sfx(28.5,'poof',{gain:.3,note:'C4'});
  }
});

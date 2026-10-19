// Independently authored by gpt-6-astra, high reasoning. Illustrative design, not a product guarantee.
FlowVideo.scene({
  meta: {title:'Separate authority',titleSize:86,subtitle:'GUARDRAILS / PERMISSIONS',duration:28,fps:30,speed:1,fadeTitle:true},
  build(s) {
    const C=s.THEME;
    const box=(id,x,y,label,sub,w=360)=>s.node(id,'box',{x,y,w,h:170,label,sublabel:sub,labelSize:47,subSize:38,subColor:C.fg});
    box('agent',285,650,'Agent','read only');
    box('human',795,650,'Reviewer','release r42');
    box('gate',795,1050,'Deploy tool','auth check');
    box('logs',285,1420,'Logs','read allowed');
    box('prod',795,1420,'Production','release r41');
    s.node('outcome','label',{x:540,y:1710,text:'',size:47,color:C.fg,weight:650});
    s.wire('read','agent.bottom','logs.top');
    s.wire('attempt','agent.bottom','gate.left',{via:[[285,1050]]});
    s.wire('proposal','agent.top','human.top',{via:[[285,490],[795,490]]});
    s.wire('review','human.bottom','gate.top');
    s.wire('deploy','gate.bottom','prod.top');
    for(const id of ['human','gate','prod'])s.set(0,id,'alpha',0.45,0);
    for(const id of ['attempt','proposal','review','deploy'])s.set(0,'wire:'+id,'alpha',0.25,0);
    const sound=(t,name,note,at,gain=0.65)=>s.sfx(t,name,{note,pan:s.panOf(at),gain});
    const move=(t,route,label,color,note='C5')=>{s.packet({t,route,label,kind:'chip',size:40,color,dur:0.8});sound(t,'send',note,route[0],0.7);};
    const status=(t,text,color)=>{s.set(t,'outcome','text',text,0);s.set(t,'outcome','color',color,0);};
    s.fade(0,1,0);s.fade(0.4,0,0.6);sound(0.4,'recover','C5','agent',0.25);
    // 1. Normal case: a real read under the agent's restricted identity.
    move(1.3,['agent.bottom','logs.top'],'READ',C.info);
    s.set(2.1,'logs','color',C.ok,0);s.ripple(2.1,'logs.top',C.ok);sound(2.1,'hit','C5','logs');
    move(2.9,['logs.top','agent.bottom'],'logs',C.ok);
    s.pulse(3.7,'agent',C.ok);status(3.7,'READ  ✓',C.ok);sound(3.7,'deliver','C5','agent');
    // 2. A valid-looking request is denied before production changes.
    move(5.7,['agent.bottom',[285,1050],'gate.left'],'DEPLOY',C.accent);
    s.set(5.7,'gate','alpha',1,0.2);s.set(5.7,'wire:attempt','alpha',1,0.2);
    s.set(6.5,'gate','color',C.bad,0);s.set(6.5,'gate','sublabel','denied',0);s.shake(6.5,'gate');
    s.ripple(6.5,'gate.left',C.bad,{mark:'x',r1:65});status(6.5,'DEPLOY  ×',C.bad);sound(6.5,'thump',150,'gate',1.3);
    // 3. Proposal goes to a human; approval is a separate trusted path.
    s.set(9.5,'human','alpha',1,0.2);s.set(9.5,'wire:proposal','alpha',1,0.2);
    move(9.5,['agent.top',[285,490],[795,490],'human.top'],'r42',C.accent,'E5');
    s.set(10.3,'human','color',C.accent,0);s.set(10.3,'human','sublabel','review r42',0);status(10.3,'PROPOSAL',C.accent);sound(10.3,'arrive','E5','human');
    s.set(12.6,'human','color',C.ok,0);s.set(12.6,'human','sublabel','r42 approved',0);s.ripple(12.6,'human.top',C.ok,{mark:'check'});sound(12.6,'chime','E5','human');
    // 4. Deployment authority belongs to the controlled execution path.
    move(14.8,['human.bottom','gate.top'],'r42',C.ok,'E5');
    s.set(14.8,'wire:review','alpha',1,0.2);
    s.set(15.6,'gate','color',C.ok,0);s.set(15.6,'gate','sublabel','r42 allowed',0);status(15.6,'AUTHORIZED RELEASE',C.ok);sound(15.6,'arrive','G5','gate');
    move(17.7,['gate.bottom','prod.top'],'r42',C.ok,'G5');
    s.set(17.7,'wire:deploy','alpha',1,0.2);s.set(17.7,'prod','alpha',1,0.2);
    s.set(18.5,'prod','color',C.ok,0);s.set(18.5,'prod','sublabel','release r42',0);s.ripple(18.5,'prod.top',C.ok,{mark:'check'});sound(18.5,'store','G5','prod');
    // 5. Approval did not upgrade the agent. Another direct write is still denied.
    move(21,['agent.bottom',[285,1050],'gate.left'],'DEPLOY',C.accent);
    s.set(21.8,'gate','color',C.bad,0);s.set(21.8,'gate','sublabel','agent denied',0);s.shake(21.8,'gate',10);s.ripple(21.8,'gate.left',C.bad,{mark:'x'});
    status(21.8,'AGENT: READ ONLY',C.fg);sound(21.8,'thump',150,'gate',1.3);
    move(23.3,['agent.bottom','logs.top'],'READ',C.info);
    s.ripple(24.1,'logs.top',C.ok,{mark:'check'});s.pulse(24.1,'agent',C.ok);sound(24.1,'hit','C5','logs');
    s.fade(26.4,1,0.7);sound(26.4,'poof','C5','agent',0.18);
  }
});

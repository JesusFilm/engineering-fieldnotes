/* GPT-6.1 Sol / high. Independent scene. Versions are illustrative plan revisions,
   not PostgreSQL WAL positions. The version check is implemented in the wrapper. */
FlowVideo.scene({
  meta:{title:'Read your write',subtitle:'ASYNC REPLICATION',duration:32,fps:30,speed:1},
  build(s){
    const C=s.THEME;
    s.node('agent','panel',{x:540,y:570,w:440,h:220,label:'AGENT',value:'plan v1',color:C.fg});
    s.node('check','panel',{x:540,y:890,w:440,h:220,label:'READ CHECK',value:'need v1',color:C.mid});
    s.node('primary','panel',{x:265,y:1260,w:350,h:190,label:'PRIMARY',value:'v1',valueSize:64,color:C.ok});
    s.node('replica','panel',{x:815,y:1260,w:350,h:190,label:'REPLICA',value:'v1',valueSize:64,color:C.info});
    s.node('tool','panel',{x:540,y:1660,w:440,h:220,label:'TOOL STEP',value:'waiting',color:C.mid});
    const rp=['check.right',[815,890],'replica.top'];
    const pp=['check.left',[265,890],'primary.top'];
    const wp=['agent.left',[165,570],[165,1060],[265,1060],'primary.top'];
    const cp=['primary.right','replica.left'];
    s.wire('agentCheck','agent.bottom','check.top');
    s.wire('readReplica',rp[0],rp[2],{via:[rp[1]],color:C.info});
    s.wire('readPrimary',pp[0],pp[2],{via:[pp[1]],color:C.dim});
    s.wire('write',wp[0],wp.at(-1),{via:wp.slice(1,-1),color:C.dim});
    s.wire('copy',cp[0],cp[1],{color:C.accent});
    // Comparative correction: distinguish the wrapper's gate from WAL transport.
    s.wire('gate','check.bottom','tool.top',{color:C.ok});
    s.set(0,'wire:gate','alpha',0,0);
    const sounds=(t,preset,at,note,gain=0.65)=>s.sfx(t,preset,{note,gain,pan:s.panOf(at)});
    function state(t,id,value,color,preset='arrive',note='E5'){
      s.set(t,id,'value',value,0);s.set(t,id,'color',color,0);s.set(t,id,'valueColor',color,0);
      s.pulse(t,id);sounds(t,preset,id,note);
    }
    function travel(t,route,label,color,note='G5',dur=.8){
      s.packet({t,route,label,kind:'chip',color,dur});sounds(t,'send',route[0],note,.6);
      s.ripple(t+dur,route.at(-1),color,{r1:45,dur:.45});sounds(t+dur,'arrive',route.at(-1),note,.42);
    }
    function run(t,version){
      s.set(t,'wire:copy','alpha',0,0);
      s.set(t,'wire:gate','alpha',1,0);
      travel(t,['check.bottom','tool.top'],version,C.ok,'E5');
      s.set(t+1.4,'wire:gate','alpha',0,.2);
      s.set(t+1.6,'wire:copy','alpha',1,.2);
      state(t+.8,'tool','used '+version,C.ok,'chime','E5');
    }
    s.fade(0,1,0);s.fade(.4,0,.4);sounds(.4,'arrive','agent','E5',.4);
    // Normal case: equal versions permit a tool step.
    travel(1.1,rp,'GET plan',C.info,'G5');
    travel(2.6,[...rp].reverse(),'v1',C.info,'G5');
    state(3.4,'check','v1 = v1',C.ok,'hit','E5');run(4.1,'v1');
    // Save v2 on primary. The ACK deliberately precedes replica replay.
    state(6.5,'agent','save v2',C.accent,'store','E5');
    state(6.5,'tool','waiting',C.mid,'work','E4');
    travel(6.5,wp,'PUT v2',C.accent,'C5',.9);
    state(7.4,'primary','v2',C.ok,'store','C5');
    travel(8.1,[...wp].reverse(),'ACK v2',C.ok,'C5',.9);
    state(9,'agent','saved v2',C.ok,'ack','E5');
    state(9,'check','need v2',C.accent,'store','E5');
    // A valid replica response is too old for this dependent step.
    travel(10.8,rp,'GET plan',C.info,'G5');
    travel(12.3,[...rp].reverse(),'v1',C.accent,'G5');
    state(13.1,'check','v1 < v2',C.bad,'thump','E4');
    s.set(13.1,'check','label','HELD',0);s.shake(13.1,'check',10);
    s.set(13.1,'tool','value','HELD',0);s.set(13.1,'tool','valueColor',C.bad,0);
    // Resolution: an implemented router retries the dependent read on primary.
    s.set(15.4,'check','label','READ CHECK',0);
    s.set(15.4,'wire:readPrimary','color',C.ok,0);
    s.set(15.4,'wire:readReplica','alpha',.25,0);
    travel(15.4,pp,'GET plan',C.ok,'C5');
    travel(17,[...pp].reverse(),'v2',C.ok,'C5');
    state(17.8,'check','v2 = v2',C.ok,'hit','E5');run(18.6,'v2');
    // Catch-up is separate from the earlier successful commit.
    travel(21.2,cp,'v2',C.accent,'G5',1.5);
    state(22.7,'replica','v2',C.info,'store','G5');
    // Once caught up, this replica can satisfy a later fresh read too.
    state(24.5,'tool','waiting',C.mid,'work','E4');
    s.set(24.5,'wire:readReplica','alpha',1,0);
    s.set(24.5,'wire:readPrimary','color',C.dim,0);
    travel(24.5,rp,'GET plan',C.info,'G5');
    travel(26.1,[...rp].reverse(),'v2',C.info,'G5');
    state(26.9,'check','v2 = v2',C.ok,'hit','E5');
    run(27.5,'v2');
    s.fade(30.3,1,.9);sounds(30.3,'poof','check','C5',.25);
  }
});

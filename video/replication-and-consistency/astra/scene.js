// Independent lesson authored by gpt-6-astra, high reasoning, 2026-10-19.
// Illustrative single-writer schedule; versions are application revisions, not WAL LSNs.
FlowVideo.scene({
  meta:{title:'Verify the write',subtitle:'REPLICATION · READ YOUR WRITES',duration:30,fps:30,speed:1,fullFade:true},
  build(s){
    const C=s.THEME;
    s.node('agent','card',{x:540,y:650,w:480,h:250,label:'Agent tool',value:'v7',detail:'observed',color:C.fg});
    s.node('primary','card',{x:270,y:1200,w:360,h:250,label:'Primary',value:'v7',detail:'committed',color:C.ok});
    s.node('replica','card',{x:810,y:1200,w:360,h:250,label:'Replica',value:'v7',detail:'applied',color:C.info});
    s.node('status','label',{x:540,y:900,size:48,weight:700,text:'MATCH',color:C.ok});
    s.node('writes','label',{x:270,y:1510,size:42,text:'Writes: 0',color:C.mid});
    s.node('pending','label',{x:810,y:1510,size:42,text:'',color:C.accent});
    s.node('scope','label',{x:540,y:1690,size:36,text:'Illustrative · one writer',color:C.mid});
    const left=['agent.left',[270,650],'primary.top'];
    const right=['agent.right',[810,650],'replica.top'];
    const copy=['primary.bottom',[270,1410],[810,1410],'replica.bottom'];
    s.wire('left',left[0],left[2],{via:[left[1]]});
    s.wire('right',right[0],right[2],{via:[right[1]]});
    s.wire('copy',copy[0],copy[3],{via:[copy[1],copy[2]]});
    function send(t,route,label,color,note){
      s.packet({t,route,label,kind:'chip',color,dur:0.8});
      s.sfx(t,'send',{note,gain:0.6,pan:s.panOf(route[0])});
      s.sfx(t+0.8,'arrive',{note,gain:0.65,pan:s.panOf(route.at(-1))});
    }
    function state(t,id,value,detail,color,preset='store',note='C5'){
      s.set(t,id,'value',value,0);s.set(t,id,'detail',detail,0);s.set(t,id,'valueColor',color,0);
      s.pulse(t,id);s.sfx(t,preset,{note,gain:preset==='thump'?1.05:0.75,pan:s.panOf(id)});
    }
    function status(t,label,color){s.set(t,'status','text',label,0);s.set(t,'status','color',color,0);}
    s.fade(0,1,0);s.fade(0.4,0,0.6);s.sfx(0.4,'recover',{gain:0.3});
    // 1. Normal: a caught-up replica returns the expected version.
    send(1.5,right,'READ',C.info,'G5');
    send(2.7,[...right].reverse(),'v7',C.info,'G5');
    state(3.5,'agent','v7','observed',C.ok,'hit','G5');
    // 2. Successful write: primary advances, replica has not yet applied it.
    status(5.4,'SAVE',C.accent);send(5.4,left,'SET v8',C.accent,'C5');
    state(6.2,'primary','v8','committed',C.ok,'store','C5');
    s.set(6.2,'writes','text','Writes: 1',0);s.set(6.2,'pending','text','v8 pending',0);
    send(7.1,[...left].reverse(),'ACK v8',C.ok,'C5');
    state(7.9,'agent','v8','expected',C.accent,'ack','E5');status(7.9,'ACKNOWLEDGED',C.ok);
    // 3. A stale observation is a mismatch, not proof of write failure.
    status(10.4,'VERIFY',C.info);send(10.4,right,'READ',C.info,'G5');
    send(11.8,[...right].reverse(),'v7',C.accent,'G4');
    state(12.6,'agent','v7 ≠ v8','observed / expected',C.bad,'thump','C3');
    status(12.6,'HOLD',C.bad);s.shake(12.6,'agent',10);
    s.set(14.9,'wire:right','alpha',0.3,0.2);s.set(14.9,'wire:left','color',C.ok,0.2);
    s.ripple(14.9,'primary.top',C.ok);s.sfx(14.9,'recover',{gain:0.5,note:'C5',pan:-0.3});
    // 4. Start a fresh primary read after the acknowledged commit.
    status(16.2,'VERIFY',C.ok);send(16.2,left,'READ',C.ok,'C5');
    send(17.6,[...left].reverse(),'v8',C.ok,'C5');
    state(18.4,'agent','v8 = v8','observed / expected',C.ok,'chime','E5');status(18.4,'VERIFIED',C.ok);
    // Deliberate result hold; then expose independent replica replay.
    s.set(21,'wire:copy','color',C.accent,0.2);s.ripple(21,'primary.bottom',C.accent);s.sfx(21,'clock',{gain:2.5});
    s.packet({t:22,route:copy,kind:'chip',label:'v8',color:C.accent,dur:2});s.sfx(22,'send',{note:'C6',gain:0.7});
    state(24,'replica','v8','applied',C.info,'store','G5');s.set(24,'pending','text','caught up',0);s.set(24,'pending','color',C.info,0);
    s.set(26,'wire:copy','color',C.wire,0.2);s.ripple(26,'agent.bottom',C.ok,{mark:'check'});s.sfx(26,'ack',{note:'E5',gain:0.7});
    s.fade(28,1,1);s.sfx(28,'poof',{gain:0.2});
  }
});

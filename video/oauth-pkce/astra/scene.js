// Authored independently by gpt-6-astra, high reasoning. Letters are symbolic,
// not valid cryptographic values. Browser approval and other OAuth checks omitted.
FlowVideo.scene({
  meta: {title:'OAuth PKCE',subtitle:'ONE LOGIN · ONE VERIFIER',duration:30,fps:30,speed:1},
  build(s) {
    const C=s.THEME, A=C.info, B=C.accent, G=C.ok;
    const label=(id,x,y,text,color=C.fg,size=48,alpha=1)=>s.node(id,'label',{x,y,text,color,size,alpha});
    const set=(t,id,prop,v)=>s.set(t,id,prop,v,0);
    const cue=(t,name,note='C5',gain=.65)=>s.sfx(t,name,{note,gain});
    const reveal=(t,ids)=>ids.forEach(id=>s.set(t,id,'alpha',1,.2));
    const hide=(t,ids)=>ids.forEach(id=>s.set(t,id,'alpha',0,.2));
    const packet=(t,route,text,color,note='C5',dur=1)=>{
      s.packet({t,route,label:text,kind:'chip',color,dur});cue(t,'send',note,.6);
      cue(t+dur,'arrive',note,.65);
    };
    s.node('a','box',{x:285,y:650,w:430,h:270,label:'',color:A,alpha:0});
    s.node('b','box',{x:795,y:650,w:430,h:270,label:'',color:B,alpha:0});
    label('at',285,575,'Login A',A,52,0);label('av',285,670,'verifier A',A,46,0);
    label('ac',285,735,'',A,46,0);
    label('bt',795,575,'Login B',B,52,0);label('bv',795,670,'verifier B',B,46,0);
    label('bc',795,735,'',B,46,0);
    label('host',540,475,'AGENT HOST',C.mid,40);
    s.node('server','box',{x:540,y:1390,w:900,h:320,label:'',color:C.mid});
    label('serverTitle',540,1275,'AUTH SERVER · S256',C.fg,48);
    label('savedA',540,1360,'',A,48);
    label('savedB',540,1450,'',B,48);
    label('stage',540,1740,'',C.fg,52);
    
    label('compare',540,1610,'',C.fg,46,0);
    s.wire('left',[285,800],[285,1205]);s.wire('right',[795,800],[795,1205]);
    set(0,'wire:right','alpha',0);s.set(6.4,'wire:right','alpha',1,.2);s.set(18,'wire:right','alpha',0,.2);
    s.fade(0,1,0);s.fade(.3,0,.4);cue(.3,'ack','C5',.4);
    // 1. Normal transaction A: verifier stays at host; derived challenge travels.
    reveal(1,['a','at','av']);cue(1,'store','C5');
    packet(2,[[285,810],[285,1205]],'hash A',A);
    set(3,'savedA','text','code A ↔ hash A');cue(3,'store','C5');
    packet(3.8,[[285,1205],[285,810]],'code A',A);
    set(4.8,'ac','text','code A');reveal(4.8,['ac']);
    // 2. Concurrent B creates a different pair. Both retained, no global verifier.
    reveal(6.4,['b','bt','bv']);cue(6.4,'store','E5');
    packet(7.2,[[795,810],[795,1205]],'hash B',B,'E5');
    set(8.2,'savedB','text','code B ↔ hash B');cue(8.2,'store','E5');
    packet(9,[[795,1205],[795,810]],'code B',B,'E5');
    set(10,'bc','text','code B');reveal(10,['bc']);
    // 3. Callback bug: code A is paired with B's verifier. Crossed path is causal.
    packet(11.4,[[795,820],[285,1010]],'verifier B',B,'E5',.9);
    set(12.3,'av','text','verifier B');set(12.3,'av','color',B);
    set(12.3,'a','color',B);s.shake(12.3,'a',8,.35);
    set(12.3,'stage','text','code A + verifier B');cue(12.3,'work','E4');
    packet(13,[[285,1010],[540,1205]],'A + verifier B',B,'E5');
    set(14,'savedB','color',C.mid);reveal(14,['compare']);set(14,'compare','text','hash B ≠ hash A');set(14,'compare','color',C.bad);
    set(14,'server','color',C.bad);s.shake(14,'server',12,.4);cue(14,'thump','C3',1);
    set(15.3,'stage','text','invalid_grant');set(15.3,'stage','color',C.bad);
    s.ripple(15.3,[540,1190],C.bad,{mark:'x',r1:75});cue(15.3,'miss','C3',.8);
    // 4. Repair starts a new transaction, never assumes a rejected code is reusable.
    hide(18,['a','at','av','ac','b','bt','bv','bc','compare']);
    set(18,'savedA','text','');set(18,'savedB','text','');set(18,'stage','text','Fresh login C');
    set(18,'stage','color',G);set(18,'server','color',C.mid);cue(18,'poof','C4',.5);
    set(18.5,'a','color',G);set(18.5,'at','text','Login C');set(18.5,'av','text','verifier C');
    ['at','av','ac'].forEach(id=>set(18.5,id,'color',G));set(18.5,'ac','text','');
    reveal(18.5,['a','at','av']);cue(18.5,'recover','G5',.7);
    packet(19.3,[[285,810],[285,1205]],'hash C',G,'G5');
    set(20.3,'savedA','text','code C ↔ hash C');set(20.3,'savedA','color',G);cue(20.3,'store','G5');
    packet(21.1,[[285,1205],[285,810]],'code C',G,'G5');
    reveal(22.1,['ac']);set(22.1,'ac','text','code C');
    // 5. Correct pair passes PKCE. Token assumes all remaining OAuth checks pass.
    packet(23.1,[[285,810],[540,1205]],'C + verifier C',G,'G5');
    reveal(24.1,['compare']);set(24.1,'compare','text','hash C = hash C');set(24.1,'compare','color',G);
    set(24.1,'server','color',G);s.pulse(24.1,'server');cue(24.1,'hit','G5');
    set(24.1,'stage','text','PKCE ✓');
    packet(25.4,[[540,1205],[285,810]],'token',G,'G5');
    set(26.4,'ac','text','token ✓');cue(26.4,'chime','G5',.7);
    // Fixed, silent black endpoints for an exact encoded visual loop.
    s.fade(28.4,1,.5);cue(28.4,'poof','C4',.3);
  }
});

// Independent GPT-6.1 Sol cut. Letters are symbolic attempt identifiers, never literal secrets.
FlowVideo.scene({
  meta: { title: 'OAuth PKCE', subtitle: 'ONE ATTEMPT · ONE VERIFIER', duration: 32, fps: 30, speed: 1 },
  build(s) {
    const C = s.THEME, teal = '#3FB68B', blue = '#66B5FF', orange = '#FFBE55';
    const xs = [290, 790], notes = ['C5', 'E5'];
    const cue = (t, name, lane=0, gain=0.65) => s.sfx(t, name, { note: notes[lane], gain, pan: (xs[lane]-540)/900 });
    const set = (t,id,prop,value,dur=0) => s.set(t,id,prop,value,dur);
    const label = (id,y,text,size=42,color=C.fg) => s.node(id,'label',{x:540,y,text,size,color});
    label('phase',490,'01 · BIND');
    label('clientLabel',560,'Agent host · OAuth client',40);
    label('serverLabel',1190,'Authorization server',40);
    label('endpoint',1500,'',44);
    label('result',1590,'',48);
    label('scenario',1730,'Illustrative sign-in flow',34,C.mid);
    for (let lane=0;lane<2;lane++) {
      s.node('client'+lane,'record',{x:xs[lane],y:735,w:420,h:230,alpha:0});
      s.node('server'+lane,'record',{x:xs[lane],y:1345,w:420,h:230,alpha:0});
      s.wire('lane'+lane,[xs[lane],860],[xs[lane],1220]);
      set(0,'wire:lane'+lane,'alpha',0);
    }
    // The empty stage at both ends guarantees a clean loop in decoded pixels.
    s.fade(0,1,0); s.fade(0.3,0,0.4); cue(0.3,'ack');
    function phase(t,text) {
      set(t,'phase','text',text); set(t,'endpoint','text',''); set(t,'result','text','');
      cue(t,'ack',0,0.5);
    }
    function fresh(t,lane,letter,color) {
      const id='client'+lane;
      set(t,id,'alpha',1,0.25); set(t,id,'color',color);
      set(t,id,'heading','Attempt '+letter); set(t,id,'detail','verifier '+letter);
      set(t,id,'status','PRIVATE'); set(t,id,'statusColor',C.mid);
      set(t,'server'+lane,'alpha',0,0.15); set(t,'wire:lane'+lane,'alpha',0.8,0.2);
      cue(t,'store',lane); s.ripple(t,[xs[lane],610],color,{r1:38});
    }
    function move(t,lane,label,up=false,color=C.fg,dur=0.7,arrive='arrive') {
      // Chips stop above the server header; dotted lanes continue into the records.
      const x=xs[lane], route=up?[[x,1120],[x,890]]:[[x,890],[x,1120]];
      s.packet({t,dur,route,kind:'chip',label,color});
      cue(t,'send',lane,0.75); cue(t+dur,arrive,lane);
      s.ripple(t+dur,route[1],color,{r0:6,r1:40,dur:0.45});
    }
    function bind(t,lane,letter,color) {
      move(t,lane,'S256('+letter+')',false,color);
      const at=t+0.7,id='server'+lane;
      set(at,id,'alpha',1,0.18); set(at,id,'color',color);
      set(at,id,'heading','code '+letter); set(at,id,'detail','S256('+letter+')');
      set(at,id,'status','BOUND'); set(at,id,'statusColor',C.mid);
      // This card is the authorization server's conceptual code/challenge association.
    }
    function code(t,lane,letter,color) {
      move(t,lane,'code '+letter,true,color);
      set(t+0.7,'client'+lane,'status','code '+letter);
      set(t+0.7,'client'+lane,'statusColor',color);
    }
    function exchange(t,lane,codeLetter,verifierLetter,color,ok) {
      set(t,'endpoint','text','TOKEN ENDPOINT'); set(t,'endpoint','color',C.mid);
      move(t,lane,'code '+codeLetter+' + verifier '+verifierLetter,false,color,0.8,'work');
      const at=t+1.25,id='server'+lane;
      set(at,'endpoint','text','S256('+verifierLetter+') '+(ok?'=':'≠')+' S256('+codeLetter+')');
      set(at,'endpoint','color',ok?teal:C.bad);
      set(at,id,'status',ok?'MATCH':'MISMATCH');
      set(at,id,'statusColor',ok?teal:C.bad); set(at,id,'color',ok?teal:C.bad);
      set(at,'result','text',ok?'':'NO TOKEN'); set(at,'result','color',C.bad);
      cue(at,ok?'hit':'thump',lane,ok?0.75:1.1);
      s.ripple(at,[xs[lane],1468],ok?teal:C.bad,{r1:48,mark:ok?'check':'x'});
      if (!ok) s.shake(at,id,12);
    }
    function token(t,lane,letter) {
      move(t,lane,'token '+letter,true,teal,0.7,'chime');
      set(t+0.7,'client'+lane,'status','TOKEN '+letter); set(t+0.7,'client'+lane,'statusColor',teal);
      set(t+0.7,'server'+lane,'status','CODE USED');
      set(t+0.7,'result','text','TOKEN ISSUED'); set(t+0.7,'result','color',teal);
    }
    // 1. Normal binding: a private verifier and a transformed public challenge.
    fresh(0.9,0,'A',teal); bind(2.0,0,'A',teal); code(3.6,0,'A',teal);
    // 2. Normal exchange: comparison first, token second.
    phase(5.3,'02 · EXCHANGE'); exchange(5.6,0,'A','A',teal,true); token(7.3,0,'A');
    // 3. Two sign-ins overlap. No global shared verifier slot exists in a correct client.
    phase(10.0,'03 · OVERLAP'); fresh(10.25,0,'B',blue); fresh(10.8,1,'C',orange);
    bind(11.4,0,'B',blue); bind(12.3,1,'C',orange);
    code(13.4,0,'B',blue); code(14.3,1,'C',orange);
    // 4. Illustrative client bug: the B exchange takes C's verifier.
    phase(16.0,'04 · WRONG PAIR');
    s.packet({t:16.1,dur:0.85,route:[[790,885],[290,885]],kind:'chip',label:'verifier C',color:orange});
    cue(16.1,'send',1); cue(16.95,'miss',0,0.9);
    set(16.95,'client0','detail','verifier C'); set(16.95,'client0','color',orange);
    set(16.95,'client0','statusColor',C.bad); s.shake(16.95,'client0',8);
    exchange(17.5,0,'B','C',orange,false);
    move(19.6,0,'invalid_grant',true,C.bad,0.7,'miss');
    set(20.3,'client0','status','REJECTED'); set(20.3,'client0','statusColor',C.bad);
    // 5. Restart with a NEW authorization attempt, avoiding assumptions about failed-code reuse.
    phase(22.0,'05 · FRESH ATTEMPT');
    set(22,'client1','alpha',0,0.3); set(22,'server1','alpha',0,0.3);
    set(22,'wire:lane1','alpha',0,0.3); cue(22,'poof',1);
    fresh(22.2,0,'D',teal); bind(22.9,0,'D',teal); code(23.9,0,'D',teal);
    exchange(25.0,0,'D','D',teal,true); token(26.9,0,'D');
    s.fade(30.5,1,0.7); cue(30.5,'poof',0,0.4);
  }
});

// Independently authored by gpt-6-astra, high reasoning, 2026-10-19.
// A serialized recovery example, not a consistency or authorization guarantee.
FlowVideo.scene({
  meta: {title:'Cache-aside', subtitle:'RUNBOOK FRESHNESS', duration:31, fps:30, speed:1, edgeBlank:true, fadeAll:true},
  build(s) {
    const C=s.THEME;
    s.node('agent','record',{x:540,y:625,w:380,h:200,label:'AGENT',value:'—',color:C.mid});
    s.node('tool','box',{x:540,y:935,w:380,h:130,label:'READ TOOL',labelSize:46,color:C.mid});
    s.node('cache','record',{x:265,y:1320,w:360,h:220,label:'CACHE',value:'v1',color:C.ok,detail:'guide'});
    s.node('source','record',{x:815,y:1320,w:360,h:220,label:'SOURCE',value:'v1',color:C.ok,detail:'guide'});
    s.node('status','label',{x:540,y:1630,text:'',size:64,weight:700,color:C.ok});
    s.node('note','label',{x:540,y:1730,text:'',size:42,color:C.mid});
    const A=['agent.bottom','tool.top'];
    const K=['tool.bottom',[540,1090],[265,1090],'cache.top'];
    const D=['tool.bottom',[540,1090],[815,1090],'source.top'];
    s.wire('agent',A[0],A[1]);
    s.wire('cache',K[0],K[3],{via:K.slice(1,3)});
    s.wire('source',D[0],D[3],{via:D.slice(1,3)});
    const rev=a=>[...a].reverse();
    const pitch=id=>id==='cache'?'E5':id==='source'?'G5':'C5';
    function cue(t,name,id,gain=0.8){s.sfx(t,name,{note:pitch(id),pan:s.panOf(id),gain});}
    function state(t,id,prop,value,color){s.set(t,id,prop,value,0);if(color)s.set(t,id,'color',color,0);}
    function status(t,text,color=C.ok,note=''){state(t,'status','text',text,color);state(t,'note','text',note);}
    function move(t,route,label,color=C.fg,arrive='arrive',target='tool',dur=0.75) {
      s.packet({t,route,label,color,kind:'chip',dur});
      s.sfx(t,'send',{note:'C6',pan:s.panOf(route[0]),gain:0.55});
      cue(t+dur,arrive,target);
      s.pulse(t+dur,target);
      s.ripple(t+dur,route[route.length-1],color,{r0:10,r1:40,dur:0.4});
    }
    function received(t,value,color,caption){state(t,'agent','value',value,color);s.set(t,'agent','valueColor',color,0);status(t,caption,color);}
    s.fade(0,1,0);s.fade(0.25,0,0.55);s.sfx(0.25,'recover',{gain:0.25,note:'C4'});
    // 1. A warm cache supplies a matching revision without a source read.
    move(0.9,A,'GET'); move(1.8,K,'GET',C.fg,'hit','cache');
    status(2.55,'HIT',C.ok); move(2.8,rev(K),'v1',C.ok);
    move(3.7,rev(A),'v1',C.ok,'deliver','agent');received(4.45,'v1',C.ok,'HIT v1');
    // 2. An external edit does not automatically invalidate the cache.
    state(6.4,'source','value','v2',C.accent);s.set(6.4,'source','valueColor',C.accent,0);
    s.pulse(6.4,'source');cue(6.4,'store','source');status(6.4,'EDIT v2',C.accent);
    s.ripple(6.4,'source.top',C.accent,{r1:65});
    move(8.3,A,'GET');move(9.2,K,'GET',C.fg,'hit','cache');
    status(9.95,'HIT',C.ok);move(10.15,rev(K),'v1',C.accent);
    move(11.05,rev(A),'v1',C.accent,'thump','agent');
    received(11.8,'v1',C.bad,'HIT ≠ FRESH');s.shake(11.8,'agent',9,0.4);
    state(11.8,'cache','color',C.bad);s.set(11.8,'cache','valueColor',C.bad,0);
    // 3. Recovery explicitly deletes the stale key, after the source commit.
    move(14.1,K,'DEL',C.bad,'poof','cache');
    state(14.85,'cache','value','∅',C.mid);s.set(14.85,'cache','valueColor',C.mid,0);
    status(14.85,'INVALIDATE',C.accent);state(14.85,'note','text','key: guide');
    // 4. A miss makes the tool fetch the source, then populate the cache.
    move(17.0,A,'GET');move(17.9,K,'GET',C.fg,'miss','cache');
    status(18.65,'MISS',C.accent);
    move(18.85,rev(K),'MISS',C.accent);move(19.75,D,'GET',C.accent,'work','source');
    status(20.5,'READ SOURCE',C.accent);move(20.7,rev(D),'v2',C.ok);
    move(21.6,K,'SET v2',C.ok,'store','cache');
    state(22.35,'cache','value','v2',C.ok);s.set(22.35,'cache','valueColor',C.ok,0);
    status(22.35,'REFILL v2',C.ok);
    move(22.6,rev(A),'v2',C.ok,'deliver','agent');received(23.35,'v2',C.ok,'REFILL v2');
    state(23.35,'source','color',C.ok);s.set(23.35,'source','valueColor',C.ok,0);
    // 5. Reuse the updated entry. No promise of future consistency.
    move(25.0,A,'GET');move(25.85,K,'GET',C.fg,'hit','cache');
    status(26.6,'HIT v2',C.ok);move(26.7,rev(K),'v2',C.ok);
    move(27.5,rev(A),'v2',C.ok,'deliver','agent');
    s.fade(30.1,1,0.5);s.sfx(30.1,'poof',{gain:0.25,note:'C5'});
  }
});

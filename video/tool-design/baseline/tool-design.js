FlowVideo.scene({meta:{title:'',subtitle:'',duration:25,fps:30},build(s){
 const T=s.THEME;
 s.node('agent','box',{x:540,y:560,w:330,h:130,label:'Agent',labelSize:44});
 s.node('outcome','badge',{x:540,y:710,text:''});
 s.node('tool','box',{x:540,y:1000,w:650,h:160,label:'search_incidents',labelSize:44,sublabel:'service · start_time · limit'});
 s.node('args','label',{x:540,y:1750,text:'',size:32,mono:true});
 s.node('db','db',{x:540,y:1400,w:250,h:180,label:'Incidents'});
 s.node('data','badge',{x:540,y:1620,text:'',color:T.ok});
 s.wire('call','agent.bottom','tool.top');
 s.wire('query','tool.bottom','db.top');
 s.wire('return','tool.left','agent.left',{via:[[130,1000],[130,560]]});
 s.fade(0,1,0);s.fade(.04,0,.35);s.fade(24,1,.6);
 const move=(t,route,label,color,note)=>{s.packet({t,route,label,kind:label?'chip':'envelope',dur:.7,color});s.sfx(t,'send',{note,gain:.5});s.sfx(t+.7,'arrive',{note,gain:.65});};
 const call=(t,args)=>{s.set(t,'outcome','text','',0);s.set(t,'agent','color',T.accent,.15);s.set(t,'args','text',args,0);move(t,['agent.bottom','tool.top'],'',T.accent,'C5');s.set(t+.7,'tool','color',T.accent,.1);move(t+1,['tool.bottom','db.top'],'',T.accent,'E5');s.set(t+1.7,'db','busy',1,.1);};
 const reply=(t,label,color)=>{s.set(t,'db','busy',0,.1);s.set(t,'tool','color',color,.15);move(t,['tool.left',[130,1000],[130,560],'agent.left'],'',color,'G5');s.set(t+.7,'outcome','text',label,0);s.set(t+.7,'outcome','color',color,0);s.set(t+.7,'agent','color',color,.15);s.ripple(t+.7,'agent.top',color,{r1:50,mark:color===T.bad?'x':'check'});s.sfx(t+.7,color===T.bad?'thump':'deliver',{note:color===T.bad?'C3':'G5'});};
 call(1,'web · 09:00 · 3');
 s.set(3,'db','busy',0,0);s.set(3,'data','text','[]',0);s.sfx(3,'hit',{gain:.65});move(3.3,['db.top','tool.bottom'],'[]',T.ok,'E5');reply(4.4,'OK · []',T.ok);
 // A later search fails: no empty-result success is manufactured.
 s.set(7.4,'data','text','',0);call(7.4,'api · 09:00 · 3');
 s.set(9.5,'db','color',T.bad,.1);s.set(9.5,'db','busy',0,0);s.shake(9.5,'db',12);s.ripple(9.5,'db.top',T.bad,{mark:'x',r1:60});s.sfx(9.5,'crash',{gain:.65});
 s.set(9.5,'wire:query','color',T.bad,.1);s.set(9.5,'data','text','TIMEOUT',0);s.set(9.5,'data','color',T.bad,0);reply(10.6,'ERROR · TIMEOUT',T.bad);
 // The agent explicitly retries this read-only lookup after a pause.
 s.set(13.6,'outcome','text','RETRY · 1',0);s.set(13.6,'outcome','color',T.accent,0);s.pulse(13.6,'agent',T.accent);s.sfx(13.6,'clock',{gain:.9});
 s.set(15,'db','color',T.mid,.3);s.set(15,'wire:query','color',T.wire,.3);s.set(15,'data','text','',0);s.sfx(15,'recover',{gain:.6});s.ripple(15,'db.top',T.ok,{r1:45});
 call(16,'api · 09:00 · 3');s.set(18,'db','busy',0,0);s.set(18,'data','text','INC-42',0);s.set(18,'db','busy',0,0);s.set(18,'data','color',T.ok,0);s.sfx(18,'store');
 move(18.3,['db.top','tool.bottom'],'INC-42',T.ok,'E5');reply(19.5,'OK · [INC-42]',T.ok);s.sfx(20.2,'chime',{gain:.65});
 s.set(22,'args','text','',0);s.set(22,'tool','color',T.mid,.2);s.pulse(22,'agent',T.ok);s.sfx(22,'ack',{note:'G5'});
}});

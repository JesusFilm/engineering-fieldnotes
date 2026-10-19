FlowVideo.scene({meta:{title:'Memory',subtitle:'SCOPE & REFRESH',editedBy:'gpt-6-astra comparative review',duration:26,fps:30},build(s){
const T=s.THEME;
s.node('agent','box',{x:540,y:590,w:370,h:160,label:'Agent · A',sublabel:'context: —'});
s.node('thread','store',{x:280,y:1110,w:390,rows:2,label:'Thread A',sublabel:'checkpoint'});
s.node('memory','store',{x:790,y:1110,w:390,rows:2,label:'Durable memory',sublabel:'repo / convention'});
s.node('source','box',{x:790,y:1630,w:380,h:150,label:'Approved source',sublabel:'STYLE.md · r1',labelSize:32});
s.wire('thread','agent.left','thread.top',{via:[[280,590]]});
s.wire('memory','agent.right','memory.top',{via:[[790,590]]});
s.wire('write','source.left','memory.left',{via:[[540,1630],[540,1110]]});
s.fade(0,1,0);s.fade(.1,0,.4);s.fade(25,1,.5);
function move(t,route,label,note='G5',color=T.ok){s.packet({t,route,label,kind:'chip',dur:.8,color});s.sfx(t,'send',{note,gain:.6,pan:s.panOf(route[0])});s.sfx(t+.8,'arrive',{note,pan:s.panOf(route.at(-1))});}
function row(t,id,i,text,color=T.ok){s.set(t,id,'row'+i+'Text',text,0);s.set(t,id,'row'+i+'Color',color,.15);s.pulse(t,id);}
move(1,['agent.left',[280,590],'thread.top'],'note','C5',T.accent);
row(1.8,'thread',0,'debug: retry',T.accent);row(1.8,'thread',1,'task: #42',T.accent);
s.sfx(1.8,'store',{note:'C5',pan:-.6});
move(4.1,['source.left',[540,1630],[540,1110],'memory.left'],'r1','G5');row(4.9,'memory',0,'indent: 2');row(4.9,'memory',1,'STYLE.md @r1');s.sfx(4.9,'store',{note:'G5',pan:.6});
move(6.7,['memory.top',[790,590],'agent.right'],'2 · r1');s.set(7.5,'agent','sublabel','indent: 2 · r1',0);s.pulse(7.5,'agent');
// New thread: A remains persisted but is outside B's scope.
s.set(10,'agent','label','Agent · B',0);s.set(10,'agent','sublabel','context: —',0);s.set(10,'thread','alpha',.75,.4);s.set(10,'wire:thread','alpha',.15,.4);s.shake(10,'agent',6);s.sfx(10,'recover',{note:'E5'});
move(12,['agent.right',[790,590],'memory.top'],'GET','E5',T.fg);
move(13,['memory.top',[790,590],'agent.right'],'2 · r1');s.set(13.8,'agent','sublabel','indent: 2 · r1',0);s.set(13.8,'agent','color',T.ok,.2);s.sfx(13.8,'hit',{note:'E5'});
s.set(16,'source','sublabel','STYLE.md · r2',0);s.pulse(16,'source',T.accent);s.sfx(16,'work',{note:'G5'});
move(16.6,['source.left',[540,1630],[540,1110],'memory.left'],'r2','G5',T.accent);
row(17.4,'memory',0,'indent: 4');row(17.4,'memory',1,'STYLE.md @r2');s.sfx(17.4,'store',{note:'G5',pan:.6});
s.set(17.4,'agent','color',T.accent,.2);s.set(17.4,'agent','subColor',T.accent,.2);s.pulse(17.4,'agent');
// Context stays on r1 until this explicit fetch; no automatic invalidation implied.
move(19.4,['agent.right',[790,590],'memory.top'],'GET','E5',T.fg);
move(20.5,['memory.top',[790,590],'agent.right'],'4 · r2');
s.set(21.3,'agent','color',T.ok,.2);s.set(21.3,'agent','subColor',T.fg,.2);s.set(21.3,'agent','sublabel','indent: 4 · r2',0);s.pulse(21.3,'agent');s.sfx(21.3,'chime',{note:'E5'});
}});

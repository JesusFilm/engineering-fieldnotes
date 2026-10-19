// Two runs: three iterations exhaust the budget; two iterations complete early.
FlowVideo.scene({meta:{title:'',subtitle:'',duration:25,fps:30},build(s){
 const T=s.THEME;
 s.node('budget','bar',{x:540,y:490,w:360,h:20,ticks:3,label:'Budget',seg0:1,seg0Color:T.accent});
 s.node('agent','box',{x:540,y:720,w:280,label:'Agent'});
 s.node('tool','box',{x:810,y:1060,w:240,label:'Tool'});
 s.node('result','box',{x:540,y:1400,w:280,label:'Result'});
 s.node('stop','box',{x:240,y:1060,w:220,label:'Stop',alpha:.3});
 s.node('complete','box',{x:540,y:1660,w:280,label:'Complete',alpha:.3});
 s.wire('at','agent.right','tool.top');s.wire('tr','tool.bottom','result.right');
 s.wire('ra','result.left','agent.left',{via:[[110,1400],[110,720]]});
 s.wire('stop','agent.bottom','stop.top');s.set(0,'wire:stop','alpha',.25,0);
 s.wire('done','result.bottom','complete.top');s.set(0,'wire:done','alpha',.25,0);
 s.fade(0,1,0);s.fade(.03,0,.3);s.fade(24,1,.6);
 const move=(t,route,note,color=T.fg)=>{s.packet({t,route,dur:.6,color});s.sfx(t,'send',{note,gain:.55,pan:s.panOf(route[0])});const dest=route.at(-1).split('.')[0];s.pulse(t+.6,dest);s.sfx(t+.6,'arrive',{note,pan:s.panOf(route.at(-1))});};
 const cycle=(t,remaining,again)=>{
 s.set(t,'agent','color',T.accent,.1);s.set(t,'budget','seg0',remaining,.5);s.sfx(t,'clock',{gain:.8});
 move(t+.2,['agent.right','tool.top'],'E5');s.set(t+.8,'tool','color',T.accent,.1);s.sfx(t+1,'work',{pan:.5});s.set(t+1.15,'tool','color',T.mid,.2);
 move(t+1.2,['tool.bottom','result.right'],'G5');s.set(t+1.8,'result','color',T.ok,.15);s.set(t+1.8,'agent','color',T.mid,.2);
 if(again){move(t+2,['result.left',[110,1400],[110,720],'agent.left'],'C5');s.set(t+2.6,'result','color',T.mid,.2);}
 };
 cycle(1,2/3,true);cycle(4,1/3,true);cycle(7,0,true);
 s.set(9.7,'budget','seg0Color',T.bad,0);s.set(9.7,'budget','color',T.bad,.1);s.sfx(9.7,'thump');
 move(9.8,['agent.bottom','stop.top'],'C4',T.bad);s.set(10.4,'stop','alpha',1,.1);s.set(10.4,'stop','color',T.bad,.1);s.set(10.4,'wire:stop','alpha',1,.1);s.ripple(10.4,'stop.top',T.bad,{mark:'x',r1:55});s.sfx(10.4,'thump',{pan:-.5});
 // Reset between independent runs; both budget and stop clear visibly.
 s.set(13,'budget','seg0',1,.4);s.set(13,'budget','seg0Color',T.accent,0);s.set(13,'budget','color',T.dim,.2);s.set(13,'stop','alpha',.3,.2);s.set(13,'stop','color',T.mid,.2);s.set(13,'wire:stop','alpha',.25,.2);s.set(13,'agent','color',T.mid,.2);s.sfx(13,'recover');
 cycle(14,2/3,true);cycle(17,1/3,false);
 move(19,['result.bottom','complete.top'],'C6',T.ok);s.set(19.6,'complete','alpha',1,.1);s.set(19.6,'complete','color',T.ok,.1);s.set(19.6,'wire:done','alpha',1,.1);s.ripple(19.6,'complete.top',T.ok,{mark:'check',r1:55});s.sfx(19.6,'chime');
 s.set(20,'wire:ra','alpha',.2,.2);s.set(20,'agent','alpha',.3,.2);s.set(20,'tool','alpha',.3,.2);
}});

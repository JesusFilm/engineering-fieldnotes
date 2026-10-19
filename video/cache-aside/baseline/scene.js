// Edited by gpt-6-astra comparative review: title, caller/TTL identity and continuous lifetime drain. Original author unrecorded.
// Cache-aside: the app owns reads and refill. No direct cache/database wire.
FlowVideo.scene({meta:{title:'Cache-aside',subtitle:'MISS · HIT · EXPIRY',duration:24,fps:30},build(s){
 const T=s.THEME;
 s.node('client','laptop',{x:540,y:600});
 s.node('callerLabel','label',{x:540,y:510,text:'Caller',size:36});
 s.node('ttlLabel','label',{x:280,y:1430,text:'TTL',size:36});
 s.node('app','box',{x:540,y:900,w:320,label:'App'});
 s.node('cache','box',{x:280,y:1250,w:280,label:'Cache'});
 s.node('entry','bar',{x:280,y:1370,w:240,h:18,seg0:0,seg0Color:T.ok});
 s.node('db','db',{x:800,y:1250,w:200,h:180,label:'Database'});
 s.node('clock','clock',{x:280,y:1530,r:32,alpha:0});
 s.wire('request','client.bottom','app.top');
 s.wire('lookup','app.bottom','cache.top');
 s.wire('query','app.right','db.top');
 s.fade(0,1,0); s.fade(.03,0,.3); s.fade(23,1,.6);
 const move=(t,a,b,color,note)=>{s.packet({t,route:[a,b],dur:.55,color});s.sfx(t,'send',{note,gain:.6,pan:s.panOf(a)});s.pulse(t+.55,b.split('.')[0]);s.sfx(t+.55,'arrive',{note,gain:.65,pan:s.panOf(b)});};
 const request=t=>{move(t,'client.bottom','app.top',T.fg,'C5');move(t+.75,'app.bottom','cache.top',T.fg,'G5');};
 const reply=t=>{move(t,'app.top','client.bottom',T.ok,'C6');s.sfx(t+.55,'deliver',{note:'C6',gain:.7});};
 const miss=t=>{s.ripple(t,'cache.top',T.bad,{mark:'x',r1:55});s.shake(t,'cache',7,.3);s.sfx(t,'miss',{pan:-.5});move(t+.3,'cache.top','app.bottom',T.bad,'G4');move(t+1,'app.right','db.top',T.accent,'E4');s.set(t+1.55,'db','busy',1,.1);for(let k=0;k<5;k++)s.sfx(t+1.55+k*.2,'work',{pan:.5});s.set(t+2.55,'db','busy',0,.1);move(t+2.55,'db.top','app.right',T.accent,'E5');move(t+3.3,'app.bottom','cache.top',T.ok,'G5');s.set(t+3.85,'entry','seg0',1,0);s.set(t+3.85,'entry','seg0',0,8.65,'linear');s.set(t+3.85,'cache','color',T.ok,.2);s.sfx(t+3.85,'store',{pan:-.5});reply(t+4.05);};
 request(.6);miss(2);
 request(8.6);s.set(9.3,'db','alpha',.3,.2);s.set(9.3,'wire:query','alpha',.3,.2);
 s.ripple(10,'cache.top',T.ok,{mark:'check',r1:55});s.sfx(10,'hit',{pan:-.5});move(10.2,'cache.top','app.bottom',T.ok,'G5');reply(10.9);
 s.set(13,'clock','alpha',1,.2);s.set(13,'clock','time',6,1.5);for(let i=0;i<7;i++)s.sfx(13+i*.2,'clock',{pan:-.5});
 s.set(14.5,'cache','color',T.mid,.1);s.ripple(14.5,'cache',T.bad,{r1:160});s.sfx(14.5,'poof',{pan:-.5});s.set(14.8,'clock','alpha',0,.3);
 s.set(15.5,'db','alpha',1,.2);s.set(15.5,'wire:query','alpha',1,.2);request(16);miss(17.4);
}});

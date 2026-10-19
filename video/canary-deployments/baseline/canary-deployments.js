FlowVideo.scene({
 meta: {title:'Canary',subtitle:'DEPLOYMENTS',duration:26,fps:30},
 build(s){
 const T=s.THEME;
 s.node('client','laptop',{x:540,y:600});
 s.node('clientLabel','label',{x:540,y:490,text:'Production traffic',size:38});
 s.node('router','box',{x:540,y:870,w:380,h:140,label:'Traffic router',labelSize:38,ports:2,pointer:0});
 s.node('share','bar',{x:540,y:1040,w:650,h:24,segments:2,seg0:1,seg1:0,seg0Color:T.ok,seg1Color:T.accent});
 s.node('p0','label',{x:280,y:1100,text:'100%',size:42,color:T.ok});
 s.node('p1','label',{x:800,y:1100,text:'0%',size:42,color:T.accent});
 s.node('stable','rack',{x:280,y:1320,label:'v1 · control'});
 s.node('candidate','rack',{x:800,y:1320,label:'v2 · canary',alpha:0.3});
 s.node('m0','label',{x:280,y:1510,text:'p95 120 ms',size:38,color:T.ok});
 s.node('m1','label',{x:800,y:1510,text:'p95 —',size:38,color:T.mid});
 s.node('gate','badge',{x:540,y:1640,text:'',color:T.bad});
 s.wire('in','client.bottom','router.top');
 // The branches skirt the share indicator so packets never cross its text.
 const routes=[['router.port0',[160,980],[160,1160],'stable.top'],['router.port1',[920,980],[920,1160],'candidate.top']];
 routes.forEach((r,i)=>s.wire('out'+i,r[0],r[3],{via:[r[1],r[2]]}));
 s.set(0,'wire:out1','alpha',0.3,0);
 s.fade(0,1,0);s.fade(0.4,0,0.6);
 function request(t,i,slow=false){
 const id=i?'candidate':'stable', col=i?T.accent:T.ok;
 s.packet({route:['client.bottom','router.top'],t,dur:0.2,kind:'dot',color:col});
 s.sfx(t,'send',{note:i?'G6':'C6',gain:0.35});
 s.set(t+0.2,'router','pointer',i,0.1);
 s.packet({route:routes[i],t:t+0.2,dur:0.28,color:col});
 s.slot(t+0.48,id,0,'busy',0.08);
 s.sfx(t+0.48,'arrive',{note:i?'G5':'C5',gain:i?0.8:0.4,pan:s.panOf(id)});
 s.slot(t+0.48+(slow?0.9:0.12),id,0,'done',0.08);
 s.sfx(t+0.48+(slow?0.9:0.12),'deliver',{note:i?'G4':'C5',gain:0.35,pan:s.panOf(id)});
 s.slot(t+0.7+(slow?0.9:0.12),id,0,'idle',0.15);
 }
 [1.2,2,2.8].forEach(t=>request(t,0));
 s.set(5,'share','seg0',0.8,0.6);s.set(5,'share','seg1',0.2,0.6);
 s.set(5,'p0','text','80%',0);s.set(5,'p1','text','20%',0);
 s.set(5,'candidate','alpha',1,0.4);s.set(5,'wire:out1','alpha',1,0.4);
 s.pulse(5,'router',T.accent);s.sfx(5,'store',{note:'G5',gain:0.7});
 // Three complete 4:1 cycles, not a statistical sample. Telemetry is a compressed observation window.
 for(let k=0;k<15;k++)request(6+k*0.5,k%5===4?1:0,k%5===4);
 s.set(9.4,'m1','text','p95 900 ms',0);s.set(9.4,'m1','color',T.accent,0);
 s.sfx(9.4,'clock',{gain:0.7});
 s.set(15.2,'m1','color',T.bad,0);s.set(15.2,'gate','text','900 / 120 = 7.5×',0);
 s.shake(15.2,'m1',8,0.4);
 s.sfx(15.2,'miss',{note:'G3',gain:1});
 s.set(17.4,'gate','text','ROLLBACK',0);s.sfx(17.4,'recover',{note:'C5',gain:0.8});
 s.packet({route:[[540,1580],[540,1170],[1010,1170],[1010,870],'router.right'],t:17.4,dur:0.6,kind:'dot',color:T.bad});
 s.set(18,'share','seg0',1,0.5);s.set(18,'share','seg1',0,0.5);
 s.set(18,'p0','text','100%',0);s.set(18,'p1','text','0%',0);
 s.set(18,'wire:out1','alpha',0.2,0.5);s.set(18,'candidate','alpha',0.3,0.5);
 s.set(18,'router','pointer',0,0.2);s.pulse(18,'router',T.ok);s.sfx(18,'chime',{note:'C5'});
 [19,19.8,20.6,21.4].forEach(t=>request(t,0));
 s.fade(24,1,0.65);
 }
});

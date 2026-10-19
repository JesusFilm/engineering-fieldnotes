// One local ACID transaction contains order + idempotency result. No external payment.
FlowVideo.scene({
 meta:{fullFrameFade:true,title:'Idempotency',subtitle:'REQUEST KEYS',duration:26,fps:30,speed:1},
 build(s){
 const T=s.THEME;
 s.node('client','laptop',{x:540,y:590});
 s.node('cl','label',{x:540,y:490,text:'Checkout client',size:34});
 s.node('api','box',{x:540,y:920,w:400,h:120,label:'Order API',labelSize:40});
 s.node('db','store',{x:540,y:1280,w:700,rows:2,label:'Database · atomic commit'});
 s.node('count','badge',{x:540,y:1530,text:'orders: 0',color:T.mid});
 s.node('status','badge',{x:830,y:590,text:'',color:T.mid});
 s.node('phase','badge',{x:540,y:1690,text:'',color:T.mid});
 s.wire('req','client.bottom','api.top');
 s.wire('db','api.bottom','db.top');
 s.fade(0,1,0);s.fade(.3,0,.5);s.fade(24.7,1,.7);
 const state=(t,id,text,color)=>{s.set(t,id,'text',text,0);s.set(t,id,'color',color,0);};
 const chip=(t,label,route,color=T.fg,dur=.7)=>s.packet({t,label,route,color,dur,kind:'chip'});
 const request=(t,cart)=>{
 state(t,'status','',T.mid);state(t,'phase',cart==='A'?'K7 · cart A':'K7 · cart B',T.accent);
 s.pulse(t,'client');s.sfx(t,'send',{note:'C6',gain:.65});
 chip(t,'K7 · cart '+cart,['client.bottom','api.top']);
 s.pulse(t+.7,'api');s.sfx(t+.7,'arrive',{note:'E5',gain:.65});
 };
 const lookup=t=>{
 chip(t,'K7?',['api.bottom','db.top']);s.sfx(t,'send',{note:'E6',gain:.5});
 s.pulse(t+.7,'db');
 };
 // 1. First request creates both durable records in the same commit.
 request(1.2,'A');lookup(2.2);
 state(2.9,'phase','MISS',T.accent);s.sfx(2.9,'miss',{note:'G4',gain:.6});
 chip(3.5,'COMMIT',['api.bottom','db.top'],T.accent);
 s.sfx(3.5,'work',{note:'E4',gain:.6});
 for(let i=0;i<2;i++){
 s.set(4.2,'db','row'+i+'Text',i===0?'order: O42 · cart A':'key: K7 → O42',0);
 s.set(4.2,'db','row'+i+'Color',T.ok,0);s.set(4.2,'db','row'+i+'Fill',1,.25);
 }
 s.pulse(4.2,'db',T.ok);s.sfx(4.2,'store',{note:'G5',gain:.85});
 state(4.2,'count','orders: 1',T.ok);state(4.2,'phase','COMMITTED',T.ok);
 // 2. Only the response is lost; durable rows remain green.
 chip(6.3,'O42',['db.top','api.bottom'],T.ok);s.sfx(6.3,'send',{note:'G6',gain:.5});
 s.sfx(7,'arrive',{note:'E5',gain:.6});
 chip(7.2,'O42',['api.top',[540,745]],T.ok,.5);
 s.sfx(7.2,'send',{note:'E6',gain:.45});
 s.ripple(7.7,[540,745],T.bad,{mark:'x',r1:65});s.sfx(7.7,'crash',{gain:.7});
 state(7.7,'status','TIMEOUT',T.bad);state(7.7,'phase','',T.mid);
 // 3. Same key and payload replay the stored result, no mutation.
 request(10,'A');lookup(11);
 state(11.7,'phase','HIT',T.ok);s.sfx(11.7,'hit',{note:'G5',gain:.75});
 s.set(11.7,'db','row1Color',T.fg,.1);s.set(12.2,'db','row1Color',T.ok,.3);
 chip(12.5,'O42',['db.top','api.bottom'],T.ok);s.sfx(12.5,'send',{note:'G6',gain:.5});
 s.sfx(13.2,'arrive',{note:'E5',gain:.55});
 chip(13.4,'O42',['api.top','client.bottom'],T.ok);s.sfx(13.4,'send',{note:'E6',gain:.5});
 s.pulse(14.1,'client',T.ok);s.sfx(14.1,'deliver',{note:'C6',gain:.8});
 state(14.1,'status','O42',T.ok);state(14.1,'phase','REPLAY',T.ok);
 // 4. Same key with a different cart is rejected, rows and count unchanged.
 request(17,'B');lookup(18);
 state(18.7,'phase','MISMATCH',T.bad);s.sfx(18.7,'thump',{note:'G4',gain:.8});
 s.shake(18.7,'api',9,.4);s.ripple(18.7,[825,920],T.bad,{r1:45,mark:'x'});
 chip(19.5,'CONFLICT',['api.top','client.bottom'],T.bad);s.sfx(19.5,'send',{note:'E5',gain:.6});
 state(20.2,'status','CONFLICT',T.bad);s.pulse(20.2,'client',T.bad);s.sfx(20.2,'thump',{note:'C4',gain:.7});
 s.pulse(22.1,'db',T.ok);s.pulse(22.1,'count',T.ok);s.sfx(22.1,'chime',{note:'G5',gain:.65});
 }
});

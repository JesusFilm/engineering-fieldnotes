// Safe read: a deadline ends client waiting, not remote execution.
FlowVideo.scene({
 meta:{title:'Timeouts',subtitle:'BOUNDED RETRIES',duration:24,fps:30,speed:1},
 build(s){
  const T=s.THEME;
  s.node('client','box',{x:540,y:610,w:340,h:120,label:'Client',labelSize:42});
  s.node('state','badge',{x:230,y:760,text:'READY',color:T.mid});
  s.node('server','rack',{x:540,y:1240,slots:1,label:'Read API'});
  s.node('job','badge',{x:540,y:1390,text:'IDLE',color:T.mid});
  s.node('timer','bar',{x:230,y:930,w:280,h:20,ticks:true,label:'Attempt deadline',seg0:0,seg0Color:T.accent});
  s.node('count','badge',{x:830,y:610,text:'1 / 2',color:T.mid});
  s.node('countLabel','label',{x:830,y:690,text:'Attempts · max 2',size:30});
  s.node('delay','bar',{x:540,y:1580,w:560,h:20,ticks:true,label:'Backoff + jitter',alpha:0,seg0:0,seg0Color:T.accent});
  s.node('clock','clock',{x:540,y:1740,r:38,alpha:0});
  s.wire('request','client.bottom','server.top');
  s.wire('reply','server.right',[780,760],{via:[[780,1240]]});
  const state=(t,id,text,color)=>{s.set(t,id,'text',text,0);s.set(t,id,'color',color,0);};
  const req=(t,n,slow)=>{
    state(t,'count',n+' / 2',T.accent);state(t,'state','WAIT',T.accent);
    s.set(t,'timer','seg0',0,0);s.set(t,'timer','seg0Color',T.accent,0);
    s.set(t,'timer','seg0',slow?1:0.87,slow?3:2.6,'linear');
    s.packet({route:['client.bottom','server.top'],kind:'chip',label:'GET /item/42',t,dur:0.8,color:T.fg});
    s.sfx(t,'send',{note:'E6'});s.pulse(t,'client');
    s.slot(t+0.8,'server',0,'busy');state(t+0.8,'job','WORKING',T.accent);s.sfx(t+0.8,'arrive',{note:'C5'});
  };
  const done=(t)=>{s.slot(t,'server',0,'done');state(t,'job','200 OK',T.ok);s.sfx(t,'store',{note:'C5',gain:0.5});};
  const reply=(t,late)=>{
    s.packet({route:['server.right',[780,1240],[780,760]],kind:'chip',label:'200 OK',t,dur:1,color:late?T.mid:T.ok});
    s.sfx(t,'send',{note:'C6'});
    if(late){s.ripple(t+1,[780,760],T.bad,{mark:'x',r1:60});s.sfx(t+1,'thump',{gain:0.7});}
    else {state(t+1,'state','200 OK',T.ok);s.ripple(t+1,[540,485],T.ok,{mark:'check',r1:38});s.sfx(t+1,'deliver',{note:'E5'});}
  };
  s.fade(0,1,0);s.fade(0.4,0,0.5);
  // Beat 1: ordinary read completes before the timer fills.
  req(1.2,1,false);done(2.7);reply(2.8,false);
  // Beat 2: clear the completed operation, start another independent read.
  state(6,'job','IDLE',T.mid);s.slot(6,'server',0,'idle');
  req(7,1,true);
  for(let t=8;t<12;t+=0.5){s.sfx(t,'work',{note:'C4',gain:0.45});s.pulse(t,'server');}
  // Beat 3: local deadline, server deliberately remains busy.
  state(10,'state','TIMEOUT',T.bad);s.set(10,'timer','seg0Color',T.bad,0);
  s.shake(10,'client',10);s.sfx(10,'miss',{gain:1.1});
  s.set(10,'delay','alpha',1,0.2);s.set(10,'delay','seg0',1,6,'linear');
  s.set(10,'clock','alpha',1,0.2);s.set(10,'clock','time',12,6,'linear');
  // Beat 4: backend finishes; the expired attempt's response is ignored.
  done(12);reply(12.2,true);
  for(const t of [10.5,11.5,14,15])s.sfx(t,'clock',{gain:0.5});
  // Beat 5: one bounded retry of the same read after backoff.
  s.set(16,'clock','alpha',0,0.3);s.set(16,'delay','seg0Color',T.ok,0);
  req(16,2,false);done(17.5);reply(17.6,false);
  // Beat 6: final success held, then honest fade to opening blank stage.
  s.set(18.6,'count','color',T.ok,0.2);
  s.fade(21.3,1,0.8);
 }
});

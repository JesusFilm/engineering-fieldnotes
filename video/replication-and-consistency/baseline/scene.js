FlowVideo.scene({
 meta:{title:'Replication',subtitle:'ASYNCHRONOUS',fullFade:true,duration:26,fps:30,speed:1},
 build(s){
  const T=s.THEME;
  s.node('app','box',{x:540,y:650,w:280,h:140,label:'App',labelSize:42});
  s.node('seen','badge',{x:540,y:490,text:'v1',color:T.ok,scale:1.2});
  s.node('primary','db',{x:280,y:1170,w:230,h:220,label:'Primary',labelColor:T.fg});
  s.node('replica','db',{x:800,y:1170,w:230,h:220,label:'Replica',labelColor:T.fg});
  s.node('pv','badge',{x:280,y:1400,text:'v1',color:T.ok,scale:1.4});
  s.node('rv','badge',{x:800,y:1400,text:'v1',color:T.ok,scale:1.4});
  s.node('mode','label',{x:540,y:1250,text:'WAL',size:34});
  const L=[450,720],R=[630,720],P=[280,1060],Q=[800,1060];
  const repl=[[395,1170],[540,1170],[685,1170]];
  s.wire('ap',L,P);s.wire('ar',R,Q);s.wire('rep',[395,1170],[685,1170]);
  s.fade(0,1,0);s.fade(.2,0,.5);s.fade(24.8,1,.7);
  function sound(t,name,node,note,gain=.7){s.sfx(t,name,{note,gain,pan:s.panOf(node)});}
  function chip(t,label,route,color=T.fg,dur=.7){s.packet({t,label,route,color,dur,kind:'chip'});sound(t,'send','app','E6',.5);}
  function value(t,id,text,color){s.set(t,id,'text',text,0);s.set(t,id,'color',color,0);}
  function read(t,which,v,color){
   const a=which==='primary'?L:R,b=which==='primary'?P:Q;
   s.set(t,'wire:ap','color',which==='primary'?T.fg:T.wire,0);
   s.set(t,'wire:ar','color',which==='replica'?T.fg:T.wire,0);
   chip(t,'GET',[a,b]);s.pulse(t+.7,which);
   sound(t+.7,'arrive',which,which==='primary'?'C5':'G5',.55);
   chip(t+.9,v,[b,a],color);
   value(t+1.6,'seen',v,color);s.pulse(t+1.6,'app',color);
   sound(t+1.6,color===T.accent?'miss':'deliver','app',color===T.accent?'C4':'E5',color===T.accent?.95:.7);
  }
  // 1. Baseline: the replica can serve the current value.
  read(1,'replica','v1',T.ok);
  // 2. Commit on primary; ACK does not wait for the asynchronous replica.
  s.set(5,'wire:ap','color',T.fg,0);s.set(5,'wire:ar','color',T.wire,0);
  chip(5,'SET v2',[L,P],T.info);
  value(5.7,'pv','v2',T.info);s.pulse(5.7,'primary',T.info);sound(5.7,'store','primary','C5');
  chip(5.9,'ACK',[P,L],T.ok);
  value(6.6,'seen','ACK v2',T.ok);sound(6.6,'deliver','app','E5');s.pulse(6.6,'app',T.ok);
  s.set(5.7,'wire:rep','color',T.accent,0);
  // 3. The same read route now returns an older version.
  read(9,'replica','v1',T.accent);
  // 4. Read the committed value from primary while replica is still behind.
  read(13,'primary','v2',T.info);
  // 5. Delayed WAL is applied. No ACK is sent back to the writer.
  chip(17,'v2',repl,T.info,1.0);
  value(18,'rv','v2',T.info);s.pulse(18,'replica',T.info);sound(18,'store','replica','G5');
  s.set(18,'wire:rep','color',T.ok,.2);
  // 6. The identical replica read now observes v2.
  read(20.5,'replica','v2',T.info);
 }
});

FlowVideo.scene({
 meta:{fadeTitle:true,title:'Orchestration',subtitle:'FAN-OUT / JOIN',duration:26,fps:30,speed:1},
 build(s){
 const T=s.THEME;
 s.node('mode','label',{x:540,y:510,text:'SERIAL',size:40,color:T.accent});
 s.node('dispatch','box',{x:540,y:690,w:380,h:120,label:'Coordinator'});
 s.node('api','box',{x:290,y:1030,w:330,h:130,label:'API review',sublabel:'READY'});
 s.node('db','box',{x:790,y:1030,w:330,h:130,label:'DB review',sublabel:'READY'});
 s.node('pa','bar',{x:290,y:1080,w:280,h:10,seg0:0,seg0Color:T.accent});
 s.node('pd','bar',{x:790,y:1080,w:280,h:10,seg0:0,seg0Color:T.accent});
 s.node('join','box',{x:540,y:1400,w:380,h:140,label:'Reconcile',sublabel:'0 / 2',color:T.dim});
 s.node('out','badge',{x:540,y:1640,text:'',alpha:0});
 s.wire('a',[440,750],'api.top');s.wire('d',[640,750],'db.top');
 s.wire('aj','api.bottom','join.top',{via:[[290,1230]]});
 s.wire('dj','db.bottom','join.top',{via:[[790,1230]]});
 const sound=(t,preset,id,note,gain=0.65)=>s.sfx(t,preset,{note,pan:s.panOf(id),gain});
 function start(t,id,bar,dur,note){
 s.packet({t,dur:0.6,route:[[id==='api'?440:640,750],id+'.top'],kind:'chip',label:'review',color:T.accent});
 sound(t,'send','dispatch','C6',0.4);
 s.set(t+.6,id,'color',T.accent,.1);s.set(t+.6,id,'sublabel','RUNNING',0);sound(t+.6,'arrive',id,note);
 s.set(t+.6,bar,'seg0',1,dur,'linear');
 for(let k=t+1;k<t+.6+dur;k+=.6)sound(k,'work',id,note,.25);
 const end=t+.6+dur;
 s.set(end,id,'color',T.ok,.15);s.set(end,id,'sublabel','DONE',0);s.set(end,bar,'seg0Color',T.ok,.15);sound(end,'store',id,note);
 s.packet({t:end+.2,dur:.65,route:[id+'.bottom',[id==='api'?290:790,1230],'join.top'],color:T.ok});sound(end+.2,'send',id,note,.35);
 return end+.85;
 }
 function receipt(t,count){s.set(t,'join','sublabel',count+' / 2',0);s.pulse(t,'join');sound(t,'arrive','join','C5');}
 function finish(t){s.set(t,'join','color',T.accent,.15);s.set(t,'join','sublabel','RUNNING',0);sound(t,'work','join','C5');
 s.set(t+.8,'join','color',T.ok,.15);s.set(t+.8,'join','sublabel','DONE',0);s.set(t+.8,'out','text','✓',0);s.set(t+.8,'out','color',T.ok,0);s.set(t+.8,'out','alpha',1,.2);sound(t+.8,'chime','join','G5');}
 s.fade(0,1,0);s.fade(.5,0,.5);
 const a=start(1.3,'api','pa',1.6,'E5');receipt(a,1);
 const d=start(5.8,'db','pd',3.2,'G5');receipt(d,2);finish(d+.25);
 // Same independent tasks and runtimes; only dispatch scheduling changes.
 s.set(12.8,'mode','text','PARALLEL',0);s.set(12.8,'mode','color',T.ok,0);sound(12.8,'recover','dispatch','C5');
 for(const id of ['api','db']){s.set(12.8,id,'color',T.mid,.2);s.set(12.8,id,'sublabel','READY',0);}
 for(const id of ['pa','pd']){s.set(12.8,id,'seg0',0,.2);s.set(12.8,id,'seg0Color',T.accent,0);}
 s.set(12.8,'join','color',T.dim,.2);s.set(12.8,'join','sublabel','0 / 2',0);s.set(12.8,'out','alpha',0,.2);
 const aa=start(14.3,'api','pa',1.6,'E5');const dd=start(14.3,'db','pd',3.2,'G5');receipt(aa,1);receipt(dd,2);finish(dd+.25);
 s.fade(22.5,1,.8);s.set(24.2,'mode','text','SERIAL',0);s.set(24.2,'mode','color',T.accent,0);
 }
});

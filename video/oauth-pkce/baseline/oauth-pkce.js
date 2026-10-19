FlowVideo.scene({
 meta:{title:'OAuth PKCE',subtitle:'S256',duration:26,fps:30,speed:1},
 build(s){
 const C=s.THEME;
 s.node('app','box',{x:290,y:630,w:360,h:150,label:'Mobile app',sublabel:' ',labelSize:42});
 s.node('thief','box',{x:810,y:630,w:320,h:150,label:'Interceptor',sublabel:' ',labelSize:38,color:C.dim});
 s.node('auth','box',{x:540,y:1100,w:600,h:150,label:'Authorization server',sublabel:'/authorize',labelSize:40});
 s.node('binding','badge',{x:540,y:1270,text:'',color:C.accent});
 s.node('check','badge',{x:540,y:1390,text:'',color:C.mid});
 s.node('outcome','badge',{x:540,y:1560,text:'',color:C.ok});
 s.node('secret','badge',{x:290,y:800,text:'',color:C.info});
 s.wire('app','app.bottom',[420,1025],{via:[[290,875]]});
 s.wire('thief','thief.bottom',[660,1025],{via:[[810,875]]});
 s.set(0,'wire:thief','alpha',0.2,0);
 function text(t,id,prop,value){s.set(t,id,prop,value,0)}
 function cue(t,name,id,note,gain=0.6){s.sfx(t,name,{note,gain,pan:s.panOf(id)})}
 function chip(t,from,to,label,color,note){s.packet({t,route:[from,to],dur:0.8,kind:'chip',label,color});cue(t,'send',from,note,0.35);cue(t+0.8,'arrive',to,note);s.ripple(t+0.8,to,color,{r1:50,dur:0.4});}
 s.fade(0,1,0);s.fade(0.3,0,0.5);
 // Fresh private verifier; its derived challenge leaves the app.
 text(1.1,'secret','text','verifier v');cue(1.1,'store','app','C5');s.pulse(1.1,'app',C.info);
 text(2,'check','text','BASE64URL(SHA256(v))');cue(2,'work','app','C5');
 chip(2.7,[290,875],[420,1010],'challenge c',C.accent,'E5');
 text(3.5,'binding','text','challenge c');text(3.5,'check','text','');s.pulse(3.5,'auth',C.accent);
 // Authorization succeeded off-screen; server binds the returned code.
 text(5.8,'binding','text','code A ↔ challenge c');cue(5.8,'store','auth','E5');
 chip(6.1,[420,1010],[290,875],'code A',C.accent,'C5');
 text(6.9,'app','sublabel','code A');
 // Copy of redirect code reaches interceptor; verifier stays private.
 chip(9,[450,735],[640,735],'code A',C.bad,'G4');
 text(9.8,'thief','sublabel','code A');s.set(9.8,'thief','color',C.bad);s.set(9.8,'wire:thief','alpha',1);cue(9.8,'thump','thief','G3');
 // Code alone cannot redeem.
 text(11.8,'auth','sublabel','/token');
 chip(11.8,[810,875],[660,1010],'code A',C.bad,'G4');
 text(12.6,'check','text','verifier ∅');text(12.6,'check','color',C.bad);
 text(13.1,'outcome','text','NO TOKEN');text(13.1,'outcome','color',C.bad);
 cue(13.1,'thump','auth','G3',1);s.shake(13.1,'auth',9);s.ripple(13.1,[540,1490],C.bad,{r1:45,mark:'x'});
 // Correct proof, same binding: token can issue.
 text(15.6,'outcome','text','');text(15.6,'check','text','');s.set(15.6,'thief','alpha',0.3);s.set(15.6,'wire:thief','alpha',0.2);
 chip(15.6,[290,875],[420,1010],'code A + v',C.info,'C5');
 text(16.4,'check','text','S256(v) = c');text(16.4,'check','color',C.ok);cue(16.4,'hit','auth','E5');s.pulse(16.4,'auth',C.ok);
 text(18.3,'outcome','text','access token');text(18.3,'outcome','color',C.ok);cue(18.3,'chime','auth','E5');
 text(18.3,'binding','text','code A · used');text(18.3,'binding','color',C.mid);
 chip(19,[420,1010],[290,875],'access token',C.ok,'C5');
 text(19.8,'app','sublabel','access token');text(19.8,'secret','text','');s.set(19.8,'app','color',C.ok);cue(19.8,'deliver','app','C5');
 s.fade(22.3,1,1.1);
 }
});

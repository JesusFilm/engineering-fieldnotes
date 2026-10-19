FlowVideo.scene({meta:{"title": "Avoid a failed server", "subtitle": "LOAD BALANCING / 6 OF 6", "titleSize": 70, "subtitleSize": 34, "duration": 38, "fps": 24, "speed": 1, "fadeAll": true},build(s){const LESSON=6;
 const T=s.THEME;
 function box(id,x,y,w,label){s.node(id,'box',{x,y,w,h:120,label,labelSize:42});}
 function note(t,a,b){s.set(t,'caption','text',a,0);s.set(t,'caption2','text',b,0);}
 function sound(t,name='ack',id='A'){s.sfx(t,name,{note:id==='A'?'C5':'G5',gain:0.65});}
 function status(t,id,text,color=T.accent){s.set(t,id+'status','text',text,0);s.set(t,id,'color',color,0);sound(t,'arrive',id);}
 function work(t,id,end){status(t,id,'WORKING');s.set(t,id+'bar','seg0',0,0);s.set(t,id+'bar','seg0',1,end-t,'linear');}
 function done(t,id){status(t,id,'READY',T.ok);s.set(t,id+'bar','seg0',0,0);sound(t,'deliver',id);}
 function packet(t,route,label='REQUEST',color=T.accent,dur=1.5){s.packet({t,route,dur,kind:'chip',label,color});sound(t,'send');}
 function request(t,id){packet(t,['app.bottom','lb.top']);packet(t+2,['lb.bottom',id+'.top']);}
 function reply(t,id){packet(t,[id+'.top','lb.bottom'],'RESPONSE',T.ok);packet(t+2,['lb.top','app.bottom'],'RESPONSE',T.ok);}
 box('app',540,600,450,'APPLICATION');
 s.node('caption','label',{x:540,y:1640,text:'',size:48});
 s.node('caption2','label',{x:540,y:1710,text:'',size:48});
 s.node('limit','label',{x:540,y:1810,text:'ILLUSTRATION · NOT MEASURED TIMING',size:30,color:T.mid});
 for(const [id,x] of (LESSON===1?[['A',540]]:[['A',270],['B',810]])){
  box(id,x,1280,400,'SERVER '+id);
  s.node(id+'status','label',{x,y:1390,text:'READY',size:42});
  s.node(id+'bar','bar',{x,y:1460,w:300,h:16});
 }
 if(LESSON>=3){box('lb',540,910,670,'LOAD BALANCER');s.wire('input','app.bottom','lb.top');s.wire('a','lb.bottom','A.top');s.wire('b','lb.bottom','B.top');}
 else {s.wire('a','app.bottom','A.top');if(LESSON===2)s.wire('b','app.bottom','B.top');}

 status(0,'A','NOT RESPONDING',T.bad);note(0,'Server A stops responding.','The balancer does not know yet.');
 packet(6,['lb.bottom','A.top'],'HEALTH CHECK',T.info,2);note(7,'A health probe checks server A.','No successful response arrives.');
 note(13,'The configured check times out.','The failure is now detected.');sound(13,'miss');
 status(18,'A','UNAVAILABLE',T.bad);s.set(18,'wire:a','color',T.bad,0);s.set(18,'wire:a','dashed',1,0);note(18,'A is removed from new choices.','B is still available.');
 request(23,'B');work(26.5,'B',29);done(29,'B');reply(30,'B');
 note(23,'New requests go to B.','Earlier requests may still have failed.');
 }});

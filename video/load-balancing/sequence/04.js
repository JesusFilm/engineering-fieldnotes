FlowVideo.scene({meta:{"title": "Unequal work", "subtitle": "LOAD BALANCING / 4 OF 6", "titleSize": 70, "subtitleSize": 34, "duration": 38, "fps": 24, "speed": 1, "fadeAll": true},build(s){const LESSON=4;
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

 note(0,'Requests can need different work.','Here, each server runs one at a time.');
 request(4,'A');work(7.5,'A',31);note(8,'A starts a slow report.','Its work will take a while.');
 note(10,'B starts a quick lookup.','A is still working on its slow report.');request(10,'B');work(13.5,'B',17);done(17,'B');note(17,'B has finished a quick lookup.','One request each; different work left.');
 box('waiting',270,1080,360,'REQUEST 3');s.set(0,'waiting','alpha',0,0);
 note(22,'Round robin selects A again.','The next request is routed to A.');packet(22,['app.bottom','lb.top']);packet(24,['lb.bottom','waiting.top']);s.set(25.5,'waiting','alpha',1,0);sound(25.5,'thump');
 note(26,'Round robin selects A again.','Request 3 waits while B is ready.');
 done(31,'A');s.set(31,'waiting','alpha',0,0);packet(31,['waiting.bottom','A.top'],'REQUEST 3',T.accent,1);work(32,'A',35);done(35,'A');
 note(31,'Only when A finishes can 3 start.','Equal turns did not balance the work.');
 }});

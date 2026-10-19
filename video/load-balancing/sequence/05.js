FlowVideo.scene({meta:{"title": "Look at active work", "subtitle": "LOAD BALANCING / 5 OF 6", "titleSize": 70, "subtitleSize": 34, "duration": 36, "fps": 24, "speed": 1, "fadeAll": true},build(s){const LESSON=5;
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

 work(0,'A',31);s.set(0,'Astatus','text','1 ACTIVE',0);s.set(0,'Bstatus','text','0 ACTIVE',0);
 note(0,'A is busy; B has no active requests.','Keep the same starting situation.');
 note(8,'Least requests compares active counts.','A has 1. B has 0. Choose B.');s.pulse(8,'B',T.ok);sound(8);
 request(14,'B');work(17.5,'B',23);s.set(17.5,'Bstatus','text','1 ACTIVE',0);
 note(17.5,'The new request runs on B.','A keeps working on its original job.');done(23,'B');s.set(23,'Bstatus','text','0 ACTIVE',0);
 note(23,'The new request has finished.','It did not wait behind A’s long job.');
 done(31,'A');note(30,'Counts help; they do not measure cost.','No rule is best for every workload.');
 }});

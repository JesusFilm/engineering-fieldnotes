FlowVideo.scene({meta:{title:'Tracing',subtitle:'OBSERVABILITY',duration:26,fadeTitle:true,fps:30,speed:1},build(s){
 const C=s.THEME;
 const label=(id,text,x,y,size=34,color=C.fg,alpha=1)=>s.node(id,'label',{x,y,text,size,color,alpha});
 const show=(t,id)=>s.set(t,id,'alpha',1,.35);
 const cue=(t,name,note,gain=.65)=>s.sfx(t,name,{note,gain});
 s.node('agent','box',{x:540,y:570,w:330,h:120,label:'Support agent',labelSize:36});
 s.node('retrieval','box',{x:270,y:825,w:330,h:120,label:'Retrieval',labelSize:36});
 s.node('billing','box',{x:810,y:825,w:330,h:120,label:'Billing API',labelSize:36});
 s.wire('ar','agent.bottom','retrieval.top');s.wire('ab','agent.bottom','billing.top');
 label('total','2,400 ms',540,1040,66,C.accent,0);
 label('unknown','?',540,1220,100,C.mid,0);
 label('trace','trace: 7fa2…',540,950,34,C.info,0);
 const row=(id,name,y,start,duration,col)=>{
  label(id+'name',name,540,y-47,36,C.fg,0);
  const width=780*duration/2400,x=150+780*start/2400+width/2;
  s.node(id,'bar',{x,y,w:width,h:24,seg0:0,seg0Color:col,alpha:0});
 };
 row('root','Agent · 2,400 ms',1085,0,2400,C.info);
 row('ret','Retrieval · 200 ms',1220,100,200,C.ok);
 row('bill','Billing · 2,000 ms',1355,300,2000,C.accent);
 row('try1','Attempt 1 · 1,200 ms · ERROR',1490,300,1200,C.bad);
 row('try2','Attempt 2 · 600 ms · OK',1625,1700,600,C.ok);
 label('axis0','0',150,1740,30,C.mid,0);label('axis1','2,400 ms',860,1740,30,C.mid,0);
 function span(t,id,dur,note){show(t,id);show(t,id+'name');s.set(t,id,'seg0',1,dur,'linear');cue(t,'arrive',note);}
 function packet(t,target,note){s.packet({t,dur:.65,route:['agent.bottom',target+'.top'],kind:'chip',label:'7fa2…',color:C.info});cue(t,'send','C6',.5);s.pulse(t+.65,target,C.info);cue(t+.65,'arrive',note);}
 s.fade(0,1,0);s.fade(.35,0,.5);
 s.pulse(1,'agent',C.accent);cue(1,'arrive','C5');show(1.5,'total');cue(1.5,'deliver','C4');
 show(3,'unknown');cue(3,'miss','C3');
 s.set(5.5,'unknown','alpha',0,.35);s.set(5.5,'total','alpha',0,.35);
 show(5.5,'trace');span(5.5,'root',.8,'C5');show(5.5,'axis0');show(5.5,'axis1');
 packet(7.5,'retrieval','E5');span(8.2,'ret',.45,'E5');s.set(8.65,'retrieval','color',C.ok,.2);cue(8.65,'hit','E5');
 packet(10.7,'billing','G5');span(11.4,'bill',.8,'G5');
 span(13.5,'try1',1.2,'G4');s.set(14.7,'billing','color',C.bad,0);s.shake(14.7,'billing',10,.4);s.ripple(14.7,'billing',C.bad,{r1:95,mark:'x'});cue(14.7,'crash','C3',.8);
 // The 200 ms gap between attempts is backoff, inside the parent billing span.
 s.packet({t:17,dur:.6,route:['agent.bottom','billing.top'],kind:'chip',label:'retry 2',color:C.accent});cue(17,'send','C6',.5);
 span(17.6,'try2',.6,'G5');s.set(18.2,'billing','color',C.ok,.2);cue(18.2,'chime','G5');
 s.set(20.4,'retrieval','alpha',.3,.3);s.set(20.4,'ret','alpha',.3,.3);s.set(20.4,'retname','alpha',.3,.3);s.pulse(20.4,'billing',C.accent);s.mark(20.4,'bill',.5,C.accent);cue(20.4,'store','G4');
 s.fade(23,1,1); // empty stage matches opening; title fades too
}});

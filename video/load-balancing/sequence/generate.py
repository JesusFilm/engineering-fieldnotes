"""Generate reproducible, small lessons using the local flow renderer."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parent
common=r'''
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
'''
lessons=[
 dict(title='One request',duration=32,intro='An application asks a server to do something. The server runs the work and returns a response. Here the request asks for a user profile.',takeaway='A request is the ask. A response is the result. The server does work between them.',question='What is the server doing while the application waits?',answer='It is processing the request. The response travels back only after that work finishes.',beats=[(0,'Meet the application and server.'),(5,'The application sends a request.'),(10,'The server processes the request.'),(19,'The server sends a response.'),(25,'The application receives the result.')],code=r'''
 note(0,'An application asks for a profile.','A server runs the work.');
 note(5,'Request = the ask.','Watch it travel to the server.');packet(5,['app.bottom','A.top'],'GET PROFILE',T.accent,3);
 work(8,'A',18);note(10,'The server is processing the request.','The application waits for its result.');
 done(18,'A');note(18,'Response = the result.','It travels back to the application.');packet(19,['A.top','app.bottom'],'PROFILE',T.ok,3);
 note(25,'Ask → process → respond.','That is one request and response.');
 '''),
 dict(title='Share the work',duration=34,intro='A server has finite capacity. A second server can run the same service, so separate requests can be handled at the same time. This simplified example gives each server one work slot.',takeaway='More servers can provide more capacity when requests can be handled independently. Someone still needs to choose a server.',question='Does adding a second server make one request run twice as fast?',answer='No. Here it lets two separate requests run at once. Each request still takes its own processing time.',beats=[(0,'Two servers can run the same service.'),(6,'The first request starts on server A.'),(12,'A second request starts on server B while A works.'),(24,'Both finish independently.'),(29,'Separate requests use separate capacity.')],code=r'''
 note(0,'Both servers run the same service.','Here, each can run one request.');
 packet(6,['app.bottom','A.top'],'REQUEST 1',T.accent,2);work(8,'A',24);
 note(9,'Server A is working on request 1.','A second request arrives.');
 packet(12,['app.bottom','B.top'],'REQUEST 2',T.accent,2);work(14,'B',24);
 note(14,'Both requests now run at once.','Each server has its own work.');
 done(24,'A');done(24,'B');note(24,'Two requests have finished.','We shared the work across servers.');
 note(29,'But who chooses the server?','Next: the load balancer.');
 '''),
 dict(title='Take turns',duration=36,intro='A load balancer receives a request and selects a server. Round robin is a selection rule: take turns between eligible servers. Here both servers have the same configured weight.',takeaway='Round robin rotates through servers: A, B, A, B. A request goes to one selected server.',question='After A, B, A, which server gets the next request?',answer='B, provided both servers remain eligible and equally weighted.',beats=[(0,'Introduce the load balancer.'),(5,'Request 1 routes to A.'),(13,'Request 2 routes to B.'),(21,'Request 3 routes to A.'),(29,'The rule repeats A, B, A, B.')],code=r'''
 note(0,'The load balancer chooses a server.','Round robin means taking turns.');
 request(5,'A');work(8.5,'A',11);done(11,'A');note(5,'Request 1 goes to A.','One request, one chosen server.');
 request(13,'B');work(16.5,'B',19);done(19,'B');note(13,'Request 2 goes to B.','The next server gets the next turn.');
 request(21,'A');work(24.5,'A',27);done(27,'A');note(21,'Request 3 goes to A.','The rotation starts again.');
 note(29,'A → B → A → B','Equal turns across these two servers.');
 '''),
 dict(title='Unequal work',duration=38,intro='Taking turns balances the number of assigned requests, but requests can take different amounts of work. Watch a slow report on A and a short lookup on B. This example allows one running request per server.',takeaway='Equal request counts do not imply equal remaining work. Round robin can choose a busy server even while another is idle.',question='Why does request 3 wait even though B is ready?',answer='The round-robin rule selects A next. In this one-slot example A is still working, so the new request waits there.',beats=[(0,'Some requests take longer.'),(4,'A receives a slow request.'),(10,'B receives a quick request.'),(18,'B is ready while A remains busy.'),(22,'Round robin selects A and request 3 waits.'),(31,'A finishes and the waiting request starts.')],code=r'''
 note(0,'Requests can need different work.','Here, each server runs one at a time.');
 request(4,'A');work(7.5,'A',31);note(8,'A starts a slow report.','Its work will take a while.');
 note(10,'B starts a quick lookup.','A is still working on its slow report.');request(10,'B');work(13.5,'B',17);done(17,'B');note(17,'B has finished a quick lookup.','One request each; different work left.');
 box('waiting',270,1080,360,'REQUEST 3');s.set(0,'waiting','alpha',0,0);
 note(22,'Round robin selects A again.','The next request is routed to A.');packet(22,['app.bottom','lb.top']);packet(24,['lb.bottom','waiting.top']);s.set(25.5,'waiting','alpha',1,0);sound(25.5,'thump');
 note(26,'Round robin selects A again.','Request 3 waits while B is ready.');
 done(31,'A');s.set(31,'waiting','alpha',0,0);packet(31,['waiting.bottom','A.top'],'REQUEST 3',T.accent,1);work(32,'A',35);done(35,'A');
 note(31,'Only when A finishes can 3 start.','Equal turns did not balance the work.');
 '''),
 dict(title='Look at active work',duration=36,intro='Another rule is least requests: choose a server with fewer requests still in progress. We start with the same imbalance as before: A has one long-running request and B has none. Counts are useful signals, not perfect measurements of cost.',takeaway='Least requests uses current active-request counts when choosing where new work goes. It does not move existing work.',question='Does choosing B move the long-running request away from A?',answer='No. A keeps its existing request. Only the new request goes to B.',beats=[(0,'A has one active request; B has none.'),(8,'Compare current active counts.'),(14,'The new request goes to B.'),(23,'B finishes while A continues.'),(29,'Selection changes new assignments only.')],code=r'''
 work(0,'A',31);s.set(0,'Astatus','text','1 ACTIVE',0);s.set(0,'Bstatus','text','0 ACTIVE',0);
 note(0,'A is busy; B has no active requests.','Keep the same starting situation.');
 note(8,'Least requests compares active counts.','A has 1. B has 0. Choose B.');s.pulse(8,'B',T.ok);sound(8);
 request(14,'B');work(17.5,'B',23);s.set(17.5,'Bstatus','text','1 ACTIVE',0);
 note(17.5,'The new request runs on B.','A keeps working on its original job.');done(23,'B');s.set(23,'Bstatus','text','0 ACTIVE',0);
 note(23,'The new request has finished.','It did not wait behind A’s long job.');
 done(31,'A');note(30,'Counts help; they do not measure cost.','No rule is best for every workload.');
 '''),
 dict(title='Avoid a failed server',duration=38,intro='A selection rule also needs to know which servers are eligible. In this example a periodic health probe gets no successful response from A. After its configured timeout, the balancer marks A unavailable and sends new requests to B.',takeaway='Health checks can remove a failed server from new routing decisions after detection. They do not instantly detect every failure or rescue requests already sent.',question='If A fails just after a successful check, is the failure detected immediately?',answer='No. Detection depends on the next checks, their timeouts, and configured thresholds. A request already sent can still fail.',beats=[(0,'A stops responding.'),(6,'The balancer sends a health probe.'),(13,'The probe times out.'),(18,'A is excluded from new selection.'),(23,'A new request routes to B.'),(31,'B returns its response through the balancer.')],code=r'''
 status(0,'A','NOT RESPONDING',T.bad);note(0,'Server A stops responding.','The balancer does not know yet.');
 packet(6,['lb.bottom','A.top'],'HEALTH CHECK',T.info,2);note(7,'A health probe checks server A.','No successful response arrives.');
 note(13,'The configured check times out.','The failure is now detected.');sound(13,'miss');
 status(18,'A','UNAVAILABLE',T.bad);s.set(18,'wire:a','color',T.bad,0);s.set(18,'wire:a','dashed',1,0);note(18,'A is removed from new choices.','B is still available.');
 request(23,'B');work(26.5,'B',29);done(29,'B');reply(30,'B');
 note(23,'New requests go to B.','Earlier requests may still have failed.');
 '''),
]
for i,l in enumerate(lessons,1):
 scene='FlowVideo.scene({meta:'+json.dumps(dict(title=l['title'],subtitle=f'LOAD BALANCING / {i} OF 6',titleSize=70,subtitleSize=34,duration=l['duration'],fps=24,speed=1,fadeAll=True))+',build(s){const LESSON='+str(i)+';'+common+l['code']+'}});\n'
 (ROOT/f'{i:02}.js').write_text(scene)
 l['src']=f'pilots/load-balancing/{i:02}.mp4';l['poster']=f'pilots/load-balancing/{i:02}.jpg';l.pop('code');l['beats']=[{'time':t,'text':v} for t,v in l['beats']]
(ROOT/'lessons.json').write_text(json.dumps(lessons,indent=2)+'\n')

FlowVideo.scene({meta:{title:'Backpressure',subtitle:'BOUNDED QUEUE',duration:26,fps:30,speed:1},build(s){
const C=s.THEME;
s.node('p','box',{x:540,y:600,w:360,h:130,label:'Producer',sublabel:'READY',labelSize:42});
s.node('q','store',{x:540,y:1000,w:340,rows:3,label:'Queue · 3 slots'});
s.node('count','badge',{x:260,y:1000,text:'0 / 3',color:C.ok});
s.node('w','box',{x:540,y:1450,w:360,h:140,label:'Worker',sublabel:'IDLE',labelSize:42});
s.node('progress','bar',{x:540,y:1570,w:320,h:16,seg0:0,seg0Color:C.accent});
s.node('done','badge',{x:540,y:1690,text:'DONE 0',color:C.ok});
s.node('held','badge',{x:260,y:600,text:'',color:C.accent});
s.wire('in','p.bottom',[540,880]);
s.wire('out',[540,1190],'w.top');
s.wire('feedback',[710,1000],[720,600],{via:[[870,1000],[870,600]]});
s.set(0,'wire:feedback','alpha',0,0);
function sound(t,name,note,gain=.6){s.sfx(t,name,{note,gain});}
function queue(t,jobs){for(let i=0;i<3;i++){s.set(t,'q','row'+i+'Text',jobs[i]?'JOB '+jobs[i]:'',0);s.set(t,'q','row'+i+'Color',C.accent,0);}s.set(t,'count','text',jobs.length+' / 3',0);s.set(t,'count','color',jobs.length===3?C.accent:C.ok,.1);}
function enqueue(t,id,jobs){s.packet({route:id==='E'?['held',[260,740],[540,740],[540,880]]:['p.bottom',[540,880]],t,dur:.65,kind:'chip',label:id,color:C.accent});sound(t,'send','C6',.4);queue(t+.65,jobs);sound(t+.65,'store','E5');s.pulse(t+.65,'q');}
function consume(t,id,jobs,end){queue(t,jobs);s.packet({route:[[540,1190],'w.top'],t,dur:.65,kind:'chip',label:id,color:C.accent});sound(t,'send','E6',.4);s.set(t+.65,'w','sublabel','JOB '+id,0);s.set(t+.65,'w','color',C.accent,.1);s.set(t+.65,'progress','seg0',0,0);s.set(t+.65,'progress','seg0',1,end-t-.65,'linear');sound(t+.65,'arrive','G5');}
function finish(t,n){s.set(t,'w','color',C.ok,.1);s.set(t,'w','sublabel','DONE',0);s.set(t,'done','text','DONE '+n,0);s.ripple(t,'w',C.ok,{r0:90,r1:150,dur:.5});sound(t,'chime','G5');}
// Fade at both ends makes decoded boundary frames identical.
s.fade(0,1,0);s.fade(.25,0,.6);
enqueue(1.2,'A',['A']);consume(2.4,'A',[],14.2);
enqueue(5,'B',['B']);enqueue(6.2,'C',['B','C']);enqueue(7.4,'D',['B','C','D']);
// Full queue blocks a cooperative upstream producer; E never enters the queue here.
s.set(8.7,'wire:feedback','alpha',1,.2);s.set(8.7,'wire:feedback','color',C.accent,.2);
s.packet({route:[[710,1000],[870,1000],[870,600],[720,600]],t:8.7,dur:.9,kind:'chip',label:'FULL',color:C.accent});sound(8.7,'thump','C3',.9);
s.set(9.6,'p','sublabel','PAUSED',0);s.set(9.6,'p','color',C.accent,.1);s.set(9.6,'held','text','E',0);s.set(9.6,'wire:in','alpha',.2,.2);sound(9.6,'miss','C4',.6);
for(const t of [10.5,11.5,12.5,13.5]){s.pulse(t,'w');sound(t,'work','G3',.45);}
finish(14.2,1);consume(15,'B',['C','D'],20.5);
s.packet({route:[[710,1000],[870,1000],[870,600],[720,600]],t:15.8,dur:.9,kind:'chip',label:'SPACE',color:C.ok});sound(15.8,'send','E6');
s.set(16.7,'p','sublabel','READY',0);s.set(16.7,'p','color',C.mid,.2);s.set(16.7,'wire:in','alpha',1,.2);sound(16.7,'recover','C5');
s.set(18,'held','text','',0);enqueue(18,'E',['C','D','E']);
s.set(18.65,'p','sublabel','IDLE',0);
finish(20.5,2);consume(21.2,'C',['D','E'],23.2);
s.set(21.2,'p','sublabel','IDLE',0);s.set(21.2,'p','color',C.mid,.2);s.set(21.2,'wire:feedback','alpha',.2,.2);
// Comparative correction: keep serving queued work through the fade.
// D is still running and E is still waiting; this is not batch completion.
finish(23.2,3);consume(23.8,'D',['E'],27);s.fade(25.2,1,.6);
}});

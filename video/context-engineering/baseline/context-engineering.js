// Original prototype; model not recorded. Edited by gpt-6-astra comparative review.
FlowVideo.scene({meta:{title:'',duration:25,fps:30,speed:1},build(s){
const C=s.THEME;
s.node('title','label',{x:540,y:300,text:'Context engineering',size:72,weight:800,color:C.title});
s.node('history','box',{x:280,y:580,w:340,h:120,label:'History',labelSize:40});
s.node('repo','box',{x:800,y:580,w:340,h:120,label:'Repository',labelSize:40});
s.node('ctx','store',{x:540,y:1020,w:660,rows:6,label:'Context',row0Text:'KEEP API',row0Color:C.info,row1Text:'fix null crash',row1Color:C.ok,row2Text:'trace: api.ts:42',row2Color:C.ok});
s.node('budget','bar',{x:540,y:1370,w:660,h:20,segments:1,ticks:8,label:'8k / 16k tokens',seg0:0.5,seg0Color:C.ok});
s.node('candidate','badge',{x:540,y:1740,text:'',color:C.accent});
s.node('model','box',{x:540,y:1570,w:360,h:130,label:'Model',labelSize:42});
s.wire('history','history.bottom',[300,800],{via:[[280,730],[300,730]]});
s.wire('repo','repo.bottom',[780,800],{via:[[800,730],[780,730]]});
s.wire('model',[870,1100],'model.right',{via:[[950,1100],[950,1570]]});
s.fade(0,1,0);s.fade(.35,0,.45);s.set(0,'title','alpha',0,0);s.set(.35,'title','alpha',1,.45);
function snd(t,name,note,anchor){s.sfx(t,name,{note,gain:.65,pan:s.panOf(anchor||'ctx')});}
function row(t,i,txt,col){s.set(t,'ctx','row'+i+'Text',txt,0);s.set(t,'ctx','row'+i+'Color',col,0);s.set(t,'ctx','row'+i+'Alpha',1,.2);}
function load(t,i,txt){s.packet({route:['history.bottom',[280,730],[300,730],[300,800]],t,dur:.65,kind:'chip',label:'logs',color:C.accent});snd(t,'send','C6','history');row(t+.65,i,txt,C.accent);snd(t+.65,'store','C5');}
s.pulse(1,'ctx',C.ok);snd(1,'arrive','E5');
load(3,3,'log #1: null');load(4,4,'log #2: null');load(5,5,'log #3: null');
s.set(3.65,'budget','seg0',.65,.35);s.set(3.65,'budget','label','10k / 16k tokens',0);s.set(4.65,'budget','seg0',.8,.35);s.set(4.65,'budget','label','13k / 16k tokens',0);s.set(5.65,'budget','seg0',.94,.35);s.set(5.65,'budget','label','15k / 16k tokens',0);s.set(5.65,'budget','seg0Color',C.accent,.2);
s.set(7.7,'ctx','row3Color',C.accent,0);s.set(8,'ctx','row4Alpha',0,.7);s.set(8,'ctx','row5Alpha',0,.7);s.set(8,'ctx','row3Fill',1,.7);snd(8,'work','C4');
row(9,3,'summary: null input',C.ok);s.set(9,'ctx','row3Fill',0,.4);s.set(9,'budget','seg0',.5625,.8);s.set(9,'budget','seg0Color',C.ok,.4);s.set(9,'budget','label','9k / 16k tokens',0);snd(9,'recover','E5');
s.set(10.4,'ctx','row0Fill',1,.35);s.set(10.4,'ctx','row2Fill',1,.35);snd(10.4,'chime','E5');
s.packet({route:[[780,800],[800,730],'repo.bottom'],t:12.2,dur:.7,kind:'chip',label:'callers?',color:C.info});snd(12.2,'send','G5');s.pulse(12.9,'repo',C.info);snd(12.9,'arrive','G5','repo');
s.packet({route:['repo.bottom',[800,730],[780,800]],t:14,dur:.8,kind:'chip',label:'caller.ts',color:C.ok});snd(14,'send','G6','repo');row(14.8,4,'caller.ts:18',C.ok);s.set(14.8,'budget','seg0',.6875,.5);s.set(14.8,'budget','label','11k / 16k tokens',0);snd(14.8,'store','G5');
s.packet({route:[[870,1100],[950,1100],[950,1570],'model.right'],t:17.3,dur:1.0,kind:'envelope',color:C.ok});snd(17.3,'send','E6');s.set(18.3,'model','color',C.accent,.15);snd(18.3,'work','E4','model');
s.set(19.1,'model','color',C.mid,.3);s.set(19.1,'candidate','text','Patch?',0);s.set(19.1,'candidate','scale',.6,0);s.set(19.1,'candidate','scale',1,.3,'back');s.ripple(19.1,[540,1740],C.accent,{r0:20,r1:50});snd(19.1,'arrive','G5','model');
s.set(21,'ctx','row0Fill',0,.35);s.set(21,'ctx','row2Fill',0,.35);snd(21,'ack','E5');
s.fade(23,1,.8);s.set(23,'title','alpha',0,.8);
}});

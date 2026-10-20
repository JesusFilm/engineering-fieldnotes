FlowVideo.scene({meta:{"title": "Stop after verified success", "titleSize": 66, "subtitle": "", "duration": 28, "fps": 20, "speed": 1, "fadeAll": true},build(s){const DATA={"title": "Stop after verified success", "nodes": [{"id": "patch", "label": "PATCH", "state": ""}, {"id": "tests", "label": "TEST RUNNER", "state": ""}, {"id": "control", "label": "LOOP CONTROLLER", "state": ""}], "intro": "The repaired code runs through the selected suite again. When the configured success criteria are met, the edit loop stops and hands over evidence.", "takeaway": "Passing this suite supports the tested behavior. It does not establish that all possible behavior is correct.", "duration": 28, "beats": [{"lines": ["Run the same relevant checks again.", "This time, test the repaired revision."], "actions": [{"type": "send", "to": "tests", "label": "RUN 12 TESTS", "delay": 0, "from": "patch"}, {"type": "work", "node": "tests", "duration": 4, "delay": 2}], "time": 0}, {"lines": ["All twelve selected tests pass.", "The runner reports what actually ran."], "actions": [{"type": "state", "node": "tests", "text": "12 pass", "color": "ok", "delay": 0}], "time": 7}, {"lines": ["The controller checks the success rule.", "The observed result satisfies this rule."], "actions": [{"type": "send", "to": "control", "label": "12 PASSED", "delay": 0, "from": "tests"}, {"type": "state", "node": "control", "text": "success rule met", "color": "ok", "delay": 2}], "time": 14}, {"lines": ["Stop editing and hand over the evidence.", "Unrequested edits add uncertainty."], "actions": [{"type": "state", "node": "control", "text": "stop + handoff", "color": "ok", "delay": 0}], "time": 21}]};
const T=s.THEME;
const ns=DATA.nodes;
const positions=ns.length===2?[[540,750],[540,1250]]:ns.length===3?[[540,650],[540,1000],[540,1350]]:[[540,600],[270,990],[810,990],[540,1390]];
ns.forEach((n,i)=>{
 const [x,y]=positions[i],w=ns.length===4&&(i===1||i===2)?410:650;
 s.node(n.id,'box',{x,y,w,h:200,label:n.label,labelSize:42,sublabel:' '});
 s.node(n.id+'-state','label',{x,y:y+42,text:n.state||'',size:40,color:T.fg});
 if(DATA.beats.some(b=>(b.actions||[]).some(a=>a.type==='work'&&a.node===n.id)))s.node(n.id+'-work','bar',{x,y:y+78,w:w-70,h:12});
});
s.node('caption','label',{x:540,y:1640,text:'',size:48,color:T.fg});
s.node('caption2','label',{x:540,y:1710,text:'',size:48,color:T.fg});
function anchor(a,b){
 const ai=ns.findIndex(n=>n.id===a),bi=ns.findIndex(n=>n.id===b);
 const [ax,ay]=positions[ai],[bx,by]=positions[bi];
 if(ns.length===3&&Math.abs(ai-bi)===2)return [a+'.right',[960,ay],[960,by],b+'.right'];
 if(ay===by)return [a+(ax<bx?'.right':'.left'),b+(ax<bx?'.left':'.right')];
 return [a+(ay<by?'.bottom':'.top'),b+(ay<by?'.top':'.bottom')];
}
const wires=new Set();
for(const beat of DATA.beats){
 const t=beat.time;
 s.set(t,'caption','text',beat.lines[0],0);s.set(t,'caption2','text',beat.lines[1]||'',0);
 for(const a of beat.actions||[]){
  const at=t+(a.delay||0),color=T[a.color||'accent'];
  if(a.type==='send'){
   const route=anchor(a.from,a.to),key=[a.from,a.to].sort().join(':');
   if(!wires.has(key)){s.wire(key,route[0],route[route.length-1],{via:route.slice(1,-1)});wires.add(key);}
   s.packet({t:at,route,dur:a.duration||2,kind:'chip',label:a.label||'',color});
   s.sfx(at,'send',{gain:.55,note:'E5'});
   s.pulse(at+(a.duration||2),a.to);s.sfx(at+(a.duration||2),'arrive',{gain:.55,note:'G5'});
  } else if(a.type==='state'){
   s.set(at,a.node+'-state','text',a.text,0);s.set(at,a.node,'color',color,0);
   s.sfx(at,a.color==='bad'?'miss':a.color==='ok'?'deliver':'ack',{gain:.6});
  } else if(a.type==='work'){
   s.set(at,a.node+'-work','seg0',0,0);s.set(at,a.node+'-work','seg0',1,a.duration||5,'linear');
   s.sfx(at,'ack',{gain:.4});
  }
 }
}
}});

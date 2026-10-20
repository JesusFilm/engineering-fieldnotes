FlowVideo.scene({meta:{"title": "Use a specific failure", "titleSize": 66, "subtitle": "", "duration": 28, "fps": 20, "speed": 1, "fadeAll": true},build(s){const DATA={"title": "Use a specific failure", "nodes": [{"id": "agent", "label": "AGENT", "state": ""}, {"id": "tests", "label": "TEST RUNNER", "state": ""}, {"id": "patch", "label": "CODE", "state": ""}], "intro": "A discount-calculation test fails with a concrete assertion. The agent can connect that observation to a targeted code change.", "takeaway": "A failing assertion is useful only when the relevant tests actually ran. Preserve the failing input and expected behavior.", "duration": 28, "beats": [{"lines": ["Twelve tests run against the code.", "One assertion fails."], "actions": [{"type": "work", "node": "tests", "duration": 4, "delay": 0}, {"type": "state", "node": "tests", "text": "11 pass, 1 fail", "color": "bad", "delay": 4}], "time": 0}, {"lines": ["Send the failing assertion to the agent.", "It shows expected and actual behavior."], "actions": [{"type": "send", "to": "agent", "label": "90 \u2260 100", "delay": 0, "from": "tests"}, {"type": "state", "node": "tests", "text": "expected 90, got 100", "color": "bad", "delay": 0}], "time": 7}, {"lines": ["The agent makes a targeted repair.", "The code changes; the evidence is now old."], "actions": [{"type": "send", "to": "patch", "label": "PATCH", "delay": 0, "from": "agent"}, {"type": "state", "node": "patch", "text": "needs retest", "color": "accent", "delay": 2}, {"type": "state", "node": "tests", "text": "not yet rerun", "color": "accent", "delay": 2}], "time": 14}, {"lines": ["Return the changed code to the runner.", "The next observation must be fresh."], "actions": [{"type": "send", "to": "tests", "label": "RETEST", "delay": 0, "from": "patch"}, {"type": "state", "node": "tests", "text": "new run pending", "color": "accent", "delay": 2}], "time": 21}]};
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

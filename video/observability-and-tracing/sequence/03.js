FlowVideo.scene({meta:{"title": "Cross a service boundary", "titleSize": 66, "subtitle": "", "duration": 28, "fps": 20, "speed": 1, "fadeAll": true},build(s){const DATA={"title": "Cross a service boundary", "nodes": [{"id": "agent", "label": "AGENT SERVICE", "state": "trace T"}, {"id": "network", "label": "REMOTE REQUEST", "state": ""}, {"id": "tool", "label": "TOOL SERVICE", "state": ""}], "intro": "When an operation crosses a process boundary, tracing context must travel with the request and be extracted by the receiving service.", "takeaway": "Propagation links the spans, but instrumentation and export must also work. Headers alone do not create a complete trace.", "duration": 28, "beats": [{"lines": ["The agent calls a separate service.", "A local parent relation cannot cross alone."], "actions": [], "time": 0}, {"lines": ["Include trace context in the request.", "It identifies the trace and parent span."], "actions": [{"type": "send", "to": "network", "label": "T; parent A", "delay": 0, "from": "agent"}, {"type": "state", "node": "network", "text": "trace=T; parent=A", "color": "ok", "delay": 2}], "time": 7}, {"lines": ["The receiver extracts that context.", "It starts a child span for its work."], "actions": [{"type": "send", "to": "tool", "label": "T; parent A", "delay": 0, "from": "network"}, {"type": "state", "node": "tool", "text": "U; parent A; trace T", "color": "ok", "delay": 2}], "time": 14}, {"lines": ["Both sides now share trace identity.", "Export their spans to see the whole path."], "actions": [], "time": 21}]};
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

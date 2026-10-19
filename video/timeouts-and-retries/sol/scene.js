/* Independent GPT-6.1 Sol cut. Read-only code search, illustrative timing.
 * All limits live in orchestration/tool code; labels are not model instructions.
 */
FlowVideo.scene({
  meta: { title: 'One retry owner', subtitle: 'TIMEOUTS & RETRIES', duration: 32, fps: 30, speed: 1 },
  build(s) {
    const C = s.THEME;
    const set = (t,id,prop,value,dur=0,ease='inOut') => s.set(t,id,prop,value,dur,ease);
    const label=(id,x,y,text,size=42,color=C.mid,alpha=1)=>s.node(id,'label',{x,y,text,size,color,alpha});
    s.node('agent','box',{x:490,y:610,w:460,h:160,label:'AGENT',labelSize:52,sublabel:'Code search',subSize:38});
    s.node('tool','box',{x:490,y:935,w:460,h:160,label:'READ TOOL',labelSize:48,sublabel:'Ready',subSize:38});
    s.node('index','box',{x:490,y:1250,w:460,h:150,label:'CODE INDEX',labelSize:46,sublabel:'Ready',subSize:38});
    s.wire('upper','agent.bottom','tool.top'); s.wire('lower','tool.bottom','index.top');
    label('phase',540,475,'NORMAL',38,C.mid);
    label('agentPolicy',870,610,'',40,C.accent);
    label('toolPolicy',870,935,'',40,C.accent);
    label('count',540,1690,'0 calls',58,C.mid);
    label('arithmetic',540,1770,'',50,C.bad);
    label('wait',790,1100,'',38,C.accent);
    s.node('budget','bar',{x:490,y:1440,w:460,h:22,ticks:true,alpha:0,seg0:1,seg0Color:C.accent});
    label('budgetLabel',490,1390,'6 s deadline',38,C.accent,0);
    for(let i=0;i<6;i++) {
      s.node('call'+i,'box',{x:360+(i%3)*180,y:1520+Math.floor(i/3)*80,w:144,h:60,label:String(i+1),labelSize:40,color:C.dim,labelColor:C.dim});
    }
    const cue=(t,name,note,gain=0.7)=>s.sfx(t,name,{note,gain});
    function packet(t,from,to,label,color=C.fg,dur=.45,note='E6') {
      s.packet({t,route:[from,to],dur,kind:'chip',label,color}); cue(t,'send',note,.85);
      s.ripple(t+dur,to,color,{r1:44,dur:.32});cue(t+dur,'arrive',note==='C6'?'E5':'G5',.52);
    }
    function count(t,n,color=C.bad){set(t,'count','text',`${n} call${n===1?'':'s'}`);set(t,'count','color',color);set(t,'call'+(n-1),'color',color,.08);set(t,'call'+(n-1),'labelColor',color,.08);}
    function resetCount(t,max){set(t,'count','text','0 calls');set(t,'count','color',C.mid);for(let i=0;i<6;i++){set(t,'call'+i,'color',C.dim);set(t,'call'+i,'labelColor',C.dim);set(t,'call'+i,'alpha',i<max?1:0,.18);}}
    function failed(t,n,end) {
      set(t,'wait','text','');set(t,'tool','sublabel','Waiting…');set(t,'tool','subColor',C.accent);
      packet(t,'tool.bottom','index.top','READ',C.accent,.4,'E6');
      count(t+.4,n);s.pulse(t+.4,'index',C.bad,.2);
      set(end,'tool','sublabel','TIMEOUT');set(end,'tool','subColor',C.bad);s.shake(end,'tool',7,.3);s.ripple(end,'tool.bottom',C.bad,{mark:'x',r1:52,dur:.4});cue(end,'thump','E4',.8);
    }
    // 1. Establish a successful read before failure; one filled call token.
    set(0,'screen','veil',1);set(.2,'screen','veil',0,.35);cue(.2,'recover','C4',.35);
    packet(.75,'agent.bottom','tool.top','READ',C.fg,.45,'C6');
    set(1.2,'tool','sublabel','Waiting…');packet(1.4,'tool.bottom','index.top','READ');
    count(1.85,1,C.ok);set(1.85,'index','color',C.ok,.15);set(1.85,'index','sublabel','Found');cue(1.85,'hit','G5',.6);
    packet(2.25,'index.top','tool.bottom','RESULT',C.ok,.45);
    set(2.7,'tool','sublabel','Complete');set(2.7,'tool','subColor',C.ok);
    packet(2.95,'tool.top','agent.bottom','RESULT',C.ok,.45,'C6');
    set(3.4,'agent','sublabel','Complete');set(3.4,'agent','subColor',C.ok);cue(3.4,'chime','C6',.7);
    // 2. Two agent invocations, three service attempts each: six actual reads.
    set(5.3,'phase','text','STACKED RETRIES');set(5.3,'phase','color',C.bad);
    set(5.3,'agentPolicy','text','2 tries');set(5.3,'toolPolicy','text','3 tries');
    set(5.3,'agent','sublabel','Search again');set(5.3,'agent','subColor',C.mid);
    set(5.3,'tool','sublabel','Ready');set(5.3,'tool','subColor',C.mid);
    set(5.3,'index','color',C.bad);set(5.3,'index','sublabel','Unresponsive');set(5.3,'index','subColor',C.bad);
    resetCount(5.3,6);s.shake(5.3,'index',14,.5);cue(5.3,'crash','A5',.85);
    packet(5.9,'agent.bottom','tool.top','1 / 2',C.accent,.45,'C6');
    failed(6.5,1,7.35);failed(7.65,2,8.5);failed(8.8,3,9.65);
    packet(9.85,'tool.top','agent.bottom','FAILED',C.bad,.4,'C6');
    packet(10.4,'agent.bottom','tool.top','2 / 2',C.accent,.45,'C6');
    failed(11,4,11.85);failed(12.15,5,13);failed(13.3,6,14.15);
    set(14.15,'arithmetic','text','2 × 3 = 6');cue(14.15,'miss','E4',.75);
    // 3. Policy lives in the harness/tool. Outer invocation cannot restart it.
    set(16,'phase','text','ONE RETRY OWNER');set(16,'phase','color',C.ok);
    resetCount(16,3);set(16,'arithmetic','text','');set(16,'agentPolicy','text','1 try');set(16,'toolPolicy','text','3 tries');
    set(16,'agentPolicy','color',C.ok);set(16,'toolPolicy','color',C.ok);
    set(16,'agent','sublabel','Wait for tool');set(16,'agent','subColor',C.mid);
    set(16,'tool','sublabel','Retry owner');set(16,'tool','subColor',C.ok);set(16,'tool','color',C.ok,.2);s.pulse(16,'tool');cue(16,'store','E5',.9);
    set(17.5,'budget','alpha',1,.2);set(17.5,'budgetLabel','alpha',1,.2);cue(17.5,'clock','A6',.8);
    packet(18.4,'agent.bottom','tool.top','READ',C.fg,.45,'C6');
    // 4. One six-second budget includes calls and sampled backoff waits.
    set(19.1,'budget','seg0',0,6,'linear');
    failed(19.1,1,20.1);set(20.1,'wait','text','1.3 s');
    set(20.1,'tool','sublabel','Backoff');set(20.1,'tool','subColor',C.accent);
    cue(20.1,'clock','A6',.9);
    failed(21.4,2,22.4);set(22.4,'wait','text','1.8 s');
    set(22.4,'tool','sublabel','Backoff');set(22.4,'tool','subColor',C.accent);cue(22.4,'clock','A6',.9);
    failed(24.2,3,25.1);
    // 5. Global deadline cuts off the final wait; report failure once. No fourth read.
    set(25.1,'phase','text','BUDGET EXHAUSTED');set(25.1,'phase','color',C.accent);
    set(25.1,'tool','sublabel','STOP');set(25.1,'tool','subColor',C.accent);set(25.1,'budgetLabel','text','0 s left');
    set(25.1,'arithmetic','text','1 × 3 = 3');set(25.1,'arithmetic','color',C.ok);
    set(25.1,'wire:lower','color',C.dim);set(25.1,'wire:lower','dashed',1);s.ripple(25.1,'tool.bottom',C.accent,{r1:80,dur:.6});
    packet(25.8,'tool.top','agent.bottom','FAILED',C.accent,.55,'C6');
    set(26.35,'agent','sublabel','Hand off');set(26.35,'agent','subColor',C.accent);s.pulse(26.35,'agent');cue(26.35,'deliver','C5',.85);
    set(29.6,'screen','veil',1,.65);cue(29.6,'poof','C4',.5);
  }
});

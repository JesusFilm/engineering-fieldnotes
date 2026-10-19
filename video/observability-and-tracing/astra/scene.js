/* Independent lesson authored by gpt-6-astra, high reasoning, 2026-10-19.
 * Illustrative synchronous task: model 0.6s, tool 2.4s, total 3.0s.
 * Run B is a new execution, not retroactive repair of Run A telemetry.
 */
FlowVideo.scene({
  meta:{title:'Follow the tool',subtitle:'TRACE CONTEXT',duration:28,fps:30,speed:1,fadeTitle:true},
  build(s){
    const C=s.THEME, blue=C.info, amber=C.accent;
    const cue=(t,name,note='C5',gain=.7)=>s.sfx(t,name,{note,gain});
    const set=(t,id,p,v,d=0)=>s.set(t,id,p,v,d);
    const label=(id,x,y,text,size=42,color=C.fg)=>s.node(id,'label',{x,y,text,size,color});
    label('run',540,505,'RUN A',44);
    label('key',540,562,'TRACE / SPAN',30,C.mid);
    s.node('agent','box',{x:540,y:675,w:410,h:154,label:'Agent task',labelSize:48,sublabel:'7B / a',subColor:blue,color:blue});
    s.node('model','box',{x:285,y:950,w:350,h:154,label:'Model',labelSize:48,sublabel:'7B / m',subColor:blue,color:blue});
    s.node('tool','box',{x:795,y:950,w:350,h:154,label:'Test tool',labelSize:48,sublabel:'—',color:C.dim});
    s.wire('model','agent.bottom','model.top',{via:[[285,810]],color:blue});
    s.wire('tool','agent.bottom','tool.top',{via:[[795,810]],color:C.dim});
    label('state',540,1110,'PARENT → CHILD',44,blue);
    for(const [id,y,txt] of [['taskBar',1250,'Agent task'],['modelBar',1400,'Model'],['toolBar',1550,'Test tool']]){
      s.node(id,'interval',{x:540,y,w:780,label:txt,length:0,color:blue});
    }
    label('zero',150,1650,'0',36,C.mid);
    label('end',920,1650,'3.0 s',36,C.mid);
    s.wire('group',[130,1250],[130,1400],{via:[[105,1250],[105,1400]],color:blue});
    s.wire('join',[105,1400],[130,1550],{via:[[105,1550]],color:blue});
    set(0,'wire:join','alpha',0);
    set(16.8,'wire:join','alpha',1,.3);
    label('illustration',540,1760,'ILLUSTRATIVE · IDs shortened',34,C.mid);
    // Opening and closing full black for an exact encoded loop.
    s.fade(0,1,0);s.fade(.6,0,.4);cue(.6,'arrive','C5',.55);
    // Beat 1: one normal nested operation. Common trace ID, different span IDs.
    s.packet({t:1.3,dur:.75,route:['agent.bottom',[285,810],'model.top'],kind:'dot',color:blue});cue(1.3,'send','C6');
    set(2.05,'modelBar','length',.2,.6);set(2.05,'taskBar','length',.2,.6);
    set(2.05,'modelBar','end','0.6 s');s.pulse(2.05,'model');cue(2.05,'arrive','E5');
    s.ripple(2.65,'model.right',blue,{mark:'check',r1:44});cue(2.65,'ack','E6');
    // Beat 2: tool executes, but the transport loses context; the receiving span is a new trace.
    set(5,'state','text','CONTEXT LOST');set(5,'state','color',C.bad);
    set(5,'wire:tool','color',C.bad);set(5,'wire:tool','dashed',1);cue(5,'miss','E4',1);
    s.packet({t:5.3,dur:.75,route:['agent.bottom',[795,810],'tool.top'],kind:'envelope',color:C.fg});cue(5.3,'send','C6');
    set(6.05,'tool','sublabel','9C / t');set(6.05,'tool','color',amber);set(6.05,'tool','subColor',amber);
    set(6.05,'toolBar','color',amber);set(6.05,'toolBar','label','Test tool · 9C');
    set(6.05,'toolBar','start',.2);set(6.05,'toolBar','length',.8,2.4);
    set(6.05,'taskBar','length',1,2.4);cue(6.05,'thump','G3',.8);s.shake(6.05,'tool',8);
    for(let t=6.65;t<8.4;t+=.6){s.pulse(t,'tool',null,.2);cue(t,'work','G3',.65);}
    set(8.45,'toolBar','end','2.4 s');set(8.45,'taskBar','end','3.0 s');cue(8.45,'deliver','G4');
    // The separate trace is visible for comparison. It was never part of Run A's trace tree.
    set(8.45,'state','text','7B ≠ 9C');cue(8.45,'miss','E4',.55);
    // Beat 3: repair propagation and run again. Reset bars so old data is not magically stitched.
    set(11,'run','text','RUN B');set(11,'agent','sublabel','8D / a');set(11,'model','sublabel','8D / m');
    set(11,'tool','sublabel','—');set(11,'tool','color',C.dim);set(11,'tool','subColor',C.mid);
    for(const id of ['taskBar','modelBar','toolBar']){set(11,id,'length',0);set(11,id,'end','');}
    set(11,'toolBar','label','Test tool');set(11,'toolBar','color',blue);
    set(11,'state','text','INJECT → EXTRACT');set(11,'state','color',blue);
    set(11,'wire:tool','dashed',0);set(11,'wire:tool','color',blue);cue(11,'recover','C4',.7);
    s.packet({t:11.8,dur:.75,route:['agent.bottom',[285,810],'model.top'],kind:'dot',color:blue});cue(11.8,'send','C6');
    set(12.55,'modelBar','length',.2,.6);set(12.55,'taskBar','length',.2,.6);set(12.55,'modelBar','end','0.6 s');cue(12.55,'arrive','E5');s.pulse(12.55,'model');
    // Dedicated mid-wire lane keeps the header chip clear of nodes.
    s.packet({t:14,dur:1.3,route:[[560,805],[900,805],[900,850]],kind:'chip',label:'traceparent',color:blue});cue(14,'send','C6',1);
    set(15.3,'tool','sublabel','8D / t');set(15.3,'tool','color',blue);set(15.3,'tool','subColor',blue);
    s.ripple(15.3,'tool.right',blue,{r1:44,mark:'check'});cue(15.3,'store','G5',1);
    // Beat 4: the tool interval now belongs to the agent trace. Latency remains unchanged.
    set(16.8,'state','text','ONE TRACE · 8D');set(16.8,'state','color',blue);
    set(16.8,'toolBar','length',.8,2.4);set(16.8,'taskBar','length',1,2.4);cue(16.8,'arrive','G5');
    for(let t=17.4;t<19.1;t+=.6){s.pulse(t,'tool',null,.2);cue(t,'work','G3',.65);}
    set(19.2,'taskBar','end','3.0 s');set(19.2,'toolBar','end','2.4 s');cue(19.2,'deliver','G5');
    // Beat 5: select slow operation; resolution is diagnostic visibility, not a speed improvement.
    set(21.2,'model','alpha',.35,.4);set(21.2,'wire:model','alpha',.25,.4);set(21.2,'modelBar','alpha',.35,.4);
    set(21.2,'toolBar','color',amber);set(21.2,'tool','color',amber);set(21.2,'state','text','TOOL TIME');set(21.2,'state','color',amber);cue(21.2,'hit','G5',.8);
    s.pulse(23.7,'tool',null,.45);cue(23.7,'arrive','G5',.55);
    s.fade(25.3,1,.7);cue(25.3,'poof','C5',.35);
  }
});

/* Independently authored by gpt-6-astra, high reasoning.
 * Illustrative bounded local FIFO: six jobs, three waiting places, one worker.
 * No broker delivery guarantees or model/provider performance claims.
 */
const ASTRA_EVENTS = [];
globalThis.ASTRA_EVENTS = ASTRA_EVENTS;
FlowVideo.scene({
  meta: {title:'Queued ≠ complete', titleSize:84, subtitle:'AGENT TOOL BACKPRESSURE', duration:30, fps:30, speed:1, fullFade:true},
  build(s) {
    const T=s.THEME;
    const xs=[370,550,730];
    s.node('producer','box',{x:550,y:600,w:570,h:200,label:'Doc-check agent',sublabel:'Ready',labelSize:52,sublabelSize:44,color:T.fg});
    s.node('queue','box',{x:550,y:1000,w:650,h:230,label:'',color:T.mid});
    s.node('queueLabel','label',{x:550,y:825,text:'Waiting · 0 / 3',size:52,color:T.fg});
    xs.forEach((x,i)=>s.node('q'+i,'box',{x,y:1000,w:145,h:120,label:'—',labelSize:64,color:T.dim}));
    s.node('worker','box',{x:550,y:1430,w:570,h:210,label:'Search tool',sublabel:'Idle · 1 slot',labelSize:52,sublabelSize:44,color:T.mid});
    s.node('progress','bar',{x:550,y:1510,w:480,h:12,seg0:0,seg0Color:T.accent,color:T.dim});
    s.node('done','label',{x:550,y:1635,text:'Done 0 / 6',size:46,color:T.mid});
    s.node('fstatus','label',{x:550,y:1720,text:'',size:50,color:T.accent});
    s.node('note','label',{x:540,y:1810,text:'ILLUSTRATIVE · LOCAL QUEUE',size:34,color:T.mid});
    s.wire('in','producer.right',[881,1000],{via:[[930,600],[930,1000]]});
    s.wire('out',[550,1121],'worker.top');
    const feedback=[[219,1000],[135,1000],[135,600],[259,600]];
    s.wire('feedback',feedback[0],feedback[3],{via:feedback.slice(1,3),color:T.accent});
    s.set(0,'wire:feedback','alpha',0,0);
    s.node('hold','label',{x:550,y:741,text:'',size:44,color:T.accent});
    s.fade(0,1,0);s.fade(.4,0,.5);s.sfx(.4,'arrive',{note:'C4',gain:.35});
    const queue=[];let active=null, completed=0;
    function cue(t,name,note,gain=1,at='queue') {s.sfx(t,name,{note,gain,pan:s.panOf(at)});}
    function event(t,type,job,detail={}) {ASTRA_EVENTS.push({t,type,job,...detail});}
    function show(t) {
      xs.forEach((x,i)=>{s.set(t,'q'+i,'label',queue[i]||'—',0);s.set(t,'q'+i,'color',queue[i]?T.accent:T.dim,0);});
      s.set(t,'queueLabel','text',`Waiting · ${queue.length} / 3`,0);
      s.set(t,'queue','color',queue.length===3?T.accent:T.mid,.15);
    }
    function send(t,job) {
      s.set(t,'producer','sublabel','Send '+job,0);s.pulse(t,'producer');
      s.packet({t,dur:.6,route:['producer.right',[930,600],[930,1000],[881,1000]],kind:'chip',label:job,color:T.fg});
      cue(t,'send','C6',.9,'producer');event(t,'send',job);
    }
    function enqueue(t,job) {
      if(queue.length>=3)throw Error('Queue overflow');
      queue.push(job);show(t);s.set(t,'producer','sublabel','Ready',0);cue(t,'store','E5',.9);event(t,'enqueue',job,{waiting:[...queue]});
    }
    function take(t,job,end) {
      if(active || queue[0]!==job)throw Error('FIFO/concurrency violation');
      queue.shift();active=job;show(t);
      s.packet({t,dur:.6,route:[[xs[0],1000],[xs[0],1170],[550,1170],'worker.top'],kind:'chip',label:job,color:T.accent});
      cue(t,'send','E5',.9);event(t,'dequeue',job,{waiting:[...queue]});
      s.set(t+.6,'worker','sublabel','Running '+job,0);s.set(t+.6,'worker','color',T.fg,.1);
      s.set(t+.6,'progress','seg0',0,0);s.set(t+.61,'progress','seg0',1,end-t-.61,'linear');
      cue(t+.6,'arrive','G5',.8,'worker');
      for(let u=t+1.1;u<end-.15;u+=.55){cue(u,'work','G3',.3,'worker');s.pulse(u,'progress',undefined,.15);}
      event(t+.6,'start',job);
    }
    function finish(t,job) {
      if(active!==job)throw Error('Wrong completion');active=null;completed++;
      s.set(t,'worker','sublabel',job+' complete',0);s.set(t,'worker','color',T.ok,.1);s.set(t,'progress','seg0',0,.1);
      s.set(t,'done','text',`Done ${completed} / 6`,0);s.set(t,'done','color',T.ok,.1);
      cue(t,'deliver','G5',.9,'worker');event(t,'complete',job);
    }
    // Schedule in chronological order so the audit checks the actual queue.
    send(1.2,'A');enqueue(1.8,'A');take(2.4,'A',4.6);finish(4.6,'A');
    send(5.6,'B');enqueue(6.2,'B');take(6.7,'B',14.6);
    send(8,'C');enqueue(8.6,'C');send(9,'D');enqueue(9.6,'D');send(10,'E');enqueue(10.6,'E');
    // F has not entered the queue. Its put waits at the producer.
    s.set(10.8,'producer','sublabel','Next: F',0);s.set(10.8,'wire:feedback','alpha',1,.15);
    s.packet({t:10.8,dur:.8,route:feedback,kind:'chip',label:'FULL',color:T.accent});cue(10.8,'thump','C3',.8);event(10.8,'full-signal','F');s.set(10.8,'fstatus','text','F · NOT ADMITTED',0);
    s.set(11.6,'producer','color',T.accent,.1);s.set(11.6,'producer','sublabel','Ⅱ  F waiting',0);s.set(11.6,'hold','text','PAUSED',0);
    s.set(11.6,'wire:in','alpha',.2,.1);s.shake(11.6,'producer',7,.3);cue(11.6,'thump','C3',1.2,'producer');event(11.6,'producer-blocked','F');
    finish(14.6,'B');take(15,'C',19.8);
    s.packet({t:15,dur:.8,route:feedback,kind:'chip',label:'SPACE',color:T.ok});cue(15,'recover','C4',.65);
    s.set(15.8,'producer','color',T.fg,.1);s.set(15.8,'producer','sublabel','Resume F',0);s.set(15.8,'hold','text','RESUMED',0);s.set(15.8,'hold','color',T.ok,0);s.set(15.8,'wire:in','alpha',1,.1);
    cue(15.8,'chime','C5',.8,'producer');event(15.8,'producer-resumed','F');
    send(16.6,'F');enqueue(17.2,'F');
    s.set(17.2,'fstatus','text','F · QUEUED',0);s.pulse(17.2,'q2');
    s.set(17.2,'producer','sublabel','Batch submitted',0);s.set(17.2,'hold','text','',0);s.set(17.2,'wire:feedback','alpha',0,.3);
    finish(19.8,'C');take(20.2,'D',22.2);finish(22.2,'D');take(22.6,'E',24.6);finish(24.6,'E');take(25,'F',27);
    s.set(25,'fstatus','text','F · DISPATCHING',0);s.set(25.6,'fstatus','text','F · RUNNING',0);
    finish(27,'F');s.set(27,'fstatus','text','F · COMPLETE',0);s.set(27,'fstatus','color',T.ok,.1);
    s.set(27,'producer','color',T.ok,.15);s.set(27,'worker','sublabel','Idle · 1 slot',0);s.set(27,'queue','color',T.ok,.15);cue(27,'chime','C6',.8,'done');
    event(27,'batch-complete',null,{completed});
    s.fade(28.7,1,.3);cue(28.7,'poof','C4',.25);
  }
});

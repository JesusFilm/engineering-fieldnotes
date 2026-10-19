/* Independent gpt-6-astra scene, 2026-10-19. Application-side freshness check,
   not a claim of automatic memory invalidation. All times are seconds. */
FlowVideo.scene({
 meta:{title:'Recall ≠ current',titleSize:88,fullFade:true,subtitle:'MEMORY ARCHITECTURE',subtitleSize:36,subtitleSpacing:3,duration:28,fps:30,speed:1},
 build(s){
  const C=s.THEME;
  s.node('repo','box',{x:540,y:650,w:700,h:180,label:'REPOSITORY · r1',labelSize:44,sublabel:'npm test',subSize:52,subColor:C.fg,color:C.mid});
  s.node('memory','box',{x:540,y:1010,w:700,h:180,label:'SAVED MEMORY',labelSize:44,sublabel:'—',subSize:52,subColor:C.fg,color:C.mid});
  s.node('session','box',{x:540,y:1370,w:700,h:180,label:'SESSION A',labelSize:44,sublabel:'—',subSize:52,subColor:C.fg,color:C.mid});
  s.node('status','label',{x:540,y:1640,text:'APPROVED SOURCE',size:46,weight:700,color:C.mid});
  s.node('example','label',{x:540,y:1760,text:'ILLUSTRATIVE WORKFLOW',size:34,weight:500,color:C.mid});
  s.wire('save','repo.bottom','memory.top');
  s.wire('recall','memory.bottom','session.top');
  s.wire('check','repo.right','session.right',{via:[[970,650],[970,1370]]});
  s.set(0,'wire:check','alpha',0,0);
  s.fade(0,1,0);s.fade(.5,0,.5);s.sfx(.5,'arrive',{note:'C5',gain:.45});
  const cue=(t,name,id,note='E5',gain=.7)=>s.sfx(t,name,{note,gain,pan:s.panOf(id)});
  const status=(t,text,color)=>{s.set(t,'status','text',text,0);s.set(t,'status','color',color,0);};
  function land(t,id,label,command,color,sound='arrive'){
    s.set(t,id,'label',label,0);s.set(t,id,'sublabel',command,0);s.set(t,id,'color',color,0);
    s.pulse(t,id);s.ripple(t,id+'.top',color,{r1:48,dur:.5});cue(t,sound,id,id==='memory'?'E5':'G5');
  }
  function move(t,from,to,color,dur=.8){
    s.packet({t,dur,route:[from+'.bottom',to+'.top'],color});cue(t,'send',from,'C6',.45);
  }
  // 1. Approved source -> durable record -> current task.
  move(1.2,'repo','memory',C.ok);
  land(2,'memory','SAVED MEMORY · r1','npm test',C.ok,'store');
  move(3,'memory','session',C.ok);
  land(3.8,'session','SESSION A · r1','npm test',C.ok);
  status(3.8,'r1 = r1',C.ok);
  // 2. Source changes independently; a fresh session has no command yet.
  land(6.2,'repo','REPOSITORY · r2','pnpm test',C.info,'store');
  status(6.2,'SOURCE CHANGED',C.info);
  land(8.3,'session','SESSION B','—',C.mid,'poof');
  status(8.3,'NEW SESSION',C.mid);
  // 3. Recall succeeds, but source validation finds a stale candidate.
  move(10.5,'memory','session',C.accent);
  land(11.3,'session','SESSION B · r1','npm test',C.accent,'hit');
  status(11.3,'RECALLED r1',C.accent);
  s.set(12.5,'wire:check','alpha',1,.2);
  s.set(12.5,'wire:check','color',C.info,0);
  s.packet({t:12.5,dur:1.3,route:['repo.right',[970,650],[970,1370],'session.right'],color:C.info});
  status(12.5,'REVISION CHECK',C.info);cue(12.5,'send','repo','C6',.6);
  s.set(13.8,'memory','color',C.accent,0);s.set(13.8,'session','color',C.bad,0);s.shake(13.8,'session',14);
  s.ripple(13.8,'session.right',C.bad,{mark:'x',r1:75});
  s.set(13.8,'wire:recall','color',C.bad,0);s.set(13.8,'wire:recall','dashed',1,0);
  status(13.8,'r1 ≠ r2 · STOP',C.bad);cue(13.8,'crash','session',180,.85);
  // 4. Discard the candidate, refresh the saved record, then supply context.
  land(16,'memory','SAVED MEMORY','—',C.mid,'poof');
  s.set(16,'session','sublabel','—',0);s.set(16,'session','label','SESSION B',0);
  s.set(16,'session','color',C.mid,0);s.set(16,'wire:check','alpha',0,.3);
  status(16,'INVALIDATE r1',C.mid);
  move(17,'repo','memory',C.info,1);
  land(18,'memory','SAVED MEMORY · r2','pnpm test',C.ok,'store');
  status(18,'REFRESH FROM SOURCE',C.ok);
  s.set(19.2,'wire:recall','color',C.ok,0);s.set(19.2,'wire:recall','dashed',0,0);
  move(19.2,'memory','session',C.ok,1);
  land(20.2,'session','SESSION B · r2','pnpm test',C.ok,'recover');
  status(20.2,'r2 = r2',C.ok);
  // 5. Execute the verified command; hold the illustrative result.
  for(const t of [22,22.3,22.6]){s.pulse(t,'session');cue(t,'work','session','G4',.6);}
  status(22,'RUN TESTS',C.accent);
  s.set(23.2,'session','color',C.ok,0);s.ripple(23.2,'session.bottom',C.ok,{mark:'check',r1:65});
  status(23.2,'TESTS PASS',C.ok);cue(23.2,'chime','session','G5',.8);
  s.fade(26.2,1,.8);cue(26.2,'poof','session','C5',.35);
 }
});

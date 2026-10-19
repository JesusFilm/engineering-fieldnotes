/* Independent gpt-6-astra lesson. Synthetic counts, not a measured experiment.
 * Window: 10,000 requests; v1=9,000; v2=1,000. Exports are 10% in each.
 * v1 export errors 0/900; v2 export errors 40/100. Overall errors 40/10,000.
 * Animated envelopes show routing proportions, not individual measurement samples.
 */
FlowVideo.scene({
  meta:{title:'Canary releases',subtitle:'SPLIT THE SIGNAL',duration:30,fps:30,speed:1},
  build(s){
    const C=s.THEME;
    const label=(id,x,y,text,size=46,color=C.fg,alpha=1)=>s.node(id,'label',{x,y,text,size,color,alpha});
    const cue=(t,name,note='C5',gain=.6,pan=0)=>s.sfx(t,name,{note,gain,pan});
    s.node('router','box',{x:540,y:620,w:700,h:140,label:'Traffic router',labelSize:52,color:C.fg});
    s.node('share','bar',{x:540,y:800,w:780,h:28,segments:2,seg0:1,seg1:0,seg0Color:C.ok,seg1Color:C.accent});
    label('change',540,495,'Release v2 · agent change',42,C.accent,0);
    label('leftShare',290,890,'100%',56,C.ok);
    label('rightShare',790,890,'0%',56,C.mid);
    s.node('stable','box',{x:290,y:1040,w:390,h:150,label:'v1 · stable',labelSize:46,color:C.ok});
    s.node('candidate','box',{x:790,y:1040,w:390,h:150,label:'v2 · canary',labelSize:46,color:C.mid,alpha:.35});
    s.wire('left',[160,828],'stable.top',{color:C.ok,via:[[160,945]]});
    s.wire('right',[920,828],'candidate.top',{color:C.dim,via:[[920,945]]});
    label('window',540,1205,'ERRORS · PRIOR WINDOW',38);
    s.node('overall','metric',{x:540,y:1390,w:890,h:260,label:'All requests',value:'0%',detail:'0 / 10,000',color:C.ok});
    s.node('v1metric','metric',{x:290,y:1390,w:390,h:260,label:'v1 exports',value:'0%',detail:'0 / 900',color:C.ok,alpha:0});
    s.node('v2metric','metric',{x:790,y:1390,w:390,h:260,label:'v2 exports',value:'40%',detail:'40 / 100',color:C.bad,alpha:0});
    s.node('gate','box',{x:540,y:1665,w:890,h:110,label:'Observe',labelSize:48,color:C.mid});
    label('illustrative',540,1795,'ILLUSTRATIVE DATA',36,C.mid);
    // Exact loop closure is full-frame black; resolution is held before the fade.
    s.fade(0,1,0);s.fade(.4,0,.4);cue(.4,'recover','C4',.25);
    function route(t,isCandidate=false){
      const id=isCandidate?'candidate':'stable', x=isCandidate?920:160;
      s.packet({t,dur:.25,route:['router.bottom',[540,800],[x,800],[x,945],id+'.top'],color:isCandidate?C.accent:C.ok});
      cue(t,'send',isCandidate?'E6':'C6',isCandidate?.16:.045,isCandidate?.3:-.3);
      if(isCandidate){s.pulse(t+.25,id,C.accent,.16);cue(t+.25,'arrive','E5',.35,.3);}
    }
    [1.2,2.1,3].forEach(t=>route(t));
    s.pulse(3.3,'stable',C.ok);cue(3.3,'chime','C5',.4,-.3);
    // Two complete 9:1 routing cycles, not a single token standing for ten percent.
    s.set(5.5,'change','alpha',1,.35);s.set(5.5,'candidate','alpha',1,.35);
    s.set(5.5,'candidate','color',C.accent,.35);cue(5.5,'store','E5',.6,.3);
    s.set(6,'share','seg0',.9,.4);s.set(6,'share','seg1',.1,.4);
    s.set(6,'leftShare','text','90%',0);s.set(6,'rightShare','text','10%',0);
    s.set(6,'rightShare','color',C.accent,0);s.set(6,'wire:right','color',C.accent,.3);cue(6,'work','E4',.45);
    s.set(6,'window','text','ERRORS · COLLECTING',0);
    s.set(6,'overall','value','…',0);s.set(6,'overall','detail','New window',0);s.set(6,'overall','color',C.mid,.3);
    for(let i=0;i<20;i++)route(6.7+i*.29,i%10===9);
    // Low pooled rate conceals a concentrated regression. Green is not approval.
    s.set(13,'window','text','ERRORS · CURRENT WINDOW',0);s.set(13,'overall','color',C.ok,.2);
    s.set(13,'overall','value','0.4%',0);s.set(13,'overall','detail','40 / 10,000',0);
    s.set(13,'gate','label','Promotion pending',0);s.pulse(13,'gate',C.accent);cue(13,'clock','E5',.6);
    s.set(14.5,'overall','borderColor',C.accent,0);s.set(15.15,'overall','borderColor',C.ok,.2);
    s.pulse(14.5,'overall',undefined,.65);cue(14.5,'clock','E5',.45);
    // Reveal the same measurement window by endpoint AND version.
    s.set(16.4,'overall','alpha',0,.35);s.set(16.8,'window','text','EXPORT ERRORS · SAME WINDOW',0);cue(16.8,'send','C5',.2);cue(16.4,'work','C4',.5);
    s.set(17,'v1metric','alpha',1,.3);cue(17,'arrive','C5',.55,-.3);
    s.set(17.7,'v2metric','alpha',1,.2);s.shake(17.7,'v2metric',12,.45);cue(17.7,'crash','E3',.8,.3);
    s.ripple(18.1,[790,1535],C.bad,{mark:'x',r1:45,dur:.7});cue(18.1,'thump','E3',.55,.3);
    s.packet({t:20,dur:.45,kind:'dot',route:[[790,1530],[790,1580],[540,1604]],color:C.bad});cue(20,'send','E4',.25,.3);
    s.set(20.45,'gate','label','Promotion blocked',0);s.set(20.45,'gate','color',C.bad,.1);
    s.shake(20.45,'gate',8,.4);cue(20.45,'thump','C3',.7);
    // Abort traffic exposure. Historical failure remains visible; no magic repair.
    s.set(22.6,'gate','label','Abort → traffic to v1',0);cue(22.6,'recover','C4',.65);
    s.set(22.6,'share','seg0',1,.5);s.set(22.6,'share','seg1',0,.5);
    s.set(23.1,'leftShare','text','100%',0);s.set(23.1,'rightShare','text','0%',0);
    s.set(23.1,'rightShare','color',C.mid,.15);s.set(23.1,'candidate','alpha',.35,.2);
    s.set(23.1,'wire:right','color',C.dim,.2);s.set(23.1,'wire:right','dashed',1,0);
    s.set(23.1,'window','text','EXPORT ERRORS · FAILED WINDOW',0);
    s.set(23.1,'gate','color',C.ok,.25);cue(23.1,'chime','C5',.55,-.3);
    [23.6,24.5,25.4].forEach(t=>route(t));
    s.pulse(25.65,'stable',C.ok);cue(25.65,'arrive','C5',.5,-.3);
    s.fade(28.6,1,.6);cue(28.6,'poof','C4',.2);
  }
});

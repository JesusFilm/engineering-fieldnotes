/* Independent concept and scene: gpt-6-astra, high reasoning, 2026-10-19.
 * Illustration only. Two checks do not establish production readiness.
 */
FlowVideo.scene({
  meta: { title: 'Test the fix', subtitle: 'AGENT EVALS', duration: 28, fps: 30, speed: 1, fullFrameFade: true },
  build(s) {
    const C=s.THEME;
    s.node('context','label',{x:540,y:495,text:'AUTH FIX · ILLUSTRATION',size:38});
    s.node('patch','box',{x:540,y:650,w:520,h:140,label:'Agent patch A',labelSize:54,color:C.fg});
    for(const [id,x,label,expected] of [['empty',285,'Empty password','Expect REJECT'],['valid',795,'Valid password','Expect ACCEPT']]) {
      s.node(id,'box',{x,y:965,w:450,h:180,label,labelSize:46,sublabel:expected,subSize:40,subGap:32,subColor:C.fg});
      s.node(id+'Result','box',{x,y:1230,w:390,h:110,label:'—',labelSize:52});
      s.node(id+'Grade','label',{x,y:1360,text:'',size:62,weight:700});
      s.wire(id+'In','patch.bottom',id+'.top',{via:[[540,790],[x,790]]});
      s.wire(id+'Out',id+'.bottom',id+'Result.top');
      s.wire(id+'Gate',id+'Result.bottom','gate.top',{via:[[x,1305],[x<540?70:1010,1305],[x<540?70:1010,1450],[540,1450]]});
    }
    s.node('gate','box',{x:540,y:1590,w:700,h:140,label:'Awaiting checks',labelSize:52});
    s.node('count','label',{x:540,y:1750,text:'0 / 2 passed',size:46});
    const cue=(t,preset,id,note,gain=0.8)=>s.sfx(t,preset,{note,gain,pan:s.panOf(id)});
    function run(t,id,output,pass,count) {
      const c=pass?C.ok:C.bad;
      s.packet({t,route:['patch.bottom',[540,790],[id==='empty'?285:795,790],id+'.top'],dur:0.7,color:C.accent});
      cue(t,'send','patch','C6',0.7);
      s.set(t+0.7,id,'color',C.accent,0.1); s.pulse(t+0.7,id);
      cue(t+0.7,'arrive',id,id==='empty'?'C5':'E5');
      s.packet({t:t+1.1,route:[id+'.bottom',id+'Result.top'],dur:0.55,color:C.fg});
      cue(t+1.1,'work',id,'C4',0.65);
      s.set(t+1.65,id+'Result','label',output,0); s.set(t+1.65,id+'Result','color',C.fg,0.1);
      cue(t+1.65,'store',id,'E5',0.7);
      s.set(t+2.2,id+'Grade','text',pass?'✓ PASS':'× FAIL',0);
      s.set(t+2.2,id+'Grade','color',c,0);
      s.set(t+2.2,id+'Result','color',c,0.1);s.set(t+2.2,id,'color',c,0.1);
      s.set(t+2.2,'count','text',count,0);
      cue(t+2.2,pass?'chime':'crash',id,pass?(id==='empty'?'C5':'E5'):'C3',pass?0.7:0.95);
      if(!pass)s.shake(t+2.2,id+'Result',14);
    }
    s.fade(0,1,0);s.fade(0.15,0,0.65);cue(0.15,'arrive','patch','C5',0.6);
    // Normal: the new requirement passes.
    run(1.1,'empty','REJECT',true,'1 / 2 passed');
    // Problem: a patch rejecting every login passes only the new check.
    run(5.8,'valid','REJECT',false,'1 / 2 passed');
    // Both outcomes feed the same all-required gate.
    for(const id of ['empty','valid']) {
      s.packet({t:10.5,route:[id+'Result.bottom',[id==='empty'?285:795,1305],[id==='empty'?70:1010,1305],[id==='empty'?70:1010,1450],[540,1450],'gate.top'],dur:0.8,color:id==='empty'?C.ok:C.bad});
    }
    cue(10.5,'send','gate','C5',0.65);
    s.set(11.3,'gate','label','× BLOCKED',0);s.set(11.3,'gate','color',C.bad,0);
    s.shake(11.3,'gate',10);cue(11.3,'thump','gate','C3',0.9);
    // Resolution begins with a revised artifact and cleared results.
    s.set(14,'patch','label','Agent patch B',0);s.pulse(14,'patch');cue(14,'recover','patch','C5',0.8);
    for(const id of ['empty','valid']) {
      s.set(14,id,'color',C.mid,0.25);s.set(14,id+'Result','color',C.mid,0.25);
      s.set(14,id+'Result','label','—',0);s.set(14,id+'Grade','text','',0);
    }
    s.set(14,'gate','label','Fresh checks',0);s.set(14,'gate','color',C.mid,0.2);s.set(14,'count','text','0 / 2 passed',0);
    run(14.8,'empty','REJECT',true,'1 / 2 passed');
    run(18.3,'valid','ACCEPT',true,'2 / 2 passed');
    for(const id of ['empty','valid'])s.packet({t:23,route:[id+'Result.bottom',[id==='empty'?285:795,1305],[id==='empty'?70:1010,1305],[id==='empty'?70:1010,1450],[540,1450],'gate.top'],dur:0.8,color:C.ok});
    cue(23,'send','gate','G5',0.7);
    s.set(23.8,'gate','label','→ Human review',0);s.set(23.8,'gate','color',C.ok,0.1);
    cue(23.8,'deliver','gate','G5',0.8);s.pulse(23.8,'gate');
    s.fade(26.7,1,0.65);cue(26.7,'poof','gate','C4',0.25);
  }
});

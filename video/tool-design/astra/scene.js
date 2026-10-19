/* Independent tool-design cut, authored by gpt-6-astra, high reasoning.
 * Illustrative read-only incident lookup, not observed agent behaviour.
 * No alternative scene source consulted. See beat-sheet.md and review.md.
 */
FlowVideo.scene({
  meta: { title: 'Empty ≠ failed', titleSize: 92, subtitle: 'TOOL DESIGN', duration: 30, fps: 30, speed: 1 },
  build(s) {
    const C = s.THEME;
    s.node('phase', 'label', { x:540, y:475, size:42, text:'01 / EMPTY RESULT', color:C.fg });
    s.node('agent', 'box', { x:540, y:670, w:650, h:164, label:'Agent', labelSize:56, sublabel:'Ready', subSize:44 });
    s.node('tool', 'box', { x:540, y:1060, w:830, h:180, label:'search_incidents', labelSize:52, sublabel:'Bare list', subSize:44 });
    s.node('index', 'box', { x:540, y:1460, w:650, h:164, label:'Incident index', labelSize:52, sublabel:'Available', subSize:44 });
    s.node('verdict','label',{x:945,y:670,size:96,text:'',color:C.bad});
    s.node('budget', 'label', { x:540, y:1675, size:46, mono:true, text:'', color:C.accent });
    s.node('scope', 'label', { x:540, y:1790, size:36, text:'PAYMENTS · LAST HOUR', color:C.mid });
    s.wire('at','agent.bottom','tool.top');
    s.wire('ti','tool.bottom','index.top');
    function sub(t,id,txt,c=C.fg) {
      s.set(t,id,'sublabel',txt,0); s.set(t,id,'subColor',c,0);
    }
    function phase(t,txt) {
      s.set(t,'phase','text',txt,0); s.sfx(t,'store',{note:'G5',gain:0.65});
    }
    function transfer(t,from,to,label,c=C.fg) {
      const clear = ref => { const p = s.pt(ref); return [p[0], p[1] + (ref.endsWith('.bottom') ? 44 : -44)]; };
      s.packet({ t, dur:0.6, route:[clear(from),clear(to)], kind:label?'chip':'envelope', label, size:44, color:c });
      s.sfx(t,'send',{note:from.startsWith('index')?'G6':from.startsWith('tool')?'E6':'C6',gain:0.85});
    }
    function land(t,id,txt,c=C.fg,sound='arrive') {
      sub(t,id,txt,c); s.pulse(t,id,c); s.sfx(t,sound,{note:id==='agent'?'C5':id==='tool'?'E5':'G5'});
    }
    function request(t) {
      transfer(t,'agent.bottom','tool.top');
      land(t+0.6,'tool','payments / 1h');
      transfer(t+0.9,'tool.bottom','index.top');
    }
    // A whole-frame veil gives exact black endpoints, including the title.
    s.fade(0,1,0); s.fade(0.4,0,0.6); s.sfx(0.4,'recover',{gain:0.45});
    sub(1.3,'agent','Looking up',C.accent); request(1.3);
    land(2.8,'index','0 found',C.ok);
    transfer(3.1,'index.top','tool.bottom','[ ]',C.ok);
    land(3.7,'tool','[ ]',C.ok);
    transfer(4.0,'tool.top','agent.bottom','[ ]',C.ok);
    land(4.6,'agent','0 matches',C.ok,'deliver');

    // Same empty response, different reality: the adapter swallows a timeout.
    phase(6.8,'02 / HIDDEN FAILURE');
    sub(6.8,'index','Available');
    sub(6.8,'agent','Looking up',C.accent); sub(6.8,'tool','Bare list');
    request(7.0);
    sub(8.5,'index','TIMEOUT',C.bad); s.set(8.5,'index','color',C.bad,0);
    s.shake(8.5,'index',16); s.sfx(8.5,'crash',{gain:0.8});
    transfer(9.0,'index.top','tool.bottom','TIMEOUT',C.bad);
    land(9.6,'tool','[ ]',C.accent,'thump');
    transfer(10.0,'tool.top','agent.bottom','[ ]',C.accent);
    land(10.6,'agent','0 matches',C.bad,'thump');
    s.set(10.6,'verdict','text','×',0);
    s.shake(10.6,'agent',8); s.set(10.6,'agent','color',C.bad,0);

    // The repair is the result contract; the service is still unavailable.
    phase(12.8,'03 / EXPLICIT ERROR');
    s.set(12.8,'verdict','text','',0);
    sub(12.8,'tool','status + result',C.info); s.set(12.8,'tool','color',C.info,0.3);
    sub(12.8,'agent','Looking up',C.accent); s.set(12.8,'agent','color',C.mid,0.3);
    s.sfx(12.8,'recover',{gain:0.65});
    request(14.0);
    sub(15.5,'index','TIMEOUT',C.bad); s.shake(15.5,'index',8); s.sfx(15.5,'thump',{gain:0.7});
    transfer(15.9,'index.top','tool.bottom','TIMEOUT',C.bad);
    land(16.5,'tool','error / TIMEOUT',C.bad,'thump');
    transfer(16.9,'tool.top','agent.bottom','ERROR',C.bad);
    land(17.5,'agent','Unknown',C.accent,'deliver');

    // One retry is an illustrative application policy, not an MCP promise.
    phase(19.7,'04 / BOUNDED RETRY');
    s.set(19.7,'budget','text','App retries left: 1',0); sub(19.7,'agent','Waiting',C.accent);
    s.node('wait','bar',{x:540,y:1740,w:560,h:12,ticks:true,alpha:0});
    s.set(19.7,'wait','alpha',1,0.2); s.set(19.7,'wait','seg0Color',C.accent,0);
    s.set(19.7,'wait','seg0',1,0);
    for (const t of [19.7,20.1,20.5,20.9]) { s.pulse(t,'agent',undefined,0.2); s.sfx(t,'clock',{gain:1.2}); }
    sub(21,'agent','Retry 1/1',C.accent); s.set(21,'budget','text','App retries left: 0',0);
    s.set(21,'wait','seg0',0,0); request(21);
    s.set(22.0,'index','color',C.mid,0.25); sub(22,'index','Available'); s.sfx(22,'recover',{gain:0.65});
    land(22.5,'index','INC-42',C.ok,'hit');
    transfer(22.9,'index.top','tool.bottom','INC-42',C.ok);
    land(23.5,'tool','ok / INC-42',C.ok,'store');
    transfer(23.9,'tool.top','agent.bottom','OK + INC-42',C.ok);
    land(24.5,'agent','INC-42 found',C.ok,'chime');
    phase(24.5,'05 / RETURNED EVIDENCE');
    s.set(24.5,'agent','color',C.ok,0.25);
    s.set(25.2,'agent','color',C.ok,0); // Retain success after the arrival pulse restores its previous colour.
    // Explicit, long enough success hold, then fade to the opening black.
    s.fade(27.2,1,1.0); s.sfx(27.2,'poof',{gain:0.55});
  }
});

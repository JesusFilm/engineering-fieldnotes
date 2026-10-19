// Independently authored by gpt-6-astra, high reasoning, 2026-10-19.
// Learning objective: route observed test outcomes before permitting another edit.
// Task A has a valid assertion failure; task B has no selected tests.
FlowVideo.scene({
  meta: {
    title: 'Evidence first', subtitle: 'LOOP ENGINEERING',
    titleY: 290, titleSize: 98, subtitleY: 380, subtitleSize: 38, subtitleSpacing: 4,
    duration: 28, fps: 30, speed: 1, fullFade: true,
    author: 'gpt-6-astra', reasoning: 'high', events: []
  },
  build(s) {
    const C = s.THEME;
    const box = (id, y, label, sublabel, w = 620) => s.node(id, 'box', {
      x: 570, y, w, h: 180, label, sublabel, labelSize: 52, subSize: 44,
      color: C.mid, subColor: C.mid
    });
    box('agent', 590, 'Repair agent', 'task A · patch 0', 560);
    box('tests', 920, 'pytest', '12 selected');
    box('gate', 1250, 'Result gate', 'WAIT');
    box('human', 1610, 'Engineer', 'waiting');
    s.node('barrier', 'box', { x: 145, y: 1120, w: 84, h: 84, label: '×', labelSize: 64, color: C.bad, labelColor: C.bad, alpha: 0 });
    s.wire('run', 'agent.bottom', 'tests.top');
    s.wire('result', 'tests.bottom', 'gate.top');
    s.wire('edit', 'gate.left', 'agent.left', {via: [[145, 1250], [145, 590]]});
    s.wire('handoff', 'gate.bottom', 'human.top');
    function cue(t, name, note, target, meaning, gain = 0.6) {
      s.sfx(t, name, { note, pan: s.panOf(target), gain });
      s.meta.events.push({ t, sound: name, note, target, meaning });
    }
    function state(t, id, sub, color, sound, note, meaning) {
      s.set(t, id, 'sublabel', sub, 0);
      s.set(t, id, 'subColor', color, 0);
      s.set(t, id, 'color', color, 0.15);
      s.pulse(t, id);
      cue(t, sound, note, id, meaning);
    }
    function send(t, route, color, dur, meaning) {
      s.packet({ t, route, dur, color, kind: 'envelope' });
      cue(t, 'send', 'C6', route[0], meaning, 0.35);
    }
    s.fade(0, 1, 0);
    s.fade(0.2, 0, 0.7);
    cue(0.2, 'arrive', 'C5', 'agent', 'Stage opens: task A', 0.25);
    // Beat 1: real failure supplies usable feedback.
    send(1.0, ['agent.bottom', 'tests.top'], C.fg, 0.7, 'Run task A tests');
    state(1.7, 'tests', 'RUNNING', C.accent, 'work', 'E5', 'Runner starts');
    state(2.5, 'tests', '1 failed · exit 1', C.accent, 'thump', 'E4', 'Assertion failure observed');
    send(3.2, ['tests.bottom', 'gate.top'], C.accent, 0.6, 'Failure result reaches gate');
    state(3.8, 'gate', 'FAIL → EDIT', C.accent, 'arrive', 'G5', 'Gate permits bounded repair');
    // Beat 2: the observed failure returns to the editor, then the patch is tested.
    s.set(4.5, 'wire:edit', 'color', C.accent, 0);
    send(4.5, ['gate.left', [145, 1250], [145, 590], 'agent.left'], C.accent, 1.2, 'Feedback returns to repair agent');
    state(5.7, 'agent', 'task A · patch 1', C.accent, 'work', 'C5', 'One repair patch is created');
    // The one-edit permission is consumed. A new patch requires fresh evidence.
    s.set(5.7, 'gate', 'sublabel', 'WAIT', 0);
    s.set(5.7, 'gate', 'subColor', C.mid, 0);
    s.set(5.7, 'gate', 'color', C.mid, 0.15);
    s.set(5.7, 'wire:edit', 'color', C.dim, 0);
    s.set(5.7, 'tests', 'sublabel', 'patch 1 · untested', 0);
    s.set(5.7, 'tests', 'color', C.mid, 0.15);
    s.set(5.7, 'tests', 'subColor', C.mid, 0);
    send(7.5, ['agent.bottom', 'tests.top'], C.fg, 0.7, 'Run tests on patch 1');
    state(8.2, 'tests', 'RUNNING', C.accent, 'work', 'E5', 'Validate updated code');
    state(9.0, 'tests', '12 passed · exit 0', C.ok, 'chime', 'E5', 'Selected tests pass');
    // Beat 3: success exits the loop for review, not automatic merge.
    send(9.8, ['tests.bottom', 'gate.top'], C.ok, 0.6, 'Pass result reaches gate');
    state(10.4, 'gate', 'PASS → REVIEW', C.ok, 'arrive', 'G5', 'Gate exits edit loop');
    s.set(10.4, 'wire:edit', 'color', C.dim, 0);
    s.set(11.1, 'wire:handoff', 'color', C.ok, 0);
    send(11.1, ['gate.bottom', 'human.top'], C.ok, 0.7, 'Patch and evidence handed to engineer');
    state(11.8, 'human', 'review patch', C.ok, 'store', 'C6', 'Engineer receives patch for review');
    // Beat 4: separate task, invalid evidence; a failed command is not a failed assertion.
    state(14.2, 'agent', 'task B · patch 0', C.fg, 'arrive', 'C5', 'New task begins');
    for (const [id, sub] of [['tests', '12 expected'], ['gate', 'WAIT'], ['human', 'waiting']]) {
      s.set(14.2, id, 'sublabel', sub, 0);
      s.set(14.2, id, 'color', C.mid, 0.2);
      s.set(14.2, id, 'subColor', C.mid, 0);
    }
    s.set(14.2, 'wire:handoff', 'color', C.wire, 0);
    send(15.3, ['agent.bottom', 'tests.top'], C.fg, 0.7, 'Run task B tests');
    state(16.0, 'tests', 'RUNNING', C.accent, 'work', 'E5', 'Runner starts task B');
    state(16.8, 'tests', '0 selected · exit 5', C.bad, 'crash', 'E3', 'No tests selected: evidence missing');
    s.shake(16.8, 'tests', 12);
    send(18.0, ['tests.bottom', 'gate.top'], C.bad, 0.6, 'No-tests result reaches gate');
    state(18.6, 'gate', 'NO TESTS → STOP', C.bad, 'thump', 'G3', 'Gate refuses further product edits');
    s.set(18.6, 'wire:edit', 'color', C.bad, 0);
    s.set(18.6, 'wire:edit', 'dashed', 1, 0);
    s.set(18.6, 'barrier', 'alpha', 1, 0.15);
    s.shake(18.6, 'barrier', 8);
    s.set(18.6, 'agent', 'alpha', 0.55, 0.3);
    // Beat 5: a stopped loop can still produce a useful handoff.
    s.set(20.2, 'wire:handoff', 'color', C.info, 0);
    send(20.2, ['gate.bottom', 'human.top'], C.info, 1.0, 'Command and logs handed to engineer');
    state(21.2, 'human', 'inspect discovery', C.info, 'deliver', 'C5', 'Engineer receives blocker evidence');
    state(22.5, 'gate', 'STOPPED', C.bad, 'ack', 'G4', 'Stopped status persists; patch 0 remains unchanged');
    s.fade(25.5, 1, 1.0);
    cue(25.5, 'poof', 'C4', 'gate', 'Fade to matching boundary', 0.2);
  }
});

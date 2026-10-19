// Observability and tracing: from the timeline the tool span looks nested under the task, but each lane is
// a separate trace ID and the tool has no parent link. Propagating context docks it without changing duration.
export default function setup(ctx) {
  const {model, caption, addAction, onPick, invalidate, view, reducedMotion} = ctx;

  // Small tween runner: the host calls update() only after an explicit action invalidates.
  let tweens = [];
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function animate(duration, step, done) {
    if (reducedMotion || duration <= 0) { step(1); done && done(); invalidate(); return; }
    tweens.push({t: 0, duration, step, done});
    invalidate();
  }
  function advance(dt) {
    if (!tweens.length) return false;
    for (const tw of tweens) { tw.t = Math.min(1, tw.t + dt / tw.duration); tw.step(ease(tw.t)); }
    const finished = tweens.filter(tw => tw.t >= 1);
    tweens = tweens.filter(tw => tw.t < 1);
    finished.forEach(tw => tw.done && tw.done());
    return tweens.length > 0;
  }
  const named = n => { const o = model.getObjectByName(n); if (!o) throw Error('Missing node ' + n); return o; };
  const hitName = (hits, names) => {
    for (const h of hits) for (let o = h.object; o; o = o.parent) if (names.includes(o.name)) return o.name;
    return null;
  };

  const tool = named('Tool_Span'), dock = named('Tool_Dock'), link = named('Tool_Link');
  const plaqueB = named('Trace_B_Plaque');
  const home = tool.position.clone(), target = dock.position.clone();
  const TIMELINE = {position: [-0.8, 2.2, 8.4], target: [0.1, 0.6, -0.6]};
  const ABOVE = {position: [-4.6, 6.6, 7.0], target: [0.2, 0.3, -0.8]};
  let joined = false, above = false;

  function propagate() {
    joined = !joined;
    joinBtn.textContent = joined ? 'Drop context' : 'Propagate context';
    const from = tool.position.clone(), to = joined ? target : home, lift = 0.5;
    if (!joined) link.visible = false;
    plaqueB.visible = true;
    animate(1.2, t => {
      tool.position.lerpVectors(from, to, t);
      tool.position.y += Math.sin(Math.PI * t) * lift;
    }, () => {
      link.visible = joined; plaqueB.visible = !joined;
      caption(joined
        ? 'The tool span now hangs from the task in trace 4bf9. It still takes 2.4 s and the task still 3.0 s: visibility improved, performance did not.'
        : 'Without propagated context the tool records its own trace, a3ce, with no parent.');
    });
  }
  function turn() {
    above = !above;
    viewBtn.textContent = above ? 'View along time' : 'View from above';
    const v = above ? ABOVE : TIMELINE;
    view(v.position, v.target);
    caption(above
      ? (joined ? 'Seen from above, every span shares trace 4bf9 and hangs from a parent link.'
                : 'Seen from above, the tool sits in a separate trace, a3ce, with no link to the task.')
      : (joined ? 'Along time, the timeline looks the same as before propagation.'
                : 'Along time, the tool seems to fill the task, but timestamps alone do not make a parent.'));
  }
  const joinBtn = addAction('Propagate context', propagate);
  const viewBtn = addAction('View from above', turn);

  const facts = {
    Task_Span: () => 'Agent task: 3.0 s, root span of trace 4bf9.',
    Model_Span: () => 'Model call: 0.6 s, trace 4bf9, parent is the agent task.',
    Tool_Span: () => joined ? 'Test tool: 2.4 s, trace 4bf9, parent is the agent task.'
                            : 'Test tool: 2.4 s, trace a3ce, no parent. Its timestamps overlap the task, but nothing links them.',
    Trace_A_Plaque: () => 'Lane for trace ID 4bf9.',
    Trace_B_Plaque: () => 'Lane for trace ID a3ce, started by the tool without incoming context.'
  };
  onPick(hits => {
    const n = hitName(hits, Object.keys(facts));
    if (n) caption(facts[n]());
  });

  function reset() {
    tweens = []; joined = false; above = false;
    tool.position.copy(home); link.visible = false; plaqueB.visible = true;
    joinBtn.textContent = 'Propagate context'; viewBtn.textContent = 'View from above';
  }
  reset();
  return {update(dt) { return advance(dt); }, reset, dispose() { tweens = []; }};
}


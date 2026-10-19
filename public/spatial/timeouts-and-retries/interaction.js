// Timeouts and retries: compare retry policies for one tool call whose attempts all fail.
// Each policy shows the most requests the service can receive, and what the runtime trace records.
// Host contract: docs/spatial-contract.json. THREE is supplied through ctx; no imports.

const SLIPS = ['1_1', '1_2', '1_3', '2_1', '2_2', '2_3'];
const LIB_TAILS = ['Tail_1_2', 'Tail_1_3', 'Tail_2_2', 'Tail_2_3'];
const LIB_LEVERS = ['Lever_lib_1_2', 'Lever_lib_1_3', 'Lever_lib_2_2', 'Lever_lib_2_3'];
const SINK = 0.36;
const PEG_SINK = 0.3;
const GHOST = 0.16;
const INITIAL = 'Suppose every attempt of one tool call fails. Count the amber slips at the service, then switch a retry layer off.';

export default function setup(ctx) {
  const { model } = ctx;
  const named = (n) => model.getObjectByName(n);
  const state = { runtime: true, library: true };
  const anims = new Map();
  const owned = [];

  const meshesUnder = (n) => {
    const out = [];
    named(n)?.traverse((m) => { if (m.isMesh) out.push(m); });
    return out;
  };
  // A mesh can belong to the runtime-retry subtree, a library-retry tail, or both.
  const ghost = new Map();
  const tag = (m, layer) => {
    if (!ghost.has(m)) {
      const orig = m.material;
      const clone = orig.clone();
      clone.transparent = true;
      m.material = clone;
      owned.push({ mesh: m, orig, clone });
      ghost.set(m, { layers: new Set(), value: 1 });
    }
    ghost.get(m).layers.add(layer);
  };
  meshesUnder('Branch_rt_2').forEach((m) => tag(m, 'runtime'));
  LIB_TAILS.forEach((n) => meshesUnder(n).forEach((m) => tag(m, 'library')));

  const levers = { runtime: ['Lever_rt_2'], library: LIB_LEVERS };
  for (const k of Object.keys(levers)) levers[k] = levers[k].map(named).filter(Boolean).map((o) => ({ o, base: o.rotation.z }));
  const slips = {};
  for (const id of SLIPS) { const o = named('Slip_' + id); if (o) slips[id] = { o, y: o.position.y }; }
  const peg2 = named('TracePeg_2');
  const peg2y = peg2 ? peg2.position.y : 0;

  const arrived = (id) => {
    const [a, l] = id.split('_');
    return (a === '1' || state.runtime) && (l === '1' || state.library);
  };
  const requests = () => SLIPS.filter(arrived).length;
  const traced = () => (state.runtime ? 2 : 1);
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');

  function animate(key, from, to, apply) {
    if (ctx.reducedMotion || Math.abs(from - to) < 1e-6) { anims.delete(key); apply(to); return; }
    anims.set(key, { v: from, to, apply, speed: Math.abs(to - from) / 0.45 });
  }
  const current = (key, fallback) => anims.get(key)?.v ?? fallback;
  const move = (key, now, to, apply, instant) => {
    if (instant) { anims.delete(key); apply(to); } else animate(key, current(key, now), to, apply);
  };

  function sync(instant) {
    for (const [k, list] of Object.entries(levers)) {
      for (const lv of list) {
        move('L' + lv.o.name, lv.o.rotation.z, lv.base + (state[k] ? 0 : -Math.PI / 2), (v) => { lv.o.rotation.z = v; }, instant);
      }
    }
    for (const [m, g] of ghost) {
      const off = [...g.layers].some((l) => !state[l]);
      // Dimmed machinery is inactive: it no longer intercepts clicks meant for what lies behind it.
      if (off) m.raycast = () => {};
      else delete m.raycast;
      move('G' + m.uuid, g.value, off ? GHOST : 1, (v) => {
        g.value = v;
        m.material.opacity = v;
        m.material.depthWrite = v > 0.99;
      }, instant);
    }
    for (const [id, s] of Object.entries(slips)) {
      move('S' + id, s.o.position.y, s.y - (arrived(id) ? 0 : SINK), (v) => { s.o.position.y = v; }, instant);
    }
    if (peg2) move('P2', peg2.position.y, peg2y - (state.runtime ? 0 : PEG_SINK), (v) => { peg2.position.y = v; }, instant);
    ctx.invalidate();
  }

  function describe() {
    if (state.runtime && state.library) return 'Both layers retry: up to 6 service requests for one tool call (2 runtime attempts × 3 library attempts), while the runtime trace shows 2.';
    if (state.runtime) return 'Runtime owns retries: up to 2 service requests, and the runtime trace shows both attempts.';
    if (state.library) return 'Library owns retries: up to 3 service requests, while the runtime trace shows just 1 attempt.';
    return 'No retries: 1 service request. If it times out, the outcome is unknown; report that instead of resending.';
  }

  let bRuntime;
  let bLibrary;
  function relabel() {
    if (bRuntime) bRuntime.textContent = state.runtime ? 'Turn off runtime retry' : 'Turn on runtime retry';
    if (bLibrary) bLibrary.textContent = state.library ? 'Turn off library retries' : 'Turn on library retries';
  }
  function toggle(layer) {
    state[layer] = !state[layer];
    relabel();
    sync(false);
    ctx.caption(describe());
  }
  bRuntime = ctx.addAction('Turn off runtime retry', () => toggle('runtime'));
  bLibrary = ctx.addAction('Turn off library retries', () => toggle('library'));

  ctx.onPick((hits) => {
    for (const h of hits || []) {
      for (let o = h.object; o; o = o.parent) {
        const n = o.name || '';
        if (/^(Lever|Handle|Knob)_rt/.test(n) || n.startsWith('rt_2')) return toggle('runtime');
        if (/^(Lever|Handle|Knob)_lib/.test(n) || n.startsWith('lib_')) return toggle('library');
        if (/^(Slip|Cup|CupRim|Label_cup)_/.test(n) || n === 'Bench' || n === 'Label_service') {
          return ctx.caption('Under this policy the service can receive ' + plural(requests(), 'request') + '; the runtime trace records ' + plural(traced(), 'attempt') + '.');
        }
        if (n.startsWith('Trace') || n === 'Label_trace') {
          return ctx.caption('The runtime trace records ' + plural(traced(), 'attempt') + '. Library retries happen below it and never appear here.');
        }
        if (/^(CallSlip|CallTray|CallLedge|Funnel)/.test(n) || n === 'Label_agent') {
          return ctx.caption('The agent sees one tool call, whatever retry policy runs beneath it.');
        }
      }
    }
  });

  ctx.caption(INITIAL);
  sync(true);

  return {
    update(dt) {
      if (!anims.size) return false;
      const step = Math.min(dt || 0.016, 0.05);
      for (const [k, a] of anims) {
        const d = a.to - a.v;
        const s = a.speed * step;
        if (Math.abs(d) <= s) { a.apply(a.to); anims.delete(k); } else { a.v += Math.sign(d) * s; a.apply(a.v); }
      }
      return anims.size > 0;
    },
    reset() {
      state.runtime = true;
      state.library = true;
      relabel();
      sync(true);
      ctx.caption(INITIAL);
    },
    dispose() {
      anims.clear();
      for (const { mesh, orig, clone } of owned) { mesh.material = orig; delete mesh.raycast; clone.dispose(); }
      owned.length = 0;
    },
  };
}


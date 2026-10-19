// OAuth PKCE: two hosts keep verifiers differently. Start an overlapping login, then let login A's callback
// present whichever verifier each host finds. The cut-open check shows which pins miss the shear line.
// Host contract: docs/spatial-contract.json. THREE is supplied through ctx; no imports.

// Mirrors TEETH and the pin geometry in spatial/oauth-pkce/build_scene.py (Blender Z = Three Y).
const TEETH = { A: [0.24, 0.06, 0.3, 0.14], B: [0.06, 0.3, 0.14, 0.24] };
const KEYWAY = 0.1; // shaft height: SHAFT_HI - SHAFT_LO
const TOKEN_RISE = 0.5;
const INITIAL = 'Each host holds the verifier for login A. Start a second login, or send A’s callback now and compare the two checks.';

export default function setup(ctx) {
  const { THREE, model } = ctx;
  const get = (n) => model.getObjectByName(n);
  const anims = new Map();
  const saved = new Map();
  const keep = (o) => { if (o && !saved.has(o)) saved.set(o, { p: o.position.clone(), q: o.quaternion.clone(), v: o.visible }); return o; };

  const lanes = [1, 2].map((n) => {
    const L = 'L' + n;
    return {
      n,
      keyA: keep(get(L + '_Key_A')),
      keyB: keep(get(L + '_Key_B')),
      inserted: get(L + '_Pose_inserted'),
      dropped: get(L + '_Pose_dropped'),
      pins: [0, 1, 2, 3].map((i) => keep(get(L + '_Pin_' + i))),
      token: keep(get(L + '_Token')),
    };
  });

  const state = { started: false, sent: false };

  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  function tween(key, dur, apply, delay = 0) {
    if (ctx.reducedMotion) { apply(1); anims.delete(key); return; }
    anims.set(key, { t: -delay / dur, dur, apply });
  }
  function moveTo(key, obj, pos, quat, dur, delay) {
    if (!obj) return;
    const p0 = obj.position.clone();
    const q0 = obj.quaternion.clone();
    tween(key, dur, (t) => {
      const k = ease(Math.max(0, t));
      obj.position.lerpVectors(p0, pos, k);
      obj.quaternion.slerpQuaternions(q0, quat || q0, k);
    }, delay);
  }

  function startB() {
    if (state.started || state.sent) return;
    state.started = true;
    for (const lane of lanes) {
      const b = lane.keyB;
      if (!b) continue;
      b.visible = true;
      const home = b.position.clone();
      b.position.y += 0.6;
      moveTo('B' + lane.n, b, home, null, 0.45);
      if (lane.n === 1 && lane.keyA && lane.dropped) {
        moveTo('A1', lane.keyA, lane.dropped.position.clone(), lane.dropped.quaternion.clone(), 0.55, 0.2);
      }
    }
    bStart.disabled = true;
    ctx.caption('Login B began. The shared slot now holds verifier B; A was pushed off. The per-login rack keeps both.');
    ctx.invalidate();
  }

  function sendA() {
    if (state.sent) return;
    state.sent = true;
    bStart.disabled = true;
    bSend.disabled = true;
    const results = [];
    for (const lane of lanes) {
      const useB = lane.n === 1 && state.started;
      const key = useB ? lane.keyB : lane.keyA;
      const letter = useB ? 'B' : 'A';
      if (!key || !lane.inserted) continue;
      moveTo('K' + lane.n, key, lane.inserted.position.clone(), new THREE.Quaternion(), 0.7);
      let misses = 0;
      lane.pins.forEach((pin, i) => {
        if (!pin) return;
        const lift = KEYWAY + TEETH[letter][i];
        if (TEETH[letter][i] !== TEETH.A[i]) misses += 1;
        const y0 = saved.get(pin).p.y;
        tween('P' + lane.n + i, 0.35, (t) => { pin.position.y = y0 + lift * ease(Math.max(0, t)); }, 0.45 + 0.06 * i);
      });
      if (!misses && lane.token) {
        const y0 = saved.get(lane.token).p.y;
        tween('T' + lane.n, 0.5, (t) => { lane.token.position.y = y0 + TOKEN_RISE * ease(Math.max(0, t)); }, 1.0);
      }
      results.push({ lane: lane.n, letter, misses });
    }
    const shared = results.find((r) => r.lane === 1);
    ctx.caption(shared && shared.misses
      ? 'Code A met verifier B in the shared slot: ' + shared.misses + ' pins stop off the line, so no token. Per-login storage passes.'
      : 'With no overlapping login, both hosts present verifier A and both checks issue a token. The shared slot only fails under overlap.');
    ctx.invalidate();
  }

  const bStart = ctx.addAction('Start login B', startB);
  const bSend = ctx.addAction('Send login A’s callback', sendA);

  ctx.onPick((hits) => {
    const h = hits && hits[0];
    if (!h) return;
    for (let o = h.object; o; o = o.parent) {
      const n = o.name || '';
      const lane = n.startsWith('L1_') ? 'shared slot' : 'per-login rack';
      if (/_Pin_|_Shear|_Chamber/.test(n)) {
        return ctx.caption(state.sent
          ? 'A token is issued only when every pin joint meets the amber line; the pins were set by login A’s challenge.'
          : 'These pins were set by login A’s challenge. Only a key with A’s teeth lifts every joint to the amber line.');
      }
      if (/_Key_[AB]/.test(n)) {
        const letter = /_Key_A/.test(n) ? 'A' : 'B';
        return ctx.caption('Verifier ' + letter + ' in the ' + lane + '. Its teeth are its secret; the lock only knows A’s challenge.');
      }
      if (/_Token/.test(n)) return ctx.caption('The token rises only after a matching verifier; normal OAuth checks and tool permissions still follow.');
      if (/_Ledge|_Rack/.test(n)) return ctx.caption(n.startsWith('L1_') ? 'One slot: each new login’s verifier replaces the last.' : 'One ledge per login, so a later login cannot replace A’s verifier.');
    }
  });

  function reset() {
    anims.clear();
    for (const [o, s] of saved) { o.position.copy(s.p); o.quaternion.copy(s.q); o.visible = s.v; }
    for (const lane of lanes) if (lane.keyB) lane.keyB.visible = false;
    state.started = false;
    state.sent = false;
    bStart.disabled = false;
    bSend.disabled = false;
    ctx.caption(INITIAL);
    ctx.invalidate();
  }

  reset();

  return {
    update(dt) {
      if (!anims.size) return false;
      const step = Math.min(dt || 0.016, 0.05);
      for (const [k, a] of anims) {
        a.t = Math.min(1, a.t + step / a.dur);
        a.apply(Math.max(0, a.t));
        if (a.t >= 1) anims.delete(k);
      }
      return anims.size > 0;
    },
    reset,
    dispose() { anims.clear(); },
  };
}

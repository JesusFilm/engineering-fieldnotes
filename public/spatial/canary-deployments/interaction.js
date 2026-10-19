// Canary deployments: one window of 10,000 requests as a solid. Floor area is request count, height is 100%,
// and the 40 failed v2 exports are an amber layer. Splitting along the version and operation seams keeps the
// amber volume but shrinks its floor, so its height becomes each group's error rate.
export default function setup(ctx) {
  const {model, caption, addAction, onPick, invalidate, reducedMotion} = ctx;

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
    invalidate();
    return tweens.length > 0;
  }
  const named = n => { const o = model.getObjectByName(n); if (!o) throw Error('Missing node ' + n); return o; };
  const hitName = (hits, names) => {
    for (const h of hits) for (let o = h.object; o; o = o.parent) if (names.includes(o.name)) return o.name;
    return null;
  };

  const H = 1.5, A0 = 0.006, SLIDE = 0.8;
  const N = {v1_other: 8100, v1_export: 900, v2_other: 900, v2_export: 100};
  const FAILED = {v1_other: 0, v1_export: 0, v2_other: 0, v2_export: 40};
  const G = {};
  for (const g of Object.keys(N)) {
    const group = named('Group_' + g), fill = named(g + '_Fill'), fail = named(g + '_Fail');
    G[g] = {group, fill, fail, pos: group.position.clone(), h: A0};
  }
  let byVersion = false, byOperation = false;

  // Joined pieces display an aggregate RATE, never reassigned underlying failures.
  function pieces() {
    const key = g => (byVersion ? g.slice(0, 2) : '') + '|' + (byOperation ? g.slice(3) : '');
    const out = {};
    for (const g of Object.keys(N)) (out[key(g)] ||= []).push(g);
    return Object.values(out);
  }
  function heights() {
    const h = {};
    for (const p of pieces()) {
      const n = p.reduce((s, g) => s + N[g], 0), f = p.reduce((s, g) => s + FAILED[g], 0);
      for (const g of p) h[g] = H * f / n;
    }
    return h;
  }
  function setHeight(g, h) {
    const o = G[g]; o.h = h;
    o.fail.visible = h > 0;
    o.fail.scale.y = h / A0;
    o.fill.scale.y = (H - h) / (H - A0);
  }
  const pct = (f, n) => { const r = 100 * f / n; return (r < 1 ? r.toFixed(1) : Math.round(r)) + '%'; };
  const fmt = n => n.toLocaleString('en');
  function describe() {
    if (byVersion && byOperation) return 'v2 exports: 40 of 100 failed (40%). v1 exports: 0 of 900.';
    if (byVersion) return 'v2: 40 of 1,000 requests failed (4%). v1: 0 of 9,000. Healthy v2 operations dilute the export failure rate.';
    if (byOperation) return 'Exports: 40 of 1,000 failed (4%), mixing v2 with healthy v1 exports.';
    return 'Pooled: 40 failures in 10,000 requests, a 0.4% layer.';
  }
  function apply() {
    tweens = []; // Replace the sole writer, starting at its current interpolated pose.
    const target = heights(), from = {};
    for (const g in G) from[g] = {x: G[g].group.position.x, z: G[g].group.position.z, h: G[g].h};
    const to = {};
    for (const g in G) to[g] = {
      x: G[g].pos.x - (byVersion && g.startsWith('v1') ? SLIDE : 0),
      z: G[g].pos.z - (byOperation && g.endsWith('other') ? SLIDE : 0),  // Blender +Y is Three -Z
      h: target[g]
    };
    version.textContent = byVersion ? 'Join versions' : 'Split by version';
    operation.textContent = byOperation ? 'Join operations' : 'Split by operation';
    animate(0.9, t => {
      for (const g in G) {
        G[g].group.position.x = from[g].x + (to[g].x - from[g].x) * t;
        G[g].group.position.z = from[g].z + (to[g].z - from[g].z) * t;
        setHeight(g, from[g].h + (to[g].h - from[g].h) * t);
      }
    }, () => caption(describe()));
  }
  const version = addAction('Split by version', () => { byVersion = !byVersion; apply(); });
  const operation = addAction('Split by operation', () => { byOperation = !byOperation; apply(); });

  onPick(hits => {
    for (const h of hits) for (let o = h.object; o; o = o.parent) {
      if (o.name.startsWith('Knob_Version')) { byVersion = !byVersion; apply(); return; }
      if (o.name.startsWith('Knob_Operation')) { byOperation = !byOperation; apply(); return; }
      const m = o.name.match(/^Group_(v[12])_(export|other)$/);
      if (m) {
        const g = m[1] + '_' + m[2], piece = pieces().find(p => p.includes(g));
        const n = piece.reduce((s, x) => s + N[x], 0), f = piece.reduce((s, x) => s + FAILED[x], 0);
        const name = (m[1] === 'v1' ? 'v1' : 'v2') + (m[2] === 'export' ? ' exports' : ' other operations');
        caption(piece.length > 1
          ? name + ' (' + fmt(N[g]) + ' requests) is still joined to a block of ' + fmt(n) + ', where ' + f + ' failed (' + pct(f, n) + ').'
          : name + ': ' + f + ' of ' + fmt(n) + ' failed (' + pct(f, n) + ').');
        return;
      }
    }
  });

  function reset() {
    tweens = []; byVersion = false; byOperation = false;
    for (const g in G) { G[g].group.position.copy(G[g].pos); setHeight(g, A0); }
    version.textContent = 'Split by version'; operation.textContent = 'Split by operation';
    caption('Footprint = requests; amber height = aggregate error rate. Pooled, the 40 v2 export failures are a 0.4% hairline at the base.');
  }
  reset();
  return {update(dt) { return advance(dt); }, reset, dispose() { tweens = []; }};
}


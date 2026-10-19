// Memory architecture (candidate marked unsuitable in intent.json): a convention
// changes from r1 to r2 in the repository. A fresh run checks the stored
// record's revision; an active run keeps what it already loaded until refreshed.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const get = (n) => model.getObjectByName(n);
  const meshes = [];
  model.traverse((o) => { if (o.isMesh) meshes.push(o); });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x2f2e2b, transparent: true, opacity: 0.55 });
  const lines = [];
  for (const m of meshes) {
    if (/_(cmd|rev|label)$/.test(m.name) || /^Plaque_(front|back)/.test(m.name)) continue;
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 35), lineMat);
    l.raycast = () => {};
    m.add(l);
    lines.push(l);
  }
  const plaque = get('Plaque');
  const oldFresh = get('Card_fresh_old'), fresh = get('Card_fresh');
  const active = get('Card_active'), activeNew = get('Card_active_r2');
  const storeCard = get('Card_store');
  const cards = [oldFresh, fresh, active, activeNew];
  const home = new Map([plaque, ...cards].map((o) => [o, { p: o.position.clone(), r: o.rotation.clone() }]));
  model.updateMatrixWorld(true);
  const toLocal = (o, w) => o.parent.worldToLocal(w.clone());
  const fromStore = storeCard.getWorldPosition(new THREE.Vector3());
  const fromRepo = plaque.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, -0.4, 0.3));
  const setVisible = (o, v) => o.traverse((c) => { if (c.isMesh) c.visible = v; });
  const ease = (u) => { u = Math.min(1, Math.max(0, u)); return u * u * (3 - 2 * u); };
  const seg = (t, a, b) => ease((t - a) / (b - a));

  let stage = 0;     // 0 r1 everywhere, 1 convention changed, 2 fresh run done, 3 active refreshed
  let anim = null;   // { kind, t, end }

  const CAPTION = {
    initial: 'The repository, the stored record and the active run all say “npm test” at r1. Change the convention and watch who still holds r1.',
    changed: 'The repository now says “pnpm test” at r2. The stored record and the active run’s desk still say r1.',
    fresh: 'The fresh run’s revision check rejected the stored r1 record and re-read r2 from the repository. The active run still holds r1.',
    refreshed: 'The active run now has r2 before its next test. The stored record still says r1 until its owner corrects it.',
    plaque: 'The repository’s instruction file is the authority for this convention.',
    store: 'The stored record names its source revision. Similarity found it; only the revision check says whether it still applies.',
    active: 'This run loaded its note earlier and keeps it until something refreshes its context.',
  };

  const change = ctx.addAction('Change the convention', () => begin('change'));
  const next = ctx.addAction('Start a fresh run', () => begin(stage === 1 ? 'fresh' : 'refresh'));
  function sync() {
    change.disabled = stage > 0 || !!anim;
    change.textContent = stage > 0 ? 'Convention changed to r2' : 'Change the convention';
    next.textContent = stage <= 1 ? 'Start a fresh run' : stage === 2 ? 'Refresh the active run' : 'Both runs have r2';
    next.disabled = stage === 0 || stage === 3 || !!anim;
  }

  function place(o, fromW, toLocalPos, u, lift) {
    const a = toLocal(o, fromW);
    o.position.lerpVectors(a, toLocalPos, u);
    o.position.y += Math.sin(Math.PI * u) * lift;
  }

  function pose(kind, t) {
    if (kind === 'change') {
      plaque.rotation.y = home.get(plaque).r.y + Math.PI * seg(t, 0, 0.9);
      return t < 0.9;
    }
    if (kind === 'fresh') {
      setVisible(oldFresh, true);
      place(oldFresh, fromStore, home.get(oldFresh).p, seg(t, 0, 1.0), 0.6);
      const aside = seg(t, 1.4, 1.8);
      oldFresh.position.x += -0.62 * aside;
      oldFresh.position.z += 0.22 * aside;
      oldFresh.rotation.y = home.get(oldFresh).r.y + 0.35 * aside;
      setVisible(fresh, t > 1.8);
      place(fresh, fromRepo, home.get(fresh).p, seg(t, 1.8, 2.8), 0.5);
      return t < 2.8;
    }
    if (kind === 'refresh') {
      const out = seg(t, 0, 0.5);
      active.position.x = home.get(active).p.x + 1.4 * out;
      setVisible(active, out < 1);
      setVisible(activeNew, t > 0.5);
      place(activeNew, fromRepo, home.get(activeNew).p, seg(t, 0.5, 1.4), 0.5);
      return t < 1.4;
    }
    return false;
  }

  function begin(kind) {
    if (anim) return;
    anim = { kind, t: 0 };
    if (ctx.reducedMotion) { pose(kind, 99); end(); return; }
    sync();
  }
  function end() {
    const kind = anim.kind;
    anim = null;
    stage = kind === 'change' ? 1 : kind === 'fresh' ? 2 : 3;
    ctx.caption(CAPTION[kind === 'change' ? 'changed' : kind === 'fresh' ? 'fresh' : 'refreshed']);
    sync();
  }

  ctx.onPick((hits) => {
    if (anim) return;
    const hit = hits.find((h) => h.object.isMesh && h.object.visible);
    if (!hit) return;
    for (let o = hit.object; o && o !== model; o = o.parent) {
      if (/^(Plaque|Repo_)/.test(o.name)) return ctx.caption(CAPTION.plaque);
      if (/^(Cabinet|Store_|Card_store)/.test(o.name)) return ctx.caption(CAPTION.store);
      if (/^Card_active$/.test(o.name)) return ctx.caption(CAPTION.active);
    }
  });

  function reset() {
    anim = null;
    stage = 0;
    for (const [o, h] of home) { o.position.copy(h.p); o.rotation.copy(h.r); }
    setVisible(active, true);
    for (const c of [oldFresh, fresh, activeNew]) setVisible(c, false);
    sync();
    ctx.caption(CAPTION.initial);
  }
  reset();

  return {
    update(dt) {
      if (!anim) return false;
      anim.t += dt;
      if (pose(anim.kind, anim.t)) return true;
      end();
      return false;
    },
    reset,
    dispose() {
      for (const l of lines) { l.removeFromParent(); l.geometry.dispose(); }
      lineMat.dispose();
    },
  };
}


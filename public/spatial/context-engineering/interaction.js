// Context engineering: a handoff that names only the deck crack, and a bridge
// whose real problem sits under the deck. Coordinates are Three (Y up).
// Action 1 chooses what the handoff carries (four states); action 2 builds the
// authored example repair for that handoff and runs the load and boat checks.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const get = (n) => model.getObjectByName(n);
  const meshes = [];
  model.traverse((o) => { if (o.isMesh) meshes.push(o); });

  // Charcoal contours: firm on structure, none on water and the lane overlay.
  const lineMat = new THREE.LineBasicMaterial({ color: 0x2f2e2b, transparent: true, opacity: 0.8 });
  const lines = [];
  for (const m of meshes) {
    if (/^(Water|Clearance|ChannelBed)/.test(m.name)) continue;
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 35), lineMat);
    l.raycast = () => {};
    m.add(l);
    lines.push(l);
  }

  const deckC = get('Deck_C'), deckE = get('Deck_E'), pier = get('Pier2_upper');
  const cart = get('LoadCart'), boat = get('Boat');
  const reopened = get('Crack_Reopened'), envelope = get('Clearance');
  const repairs = { patch: get('Repair_Patch'), prop: get('Repair_Prop'), underpin: get('Repair_Underpin') };
  const pierCrack = get('Pier2_crack');
  // Water, channel bed and the translucent lane never intercept a pick.
  for (const n of ['Water', 'Clearance', 'ChannelBed']) get(n).raycast = () => {};
  const crackMat = pierCrack.material;
  const suppliedMat = new THREE.MeshStandardMaterial({ color: 0xd98f22, roughness: 0.55 });
  const home = new Map([deckC, deckE, pier, cart, boat].map((o) => [o, { p: o.position.clone(), r: o.rotation.clone() }]));
  const cartX0 = cart.position.x, cartY0 = cart.position.y, boatZ0 = boat.position.z;

  // Handoff states, in the order the first action cycles through them.
  const STATES = [
    { support: false, clearance: false, label: 'Handoff: request only' },
    { support: true, clearance: false, label: 'Handoff: + pier split' },
    { support: false, clearance: true, label: 'Handoff: + boat lane' },
    { support: true, clearance: true, label: 'Handoff: split + lane' },
  ];
  const stateOf = (s, c) => STATES.findIndex((x) => x.support === s && x.clearance === c);
  let state = 0;
  let test = null; // { kind, t }
  let tested = false;

  // Camera poses [position, target] in Three coordinates.
  const VIEWS = {
    request: [[7.6, 6.2, 9.4], [0.2, 0.5, 0]],
    support: [[3.2, 0.9, -4.2], [1.4, 0.6, -0.7]],
    clearance: [[0, 1.7, 7.4], [0, 0.7, 0]],
    both: [[3.6, 1.6, -4.6], [0.6, 0.6, 0]],
    // Downstream-east, just below deck height: shows the hull, the prop and its
    // contact point under the deck edge, pier 2, and the deck fascia crack.
    test: [[4.2, 2.3, 5.2], [0.7, 0.7, 0.2]],
  };
  const CAPTION = {
    initial: 'The handoff names only the symptom: “stop the deck cracking over pier 2”. Look around, choose what the handoff carries, then repair from it.',
    0: 'Handoff: the request only. The split under pier 2 and the boat lane are left for the repairer to find.',
    1: 'Handoff: the request plus the split on pier 2’s upstream face, which the deck hides from the banks.',
    2: 'Handoff: the request plus the boat lane between the piers, which must stay clear.',
    3: 'Handoff: the request, the pier split and the boat lane.',
    changed: 'The handoff changed, so the earlier repair and its check results no longer apply.',
    pierFront: 'From this side pier 2 looks sound; its upstream face sits under the deck.',
    symptom: 'This crack is the symptom the request already names.',
    running: 'Building the example repair for this handoff, then running the load cart and the boat over it.',
    patch: 'In this example the repairer only patched the deck. Under load pier 2 settled and the crack reopened; a repairer who found the split unprompted could do better.',
    patchLane: 'This example repair kept the lane clear but only patched the deck, so under load pier 2 settled and the crack reopened.',
    prop: 'This example repair propped pier 2 from the channel. The load held, but the prop stands in the boat lane and the boat stops against it.',
    underpin: 'This example repair strengthened pier 2 inside its own footprint, and both checks passed. They cover load and clearance only; a full handoff does not guarantee a compliant repair.',
    Repair_Patch: 'New deck surface laid over the crack; nothing under the deck changed.',
    Repair_Prop: 'The prop column stands inside the boat lane, between the lane buoys.',
    Repair_Underpin: 'The underpin wraps pier 2 and stays inside its footprint, clear of the lane.',
  };

  const setVisible = (o, v) => o.traverse((c) => { if (c.isMesh) c.visible = v; });
  function restoreBridge() {
    for (const [o, h] of home) { o.position.copy(h.p); o.rotation.copy(h.r); }
    for (const k in repairs) setVisible(repairs[k], false);
    setVisible(reopened, false);
    test = null;
    tested = false;
  }
  function applyState() {
    const s = STATES[state];
    pierCrack.material = s.support ? suppliedMat : crackMat;
    setVisible(envelope, s.clearance);
  }

  const handoff = ctx.addAction(STATES[0].label, cycle);
  const run = ctx.addAction('Repair from this handoff', startTest);

  function syncButtons() {
    handoff.textContent = STATES[state].label;
    handoff.setAttribute?.('aria-label', STATES[state].label + '. Press to change what the handoff carries.');
    handoff.disabled = !!test;
    run.disabled = !!test;
  }

  // Any change to the handoff clears a built repair and its results at once.
  function setState(next, fromPick) {
    if (test) return;
    const changed = tested;
    if (changed) restoreBridge();
    state = next;
    applyState();
    if (!fromPick) {
      const s = STATES[state];
      ctx.view(...VIEWS[s.support && s.clearance ? 'both' : s.support ? 'support' : s.clearance ? 'clearance' : 'request']);
    }
    ctx.caption(changed ? CAPTION.changed + ' ' + CAPTION[state] : CAPTION[state]);
    syncButtons();
    ctx.invalidate();
  }
  function cycle() { setState((state + 1) % STATES.length, false); }
  function toggle(kind) {
    const s = STATES[state];
    setState(kind === 'support' ? stateOf(!s.support, s.clearance) : stateOf(s.support, !s.clearance), true);
  }

  function chooseRepair() {
    const s = STATES[state];
    if (s.support && s.clearance) return 'underpin';
    if (s.support) return 'prop';
    return 'patch';
  }

  function startTest() {
    if (test) return;
    restoreBridge();
    const kind = chooseRepair();
    setVisible(repairs[kind], true);
    test = { kind, t: 0 };
    ctx.view(...VIEWS.test);
    ctx.caption(CAPTION.running);
    if (ctx.reducedMotion) { pose(kind, 99); finish(); return; }
    syncButtons();
    ctx.invalidate();
  }

  // Deck top offset at x for a joint drop s over pier 2 (x = 1.4).
  const deckDrop = (x, s) => (x < -1.4 || x > 4.6 ? 0 : x <= 1.4 ? -s * (x + 1.4) / 2.8 : -s * (4.6 - x) / 3.2);
  const ease = (u) => { u = Math.min(1, Math.max(0, u)); return u * u * (3 - 2 * u); };

  // Timeline: cart rolls 0–2.4 s, boat sails 2.8–5.4 s.
  function pose(kind, t) {
    const xEnd = 3.1;
    const u = ease(t / 2.4);
    const x = cartX0 + (xEnd - cartX0) * u;
    const settles = kind === 'patch';
    const s = settles ? 0.17 * ease((x - 0.2) / 2.4) : 0;
    deckC.rotation.z = home.get(deckC).r.z - Math.atan(s / 2.8);
    deckE.rotation.z = home.get(deckE).r.z + Math.atan(s / 3.2);
    pier.position.y = home.get(pier).p.y - s;
    cart.position.x = x;
    cart.position.y = cartY0 + deckDrop(x, s);
    setVisible(reopened, s > 0.08);
    const v = ease((t - 2.8) / 2.6);
    // The bow shoulder meets the prop's downstream face at z ≈ 0.47; a clear
    // lane lets the boat finish upstream of the bridge.
    const zEnd = kind === 'prop' ? 0.475 : -2.3;
    boat.position.z = boatZ0 + (zEnd - boatZ0) * v;
    return t < 5.4;
  }

  function finish() {
    const kind = test.kind;
    ctx.caption(kind === 'patch' && STATES[state].clearance ? CAPTION.patchLane : CAPTION[kind]);
    test = null;
    tested = true;
    syncButtons();
    ctx.invalidate();
  }

  // Picks describe objects; picking the split or the boat/buoys adds or removes
  // that item from the handoff, keeping the button label in step.
  ctx.onPick((hits) => {
    if (test) return;
    const hit = hits[0];
    if (!hit) return;
    let name = '';
    for (let o = hit.object; o && o !== model; o = o.parent) {
      if (/^(Pier2|Boat|Buoy|DeckCrack|OldPatch|Repair_|Prop_|Underpin_)/.test(o.name)) name = o.name;
    }
    if (/^Pier2_(crack|spall)/.test(name)) return toggle('support');
    if (/^Pier2/.test(name)) {
      const n = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
      if (n.z < -0.5) return toggle('support');
      return ctx.caption(CAPTION.pierFront);
    }
    if (/^(Boat|Buoy)/.test(name)) return toggle('clearance');
    if (/^(DeckCrack|OldPatch)/.test(name)) return ctx.caption(CAPTION.symptom);
    if (/^Repair_/.test(name)) return ctx.caption(CAPTION[name]);
  });

  function reset() {
    restoreBridge();
    state = 0;
    applyState();
    syncButtons();
    ctx.caption(CAPTION.initial);
    ctx.invalidate();
  }
  reset();

  return {
    update(dt) {
      if (!test) return false;
      test.t += dt;
      if (pose(test.kind, test.t)) return true;
      finish();
      return false;
    },
    reset,
    dispose() {
      for (const l of lines) { l.removeFromParent(); l.geometry.dispose(); }
      lineMat.dispose();
      suppliedMat.dispose();
    },
  };
}

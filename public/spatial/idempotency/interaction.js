// Idempotency: two concurrent attempts carry the same key k7 for release v1.
// Atomic claim: both guide arms end at one k7 socket, so the second attempt waits and reads the saved ticket.
// Check then write: the arms run to separate docks; both checks find no k7 and both write a ticket.
// Host contract: docs/spatial-contract.json. THREE is supplied through ctx; no imports.

const START = 0.75;
const WIN = 3.5578;   // arm-local distance where a carriage reaches the claim socket or its dock
const WAIT = 3.0578;  // where attempt 2 stops behind the occupied claim
const RUN = 2.6;      // seconds for one send
const SWING = 0.7;    // seconds for the arms to swing between modes
const INITIAL = 'Two concurrent attempts carry key k7 for release v1. Send both and see whether their paths meet at one claim.';

export default function setup(ctx) {
  const { model } = ctx;
  const get = (n) => model.getObjectByName(n);
  const arms = ['L', 'R'].map((s) => {
    const o = get('Arm_' + s);
    const car = get('Car_' + s);
    return { s, o, atomic: o ? o.rotation.y : 0, car, carZ: car ? car.position.z : 0, peg: get('CarPeg_' + s) };
  });
  const objs = {};
  for (const n of ['ClaimPeg', 'DockPeg_L', 'DockPeg_R', 'Ticket_A_47', 'Ticket_L_47', 'Ticket_R_48', 'Reply_L_47', 'Reply_R_47', 'Reply_R_48']) {
    const o = get(n);
    if (o) objs[n] = { o, p: o.position.clone(), s: o.scale.clone() };
  }
  // mode: 'atomic' | 'split'; swing: 0 = atomic geometry, 1 = split geometry; p: send progress 0..1.
  const state = { mode: 'atomic', swing: 0, swingTo: 0, sent: false, p: 0 };

  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const seg = (p, a, b) => ease((p - a) / (b - a));

  function show(n, k, how) {
    const e = objs[n];
    if (!e) return;
    e.o.visible = k > 0;
    e.o.position.copy(e.p);
    e.o.scale.copy(e.s);
    if (how === 'rise') e.o.scale.y = Math.max(0.001, e.s.y * k);
    if (how === 'drop') e.o.position.y = e.p.y + 0.5 * (1 - k);
  }

  function apply() {
    for (const a of arms) if (a.o) a.o.rotation.y = a.atomic * (1 - ease(state.swing));
    const p = state.sent ? state.p : 0;
    const atomic = state.mode === 'atomic';
    const travel = seg(p, 0, 0.45);
    for (const a of arms) {
      if (!a.car) continue;
      const end = atomic && a.s === 'R' ? WAIT : WIN;
      a.car.position.z = a.carZ - (end - START) * travel;
    }
    const seat = seg(p, 0.45, 0.6);
    const ticket = seg(p, 0.6, 0.8);
    const reply = seg(p, 0.8, 1);
    if (arms[0].peg) arms[0].peg.visible = seat === 0;
    if (arms[1].peg) arms[1].peg.visible = atomic || seat === 0;
    show('ClaimPeg', atomic ? seat : 0, 'drop');
    show('DockPeg_L', atomic ? 0 : seat, 'drop');
    show('DockPeg_R', atomic ? 0 : seat, 'drop');
    show('Ticket_A_47', atomic ? ticket : 0, 'rise');
    show('Ticket_L_47', atomic ? 0 : ticket, 'rise');
    show('Ticket_R_48', atomic ? 0 : ticket, 'rise');
    show('Reply_L_47', reply, 'drop');
    show('Reply_R_47', atomic ? reply : 0, 'drop');
    show('Reply_R_48', atomic ? 0 : reply, 'drop');
  }

  let bSend;
  let bMode;
  const modeCaption = () => (state.mode === 'atomic'
    ? 'Atomic claim: both paths end at the one k7 socket, where the claim and the ticket commit together. Send both attempts.'
    : 'Check then write: each path checks for k7 and later writes at its own dock; nothing makes the two attempts meet. Send both attempts.');
  const resultCaption = () => (state.mode === 'atomic'
    ? 'One ticket. Attempt 1 claimed k7 and wrote #47 in one transaction; attempt 2 waited at the taken claim, then read the saved record. Both runners got #47.'
    : 'Two tickets for one release. Both attempts checked before either wrote, found no k7, and each wrote its own row: #47 and #48.');

  function relabel() {
    if (bSend) { bSend.disabled = state.sent; bSend.textContent = state.sent ? 'Both attempts sent' : 'Send both attempts'; }
    if (bMode) bMode.textContent = state.mode === 'atomic' ? 'Switch to check, then write' : 'Switch to atomic claim';
  }

  function send() {
    if (state.sent) return;
    state.swing = state.swingTo;   // finish any arm swing before the attempts leave
    state.sent = true;
    state.p = ctx.reducedMotion ? 1 : 0;
    relabel();
    apply();
    ctx.caption(state.p >= 1 ? resultCaption() : 'Both attempts left together with key k7 and release v1.');
    ctx.invalidate();
  }

  function switchMode() {
    state.mode = state.mode === 'atomic' ? 'split' : 'atomic';
    state.swingTo = state.mode === 'atomic' ? 0 : 1;
    state.sent = false;            // a new design means a fresh run with the same two attempts
    state.p = 0;
    if (ctx.reducedMotion) state.swing = state.swingTo;
    relabel();
    apply();
    ctx.caption(modeCaption());
    ctx.invalidate();
  }

  bSend = ctx.addAction('Send both attempts', send);
  bMode = ctx.addAction('Switch to check, then write', switchMode);

  const done = () => state.sent && state.p >= 1;
  ctx.onPick((hits) => {
    const h = (hits || [])[0];
    for (let o = h?.object; o; o = o.parent) {
      const n = o.name || '';
      if (/^(Claim|ClaimPeg|Label_claim)/.test(n)) {
        return ctx.caption(done() && state.mode === 'atomic'
          ? 'The k7 socket holds attempt 1\'s claim, and #47 was written in the same transaction. A second claim for k7 cannot fit.'
          : 'This block has room for one k7 claim, and writes the ticket in the same transaction, so concurrent attempts must meet here.');
      }
      if (/^(Dock|DockPeg|Label_dock|Arch)/.test(n)) {
        return ctx.caption(done() && state.mode === 'split'
          ? 'Each dock now holds its own k7 row and ticket. Both checks ran before either write existed.'
          : 'A dock checks for k7 at the arch, then writes later. Between the check and the write, nothing stops the other attempt doing the same.');
      }
      if (/^(Ticket_)/.test(n)) {
        return ctx.caption(n.includes('48') ? '#48 is a second ticket for the same release v1: a duplicate.' : '#47 is the ticket for release v1.');
      }
      if (/^(Tray|Reply|Desk|Label_desk)/.test(n)) {
        const side = /_R(_|$)/.test(n) ? 'R' : 'L';
        const num = side === 'L' ? 1 : 2;
        if (!done()) return ctx.caption('Runner attempt ' + num + ' has no reply yet. It learns the outcome only from what arrives in this tray.');
        const t = side === 'R' && state.mode === 'split' ? 48 : 47;
        return ctx.caption('Runner attempt ' + num + ' received #' + t + '.' + (state.mode === 'atomic' ? ' Both runners hold the same ticket number.' : ' The runners now hold different tickets for one release.'));
      }
      if (/^(Car_|CarPeg|Arm_)/.test(n)) {
        return ctx.caption('Both attempts carry key k7 with release v1: one intended ticket, sent twice. Reusing k7 with v2 would be rejected; that check is not shown.');
      }
    }
  });

  ctx.caption(INITIAL);
  apply();

  return {
    update(dt) {
      const step = Math.min(dt || 0.016, 0.05);
      let busy = false;
      if (state.swing !== state.swingTo) {
        const d = state.swingTo - state.swing;
        const s = step / SWING;
        state.swing = Math.abs(d) <= s ? state.swingTo : state.swing + Math.sign(d) * s;
        busy = true;
      }
      if (state.sent && state.p < 1) {
        state.p = Math.min(1, state.p + step / RUN);
        if (state.p >= 1) ctx.caption(resultCaption());
        busy = true;
      }
      if (busy) apply();
      return state.swing !== state.swingTo || (state.sent && state.p < 1);
    },
    reset() {
      Object.assign(state, { mode: 'atomic', swing: 0, swingTo: 0, sent: false, p: 0 });
      relabel();
      apply();
      ctx.caption(INITIAL);
    },
    dispose() {
      for (const e of Object.values(objs)) { e.o.visible = true; e.o.position.copy(e.p); e.o.scale.copy(e.s); }
    },
  };
}


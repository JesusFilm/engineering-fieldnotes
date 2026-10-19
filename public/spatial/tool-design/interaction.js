// Tool design: three sealed searches return the same empty tray.
// Opening a housing shows how far each search reached; returning status and
// coverage makes the same difference visible at the trays without opening anything.
export default function setup(ctx) {
  const {THREE, model} = ctx;
  const find = (name) => {
    const object = model.getObjectByName(name);
    if (!object) throw Error('Missing node ' + name);
    return object;
  };
  const OPEN_ANGLE = -1.85;
  const SPEED = 2.4; // lid travel per second, 0..1
  const axis = new THREE.Vector3(1, 0, 0);
  const turn = new THREE.Quaternion();
  const lanes = [1, 2, 3].map((n) => {
    const lid = find('Lid_' + n);
    const coverage = find('Coverage_' + n);
    return {n, lid, coverage, closed: lid.quaternion.clone(), target: 0, value: 0, grow: 0};
  });
  const agent = find('Agent');

  const LANE_TEXT = {
    1: 'This search read the whole hour and found nothing: an honest empty result.',
    2: 'This search stopped at its scan budget after 40 minutes, short of an incident it never read.',
    3: 'This search timed out after 10 minutes; its empty tray hides a failure.',
  };
  const TEXT = {
    closed: 'Three searches for payments incidents in the last hour returned the same empty tray.',
    allOpen: 'Only the first empty tray means “no incidents”; the other searches stopped before incidents they never read.',
    coverageClosed: 'The trays now carry status and coverage: complete, partial with a cursor, and a timeout error, visible without opening anything.',
    coverageOpen: 'Each tray’s coverage matches how far its search actually reached.',
  };

  let coverage = false;
  let lastLane = null;

  const openButton = ctx.addAction('Open the housings', () => {
    const anyClosed = lanes.some((lane) => lane.target === 0);
    lanes.forEach((lane) => { lane.target = anyClosed ? 1 : 0; });
    lastLane = null;
    refresh();
  });
  const coverageButton = ctx.addAction('Return status and coverage', () => {
    coverage = !coverage;
    lanes.forEach((lane) => {
      lane.coverage.visible = coverage;
      lane.grow = coverage && !ctx.reducedMotion ? 0 : 1;
      lane.coverage.scale.setScalar(lane.grow);
    });
    refresh();
  });

  function describe() {
    const open = lanes.filter((lane) => lane.target === 1);
    if (!open.length) return coverage ? TEXT.coverageClosed : TEXT.closed;
    if (coverage) return TEXT.coverageOpen;
    if (lastLane && lanes[lastLane - 1].target === 1) return LANE_TEXT[lastLane];
    if (open.length === 3) return TEXT.allOpen;
    return LANE_TEXT[open[open.length - 1].n];
  }

  function refresh() {
    const anyClosed = lanes.some((lane) => lane.target === 0);
    openButton.textContent = anyClosed ? 'Open the housings' : 'Close the housings';
    openButton.setAttribute('aria-pressed', String(!anyClosed));
    coverageButton.textContent = coverage ? 'Return a bare list' : 'Return status and coverage';
    coverageButton.setAttribute('aria-pressed', String(coverage));
    if (ctx.reducedMotion) lanes.forEach((lane) => { lane.value = lane.target; apply(lane); });
    ctx.caption(describe());
    ctx.invalidate();
  }

  function apply(lane) {
    const eased = lane.value * lane.value * (3 - 2 * lane.value);
    turn.setFromAxisAngle(axis, OPEN_ANGLE * eased);
    lane.lid.quaternion.copy(lane.closed).multiply(turn);
  }

  function laneOf(object) {
    for (let o = object; o && o !== model; o = o.parent) {
      const match = /^(?:Lid|Housing|Lane|Carriage|Incident|Tray|Coverage)_(\d)/.exec(o.name || '');
      if (match) return Number(match[1]);
      if (o === agent) return 'agent';
    }
    return null;
  }

  ctx.onPick((hits) => {
    for (const hit of hits) {
      const lane = laneOf(hit.object);
      if (lane === 'agent') {
        // Stand behind the agent: from here only the trays are visible.
        ctx.view([1.3, 3.6, 8.6], [0, 0.3, 3.6]);
        return;
      }
      if (lane) {
        const entry = lanes[lane - 1];
        entry.target = entry.target ? 0 : 1;
        lastLane = entry.target ? lane : null;
        refresh();
        return;
      }
    }
  });

  function reset() {
    coverage = false;
    lastLane = null;
    lanes.forEach((lane) => {
      lane.target = 0;
      lane.value = 0;
      lane.grow = 1;
      lane.coverage.visible = false;
      lane.coverage.scale.setScalar(1);
      apply(lane);
    });
    refresh();
  }

  lanes.forEach((lane) => { lane.coverage.visible = false; });
  ctx.caption(TEXT.closed);

  return {
    update(dt) {
      let moving = false;
      for (const lane of lanes) {
        if (lane.value !== lane.target) {
          const step = SPEED * dt;
          lane.value = lane.target > lane.value ? Math.min(lane.target, lane.value + step) : Math.max(lane.target, lane.value - step);
          apply(lane);
          moving = moving || lane.value !== lane.target;
        }
        if (lane.coverage.visible && lane.grow < 1) {
          lane.grow = Math.min(1, lane.grow + dt * 4);
          const s = 1 - Math.pow(1 - lane.grow, 3);
          lane.coverage.scale.setScalar(Math.max(0.001, s));
          moving = moving || lane.grow < 1;
        }
      }
      return moving;
    },
    reset,
    dispose() {
      lanes.forEach((lane) => {
        lane.lid.quaternion.copy(lane.closed);
        lane.coverage.visible = true;
        lane.coverage.scale.setScalar(1);
      });
    },
  };
}

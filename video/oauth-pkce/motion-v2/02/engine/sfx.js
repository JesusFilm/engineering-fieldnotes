/* sfx.js — tiny deterministic synthesiser for flow-video sound effects.
 * Works in the browser (window.SFX) and Node (module.exports).
 * A sound is a preset: layers of tones/noise with envelopes and glides, plus an optional echo.
 * Scenes cue sounds with s.sfx(t, name, { note, gain, pan, ... }) and can override presets.
 * Tweak a sound by editing its numbers here or overriding it in the scene with s.sound(name, partial).
 */
(function (root) {
  const A4 = 440;
  const SEMI = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
  function noteFreq(n) {
    if (typeof n === 'number') return n;
    const m = /^([A-G])(#|b)?(-?\d)$/.exec(n);
    if (!m) throw new Error('bad note ' + n);
    const s = SEMI[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (+m[3] - 4) * 12;
    return A4 * Math.pow(2, s / 12);
  }

  // Layer fields:
  //   type 'tone' | 'noise'
  //   tone:  wave sine|triangle|square|saw, ratio (x base note) or freq, glideTo (ratio or Hz end), glide (s),
  //          harmonics [amp of 1st, 2nd, 3rd ...], harmDecay (extra decay speed for upper partials)
  //   noise: lp (start cutoff Hz), lpTo (end cutoff), hp (Hz)
  //   env:   delay, attack, decay (time constant-ish: seconds to ~-40 dB), gain
  // Preset fields: base (note), layers [], echo { delay, feedback, repeats }, gain
  const PRESETS = {
    // Soft high tick when something is sent (pitched per sender).
    send: { base: 'C6', gain: 0.22, layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.12, harmonics: [1, 0.15] }] },
    // Mallet note when work lands on a node; give each node its own note (C5 / E5 / G5).
    arrive: { base: 'C5', gain: 0.55, echo: { delay: 0.085, feedback: 0.45, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.003, decay: 0.32, harmonics: [1, 0.35, 0.12, 0.06], harmDecay: 3 },
               { type: 'noise', lp: 6000, hp: 2000, attack: 0.001, decay: 0.02, gain: 0.08 }] },
    // Health-check probe acknowledged: tiny glassy blip.
    ack: { base: 'G6', gain: 0.26, layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.1, harmonics: [1, 0.2] }] },
    // Something breaks: noise burst + falling tone + sub thump.
    crash: { base: 'A5', gain: 0.9,
      layers: [{ type: 'noise', lp: 9000, lpTo: 400, attack: 0.002, decay: 0.45, gain: 0.55 },
               { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.12, glide: 0.6, attack: 0.004, decay: 0.7, gain: 0.5, harmonics: [1, 0.3, 0.12] },
               { type: 'tone', wave: 'sine', freq: 70, glideTo: 32, glide: 0.5, attack: 0.003, decay: 0.6, gain: 0.9 }] },
    // A failed check against something already down: dull thump.
    thump: { base: 'E4', gain: 0.7,
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.62, glide: 0.25, attack: 0.003, decay: 0.3, gain: 0.6, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', freq: 60, glideTo: 38, glide: 0.25, attack: 0.002, decay: 0.3, gain: 0.8 }] },
    // Coming back up: rising sweep.
    recover: { base: 'G3', gain: 0.45,
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 4.5, glide: 0.55, attack: 0.08, decay: 0.75, gain: 0.6, harmonics: [1, 0.3, 0.12] }] },
    // Success / back in service: two-note bright chime.
    chime: { base: 'C6', gain: 0.4, echo: { delay: 0.09, feedback: 0.35, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.35, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', ratio: 1.26, delay: 0.09, attack: 0.003, decay: 0.45, harmonics: [1, 0.2] }] },
    // Lookup that finds nothing: short low two-note fall.
    miss: { base: 'E4', gain: 0.45,
      layers: [{ type: 'tone', wave: 'square', ratio: 1, attack: 0.004, decay: 0.12, gain: 0.25 },
               { type: 'tone', wave: 'square', ratio: 0.84, delay: 0.1, attack: 0.004, decay: 0.2, gain: 0.25 }] },
    // Lookup that finds it: quick sparkle up.
    hit: { base: 'E6', gain: 0.4, echo: { delay: 0.07, feedback: 0.4, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.002, decay: 0.18, harmonics: [1, 0.25] },
               { type: 'tone', wave: 'sine', ratio: 1.335, delay: 0.06, attack: 0.002, decay: 0.3, harmonics: [1, 0.25] }] },
    // Slow work in progress: low ticking (one tick; cue repeatedly).
    work: { base: 'G3', gain: 0.35, layers: [{ type: 'tone', wave: 'triangle', attack: 0.002, decay: 0.07, harmonics: [1, 0.4] }, { type: 'noise', lp: 2500, hp: 600, decay: 0.03, gain: 0.25 }] },
    // Writing / storing something: soft click-lock.
    store: { base: 'G5', gain: 0.4, layers: [{ type: 'noise', lp: 5000, hp: 1500, attack: 0.001, decay: 0.025, gain: 0.5 }, { type: 'tone', wave: 'sine', delay: 0.02, attack: 0.002, decay: 0.2, harmonics: [1, 0.3] }] },
    // Evicted / deleted: airy poof.
    poof: { base: 'C5', gain: 0.45, layers: [{ type: 'noise', lp: 3000, lpTo: 300, attack: 0.03, decay: 0.4, gain: 0.6 }, { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.5, glide: 0.3, attack: 0.01, decay: 0.25, gain: 0.25 }] },
    // Response delivered: soft rounded note (pitch = how good the outcome is).
    deliver: { base: 'C5', gain: 0.45, echo: { delay: 0.1, feedback: 0.3, repeats: 1 }, layers: [{ type: 'tone', wave: 'sine', attack: 0.004, decay: 0.4, harmonics: [1, 0.3, 0.1] }] },
    // Clock tick for time passing.
    clock: { base: 'A6', gain: 0.18, layers: [{ type: 'noise', lp: 8000, hp: 3000, decay: 0.012, gain: 0.7 }, { type: 'tone', wave: 'sine', decay: 0.03, gain: 0.3 }] },
  };

  function merge(a, b) {
    if (!b) return a;
    const out = Array.isArray(a) ? a.slice() : Object.assign({}, a);
    for (const k in b) {
      if (k === 'layers' && Array.isArray(b.layers)) {
        out.layers = (a.layers || []).map((l, i) => Object.assign({}, l, b.layers[i] || {}));
        for (let i = (a.layers || []).length; i < b.layers.length; i++) out.layers.push(b.layers[i]);
      } else if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a && typeof a[k] === 'object') out[k] = merge(a[k], b[k]);
      else out[k] = b[k];
    }
    return out;
  }

  // Deterministic noise so renders are repeatable.
  function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1; }
  const WAVES = {
    sine: (p) => Math.sin(p),
    triangle: (p) => (2 / Math.PI) * Math.asin(Math.sin(p)),
    square: (p) => Math.tanh(4 * Math.sin(p)),
    saw: (p) => { const x = (p / (2 * Math.PI)) % 1; return 2 * x - 1; },
  };

  function renderVoice(def, sr, seed) {
    const base = noteFreq(def.base || 'C5');
    let len = 0;
    for (const l of def.layers) len = Math.max(len, (l.delay || 0) + (l.attack || 0.003) + (l.decay || 0.2) * 1.6);
    const e = def.echo;
    const total = len + (e ? e.delay * (e.repeats || 1) : 0);
    const n = Math.ceil(total * sr), out = new Float32Array(n);
    const rand = rng(seed);
    for (const l of def.layers) {
      const d0 = Math.floor((l.delay || 0) * sr), att = Math.max(1, (l.attack || 0.003) * sr), dec = (l.decay || 0.2) * sr;
      const g = l.gain === undefined ? 1 : l.gain;
      const f0 = l.freq !== undefined ? noteFreq(l.freq) : base * (l.ratio || 1);
      const f1 = l.glideTo === undefined ? f0 : (l.freq !== undefined && l.glideTo > 8 ? l.glideTo : l.freq !== undefined ? f0 * l.glideTo : base * l.glideTo);
      const gl = Math.max(1, (l.glide || 0.2) * sr);
      const harm = l.harmonics || [1];
      const wave = WAVES[l.wave || 'sine'];
      const phases = harm.map(() => 0);
      let lp = 0, hpPrev = 0, hpOut = 0;
      const L = Math.min(n - d0, Math.ceil(att + dec * 1.6));
      for (let i = 0; i < L; i++) {
        const env = i < att ? i / att : Math.exp(-((i - att) / dec) * 4.6);
        let v = 0;
        if (l.type === 'noise') {
          const k = Math.min(1, i / gl);
          const cut = l.lpTo !== undefined ? l.lp * Math.pow(l.lpTo / l.lp, k) : (l.lp || 8000);
          const a = 1 - Math.exp((-2 * Math.PI * cut) / sr);
          lp += a * (rand() - lp);
          v = lp;
          if (l.hp) { const ah = Math.exp((-2 * Math.PI * l.hp) / sr); hpOut = ah * (hpOut + v - hpPrev); hpPrev = v; v = hpOut; }
          v *= 2.2;
        } else {
          const k = Math.min(1, i / gl);
          const f = f0 * Math.pow(f1 / f0, k);
          for (let h = 0; h < harm.length; h++) {
            phases[h] += (2 * Math.PI * f * (h + 1)) / sr;
            const hd = h && l.harmDecay ? Math.exp(-((i / dec) * l.harmDecay * h)) : 1;
            v += harm[h] * hd * wave(phases[h]);
          }
        }
        out[d0 + i] += v * env * g;
      }
    }
    if (e) { // feedback echo
      const ds = Math.floor(e.delay * sr);
      const dry = out.slice();
      let amp = 1;
      for (let r = 1; r <= (e.repeats || 1); r++) {
        amp *= e.feedback;
        const off = ds * r;
        for (let i = 0; i + off < n; i++) out[i + off] += dry[i] * amp;
      }
    }
    return out;
  }

  // cues: [{ t, name, note?, gain?, pan?, ...presetOverrides }], returns { left, right, sampleRate }
  function render(cues, duration, { sampleRate = 44100, presets = {}, master = 0.9 } = {}) {
    const n = Math.ceil(duration * sampleRate);
    const L = new Float32Array(n), R = new Float32Array(n);
    const lib = Object.assign({}, PRESETS);
    for (const k in presets) lib[k] = lib[k] ? merge(lib[k], presets[k]) : presets[k];
    cues.forEach((c, idx) => {
      const p = lib[c.name];
      if (!p) throw new Error('unknown sound ' + c.name);
      let def = p;
      if (c.note) def = Object.assign({}, def, { base: c.note });
      if (c.override) def = merge(def, c.override);
      const v = renderVoice(def, sampleRate, 1000 + idx * 7919);
      const g = (def.gain === undefined ? 1 : def.gain) * (c.gain === undefined ? 1 : c.gain);
      const pan = Math.max(-1, Math.min(1, c.pan || 0));
      const gl = g * Math.cos(((pan + 1) * Math.PI) / 4), gr = g * Math.sin(((pan + 1) * Math.PI) / 4);
      const s0 = Math.floor(c.t * sampleRate);
      for (let i = 0; i < v.length && s0 + i < n; i++) { if (s0 + i < 0) continue; L[s0 + i] += v[i] * gl; R[s0 + i] += v[i] * gr; }
    });
    for (let i = 0; i < n; i++) { L[i] = Math.tanh(L[i] * master); R[i] = Math.tanh(R[i] * master); }
    return { left: L, right: R, sampleRate };
  }

  function toWav({ left, right, sampleRate }) {
    const n = left.length, buf = new ArrayBuffer(44 + n * 4), dv = new DataView(buf);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); dv.setUint32(4, 36 + n * 4, true); w(8, 'WAVE'); w(12, 'fmt '); dv.setUint32(16, 16, true);
    dv.setUint16(20, 1, true); dv.setUint16(22, 2, true); dv.setUint32(24, sampleRate, true); dv.setUint32(28, sampleRate * 4, true);
    dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); w(36, 'data'); dv.setUint32(40, n * 4, true);
    for (let i = 0; i < n; i++) {
      dv.setInt16(44 + i * 4, Math.max(-1, Math.min(1, left[i])) * 32767, true);
      dv.setInt16(46 + i * 4, Math.max(-1, Math.min(1, right[i])) * 32767, true);
    }
    return buf;
  }

  const api = { PRESETS, render, toWav, noteFreq, merge };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.SFX = api;
})(typeof window !== 'undefined' ? window : globalThis);


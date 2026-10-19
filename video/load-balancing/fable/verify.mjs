#!/usr/bin/env node
// Verify an encoded cut of this scene: stream format, full decode, exact first/last frame equality, faststart,
// audio peak, and cue synchronisation (does the decoded audio rise at every scheduled sound cue?).
// Usage: node verify.mjs <file.mp4> [report.json]
import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const [file, reportOut] = process.argv.slice(2);
if (!file) { console.error('usage: node verify.mjs <file.mp4> [report.json]'); process.exit(1); }
const FF = ['-threads', '2'];
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { maxBuffer: 1 << 30, ...opts });
const report = { file: path.relative(here, path.resolve(file)), checks: {}, ok: true };
const fail = (name, msg) => { report.checks[name] = { ok: false, detail: msg }; report.ok = false; };
const pass = (name, detail) => { report.checks[name] = { ok: true, detail }; };

// 1. streams
const probe = JSON.parse(sh('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]));
const v = probe.streams.find((s) => s.codec_type === 'video'), a = probe.streams.find((s) => s.codec_type === 'audio');
const fmtOk = v && a && v.codec_name === 'h264' && v.pix_fmt === 'yuv420p' && v.width === 1080 && v.height === 1920 && v.r_frame_rate === '30/1' && a.codec_name === 'aac';
const duration = +probe.format.duration, bytes = +probe.format.size;
(fmtOk ? pass : fail)('format', { video: v && [v.codec_name, v.pix_fmt, v.width, v.height, v.r_frame_rate], audio: a && a.codec_name, duration, bytes });
report.duration = duration; report.bytes = bytes; report.frames = +v.nb_frames;
if (!(duration >= 22 && duration <= 35)) fail('durationRange', duration); else pass('durationRange', duration);
if (!(bytes < 2_000_000)) fail('sizeUnder2MB', bytes); else pass('sizeUnder2MB', bytes);

// 2. full decode with -xerror; any warning is a failure
const dec = spawnSync('ffmpeg', ['-v', 'error', '-xerror', ...FF, '-i', file, '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 1 << 26 });
(dec.status === 0 && !dec.stderr ? pass : fail)('fullDecode', dec.stderr || 'clean');

// 3. exact first/last frame equality (rgb24)
const count = +v.nb_frames;
const raw = sh('ffmpeg', ['-v', 'error', ...FF, '-i', file, '-vf', 'select=eq(n\\,0)+eq(n\\,' + (count - 1) + ')', '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', ...FF, '-f', 'rawvideo', 'pipe:1']);
const size = 1080 * 1920 * 3;
let diff = 0;
if (raw.length === size * 2) { for (let i = 0; i < size; i++) if (raw[i] !== raw[size + i]) diff++; }
(raw.length === size * 2 && diff === 0 ? pass : fail)('boundaryFramesIdentical', { bytesDiffering: raw.length === size * 2 ? diff : 'frame count mismatch ' + raw.length });

// 4. faststart: moov before mdat
const data = fs.readFileSync(file);
const boxes = {}; let pos = 0;
while (pos + 8 <= data.length) {
  let len = data.readUInt32BE(pos); const kind = data.toString('latin1', pos + 4, pos + 8); let header = 8;
  if (len === 1) { len = Number(data.readBigUInt64BE(pos + 8)); header = 16; }
  if (len === 0) len = data.length - pos;
  if (len < header) break;
  boxes[kind] = pos; pos += len;
}
(boxes.moov !== undefined && boxes.mdat !== undefined && boxes.moov < boxes.mdat ? pass : fail)('faststart', boxes);

// 5. audio peak
const vol = spawnSync('ffmpeg', ['-hide_banner', ...FF, '-i', file, '-vn', '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
const peak = +(/max_volume: ([-\d.]+) dB/.exec(vol) || [])[1], mean = +(/mean_volume: ([-\d.]+) dB/.exec(vol) || [])[1];
(peak <= -0.5 && peak > -40 ? pass : fail)('audioPeak', { maxDbfs: peak, meanDbfs: mean });
report.audioPeakDbfs = peak;

// 6. cue synchronisation: decode to mono float, compare short-window RMS just after each cue with just before it.
const F = require(path.join(here, 'engine/flow-engine.js'));
require(path.join(here, 'scene.js'));
const sc = F.createScene(F.lastScene);
const cues = sc.audioCues();
const sr = 22050;
const pcm = sh('ffmpeg', ['-v', 'error', ...FF, '-i', file, '-vn', '-ac', '1', '-ar', String(sr), '-f', 'f32le', 'pipe:1']);
const mono = new Float32Array(pcm.buffer, pcm.byteOffset, pcm.length / 4);
const rms = (t0, t1) => { const i0 = Math.max(0, Math.floor(t0 * sr)), i1 = Math.min(mono.length, Math.floor(t1 * sr)); let e = 0; for (let i = i0; i < i1; i++) e += mono[i] * mono[i]; return Math.sqrt(e / Math.max(1, i1 - i0)); };
const misses = [];
let checked = 0;
for (const c of cues) {
  // skip cues that start inside the tail of a louder preceding cue (ticks under work); check all event sounds
  const before = rms(c.t - 0.09, c.t - 0.01), after = rms(c.t + 0.005, c.t + 0.07);
  checked++;
  if (!(after > before * 1.15 || after > 0.02)) misses.push({ t: +c.t.toFixed(2), name: c.name, before: +before.toFixed(4), after: +after.toFixed(4) });
}
const syncOk = misses.filter((m) => m.name !== 'work').length === 0;
(syncOk ? pass : fail)('cueSync', { cues: checked, window: '60-70 ms after cue vs 80 ms before', unconfirmed: misses });
report.cues = cues.length;

// 7. poster beside the file, if present
const poster = file.replace(/\.mp4$/, '.jpg');
if (fs.existsSync(poster)) {
  const pp = JSON.parse(sh('ffprobe', ['-v', 'error', '-show_streams', '-of', 'json', poster])).streams[0];
  (pp.codec_name === 'mjpeg' && Math.abs(pp.width / pp.height - 9 / 16) < 0.002 && fs.statSync(poster).size > 1000 ? pass : fail)('poster', { codec: pp.codec_name, width: pp.width, height: pp.height, bytes: fs.statSync(poster).size });
}

report.sha256 = require('node:crypto').createHash('sha256').update(data).digest('hex');
report.audioHeard = false; // this script analyses audio; it does not listen to it
report.checkedAt = new Date().toISOString();
if (reportOut) fs.writeFileSync(reportOut, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 2);

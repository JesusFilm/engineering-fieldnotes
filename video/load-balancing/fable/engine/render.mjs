#!/usr/bin/env node
// Render a flow-engine scene to MP4 (video + synthesised sound effects) with headless Chrome + ffmpeg.
// Local copy for video/load-balancing/fable. Changes from the skill's scripts/render.mjs:
//   * every ffmpeg invocation is capped at two threads (-threads 2) so renders do not compete with other encoders;
//   * --master <0..1> scales the synthesised mix before the soft limiter (default 0.9 as in sfx.js);
//   * --peak <dBFS> lowers the final mix so its sample peak never exceeds the ceiling (default -1.0 dBFS; never raises);
//   * --normalize scales the mix linearly so its sample peak sits exactly at the --peak ceiling (raises or lowers);
//   * --abr <bitrate> sets the AAC bitrate (default 192k, as in the skill);
//   * --qp <n> encodes with a constant quantiser and forces keyframes on the first and last frame, so a looping
//     scene whose first and last frames are identical decodes to byte-identical boundary frames (default crf 18).
// Usage:
//   node render.mjs <scene.js> <out.mp4> [--speed 0.8] [--sheet sheet.png] [--music bed.m4a] [--no-sfx] [--wav sfx.wav] [--master 0.6] [--peak -1.0] [--qp 20]
//   node render.mjs <scene.js> --stills 2,6.5,10 --stills-dir dir      (times are playback seconds)
//   node render.mjs [<scene.js>] --audition crash,arrive --wav out.wav   (hear presets one after another)
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const SFX = require(path.join(here, 'sfx.js'));

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
const bool = (name) => { const i = args.indexOf(name); if (i >= 0) { args.splice(i, 1); return true; } return false; };
const music = flag('--music') || flag('--audio'), stills = flag('--stills'), stillsDir = flag('--stills-dir'), sheet = flag('--sheet');
const speed = flag('--speed'), wavOut = flag('--wav'), audition = flag('--audition');
const master = flag('--master'), peakCeiling = flag('--peak'), qp = flag('--qp'), abr = flag('--abr') || '192k';
const noSfx = bool('--no-sfx'), normalize = bool('--normalize');
const [sceneArg, outArg] = args;
const run = (cmd, a) => new Promise((res, rej) => spawn(cmd, a, { stdio: 'inherit' }).on('close', (c) => (c === 0 ? res() : rej(new Error(cmd + ' exit ' + c)))));
const writeWav = (file, audio) => fs.writeFileSync(file, Buffer.from(SFX.toWav(audio)));
const FF = ['-threads', '2', '-filter_threads', '2', '-filter_complex_threads', '2'];
// Scale a rendered mix down so its absolute sample peak sits at or below the ceiling (dBFS). Never scales up.
function limitPeak(audio, ceilingDb, exact = false) {
  let peak = 0;
  for (const ch of [audio.left, audio.right]) for (let i = 0; i < ch.length; i++) peak = Math.max(peak, Math.abs(ch[i]));
  const ceil = Math.pow(10, ceilingDb / 20);
  const scale = peak > 0 && (peak > ceil || exact);
  if (scale) { const g = ceil / peak; for (const ch of [audio.left, audio.right]) for (let i = 0; i < ch.length; i++) ch[i] *= g; }
  return { peakBefore: 20 * Math.log10(Math.max(peak, 1e-9)), peakAfter: 20 * Math.log10(Math.max(scale ? ceil : peak, 1e-9)) };
}

let page, browser, meta;
async function openScene() {
  let puppeteer;
  for (const base of [here, process.cwd()]) { try { puppeteer = require(require.resolve('puppeteer-core', { paths: [base] })); break; } catch {} }
  if (!puppeteer) { console.error('puppeteer-core not found. Run: npm install (in ' + here + ')'); process.exit(1); }
  const chromePaths = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  const executablePath = chromePaths.find((p) => fs.existsSync(p));
  if (!executablePath) { console.error('Chrome not found; set CHROME_PATH'); process.exit(1); }
  browser = await puppeteer.launch({ executablePath, headless: true, args: ['--allow-file-access-from-files', '--disable-gpu'] });
  page = await browser.newPage();
  page.on('pageerror', (e) => console.error('page error:', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.error('console:', m.text()); });
  const url = pathToFileURL(path.join(here, 'preview.html')).href + '?render=1' + (speed ? '&speed=' + speed : '') + '&scene=' + encodeURIComponent(pathToFileURL(path.resolve(sceneArg)).href);
  await page.goto(url);
  await page.waitForFunction('window.__ready === true', { timeout: 20000 });
  meta = await page.evaluate(() => window.__meta);
}

if (!sceneArg && !audition) { console.error('usage: see header of render.mjs'); process.exit(1); }

if (audition) {
  let presets = {};
  if (sceneArg) { await openScene(); presets = (await page.evaluate(() => window.__audio())).sounds; await browser.close(); }
  const names = audition.split(',');
  const cues = names.map((name, i) => ({ t: 0.2 + i * 1.3, name }));
  const out = path.resolve(wavOut || 'audition.wav');
  writeWav(out, SFX.render(cues, names.length * 1.3 + 0.8, { presets, master: master ? +master : undefined }));
  console.log('wrote ' + out + ' (' + names.join(' → ') + ', 1.3s apart)');
  process.exit(0);
}

await openScene();
const grab = async (t) => Buffer.from((await page.evaluate((tt) => window.__frame(tt), t)).split(',')[1], 'base64');
const D = meta.renderDuration;

if (stills) {
  const dir = path.resolve(stillsDir || 'stills');
  fs.mkdirSync(dir, { recursive: true });
  for (const s of stills.split(',').map(Number)) {
    const f = path.join(dir, 'still_' + s.toFixed(2).padStart(6, '0') + 's.png');
    fs.writeFileSync(f, await grab(s));
    console.log(f);
  }
}

if (outArg || wavOut) {
  const { cues, sounds } = await page.evaluate(() => window.__audio());
  const sfx = SFX.render(cues, D, { presets: sounds, master: master ? +master : undefined });
  const lim = limitPeak(sfx, peakCeiling ? +peakCeiling : -1.0, normalize);
  console.log('sfx peak ' + lim.peakBefore.toFixed(2) + ' dBFS before ceiling, ' + lim.peakAfter.toFixed(2) + ' dBFS after');
  const tmp = fs.mkdtempSync(path.join(path.resolve(here, '../../../../reviews/comparisons/load-balancing/scratch'), 'flowvid-'));
  const sfxWav = path.resolve(wavOut || path.join(tmp, 'sfx.wav'));
  writeWav(sfxWav, sfx);
  if (wavOut) console.log('wrote ' + sfxWav + ' (' + cues.length + ' cues)');
  if (outArg) {
    const out = path.resolve(outArg), silent = path.join(tmp, 'video.mp4');
    const frames = Math.round(D * meta.fps);
    const quality = qp ? ['-qp', String(qp), '-force_key_frames', 'expr:eq(n,0)+eq(n,' + (frames - 1) + ')'] : ['-crf', '18'];
    const proc = spawn('ffmpeg', ['-y', '-v', 'error', ...FF, '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(meta.fps), '-i', '-', '-c:v', 'libx264', ...FF, '-pix_fmt', 'yuv420p', ...quality, '-preset', 'medium', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => proc.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
    for (let i = 0; i < frames; i++) {
      const buf = await grab(i / meta.fps);
      if (!proc.stdin.write(buf)) await new Promise((r) => proc.stdin.once('drain', r));
      if (i % meta.fps === 0) process.stdout.write('\rframe ' + i + '/' + frames);
    }
    proc.stdin.end();
    await done;
    const mux = ['-y', '-v', 'error', ...FF, '-i', silent];
    if (noSfx && !music) mux.push('-c:v', 'copy', '-movflags', '+faststart', out);
    else {
      if (!noSfx) mux.push('-i', sfxWav);
      if (music) mux.push('-stream_loop', '-1', '-i', music);
      const filt = !noSfx && music ? ['-filter_complex', '[2:a]volume=0.35[m];[1:a][m]amix=inputs=2:duration=first:normalize=0[a]', '-map', '0:v', '-map', '[a]'] : ['-map', '0:v', '-map', '1:a'];
      mux.push(...filt, ...FF, '-c:v', 'copy', '-c:a', 'aac', '-b:a', abr, '-t', String(D), '-movflags', '+faststart', out);
    }
    await run('ffmpeg', mux);
    console.log('\nwrote ' + out + ' (' + D.toFixed(2) + 's @ ' + meta.fps + 'fps, speed ' + meta.speed + ', ' + (noSfx ? 'no sfx' : cues.length + ' sound cues') + ')');
    if (sheet) {
      await run('ffmpeg', ['-y', '-v', 'error', ...FF, '-i', out, '-vf', 'fps=1,scale=240:-1,tile=6x' + Math.ceil(D / 6), ...FF, '-frames:v', '1', path.resolve(sheet)]);
      console.log('wrote ' + path.resolve(sheet));
    }
  }
}
await browser.close();


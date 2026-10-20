import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const topics=JSON.parse(fs.readFileSync('content/order.json','utf8'));
const base=process.env.SEQUENCE_BASE_URL || 'http://localhost:4174/';
const output=process.env.SEQUENCE_CAPTURE_DIR || 'reviews/sequences/scratch';
fs.mkdirSync(output,{recursive:true});
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-gpu']});
const results=[];
try {
 for(const topic of topics){
  const page=await browser.newPage();
  const errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(r.url().includes('.mp4'))requests.push(r.url());});
  const url=new URL(`concepts/${topic}/`,base).href;
  const lessons=JSON.parse(fs.readFileSync(`video/${topic}/sequence/lessons.json`,'utf8'));
  await page.setViewport({width:1440,height:1050});
  await page.goto(url,{waitUntil:'networkidle0'});
  assert.equal(requests.length,0,`${topic}: no eager video requests`);
  assert.equal(await page.$$eval('.lesson-panel:not([hidden])',els=>els.length),1);
  await page.$eval('#lesson-1 video',async v=>{v.muted=true;await v.play();});
  await page.waitForFunction(()=>document.querySelector('#lesson-1 video').currentTime>0);
  // Click each chapter with the pointer; verify both document position and player geometry.
  for(let i=2;i<=lessons.length;i++){
   await page.evaluate(()=>scrollTo(0,80));
   const before=await page.evaluate(()=>({scroll:scrollY,top:document.querySelector('.lesson-stage').getBoundingClientRect().top}));
   await page.click(`[data-lesson-link="${i}"]`);
   const after=await page.evaluate(()=>({scroll:scrollY,top:document.querySelector('.lesson-stage').getBoundingClientRect().top}));
   assert.deepEqual(after,before,`${topic}: selection must not move page`);
   assert.equal(await page.$eval(`#lesson-${i}`,p=>p.hidden),false);
   assert.equal(await page.$eval(`#lesson-${i-1} video`,v=>v.paused),true);
   assert.equal(await page.$eval(`#lesson-${i} video`,v=>v.paused),true);
   assert.equal(await page.$eval(`[data-lesson-link="${i}"]`,l=>l.getAttribute('aria-current')),'step');
   await page.$eval(`#lesson-${i} video`,async v=>{v.muted=true;await v.play();});
   await page.waitForFunction(n=>document.querySelector(`#lesson-${n} video`).currentTime>0,{},i);
  }
  await page.$eval(`#lesson-${lessons.length} video`,v=>v.playbackRate=16);
  await page.waitForFunction(()=>document.querySelector('.lesson-status').textContent.includes('finished.'),{timeout:15000});
  await page.goBack();
  await page.waitForFunction(n=>!document.querySelector(`#lesson-${n}`).hidden,{},lessons.length-1);
  await page.goto(url+'?lesson='+lessons.length);
  assert.equal(await page.$eval(`#lesson-${lessons.length}`,p=>p.hidden),false);
  await page.screenshot({path:`${output}/${topic}-desktop.png`});
  // Explanations stay open across selections without changing their allocated height.
  await page.$eval('.lesson-explanation',d=>d.open=true);
  const height=await page.$eval('.lesson-explanation',d=>d.getBoundingClientRect().height);
  await page.$eval('[data-lesson-link="1"]',l=>l.click());
  assert.equal(await page.$eval('.lesson-explanation',d=>d.getBoundingClientRect().height),height);
  for(const width of [390,350]){
   await page.setViewport({width,height:844});
   await page.goto(url+'#lesson-1',{waitUntil:'networkidle0'});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${topic}: ${width}px overflow`);
   assert.equal(await page.evaluate(()=>scrollY),0,'Legacy hash must not hide the selector');
   const y=await page.evaluate(()=>scrollY);
   await page.select('.lesson-picker select','2');
   assert.equal(await page.evaluate(()=>scrollY),y,`${topic}: mobile selection scroll`);
   assert.equal(await page.$eval('#lesson-2',p=>p.hidden),false);
   await page.screenshot({path:`${output}/${topic}-phone-${width}.png`});
  }
  await page.setJavaScriptEnabled(false);await page.goto(url);
  assert.equal(await page.$$eval('.lesson-panel',els=>els.filter(p=>getComputedStyle(p).display!=='none').length),lessons.length);
  assert.deepEqual(errors,[]);
  results.push({topic,lessons:lessons.length,passed:true});
  console.log('Passed',topic);
  await page.close();
 }
 fs.writeFileSync(process.env.SEQUENCE_REPORT || 'reviews/sequence-browser-checks.json',JSON.stringify({base,checks:['no eager MP4 requests','actual playback of every lesson','real ended event for final lesson of each topic','every desktop selection preserves scroll and player position','previous video paused','new lesson awaits play','selected state','browser Back','query deep links','stable open explanations','350px and 390px layouts and selection','all lessons accessible without JavaScript'],results},null,2)+'\n');
} finally {await browser.close();}

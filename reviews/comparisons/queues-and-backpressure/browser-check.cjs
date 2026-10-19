const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('puppeteer-core');
(async()=>{
 const dir=__dirname; const out=path.join(dir,'scratch/browser');fs.mkdirSync(out,{recursive:true});
 const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
 const results=[];
 try {
 for(const width of [350,1280]){
  const page=await browser.newPage();await page.setViewport({width,height:1000,deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  for(const kind of ['chapter','compare']){
   await page.goto(`http://127.0.0.1:8797/concepts/queues-and-backpressure/${kind==='compare'?'compare/':''}`,{waitUntil:'networkidle0'});
   await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heading:document.querySelector('h1').innerText,sources:[...document.querySelectorAll('video source')].map(s=>s.src),text:document.body.innerText}));
   assert(state.scrollWidth<=width,`Overflow ${kind} ${width}`);
   assert.equal(state.sources.length,kind==='chapter'?1:3);
   if(kind==='chapter')assert(state.sources[0].includes('/astra.mp4'));
   await page.screenshot({path:path.join(out,`${width}-${kind}-top.png`)});
   await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
   const media=[];
   const videos=await page.$$('video');
   for(let i=0;i<videos.length;i++){
    const v=videos[i];
    media.push(await v.evaluate(async video=>{
     video.muted=true;video.load();
     await new Promise((resolve,reject)=>{if(video.readyState>=1)return resolve();video.addEventListener('loadedmetadata',resolve,{once:true});video.addEventListener('error',()=>reject(Error('video load')),{once:true});});
     await video.play();await new Promise(r=>setTimeout(r,300));video.pause();
     return {src:video.currentSrc,duration:video.duration,width:video.videoWidth,height:video.videoHeight,advanced:video.currentTime>0,muted:video.muted};
    }));
    assert(media[i].advanced);assert.equal(media[i].width,1080);assert.equal(media[i].height,1920);
    await v.evaluate(v=>v.scrollIntoView({block:'start'}));
    await page.screenshot({path:path.join(out,`${width}-${kind}-video-${i}.png`)});
   }
   if(kind==='compare'){
    const text=await page.evaluate(()=>document.body.innerText);
    assert(text.includes('Production: gpt-6.1-sol.'));
    assert(text.includes('Revision: gpt-6-astra comparative review.'));
    assert(!text.includes('independent comparative editorial review has not been performed'));
    for(const [i,cut] of (await page.$$('.cut')).entries()){
     await cut.evaluate(c=>c.querySelector('.transcript').scrollIntoView({block:'start'}));
     await page.screenshot({path:path.join(out,`${width}-compare-transcript-${i}.png`)});
    }
   }
   results.push({kind,width,scrollWidth:state.scrollWidth,media,errors:[...errors]});
   assert.equal(errors.length,0);
  }
  await page.close();
 }
 fs.writeFileSync(path.join(dir,'browser-verification.json'),JSON.stringify({method:'Topic-only generated chapter and comparison using the repository build functions, isolated output; related chapter titles are placeholders and their destinations were not tested.',audioHeard:false,results},null,2)+'\n');
 console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});

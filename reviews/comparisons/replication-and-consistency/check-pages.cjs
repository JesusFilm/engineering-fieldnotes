const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const puppeteer=require('../../../node_modules/puppeteer-core');
(async()=>{
 const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const results=[];
 for(const width of [350,1280]){
  const page=await browser.newPage();await page.setViewport({width,height:950,deviceScaleFactor:1});
  for(const part of ['','compare/']){
   await page.goto(pathToFileURL(path.join(__dirname,'scratch/site/concepts/replication-and-consistency',part,'index.html')).href);await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,videos:[...document.querySelectorAll('video')].map(v=>({src:v.querySelector('source').src,preload:v.preload,autoplay:v.autoplay,controls:v.controls})),transcriptBeats:[...document.querySelectorAll('.transcript')].map(e=>e.querySelectorAll('li').length)}));
   if(state.documentWidth>width||state.videos.some(v=>v.autoplay||v.preload!=='none'||!v.controls))throw Error(JSON.stringify(state));
   if(state.videos.length!==(part?3:1))throw Error('Wrong cut count');
   if(!part&&!state.videos[0].src.includes('/astra.mp4'))throw Error('Recommendation not applied');
   if(part&&JSON.stringify(state.transcriptBeats)!=='[3,5,6]')throw Error('Missing sequence');
   await page.screenshot({path:path.join(__dirname,'scratch',`${part?'comparison':'chapter'}-${width}.png`),fullPage:false});
   if(part){
    await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
    const text=await page.evaluate(()=>document.body.innerText);
    if(!text.includes('gpt-6.1-sol')||!text.includes('gpt-6-astra comparative review'))throw Error('Provenance missing');
    await page.screenshot({path:path.join(__dirname,'scratch',`comparison-open-${width}.png`),fullPage:false});
   }
   if(part){await page.$eval('.cut:last-child .transcript',e=>e.scrollIntoView());await page.screenshot({path:path.join(__dirname,'scratch',`sol-sequence-${width}.png`)});}else{await page.$eval('.exercise',e=>e.scrollIntoView());await page.screenshot({path:path.join(__dirname,'scratch',`exercise-${width}.png`)});}
   results.push({page:part||'chapter',...state});
  }
  await page.close();
 }
 await browser.close();fs.writeFileSync(path.join(__dirname,'page-checks.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exitCode=1});

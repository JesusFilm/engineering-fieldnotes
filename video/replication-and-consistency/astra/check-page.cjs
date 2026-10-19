const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const puppeteer=require('./engine/node_modules/puppeteer-core');
(async()=>{
 const chrome=[process.env.CHROME_PATH,'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/chromium'].filter(Boolean).find(fs.existsSync);
 const browser=await puppeteer.launch({executablePath:chrome,headless:true});
 const results=[];
 for(const width of [390,1280]){
  const page=await browser.newPage();await page.setViewport({width,height:900,deviceScaleFactor:1});
  for(const part of ['','compare/']){
   const url=pathToFileURL(path.join(__dirname,'scratch/site/concepts/replication-and-consistency',part,'index.html')).href;
   await page.goto(url);await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,videos:[...document.querySelectorAll('video')].map(v=>({preload:v.preload,autoplay:v.autoplay,controls:v.controls})),transcriptBeats:document.querySelectorAll('.transcript li').length,bodyFont:getComputedStyle(document.querySelector('.prose p')||document.querySelector('.cut > p:not(.eyebrow)')).fontSize}));
   if(state.documentWidth>width||state.videos.some(v=>v.autoplay||v.preload!=='none')||state.transcriptBeats!==5)throw Error(JSON.stringify(state));
   await page.screenshot({path:path.join(__dirname,'evidence',`${part?'comparison':'chapter'}-${width}.png`)});
   if(!part){
     await page.$eval('.exercise',el=>el.scrollIntoView());
     await page.screenshot({path:path.join(__dirname,'evidence',`exercise-${width}.png`)});
   }else{
     await page.locator('.transcript summary').click();
     await page.$eval('.transcript',el=>el.scrollIntoView());
     await page.screenshot({path:path.join(__dirname,'evidence',`transcript-${width}.png`)});
   }
   results.push({page:part||'chapter',...state});
  }
  await page.close();
 }
 await browser.close();fs.writeFileSync(path.join(__dirname,'evidence/page-checks.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exitCode=1});

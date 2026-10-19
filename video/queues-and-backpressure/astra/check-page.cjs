const puppeteer=require('puppeteer-core'),fs=require('fs'),path=require('path');
(async()=>{
 const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-gpu']});
 const page=await browser.newPage(),base='http://127.0.0.1:8789/concepts/queues-and-backpressure/';
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
 for(const width of [350,1280]){
  await page.setViewport({width,height:1000,deviceScaleFactor:1});
  for(const suffix of ['', 'compare/']){
   await page.goto(base+suffix,{waitUntil:'networkidle0'});
   const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,bodyFont:getComputedStyle(document.querySelector('.prose p')||document.querySelector('.deck')).fontSize,videos:document.querySelectorAll('video').length}));
   if(metrics.scrollWidth>width)throw Error('Horizontal overflow');
   const name=(suffix?'comparison':'chapter')+'-'+width;
   await page.screenshot({path:path.join(__dirname,'evidence/'+name+'.png')});
   if(!suffix){await page.$eval('#exercise',e=>e.scrollIntoView());await page.screenshot({path:path.join(__dirname,'evidence/exercise-'+width+'.png')});}
   else {
    const astra=await page.$('video source[src*="astra.mp4"]');if(!astra)throw Error('Astra absent');
    await page.$eval('video source[src*="astra.mp4"]',e=>e.closest('section').scrollIntoView());
    await page.screenshot({path:path.join(__dirname,'evidence/astra-page-'+width+'.png')});
    await page.evaluate(async()=>{const s=document.querySelector('video source[src*="astra.mp4"]');const v=s.parentElement;v.muted=true;v.load();await new Promise((res,rej)=>{v.onloadedmetadata=res;v.onerror=rej;});if(v.videoWidth!==1080||v.videoHeight!==1920||v.duration!==30)throw Error('Incorrect Astra metadata');await v.play();v.pause();});
   }
   results.push({page:suffix?'comparison':'chapter',...metrics});
  }
 }
 if(errors.length)throw Error(JSON.stringify(errors));
 fs.writeFileSync(path.join(__dirname,'evidence/browser-checks.json'),JSON.stringify({date:'2026-10-19',isolatedBuild:true,sharedUIEdited:false,results,errors,mutedAstraPlayback:true,physicalListening:false},null,2));
 await browser.close();console.log(results);
})().catch(e=>{console.error(e);process.exit(1)});

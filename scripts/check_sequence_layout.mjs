// Preflight authored text using the same browser fonts and weights as the renderer.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage();
const failures=[];let measured=0;
try {
 for(const topic of JSON.parse(fs.readFileSync('content/order.json'))){
  if(topic==='load-balancing')continue;
  const data=JSON.parse(fs.readFileSync(`video/${topic}/sequence/storyboard.json`));
  for(const l of data.lessons){
   const maxFor=id=>l.nodes.length===4&&[1,2].includes(l.nodes.findIndex(n=>n.id===id))?370:610;
   const texts=[{text:l.title,size:66,weight:800,max:920},...l.nodes.flatMap(n=>[{text:n.label,size:42,weight:600,max:maxFor(n.id)},{text:n.state||'',size:40,weight:500,max:maxFor(n.id)}]),...l.beats.flatMap(b=>b.lines.map(text=>({text,size:48,weight:500,max:980}))),...l.beats.flatMap(b=>(b.actions||[]).filter(a=>a.type==='state').map(a=>({text:a.text,size:40,weight:500,max:maxFor(a.node)})))];
   for(const t of texts){
    measured++;
    const width=await page.evaluate(t=>{const c=document.createElement('canvas').getContext('2d');c.font=`${t.weight} ${t.size}px "SF Pro Display","Inter","Helvetica Neue",Arial,sans-serif`;return c.measureText(t.text).width;},t);
    if(width>t.max)failures.push({topic,lesson:l.title,...t,width:Math.round(width)});
   }
  }
 }
 fs.writeFileSync('reviews/sequence-text-measurements.json',JSON.stringify({measured,failures,scope:'Text bounds only; encoded frame review is separate'},null,2)+'\n');
 console.log(JSON.stringify({measured,failures},null,2));assert.equal(failures.length,0);
} finally {await browser.close();}

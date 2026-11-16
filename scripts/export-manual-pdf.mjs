// Run with Node 22+; Chrome must be installed. Uses only Node built-ins.
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
const root=process.cwd(), work=path.join(root,'tmp/pdfs'), out=path.join(root,'output/pdf');
await fs.mkdir(work,{recursive:true}); await fs.mkdir(out,{recursive:true});
// Use the same Kramdown GFM parser as Jekyll, directly from the existing bundle.
const gems=path.join(root,'vendor/bundle/ruby/3.4.0/gems');
const render=spawnSync('/usr/bin/ruby',['--disable-gems','-I',path.join(gems,'kramdown-2.4.0/lib'),'-I',path.join(gems,'kramdown-parser-gfm-1.1.0/lib'),'-e',`require 'kramdown'; require 'kramdown-parser-gfm'; print Kramdown::Document.new(File.read(ARGV[0]), input: 'GFM', hard_wrap: false).to_html`,path.join(root,'_includes/content/usermanual.md')],{encoding:'utf8'});
if(render.status!==0) throw new Error(render.stderr);
const article=render.stdout;
const css=await Promise.all(['base','concept-three','concept-five'].map(n=>fs.readFile(path.join(root,`assets/css/${n}.css`),'utf8')));
const print=await fs.readFile(path.join(root,'scripts/manual-pdf.css'),'utf8');
const js=await fs.readFile(path.join(root,'assets/js/manual-structured.js'),'utf8');
const pagination=await fs.readFile(path.join(root,'scripts/manual-pdf-pagination.js'),'utf8');
const logo=await fs.readFile(path.join(root,'assets/images/reflex-logo-white.webp'));
let html=`<!doctype html><html><head><meta charset="utf-8"><title>Reflex Standard user manual</title><style>${css.join('\n')}\n${print}</style></head><body class="concept-three concept-four concept-five concept-six guide-page-five source-guide-page structured-guide-page"><article class="guide-article source-guide source-guide--manual source-guide--structured">${article}</article><script>window.manualPdfLogo="data:image/webp;base64,${logo.toString('base64')}";\n${js}\n${pagination}</script></body></html>`;
html=html.replace(/src="\/([^\"]+)"/g,(_,p)=>`src="file://${root}/${p}"`).replace(/href="\/(?!\/)([^\"]*)"/g,(_,p)=>`href="https://reflexcameras.co.uk/${p}"`);
await fs.writeFile(path.join(work,'manual.html'),html);
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--no-sandbox','--disable-gpu','--allow-file-access-from-files','--remote-debugging-pipe',`--user-data-dir=${work}/chrome-profile`],{stdio:['ignore','ignore','pipe','pipe','pipe']});
let id=0, buffer='', pending=new Map();
const deadline=setTimeout(()=>{console.error('Export timed out after 120 seconds');chrome.kill('SIGKILL');process.exitCode=1;},120000);
chrome.on('error',error=>{for(const p of pending.values())p.reject(error);});
chrome.on('exit',()=>{for(const p of pending.values())p.reject(new Error('Chrome exited before completing export'));pending.clear();});
chrome.stdio[4].on('data',chunk=>{buffer+=chunk; let at; while((at=buffer.indexOf('\0'))>=0){const msg=JSON.parse(buffer.slice(0,at));buffer=buffer.slice(at+1);if(msg.id){const p=pending.get(msg.id);pending.delete(msg.id);msg.error?p.reject(msg.error):p.resolve(msg.result);}}});
function cdp(method,params={},sessionId){return new Promise((resolve,reject)=>{const n=++id; pending.set(n,{resolve,reject});chrome.stdio[3].write(JSON.stringify({id:n,method,params,...(sessionId?{sessionId}:{})})+'\0');});}
try {
 const {targetId}=await cdp('Target.createTarget',{url:'about:blank'});
 const {sessionId}=await cdp('Target.attachToTarget',{targetId,flatten:true});
 const call=(method,params)=>cdp(method,params,sessionId);
 await call('Emulation.setDeviceMetricsOverride',{width:Math.ceil(182*96/25.4),height:1200,deviceScaleFactor:1,mobile:false});
 await call('Emulation.setEmulatedMedia',{media:'print'});
 await call('Page.enable'); await call('Page.navigate',{url:`file://${work}/manual.html`});
 await new Promise(r=>setTimeout(r,800));
 const result=await call('Runtime.evaluate',{expression:`(async()=>{ await document.fonts.ready; await Promise.all([...document.images].map(i=>i.decode())); document.querySelectorAll('details').forEach(d=>d.open=true); const f=document.querySelector('form'); f.querySelector('.battery-runtime-calculator__controls').style.display='none'; f.querySelector('output').remove(); const p=document.createElement('p'); p.innerHTML='<strong>PDF runtime calculation</strong><br>Estimated nights = battery capacity (Ah) × 12 ÷ (2.55 × 9).<br>Example: a 50 Ah battery gives approximately 26.14 nights at 30 FPS.<br><a href="https://reflexcameras.co.uk/guides/user-manual/#how-long-will-the-camera-last-running-on-different-batteries">Use the online runtime calculator</a>.'; f.querySelector('.battery-runtime-calculator__body').prepend(p); return {text:document.querySelector('article').innerText,images:[...document.images].map(i=>({src:i.src,loaded:i.complete&&i.naturalWidth>0})),structured:document.querySelector('article').dataset.structured}; })()`,awaitPromise:true,returnByValue:true});
 if(result.exceptionDetails) throw result.exceptionDetails;
 await fs.writeFile(path.join(work,'content-audit.json'),JSON.stringify(result.result.value,null,2));
 const paged=await call('Runtime.evaluate',{expression:'paginateManual()',awaitPromise:true,returnByValue:true});
 if(paged.exceptionDetails)throw new Error(JSON.stringify(paged.exceptionDetails));
 await fs.writeFile(path.join(work,'pagination-audit.json'),JSON.stringify(paged.result.value,null,2));
 // Export-only HTML previews are saved for reviewing every measured page.
 const rects=await call('Runtime.evaluate',{expression:'[...document.querySelectorAll(".pdf-page")].map(p=>{const r=p.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})',returnByValue:true});
 await fs.mkdir(path.join(work,'page-previews'),{recursive:true});
 for(let i=0;i<rects.result.value.length;i++){
   const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:rects.result.value[i]});
   await fs.writeFile(path.join(work,'page-previews',`page-${String(i+1).padStart(2,'0')}.png`),Buffer.from(shot.data,'base64'));
 }
 const pdf=await call('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-family:Arial;font-size:8px;color:#526061;width:100%;padding:0 14mm;display:flex;justify-content:space-between"><span>REFLEX STANDARD / reflexcameras.co.uk</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'});
 await fs.writeFile(path.join(out,'reflex-user-manual.pdf'),Buffer.from(pdf.data,'base64'));
 console.log(JSON.stringify({output:path.join(out,'reflex-user-manual.pdf'),pagination:paged.result.value,...result.result.value,text:undefined},null,2));
} finally {clearTimeout(deadline);chrome.kill();setTimeout(()=>chrome.kill('SIGKILL'),1000).unref();}

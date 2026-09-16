import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import('playwright').catch(() => import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href));
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.QA_URL || 'http://127.0.0.1:4173';
const out='artifacts/qa'; fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:process.env.QA_BROWSER_CHANNEL || (process.platform==='win32' ? 'msedge' : undefined),headless:true});
const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
const page=await context.newPage(); const errors=[]; const results=[];
page.on('pageerror',error=>errors.push(error.message));
// Tests never send a message to the live form service.
await context.route('**/formsubmit.co/**', route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:'true',message:'Submitted'})}));
const routes=['/','/destinations','/diego','/nosy','/services','/about','/contact'];
for (const theme of ['light','dark']) {
 for (const width of [320,360,390,768,1024,1366,1440,1920,2560]) {
  await page.setViewportSize({width,height:width<768?844:1000});
  for (const route of routes) {
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   await page.evaluate(theme=>{localStorage.setItem('theme',theme);document.documentElement.classList.toggle('dark',theme==='dark')},theme);
   await page.locator('h1').waitFor();
   const state=await page.evaluate(()=>{
    const w=document.documentElement.clientWidth;
    const overflow=[...document.querySelectorAll('main *,header *,footer *')].filter(el=>{
     const r=el.getBoundingClientRect();const s=getComputedStyle(el);
     return r.width>0 && r.height>0 && (r.right>w+2||r.left<-2) && s.position!=='absolute' && s.position!=='fixed' && !el.closest('.hero-images');
    }).slice(0,6).map(el=>({tag:el.tagName,text:(el.innerText||'').slice(0,55),class:el.className}));
    return {width:w,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,overflow,encodingErrors: /Ã.|Â.|â€/.test(document.body.innerText), rawKeys:document.body.innerText.match(/\b(?:ui|home|about|services|contact|nosy|diego|journey|faq)\.[a-z_]+(?:\.[a-z_]+)*/g)||[]};
   });
   results.push({route,theme,width,...state});
   if(state.scrollWidth>width+2||state.h1!==1||state.rawKeys.length)console.log('ISSUE',JSON.stringify(results.at(-1)));
   if([390,1440].includes(width)) {
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}window.scrollTo(0,0)});
    await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.loading==='lazy').map(i=>i.decode().catch(()=>{}))));
    await page.screenshot({path:`${out}/${route==='/'?'home':route.slice(1)}-${theme}-${width}.png`,fullPage:true});
   }
  }
 }
 console.log(`Completed ${theme}: ${results.length} page/viewport checks`);
}
fs.writeFileSync(`${out}/responsive-report.json`,JSON.stringify({checks:results.length,results,errors},null,2));
// Native language selector, theme persistence and responsive menu.
await page.setViewportSize({width:1440,height:1000});await page.goto(base);
for(const lang of ['en','de','it','es','fr']){
 await page.locator('.desktop-language select').selectOption(lang);
 await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
 await page.waitForTimeout(150);
 assert(!(await page.locator('body').innerText()).includes('ui.plan'));
}
await page.locator('.nav-actions .icon-button').first().click();
const selectedTheme=await page.evaluate(()=>localStorage.getItem('theme'));await page.reload();
assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),selectedTheme==='dark');
await page.setViewportSize({width:390,height:844});
await page.locator('.menu-toggle').click();assert(await page.getByRole('dialog').isVisible());
for(let i=0;i<16;i++)await page.keyboard.press('Tab');
assert(await page.evaluate(()=>!!document.activeElement.closest('[role=dialog]')));
await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);
assert(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement));
// Place selection, category switching, gallery, re-selecting a thumbnail.
for(const route of ['/diego','/nosy']){
 await page.goto(base+route);await page.locator('.place-card').first().click();
 assert(await page.locator('#place-details-inline').isVisible());
 const tab=page.locator('#place-details-inline button[aria-pressed]');await tab.nth(2).click();
 const thumbnail=page.locator('#place-details-inline .aspect-\\[4\\/3\\]').first();
 if(await thumbnail.count()){await thumbnail.click();await thumbnail.click();}
 await page.locator('.destination-filters button').nth(1).click();assert.equal(await page.locator('#place-details-inline').count(),0);
}
// Contact: preselection, browser validation, success and rejected activation response.
await page.goto(base+'/contact?destination=nosy');assert.equal(await page.locator('#contact-destination').inputValue(),'nosy');
await page.locator('form button[type=submit]').click();assert.equal(await page.getByRole('dialog').count(),0);
const fill=async()=>{await page.locator('#contact-name').fill('QA Preview');await page.locator('#contact-email').fill('preview@example.com');await page.locator('#contact-message').fill('Automated local test. No message is transmitted.');};
await fill();await page.locator('form button[type=submit]').click();await page.getByRole('dialog').waitFor();assert.equal(await page.locator('#contact-name').inputValue(),'');await page.keyboard.press('Escape');
await context.unroute('**/formsubmit.co/**');await context.route('**/formsubmit.co/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:'false',message:'Activation required'})}));
await fill();await page.locator('form button[type=submit]').click();await page.getByRole('dialog').waitFor();assert.equal(await page.locator('#contact-name').inputValue(),'QA Preview');await page.keyboard.press('Escape');
for(const route of ['/privacy','/terms','/missing-page']){await page.goto(base+route);await page.locator('h1').waitFor();assert.equal(await page.locator('h1').count(),1);}
// Android-like touch context, high pixel density, portrait and landscape.
const mobileContext=await browser.newContext({viewport:{width:393,height:851},isMobile:true,hasTouch:true,deviceScaleFactor:2.75,reducedMotion:'reduce'});
const mobilePage=await mobileContext.newPage();
mobilePage.on('pageerror',error=>errors.push(error.message));
for(const viewport of [{width:393,height:851},{width:851,height:393}]){
 await mobilePage.setViewportSize(viewport);await mobilePage.goto(base);await mobilePage.locator('h1').waitFor();
 assert(await mobilePage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await mobilePage.locator('.menu-toggle').tap();await mobilePage.locator('.mobile-drawer a[href="/contact"]').last().tap();
 await mobilePage.locator('#contact-name').waitFor();
 assert(await mobilePage.locator('#contact-name').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16));
}
await mobileContext.close();
fs.writeFileSync(`${out}/report.json`,JSON.stringify({checks:results.length,results,errors,interactionTests:'passed'},null,2));
await browser.close();
assert.equal(errors.length,0,JSON.stringify(errors));
assert(results.every(r=>r.scrollWidth<=r.width+2&&r.h1===1&&r.rawKeys.length===0&&!r.encodingErrors),'Responsive checks failed');
console.log('PASS',results.length,'responsive checks; navigation, language, themes, galleries and form states.');

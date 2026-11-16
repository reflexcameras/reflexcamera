// Runs inside the export-only browser page; never changes the website.
async function paginateManual() {
  const article=document.querySelector('article');
  const logo=new Image();logo.src=window.manualPdfLogo;logo.alt='Reflex Cameras';await logo.decode();
  const normal=s=>s.replace(/\s+/g,' ').trim();
  const fingerprint=element=>{const walk=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const words=[];let n;while((n=walk.nextNode())){const value=normal(n.textContent);if(value)words.push(value);}return words.join(' ');};
  const sourceText=fingerprint(article);
  const sourceImages=[...article.querySelectorAll('img')].map(i=>i.src);
  const width=182*96/25.4, height=264*96/25.4;
  const stage=document.createElement('div');
  stage.className=article.className+' pdf-measure'; stage.style.width=`${width}px`;
  document.body.append(stage);
  function extent(page) {
    const r=page.getBoundingClientRect();
    const nodes=[...page.querySelectorAll('*')].filter(n=>n.getClientRects().length);
    return {height:Math.max(r.height,...nodes.map(n=>n.getBoundingClientRect().bottom-r.top)),width:Math.max(r.width,...nodes.map(n=>n.getBoundingClientRect().right-r.left))};
  }
  function measure(page) {
    stage.replaceChildren(page);
    return extent(page).height;
  }
  function fitsPage(node) {
    const probe=document.createElement('div');probe.className='pdf-page';probe.style.width=`${width}px`;
    probe.append(node);stage.replaceChildren(probe);
    const bounds=extent(probe);
    return bounds.height<=height&&bounds.width<=width+0.5;
  }
  // Freeze generated numbers before list/chapter fragments are cloned.
  article.querySelectorAll('.structured-chapter').forEach((n,i)=>n.querySelector('h2').dataset.pdfNumber=String(i+1).padStart(2,'0'));
  article.querySelectorAll('.structured-numbered-list').forEach(list=>[...list.children].forEach((n,i)=>n.dataset.pdfNumber=String(i+1).padStart(2,'0')));
  const repeatClass='pdf-repeated-heading';
  let fragmentCount=0;
  function split(node,fits,depth=0) {
    if(depth>15) throw new Error('Pagination nesting exceeded');
    const full=node.cloneNode(true);
    if(fits(full)) return [full];
    const children=[...node.childNodes].filter(n=>n.nodeType!==3||n.textContent.trim());
    if(!children.length||node.matches?.('p,img,table,.structured-photo-grid')) {
      throw new Error(`Unbreakable content exceeds page: ${node.tagName} ${node.textContent.slice(0,100)}`);
    }
    const shell=()=>node.cloneNode(false);
    const first=children[0];
    const heading=first.nodeType===1&&first.matches('h1,h2,h3,h4,h5,summary')?first:null;
    const remaining=heading?children.slice(1):children;
    const makeShell=continued=>{
      const n=shell();
      if(continued){n.removeAttribute('id');n.dataset.pdfContinuation='true';}
      if(heading){const h=heading.cloneNode(true);if(continued){h.removeAttribute('id');h.classList.add(repeatClass);h.append(' (continued)');}n.append(h);}
      return n;
    };
    const result=[]; let current=makeShell(false); let contentCount=0;
    const flush=()=>{
      if(!contentCount) return;
      result.push(current); fragmentCount++;
      current=makeShell(true);
      contentCount=0;
    };
    for(const child of remaining) {
      const candidate=child.cloneNode(true);current.append(candidate);
      if(fits(current.cloneNode(true))){contentCount++;continue;}
      candidate.remove();
      if(contentCount) flush();
      current.append(candidate);
      if(fits(current.cloneNode(true))){contentCount++;continue;}
      candidate.remove();
      // Fit the complete ancestor tree, including all margins and padding.
      // Both first and continuation shells must fit: a continuation heading
      // can wrap onto an extra line and consume more space than the first.
      const firstShell=current.cloneNode(true),continuedShell=makeShell(true);
      const pieces=split(child,piece=>[firstShell,continuedShell].every(base=>{
        const probe=base.cloneNode(true);probe.append(piece.cloneNode(true));return fits(probe);
      }),depth+1);
      for(const piece of pieces){
        current.append(piece);contentCount++;
        if(!fits(current.cloneNode(true))) throw new Error(`Nested pagination overflow: ${node.className}`);
        flush();
      }
    }
    flush();
    if(!result.length)throw new Error('Empty pagination result');
    if(result.some(part=>!fits(part.cloneNode(true))))throw new Error(`Fragment does not fit: ${node.className}`);
    return result;
  }
  const pages=[];
  const page=()=>{const n=document.createElement('div');n.className='pdf-page';n.style.width=`${width}px`;pages.push(n);return n;};
  let current=page();
  const units=[...article.children];
  for(let index=0;index<units.length;index++) {
    let unit=units[index];
    if(unit.matches('.structured-part-heading')&&units[index+1]?.matches('.structured-chapter')){
      const opening=document.createElement('section');opening.className='pdf-full-opening';
      opening.append(unit,units[++index]);unit=opening;
    }
    const parts=split(unit,fitsPage);
    for(const part of parts){
      const force=part.matches('.structured-chapter,.structured-faqs,.pdf-full-opening')&&!part.dataset.pdfContinuation;
      if(force&&current.children.length)current=page();
      current.append(part);
      if(measure(current)>height){part.remove();current=page();current.append(part);}
      if(measure(current)>height+0.5){const style=getComputedStyle(part);throw new Error(`Page overflow: ${JSON.stringify({text:part.textContent.slice(0,100),pageHeight:measure(current),limit:height,partHeight:part.getBoundingClientRect().height,marginTop:style.marginTop,marginBottom:style.marginBottom})}`);}
    }
  }
  stage.remove(); article.replaceChildren(...pages);
  const copy=article.cloneNode(true);copy.querySelectorAll(`.${repeatClass}`).forEach(n=>n.remove());
  // Text order must remain identical, apart from explicitly repeated headings.
  if(fingerprint(copy)!==sourceText)throw new Error('Text integrity check failed');
  const exportedImages=[...article.querySelectorAll('img')].map(i=>i.src);
  if(JSON.stringify(exportedImages)!==JSON.stringify(sourceImages))throw new Error('Image integrity check failed');
  const cleanHeading=n=>normal(n?.textContent??'').replace(/\s*\(continued\)$/i,'');
  let lastLocation='Quick guide';
  const locations=pages.map(p=>{
    const chapter=p.querySelector('.structured-chapter > h2');
    const subsection=p.querySelector('.structured-chapter .structured-subsection > h3');
    let location=lastLocation;
    if(p.querySelector('.structured-quick-guide'))location='Quick guide';
    else if(chapter)location=`${chapter.dataset.pdfNumber} / ${cleanHeading(chapter)}${subsection?' / '+cleanHeading(subsection):''}`;
    else if(p.querySelector('.structured-faqs'))location='Product FAQs';
    lastLocation=location;
    const header=document.createElement('header');header.className='pdf-running-header';header.dataset.pdfChrome='true';
    header.append(logo.cloneNode(true));
    const context=document.createElement('div');context.className='pdf-running-header__context';
    const label=document.createElement('span');label.className='pdf-running-header__label';label.textContent='REFLEX STANDARD / USER MANUAL';
    const section=document.createElement('span');section.className='pdf-running-header__location';section.textContent=location;
    context.append(label,section);header.append(context);p.prepend(header);return location;
  });
  await Promise.all([...article.querySelectorAll('[data-pdf-chrome] img')].map(i=>i.decode()));
  const pageAudit=pages.map((p,i)=>{const bounds=extent(p);return {page:i+1,location:locations[i],headerReserveMm:20,height:bounds.height,width:bounds.width,maxHeight:height,maxWidth:width,images:p.querySelectorAll('img:not([data-pdf-chrome] img)').length,textLength:p.innerText.length};});
  if(pageAudit.some(p=>p.height>height+0.5||p.width>width+0.5))throw new Error('Final page bounds exceeded');
  return {pageCount:pages.length,fragmentCount,sourceImageCount:sourceImages.length,textIntegrity:true,imageIntegrity:true,pages:pageAudit};
}

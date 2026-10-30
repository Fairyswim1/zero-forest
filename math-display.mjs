import katex from './vendor/katex/katex.mjs';
export const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function toLatex(raw){
 let s=raw.replace(/(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g,(_,a,b)=>'\\frac{'+a+'}{'+b+'}');
 s=s.replace(/([A-Za-z]+)\/([A-Za-z]+)/g,'\\frac{$1}{$2}');
 const symbols={'□':'\\square ','α':'\\alpha ','β':'\\beta ','γ':'\\gamma ','∠':'\\angle ','△':'\\triangle ','⊥':'\\perp ','∥':'\\parallel ','≡':'\\equiv ','∽':'\\sim ','−':'-','×':'\\times ','÷':'\\div ','²':'^{2}','³':'^{3}','°':'^{\\circ}','≤':'\\leq ','≥':'\\geq ','≠':'\\ne ','→':'\\to ','′':"'"};
 return s.replace(/[αβγ□∠△⊥∥≡∽−×÷²³°≤≥≠→′]/g,c=>symbols[c]).replace(/\^(\d+)/g,'^{$1}');
}
export function mathSegments(text){
 const parts=[];let end=0;
 // Restrict conversion to selected display fields; never modify inputs or progress counters.
 const rx=/(?:[+−\-×÷]\s*)?(?:\(\s*)?[+−\-]?[A-Za-z0-9αβγ□∠△][A-Za-z0-9αβγ□∠△⊥∥≡∽=+−×÷²³°≤≥≠→′:^/(),.?\- \t]*|[+−\-][0-9x][A-Za-z0-9=+−×÷²³°:^/(),.?\- \t]*/g;
 for(const m of text.matchAll(rx)){
  const raw=m[0].replace(/[\s.,:]+$/,'');if(!raw)continue;
  if(m.index>end)parts.push({text:text.slice(end,m.index)});
  const words=raw.match(/[A-Za-z]+/g)||[];
  const isMath=words.every(w=>/^(?:[xyabmnO]|[A-Z]{1,3})$/.test(w));
  parts.push(isMath?{text:raw,latex:toLatex(raw)}:{text:raw});end=m.index+raw.length;
 }
 if(end<text.length)parts.push({text:text.slice(end)});return parts;
}
const cache=new Map();
function render(latex,text){try{return katex.renderToString(latex,{throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'});}catch{return escapeHtml(text);}}
export function mathHtml(text){
 if(cache.has(text))return cache.get(text);
 const html=mathSegments(String(text)).map(p=>p.latex?'<span class="math-token" data-math-source="'+escapeHtml(p.text)+'" data-latex="'+escapeHtml(p.latex)+'">'+render(p.latex,p.text)+'</span>':escapeHtml(p.text)).join('');
 if(cache.size>1000)cache.clear();cache.set(text,html);return html;
}
export function installMath(selectors){
 const skip='script,style,textarea,input,select,option,svg,.math-token,[contenteditable],[data-no-math]';
 let queued=false;
 const scan=()=>{
  queued=false;observer.disconnect();
  const walk=el=>{
   if(el.nodeType===1&&el.matches(skip))return;
   for(const child of [...el.childNodes]){
    if(child.nodeType===3&&child.textContent.trim()){
     const source=child.textContent,html=mathHtml(source);
     if(html.includes('class="math-token"')){const t=document.createElement('template');t.innerHTML=html;child.replaceWith(t.content);}
    }else if(child.nodeType===1)walk(child);
   }
  };
  try{for(const el of document.querySelectorAll(selectors))if(!el.closest(skip))walk(el);}
  finally{observer.observe(document.body,{childList:true,subtree:true,characterData:true});}
 };
 const observer=new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(scan);}});scan();return()=>observer.disconnect();
}
export function svgMath(text,x,y,width=42,height=24,align='left'){
 return '<foreignObject x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'" class="svg-math"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:'+align+'">'+mathHtml(text)+'</div></foreignObject>';
}

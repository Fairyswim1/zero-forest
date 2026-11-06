export function memoryStorage() {
  const values = new Map();
  return {getItem:k=>values.get(k)??null, setItem:(k,v)=>values.set(k,String(v)), removeItem:k=>values.delete(k)};
}
const completed = raw => {
  try { const record=typeof raw==='string'?JSON.parse(raw):raw; return ['completed','skipped'].includes(record?.status); }
  catch { return false; }
};
function browserOption(options, key, globalKey) {
  if (Object.hasOwn(options,key)) return options[key];
  try { return globalThis[globalKey]; } catch { return null; }
}
function read(storage,key) { try { return storage?.getItem(key); } catch { return null; } }
function write(storage,key,value) {
  try { storage?.setItem(key,value); return storage?.getItem(key)===value; } catch { return false; }
}
export function createTutorialContext(id, options={}) {
  const persistent=browserOption(options,'storage','localStorage');
  const session=browserOption(options,'session','sessionStorage');
  const history=browserOption(options,'history','history');
  const url=new URL(options.url||globalThis.location.href);
  const key='math-ateliers:tutorial:'+id+':v1';
  let tabRecord; try { tabRecord=history?.state?.mathAtelierTutorial?.[key]; } catch {}
  const seen=completed(read(persistent,key))||completed(read(session,key))||completed(tabRecord);
  // A shared/bookmarked ?tutorial=off must never suppress a first visit.
  const practice=url.searchParams.get('tutorial')==='on'||!seen;
  return {
    practice,
    storage:practice?memoryStorage():persistent||memoryStorage(),
    finish(status) {
      if (!['completed','skipped'].includes(status)) throw new Error('Invalid tutorial completion');
      const record={status,at:new Date().toISOString()}, raw=JSON.stringify(record);
      const saved=write(persistent,key,raw)||write(session,key,raw);
      const next=new URL(url); next.searchParams.delete('tutorial');
      try {
        const state={...(history.state||{})};
        // Last fallback stays in this history entry; it cannot travel in a shared URL.
        if (!saved) state.mathAtelierTutorial={...state.mathAtelierTutorial,[key]:record};
        history.replaceState(state,'',next.href);
      } catch {}
      return next.href;
    },
    replay() { const next=new URL(url); next.searchParams.set('tutorial','on'); return next.href; }
  };
}

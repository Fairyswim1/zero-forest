import test from 'node:test';
import assert from 'node:assert/strict';
import {createTutorialContext,memoryStorage} from '../tutorial-state.mjs';
const url='https://example.test/game/?chapter=2#board';
const fakeHistory=()=>({state:null,replaceState(s,_title,next){this.state=s;this.url=next;}});
const setup=(storage=memoryStorage(),session=memoryStorage(),history=fakeHistory())=>({storage,session,history,url});
test('first visit always starts, including an old shared off URL',()=>{
 for(const suffix of ['', '?tutorial=off','?tutorial=on','?tutorial=off&tutorial=on']){
  const options=setup();options.url='https://example.test/'+suffix;
  const ctx=createTutorialContext('a',options);assert.equal(ctx.practice,true);
  assert.equal(options.storage.getItem('progress'),null);
 }
});
test('opening, abandoning, and refreshing do not mark the guide finished',()=>{
 const options=setup();createTutorialContext('a',options);
 assert.equal(createTutorialContext('a',options).practice,true);
});
test('completion and explicit skip persist per game, with a clean shareable URL',()=>{
 for(const status of ['completed','skipped']){
  const options=setup();options.url+='?unused';
  const ctx=createTutorialContext('a',options),next=ctx.finish(status);
  assert.equal(new URL(next).searchParams.has('tutorial'),false);
  assert.equal(createTutorialContext('a',{...options,url:next}).practice,false);
  assert.equal(createTutorialContext('b',options).practice,true);
  assert.equal(createTutorialContext('a',{...setup(),url:next}).practice,true);
 }
});
test('old valid completion is preserved; corrupt or started records do not skip',()=>{
 const options=setup();createTutorialContext('a',options).finish('completed');
 const savedKey=Object.keys(options.history.state?.mathAtelierTutorial||{})[0];
 // Capture the actual versioned key without depending on the game version.
 const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 createTutorialContext('a',setup(storage)).finish('completed');
 const key=[...values.keys()][0];
 for(const raw of ['true','garbage','{}','{"status":"started"}']){
  storage.setItem(key,raw);assert.equal(createTutorialContext('a',setup(storage)).practice,true);
 }
 storage.setItem(key,'{"status":"skipped","at":"2026-10-01"}');
 assert.equal(createTutorialContext('a',setup(storage)).practice,false);
});
test('replay and practice never overwrite campaign or assessment records',()=>{
 const options=setup();options.storage.setItem('progress','round 9');options.storage.setItem('assessment','independent');
 const ctx=createTutorialContext('a',options);ctx.storage.setItem('progress','guided win');ctx.storage.setItem('assessment','helped');
 ctx.finish('completed');const replay=createTutorialContext('a',{...options,url:ctx.replay()});
 assert.equal(replay.practice,true);assert.equal(replay.storage.getItem('progress'),null);
 assert.equal(options.storage.getItem('progress'),'round 9');assert.equal(options.storage.getItem('assessment'),'independent');
 assert.equal(new URL(replay.finish('completed')).searchParams.get('chapter'),'2');
});
test('blocked local storage uses session completion without a redirect loop',()=>{
 const denied={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};
 const options=setup(denied);const next=createTutorialContext('a',options).finish('skipped');
 assert.equal(createTutorialContext('a',{...options,url:next}).practice,false);
 assert.equal(createTutorialContext('a',{...setup(denied),url:next}).practice,true);
});
test('both storage APIs blocked: same-tab history survives reload but shared URL does not skip',()=>{
 const denied={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}},options=setup(denied,denied);
 const next=createTutorialContext('a',options).finish('skipped');
 assert.equal(createTutorialContext('a',{...options,url:next}).practice,false);
 assert.equal(createTutorialContext('a',{...setup(denied,denied),url:next}).practice,true);
 assert.equal(new URL(next).searchParams.has('tutorial'),false);
});

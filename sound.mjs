// Generated effects only; no background music. Preference belongs to this game.
export function createSound({key,storage,AudioClass,onChange=()=>{}}={}){
 let store=storage;try{store??=globalThis.localStorage;}catch{}
 let enabled=false;try{enabled=store?.getItem(key)==='on';}catch{}
 let context,master,analyser,epoch=0,lastError='',played=0;const active=new Set();
 const notify=()=>onChange({enabled,error:lastError,played,state:context?.state||'idle'});
 const save=()=>{try{store?.setItem(key,enabled?'on':'off');}catch{}};
 async function ready(){
  const C=AudioClass||globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)throw Error('unsupported');
  if(!context||context.state==='closed'){context=new C();master=context.createGain();analyser=context.createAnalyser();analyser.fftSize=256;master.connect(analyser);analyser.connect(context.destination);}
  if(context.state!=='running')await context.resume();if(context.state!=='running')throw Error('blocked');
 }
 function fail(){lastError='소리를 시작하지 못했어요. 버튼을 다시 누르거나 브라우저 음소거를 확인해 주세요.';enabled=false;save();notify();}
 function stop(){epoch++;if(master)master.gain.setValueAtTime(0,context.currentTime);for(const o of active){try{o.stop();}catch{}o.disconnect();}active.clear();}
 function setOff(){enabled=false;lastError='';stop();save();notify();}
 async function setOn(){const ticket=++epoch;try{await ready();if(ticket!==epoch)return false;enabled=true;lastError='';master.gain.setValueAtTime(1,context.currentTime);save();notify();return true;}catch{if(ticket===epoch)fail();return false;}}
 async function play(kind='select'){
  if(!enabled)return false;const ticket=epoch;try{await ready();if(!enabled||ticket!==epoch)return false;
   master.gain.setValueAtTime(1,context.currentTime);
   const notes={select:[440],success:[523,659],win:[523,659,784],error:[196,147],test:[440,660,880]}[kind]||[440];
   for(let i=0;i<notes.length;i++){const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+.01+i*.13;o.type='triangle';o.frequency.setValueAtTime(notes[i],t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.10,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+.22);o.connect(g);g.connect(master);active.add(o);o.onended=()=>{active.delete(o);o.disconnect();g.disconnect();};o.start(t);o.stop(t+.24);}played++;notify();return true;
  }catch{if(ticket===epoch)fail();return false;}
 }
 async function test(){if(!enabled&&!await setOn())return {ok:false,peak:0};const ticket=epoch;if(!await play('test'))return {ok:false,peak:0};await new Promise(r=>setTimeout(r,75));if(!enabled||ticket!==epoch)return {ok:false,peak:0};const values=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(values);const peak=Math.max(...values.map(Math.abs));return {ok:peak>0.00001,peak};}
 return {play,test,setOn,setOff,get enabled(){return enabled;},get state(){return {enabled,error:lastError,played,state:context?.state||'idle'};}};
}
export function bindSoundControls(key){
 const button=document.getElementById('sound'),testButton=document.getElementById('sound-test'),status=document.getElementById('sound-status');
 const sound=createSound({key,onChange:paint});
 function paint(s){if(s.played)status.hidden=true;button.textContent=s.enabled?'소리 끄기':'소리 켜기';button.setAttribute('aria-pressed',String(s.enabled));button.title=s.enabled?'효과음이 켜져 있어요. 누르면 꺼져요.':'효과음을 켜요. 배경음악은 없어요.';if(s.error){status.hidden=false;status.textContent=s.error;}}
 button.onclick=async()=>{status.hidden=true;if(sound.enabled)sound.setOff();else if(await sound.setOn())await sound.play('test');};
 testButton.onclick=async()=>{testButton.disabled=true;status.hidden=false;status.textContent='시험 소리를 재생하고 있어요…';const r=await sound.test();status.hidden=false;status.textContent=r.ok?'♪ 효과음 신호가 정상이에요. 안 들리면 기기 음량을 확인해 주세요.':sound.state.error||'소리가 꺼졌거나 재생 신호를 확인하지 못했어요. 다시 눌러 주세요.';status.dataset.audioSignal=r.ok?'verified':'unverified';testButton.disabled=false;};
 paint(sound.state);return sound;
}

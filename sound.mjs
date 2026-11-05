// Dreamlike effects tuned to this game's original score. Music has an independent player.
export function createSound({key,storage,AudioClass,onChange=()=>{}}={}){
 let store=storage;try{store??=globalThis.localStorage;}catch{}
 let enabled=false;try{enabled=store?.getItem(key)==='on';}catch{}
 let context,master,analyser,output,epoch=0,lastError='',played=0;const active=new Set();
 const tonic=440*2**((74-69)/12),minor=false;
 const notify=()=>onChange({enabled,error:lastError,played,state:context?.state||'idle'});
 const save=()=>{try{store?.setItem(key,enabled?'on':'off');}catch{}};
 async function ready(){
  const C=AudioClass||globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)throw Error('unsupported');
  if(!context||context.state==='closed'){context=new C();master=context.createGain();analyser=context.createAnalyser();analyser.fftSize=256;master.connect(analyser);output=context.createGain();analyser.connect(output);output.connect(context.destination);
   if(context.createConvolver){const reverb=context.createConvolver(),wet=context.createGain(),tail=context.createBuffer(2,Math.floor(context.sampleRate*1.6),context.sampleRate);let seed=7123;for(let c=0;c<2;c++){const data=tail.getChannelData(c);for(let i=0;i<data.length;i++){seed=(1664525*seed+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*Math.exp(-i/context.sampleRate*4)*.18;}}reverb.buffer=tail;wet.gain.setValueAtTime(.24,0);master.connect(reverb);reverb.connect(wet);wet.connect(analyser);}}
  if(context.state!=='running')await context.resume();if(context.state!=='running')throw Error('blocked');
 }
 function fail(){lastError='소리를 시작하지 못했어요. 버튼을 다시 누르거나 브라우저 음소거를 확인해 주세요.';enabled=false;save();notify();}
 function stop(){epoch++;if(master)master.gain.setValueAtTime(0,context.currentTime);if(output)output.gain.setValueAtTime(0,context.currentTime);for(const o of active){try{o.stop();}catch{}o.disconnect();}active.clear();}
 function setOff(){enabled=false;lastError='';stop();save();notify();}
 async function setOn(){const ticket=++epoch;try{await ready();if(ticket!==epoch)return false;enabled=true;lastError='';master.gain.setValueAtTime(1,context.currentTime);output.gain.setValueAtTime(1,context.currentTime);save();notify();return true;}catch{if(ticket===epoch)fail();return false;}}
 async function play(kind='select'){
  if(!enabled)return false;const ticket=epoch;try{await ready();if(!enabled||ticket!==epoch)return false;
   master.gain.setValueAtTime(1,context.currentTime);output.gain.setValueAtTime(1,context.currentTime);
   const third=minor?3:4;
   const intervals={select:[0],success:[0,third,7],win:[0,third,7,12],error:[2,-3],test:[0,7,12]}[kind]||[0];
   for(let i=0;i<intervals.length;i++){
    const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+.012+i*.14;
    o.type='sine';
    if(context.createPeriodicWave){const real=new Float32Array(6),imag=new Float32Array([0,1,.18,.055,.018,0]);o.setPeriodicWave(context.createPeriodicWave(real,imag));}
    o.frequency.setValueAtTime(tonic*2**(intervals[i]/12),t);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(kind==='error'?.045:.065,t+.035);g.gain.exponentialRampToValueAtTime(.0001,t+(kind==='win'?1.35:.8));
    o.connect(g);g.connect(master);active.add(o);o.onended=()=>{active.delete(o);o.disconnect();g.disconnect();};o.start(t);o.stop(t+(kind==='win'?1.4:.85));
   }played++;notify();return true;
  }catch{if(ticket===epoch)fail();return false;}
 }
 async function test(){if(!enabled&&!await setOn())return {ok:false,peak:0};const ticket=epoch;if(!await play('test'))return {ok:false,peak:0};await new Promise(r=>setTimeout(r,75));if(!enabled||ticket!==epoch)return {ok:false,peak:0};const values=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(values);const peak=Math.max(...values.map(Math.abs));return {ok:peak>0.00001,peak};}
 return {play,test,setOn,setOff,get enabled(){return enabled;},get state(){return {enabled,error:lastError,played,state:context?.state||'idle'};}};
}
export function bindSoundControls(key){
 const button=document.getElementById('sound'),testButton=document.getElementById('sound-test'),status=document.getElementById('sound-status');
 const sound=createSound({key,onChange:paint});
 function paint(s){if(s.played)status.hidden=true;button.textContent=s.enabled?'효과음 끄기':'효과음 켜기';button.setAttribute('aria-pressed',String(s.enabled));button.title=s.enabled?'효과음이 켜져 있어요. 누르면 꺼져요.':'효과음을 켜요.';if(s.error){status.hidden=false;status.textContent=s.error;}}
 button.onclick=async()=>{status.hidden=true;if(sound.enabled)sound.setOff();else if(await sound.setOn())await sound.play('test');};
 testButton.onclick=async()=>{testButton.disabled=true;status.hidden=false;status.textContent='시험 소리를 재생하고 있어요…';const r=await sound.test();status.hidden=false;status.textContent=r.ok?'♪ 효과음 신호가 정상이에요. 안 들리면 기기 음량을 확인해 주세요.':sound.state.error||'소리가 꺼졌거나 재생 신호를 확인하지 못했어요. 다시 눌러 주세요.';status.dataset.audioSignal=r.ok?'verified':'unverified';testButton.disabled=false;};
 paint(sound.state);return sound;
}

export const musicModes={focus:'집중을 위한 음악',energy:'활력을 위한 음악'};
export function createMusic({audio,storage,key='logic-link:music:v1',onChange=()=>{}}){
 let mode='focus',volume=.35,playing=false,error='',epoch=0,wantPlay=false;
 try{const saved=JSON.parse(storage?.getItem(key)||'{}');if(musicModes[saved.mode])mode=saved.mode;if(Number.isFinite(saved.volume))volume=Math.min(1,Math.max(0,saved.volume));}catch{}
 audio.loop=true;audio.preload='none';audio.volume=volume;
 const source=()=>{audio.src=new URL('./assets/music/'+mode+'.wav',import.meta.url).href;};source();
 const state=()=>({mode,volume,playing,loading:wantPlay&&!playing,error});const notify=()=>onChange(state());
 function save(){try{storage?.setItem(key,JSON.stringify({mode,volume}));}catch{}}
 function pause(){wantPlay=false;epoch++;audio.pause();playing=false;error='';notify();}
 async function play(){wantPlay=true;const ticket=++epoch;error='';notify();try{await audio.play();if(ticket!==epoch){if(!wantPlay)audio.pause();return false;}playing=true;notify();return true;}catch{if(ticket===epoch){wantPlay=false;playing=false;error='음악을 시작하지 못했어요. 재생을 다시 눌러 주세요.';notify();}return false;}}
 async function setMode(value){if(!musicModes[value]||value===mode)return;const resume=playing;pause();mode=value;source();save();notify();if(resume)await play();}
 function setVolume(value){const v=Number(value);if(!Number.isFinite(v))return;volume=Math.min(1,Math.max(0,v));audio.volume=volume;save();notify();}
 audio.addEventListener('error',()=>{wantPlay=false;epoch++;playing=false;error='음악을 불러오지 못했어요. 연결을 확인하고 다시 눌러 주세요.';notify();});
 return{play,pause,setMode,setVolume,get state(){return state();}};
}
export function bindMusicControls(){
 if(document.getElementById('atelier-music'))return;
 const root=document.createElement('div');root.id='atelier-music';root.className='atelier-music';
 root.innerHTML=`<button type="button" id="music-toggle" aria-pressed="false">♫ 음악 켜기</button><details id="music-settings"><summary>음악 설정</summary><div class="atelier-music-panel"><strong id="music-title"></strong><label for="music-mode">분위기</label><select id="music-mode"><option value="focus">집중을 위한 음악</option><option value="energy">활력을 위한 음악</option></select><label for="music-volume">음악 음량 <output id="music-volume-label">35%</output></label><input id="music-volume" type="range" min="0" max="100" value="35"><p id="music-status" role="status">음악 켜기를 누르면 시작해요.</p></div></details>`;
 const soundButton=document.getElementById('sound');const host=soundButton?.parentElement||document.querySelector('header')||document.body;
 host.append(root);
 const audio=document.createElement('audio');audio.id='game-music';audio.setAttribute('aria-hidden','true');document.body.append(audio);
 let storage;try{storage=localStorage;}catch{}
 const key=new URL('.',import.meta.url).pathname+':music:v2';
 const mode=root.querySelector('#music-mode'),toggle=root.querySelector('#music-toggle'),volume=root.querySelector('#music-volume'),status=root.querySelector('#music-status');
 const practiceHost=document.querySelector('#tour-card .tour-top');let practiceToggle;if(practiceHost){practiceToggle=document.createElement('button');practiceToggle.id='practice-music';practiceToggle.type='button';practiceHost.append(practiceToggle);}
 const music=createMusic({audio,storage,key,onChange:paint});
 function paint(s){mode.value=s.mode;volume.value=Math.round(s.volume*100);root.querySelector('#music-volume-label').value=Math.round(s.volume*100)+'%';toggle.textContent=(s.playing||s.loading)?'♫ 음악 끄기':'♫ 음악 켜기';toggle.setAttribute('aria-pressed',String(s.playing||s.loading));status.textContent=s.error||(s.loading?'음악을 불러오고 있어요…':s.playing?'♪ '+musicModes[s.mode]+' · 라운드가 바뀌어도 이어져요.':'음악 켜기를 누르면 이어서 들을 수 있어요.');root.dataset.playing=String(s.playing);if(practiceToggle){practiceToggle.textContent=(s.playing||s.loading)?'♫ 연습 음악 끄기':'♫ 연습 음악 켜기';practiceToggle.setAttribute('aria-pressed',String(s.playing||s.loading));}}
 mode.onchange=()=>music.setMode(mode.value);volume.oninput=()=>music.setVolume(Number(volume.value)/100);toggle.onclick=()=>(music.state.playing||music.state.loading)?music.pause():music.play();if(practiceToggle)practiceToggle.onclick=toggle.onclick;paint(music.state);
 fetch(new URL('./assets/music/credits.json',import.meta.url)).then(r=>r.json()).then(c=>{root.querySelector('#music-title').textContent=c.title;}).catch(()=>{});
 // Keep one element per page: book/round rendering never restarts the score.
 let resumeOnVisible=false;
 document.addEventListener('visibilitychange',()=>{if(document.hidden){resumeOnVisible=music.state.playing;if(resumeOnVisible)music.pause();}else if(resumeOnVisible){resumeOnVisible=false;music.play();}});
 document.addEventListener('pointerdown',e=>{if(!root.contains(e.target))root.querySelector('details').open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')root.querySelector('details').open=false;});
 return music;
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindMusicControls,{once:true});else bindMusicControls();}

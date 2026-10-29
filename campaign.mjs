export const gardens=[
 {name:'씨앗의 숲',flower:'햇살꽃',lesson:'목표를 잇는 첫걸음',start:0,end:6},
 {name:'잔빛의 정원',flower:'이슬방울꽃',lesson:'다음에 쓸 돌 남기기',start:6,end:12},
 {name:'만개하는 숲',flower:'별빛꽃',lesson:'내려온 뒤까지 생각하기',start:12,end:18}
];
export function cleanWins(value){return Object.fromEntries(Object.entries(value&&typeof value==='object'?value:{}).filter(([key,n])=>/^\d+$/.test(key)&&Number(key)<18&&Number.isInteger(n)&&n>0));}
export function collection(wins){const valid=cleanWins(wins);return gardens.map(g=>{const count=Array.from({length:6},(_,k)=>Boolean(valid[g.start+k])).filter(Boolean).length;return {...g,count,earned:count===6};});}
export function finished(wins){return collection(wins).every(g=>g.earned);}
export function firstUnfinished(wins,gardenIndex){const g=gardens[gardenIndex],valid=cleanWins(wins);for(let i=g.start;i<g.end;i++)if(!valid[i])return i;return g.start;}
export function nextRound(wins,index){const valid=cleanWins(wins);for(let step=1;step<=18;step++){const i=(index+step)%18;if(!valid[i])return i;}return 0;}

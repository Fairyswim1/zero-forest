export const levels=[
 {name:'목표가 바뀌어요',note:'먼저 +2와 −2로 0을 만들어요. 다음 목표는 +3이에요.',targets:[0,3],board:[null,null,null,null,null,null,null,null,2,-2,1,2]},
 {name:'다음 돌을 남겨요',note:'+3을 만드는 길은 여러 개예요. 다음 −2에 쓸 돌도 남겨 보세요.',targets:[3,-2],board:[null,null,null,null,4,2,-3,1,1,1,2,2]},
 {name:'세 수로도 만들어요',note:'두 개로 어렵다면 세 개를 이어 보세요.',targets:[3,-2],board:[null,null,null,null,null,null,3,-4,1,-3,3,4]},
 {name:'세 번의 약속',note:'−2 다음에는 +4, 마지막에는 0을 만들어요.',targets:[-2,4,0],board:[null,null,null,null,-4,3,3,1,-1,4,-4,1]},
 {name:'내려온 뒤의 만남',note:'돌이 내려온 다음, +3과 −2를 만들 자리도 생각해 보세요.',targets:[0,3,-2],board:[3,1,2,-4,-4,-2,-3,-3,1,-4,3,-3]},
 {name:'숲을 밝히는 순서',note:'지금 +3, 다음 −4, 마지막 +2. 어떤 돌을 남길까요?',targets:[3,-4,2],board:[1,1,1,4,2,4,-3,2,-4,1,2,-3]}
];

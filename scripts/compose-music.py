"""Original, deterministic, seamless stereo scores. No samples or external recordings.
Run from factory root; every game receives its own reproducible composer and profile.
"""
import json, math, wave, hashlib
from pathlib import Path
import numpy as np
RATE=22050

def compose(profile, mode, out):
    bpm=profile['bpm']+(24 if mode=='energy' else 0)
    beat=60/bpm; bars=16; seconds=bars*4*beat; n=round(seconds*RATE)
    mix=np.zeros((n,2),dtype=np.float64)
    root=profile['root']; minor=profile['minor']; color=profile['color']
    chords=([ [0,3,7,10],[-5,0,3,7],[-3,0,4,7],[-2,2,5,9] ] if minor else
            [ [0,4,7,11],[-3,0,4,7],[-7,-3,0,4],[-5,-1,2,7] ])
    def note(midi,time,duration,gain,voice='pluck',pan=0):
        length=max(4,round(duration*RATE)); t=np.arange(length)/RATE; f=440*2**((midi-69)/12)
        if voice=='pad':
            env=np.minimum(1,t/.65)*np.minimum(1,(duration-t)/.85)
            tone=(np.sin(2*np.pi*f*t)+np.sin(2*np.pi*f*1.0017*t+0.2))*.45 + .09*np.sin(2*np.pi*f*2*t)
            env*=.85+.15*np.sin(2*np.pi*.19*t)
        elif voice=='bass':
            env=np.minimum(1,t/.06)*np.exp(-t/.95)*np.minimum(1,(duration-t)/.25)
            tone=np.sin(2*np.pi*f*t)+.12*np.sin(2*np.pi*f*2*t)
        else:
            decay={'harp':1.5,'felt':1.15,'wood':.7,'glass':2.1,'celesta':1.8}[color]
            env=np.minimum(1,t/.018)*np.exp(-t/decay)*np.minimum(1,(duration-t)/.22)
            tone=np.sin(2*np.pi*f*t)
            harmonics={'harp':[(2,.26),(3,.10)],'felt':[(2,.18),(3,.045)],'wood':[(3,.12),(4,.045)],'glass':[(2,.16),(3,.06),(4.01,.035)],'celesta':[(2,.2),(3.99,.055)]}[color]
            for h,a in harmonics: tone+=a*np.sin(2*np.pi*f*h*t)*np.exp(-t*.8)
        signal=tone*env*gain; indices=(round(time*RATE)+np.arange(length))%n
        mix[indices,0]+=signal*math.sqrt((1-pan)/2); mix[indices,1]+=signal*math.sqrt((1+pan)/2)
    motif=profile['motif']
    for bar in range(bars):
        chord=chords[(bar//2)%4]; t=bar*4*beat
        # Slow, voiced chord bed; a four-phrase melody varies rather than resetting every bar.
        for j,pitch in enumerate(chord): note(root+pitch-12,t,4.8*beat,.045,'pad',(-.5+j/3))
        note(root+chord[0]-24,t,3.8*beat,.105,'bass')
        arp=[0,2,1,3] if mode=='focus' else [0,2,1,3,2,1,3,2]
        for k,idx in enumerate(arp):
            note(root+chord[idx],t+k*4*beat/len(arp),3.6,.085 if mode=='focus' else .073,pan=(-.35 if k%2 else .35))
        if bar%4!=3:
            for j in range(2):
                pitch=motif[(bar*2+j)%len(motif)]+(12 if bar>=8 else 0)
                note(root+pitch,t+(j*2+.5)*beat,3.9,.085,pan=.12)
        else:
            note(root+chord[2]+12,t+beat,4.5,.075,pan=-.12)
        if mode=='energy':
            for k in [1,3]: note(root+chord[0]-12,t+k*beat,.7,.042,'bass')
    # Circular early reflections and a diffuse stereo tail preserve ambience across the loop seam.
    dry=mix.copy()
    for delay,gain in [(0.071,.11),(.113,.09),(.229,.07),(.373,.065),(.571,.045),(.839,.03),(1.173,.018)]:
        shift=round(delay*RATE); mix+=np.roll(dry[:,::-1],shift,axis=0)*gain
    # Keep comfortable headroom; no per-note hard clipping or abrupt fade at the loop boundary.
    mix-=mix.mean(axis=0); peak=float(np.max(np.abs(mix))); mix*=min(1,.69/max(peak,1e-9))
    pcm=(mix*32767).round().astype('<i2')
    out.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(out),'wb') as w: w.setnchannels(2);w.setsampwidth(2);w.setframerate(RATE);w.writeframes(pcm.tobytes())
    return dict(mode=mode,bpm=bpm,seconds=n/RATE,peak=float(np.abs(mix).max()),rms=float(np.sqrt(np.mean(mix**2))),seamDelta=float(np.max(np.abs(mix[-1]-mix[0]))),sha256=hashlib.sha256(out.read_bytes()).hexdigest())

if __name__=='__main__':
    import sys
    if len(sys.argv)>1:
        base=Path(sys.argv[1]); profile=json.loads((base/'audio-profile.json').read_text(encoding='utf-8-sig'))
        reports=[compose(profile,mode,base/'assets/music'/f'{mode}.wav') for mode in ['focus','energy']]
        (base/'assets/music/credits.json').write_text(json.dumps(dict(title=profile['title'],origin='Original synthesized stereo compositions; no third-party samples',profile=profile,generator='scripts/compose-music.py',tracks=reports),ensure_ascii=False,indent=2),encoding='utf-8')
        print(base.name,[(r['mode'],round(r['seconds'],1),round(r['rms'],3)) for r in reports])

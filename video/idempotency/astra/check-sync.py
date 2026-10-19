#!/usr/bin/env python3
"""Compare encoded cue onsets to deterministic source at 1-ms RMS resolution."""
import array,hashlib,json,math,pathlib,subprocess,wave
H=pathlib.Path(__file__).resolve().parent
M=H.parents[2]/'public/media/idempotency/astra.mp4'
subprocess.run(['node',str(H/'audio-reference.cjs')],check=True)
with wave.open(str(H/'scratch/reference.wav'),'rb') as w:
 sr=w.getframerate();channels=w.getnchannels();source=array.array('h');source.frombytes(w.readframes(w.getnframes()))
mono=[sum(source[i:i+channels])/channels for i in range(0,len(source),channels)]
p=subprocess.run(['ffmpeg','-v','error','-threads','2','-filter_threads','2','-i',str(M),'-vn','-ac','1','-ar',str(sr),'-threads','2','-f','s16le','-'],check=True,capture_output=True)
encoded=array.array('h');encoded.frombytes(p.stdout)
cues=json.loads(subprocess.check_output(['node',str(H/'cues.cjs')]))
def onset(samples,t):
 # The cue's own 120-ms window supplies a relative threshold; permit AAC pre-echo.
 start=round((t-.04)*sr);stop=round((t+.12)*sr);step=round(.001*sr)
 bins=[]
 for i in range(start,stop,step):
  z=samples[max(0,i):i+step];bins.append(math.sqrt(sum(x*x for x in z)/len(z)))
 cutoff=max(bins)*.15
 return (start+next(i for i,x in enumerate(bins) if x>=cutoff)*step)/sr
rows=[]
for c in cues:
 expected=onset(mono,c['t']);actual=onset(encoded,c['t']);delta=1000*(actual-expected)
 assert abs(delta)<=1000/30,(c,delta)
 rows.append({'cueTime':c['t'],'preset':c['name'],'referenceOnset':round(expected,6),'encodedOnset':round(actual,6),'deltaMs':round(delta,3)})
r={'sha256':hashlib.sha256(M.read_bytes()).hexdigest(),'method':'First 1ms RMS bin >=15% of cue-window maximum; source versus decoded AAC; ±40ms pre-roll and 120ms post-cue window. Gain-invariant onset check, not a perceptual listening test.','maxAbsOnsetDeltaMs':max(abs(r['deltaMs']) for r in rows),'allWithinOneVideoFrame':True,'cues':rows}
(H/'audio-sync.json').write_text(json.dumps(r,indent=2)+'\n')
print('Max encoded/source onset delta:',r['maxAbsOnsetDeltaMs'],'ms across',len(rows),'cues')

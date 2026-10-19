"""Analytical cue alignment check; does not claim listening or isolate overlapping cues."""
import subprocess,json,wave,array,math
from pathlib import Path
base=Path('video/human-in-the-loop/astra')
subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','2','-i','public/media/human-in-the-loop/astra.mp4','-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-threads','2',str(base/'scratch/decoded.wav')],check=True)
with wave.open(str(base/'scratch/decoded.wav'),'rb') as w:
 rate=w.getframerate(); samples=array.array('h',w.readframes(w.getnframes()))
code="const F=require('./video/human-in-the-loop/astra/engine/flow-engine.js');require('./video/human-in-the-loop/astra/scene.js');process.stdout.write(JSON.stringify(F.createScene(F.lastScene).audioCues()));"
cues=json.loads(subprocess.check_output(['node','-e',code])); (base/'cues.json').write_text(json.dumps(cues,indent=2)+'\n'); result=[]
for c in cues:
 t=c['t']; chunk=samples[round(t*rate):round((t+.18)*rate)]
 peak=max(abs(v) for v in chunk)/32768
 db=20*math.log10(max(peak,1e-12))
 result.append({'time':t,'sound':c['name'],'first180msPeakDBFS':round(db,2),'energyPresent':db>-60})
assert all(c['energyPresent'] for c in result)
report={'method':'Decoded mono PCM, 0–180ms from every scheduled cue; visual event times use the same scene clock. Overlapping cues cannot be individually distinguished by this check.','physicalListening':False,'cueCount':len(cues),'allCueWindowsHaveEnergy':True,'cues':result}
(base/'audio-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print('All',len(cues),'scheduled cue windows contain decoded audio; quietest window',min(c['first180msPeakDBFS'] for c in result),'dBFS.')

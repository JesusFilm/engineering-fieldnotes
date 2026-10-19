"""Fresh GPT-6.1 Sol rerun, adapted from the interrupted reviewer verification. Read-only for media and author sources."""
from pathlib import Path
from datetime import datetime, timezone
import array, hashlib, json, math, re, struct, subprocess
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SCRATCH = HERE / 'fresh-scratch' / 'final'; SCRATCH.mkdir(exist_ok=True)
FF = ['ffmpeg', '-hide_banner', '-threads', '2', '-filter_threads', '2', '-filter_complex_threads', '2']
TIMES = {
    'baseline': [0,3.5,5.3,8.3,9.4,11.5,15.4,17.7,18.5,21.5,23.5,24.3],
    'astra': [0,3.5,5.7,6.5,9.45,12.45,13.5,14.65,16.6,17.3,17.9,18.5,20.2,20.6,22.8,23.5,25.5,28.5,28.9],
    'sol': [0,3.5,5.5,7.28,8.8,10.48,11.8,12.25,12.45,12.65,12.85,13.45,13.65,13.85,14.05,14.2,16.9,17.3,18.5,19.3,22.5,23.3,25.5,26.4],
}

def run(args):
    return subprocess.run([str(x) for x in args], check=True, capture_output=True)

def ff(args):
    return run(FF + args)

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def sheets(files, out, cols=3, per=6, width=350, height=622):
    for offset in range(0,len(files),per):
        batch=files[offset:offset+per]
        im=Image.new('RGB',(cols*width,math.ceil(len(batch)/cols)*(height+28)),'#202020')
        d=ImageDraw.Draw(im)
        for j,f in enumerate(batch):
            x=j%cols*width;y=j//cols*(height+28)
            im.paste(Image.open(f).resize((width,height)),(x,y+28))
            d.text((x+8,y+8),f.stem,fill='white')
        im.save(out/f'sheet-{offset//per}.jpg')

records={}
for name in ['baseline','astra','sol']:
    movie=ROOT/f'public/media/canary-deployments/{name}.mp4'
    out=SCRATCH/f'{name}-final';out.mkdir(exist_ok=True)
    probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',movie]).stdout)
    (out/'probe.json').write_text(json.dumps(probe,indent=2))
    v=next(s for s in probe['streams'] if s['codec_type']=='video')
    a=next(s for s in probe['streams'] if s['codec_type']=='audio')
    assert (v['codec_name'],v['width'],v['height'],v['pix_fmt'],v['r_frame_rate'],v['avg_frame_rate'])==('h264',1080,1920,'yuv420p','30/1','30/1')
    assert a['codec_name']=='aac'
    n=int(v['nb_frames']);duration=float(v['duration'])
    assert n==round(duration*30) and movie.stat().st_size<3_000_000
    decode=ff(['-xerror','-i',movie,'-af','volumedetect','-threads','2','-f','null','-'])
    log=decode.stderr.decode();(out/'decode-audio.log').write_text(log)
    assert not re.search(r'Error while|Invalid data|corrupt',log,re.I)
    peak=float(re.search(r'max_volume: ([-\d.]+)',log)[1]);assert -40<peak<=-.5
    b=ff(['-v','error','-i',movie,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1']).stdout
    size=1080*1920*3
    assert len(b)==size*2 and b[:size]==b[size:],'Exact RGB boundary mismatch'
    Image.frombytes('RGB',(1080,1920),b[:size]).save(out/'first.png')
    Image.frombytes('RGB',(1080,1920),b[size:]).save(out/'last.png')
    atoms={};data=movie.read_bytes();pos=0
    while pos+8<=len(data):
        length,kind=struct.unpack('>I4s',data[pos:pos+8]);header=8
        if length==1:length=struct.unpack('>Q',data[pos+8:pos+16])[0];header=16
        if length==0:length=len(data)-pos
        assert length>=header
        atoms[kind.decode()]=pos;pos+=length
    assert atoms['moov']<atoms['mdat']
    times=TIMES[name]+[(n-1)/30]
    for t in times:
        frame=out/f'{t:06.2f}s.png'
        ff(['-v','error','-y','-i',movie,'-ss',f'{t:.9f}','-frames:v','1','-threads','2',frame])
        assert frame.exists(),t
        Image.open(frame).resize((350,622)).save(out/f'{t:06.2f}s-350.png')
    sheets(sorted(out.glob('*s-350.png')),out)
    ff(['-v','error','-y','-i',movie,'-vf','fps=1,scale=240:-1,tile=6x5','-frames:v','1','-threads','2',out/'contact.jpg'])
    ff(['-v','error','-y','-i',movie,'-lavfi','showspectrumpic=s=1200x400:fscale=log:legend=1','-frames:v','1','-threads','2',out/'spectrogram.png'])
    poster=json.loads(run(['ffprobe','-v','error','-show_streams','-of','json',movie.with_suffix('.jpg')]).stdout)['streams'][0]
    assert poster['codec_name']=='mjpeg' and abs(poster['width']/poster['height']-9/16)<.002
    src=ROOT/f'video/canary-deployments/{name}'
    engine='runtime' if name=='baseline' else 'engine'
    scene='canary-deployments.js' if name=='baseline' else 'scene.js'
    js=f"const F=require('./{engine}/flow-engine.js');require('./{scene}');const s=F.createScene(F.lastScene);console.log(JSON.stringify(s.audioCues()));"
    cues=json.loads(subprocess.run(['node','-e',js],cwd=src,check=True,capture_output=True).stdout)
    pcm=ff(['-v','error','-i',movie,'-vn','-ar','8000','-ac','1','-threads','2','-f','f32le','pipe:1']).stdout
    samples=array.array('f');samples.frombytes(pcm)
    cue_checks=[]
    for cue in cues:
        t=cue['t'];portion=samples[int(t*8000):int((t+.22)*8000)]
        rms=math.sqrt(sum(x*x for x in portion)/len(portion));db=20*math.log10(max(rms,1e-12))
        assert db>-65,(name,t,db)
        cue_checks.append({'t':t,'name':cue['name'],'rmsNext0To220msDbfs':round(db,2)})
    (out/'cue-energy.json').write_text(json.dumps(cue_checks,indent=2)+'\n')
    # Dense encoded routing samples, one at each scheduled packet midpoint.
    specs={'baseline':(6.34,.5,15,750,700),'astra':(6.825,.29,20,680,480),'sol':(5.84,.16,30,800,450)}
    start,step,count,y,h=specs[name];routing=out/'routing';routing.mkdir(exist_ok=True)
    for i in range(count):
        t=start+step*i
        ff(['-v','error','-y','-i',movie,'-ss',str(t),'-vf',f'crop=1080:{h}:0:{y},scale=350:-1','-frames:v','1','-threads','2',routing/f'{i+1:02d}-{t:05.2f}s.png'])
    sheets(sorted(routing.glob('*.png')),routing,cols=5,per=30,width=350,height=round(h*350/1080))
    records[name]={'sha256':sha(movie),'posterSha256':sha(movie.with_suffix('.jpg')),'bytes':len(data),'duration':duration,'frames':n,'videoCodec':'h264','width':1080,'height':1920,'fps':30,'pixelFormat':'yuv420p','audioCodec':'aac','audioPeakDbfs':peak,'fullDecode':True,'exactFirstLastRGB':True,'boundaryRGBSHA256':hashlib.sha256(b[:size]).hexdigest(),'faststart':True,'atoms':atoms,'videoStartTime':v.get('start_time'),'audioStartTime':a.get('start_time'),'encodedFrameTimes':times,'audioCueCount':len(cues),'everyCueHasEnergy':True,'physicalListening':False,'sourceSHA256':{str(p.relative_to(src)):sha(p) for p in [src/scene,src/engine/'flow-engine.js',src/engine/'render.mjs']}}
    print(name,records[name]['sha256'],peak,flush=True)
(HERE/'fresh-encoded-checks.json').write_text(json.dumps({'verifiedAt':datetime.now(timezone.utc).isoformat(),'checks':records,'note':'Mechanical checks only. Editorial frame inspection is recorded separately in after.md.'},indent=2)+'\n')

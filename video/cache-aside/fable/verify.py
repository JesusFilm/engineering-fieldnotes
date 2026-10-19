import struct,subprocess,json,re,hashlib,sys
f=sys.argv[1]
d=open(f,'rb').read(); pos=0; boxes={}
while pos+8<=len(d):
    l,k=struct.unpack('>I4s',d[pos:pos+8]); h=8
    if l==1: l=struct.unpack('>Q',d[pos+8:pos+16])[0]; h=16
    if l==0: l=len(d)-pos
    boxes[k]=pos; pos+=l
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',f]))
v=next(s for s in probe['streams'] if s['codec_type']=='video'); a=next(s for s in probe['streams'] if s['codec_type']=='audio')
n=int(v['nb_frames'])
fr=subprocess.check_output(['ffmpeg','-v','error','-threads','2','-i',f,'-vf',f'select=eq(n\\,0)+eq(n\\,{n-1})','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1'])
sz=1080*1920*3
dec=subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-i',f,'-f','null','-'],capture_output=True)
vol=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-i',f,'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr
peak=float(re.search(r'max_volume: ([-\d.]+) dB',vol).group(1))
out={'file':f.split('public/')[-1],'sha256':hashlib.sha256(d).hexdigest(),'bytes':len(d),'duration':float(probe['format']['duration']),
 'video':[v['codec_name'],v['pix_fmt'],v['width'],v['height'],v['r_frame_rate'],n],'audio':[a['codec_name'],a['sample_rate'],a['channels']],
 'faststart':boxes[b'moov']<boxes[b'mdat'],'boundaryFramesIdentical':len(fr)==2*sz and fr[:sz]==fr[sz:],
 'fullDecodeClean':dec.returncode==0 and not dec.stderr,'audioPeakDbfs':peak,'audioHeard':False}
ok = out['faststart'] and out['boundaryFramesIdentical'] and out['fullDecodeClean'] and -40<peak<=-0.5 and len(d)<2_000_000 and out['video'][:5]==['h264','yuv420p',1080,1920,'30/1']
out['allChecksPass']=bool(ok)
print(json.dumps(out,indent=2))
print('ALL_CHECKS_PASS' if ok else 'CHECKS_FAILED', file=sys.stderr)
sys.exit(0 if ok else 1)


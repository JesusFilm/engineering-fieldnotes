"""Compare a deployed static release with the local build, including every lesson."""
import argparse, concurrent.futures, hashlib, json
from pathlib import Path
from urllib.request import Request, urlopen
ROOT = Path(__file__).resolve().parent.parent

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--base',default='https://jesusfilm.github.io/engineering-fieldnotes/')
    args=parser.parse_args()
    base=args.base.rstrip('/')+'/'
    paths=set(p.relative_to(ROOT/'dist').as_posix() for p in (ROOT/'dist').rglob('*.html'))
    paths.update(['app.js','style.css'])
    topics=json.loads((ROOT/'content/order.json').read_text())
    for topic in topics:
        for lesson in json.loads((ROOT/f'video/{topic}/sequence/lessons.json').read_text()):
            paths.update([lesson['src'],lesson['poster']])
    def verify(path):
        expected=hashlib.sha256((ROOT/'dist'/path).read_bytes()).hexdigest()
        req=Request(base+path+'?release='+expected[:12],headers={'Cache-Control':'no-cache'})
        with urlopen(req,timeout=60) as response:
            assert response.status==200,(path,response.status)
            actual=hashlib.sha256(response.read()).hexdigest()
        assert actual==expected,f'Deployed bytes differ: {path}'
        return dict(path=path,sha256=actual,status=200)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results=list(pool.map(verify,sorted(paths)))
    report=dict(base=base,topics=len(topics),lessons=sum(len(json.loads((ROOT/f'video/{t}/sequence/lessons.json').read_text())) for t in topics),verifiedFiles=results)
    (ROOT/'reviews/live-sequence-release.json').write_text(json.dumps(report,indent=2)+'\n')
    print(f'Live release matches: {len(topics)} topics, {report["lessons"]} lessons, {len(results)} files.')
if __name__=='__main__':main()

import asyncio,json,time
from pathlib import Path
async def main():
 q=asyncio.Queue(maxsize=3);logs=[];active=0;start=time.monotonic()
 def log(event,job):logs.append(dict(t=round(time.monotonic()-start,4),event=event,job=job,waiting=q.qsize(),active=active))
 async def worker():
  nonlocal active
  for _ in range(6):
   job=await q.get();active+=1;log('start',job)
   await asyncio.sleep(.35 if job=='B' else .04)
   active-=1;log('finish',job);q.task_done()
 w=asyncio.create_task(worker())
 for job in 'ABCDEF':
  log('submit',job);await q.put(job);log('admitted',job)
 await q.join();await w
 assert max(l['waiting'] for l in logs)<=3 and max(l['active'] for l in logs)==1
 assert [l['job'] for l in logs if l['event']=='finish']==list('ABCDEF')
 fs=next(i for i,l in enumerate(logs) if l['event']=='submit' and l['job']=='F')
 fa=next(i for i,l in enumerate(logs) if l['event']=='admitted' and l['job']=='F')
 assert any(l['event']=='start' and l['job']=='C' for l in logs[fs:fa])
 assert logs[fa]['t']-logs[fs]['t']>.3
 Path(__file__).with_name('exercise-check.json').write_text(json.dumps({'success':True,'logs':logs,'scope':'Local asyncio stub only; no broker, real tool, model or production benchmark.'},indent=2)+'\n')
 print('Local exercise passed: max waiting 3, max active 1, six completed; F waits through B and is admitted after C dequeue.')
asyncio.run(main())

"""Local stub demonstration; no paid APIs, external services, or repository writes."""
import asyncio,json,time

async def main():
 queue=asyncio.Queue(maxsize=3);events=[];active=0;start=time.monotonic()
 def record(kind,job):events.append({'seconds':round(time.monotonic()-start,4),'event':kind,'job':job,'waiting':queue.qsize(),'active':active})
 async def worker():
  nonlocal active
  for _ in range(6):
   job=await queue.get();active+=1;record('start',job)
   await asyncio.sleep(.3 if job=='B' else .03)
   active-=1;record('finish',job);queue.task_done()
 work=asyncio.create_task(worker())
 for job in 'ABCDEF':
  record('submission',job);await queue.put(job);record('admitted',job)
  await asyncio.sleep(.02)
 await queue.join();await work
 assert max(e['waiting'] for e in events)<=3
 assert max(e['active'] for e in events)==1
 assert [e['job'] for e in events if e['event']=='finish']==list('ABCDEF')
 submit_f=next(e['seconds'] for e in events if e['event']=='submission' and e['job']=='F')
 admit_f=next(e['seconds'] for e in events if e['event']=='admitted' and e['job']=='F')
 start_c=next(e['seconds'] for e in events if e['event']=='start' and e['job']=='C')
 assert admit_f>submit_f and admit_f>=start_c
 return {'scenario':'six local stub jobs; one producer; one worker; queue capacity three','noExternalCalls':True,'maxWaiting':max(e['waiting'] for e in events),'maxActive':max(e['active'] for e in events),'completed':6,'fBlockedSeconds':round(admit_f-submit_f,4),'fAdmittedAfterCDequeued':True,'events':events}

if __name__=='__main__':print(json.dumps(asyncio.run(main()),indent=2))

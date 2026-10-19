"""Pedagogical state model by gpt-6-astra; not a Redis integration test."""
import json
source={'revision':1,'rollbackStep':'old step'}
cache={}
source_reads=0
key=('team-a','service-b','schema-1')
def read():
 global source_reads
 if key not in cache:
  source_reads+=1
  cache[key]=dict(source)
 return dict(cache[key])
assert read()['revision']==1 and read()['revision']==1 and source_reads==1
source.update(revision=2,rollbackStep='new step')
assert read()['revision']==1
cache.pop(key)
assert read()['revision']==2 and source_reads==2
# Separate scenario: an old read finishes after the source write and deletion.
source['revision']=1
cache.clear()
paused=dict(source)
source['revision']=2
cache.pop(key,None)
cache[key]=paused
assert read()['revision']==1
accepted=read()['revision']==source['revision']
assert not accepted
print(json.dumps({'warmReadReuse':'passed','serializedInvalidationRefill':'passed','staleFillRace':'reproduced','authoritativeRevisionComparison':'rejected stale plan','limits':'No deployment, live Redis, TTL, authorization, or simultaneous threads are tested.'},indent=2))

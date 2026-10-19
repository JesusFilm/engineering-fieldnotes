export default function setup(ctx) {
  const nodes = {};
  for (const place of ['Source','Held','Cache']) for (const rev of [1,2]) {
    const key = place+'_'+rev;
    nodes[key] = ctx.model.getObjectByName(key);
    if (!nodes[key]) throw new Error('Missing '+key);
    nodes[key].position.z=0;
  }
  let source=1, held=0, cached=0;
  const read=ctx.addAction('Read source',()=>{
    if (held) {cached=held; held=0;}
    else if (!cached) held=source;
    render();
  });
  const change=ctx.addAction('Publish 2 + delete key',()=>{
    source=2; cached=0; render();
  });
  function render() {
    for (const [place,rev] of [['Source',source],['Held',held],['Cache',cached]])
      for (const n of [1,2]) nodes[place+'_'+n].visible=n===rev;
    read.textContent=held?'Fill from held copy':cached?'Read cached '+cached:'Read source';
    change.textContent=source===1?'Publish 2 + delete key':'Delete cached key';
    ctx.caption('Source '+source+' · held '+(held||'empty')+' · cache '+(cached||'empty')+'. '+
      (held && held!==source?'Deletion cannot change the reader’s independently held copy.':cached && cached!==source?'A late fill restored the old revision; delete the key to recover.':held?'The reader is suspended before filling the cache.':cached?'A hit reuses the cached revision without reading the source.':'The next read must fetch the source.'));
    ctx.invalidate();
  }
  function reset(){source=1;held=0;cached=0;render();ctx.view([.4,4,10],[0,.3,0]);}
  reset();
  return {update(){return false;},reset,dispose(){}};
}

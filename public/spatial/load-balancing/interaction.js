// Load balancing (Opus revision 3): the balancer's signal is a projection.
// From above, each lane shows only how many request bases it holds; column height is remaining work.
// A fewest-outstanding rule (A wins ties) routes each arrival. When counts tie but work differs,
// dispatch holds so the reader can compare the balancer's view with the side view.
export default function setup(ctx) {
  const costs=[8,1,1,3,1,1];
  const bases=[], rods=[], home=[];
  for(let i=0;i<6;i++) {
    const base=ctx.model.getObjectByName('Base_Q'+(i+1)), rod=ctx.model.getObjectByName('Work_Q'+(i+1));
    if(!base||!rod) throw new Error('Missing request '+(i+1));
    bases.push(base);rods.push(rod);home.push([base.position.clone(),rod.position.clone()]);
  }
  const pointer=ctx.model.getObjectByName('Router_Pointer');
  if(!pointer) throw new Error('Missing Router_Pointer');
  const LANE_X=[-1.7,1.7], SIDE=[[5,7,12],[0,.6,.6]], ABOVE=[[0,17,1.4],[0,0,.4]];
  let lanes, next, pending, step, done, top, tieNote, waited;
  const advance=ctx.addAction('Advance one step',()=>{
    if(!pending && next<6 && tie()) {pending=true;render();return;}
    dispatch();
  });
  const look=ctx.addAction('Balancer’s view',()=>{
    top=!top;ctx.view(...(top?ABOVE:SIDE));render();
  });
  const work=q=>q.reduce((n,r)=>n+r.left,0);
  const tie=()=>lanes[0].length===lanes[1].length&&lanes[0].length>0&&work(lanes[0])!==work(lanes[1]);
  const pick=()=>lanes[0].length<=lanes[1].length?0:1;
  function dispatch(){
    tieNote='';
    if(pending){
      const l=pick();
      tieNote='Q'+(next+1)+' joined '+'AB'[l]+' behind '+work(lanes[l])+' units of work; '+'AB'[1-l]+' had '+work(lanes[1-l])+'. ';
    }
    pending=false;step++;
    if(next<6){lanes[pick()].push({id:next,left:costs[next]});next++;}
    for(const q of lanes) for(const r of q.slice(1)) waited[r.id]++;
    for(const q of lanes) if(q.length){q[0].left--;if(!q[0].left)done.push(q.shift().id);}
    render();
  }
  function render(){
    for(let i=0;i<6;i++) {
      bases[i].visible=rods[i].visible=!done.includes(i);
      if(i>=next){bases[i].position.copy(home[i][0]);rods[i].position.copy(home[i][1]);rods[i].scale.y=1;}
    }
    lanes.forEach((q,l)=>q.forEach((r,i)=>{
      const z=-1.15+i*.72;
      bases[r.id].position.set(LANE_X[l],.15,z);
      rods[r.id].position.set(LANE_X[l],.3,z);
      rods[r.id].scale.y=r.left/costs[r.id];
    }));
    // Point at the lane the count rule would choose for the next arrival; rest straight ahead when none remain.
    if(next<6){const dx=LANE_X[pick()],dz=-1.15-1.8;pointer.rotation.y=Math.atan2(-dx,-dz);}
    else pointer.rotation.y=0;
    const finished=done.length===6;
    advance.textContent=finished?'Finished':pending?'Dispatch Q'+(next+1):'Advance one step';
    advance.disabled=finished;
    look.textContent=top?'Side view':'Balancer’s view';
    const n=l=>lanes[l].length, w=l=>work(lanes[l]), reqs=l=>n(l)+(n(l)===1?' request':' requests');
    let text;
    if(top&&pending) text='From above, A and B look alike: '+n(0)+' request each. The '+w(0)+'-versus-'+w(1)+' work difference is height, out of the balancer’s sight.';
    else if(top) text='From above, the balancer sees counts only: A '+n(0)+', B '+n(1)+'. Remaining work is column height.';
    else if(finished) text='All six finished at step '+step+'. Q5 waited '+waited[4]+' steps; the rule only ever compared counts.';
    else if(pending) text='Counts tie '+n(0)+'–'+n(1)+', so the rule picks A, yet A holds '+w(0)+' work and B '+w(1)+'. Compare views, then dispatch.';
    else if(!step) text='Advance arrivals; each goes to the lane with fewer outstanding requests.';
    else text=tieNote+'Step '+step+': A '+reqs(0)+', '+w(0)+' work; B '+reqs(1)+', '+w(1)+' work.';
    ctx.caption(text);
    ctx.invalidate();
  }
  function reset(){lanes=[[],[]];next=0;pending=false;step=0;done=[];top=false;tieNote='';waited=[0,0,0,0,0,0];render();ctx.view(...SIDE);}
  reset();
  return {update(){return false;},reset,dispose(){}};
}

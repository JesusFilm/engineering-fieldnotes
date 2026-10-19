export default function setup(ctx) {
  const {model,caption,addAction,invalidate}=ctx;
  const node=n=>{const o=model.getObjectByName(n);if(!o)throw Error(n);return o;};
  let applied=false, primary=false;
  const press=node('ReplayPress'), rest=press.position.y;
  function render(read=true) {
    node('Primary_v7').visible=false; node('Primary_v8').visible=true;
    node('Replica_v7').visible=!applied; node('Replica_v8').visible=applied;
    node('Route_Primary').visible=primary;node('Route_Replica').visible=!primary;
    press.position.y=rest-(applied?.32:0);
    // Each fixture or route selection issues a NEW fresh query after selecting that state.
    const v8=primary||applied;
    node('Display_v8').visible=v8;node('Display_v7').visible=!v8;
    fixture.textContent=applied?'Compare replay held':'Compare replay applied';
    route.textContent=primary?'Fresh replica read':'Fresh primary read';
    if(read) caption((applied?'Applied fixture':'Replay-held fixture')+': one committed write; fresh '+(primary?'primary':'replica')+' query returns '+(v8?'v8.':'v7; received WAL has not changed the applied data.'));
    invalidate();
  }
  const fixture=addAction('Compare replay applied',()=>{applied=!applied;render();});
  const route=addAction('Fresh primary read',()=>{primary=!primary;render();});
  function reset(){applied=false;primary=false;render();}
  render(false);
  return {update(){return false;},reset,dispose(){}};
}

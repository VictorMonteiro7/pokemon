import { PokeBallWrapper } from "./Style"

type PropsPokeballType = {
  wt? : string;
  wtpb? : string;
  ht? : string;
  htpb? : string;
  bd? : string;
  an? : boolean; 
  children?: any; 
  sm?: boolean;
  mg?: string;
}

export const Pokeball = (props: PropsPokeballType)=>{
  return (
    <PokeBallWrapper htpb={props.htpb} wtpb={props.wtpb} mg={props.mg} sm={props.sm} wt={props.wt} ht={props.ht} bd={props.bd} an={props.an}>
    <div className='pokeBall'>
      <div></div>
      </div>
      {props.children && <p>{props.children}</p>}
  </PokeBallWrapper>
  )
}
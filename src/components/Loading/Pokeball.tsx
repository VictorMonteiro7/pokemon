import { PokeBallWrapper } from "./Style"

type PropsPokeballType = {
  wt? : string;
  ht? : string;
  bd? : string;
  an? : boolean; 
  children?: string; 
  sm?: boolean;
  mg?: string;
}

export const Pokeball = (props: PropsPokeballType)=>{
  return (
    <PokeBallWrapper mg={props.mg} sm={props.sm} wt={props.wt} ht={props.ht} bd={props.bd} an={props.an}>
    <div className='pokeBall'>
      <div></div>
      </div>
      {props.children && <p>{props.children}</p>}
  </PokeBallWrapper>
  )
}
import { PokeBallWrapper } from "./Style"

type PropsPokeballType = {
  wt? : string;
  ht? : string;
  bd? : string;
  an? : boolean; 
  children?: string; 
}

export const Pokeball = (props: PropsPokeballType)=>{
  return (
    <PokeBallWrapper wt={props.wt} ht={props.ht} bd={props.bd} an={props.an}>
    <div className='pokeBall'>
      <div></div>
      </div>
      {props.children && <p>{props.children}</p>}
  </PokeBallWrapper>
  )
}
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
  searchPoke?: (name: string) => void;
  name?: {
    name: string,
    setName?: any
  };
}


export const Pokeball = (props: PropsPokeballType)=>{
  function handleClickSearch(){
    if (props.name && props.searchPoke){
      props.searchPoke(props.name.name.toLowerCase())
      props.name.setName('')
    }
  }
  
  return (
    <PokeBallWrapper onClick={handleClickSearch} htpb={props.htpb} wtpb={props.wtpb} mg={props.mg} sm={props.sm} wt={props.wt} ht={props.ht} bd={props.bd} an={props.an}>
    <div className='pokeBall'>
      <div></div>
      </div>
      {props.children && <p>{props.children}</p>}
  </PokeBallWrapper>
  )
}
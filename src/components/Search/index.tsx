import { useContext, useState } from "react";
import { Api } from "../../api";
import { Context } from "../../contexts/Context";
import { PokemonId, TypePokemonTypes } from "../../types/MainTypes";
import { Pokeball } from "../Loading/Pokeball"
import {SearchContainer} from  './Style'

type SearchPropsType = {
  setModal?: any;
}

export const Search = (props: SearchPropsType)=>{
  const {dispatch} = useContext(Context);
  const [, setLoading] = useState(false);
  const [name, setName] = useState("");  
  async function goToPokemon(name: string | undefined){    
    try{
      setLoading(true)
      const res: PokemonId = await Api.get(`/pokemon/${name}`); 
      const types: TypePokemonTypes = await Api.get(`/type/${res.types && res.types[0].type.name}`); 
      dispatch({
        type: 'SET_POKE_INFO',
        payload: {
          id: res.id,
          sprites:{
            front_default: res.sprites && res.sprites.front_default,
            animation: res.sprites && res.sprites.versions['generation-v']['black-white'].animated.front_default     
          },
          forms: res.forms,
          types: res.types,
          abilities: res.abilities,
          typeWaS: {
            damage_relations: types.damage_relations,            
          },
          stats: res.stats,          
        }
      })     
    } catch(e: any){
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }       

  function handleInputKeyUp(e: any){
    if(e.key === 'Enter'){
      goToPokemon(name.toLowerCase())
      setName('')
      if(props.setModal){
        props.setModal(true)
      }
    }
  }
  return (
    <SearchContainer>
      <input onKeyUp={handleInputKeyUp} placeholder="Digite um nome ou o ID do pokemon" type="text" value={name} onChange={({target})=>setName(target.value)} />
      <Pokeball name={{name, setName}} searchPoke={goToPokemon} sm={true} mg="0 5px 0 0" wtpb="24px" htpb="24px" wt='100%' ht='24px' bd='0.5px solid #000' ></Pokeball>
    </SearchContainer>
  )
}
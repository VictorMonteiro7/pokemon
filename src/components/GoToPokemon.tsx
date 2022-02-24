import { useContext, useState } from "react";
import { Api } from "../api";
import { Context } from "../contexts/Context";
import { PokemonId, TypePokemonTypes } from "../types/MainTypes";

export async function GoToPokemon(name: string | undefined){    
  const {dispatch} = useContext(Context);
  const [loading, setLoading] = useState(false);
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
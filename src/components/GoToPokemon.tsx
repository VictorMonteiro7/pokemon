import { useContext, useState } from "react";
import { Api } from "../api";
import { Context } from "../contexts/Context";
import { acharCaminho } from "../helper/acharCaminho";
import { PokemonId, TypePokemonTypes } from "../types/MainTypes";



const useGoToPokemon = () => {
  const {dispatch} = useContext(Context);
  const [loading, setLoading] = useState(false);
  async function GoToPokemon(name: string | undefined){    
    try{
      setLoading(true)
      const res: PokemonId = await Api.get(`/pokemon/${name}`); 
      const types: TypePokemonTypes = await Api.get(`/type/${res.types && res.types[0].type.name}`); 
      dispatch({
        type: 'SET_POKE_INFO',
        payload: {
          id: res.id,
          sprites:{
            front_default: res.sprites && acharCaminho(res.sprites),
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
  return {GoToPokemon, loading}
}
export default useGoToPokemon;

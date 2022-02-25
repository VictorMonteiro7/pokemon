import { useContext,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Api } from '../api';
import { PokeBasicInfo, PokemonId, TypePokemonTypes } from '../types/MainTypes';
import { Context } from '../contexts/Context';
type PropsType = {
  id: string;
}
export const useReqSinglePoke = ({id}: PropsType) =>{
  const [data, setData] = useState<PokeBasicInfo>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(Context);

  async function getPokeInfo(){
    try{
      setLoading(true)
      const res: PokemonId = await Api.get(`/pokemon/${id}`);    
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
    } catch(e){
      navigate('/');
    } finally {
      setLoading(false)
    }
  }
  return({
    data,    
    loading,
    getPokeInfo
  })
}
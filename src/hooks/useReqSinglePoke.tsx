import { useContext, useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Api } from '../api';
import { PokemonId, TypePokemonTypes } from '../types/MainTypes';
import { Context } from '../contexts/Context';
export const useReqSinglePoke = () =>{
  const {id} = useParams();
  const [data, setData] = useState<PokemonId>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(Context);
  useEffect(()=>{
    getPokeInfo();
  },[])

  async function getPokeInfo(){
    try{
      setLoading(true)
      const res: PokemonId = await Api.get(`/pokemon/${id}`);    
      setData(res);
      const types: TypePokemonTypes = await Api.get(`/type/${res.types[0].type.name}`); 
      dispatch({
        type: 'SET_POKE_INFO',
        payload: {
          id: res.id,
          sprites:{
            front_default: res.sprites.front_default,
            animation: res.sprites.versions['generation-v']['black-white'].animated.front_default            
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
    loading
  })
}
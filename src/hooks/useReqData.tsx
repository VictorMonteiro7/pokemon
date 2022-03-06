import { useState,  useContext } from "react";
import { TypePokemon, TypePokemonTypes} from "../types/MainTypes";
import {useSearchParams} from 'react-router-dom';
import { Api } from "../api";
import { Context } from "../contexts/Context";

const useReqData = () => {
  const [listaParams, setListaParams] = useSearchParams();
  const limit = listaParams.get('limit');
  const offset = listaParams.get('offset');
  const order = listaParams.get('order');
  const type = listaParams.get('type');
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(Context);
  const [loadingBtn, setLoadingBtn] = useState(false); 

  const reqApi = async (limitParam?: number, offsetParam?: number)=>{
      let res;    
      if((limitParam && limitParam >= 20 && limitParam <= 1126) && offsetParam){
        res = await Api.get(`/pokemon?limit=${limitParam}&offset=${offsetParam}`);
      } else if (limitParam && limitParam >= 20){      
        res = await Api.get(`/pokemon?limit=${limitParam}`);      
      } else {
        res = await Api.get(`/pokemon`);
      }    
      dispatch({
        type: 'SET_MAX_POKE',
        payload: {
          maxPoke: res.count
        }
      })
      dispatch({
        type: 'SET_COUNT',
        payload: {
          n: res.count
        }
      })
      res.results.forEach(async (item: TypePokemon)=>{  
        const res2 = await Api.get(`/pokemon/${item.name}`)
        const types: TypePokemonTypes = await Api.get(`/type/${res2.types[0].type.name}`);       
          const dados = {
            id: res2.id,
            sprites:{
              front_default: res2.sprites.front_default,
              animation: res2.sprites.versions['generation-v']['black-white'].animated.front_default            
            },
            forms: res2.forms,
            types: res2.types,
            abilities: res2.abilities,
            stats: res2.stats, 
            typeWaS: types.damage_relations
          }
          if(state.dataInfo.length >= 0){
            const pokeInfo = state.dataInfo.find(e=>e.id === res2.id);
            if(!pokeInfo){
              dispatch({type: 'SET_DATA_INFO', payload: dados });
              dispatch({type: 'ORDER_DATA', payload: {order: 'id'}});
            }
            setLoadingBtn(false)
          }
        })        
      setLoading(false)
  }
  return({
    loading,
    reqApi,
    setListaParams,
    listaParams,
    setLoading,
    limit,
    offset,  
    loadingBtn,
    setLoadingBtn,   
    order,
    type
  })
}

export default useReqData;
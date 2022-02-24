import { useState, useEffect, useContext } from "react";
import { TypePokemon, TypePokemonTypes} from "../types/MainTypes";
import {useSearchParams} from 'react-router-dom';
import { Api } from "../api";
import { Context } from "../contexts/Context";

export const useReqData = () => {
  const [listaParams, setListaParams] = useSearchParams();
  const limit = listaParams.get('limit');
  const offset = listaParams.get('offset');
  const order = listaParams.get('order');
  const type = listaParams.get('type');
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(Context);
  const [loadingBtn, setLoadingBtn] = useState(false); 
  const [maxpPoke, setMaxPoke] = useState(0); 
  useEffect(()=>{
    setLoading(true)
    if(limit && Number(limit) >= 20) listaParams.set('limit', `${limit}`);
    else listaParams.set('limit', `20`);
    if(offset) listaParams.set('offset', `${offset}`);
    if(order) listaParams.set('order', `${order}`);
    if(type) listaParams.set('type', `${type}`);
    setListaParams(listaParams);
    reqApi(Number(limit), Number(offset));   
  },[])
  const reqApi = async (limitParam?: number, offsetParam?: number)=>{
    let res;    
    if((limitParam && limitParam >= 20) && offsetParam){
      res = await Api.get(`/pokemon?limit=${limitParam}&offset=${offsetParam}`);
    } else if (limitParam && limitParam >= 20){      
      res = await Api.get(`/pokemon?limit=${limitParam}`);      
    } else {
      res = await Api.get(`/pokemon`);
    }    
    setMaxPoke(res.count);
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
        // if(state.dataInfo.length === 0){          
        //   dispatch({type: 'SET_DATA_INFO', payload: dados  });
        // }
        if(state.dataInfo.length >= 0){
          const pokeInfo = state.dataInfo.find(e=>e.id === res2.id);
          if(!pokeInfo){
            dispatch({type: 'SET_DATA_INFO', payload: dados  });
          }
          setLoadingBtn(false)
        }
        if(order || type){
          const pokeInfo = state.dataInfo.find(e=>e.id === res2.id);
          if(!pokeInfo){
            dispatch({
              type: 'ORDER_DATA',
              payload: {
                order: order,
                type: type
              }
            })
          }
          setLoading(false)
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
    maxpPoke,    
  })
}
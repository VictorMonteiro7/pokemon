import { Api } from "../api"
import { Context } from "../contexts/Context"
import { useContext, useEffect, useState } from "react"
import {useSearchParams} from 'react-router-dom'
import { PokeBasicInfo } from "../types/MainTypes"


export const  useReqPokeType = ()=>{
  const [listaParams, setListaParams] = useSearchParams();
  const [data, setData] = useState<PokeBasicInfo[]>([]);
  const [maxTypePoke, setMaxTypePoke] = useState<number>(0);
  const type = listaParams.get('type');
  const order = listaParams.get('order');
  const {state, dispatch} = useContext(Context);

  useEffect(()=>{
    if(type) listaParams.set('type', `${type}`); 
    if(order) listaParams.set('order', `${order}`);
    setListaParams(listaParams);
    reqTypePoke();
  },[])

  const reqTypePoke = async ()=>{
    if((type && order)){
      const res = await Api.get(`/type/${type}`);
      let arr: PokeBasicInfo[] = [];
      res.pokemon.map(async (item: any)=>{
        const res2 = await Api.get(`/pokemon/${item.pokemon.name}`);        
        const dados = {
          id: res2.id,
          abilities: res2.abilities,
          forms: res2.forms,
          stats: res2.stats,
          sprites: {
            front_default: res2.sprites.front_default,
            animation: res2.sprites.versions['generation-v']['black-white'].animated.front_default
          },
          types: res2.types,
          typeWaS: res.damage_relations
        }
        arr.push(dados);

        if(state.dataInfo.length === 0){          
          dispatch({type: 'SET_DATA_INFO', payload: dados  });
        }
        if(state.dataInfo.length > 0){
          const pokeInfo = state.dataInfo.find(e=>e.id === res2.id);
          if(!pokeInfo){
            dispatch({type: 'SET_DATA_INFO', payload: dados  });
          }
        }
        setData(arr)
        setMaxTypePoke(arr.length)
  })
}}

  return ({
    data,
    maxTypePoke
  })
}
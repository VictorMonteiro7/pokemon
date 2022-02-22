import { useState, useEffect } from "react";
import { PokemonId, TypePokemon, TypePokemonBase } from "../types/MainTypes";
import {useSearchParams} from 'react-router-dom';
import { Api } from "../api";

export const useReqData = () => {
  const [data, setData] = useState<TypePokemonBase>();
  const [listaParams, setListaParams] = useSearchParams();  
  const limit = listaParams.get('limit');
  const offset = listaParams.get('offset');
  const [basicInfo, setBasicInfo] = useState<PokemonId[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
    if(limit) listaParams.set('limit', `${limit}`);
    else listaParams.set('limit', `20`);
    if(offset) listaParams.set('offset', `${offset}`);
    setListaParams(listaParams);
    reqApi(Number(limit), Number(offset)); 
  },[])
  const reqApi = async (limitParam?: number, offsetParam?: number)=>{
    let res;
    if(limitParam && offsetParam){
      res = await Api.get(`/pokemon?limit=${limitParam}&offset=${offsetParam}`);
    } else if (limitParam){
      res = await Api.get(`/pokemon?$limit=${limitParam}`);
    } else {
      res = await Api.get(`/pokemon`);
    }
    setData(res);
    res.results.forEach((item: TypePokemon)=>{
      Api.get(`/pokemon/${item.name}`).then((res2: PokemonId)=>{
        setBasicInfo(e=>[...e, res2]);
      })
    })
    setLoading(false)
  }
  return({
    data,
    basicInfo,
    loading,
    reqApi,
    setListaParams,
    listaParams,
    setLoading,
    limit,
    offset    
  })
}
import { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom';
import { Api } from "../api";
import { Loading } from "../components/Loading";
import { ShowPokemon } from "../components/PokeCard/ShowPokemon";
import { PokemonId, TypePokemon, TypePokemonBase } from "../types/MainTypes";

export const Home = ()=>{
  const [data, setData] = useState<TypePokemonBase>();  
  const [basicInfo, setBasicInfo] = useState<PokemonId[]>([]);
  const [listaParams, setListaParams] = useSearchParams();  
  const limit = listaParams.get('limit');
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    reqApi(Number(limit)); 
    if(limit) listaParams.set('limit', `${limit}`);
    else listaParams.set('limit', `20`);
    setListaParams(listaParams);
  },[])
  const reqApi = async (limitParam?: number, offsetParam?: number)=>{
    let res;
    if(limitParam && offsetParam){
      res = await Api.get(`/pokemon?limit=${limitParam}&offset=${offsetParam}`);
      console.log(res);
    } else if (limitParam || offsetParam){
      res = await Api.get(`/pokemon?${limitParam && 'limit='+limitParam}${offsetParam && 'offset='+offsetParam}`);
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
  if(loading) return <Loading />
  return  (
    <div>
      {data && <>
      <ShowPokemon maxH="80vh" data={data} basicInfo={basicInfo} limit={limit} setListaParams={setListaParams} listaParams={listaParams} reqApi={reqApi}/>
      </>}
    </div>
  )
}
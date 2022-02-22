import { useEffect, useState } from "react";
import {useSearchParams, useNavigate} from 'react-router-dom';
import { Api } from "../api";
import { PokemonId, TypePokemon, TypePokemonBase } from "../types/MainTypes";
import { PokemonCard } from "../components/PokeCard/PokemonCard";
import * as S from "../components/PokeCard/PokeCardStyle";

export const Home = ()=>{
  const [data, setData] = useState<TypePokemonBase>();  
  const [basicInfo, setBasicInfo] = useState<PokemonId[]>([]);
  const [listaParams, setListaParams] = useSearchParams();
  const navigate = useNavigate();
  const limit = listaParams.get('limit');
  useEffect(()=>{
    reqApi(20); 
    listaParams.set('limit', '20');
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
  }
  return  (
    <div>
      {data && <>
      <p>Existem {data.count} pokémons cadastrados.</p>
      <S.PokeGrid>
      {data.results.map((item, index)=>{        
        let basicInfos = basicInfo.filter(e=>e.forms[0].name === item.name);
        let imgPoke: any = '';
        if(basicInfos){
          imgPoke = basicInfos[0]?.sprites.versions['generation-v']['black-white'].animated.front_default || basicInfos[0]?.sprites.front_default;       
        }        
        function goToPokemon(url: string){
          navigate(`/pokemon/${url}`);
        }
        return (
          <a key={index} href={item.name} onClick={(e)=>{
            e.preventDefault();
            goToPokemon(item.name)
          }}>
          <PokemonCard type={basicInfos[0]?.types[0].type.name} imgPoke={imgPoke} url={item.url} name={item.name} />
          </a>
        )
      }
      )}
      </S.PokeGrid>
      <S.PokeButton mg="20px 0 0 0" onClick={()=>{
        let teste = Number(limit) + 20;
        listaParams.set('limit', teste.toString());
        setListaParams(listaParams);
        reqApi(teste)
        }}>Ver mais pokemons</S.PokeButton>
      </>}
    </div>
  )
}
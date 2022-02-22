import { PokemonCard } from "./PokemonCard";
import * as S from "./PokeCardStyle";
import { PokemonId, TypePokemonBase } from "../../types/MainTypes";
import { useNavigate } from "react-router-dom";


type PropsType = {
  basicInfo: PokemonId[];
  data: TypePokemonBase;
  limit: string | null;
  listaParams: URLSearchParams;
  setListaParams: (listaParams: URLSearchParams) => void;
  reqApi: (limitParam?: number, offsetParam?: number) => void; 
  maxH?: string;
}

export const ShowPokemon = (props: PropsType)=>{
  const navigate = useNavigate();
  return (
    <>
          <p>Existem {props.data.count} pokémons cadastrados.</p>
      <S.PokeGrid maxH={props.maxH}>
      {props.data.results.map((item, index)=>{        
        let basicInfos = props.basicInfo.filter(e=>e.forms[0].name === item.name);
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
        let nParam = Number(props.limit) + 20;
        props.listaParams.set('limit', nParam.toString());
        props.setListaParams(props.listaParams);
        props.reqApi(nParam)
        }}>Ver mais pokemons</S.PokeButton>
      </>
  )
}
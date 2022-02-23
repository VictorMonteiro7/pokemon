import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from '../../contexts/Context'
import { PokemonCard } from './PokemonCard';
import * as S from './PokeCardStyle'
import { useReqData } from '../../hooks/useReqData';

export const PokeGrid = ()=>{
  const {state} = useContext(Context);
  const navigate = useNavigate();
  function goToPokemon(name: string | undefined){
    navigate(`/pokemon/${name}`);
  }
  return (
    <>
    <S.PokeGrid maxH='80vh'>
    {state.dataInfo.map((item, index)=>{                
      const name = item.forms && item.forms[0].name;
      const image = item.sprites && (item.sprites.animation || item.sprites.front_default );
        return (
          <a key={index} href={name} onClick={(e)=>{
            e.preventDefault();
            goToPokemon(name)
          }}>
            <PokemonCard type={item.types && item.types[0].type.name} imgPoke={image} url={name} name={name} />
          </a>
        )
      })}  
    </S.PokeGrid>
    
    </>
  )
}
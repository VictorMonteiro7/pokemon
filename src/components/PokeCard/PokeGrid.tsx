import {Dispatch, SetStateAction, useContext} from 'react'
import {Context} from '../../contexts/Context'
import { PokemonCard } from './PokemonCard';
import * as S from './PokeCardStyle'
import { Pokeball } from '../Loading/Pokeball';
import useGoToPokemon from '../GoToPokemon';
import { Loading } from '../Loading';

type PropsType = {
  modalOpen: Dispatch<SetStateAction<boolean>>,
  maxPoke: number;
}


export const PokeGrid = (props: PropsType)=>{
  const {state} = useContext(Context);
  const {GoToPokemon} = useGoToPokemon();
  if(state.maxPoke.maxPoke !== state.dataInfo.length && state.maxPoke.maxPoke !==  state.count.n) return <S.PokeGrid load={true} maxH="80vh">
    <Loading wt='100%' mg='0 auto' />
  </S.PokeGrid>;
  return (
    <>
    <Pokeball sm={true} mg="0 5px 0 0" wtpb="24px" htpb="24px" wt='100%' ht='24px' bd='0.5px solid #000'>{state.maxPoke.maxPoke} pokemons existentes.</Pokeball>
    <S.PokeGrid maxH='80vh'>
    {state.dataInfo.map((item, index)=>{             
      const name = item.forms && item.forms[0].name;
      const image = item.sprites && (item.sprites.animation || item.sprites.front_default);
        return (
          <a key={index} href={name} onClick={(e)=>{
            e.preventDefault();
            GoToPokemon(name)
            
            if(window.matchMedia('(max-width: 768px)').matches){
              props.modalOpen(true)
            }                        
          }}>
            <PokemonCard type={item.types && item.types[0].type.name} imgPoke={image} url={name} name={name} />
          </a>
        )
      })}  
    </S.PokeGrid>    
    </>
  )
}
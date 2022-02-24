import {useContext, useState} from 'react'
import {Context} from '../../contexts/Context'
import { PokemonCard } from './PokemonCard';
import * as S from './PokeCardStyle'
import { Api } from '../../api';
import { PokemonId, TypePokemonTypes } from '../../types/MainTypes';

export const PokeGrid = ()=>{
  const {state, dispatch} = useContext(Context);
  const [loading, setLoading] = useState(false);
  async function goToPokemon(name: string | undefined){    
      try{
        setLoading(true)
        const res: PokemonId = await Api.get(`/pokemon/${name}`); 
        const types: TypePokemonTypes = await Api.get(`/type/${res.types && res.types[0].type.name}`); 
        dispatch({
          type: 'SET_POKE_INFO',
          payload: {
            id: res.id,
            sprites:{
              front_default: res.sprites && res.sprites.front_default,
              animation: res.sprites && res.sprites.versions['generation-v']['black-white'].animated.front_default     
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
      } catch(e: any){
        throw new Error(e)
      } finally {
        setLoading(false)
      }
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
            const mobile = document.querySelector('.mobile');
            mobile && mobile.classList.add('active');
          }}>
            <PokemonCard type={item.types && item.types[0].type.name} imgPoke={image} url={name} name={name} />
          </a>
        )
      })}  
    </S.PokeGrid>    
    </>
  )
}
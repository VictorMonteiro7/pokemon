import { ChangeEvent, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { PokemonCard } from '../components/PokeCard/PokemonCard';
import { Loading } from '../components/Loading';
import { ModalContainer } from '../components/Modal';
import { Context } from '../contexts/Context';
import { useReqSinglePoke } from '../hooks/useReqSinglePoke';
import * as S from '../components/PokeCard/PokeCardStyle';
import { useParams } from 'react-router-dom';
import useGoToPokemon from '../components/GoToPokemon';

export const Pokemon = () => {
  const { id } = useParams();
  const {GoToPokemon} = useGoToPokemon();
  const {loading} = useReqSinglePoke({id: '1'});
   const navigate = useNavigate();  
  const {state} = useContext(Context);
 

  useEffect(()=>{
    if(!state.pokeInfo.id) {
      GoToPokemon(id);
    }
  },[])

  function fecharModal({target, currentTarget}: ChangeEvent<MouseEventInit>){
    if(target === currentTarget){
      navigate('/');
    }
  }

  if(loading) return <Loading/>
  return (
    <ModalContainer bg={`var(--${state.pokeInfo.types && state.pokeInfo.types[0].type.name})`} onClick={fecharModal}>
    <S.SinglePoke>
        <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={state.pokeInfo.sprites && (state.pokeInfo.sprites.animation || state.pokeInfo.sprites.front_default)} data={state.pokeInfo} />       
      <S.PokeButton onClick={fecharModal}>Voltar</S.PokeButton>
    </S.SinglePoke>
    </ModalContainer>
  )
}
import { ChangeEvent, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { PokemonCard } from '../components/PokeCard/PokemonCard';
import { Loading } from '../components/Loading';
import { ModalContainer } from '../components/Modal';
import { Context } from '../contexts/Context';
import { useReqSinglePoke } from '../hooks/useReqSinglePoke';
import * as S from '../components/PokeCard/PokeCardStyle';

export const Pokemon = () => {
  const {data, loading} = useReqSinglePoke();
   const navigate = useNavigate();  
  const {state} = useContext(Context);
  const animated = state.pokeInfo.sprites?.animation;
 
  function fecharModal({target, currentTarget}: ChangeEvent<MouseEventInit>){
    if(target === currentTarget){
      navigate(-1);
    }
  }

  if(loading) return <Loading/>
  return (
    <ModalContainer bg={`var(--${data?.types[0].type.name})`} onClick={fecharModal}>
    <S.SinglePoke>
      {data && <>    
        <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={animated || state.pokeInfo.sprites?.front_default} data={data} />
      </>
      }      
      <S.PokeButton onClick={()=>navigate(-1)}>Voltar</S.PokeButton>
    </S.SinglePoke>
    </ModalContainer>
  )
}
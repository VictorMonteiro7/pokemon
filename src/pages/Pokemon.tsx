import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Api } from '../api';
import { PokemonCard } from '../components/PokeCard/PokemonCard';
import { PokemonId } from '../types/MainTypes';
import * as S from '../components/PokeCard/PokeCardStyle';

export const Pokemon = () => {
  const {id} = useParams();
  const [data, setData] = useState<PokemonId>();
  const navigate = useNavigate();
  const animated = data?.sprites.versions['generation-v']['black-white'].animated.front_default
  useEffect(()=>{
    getPokeInfo();
  },[])

  async function getPokeInfo(){
    try{
      const res = await Api.get(`/pokemon/${id}`);    
      setData(res);      
    } catch(e){
      navigate('/');
    }
  }
   
  return (
    <S.SinglePoke>
      {data && <>         
        <PokemonCard hImg='120px' wImg='120px' name={data.forms[0].name} imgPoke={animated ? animated : data.sprites.front_default} data={data} />
      </>
      }
      <S.PokeButton onClick={()=>navigate(-1)}>Voltar</S.PokeButton>
    </S.SinglePoke>
  )
}
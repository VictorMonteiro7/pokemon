import { useContext, useState} from 'react';
import { Loading } from "../components/Loading";
import { useReqData} from '../hooks/useReqData'
import {Context} from '../contexts/Context'
import { PokeGrid } from '../components/PokeCard/PokeGrid';
import * as S from '../components/PokeCard/PokeCardStyle';
import { PokemonCard } from '../components/PokeCard/PokemonCard';
import { ModalContainer } from '../components/Modal';

export const Home = ()=>{  
  const {loading, offset, limit, setListaParams, listaParams, reqApi, loadingBtn, setLoadingBtn, maxpPoke} = useReqData();  
  const {state, dispatch} = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  if(loading) return <Loading />
  function fecharModal({target, currentTarget}: any){    
    if(target === currentTarget){
        setModalOpen(false);
    }
  }
  return  (
    <>
    <div className="container">
      <div className="containerLeft">
      <PokeGrid modalOpen={setModalOpen} maxPoke={maxpPoke} />
   <S.PokeButton mg="20px 0 0 0" disabled={loadingBtn} onClick={()=>{
        setLoadingBtn(true);
        let nParam = Number(limit) + 20;
        listaParams.set('limit', nParam.toString());
        setListaParams(listaParams);
        reqApi(nParam, Number(offset));
        }}>{loadingBtn ? 'Carregando Infos' : 'Ver mais pokemons'}</S.PokeButton>
      <S.PokeButton mg="20px 0 0 10px" disabled={loadingBtn} onClick={()=>{
        listaParams.set('order', 'id');
        setListaParams(listaParams);
        dispatch({
          type: 'ORDER_DATA',
          payload: {
            order: 'id',
          }
        })
      }}>{loadingBtn ? 'Carregando Infos' : 'ID Order'}</S.PokeButton>
      <S.PokeButton mg="20px 10px 0 10px" disabled={loadingBtn} onClick={()=>{
        listaParams.set('order', 'asc');
        setListaParams(listaParams);
        dispatch({
          type: 'ORDER_DATA',
          payload: {
            order: 'asc',
          }
        })
      }}>{loadingBtn ? 'Carregando Infos' : 'ASC Order'}</S.PokeButton>
      <S.PokeButton mg="20px 0 0 0" disabled={loadingBtn} onClick={()=>{
        listaParams.set('order', 'desc');
        setListaParams(listaParams);
        dispatch({
          type: 'ORDER_DATA',
          payload: {
            order: 'desc',
          }
        })
      }}>{loadingBtn ? 'Carregando Infos' : 'DESC Order'}</S.PokeButton>
      {/* <List/> */}
      </div>
      {state.pokeInfo.id && 
      <div className="containerRight desktop">
        <S.SinglePoke>
          <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={state.pokeInfo.sprites?.animation || state.pokeInfo.sprites?.front_default} data={state.pokeInfo} />
        </S.SinglePoke>
      </div>}      
      {modalOpen && 
        <ModalContainer className="mobile" bg={`var(--${state.pokeInfo.types && state.pokeInfo.types[0].type.name})`} onClick={fecharModal}>        
        <S.SinglePoke>
            <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={state.pokeInfo.sprites && (state.pokeInfo.sprites.animation || state.pokeInfo.sprites.front_default)} data={state.pokeInfo} />             
        </S.SinglePoke>
        </ModalContainer>
      }      
    </div>
  
      </>    
  )
}
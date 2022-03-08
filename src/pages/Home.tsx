import { useContext, useEffect, useState} from 'react';
import { Loading } from "../components/Loading";
import useReqData from '../hooks/useReqData'
import {Context} from '../contexts/Context'
import { PokeGrid } from '../components/PokeCard/PokeGrid';
import * as S from '../components/PokeCard/PokeCardStyle';
import { PokemonCard } from '../components/PokeCard/PokemonCard';
import { ModalContainer } from '../components/Modal';
import { ActionButton } from '../components/Buttons/ActionButton';
import { Search } from '../components/Search';
import {ButtonArea} from '../components/Buttons/StyleButtons'
import { List } from '../components/List';
import useGetPokeTypes from '../hooks/useGetPokeTypes';


export const Home = ()=>{  
  const {loading, offset, order, type, limit, setListaParams, listaParams, reqApi, loadingBtn, setLoadingBtn} = useReqData();
  const {state} = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPoke, setShowPoke] = useState(false);
  const {setTypePoke} = useGetPokeTypes()
  useEffect(()=>{
    if(state.pokeInfo.id){
      setShowPoke(false);
      setTimeout(()=>{
        setShowPoke(true)
      })
    }
  },[state.pokeInfo.id])

  useEffect(()=>{
    if(!(type && (order && order === 'type'))){
      if(limit && Number(limit) >= 20) listaParams.set('limit', `${limit}`);
      else listaParams.set('limit', `20`);
      if(offset) listaParams.set('offset', `${offset}`);
      listaParams.set('order', 'id');
      setListaParams(listaParams);
      reqApi();
    } else {
      if(order) listaParams.set('order', `${order}`);
      if(type) listaParams.set('type', `${type}`);
      setListaParams(listaParams);
      setTypePoke(type);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


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
      <List/>
    <ButtonArea hasType={!!type}>
    {!type && 
    <S.PokeButton disabled={loadingBtn} onClick={()=>{
        setLoadingBtn(true);
        let nParam = Number(limit) + 20;
        listaParams.set('limit', nParam.toString());
        setListaParams(listaParams);
        reqApi(nParam, Number(offset));
        }}>{loadingBtn ? 'Carregando Infos' : 'Ver mais pokemons'}</S.PokeButton>
    }
    <ActionButton loadingBtn={loadingBtn} order='id'>ID</ActionButton>
    <ActionButton  loadingBtn={loadingBtn} order='asc'>A - Z</ActionButton>
    <ActionButton loadingBtn={loadingBtn} order='desc'>Z - A</ActionButton>
    </ButtonArea>
      <div className='mobile'><Search setModal={setModalOpen}/></div>      
      <PokeGrid modalOpen={setModalOpen} maxPoke={Number(state.maxPoke.maxPoke)} />
      </div>
      <div className="containerRight desktop">
      <Search/>
      {state.pokeInfo.id && showPoke &&       
        <S.SinglePoke>
          <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={state.pokeInfo.sprites?.animation || state.pokeInfo.sprites?.front_default} data={state.pokeInfo} />
        </S.SinglePoke>        
      }
      </div>
      {modalOpen && 
        <ModalContainer bg={`var(--${state.pokeInfo.types && state.pokeInfo.types[0].type.name})`} onClick={fecharModal}>        
        <S.SinglePoke>
            <PokemonCard  hImg='120px' wImg='120px' name={state.pokeInfo.forms && state.pokeInfo.forms[0].name} imgPoke={state.pokeInfo.sprites && (state.pokeInfo.sprites.animation || state.pokeInfo.sprites.front_default)} data={state.pokeInfo} />             
        </S.SinglePoke>
        </ModalContainer>
      }      
    </div>
      </>    
  )
}
import {useContext} from 'react';
import { Loading } from "../components/Loading";
import { useReqData} from '../hooks/useReqData'
import {Context} from '../contexts/Context'
import { PokeGrid } from '../components/PokeCard/PokeGrid';
import * as S from '../components/PokeCard/PokeCardStyle';

export const Home = ()=>{  
  const {loading, offset, limit, setListaParams, listaParams, reqApi, loadingBtn, setLoadingBtn} = useReqData();  
  const {dispatch} = useContext(Context);
  if(loading) return <Loading />
  return  (
    <>
    <PokeGrid />
   <S.PokeButton mg="20px 0 0 0" disabled={loadingBtn} onClick={()=>{
        setLoadingBtn(true);
        let nParam = Number(limit) + 20;
        listaParams.set('limit', nParam.toString());
        setListaParams(listaParams);
        reqApi(nParam, Number(offset));
        }}>{loadingBtn ? 'Carregando Infos' : 'Ver mais pokemons'}</S.PokeButton>
      <S.PokeButton mg="20px 0 0 0" disabled={loadingBtn} onClick={()=>{
        listaParams.set('order', 'id');
        setListaParams(listaParams);
        dispatch({
          type: 'ORDER_DATA',
          payload: {
            order: 'id',
          }
        })
      }}>{loadingBtn ? 'Carregando Infos' : 'Ordernar por nome'}</S.PokeButton>
      </>    
  )
}
import { useSearchParams } from 'react-router-dom';
import * as S from '../../components/PokeCard/PokeCardStyle';
import {useContext} from 'react';
import {Context} from '../../contexts/Context';
type PropsButtonType = {
  order: 'id' | 'asc' | 'desc' |  'name';
  loadingBtn: boolean;
  children: string;
  mg?: string;
}

export const ActionButton = (props: PropsButtonType)=> {
  const {dispatch} = useContext(Context);
  return (
<S.PokeButton mg={props.mg} disabled={props.loadingBtn} onClick={()=>{
        dispatch({
          type: 'ORDER_DATA',
          payload: {
            order: `${props.order}`,
          }
        })
      }}>{props.loadingBtn ? 'Carregando Infos' : `${props.children}`}</S.PokeButton>
  )
}
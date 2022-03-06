import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Api } from "../api";
import { Context } from "../contexts/Context";
import useReqData from "./useReqData";

const useGetPokeTypes = ()=>{
  const {state, dispatch} = useContext(Context);
  const [types, setTypes] = useState<any[]>([]);  
  const [liValue, setLiValue] = useState('');
  const [paraValue, setParamValue] = useSearchParams();
  const order = paraValue.get('order');
  const {reqApi} = useReqData();
  const navigate = useNavigate()


  async function getTypes(){
    const res = await Api.get('/type');
    let arr: any[] = [];
    res.results.forEach((e: any)=> {
      if(e.name !== 'unknown' && e.name !== 'shadow')
        arr = [...arr, e.name]
    });
    setTypes(arr);
  }

  async function setTypePoke(type?: string){ 
    console.log(paraValue.get('type'))
    if(paraValue.get('type') && paraValue.get('type') !== 'all'){
      dispatch({type: 'RESET'});
      const res = await Api.get(`/type/${type}`);
      res.pokemon.map(async (item: any)=>{
        const res2 = await Api.get(`/pokemon/${item.pokemon.name}`);
        const dados = {
          id: res2.id,
          abilities: res2.abilities,
          forms: res2.forms,
          stats: res2.stats,
          sprites: {
            front_default: res2.sprites.other.home.front_default || res2.sprites.other['official-artwork'].front_default || res2.sprites.front_default ||  res2.sprites.other.home.front_default || res2.sprites.other['official-artwork'].front_default || res2.sprites.versions['generation-viii'].icons.front_default || res2.sprites.front_default,
            animation: res2.sprites.versions['generation-v']['black-white'].animated.front_default
          },
          types: res2.types,
          typeWaS: res.damage_relations
        }

        if(state.dataInfo.length === 0){
          dispatch({
            type: 'SET_DATA_INFO',
            payload: dados
          })
        }
        else {
          dispatch({type: 'SET_TYPE_INFO', payload: dados });
          dispatch({type: 'ORDER_DATA', payload: {order: order, type: liValue}});
        }
        dispatch({type: 'SET_MAX_POKE', payload: {
          maxPoke: res.pokemon.length
        }});
      })
    } 
    if(type === 'all'){
      paraValue.set('order', 'id');
      paraValue.delete('type');
      paraValue.set('limit', '20');
      setParamValue(paraValue);
      reqApi();
    }
  }
  return ({
    types,
    setTypePoke,
    getTypes,
    liValue,
    setLiValue,
    paraValue,
    setParamValue,
  })
}
export default useGetPokeTypes;
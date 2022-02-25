import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Api } from "../api";
import { Context } from "../contexts/Context";

const useGetPokeTypes = ()=>{
  const {dispatch} = useContext(Context);
  const [types, setTypes] = useState<any[]>([]);  
  const [liValue, setLiValue] = useState('');
  const [paraValue, setParamValue] = useSearchParams();
  const order = paraValue.get('order');
  const [loading, setLoading] = useState(false);
  async function getTypes(){
    const res = await Api.get('/type');
    let arr: any[] = [];
    res.results.map((e: any)=> arr = [...arr, e.name]);
    setTypes(arr);
  }

  async function setTypePoke(type?: string){
    setLoading(true);
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
      dispatch({type: 'SET_TYPE_INFO', payload: dados });
      dispatch({type: 'ORDER_DATA', payload: {order: order, type: liValue}});
      dispatch({type: 'SET_MAX_POKE', payload: {
        maxPoke: res.pokemon.length
      }});
    })
  }
  return ({
    types,
    setTypePoke,
    getTypes,
    liValue,
    setLiValue,
    paraValue,
    setParamValue,
    setLoading
  })
}
export default useGetPokeTypes;
import { ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetPokeTypes from "../../hooks/useGetPokeTypes";
import useReqData from "../../hooks/useReqData";
import { ListStyle } from "./Style";

export const List = ()=>{
  const {reqApi} = useReqData();
  const navigate = useNavigate();
  const {liValue, paraValue, setParamValue, getTypes, types, setTypePoke, setLiValue} = useGetPokeTypes();
  useEffect(()=>{    
    paraValue.delete('limit');
    if(((liValue !== 'all' || '' || null || undefined) && liValue.length > 0)){
      paraValue.set('order', 'type');
      paraValue.set('type', liValue);
      setParamValue(paraValue)
      setTypePoke(liValue);
    } else {
      paraValue.delete('type');
      paraValue.delete('order');
      paraValue.set('limit', '20');
      paraValue.set('order', 'id')
      setParamValue(paraValue)
      reqApi();
    }
  },[liValue])

  useEffect(()=>{
    if(types.length < 1)
    getTypes();
  },[])

  const handleChangeOption = (e: ChangeEvent<HTMLSelectElement>)=>{
    setLiValue(e.target.value);
  }
  return (
    <ListStyle onChange={handleChangeOption} value={liValue}>
      <option disabled value="">Selecione um tipo</option>
      <option value="all">Todos</option>
      {types.map(((e: string, index: any)=> <option key={index} value={e}>{e}</option>))}
    </ListStyle>
  )
}
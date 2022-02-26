import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPokeTypes from "../../hooks/useGetPokeTypes";
import useReqData from "../../hooks/useReqData";
import { ListStyle } from "./Style";

export const List = ()=>{
  const {reqApi} = useReqData();
  const [open, setOpen] = useState(false);
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
  
  const handleChangeOption = (e: any)=>{
    setLiValue(e.target.dataset.value);
    setOpen(false)
  }
  return (
    <ListStyle>
      <li onClick={()=>setOpen(!open)}>Selecione um tipo</li>
      {open && <ul>
      <li onClick={handleChangeOption} data-value='all'>Todos</li>
      {types.map(((e: string, index: any)=> <li onClick={handleChangeOption} data-value={e} key={index}>{e}</li>))}
      </ul> }
    </ListStyle>
  )
}
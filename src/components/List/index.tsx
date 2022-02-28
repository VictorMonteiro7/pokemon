import {useEffect, useState } from "react";
import useGetPokeTypes from "../../hooks/useGetPokeTypes";
import { ListStyle } from "./Style";

export const List = ()=>{
  const [open, setOpen] = useState(false);
  const {liValue, paraValue, setParamValue, getTypes, types, setTypePoke, setLiValue} = useGetPokeTypes();
  useEffect(()=>{
    paraValue.delete('limit');
    paraValue.set('order', 'type');
    paraValue.set('type', liValue);
    setParamValue(paraValue);
    setTypePoke(liValue);
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
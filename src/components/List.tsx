import { ChangeEvent, useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import { Api } from "../api";

export const List = ()=>{
  const [liValue, setLiValue] = useState('');
  const [types, setTypes] = useState<any[]>([]);  
  const [paraValue, setParamValue] = useSearchParams();
  const order = paraValue.get('order');
  const type = paraValue.get('type');
  useEffect(()=>{
    (async function getTypes(){
      const res = await Api.get('/type');   
      setTypes(res.results);
    })()
  },[])
  useEffect(()=>{
    if(liValue !== "all"){
      paraValue.set('order', 'type')
     paraValue.set('type', `${liValue}`);
     setParamValue(paraValue);
     if((order && order === 'type') && (type)){
      console.log('teste')
     }
  }},[])
  const handleChangeOption = (e: ChangeEvent<HTMLSelectElement>)=>{
    setLiValue(e.target.value);
  }
  return (
    <select onChange={handleChangeOption} value={liValue}>
      <option value="all">Todos</option>
      {types.map((item, index)=>{
        return (
          <option key={index} value={item.name}>{item.name}</option>
        )
      }
      )}
    </select>
    // <select onChange={handleChangeOption}>
    //   {types.map((item: any, index: any)=>(
    //     <option value={liValue} key={index}>
    //       {item}
    //     </option>
    //   ))}
    // </select>
  )
}
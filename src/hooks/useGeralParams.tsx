import {useSearchParams} from 'react-router-dom'

type PropsParams =  {
  chave: string;
  valor: string;
}

export const useGeralParams = (props:PropsParams)=>{
  const [listaParams, setListaParams] = useSearchParams();
  const {chave, valor} = props;
  const chaveParam = listaParams.get(chave);
  const valorParam = listaParams.get(valor);
  if(chaveParam && valorParam){
    listaParams.set(chave, `${chaveParam}`);
    listaParams.set(valor, `${valorParam}`);   
  }
  return  setListaParams(listaParams);
}
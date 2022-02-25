import {useSearchParams} from 'react-router-dom'

type PropsParams =  {
  chave: string;
  valor: string;
}

const useGeralParams = (props:PropsParams)=>{
  const [listaParams, setListaParams] = useSearchParams();
  const {chave, valor} = props;
  const chaveParam = listaParams.get(chave);
  const valorParam = listaParams.get(valor);
  if(chaveParam && valorParam){
    setValues();
  }
  function setValues(){
    listaParams.set(chave, `${chaveParam}`);
    listaParams.set(valor, `${valorParam}`);  
  }
  return {setValues}
}

export default useGeralParams;

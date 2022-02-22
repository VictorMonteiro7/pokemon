import {useContext} from 'react';
import { Loading } from "../components/Loading";
import { useReqData} from '../hooks/useReqData'
import {Context} from '../contexts/Context'
import {PokemonCard} from '../components/PokeCard/PokemonCard'
import {ShowPokemon} from '../components/PokeCard/ShowPokemon'


export const Home = ()=>{  
  const {data, loading, basicInfo, offset, limit, setListaParams, listaParams, reqApi} = useReqData();
  const {state} = useContext(Context)
  if(loading) return <Loading />
  return  (
    <div style={{padding: '0 0 50px 0'}}>
      {data && <div className="container">
        <div className="containerLeft">
        <ShowPokemon offset={offset} maxH="80vh" data={data} basicInfo={basicInfo} limit={limit} setListaParams={setListaParams} listaParams={listaParams} reqApi={reqApi}/>
        </div>
        {state.pokeInfo.id && 
          <div className="containerRight">
          {state.pokeInfo.forms && <p>{state.pokeInfo.forms[0].name}</p>}
          <PokemonCard hImg='400px' wImg='400px' bg="#ccc" imgPoke={state.pokeInfo.sprites?.animation || state.pokeInfo.sprites?.front_default}/>
            </div>
        }
      </div>}
    </div>
  )
}
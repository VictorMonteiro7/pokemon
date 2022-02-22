import {Pokeball} from './Pokeball'
import {PropsPokeballType} from './Style'
export const Loading = (props:PropsPokeballType)=>{
    return (
      <Pokeball wt={props.wt} ht={props.ht} bd={props.bd} an={true}>Loading...</Pokeball>
    )
}
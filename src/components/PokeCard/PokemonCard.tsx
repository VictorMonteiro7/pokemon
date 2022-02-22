import { ChangeEvent } from "react";
import { PokemonId } from "../../types/MainTypes";
import * as S from "./PokeCardStyle";

type PropsType = {
  url?: string;
  imgPoke?: any;
  name?: string;
  data?: PokemonId;
  type?: string;
  wImg?: string;
  hImg?: string;
}

export const PokemonCard = (props: PropsType)=>{
  function loadImg({target}:ChangeEvent<HTMLImageElement>){
    target.classList.remove('skeleton')
  }
  return (
    <div>
      <h3>{props.name} <span>#{props.data?.id}</span></h3>
      <S.PokeImgStyle w={props.wImg} h={props.hImg} className="skeleton" onLoad={loadImg} src={props.imgPoke} alt={props.name} />          
      {props.type && <p className={`type ${props.type}`}>{props.type}</p>}
      {props.data && <>
        <div className="types">
        {props.data.types.length > 1 ? props.data.types.map((item:any)=>{
          return <p className={`type ${item.type.name}`} key={item.type.name}
          >{item.type.name}</p>
        }) : <p className={`type ${props.data.types[0].type.name}`}>{props.data.types[0].type.name}</p>}
        </div>
        <div className="status">
          {props.data.stats.map((stat:any)=>{
            return <S.StatusPoke wBf={stat.base_stat}>
              <p key={stat.stat.name}>{stat.stat.name.replace('-', ' ')}
              <span aria-label={stat.base_stat}>
              </span>
              </p>
              </S.StatusPoke>
            })
          }
        </div>
        <div className="abilities">
        {props.data.abilities.map((item, index)=>{
          return <p key={index}>{item.ability.name}</p>
        })}
        </div>
      </>}
    </div>
  )
}
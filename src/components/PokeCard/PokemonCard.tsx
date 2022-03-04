import { ChangeEvent} from "react";
import { PokeBasicInfo} from "../../types/MainTypes";
import * as S from "./PokeCardStyle";

type PropsType = {
  url?: string;
  imgPoke?: any;
  name?: string;
  data?: PokeBasicInfo;
  type?: string[];
  wImg?: string;
  hImg?: string;
  sm?: boolean;
  bg?: string;
}

export const PokemonCard = (props: PropsType)=>{
  function loadImg({target}:ChangeEvent<HTMLImageElement>){
    target.classList.remove('skeleton')
  }
  return (
    <div>
      <h3>{props.name} {props.data?.id && <span>#{props.data.id}</span>}</h3>
      <div className="imgArea">
      <S.PokeImgStyle w={props.wImg} h={props.hImg} className="skeleton" onLoad={loadImg} src={props.imgPoke} alt={props.name} />      
      <div className="type">{props.type && props.type.map(item=><p key={item} className={`type ${item}`}>{item}</p>)}</div>
      </div>
      {props.data && <>
        <div className="types">
        {props.data.types && props.data.types.map((item, index)=><p key={index} className={`type ${item.type.name}`}>{item.type.name}</p>)}
        </div>

        <div className="conj mobile">
          <div>
            <h3>Abilities</h3>
            <ul className="abilities">
            {props.data.abilities && props.data.abilities.map((item: any, index: any)=>{
              return <li style={{top: `${index}00%`}} className={`${props.data && props.data.abilities && props.data.abilities.length > 1 && 'more'}`} key={index}>{item.ability.name}</li>
            })}
            </ul>
          </div>
          {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_to.length > 0 &&           
            <div>
              <h3>D.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.double_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_from.length > 0 &&           
            <div>
              <h3>D.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.double_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_from.length > 0 &&           
            <div>
              <h3>H.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.half_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }          
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_to.length > 0 &&           
            <div>
              <h3>H.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.half_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }                
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_to.length > 0 &&           
            <div>
              <h3>N.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.no_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }         
          {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_from.length > 0 &&           
            <div>
              <h3>N.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.no_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }                         
        </div>

        <div className="status">
          {props.data.stats && props.data.stats.map((stat:any)=>{
            return <S.StatusPoke key={stat.stat.name} wBf={stat.base_stat}>
              <p>{stat.stat.name.replace('-', ' ').replace('special', 'sp.')}
              </p>
              <div aria-label={stat.base_stat}>
              </div>
              </S.StatusPoke>
            })
          }
        </div>
        <div className="conj desktop">
          <div>
            <h3>Abilities</h3>
            <ul className="abilities">
            {props.data.abilities && props.data.abilities.map((item: any, index: any)=>{
              return <li style={{top: `${index}00%`}} className={`${props.data && props.data.abilities && props.data.abilities.length > 1 && 'more'}`} key={index}>{item.ability.name}</li>
            })}
            </ul>
          </div>
          {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_to.length > 0 &&           
            <div>
              <h3>D.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.double_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_from.length > 0 &&           
            <div>
              <h3>D.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.double_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.double_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_from.length > 0 &&           
            <div>
              <h3>H.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.half_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }          
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_to.length > 0 &&           
            <div>
              <h3>H.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.half_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.half_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }                
           {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_to.length > 0 &&           
            <div>
              <h3>N.D.T</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.no_damage_to.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_to.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }         
          {props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_from.length > 0 &&           
            <div>
              <h3>N.D.F</h3>
              <ul className="abilities">
                {props.data.typeWaS && props.data.typeWaS.damage_relations?.no_damage_from.map((item: any, index: any)=>{
                  return <li className={`${props.data && props.data.typeWaS && props.data.typeWaS.damage_relations && props.data.typeWaS.damage_relations.no_damage_from.length > 1 && 'more'}`} style={{top: `${index}00%`}} key={index}>{item.name}</li>
                })}
              </ul>
            </div>
          }                         
        </div>
      </>}
    </div>
  )
}
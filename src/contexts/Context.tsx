import { createContext, useReducer } from "react";
import { PokeBasicInfo } from "../types/MainTypes";
import {PokeInitialState, PokeReducer, PokeDataReducer, DataInitialState, MaxPokeInitialState, MaxPokemonReducer, MaxPokeType, CountReducer} from '../reducers/PokeReducer';
import { ActionReducerType } from "../types/ActionReducerType";

type initialStateType = {
  pokeInfo: PokeBasicInfo;
  dataInfo: PokeBasicInfo[];
  maxPoke: MaxPokeType;
  count: {n: number};
}
type contextType = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
}

const initialState = {
    pokeInfo: PokeInitialState,
    dataInfo: DataInitialState,
    maxPoke: MaxPokeInitialState,
    count:  {n: 0}
}

export const Context = createContext<contextType>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (state: initialStateType , action: ActionReducerType) => ({
  pokeInfo: PokeReducer(state.pokeInfo, action),
  dataInfo: PokeDataReducer(state.dataInfo, action),
  maxPoke: MaxPokemonReducer(state.maxPoke, action),
  count: CountReducer(state.count, action)
})

export const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)
  return (
    <Context.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </Context.Provider>     
  )
}
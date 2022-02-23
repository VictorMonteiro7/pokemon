import { createContext, useReducer } from "react";
import { PokeBasicInfo } from "../types/MainTypes";
import {PokeInitialState, PokeReducer, PokeDataReducer, DataInitialState} from '../reducers/PokeReducer';
import { ActionReducerType } from "../types/ActionReducerType";

type initialStateType = {
  pokeInfo: PokeBasicInfo;
  dataInfo: PokeBasicInfo[];
}
type contextType = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
}

const initialState = {
    pokeInfo: PokeInitialState,
    dataInfo: DataInitialState
}

export const Context = createContext<contextType>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (state: initialStateType , action: ActionReducerType) => ({
  pokeInfo: PokeReducer(state.pokeInfo, action),
  dataInfo: PokeDataReducer(state.dataInfo, action)
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
import { createContext, useContext, useReducer } from "react";
import { PokeBasicInfo } from "../types/MainTypes";
import {PokeInitialState, PokeReducer} from '../reducers/PokeReducer';
import { ActionReducerType } from "../types/ActionReducerType";

type initialStateType = {
  pokeInfo: PokeBasicInfo;
}
type contextType = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
}

const initialState = {
    pokeInfo: PokeInitialState
}

export const Context = createContext<contextType>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (state: initialStateType , action: ActionReducerType) => ({
  pokeInfo: PokeReducer(state.pokeInfo, action)
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
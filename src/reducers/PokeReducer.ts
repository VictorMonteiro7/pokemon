import { ActionReducerType } from "./../types/ActionReducerType";
import { PokeBasicInfo } from "../types/MainTypes";

export const PokeInitialState: PokeBasicInfo = {};

export const PokeReducer = (
  state: PokeBasicInfo,
  action: ActionReducerType
) => {
  switch (action.type) {
    case "SET_POKE_INFO":
      return { ...state, ...action.payload };
      break;
  }
  return state;
};

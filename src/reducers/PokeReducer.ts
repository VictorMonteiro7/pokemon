import { ActionReducerType } from "./../types/ActionReducerType";
import { PokeBasicInfo } from "../types/MainTypes";

export const PokeInitialState: PokeBasicInfo = {};
export const DataInitialState: PokeBasicInfo[] = [];

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
export const PokeDataReducer = (
  state: PokeBasicInfo[],
  action: ActionReducerType
) => {
  switch (action.type) {
    case "SET_DATA_INFO":
      return [...state, action.payload];
      break;
    case "ADD_DATA_INFO":
      const newState = [...state];
      newState.push(action.payload);
      return newState;
      break;
    case "ORDER_DATA":
      if (action.payload.order === "asc") {
        let newStateName = [...state];
        newStateName = newStateName.sort((a, b) => {
          const nomeA = a.forms;
          const nomeB = b.forms;
          return nomeA && nomeB && nomeA[0].name > nomeB[0].name ? 1 : -1;
        });
        return newStateName;
      }
      if (action.payload.order === "desc") {
        let newStateName = [...state];
        newStateName = newStateName.sort((a, b) => {
          const nomeA = a.forms;
          const nomeB = b.forms;
          return nomeA && nomeB && nomeA[0].name < nomeB[0].name ? 1 : -1;
        });
        return newStateName;
      }
      if (action.payload.order === "id") {
        let newStateName = [...state];
        newStateName = newStateName.sort((a, b) => {
          const idA = a.id;
          const idB = b.id;
          return idA && idB && idA > idB ? 1 : -1;
        });
        return newStateName;
      }
      if (action.payload.order === "type") {
        let newStateName = [...state];
        newStateName = newStateName.filter((a) => {
          const idA = a.types;
          if (idA) {
            if (idA[0].type.name === action.payload.type)
              return idA && idA[0].type.name;
          }
        });
        return newStateName;
      }
      break;
  }
  return state;
};

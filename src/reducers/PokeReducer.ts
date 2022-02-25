import { ActionReducerType } from "./../types/ActionReducerType";
import { PokeBasicInfo } from "../types/MainTypes";

export type MaxPokeType = {
  maxPoke?: number;
};

export const PokeInitialState: PokeBasicInfo = {};
export const DataInitialState: PokeBasicInfo[] = [];
export const MaxPokeInitialState: MaxPokeType = {};
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
    case "SET_TYPE_INFO":
      state = DataInitialState;
      let newTypeState = DataInitialState;
      const pokeInfo = newTypeState.find((e) => e.id === action.payload.id);
      if (!pokeInfo) {
        newTypeState.filter((e) => e.id);
        newTypeState.push(action.payload);
      }
      return newTypeState;
      break;
    case "ADD_DATA_INFO":
      const newState = [...state];
      newState.push(action.payload);
      return newState;
      break;
    case "RESET":
      return DataInitialState;
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
            return idA.find((e) => e.type.name === action.payload.type);
          }
          return idA;
        });
        return newStateName;
      }
      break;
  }
  return state;
};

export const MaxPokemonReducer = (
  state: MaxPokeType,
  action: ActionReducerType
) => {
  switch (action.type) {
    case "SET_MAX_POKE":
      return { ...state, ...action.payload };
      break;
  }
  return state;
};

export const CountReducer = (
  state: { n: number },
  action: ActionReducerType
) => {
  switch (action.type) {
    case "SET_COUNT":
      return { ...state, ...action.payload };
      break;
  }
  return state;
};

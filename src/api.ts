import axios from "axios";
axios.defaults.baseURL = "https://pokeapi.co/api/v2";

export const Api = {
  get: async (endpoint: string) => {
    const res = await axios.get(endpoint);
    return res.data;
  },
};

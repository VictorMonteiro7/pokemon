export type TypePokemonBase = {
  count: number;
  next: string;
  previous: string | null;
  results: TypePokemon[];
};

export type TypePokemon = {
  name: string;
  url: string;
};

export type TypeSprites = {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
};

export type PokemonId = {
  abilities: {
    ability: TypePokemon;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: TypePokemon[];
  game_indices: {
    game_index: number;
    version: TypePokemon;
  }[];
  height: number;
  held_items: {
    item: TypePokemon;
    version_details: {
      rarity: number;
      version: TypePokemon;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: TypePokemon;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: TypePokemon;
      version_group: TypePokemon;
    }[];
  }[];
  name: string;
  order: number;
  past_types?: TypePokemon[];
  species: TypePokemon;
  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      dream_world: TypeSprites;
      home: TypeSprites;
      "official-artwork": TypeSprites;
    };
    versions: {
      [key: string]: {
        [key: string]: {
          animated: TypeSprites;
        };
      };
    };
  };
  stats: {
    base_stats: number;
    effort: number;
    stat: TypePokemon;
  }[];
  types: {
    slot: number;
    type: TypePokemon;
  }[];
  weight: number;
};

export type PokeBasicInfo = {
  id: number;
  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      dream_world: TypeSprites;
      home: TypeSprites;
      "official-artwork": TypeSprites;
    };
    versions: {
      [key: string]: {
        [key: string]: {
          animated: TypeSprites;
        };
      };
    };
  };
  forms: TypePokemon[];
  types: {
    slot: number;
    type: TypePokemon;
  }[];
};

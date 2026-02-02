export type NamedResource = { // se requiere para enlaces a otros recursos
  name: string;
  url: string;
};

export type PokemonListResponse = { // para la lista de pokemons y la posible paginación
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedResource[];
};

export type PokemonListItem = NamedResource & { // cuando se necesita hacer un enlace a un pokemon específico
  id?: number;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number; // decímetros (1 = 0,1 m)
  weight: number; // hectogramos (1 = 0,1 kg)
  order: number;
  is_default: boolean;
  abilities: Array<{ ability: NamedResource; is_hidden: boolean; slot: number }>;
  moves: Array<{ move: NamedResource }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  types: Array<{ slot: number; type: NamedResource }>;
};

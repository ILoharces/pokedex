import type { NamedResource } from "./PokemonUtils";

export interface Pokemon {
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

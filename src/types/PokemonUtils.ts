export interface NamedResource{ // se requiere para enlaces a otros recursos
    name: string;
    url: string;
};

export interface PokemonListResponse{ // para la lista de pokemons y la posible paginación
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedResource[];
};

export interface PokemonListItem extends NamedResource{ // cuando se necesita hacer un enlace a un pokemon específico
    id?: number;
};


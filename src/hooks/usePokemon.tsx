import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/Pokemon';
import type { PokemonListResponse } from '../types/PokemonUtils';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[] | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    fetchAllPokemon();
  }, []);
  const fetchAllPokemon = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`
      );
      const data: PokemonListResponse = await res.json();
      const pokemonResponses = await Promise.all(
        data.results.map((item) => fetch(item.url).then((r) => r.json() as Promise<Pokemon>)) as Promise<Pokemon>[]
      );
      setPokemon(pokemonResponses);
    } catch (err) {
      setError(err as Error);
      setPokemon(undefined);
    } finally {
      setLoading(false);
    }
  };
  return { pokemon, loading, error };
}
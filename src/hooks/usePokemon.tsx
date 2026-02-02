import { useState, useEffect } from 'react';
import type { PokemonListResponse, PokemonListItem } from '../types/Pokemon';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<PokemonListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0`
        );
        const data: PokemonListResponse = await res.json();
        const list: PokemonListItem[] = data.results.map((item, index) => ({ // index es el índice de la lista para calcular el id
          ...item,
          id: data.count + index,
        }));
        setPokemon(list);
      } catch (err) {
        setError(err as Error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading, error };
}
import { useState } from 'react';
import type { PokemonListResponse, PokemonListItem, Pokemon } from '../types/Pokemon';

export function usePokemon(name?: string) {
  const [pokemon, setPokemon] = useState<PokemonListItem[] | Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0`
      );
      const data: PokemonListResponse = await res.json();
      const list: PokemonListItem[] = data.results.map((item, index) => ({ // index es el índice de la lista para calcular el id
        ...item,
        id: index,
      }));
      setPokemon(list);
    } catch (err) {
      setError(err as Error);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByName = async (name : string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data: Pokemon = await res.json();
      setPokemon(data);
    }
    catch (err) {
      setError(err as Error);
      setPokemon(null);
    }
    finally {
      setLoading(false);
    }
  }
  
  if(name){
    fetchPokemonByName(name)
  } else {
    fetchAllPokemon();
  }

  return { pokemon, loading, error };
}
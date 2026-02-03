import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/Pokemon';
import type {PokemonListResponse, PokemonListItem, } from '../types/PokemonUtils'

export function usePokemon(name?: string) {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[] | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchAllPokemon = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0`
      );
      const data: PokemonListResponse = await res.json();
      const list: PokemonListItem[] = data.results.map((item, index) => ({ // index es el índice de la lista para calcular el id
        ...item,
        id: index,
      }));
      setPokemonList(list);
    } catch (err) {
      setError(err as Error);
      setPokemonList(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!name) {
      setPokemon(undefined);
      return;
    }
    let cancelled = false;
    const fetchPokemonByName = async () => {
      setLoading(true);
      setError(undefined);
      setPokemon(undefined);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data: Pokemon = await res.json();
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          setPokemon(undefined);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPokemonByName();
    return () => { cancelled = true; };
  }, [name]);
  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return { pokemon, pokemonList, loading, error };
}
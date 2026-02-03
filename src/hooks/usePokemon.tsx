import { useEffect, useState } from 'react';
import type { PokemonListResponse, PokemonListItem, Pokemon } from '../types/Pokemon';

export function usePokemon(name?: string) {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[] | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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
      setPokemonList(list);
    } catch (err) {
      setError(err as Error);
      setPokemonList(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!name) {
      setPokemon(null);
      return;
    }
    let cancelled = false;
    const fetchPokemonByName = async () => {
      setLoading(true);
      setError(null);
      setPokemon(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data: Pokemon = await res.json();
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          setPokemon(null);
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
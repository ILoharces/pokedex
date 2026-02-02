import { useState, useEffect } from 'react';
// Dejo unkown de momento, lo cambiaré el tipo pokemon con las propiedades que me devuelva la API
export function usePokemon(name: string) {
  const [pokemon, setPokemon] = useState<unknown[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0`);
        const data = await res.json();
        const pokemonPromises = data.results.map((result: { url: string }) =>
          fetch(result.url).then(res => res.json())
        );
        const pokemonData: unknown[] = await Promise.all(pokemonPromises);
        setPokemon(pokemonData);
      } catch (err) {
        setError(err as Error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  return { pokemon, loading, error };
}
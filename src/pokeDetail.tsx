import { useLocation, Link } from 'react-router';
import type { Pokemon } from './types/Pokemon';
import { PokemonTypesLabels } from './components/pokemonTypesLabels';

function PokeDetail() {
  const location = useLocation();
  const pokemon = (location.state as { pokemon?: Pokemon } | null)?.pokemon;

  if (!pokemon) {
    return (
      <div className="pt-12 px-4 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">No hay datos del Pokémon. Vuelve al listado.</p>
        <Link to="/" className="text-blue-600 hover:underline">Volver a la Pokédex</Link>
      </div>
    );
  }

  const primaryType = pokemon.types?.[0]?.type?.name?.toLowerCase() ?? 'normal';
  const boxShadow = `0 0 24px var(--type-${primaryType})`;

  return (
    <div className="pt-12 px-4 pb-8 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        ← Volver a la Pokédex
      </Link>
      <div
        className="max-w-md mx-auto bg-white rounded-4xl shadow-md p-6 border border-gray-200 flex flex-col items-center"
        style={{ boxShadow }}
      >
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <p className="text-gray-400 mb-4">#{pokemon.id}</p>
        <img
          src={pokemon.sprites.front_default ?? pokemon.sprites.other?.['official-artwork']?.front_default ?? ''}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <PokemonTypesLabels {...pokemon} />
        <div className="mt-6 w-full grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p className="text-gray-500">Altura</p>
            <p className="font-medium">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div>
            <p className="text-gray-500">Peso</p>
            <p className="font-medium">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
          <div>
            <p className="text-gray-500">Experiencia base</p>
            <p className="font-medium">{pokemon.base_experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeDetail;
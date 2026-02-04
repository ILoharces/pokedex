import type { Pokemon } from '../types/Pokemon';
import { PokemonTypesLabels } from './pokemonTypesLabels';
interface PokeItemProps {
  pokemon?: Pokemon | null;
}

export function PokeItem({ pokemon }: PokeItemProps) {
  const primaryType = pokemon?.types?.[0]?.type?.name?.toLowerCase() ?? 'normal';
  const boxShadow = `0 0 24px var(--type-${primaryType})`;

  return (
    <a
      className='cursor-pointer bg-white rounded-4xl shadow-md p-4 border border-gray-200 flex flex-col items-center justify-center w-68 mb-4'
      style={{ boxShadow }}
    >
        {pokemon ?
          <>
            <h2 className="text-lg">{pokemon.name}</h2>
            <p className='text-gray-400'>#{pokemon.id}</p>
            <img src={pokemon.sprites.front_default || ''} alt={pokemon.name} className="w-48 h-48 object-contain" />
            <PokemonTypesLabels {...pokemon} />
          </>
          :
          <p>cargando...</p>
        }
    </a>
  );
}
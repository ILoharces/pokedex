import { useState } from "react";
import { PokeItem } from "./components/pokeItem";
import { usePokemon } from "./hooks/usePokemon";
import type { PokemonListItem } from "./types/PokemonUtils";

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | undefined>(undefined);
  const { pokemonList, pokemon } = usePokemon(selectedPokemonName ?? undefined);

  return (
    <>
    <h1 className="text-4xl font-bold text-center mt-6 text-blue">Pokédex</h1>
    <div className="flex gap-4 mt-4 ml-4 mr-4 mb-4 p-4 border-2 rounded-2xl">
      <div className="flex-1 ml-4 border-2 p-4 rounded-2xl">
        {pokemonList ?
          pokemonList.map((p: PokemonListItem) => (
            <PokeItem key={p.id} name={p.name} setSelectedPokemonName={setSelectedPokemonName} />
          ))
          : <p>cargando...</p>
        }

      </div>
      <div className="flex-1 mr-4 border-2 p-4 rounded-2xl">
        {pokemon && <img src={pokemon.sprites.front_default ?? ''}></img>}
      </div>
    </div>
    </>
  );
}

export default App;

import { useState } from "react";
import { PokeItem } from "./components/pokeItem";
import { usePokemon } from "./hooks/usePokemon";
import type { PokemonListItem } from "./types/PokemonUtils";

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | undefined>(undefined);
  const { pokemonList, pokemon } = usePokemon(selectedPokemonName ?? undefined);

  return (
    <>
      <h1
        className="text-4xl font-bold text-center mt-6 text-yellow-300"
        style={{ WebkitTextStroke: "2px #3b82f6" }}
      >
        Pokédex
      </h1>
      <div
        className="flex gap-16 mt-4 ml-12 mr-12 mb-4 p-12 border-2 bg-red-500 justify-center"
        style={{ height: "700px", minHeight: "400px" }}
      >
        <div
          className="flex-1 ml-4 border-2 p-4 rounded-2xl bg-white flex flex-col"
          style={{ maxWidth: "500px", height: "100%" }}
        >
          <div className="flex-1 flex flex-col overflow-y-auto">
            {pokemonList ? (
              pokemonList.map((p: PokemonListItem) => (
                <PokeItem key={p.id} name={p.name} setSelectedPokemonName={setSelectedPokemonName} />
              ))
            ) : (
              <p>cargando...</p>
            )}
          </div>
        </div>
        <div
          className="flex-1 mr-4 border-2 p-4 rounded-2xl bg-white flex flex-col"
          style={{ maxWidth: "500px", height: "80%" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
            {pokemon && (
              <img
                src={pokemon.sprites.front_default ?? ''}
                alt={pokemon.name}
                className="max-h-80"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

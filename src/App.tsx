import { useState } from "react";
import { PokeItem } from "./components/pokeItem";
import { usePokemon } from "./hooks/usePokemon";
import type { PokemonListItem } from "./types/Pokemon";

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(null);
  const {pokemonList, pokemon} = usePokemon(selectedPokemonName??undefined);
  
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        {pokemonList?.map((p: PokemonListItem) => (
          <PokeItem key={p.id} name={p.name} setSelectedPokemonName={setSelectedPokemonName} />
        ))}
      </div>
      <div className="flex-1">
        {pokemon && <div>{pokemon.name}</div>}
      </div>
    </div>
  );
}

export default App;

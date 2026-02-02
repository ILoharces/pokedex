import { usePokemon } from "./hooks/usePokemon";

function App() {
  const {pokemon} = usePokemon();
  return (
    <>
      {pokemon?.map((pokemon) => (
        <div key={pokemon.id}>
          <h1>{pokemon.name}</h1>
        </div>
      ))}
    </>
  );
}

export default App;

import { PokeItem } from "./components/pokeItem";
import { usePokemon } from "./hooks/usePokemon";
import { TopBar } from "./components/topBar";

function App() {
  const { pokemon } = usePokemon();

  return (
    <>
      <TopBar />
      <main className="pt-12">
        <h1
          className="text-4xl font-bold text-center mt-6 text-yellow-300"
          style={{ WebkitTextStroke: "2px #3b82f6" }}
        >
          Pokédex
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pokemon ?
            pokemon.map((p) => {
              return <PokeItem key={p.id} {...p} />
            })
            :
            <p>cargando...</p>
          }
        </div>
      </main>
    </>
  );
}

export default App;

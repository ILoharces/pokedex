import { PokeItem } from "./components/pokeItem";
import { usePokemon } from "./hooks/usePokemon";
import { TopBar } from "./components/topBar";
import { useState } from "react";
import { SearchBar } from "./components/searchBar";
import logo from "./resources/logo.png";
import psyduck from "./resources/psyduck.jpg";

function App() {
  const { pokemon, loading } = usePokemon();
  const [search, setSearch] = useState<string | null>('');

  const filtered = (pokemon?.filter((p) => p.name.toLowerCase().includes(search?.toLowerCase() ?? '')) ?? []);
  const noResults = !loading && pokemon !== undefined && filtered.length === 0;

  return (
    <>
      <TopBar />
      <main className="pt-12">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 px-6 w-full">
          <h1
            className="text-4xl text-yellow-300 justify-self-start"
            style={{ WebkitTextStroke: "2px #3b82f6" }}
          >
            Pokédex
          </h1>
          <div className="flex justify-center w-2xl min-w-[20rem]">
            <SearchBar setSearch={(s) => setSearch(s)} />
          </div>
          <div />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <img src={logo} alt="Cargando..." className="w-32 h-32 animate-spin" />
          </div>
        )}

        {noResults && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <img src={psyduck} alt="Psyduck" className="w-64 h-64 object-contain" />
            <p className="text-center text-gray-600 text-lg max-w-md">
              No se ha encontrado ningún Pokémon que contenga ese nombre.
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-18 mt-6">
            {filtered.map((p) => (
              <PokeItem key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default App

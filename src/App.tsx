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
      <main className="pt-12 px-4 sm:px-6 pb-8 min-h-screen">
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center mt-4 w-full gap-4 md:gap-0">
          <h1
            className="text-2xl sm:text-4xl text-yellow-300 justify-self-start text-center md:text-left w-full md:w-auto"
            style={{ WebkitTextStroke: "2px #3b82f6" }}
          >
            Pokédex
          </h1>
          <div className="flex justify-center w-full max-w-md md:min-w-[20rem] md:max-w-none">
            <SearchBar setSearch={(s) => setSearch(s)} />
          </div>
          <div className="hidden md:block" />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <img src={logo} alt="Cargando..." className="w-32 h-32 animate-spin" />
          </div>
        )}

        {noResults && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
            <img src={psyduck} alt="Psyduck" className="w-48 h-48 sm:w-64 sm:h-64 object-contain" />
            <p className="text-center text-gray-600 text-base sm:text-lg max-w-md">
              No se ha encontrado ningún Pokémon que contenga ese nombre.
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 max-w-7xl mx-auto">
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

interface PokeItemProps {
  name: string;
  setSelectedPokemonName: (name: string) => void;
}

export function PokeItem({ name, setSelectedPokemonName }: PokeItemProps) {
  return (
    <div>
      <button onClick={() => setSelectedPokemonName(name)} className="cursor-pointer">{name}</button>
    </div>
  );
}
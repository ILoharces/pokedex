import type { Pokemon } from "../types/Pokemon"
import { typeIcons } from "../resources/typeIcons"

export function PokemonTypesLabels(pokemon: Pokemon){
    return (
        <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => {
                const typeName = type.type.name.toLowerCase();
                const Icon = typeIcons[typeName];
                return (
                    <span
                        key={type.type.name}
                        className="flex items-center gap-1.5 text-sm font-medium rounded-full px-2 py-1"
                        style={{
                            backgroundColor: `var(--type-${typeName})`,
                            color: `var(--type-${typeName}-text)`,
                        }}
                    >
                        {Icon && <Icon size={14} strokeWidth={2.5} />}
                        {type.type.name}
                    </span>
                );
            })}
        </div>
    )
}
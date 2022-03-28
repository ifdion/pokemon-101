export const pokemonListWithPaging = `
query pokemon_v2_pokemonspecies($limit: Int, $offset: Int) {
    pokemon_v2_pokemonspecies(
        order_by: {id: asc},
        limit: $limit,
        offset: $offset
    ) {
        name
        id
        pokemon_v2_pokemonspeciesflavortexts(
            where: {language_id: {_eq: 9}},
            limit: 1
        ) {
            flavor_text
        }
        pokemon_v2_pokemons {
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                    name
                    pokemon_v2_abilityeffecttexts(limit: 1, where: {language_id: {_eq: 9}}) { short_effect }
                }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type { name }
            }
            pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat { name }
            }
        }
    }
} 
`;

export const pokemonListWithName = `
query pokemon_v2_pokemonspecies($name: String) {
    pokemon_v2_pokemonspecies(
        where: { name: { _eq: $name } }
        limit: 1
    ) {
        name
        id
        pokemon_v2_pokemonspeciesflavortexts(
            where: {language_id: {_eq: 9}},
            limit: 1
        ) {
            flavor_text
        }
        pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                id
                name
                evolves_from_species_id
            }
        }
        pokemon_v2_pokemons {
            name
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                    name
                    pokemon_v2_abilityeffecttexts(limit: 1, where: {language_id: {_eq: 9}}) { short_effect }
                }
                slot
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type { name }
            }
            pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat { name }
            }
        }
    }
}
  
`;
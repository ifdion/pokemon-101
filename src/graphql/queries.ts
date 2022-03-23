export const pokemonListWithPaging = `
query pokemon_v2_pokemonspecies($limit: Int, $offset: Int) {
    pokemon_v2_pokemonspecies(
        order_by: {id: asc},
        limit: $limit,
        offset: $offset
    ) {
        name
        id
        pokemon_color_id
        pokemon_v2_pokemons {
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                    name
                }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
            pokemon_v2_pokemonmoves {
                pokemon_v2_move {
                    name
                }
            }
        }
    }
} 
`;

export const pokemonListWithName = `
query pokemon_v2_pokemonspecies($name: String) {
    pokemon_v2_pokemonspecies(
        where: {
            name: {
                _eq: $name
            }
        }
    ) {
        name
        id
        pokemon_color_id
        pokemon_v2_pokemons {
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                    name
                }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
            pokemon_v2_pokemonmoves {
                pokemon_v2_move {
                    name
                }
            }
        }
    }
}
  
`;


import axios from "axios";
import { BASE_URL, INDEX_LIMIT } from "../constants/api";
import { pokemonListWithName, pokemonListWithPaging } from "../graphql/queries";
import { PokemonInterface } from "../interfaces/pokemon";

export function getPokemonsWithOffset(offset:number = 0): Promise<PokemonInterface[]> {
    return axios({
        url: BASE_URL ,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            variables: {
                limit: INDEX_LIMIT,
                offset: INDEX_LIMIT * offset
            },
            query: pokemonListWithPaging
        }
    }).then(({ data }) => {
        if (!data?.data?.pokemon_v2_pokemonspecies) {
            throw new Error("Incorrect response");
        }
        return data.data.pokemon_v2_pokemonspecies as PokemonInterface[];
    });
}

export function getPokemonsWithName(name:string = ''): Promise<PokemonInterface> {
    return axios({
        url: BASE_URL ,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            variables: {
                name,
            },
            query: pokemonListWithName
        }
    }).then(({ data }) => {
        if (!data?.data?.pokemon_v2_pokemonspecies[0]) {
            throw new Error("Pokemon not found");
        }
        return data.data.pokemon_v2_pokemonspecies[0] as PokemonInterface;
    });
}
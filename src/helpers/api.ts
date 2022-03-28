import axios from "axios";
import { BASE_URL, INDEX_LIMIT } from "../constants/api";
import { pokemonListWithName, pokemonListWithPaging } from "../graphql/queries";
import { EvolutionInterface, PokemonInterface } from "../interfaces/pokemon";

export function getPokemonsWithOffset(offset: number = 0): Promise<PokemonInterface[]> {
    return axios({
        url: BASE_URL,
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
        return data.data.pokemon_v2_pokemonspecies.map(makePokemonModel) as PokemonInterface[];
    });
}

export function getPokemonsWithName(name: string = ''): Promise<PokemonInterface> {
    return axios({
        url: BASE_URL,
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
        return makePokemonModel(data.data.pokemon_v2_pokemonspecies[0]) as PokemonInterface;
    });
}

export function makePokemonModel(base: any): PokemonInterface {
    return {
        id: base.id,
        slug: base.name,
        name: formatName(base.name),
        pokeIndex: formatPokeIndex(base.id),
        type: getType(base),
        rarity: formatRarity(base.is_baby, base.is_legendary, base.is_mythical),
        flavorText: base?.pokemon_v2_pokemonspeciesflavortexts[0] ? base.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text : '',
        abilities: getAbilities(base),
        evolution: getEvolution(base),
        stats: getStats(base),

    }
}

export function formatName(name: string): string {
    if (name.length <= 2) {
        return name.toUpperCase();
    }
    return name.split('-').map((x: any) => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
}

function formatPokeIndex(number: number): string {
    return number < 10 ? `00${number}` : number < 100 ? `0${number}` : `${number}`
}

function getType(base: any): string[] {
    const type = base?.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes || []
    return type.map((x: any) => x.pokemon_v2_type.name);
}

function formatRarity(isBaby = false, isLegendary = false, isMythical = false) {
    return isBaby ? 'Baby' : isLegendary ? 'Legendary' : isMythical ? 'Mythical' : 'Basic';
}

function getAbilities(base: any): { name: string, effect: string }[] {
    if (!base?.pokemon_v2_pokemons[0].pokemon_v2_pokemonabilities) {
        return [];
    }
    return base.pokemon_v2_pokemons[0].pokemon_v2_pokemonabilities.map((x: any) => ({
        name: x.pokemon_v2_ability.name,
        effect: x.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].short_effect || ''
    }))
}

function getEvolution(base: any): EvolutionInterface[] | undefined {
    if (!base?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies) {
        return undefined
    }
    return base.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((x: EvolutionInterface) => ({ ...x, name: formatName(x.name) }))
}

function getStats(base: any): { key: string, value: string }[] | undefined {
    if (!base?.pokemon_v2_pokemons[0].pokemon_v2_pokemonstats) {
        return undefined
    }
    return base.pokemon_v2_pokemons[0].pokemon_v2_pokemonstats.map((x: any) => ({ value: x.base_stat, key: formatName(x.pokemon_v2_stat.name) }))
}

export interface PokemonInterface {
    id: number
    name: string
    slug: string
    pokeIndex: string
    rarity: string
    type: string[]
    flavorText: string
    abilities?: {
        name: string
        effect: string
    }[]
    evolution?: EvolutionInterface[]
    stats?: {
        key: string
        value: string
    }[]
}

export interface EvolutionInterface {
    id: number
    name: string
    fromId: number
}
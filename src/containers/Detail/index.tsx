import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonsWithName } from "../../helpers/api";
import { PokemonInterface } from "../../interfaces/pokemon";

function Detail() {
    const params = useParams();
    // TODO
    // current : separate states to reduce complexity,
    // should be : merged to object to improve performance (reducing rerenders)
    const [pokemon, setPokemon] = useState(undefined as PokemonInterface|undefined)
    const [errorMessage, setErrorMessage] = useState(undefined as string|undefined);
    const [isLoading, setLoading] = useState(true);
    const { pokemonName } = params;

    useEffect(() => {
        getPokemonsWithName(pokemonName).then((res) => {
            setPokemon(res);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setErrorMessage(errorMessage);
            setLoading(false);
        })
    }, [pokemonName]);
    

    return (
        <div className="detail">
            <Link to="/">Home</Link>
            {pokemon &&
                <div>{pokemon.name}'s detail here</div>
            }
            {errorMessage &&
                <div>Uh oh! {errorMessage}</div>
            }
            {isLoading &&
                <div>loading</div>
            }
        </div>
    );
}

export default Detail;

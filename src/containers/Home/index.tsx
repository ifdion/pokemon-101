import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "../../components/PokemonCard";
import { getPokemonsWithOffset } from "../../helpers/api";
import { PokemonInterface } from "../../interfaces/pokemon";

function Home() {
    const [pokemonList, setPokemonList] = useState([] as PokemonInterface[]);
    const [nextPage, setNextPage] = useState(1);
    useEffect(() => {
        getPokemonsWithOffset(0).then((res) => {
            setPokemonList(res);
        });
    }, []);

    function loadMore() {
        console.debug('load more');
        getPokemonsWithOffset(nextPage).then((res) => {
            setPokemonList(pokemonList.concat(res));
            setNextPage(nextPage + 1);
        });
    }

    return (
        <div className="home">
            <InfiniteScroll
                dataLength={pokemonList.length}
                next={loadMore}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {pokemonList.map((pokemon: PokemonInterface) => (
                    <PokemonCard key={pokemon.name} {...pokemon} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";

import { PokemonInterface } from "../../interfaces/pokemon";

import "./PokemonCard.css";

export default function PokemonAbilities({
    id,
    name,
    slug,
    type,
    pokeIndex,
    rarity,
    flavorText,
    abilities,
}: PokemonInterface) {
    const colorClassName = `pokemon-card--${type[0]}`;
    // const randomRotate = Math.floor(-4 + (Math.random() * 8));

    return (
        <Link to={slug} className={`pokemon-card ${colorClassName}`} style={{
        //   transform: `rotate(${randomRotate}deg)`
        }}>
            <article>
                <p className="pokemon-card-rarity">
                    {rarity} Pokemon, #{pokeIndex}
                </p>
                <div className="pokemon-card__top">
                    <h2 className="pokemon-card__title">{name}</h2>
                    {type.map((x) => (
                        <span
                            key={x}
                            className={`pokemon-card__type pokemon-card__type--${x}`}
                            title={x}
                        >
                            {x.slice(0, 1)}
                        </span>
                    ))}
                </div>
                <div className="pokemon-card__img">
                  <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                      alt={name}
                      loading="lazy"
                      width="140px"
                      height="140px"
                  />
                </div>
                {abilities && abilities.slice(0,1).map((x) => (
                  <p key={x.name}><strong>{x.name}</strong> {x.effect}</p>

                ))}
                <p>{flavorText}</p>
            </article>
        </Link>
    );
}

import React from "react";
import { EvolutionInterface } from "../../interfaces/pokemon";

import './PokemonEvolution.css';

export default function PokemonEvolution({ evolution = []} : {evolution: EvolutionInterface[]}) {
    return (
        <div className="pokemon-evolution">
            {evolution.map((x:EvolutionInterface, i: number) => (
                <div key={x.name}>
                  <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${x.id}.png`}
                      alt={x.name}
                      loading="lazy"
                      width="140px"
                      height="140px"
                  />
                  <h2>{x.name}</h2>
                  {i !== evolution.length - 1 && (
                      <p>Evolves into</p>
                  )}
                </div>
            ))}
        </div>
    );
}

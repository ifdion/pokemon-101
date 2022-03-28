import React, { Fragment } from "react";

import "./PokemonStats.css";

export default function PokemonStats({
    stats
}: {stats: { key:string, value:string }[]}) {
    return (
        <dl className="pokemon-stats">
            {stats.map((x) => (
                <Fragment>
                    <dt>{x.key}</dt>
                    <dd>{x.value}</dd>
                </Fragment>
            ))}
        </dl>
    );
}

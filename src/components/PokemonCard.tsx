import React from 'react'
import { Link } from "react-router-dom";

import { PokemonInterface } from '../interfaces/pokemon'

export default function PokemonCard({name, id}:PokemonInterface) {
  return (
    <article className='pokemon-card'>
        <h2><Link to={name}>{name} #{id}</Link></h2>
    </article>
  )
}

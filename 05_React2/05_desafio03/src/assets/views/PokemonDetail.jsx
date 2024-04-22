import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetail() {
    const { name } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => setPokemonDetails(data));
    }, [name]);

    return (
        <div>
            <h1>{pokemonDetails.name}</h1>
            <img src={pokemonDetails.sprites?.front_default} alt={name} />
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
        </div>
    );
}

export default PokemonDetail;
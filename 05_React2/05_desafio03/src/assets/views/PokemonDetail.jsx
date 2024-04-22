import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function PokemonDetail() {
    const navigate = useNavigate();
    const {name} = useParams();
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => setPokemonDetails(data));
    }, [name]);

    const goToPokemonDetails = () => { navigate(`/pokemon/`); }

    return (
        <div>
            <h1 class="text-danger">{pokemonDetails.name}</h1>
            <img src={pokemonDetails.sprites?.front_default} alt={name} />
            <table class="table table-light table-hover table-sm">
                <thead>
                    <tr>
                    <th scope="col">Stat</th>
                    <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th scope="row">Height</th><td>{pokemonDetails.height}</td></tr>
                    <tr><th scope="row">Weight</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">HP</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">Attack</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">Defense</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">Sp. Attack</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">Sp. Defense</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">Speed</th><td>{pokemonDetails.weight}</td></tr>
                </tbody>
            </table>
            <Button className='bg-danger m-2' onClick={goToPokemonDetails}>Volver</Button>
        </div>
    );
}

export default PokemonDetail;
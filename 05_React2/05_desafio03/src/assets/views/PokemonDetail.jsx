import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

function PokemonDetail() {
    const navigate = useNavigate();
    const {name} = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const goToPokemonDetails = () => { navigate(`/pokemon/`); }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPokemonDetails(data);
                console.log(data);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, [name]);

    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-danger">{pokemonDetails.name}</h1>
            <img src={pokemonDetails.sprites?.front_default} alt={name} />
            <table className="table table-light table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Stat</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th scope="row">HEIGHT</th><td>{pokemonDetails.height}</td></tr>
                    <tr><th scope="row">WEIGHT</th><td>{pokemonDetails.weight}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[0].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[0].base_stat}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[1].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[1].base_stat}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[2].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[2].base_stat}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[3].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[3].base_stat}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[4].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[4].base_stat}</td></tr>
                    <tr><th scope="row">{pokemonDetails.stats[5].stat.name.toUpperCase()}</th><td>{pokemonDetails.stats[5].base_stat}</td></tr>

                </tbody>
            </table>
            <Button className='bg-danger m-2' onClick={goToPokemonDetails}>Volver</Button>
        </div>
    );
}

export default PokemonDetail;
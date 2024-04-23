import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pokemon = () => {
    const navigate = useNavigate();
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=9999')
            .then(response => response.json())
            .then(data => setPokemon(data.results));
    }, []);

    const handlePokemonChange = (event) => {
        setSelectedPokemon(event.target.value);
    };

    const goToPokemonDetails = () => {if (selectedPokemon) {navigate(`/pokemon/${selectedPokemon}`)}}

    return (
        <>
            <h1 className="text-danger">Selecciona un Pokémon</h1>
            <Form>
                <Form.Select size="lg" className="form-control my-2" value={selectedPokemon} onChange={handlePokemonChange}>
                    <option value="">Seleccione un Pokémon</option>
                    {pokemon.map(pokemon => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                        </option>
                    ))}
                </Form.Select>
                <Button className='bg-danger m-2' onClick={goToPokemonDetails}>Buscar</Button>
            </Form>
        </>
    );
};

export default Pokemon;
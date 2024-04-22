import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pokemon = () => {
    const navigate = useNavigate();
    const irAPersonajes = () => {navigate(`/pokemon/${selectedPokemon}`)}
    const [responseData, setResponseData] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState('');

    useEffect(() => {
        if (selectedPokemon) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
                .then(function(response) {
                    console.log(JSON.stringify(response.data));
                    setResponseData(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }, [selectedPokemon]);

    const handlePokemonChange = (event) => {setSelectedPokemon(event.target.value)};

    return (
        <>
            <h1 className="text-danger">Selecciona un Pokémon</h1>
            <Form>
                <Form.Select size="lg" className="form-control my-2" id="selectedPokemon" value={selectedPokemon} onChange={handlePokemonChange}>
                    <option value="">Elige un Pokémon de la lista</option>
                    <option value="charmander">charmander</option>
                    <option value="pikachu">pikachu</option>
                </Form.Select>
                <Button className='bg-danger m-2'>Buscar</Button>
            </Form>
            {responseData ? 
                <>
                    <h2 className="text-danger">{responseData.name}</h2>
                    <img className="m-2" width="200" src={responseData.sprites.front_default}/>
                </>
                : <></>
            }
        </>
    );
};

export default Pokemon;
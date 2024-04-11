import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import axios from "axios";

const Pokemon = () => {
    const [responseData, setResponseData] = React.useState(null);
    const [selectedPokemon, setSelectedPokemon] = React.useState('charmander');

    React.useEffect(() => {
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

    const handlePokemonChange = (event) => {
        setSelectedPokemon(event.target.value);
    };

    const handleFetchPokemon = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h1 className="text-danger">Selecciona un Pokémon</h1>
            <form className="form-inline">
                <select className="form-control my-2" id="selectedPokemon" value={selectedPokemon} onChange={handlePokemonChange}>
                    <option value="charmander">charmander</option>
                    <option value="pikachu">pikachu</option>
                </select>
            </form>
            {responseData ? 
                <>
                    <img className="m-2" src={responseData.sprites.front_default}/>
                    <h2 className="text-danger">{responseData.name}</h2>
                </>
                : <></>
            }
        </>
    );
};

export default Pokemon;
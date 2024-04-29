import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";

const Pizza = () => {
    const navigate = useNavigate();
    const {name} = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const goToPokemonDetails = () => { navigate(`/pizza/`); }

    return (
        <div>
            <Card>
                <Card.Img variant="left" src={pizza.img} />
                <Card.Body>
                    <Card.Title>{pizza.name}</Card.Title>
                    <Card.Text>{pizza.desc}</Card.Text>
                    <Button variant="primary">Añadir</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Pizza;
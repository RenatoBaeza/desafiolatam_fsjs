// Pizza.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { PizzaContext } from '../context/PizzaContext';
import pizzas from '../json/pizzas.json';

const Pizza = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const { pizzaname, setpizzaname } = useContext(PizzaContext);

    useEffect(() => {
        const pizzaDetails = getDataById(pizzas, name);
        setpizzaname(pizzaDetails.name);
    }, [name, setpizzaname]);

    function getDataById(data, name) {
        return data.find(item => item.name === name);
    }

    const pizzaDetails = getDataById(pizzas, name);

    return (
        <div>
            <Card>
                <Card.Img variant="top" src={pizzaDetails.img} />
                <Card.Body>
                    <Card.Title>{pizzaDetails.name}</Card.Title>
                    <Card.Text>{pizzaDetails.desc}</Card.Text>
                    <Button variant="primary">Añadir</Button>
                    <Button variant="danger" onClick={() => navigate('/')}>Volver</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Pizza;
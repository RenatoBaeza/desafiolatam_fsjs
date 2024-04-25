import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, ListGroup, Button } from "react-bootstrap";
import pizzas from '../json/pizzas.json'

const Home = () => {
    function capitalizeWords(sentence) {return sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

    return (
        <div>
            <h1 className="text-primary">¡Pizzería Mamma Mía!</h1>
            <h5 className="text-primary">Tenemos las mejores pizzas que podrás encontrar</h5>
            
            <Row xs={2} md={4} className="m-2">
                {pizzas.map(pizza => (
                    <Card key={pizza.id} className="m-2">
                        <Card.Img variant="top" src={pizza.img} />
                        <Card.Body>
                            <Card.Title>{capitalizeWords(pizza.name)}</Card.Title>
                            <Card.Text>{pizza.desc}</Card.Text>
                            <ListGroup variant="flush">
                                {pizza.ingredients.map((ingredient, index) => (
                                    <ListGroup.Item key={index}>🍕{capitalizeWords(ingredient)}</ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button variant="primary">Ver más</Button>
                            <Button variant="danger">Añadir</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Row>

        </div>
    );
};

export default Home;
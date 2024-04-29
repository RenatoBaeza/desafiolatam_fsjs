// Home.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useContext } from "react";
import { Card, Row, ListGroup, Button } from "react-bootstrap";
import pizzas from '../json/pizzas.json'
import { useNavigate } from 'react-router-dom';
import { PizzaContext } from "../context/PizzaContext";

const Home = () => {
    function capitalizeWords(sentence) {return sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    const navigate = useNavigate();
    const { pizzaname, setpizzaname } = useContext(PizzaContext);
    const { carrito, setCarrito } = useContext(PizzaContext);

    const gotoPizza = (value) => {
        setpizzaname(value)
        navigate(`/pizza/${value}`)
        }

    const addPizza = (pizzaName) => {
        const existingPizza = carrito.find(p => p.name === pizzaName);
        if (existingPizza) {
            const updatedCart = carrito.map(p => {
                if (p.name === pizzaName) {
                    return { ...p, amount: p.amount + 1 };
                }
                return p;
            });
            setCarrito(updatedCart);
        } else {
            const newPizza = { name: pizzaName, amount: 1 };
            setCarrito([...carrito, newPizza]);
        }
    };
    
    useEffect(() => {
        console.log(carrito);
    }, [carrito]); // Log the cart state every time it changes
    

    return (
        <div>
            <h1 className="text-primary">¡Pizzería Mamma Mía!</h1>
            <h5 className="text-primary">Tenemos las mejores pizzas que podrás encontrar</h5>
            
            <Row xs={2} md={5} className="m-2">
                {pizzas.map(pizza => (
                    <Card key={pizza.id} className="m-1">
                        <Card.Img variant="top" src={pizza.img} />
                        <Card.Body>
                            <Card.Title>{capitalizeWords(pizza.name)}</Card.Title>
                            <Card.Text>{pizza.desc}</Card.Text>
                            <ListGroup variant="flush">
                                {pizza.ingredients.map((ingredient, index) => (
                                    <ListGroup.Item key={index}>🍕{capitalizeWords(ingredient)}</ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button variant="primary" onClick={() => gotoPizza(pizza.name)}>Ver más</Button>
                            <Button variant="danger" onClick={() => addPizza(pizza.name)}>Añadir</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </div>
    );
};

export default Home;
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, ListGroup, Button } from "react-bootstrap";
import { PizzaContext } from "../context/PizzaContext";

const Carrito = () => {
    const { carrito, setCarrito } = useContext(PizzaContext);

    return (
        <div>
            <h5 className="">Detalle del pedido:</h5>
            
            <Row xs={2} md={5} className="m-2">
                {carrito.map(carrito => (
                    <>
                        <p>{carrito.name}</p>
                        <p>{carrito.amount}</p>
                    </>
                ))}
            </Row>
        </div>
    );
};

export default Carrito;
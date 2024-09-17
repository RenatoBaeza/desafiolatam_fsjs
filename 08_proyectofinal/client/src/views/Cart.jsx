// Cart.jsx
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getCart = () => {
    const token = localStorage.getItem('token');
    axios.get(ENDPOINT.cart, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setCart(data);
      })
      .catch(error => {
        console.error('Error buscando carrito:', error);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container className="py-5">
      <h className="mb-4">Carrito de Compras</h>
      <Row>
        {cart.map((item) => (
          <Col md={6} lg={4} key={item.publication_id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={item.img_url}
                alt={item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Unidades: {item.cart_units}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
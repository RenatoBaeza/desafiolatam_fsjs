import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./assets/components/AppNavbar";
import Home from "./assets/views/Home";
import Carrito from "./assets/views/Carrito";
import Pizza from "./assets/views/Pizza";
import NotFound from "./assets/views/NotFound";
import { PizzaProvider } from "./assets/context/PizzaContext";

function App() {
    return (
        <PizzaProvider>
            <Container className="mw-100">
                <Row className="justify-content-center">
                    <AppNavbar />
                    <Col xs={12} md={10} className="m-4 p-4 border rounded bg-light">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/carrito" element={<Carrito />} />
                            <Route path="/pizza/:name" element={<Pizza />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </PizzaProvider>
    );
}

export default App;
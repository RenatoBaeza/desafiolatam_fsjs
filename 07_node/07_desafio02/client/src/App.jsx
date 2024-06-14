import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/views/Home";
import NotFound from "./assets/views/NotFound";

function App() {
    return (
        <Container className="mw-100">
            <Row className="justify-content-center">
                <Col xs={12} md={10} className="m-4 p-4 border rounded bg-light">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
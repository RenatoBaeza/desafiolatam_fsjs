import "bootstrap/dist/css/bootstrap.min.css";
import MiApi from "./assets/components/MiApi";
import Buscador from "./assets/components/Buscador";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Container className="bg-primary mw-100 p-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">
          <h1>Game Info</h1>
          <p>Usa la API de https://www.cheapshark.com/api/1.0/games para buscar el precio más barato para juegos.</p>
          <Buscador setSearchTerm={setSearchTerm} />
          <MiApi searchTerm={searchTerm} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

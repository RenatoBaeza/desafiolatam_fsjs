import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./assets/components/Formulario";
import Alert from "./assets/components/Alert";
import Listado from "./assets/components/Listado";
import Buscador from "./assets/components/Buscador";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [CorrectCreation, setCorrectCreation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Container className="bg-primary mw-100 p-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">
          <h1>Base de colaboradores</h1>
          <Buscador setSearchTerm={setSearchTerm} />
          <Listado searchTerm={searchTerm} />
          <Formulario setShowAlert={setShowAlert} setCorrectCreation={setCorrectCreation} />
          <Alert showAlert={showAlert} CorrectCreation={CorrectCreation} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

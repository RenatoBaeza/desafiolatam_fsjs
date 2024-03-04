import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Registro from "./assets/components/Registro";
import Alert from "./assets/components/Alert";
import Formulario from "./assets/components/Formulario"; // Make sure this import is correct
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [CorrectCreation, setCorrectCreation] = useState(false);

  return (
    <Container className="bg-success mw-100 p-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">
          <h2>Crea una cuenta</h2>
          <Registro setShowAlert={setShowAlert} setCorrectCreation={setCorrectCreation} iconA='fab fa-facebook-f' iconB='fab fa-github' iconC='fab fa-linkedin-in'/>
          <Alert showAlert={showAlert} CorrectCreation={CorrectCreation} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
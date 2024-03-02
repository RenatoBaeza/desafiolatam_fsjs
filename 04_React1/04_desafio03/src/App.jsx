// src/App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./assets/components/Formulario";
import Alert from "./assets/components/Alert";
import Listado from "./assets/components/Listado";
import Buscador from "./assets/components/Buscador";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <Container className="bg-primary mw-100 p-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">
          <Buscador />
          <Listado />
          <Formulario />
          <Alert />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

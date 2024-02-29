// src/App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import Registro from "./assets/components/Registro";
import Alert from "./assets/components/Alert";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";


function App() {
  return (
    <Container className="bg-success mw-100 p-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">

          <h2>Crea una cuenta</h2>

          <Registro iconA='fab fa-facebook-f'
                    iconB='fab fa-github'
                    iconC='fab fa-linkedin-in'
                    />
                    
          <Alert />

        </Col>
      </Row>
    </Container>
  );
}

export default App;

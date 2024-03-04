import "bootstrap/dist/css/bootstrap.min.css";
import MiApi from "./assets/components/MiApi";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <Container className="bg-danger mw-100 p-5">
      <Row className="justify-content-center ">
        <Col xs={12} md={6} className="p-4 border rounded bg-light">
          <MiApi />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

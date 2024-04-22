import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Underheader from "./assets/components/Underheader";
import Home from "./assets/views/Home";
import Carrito from "./assets/views/Carrito";
import NotFound from "./assets/views/NotFound";

function App() {
  return (
        <Container className="mw-100">
            <Row className="justify-content-center">
              <Navbar/>
              <Underheader/>

              <Col xs={12} md={10} className="m-4 p-4 border rounded bg-light">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/carrito" element={<Carrito/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </Col>

            </Row>
        </Container>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "./App.css";
import Home from "./assets/components/Home";
import Contact from "./assets/components/Contact";
import Header from "./assets/components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container className="mw-100">
      <Row className="justify-content-center">
        <Header/>

        <Col xs={12} md={6} className="m-4 p-4 border rounded bg-light">
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </Col>

      </Row>
    </Container>
  );
}

export default App;

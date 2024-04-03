import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./assets/components/Home";
import Contact from "./assets/components/Contact";
import Header from "./assets/components/Header";
import NotFound from "./assets/components/NotFound";

function App() {
  return (
    <Container className="mw-100">
      <Row className="justify-content-center">
        <Header/>

        <Col xs={12} md={6} className="m-4 p-4 border rounded bg-light">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Col>

      </Row>
    </Container>
  );
}

export default App;

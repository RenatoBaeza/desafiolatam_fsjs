import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {React, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import ("./assets/components/Home"));
const Favorites = lazy(() => import ("./assets/components/Favorites"));
const Header = lazy(() => import ("./assets/components/Header"));
const NotFound = lazy(() => import ("./assets/components/NotFound"));

function App() {
  return (
    <Container className="mw-100">
      <Row className="justify-content-center">
        <Header/>

        <Col xs={12} md={6} className="m-4 p-4 border rounded bg-light">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Col>

      </Row>
    </Container>
  );
}

export default App;

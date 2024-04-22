import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavbar from "./assets/components/AppNavbar";
import Home from "./assets/views/Home";
import Pokemon from "./assets/views/Pokemon";
import NotFound from "./assets/views/NotFound";

function App() {
  return (
    
      <Container className="mw-100">
          <Row className="justify-content-center">
              <AppNavbar/>
            <Col xs={12} md={10} className="m-4 p-4 border rounded bg-light">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/pokemon" element={<Pokemon/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Col>

          </Row>
      </Container>
    
  );
}

export default App;

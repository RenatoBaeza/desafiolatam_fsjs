import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { FavoritesProvider } from './assets/context/FavoritesContext';
import Header from "./assets/components/Header";
import Home from "./assets/views/Home";
import Favorites from "./assets/views/Favorites";
import NotFound from "./assets/views/NotFound";

function App() {
  return (
    <FavoritesProvider>
        <Container className="mw-100">
            <Row className="justify-content-center">
              <Header/>

              <Col xs={12} md={10} className="m-4 p-4 border rounded bg-light">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/favorites" element={<Favorites/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </Col>

            </Row>
        </Container>
    </FavoritesProvider>
  );
}

export default App;

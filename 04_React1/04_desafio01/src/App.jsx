// src/App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import MyCard from "./assets/components/MyCard";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div>
      <Header text="¡Adopta un perrito!"/>
      <Container>
        <Row>
          <Col md={4}>
            <MyCard
              url="https://media.istockphoto.com/id/1470066039/es/foto/cerrar-el-perro-corgi-en-verano-d%C3%ADa-soleado.jpg?s=612x612&w=0&k=20&c=jkiYXsBJ6scS3f1rCSjU27mWPmt8wM8EfZV_caN2N7A="
              nombre="Miguel"
              descripcion="Perro abuelito"
              raza="Akita"
              bgcolor="primary"
            />
          </Col>
          <Col md={4}>
            <MyCard
              url="https://media.istockphoto.com/id/503328234/es/foto/corgi-gal%C3%A9s-perro.jpg?s=612x612&w=0&k=20&c=9Pu71sVJl-QR8MU8TuaHe20cFpPtGpiOh3bJ61ovwEk="
              nombre="Roberto"
              descripcion="Perro activo"
              raza="Poodle"
              bgcolor="danger"
            />
          </Col>
          <Col md={4}>
            <MyCard
              url="https://media.istockphoto.com/id/1185632588/es/foto/retrato-de-pastor-alem%C3%A1n-en-un-estudio-oscuro.jpg?s=612x612&w=0&k=20&c=nkT5eyprhyBXn7KKHrLJmWlICgYgLqsFkAtAkPcAQsE="
              nombre="Luisa"
              descripcion="Perrita tranquila"
              raza="Boxer"
              bgcolor="warning"
            />
          </Col>
          <Col md={4}>
            <MyCard
              url="https://cdn.pixabay.com/photo/2016/01/29/20/54/dog-1168663_640.jpg"
              nombre="Juan"
              descripcion="Perro revoltoso"
              raza="Pastor aleman"
              bgcolor="secondary"
            />
          </Col>
        </Row>  
      </Container>
      <Footer />
    </div>
  );
}

export default App;

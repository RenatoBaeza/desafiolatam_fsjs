// Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-secondary py-3 mt-3">
      <Container>
        <Row>
          <Col>
            <h5>Acerca de</h5>
            <ul className="list-unstyled">
              <li>Blog</li>
            </ul>
          </Col>
          <Col>
            <h5>Ayuda</h5>
            <ul className="list-unstyled">
              <li>Comprar</li>
              <li>Vender</li>
            </ul>
          </Col>
          <Col>
            <h5>Redes sociales</h5>
            <ul className="list-unstyled">
              <li>X</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </Col>

          <Col>
            <h5>Mi cuenta</h5>
            <ul className="list-unstyled">
              <li>Favoritos</li>
              <li>Vender</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

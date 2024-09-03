// PublicationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import { Container, Row, Col, Card, Spinner, Badge, Button } from "react-bootstrap";

const PublicationDetails = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ENDPOINT.publications}/${id}`)
      .then(({ data }) => {
        setPublication(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching publication details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!publication) {
    return <p>Publication not found</p>;
  }

  const {
    title,
    description,
    img_url,
    status,
    base_price,
    discount_price,
    constellation,
    color,
    distance,
    diameter,
    radius,
    luminosity
  } = publication;

  const discountPercentage = (((discount_price / base_price) - 1) * 100).toFixed(0) + '% OFF!';

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-lg">
            <Row>
              <Col md={4} className="d-flex align-items-center">
                <Card.Img
                  variant="top"
                  src={img_url}
                  alt={title}
                  className="img-fluid"
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title className="">{title}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <div className="mb-4">
                    <h4 className="text-danger">${parseFloat(discount_price).toLocaleString()}</h4>
                    <Badge bg="danger" className="ms-2" style={{ fontSize: '1rem' }}>{discountPercentage}</Badge>
                    {discount_price !== base_price && (
                      <h6 className="text-muted"><del>${parseFloat(base_price).toLocaleString()}</del></h6>
                    )}
                  </div>

                  <Card.Text>
                    <strong>Constellation:</strong> {constellation} <br />
                    <strong>Color:</strong> {color} <br />
                    <strong>Distance:</strong> {distance} light years <br />
                    <strong>Diameter:</strong> {diameter} km <br />
                    <strong>Radius:</strong> {radius} km <br />
                    <strong>Luminosity:</strong> {luminosity} times the Sun's luminosity
                  </Card.Text>
                  <i className='fa-solid fa-cart-plus fa-xl mx-2' />
                  <i className="fa-solid fa-heart-circle-plus fa-xl mx-2" />
                  <Button variant="primary" className="mt-3">
                    Añadir al carrito
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicationDetails;

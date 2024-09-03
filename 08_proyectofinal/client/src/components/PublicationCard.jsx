// PublicationCard.jsx
import React from 'react';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PublicationCard = ({ publication }) => {
  // Helper function to format the prices
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const discountPercentage = (((publication.discount_price / publication.base_price) - 1) * 100).toFixed(0) + '% OFF!';

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Link to={`/publications/${publication.publication_id}`}>
        <Card.Img variant="top" src={publication.img_url} alt={publication.title} className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="text-dark">{publication.title}</Card.Title>
          
          {/* Base Price - Strikethrough */}
          <Card.Text className="text-secondary" style={{ textDecoration: 'line-through' }}>
            {formatPrice(publication.base_price)}
          </Card.Text>
          
          {/* Discounted Price with Badge */}
          <Row className="align-items-center ">
            <Col xs="auto">
              <Card.Text className="text-dark" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {formatPrice(publication.discount_price)}
              </Card.Text>
            </Col>
            <Col xs="auto">
              <Badge bg="danger" className="ms-2" style={{ fontSize: '1rem' }}>{discountPercentage}</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Link>
      <Container className="pb-2">
        <i className='fa-solid fa-cart-plus fa-xl mx-2' />
        <i className="fa-solid fa-heart-circle-plus fa-xl mx-2" />
      </Container>
    </Card>
  );
};

export default PublicationCard;

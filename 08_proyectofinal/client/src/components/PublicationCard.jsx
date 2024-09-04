import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';

const PublicationCard = ({ publication, userFavorites, updateFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const discountPercentage = (((publication.discount_price / publication.base_price) - 1) * 100).toFixed(0) + '% OFF!';

  useEffect(() => {
    if (userFavorites && userFavorites.some(fav => fav.publication_id === publication.publication_id)) {
      setIsFavorite(true);
    }
  }, [userFavorites, publication.publication_id]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');  // Fetch token from localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      if (isFavorite) {
        await axios.delete(ENDPOINT.favorites, {
          data: { publication_id: publication.id },
          ...config
        });
        updateFavorites(publication.id, 'remove');
        setIsFavorite(false);
      } else {
        await axios.post(ENDPOINT.favorites, { publication_id: publication.id }, config);
        updateFavorites(publication.id, 'add');
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Link to={`/publications/${publication.publication_id}`}>
        <Card.Img variant="top" src={publication.img_url} alt={publication.title} className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="text-dark">{publication.title}</Card.Title>
          <Card.Text className="text-secondary" style={{ textDecoration: 'line-through' }}>
            {formatPrice(publication.base_price)}
          </Card.Text>

          {/* Discounted Price with Badge */}
          <Row className="align-items-center">
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
      <Container className="my-3 pb-2 d-flex justify-content-center">
        <i className='fa-solid fa-cart-plus fa-xl mx-2' />
        <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart fa-xl mx-2`}
          onClick={toggleFavorite}
          style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'gray' }}
        />
      </Container>
    </Card>
  );
};

export default PublicationCard;

// MyFavoriteCard.jsx
import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';

const MyFavoriteCard = ({ publication, userFavorites, updateFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(userFavorites.some(fav => fav.publication_id === publication.publication_id));
  }, [userFavorites, publication.publication_id]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (isFavorite) {
        await axios.delete(`${ENDPOINT.favorites}`, { data: { publication_id: publication.publication_id }, ...config });
        updateFavorites(publication.publication_id, 'remove');
        setIsFavorite(false);
      } else {
        await axios.post(`${ENDPOINT.favorites}`, { publication_id: publication.publication_id }, config);
        updateFavorites(publication.publication_id, 'add');
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
        </Card.Body>
      </Link>
      <Container className="my-3 pb-2 d-flex justify-content-center">
        <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart fa-xl mx-2`}
          onClick={toggleFavorite}
          style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'gray' }}
        />
      </Container>
    </Card>
  );
};

export default MyFavoriteCard;

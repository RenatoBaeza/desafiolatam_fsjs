import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';

const MyFavoriteCard = ({ favorite, onRemove }) => {
  // Debugging: Check the favorite object
  console.log(favorite);

  const handleRemoveFavorite = () => {
    const token = localStorage.getItem('token');
    axios.delete(`${ENDPOINT.favorites}/${favorite.publication_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        if (onRemove) onRemove(favorite.publication_id);
      })
      .catch(error => {
        console.error("Error removing favorite:", error);
      });
  };

  // Ensure favorite exists and has the required properties before rendering
  if (!favorite || !favorite.img_url || !favorite.title) {
    return null;  // Return nothing if the data is incomplete
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={favorite.img_url} alt={favorite.title}
        className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{favorite.title}</Card.Title>
        <Button variant="danger" onClick={handleRemoveFavorite}>
          Quitar de Favoritos
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyFavoriteCard;

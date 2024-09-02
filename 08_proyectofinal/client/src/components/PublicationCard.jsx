// PublicationCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PublicationCard = ({ publication }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={publication.img_url} alt={publication.title} className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{publication.title}</Card.Title>
        <Card.Text>{publication.description}</Card.Text>
        <Link to={`/publications/${publication.publication_id}`}>
          <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        <Card.Text>Status: {publication.status}</Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default PublicationCard;

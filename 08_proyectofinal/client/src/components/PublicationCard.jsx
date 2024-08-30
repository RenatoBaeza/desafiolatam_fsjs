import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PublicationCard = ({ publication }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={publication.img_url} alt={publication.title} />
      <Card.Body>
        <Card.Title>{publication.title}</Card.Title>
        <Card.Text>
          {publication.description}
        </Card.Text>
        <Button variant="primary">Status: {publication.status}</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Published on: {new Date(publication.creation_timestamp).toLocaleDateString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default PublicationCard;

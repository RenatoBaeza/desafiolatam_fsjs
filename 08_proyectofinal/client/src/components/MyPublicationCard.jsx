import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { ENDPOINT } from '../config/constants'; // Adjust the import based on your file structure

const MyPublicationCard = ({ publication, onDelete }) => {
  const handleDelete = () => {
    const token = localStorage.getItem('token'); // Or sessionStorage depending on your app logic

    axios.delete(`${ENDPOINT.publications}/${publication.publication_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      onDelete(publication.publication_id);  // Update the UI by calling the parent component's onDelete
    })
    .catch(error => {
      console.error("Error deleting publication:", error);
    });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={publication.img_url} alt={publication.title}
                className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{publication.title}</Card.Title>
        <Card.Text>{publication.description}</Card.Text>
        <Button variant="success">Editar</Button>
        <Button variant="danger" onClick={handleDelete}>Borrar</Button>
      </Card.Body>
      <Card.Footer>
        <Card.Text>Status: {publication.status}</Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default MyPublicationCard;

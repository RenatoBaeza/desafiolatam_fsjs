import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ENDPOINT } from '../config/constants'; // Adjust the import based on your file structure

const MyPublicationCard = ({ publication, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    const token = localStorage.getItem('token'); // Or sessionStorage depending on your app logic

    axios.delete(`${ENDPOINT.publications}/${publication.publication_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      onDelete(publication.publication_id);  // Update the UI by calling the parent component's onDelete
      setShowModal(false); // Close the modal after successful deletion
    })
    .catch(error => {
      console.error("Error deleting publication:", error);
      setShowModal(false); // Close the modal even if there's an error
    });
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={publication.img_url} alt={publication.title}
                  className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{publication.title}</Card.Title>
          <Card.Text>{publication.description}</Card.Text>
          <Button variant="success">Editar</Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>Borrar</Button>
        </Card.Body>
        <Card.Footer>
          <Card.Text>Status: {publication.status}</Card.Text>
        </Card.Footer>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="primary">
          ¿Estás seguro que quieres borrar la publicación "{publication.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyPublicationCard;

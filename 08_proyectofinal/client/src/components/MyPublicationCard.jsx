// MyPublicationCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';

const MyPublicationCard = ({ publication, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`${ENDPOINT.publications}/${publication.publication_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      if (onDelete) onDelete(publication.publication_id);
      setShowModal(false);
    })
    .catch(error => {
      console.error("Error deleting publication:", error);
      setShowModal(false);
    });
  };

  const handleEdit = () => {
    navigate(`/editpublication/${publication.publication_id}`);
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={publication.img_url} alt={publication.title} 
                  className="img-fluid" style={{ aspectRatio: '1', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{publication.title}</Card.Title>
          <Button variant="success" onClick={handleEdit}>Editar</Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>Borrar</Button>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="primary" style={{ color: 'black' }}>
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

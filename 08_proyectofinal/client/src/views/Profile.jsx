// Profile.jsx
import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constants';
import { Spinner, Card, Button, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDeveloperData = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response }) => {
        console.error(response?.data || "Failed to fetch user data");
        localStorage.removeItem('token');
        setDeveloper(null);
        navigate('/');
      });
  };

  const fetchUserPublications = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    setLoading(true);
    axios.get(`${ENDPOINT.myPublications}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setPublications(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user publications:", error);
        setLoading(false);
      });
  };

  const handleDeletePublication = (publicationId) => {
    setPublications(prevPublications => 
      prevPublications.filter(publication => publication.publication_id !== publicationId)
    );
  };

  useEffect(() => {
    getDeveloperData();
    fetchUserPublications();
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>!</h1>
      <h2>Mi perfil</h2>
      
      <div className='d-flex flex-wrap justify-content-center'>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row className='my-4'>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Mis Publicaciones</Card.Title>
                <Card.Text>Mira y edita tus estrellas publicadas</Card.Text>
                <Button onClick={() => navigate('/ProfileMyPublications')}>Ir a mis Publicaciones</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Mis Favoritos</Card.Title>
                <Card.Text>Mira tus estrellas añadidas a favoritos</Card.Text>
                <Button onClick={() => navigate('/ProfileMyFavorites')}>Ir a mis Favoritos</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Mi Carrito</Card.Title>
                <Card.Text>Ver las estrellas que tienes en tu carrito</Card.Text>
                <Button onClick={() => navigate('/cart')}>Ir a mi Carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        )}
      </div>
    </div>
  );
}

export default Profile;

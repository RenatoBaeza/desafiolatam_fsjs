// Create.jsx
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { ENDPOINT } from '../config/constants';

const initialForm = {
  title: '',
  description: '',
  img_url: '',
  status: 'active',
  base_price: '',
  discount_price: '',
  constellation: '',
  color: '',
  distance: '',
  diameter: '',
  radius: '',
  luminosity: ''
};

const Create = () => {
  const [publicacion, setPublicacion] = useState(initialForm);

  const handlePublicacion = (event) =>
    setPublicacion({ ...publicacion, [event.target.name]: event.target.value });

  const handleForm = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage');
    } else {
      console.log('Token en uso:', token);
    }
    axios
      .post(ENDPOINT.publications, publicacion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        window.alert('Publicación creada con éxito');
        setPublicacion(initialForm);
      })
      .catch(({ response: { data } }) => {
        console.error(data);
        window.alert(`Error: ${data.message}`);
      });
  };

  return (
    <div className='py-5'>
      <h1 className='text-center mb-4'>
        Vende tu estrella en <span className='fw-bold'>⭐Starstruck</span>
      </h1>
      <Card className='p-4 shadow-sm col-10 col-md-8 col-lg-6 mx-auto'>
        <Form onSubmit={handleForm}>
          <h4 className='mb-4'>Información General</h4>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name='title'
                  value={publicacion.title}
                  onChange={handlePublicacion}
                  placeholder='Título de tu publicación'
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Precio Base ($)</Form.Label>
                <Form.Control
                  name='base_price'
                  value={publicacion.base_price}
                  onChange={handlePublicacion}
                  placeholder='Precio base ($)'
                  type='number'
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Precio Descuento ($)</Form.Label>
                <Form.Control
                  name='discount_price'
                  value={publicacion.discount_price}
                  onChange={handlePublicacion}
                  placeholder='Precio Descuento ($)'
                  type='number'
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name='description'
                  value={publicacion.description}
                  onChange={handlePublicacion}
                  placeholder='Descripción de tu estrella'
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  name='img_url'
                  value={publicacion.img_url}
                  onChange={handlePublicacion}
                  placeholder='URL de la imagen'
                />
              </Form.Group>
            </Col>
          </Row>

          <h4 className='mt-4 mb-4'>Detalles de la Estrella</h4>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Constelación</Form.Label>
                <Form.Control
                  name='constellation'
                  value={publicacion.constellation}
                  onChange={handlePublicacion}
                  placeholder='Constelación'
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Color</Form.Label>
                <Form.Control
                  name='color'
                  value={publicacion.color}
                  onChange={handlePublicacion}
                  placeholder='Color'
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Distancia (años luz)</Form.Label>
                <Form.Control
                  name='distance'
                  value={publicacion.distance}
                  onChange={handlePublicacion}
                  placeholder='Distancia'
                  type='number'
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Diámetro</Form.Label>
                <Form.Control
                  name='diameter'
                  value={publicacion.diameter}
                  onChange={handlePublicacion}
                  placeholder='Diámetro'
                  type='number'
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Radio</Form.Label>
                <Form.Control
                  name='radius'
                  value={publicacion.radius}
                  onChange={handlePublicacion}
                  placeholder='Radio'
                  type='number'
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Luminosidad</Form.Label>
                <Form.Control
                  name='luminosity'
                  value={publicacion.luminosity}
                  onChange={handlePublicacion}
                  placeholder='Luminosidad'
                  type='number'
                  step='any'
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type='submit' variant='success' className='w-40'>Crear Publicación</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Create;

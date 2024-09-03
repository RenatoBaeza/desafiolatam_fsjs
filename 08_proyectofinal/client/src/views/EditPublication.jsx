// EditPublication.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';

const EditPublication = () => {
    const { id: publicationId } = useParams();
    const [formData, setFormData] = useState({
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
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublication = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${ENDPOINT.publications}/${publicationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching publication data");
                setLoading(false);
            }
        };
        fetchPublication();
    }, [publicationId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${ENDPOINT.publications}/${publicationId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/perfil');
            }, 2000);
        } catch (error) {
            console.error("Error updating publication:", error);
            setError("Failed to update publication.");
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <Card className="shadow-sm p-4">
                        <h2 className="text-center mb-4">Editar Publicación</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">¡Publicación actualizada con éxito! Redirigiendo...</Alert>}
                        
                        <Form onSubmit={handleSubmit}>
                            {/* General Information */}
                            <h4 className='mb-4'>Información General</h4>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formTitle" className="mb-4">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Título de la publicación"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formBasePrice" className="mb-4">
                                        <Form.Label>Precio Base ($)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="base_price"
                                            value={formData.base_price}
                                            onChange={handleChange}
                                            placeholder="Precio base ($)"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formDiscountPrice" className="mb-4">
                                        <Form.Label>Precio Descuento ($)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="discount_price"
                                            value={formData.discount_price}
                                            onChange={handleChange}
                                            placeholder="Precio Descuento ($)"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Description and Image */}
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="formDescription" className="mb-4">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Descripción de la publicación"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="formImageUrl" className="mb-4">
                                        <Form.Label>URL de la Imagen</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="img_url"
                                            value={formData.img_url}
                                            onChange={handleChange}
                                            placeholder="URL de la imagen"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Star Details */}
                            <h4 className='mt-4 mb-4'>Detalles de la Estrella</h4>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formConstellation" className="mb-4">
                                        <Form.Label>Constelación</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="constellation"
                                            value={formData.constellation}
                                            onChange={handleChange}
                                            placeholder="Constelación"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formColor" className="mb-4">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            placeholder="Color"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formDistance" className="mb-4">
                                        <Form.Label>Distancia (años luz)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="distance"
                                            value={formData.distance}
                                            onChange={handleChange}
                                            placeholder="Distancia"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formDiameter" className="mb-4">
                                        <Form.Label>Diámetro (km)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="diameter"
                                            value={formData.diameter}
                                            onChange={handleChange}
                                            placeholder="Diámetro"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formRadius" className="mb-4">
                                        <Form.Label>Radio (km)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="radius"
                                            value={formData.radius}
                                            onChange={handleChange}
                                            placeholder="Radio"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formLuminosity" className="mb-4">
                                        <Form.Label>Luminosidad</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="luminosity"
                                            value={formData.luminosity}
                                            onChange={handleChange}
                                            placeholder="Luminosidad"
                                            step="any"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit" className="w-40">
                                Actualizar Publicación
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPublication;

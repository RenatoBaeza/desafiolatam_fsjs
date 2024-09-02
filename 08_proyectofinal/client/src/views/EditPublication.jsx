import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

const EditPublication = () => {
    const { id: publicationId } = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', img_url: '', status: '' });
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

    if (loading) return <Spinner animation="border" variant="primary" />;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h2>Edit Publication</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Publication updated successfully! Redirecting...</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImageUrl" className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="img_url"
                                value={formData.img_url}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus" className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update Publication
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPublication;

// PublicationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import { Container, Row, Col, Card, Spinner, Badge, Button } from "react-bootstrap";

const PublicationDetails = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT.publications}/${id}`)
      .then(({data}) => {
        setPublication(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching publication details:", error);
        setLoading(false);
      });
  
    fetchFavorites();
  }, [id]);
  
  const fetchFavorites = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.favorites, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          console.log('Fetched Favorites:', data); // Check if favorites are fetched correctly
          setUserFavorites(data);
          if (data.some(fav => fav.publication_id === id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!publication) {
    return <p>Publication not found</p>;
  }

  const {
    title,
    description,
    img_url,
    status,
    base_price,
    discount_price,
    constellation,
    color,
    distance,
    diameter,
    radius,
    luminosity
  } = publication;

  const discountPercentage = (((discount_price / base_price) - 1) * 100).toFixed(0) + '% OFF!';

  const addCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(ENDPOINT.cart, { publication_id: publication.publication_id }, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log('Item added to cart:', response.data);
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
    } else {
      console.error('No token found, user is not authorized.');
    }
  };

  const updateFavorites = (publication_id, action) => {
    setUserFavorites(prevFavorites => {
      if (action === 'add') {
        return [...prevFavorites, { publication_id: publication_id }];
      } else if (action === 'remove') {
        return prevFavorites.filter(fav => fav.publication_id !== publication_id);
      }
      return prevFavorites;
    });
  };

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');  // Fetch token from localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      if (isFavorite) {
        await axios.delete(ENDPOINT.favorites, { data: { publication_id: publication.publication_id }, ...config });
        updateFavorites(publication.publication_id, 'remove');
        setIsFavorite(false);
      } else {
        await axios.post(ENDPOINT.favorites, { publication_id: publication.publication_id }, config);
        updateFavorites(publication.publication_id, 'add');
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-lg">
            <Row>
              <Col md={4} className="d-flex align-items-center">
                <Card.Img
                  variant="top"
                  src={img_url}
                  alt={title}
                  className="img-fluid"
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title className="">{title}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <div className="mb-4">
                    <h4 className="text-danger">${parseFloat(discount_price).toLocaleString()}</h4>
                    <Badge bg="danger" className="ms-2" style={{ fontSize: '1rem' }}>{discountPercentage}</Badge>
                    {discount_price !== base_price && (
                      <h6 className="text-muted"><del>${parseFloat(base_price).toLocaleString()}</del></h6>
                    )}
                  </div>

                  <Card.Text>
                    <strong>Constellation:</strong> {constellation} <br />
                    <strong>Color:</strong> {color} <br />
                    <strong>Distance:</strong> {distance} light years <br />
                    <strong>Diameter:</strong> {diameter} km <br />
                    <strong>Radius:</strong> {radius} km <br />
                    <strong>Luminosity:</strong> {luminosity} times the Sun's luminosity
                  </Card.Text>
                  <i className='fa-solid fa-cart-plus fa-xl mx-2'
                      onClick={addCart}  
                  />
                  <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart fa-xl mx-2`}
                      onClick={toggleFavorite}
                      style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'gray' }}
                  />
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicationDetails;

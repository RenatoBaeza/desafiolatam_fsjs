// Home.jsx
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constants';
import PublicationCard from '../components/PublicationCard';
import { Spinner } from 'react-bootstrap';

const Cart = () => {
  const { setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  const getDeveloperData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          localStorage.removeItem('token');
          setDeveloper(null);
        });
    }
  };

  const fetchPublications = () => {
    axios.get(ENDPOINT.publications)
      .then(({ data }) => {
        setPublications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching publications:", error);
        setLoading(false);
      });
  };

  const fetchFavorites = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.favorites, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          console.log('Fetched Favorites:', data); // Check if favorites are fetched correctly
          setUserFavorites(data);
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
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

  useEffect(() => {
    getDeveloperData();
    fetchPublications();
    fetchFavorites();
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido a <span className='fw-bold'>⭐Starstruck</span></h1>
      <p>¡Compra y vende tu estrella aquí!</p>
      <h2>Estrellas activamente en venta</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className='d-flex flex-wrap justify-content-center'>
          {publications.map(publication => (
            <PublicationCard 
              key={publication.publication_id} 
              publication={publication} 
              userFavorites={userFavorites} 
              updateFavorites={updateFavorites} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
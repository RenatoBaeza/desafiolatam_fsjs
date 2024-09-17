// ProfileMyFavorites.jsx
import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constants';
import MyFavoriteCard from '../components/MyFavoriteCard';
import { Spinner } from 'react-bootstrap';

const ProfileMyFavorites = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [favorites, setFavorites] = useState([]);
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

  const fetchFavoritePublications = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    setLoading(true);
    axios.get(`${ENDPOINT.favorites}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching favorite publications:", error);
        setLoading(false);
      });
  };

  const updateFavorites = (publicationId, action) => {
    if (action === 'remove') {
      setFavorites(favorites.filter(fav => fav.publication_id !== publicationId));
    } else {
    }
  };

  useEffect(() => {
    getDeveloperData();
    fetchFavoritePublications();
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>!</h1>
      <h2>Mis estrellas favoritas</h2>
      
      <div className='d-flex flex-wrap justify-content-center'>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          favorites.map(favorite => (
            <MyFavoriteCard 
              key={favorite.publication_id} 
              publication={favorite} 
              userFavorites={favorites} 
              updateFavorites={updateFavorites} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileMyFavorites;

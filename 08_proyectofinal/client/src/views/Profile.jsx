// Profile.jsx
import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constants';
import PublicationCard from '../components/PublicationCard';


const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);

  const getDeveloperData = () => {
    const token = localStorage.getItem('token');  // Or localStorage, depending on your app logic
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

    axios.get(`${ENDPOINT.myPublications}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setPublications(data);  // Store user-specific publications
      })
      .catch(error => {
        console.error("Error fetching user publications:", error);
      });
  };

  useEffect(() => {
    getDeveloperData();
    fetchUserPublications();  // Fetch user-specific publications on mount
  }, [navigate, setDeveloper]);

  return (
    <div className='py-5'>
      <h1>Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>!</h1>
      <h2>Mis estrellas en venta</h2>
      
      <div className='d-flex flex-wrap justify-content-center'>
        {publications.map(publication => (
          <PublicationCard key={publication.publication_id} publication={publication} />
        ))}
      </div>
    </div>
  );
}

export default Profile;

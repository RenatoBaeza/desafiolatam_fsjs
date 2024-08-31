import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constants';
import PublicationCard from '../components/PublicationCard';

const Home = () => {
  const { setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token');
          setDeveloper(null);
        });
    }
  };

const fetchPublications = () => {
  axios.get(ENDPOINT.publications)  // Use the correct endpoint property
    .then(({ data }) => {
      setPublications(data);  // Store publications data in state
    })
    .catch((error) => {
      console.error("Error fetching publications:", error);
    });
};

  useEffect(() => {
    getDeveloperData();
    fetchPublications();  // Fetch publications when component mounts
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido a <span className='fw-bold'>⭐Starstruck</span></h1>
      <p>¡Compra y vende tu estrella aquí!</p>

      <h2>Estrellas activamente en venta</h2>
      <div className='d-flex flex-wrap justify-content-center'>
        
        {publications.map(publication => (
          <PublicationCard key={publication.publication_id} publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default Home;

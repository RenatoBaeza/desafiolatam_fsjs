// Home.jsx
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constants';
import PublicationCard from '../components/PublicationCard';
import { Spinner } from 'react-bootstrap';

const Home = () => {
  const { setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getDeveloperData();
    fetchPublications();
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido a <span className='fw-bold'>⭐Starstruck</span></h1>
      <p>¡Compra y vende tu estrella aquí!</p>
      <h2>Estrellas activamente en venta</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">Loading...</Spinner>
        </div>
      ) : (
        <div className='d-flex flex-wrap justify-content-center'>
          {publications.map(publication => (
            <PublicationCard key={publication.publication_id} publication={publication}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

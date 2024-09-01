import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constants';
import PublicationCard from '../components/PublicationCard';
import { Spinner } from 'react-bootstrap'; // Import Spinner from React Bootstrap

const Home = () => {
  const { setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
    setLoading(true); // Set loading to true before starting the API call
    axios.get(ENDPOINT.publications)
      .then(({ data }) => {
        setPublications(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching publications:", error);
        setLoading(false); // Set loading to false even if there’s an error
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
      <div className='d-flex flex-wrap justify-content-center'>

        {loading ? (  // Show spinner while loading
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          publications.map(publication => (
            <PublicationCard key={publication.publication_id} publication={publication} />
          ))
        )}

      </div>
    </div>
  );
};

export default Home;

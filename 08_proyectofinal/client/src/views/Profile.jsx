import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constants';
import MyPublicationCard from '../components/MyPublicationCard';
import { Spinner } from 'react-bootstrap'; // Import Spinner from React Bootstrap

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  const getDeveloperData = () => {
    const token = localStorage.getItem('token');  // Or sessionStorage depending on your app logic
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

    setLoading(true);  // Set loading to true before starting the API call
    axios.get(`${ENDPOINT.myPublications}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setPublications(data);  // Store user-specific publications
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching user publications:", error);
        setLoading(false);  // Set loading to false even if there’s an error
      });
  };

  useEffect(() => {
    getDeveloperData();
    fetchUserPublications();  // Fetch user-specific publications on mount
    // No dependencies are needed here because we're managing token logic manually.
  }, []);

  return (
    <div className='py-5'>
      <h1>Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>!</h1>
      <h2>Mis estrellas en venta</h2>
      
      <div className='d-flex flex-wrap justify-content-center'>
        {loading ? (  // Show spinner while loading
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          publications.map(publication => (
            <MyPublicationCard key={publication.publication_id} publication={publication} />
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;

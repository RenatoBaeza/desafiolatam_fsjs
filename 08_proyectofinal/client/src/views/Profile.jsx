// Profile.jsx
import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');  // Or localStorage, depending on your app logic
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response }) => {
        console.error(response?.data || "Failed to fetch user data");
        window.sessionStorage.removeItem('token');  // Or localStorage if you're using that
        setDeveloper(null);
        navigate('/');
      });
  };

  useEffect(() => {
    getDeveloperData();
  }, [navigate, setDeveloper]);  // Include dependencies like navigate and setDeveloper

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}!</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  );
}

export default Profile;

import axios from 'axios';
import { ENDPOINT } from '../config/constants'; // Adjust the import based on your file structure

const MyPublicationCard = ({ publication, onDelete }) => {
  const handleDelete = () => {
    const token = localStorage.getItem('token');  // Or sessionStorage depending on your app logic

    axios.delete(`${ENDPOINT.publications}/${publication.publication_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      onDelete(publication.publication_id);  // Call the passed onDelete function to update the UI
    })
    .catch(error => {
      console.error("Error deleting publication:", error);
    });
  };

  return (
    <div className="publication-card">
      <h3>{publication.title}</h3>
      <p>{publication.description}</p>
      {/* Other publication details */}

      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
};

export default MyPublicationCard;

// Create.jsx
import axios from 'axios';
import { useState } from 'react';
import { ENDPOINT } from '../config/constants';

const initialForm = {
  nombre: '',
  descripcion: '',
  img_url: ''
};

const Create = () => {
  const [publicacion, setPublicacion] = useState(initialForm);

  const handlePublicacion = (event) =>
    setPublicacion({ ...publicacion, [event.target.name]: event.target.value });

  const handleForm = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
    } else {
      console.log('Token being used:', token); // Debugging line
    }
    axios
      .post(ENDPOINT.publications, publicacion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        window.alert('Publicación creada con éxito 😀.');
        setPublicacion(initialForm); // Reset form after successful submission
      })
      .catch(({ response: { data } }) => {
        console.error(data);
        window.alert(`${data.message} 🙁.`);
      });
  };

  return (
    <div className='py-5'>
      <h1>
        Vende tu estrella en<span className='fw-bold'>⭐Starstruck</span>
      </h1>
      <form
        onSubmit={handleForm}
        className='col-10 col-sm-6 col-md-3 m-auto mt-5'
      >
        <div className='form-group mt-1 '>
          <label>Nombre</label>
          <input
            name='nombre'
            value={publicacion.nombre}
            onChange={handlePublicacion}
            className='form-control'
            placeholder='Ingresa un título a tu publicación'
          />
        </div>
        <div className='form-group mt-1 '>
          <label>Descripción</label>
          <input
            name='descripcion'
            value={publicacion.descripcion}
            onChange={handlePublicacion}
            type='text'
            className='form-control'
            placeholder='Descripción'
          />
        </div>
        <div className='form-group mt-1 '>
          <label>URL de la imagen</label>
          <input
            name='img_url'
            value={publicacion.img_url}
            onChange={handlePublicacion}
            className='form-control'
            placeholder='URL de la imagen'
          />
        </div>
        <button type='submit' className='btn btn-success mt-3'>
          Crear publicación
        </button>
      </form>
    </div>
  );
};

export default Create;

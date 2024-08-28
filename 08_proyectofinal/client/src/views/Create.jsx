import axios from 'axios'
import { useState } from 'react'
import { ENDPOINT } from '../config/constants'

const initialForm = {
  nombre: '',
  descripcion: '',
  img_url: ''
}

const Create = () => {
  const [publicacion, setPublicacion] = useState(initialForm)

  const handlePublicacion = (event) => setPublicacion({ ...publicacion, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()
    axios.post(ENDPOINT.publications, publicacion)
      .then(() => {
        window.alert('Publicación creada con éxito 😀.')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })
  }

  return (
    <div className='py-5'>
      <h1>Vende tu estrella en<span className='fw-bold'>⭐Starstruck</span></h1>
      <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
        <div className='form-group mt-1 '>
          <label>Nombre</label>
          <input
            value={publicacion.nombre}
            onChange={handlePublicacion}
            className='form-control'
            placeholder='Ingresa un título a tu publicación'
          />
        </div>
        <div className='form-group mt-1 '>
          <label>Descripción</label>
          <input
            value={publicacion.descripcion}
            onChange={handlePublicacion}
            type='password'
            name='password'
            className='form-control'
            placeholder='Descripción'
          />
        </div>
        <div className='form-group mt-1 '>
          <label>URL de la imagen</label>
          <input
            value={publicacion.img_url}
            onChange={handlePublicacion}
            className='form-control'
            placeholder='URL de la imagen'
          />
        </div>
        <button type='submit' className='btn btn-success mt-3'>Crear publicación</button>
      </form>
    </div>
  )
}

export default Create

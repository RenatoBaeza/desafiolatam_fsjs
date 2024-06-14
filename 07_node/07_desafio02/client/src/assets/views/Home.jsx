// Home.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [song, setSong] = useState('');
    const [artist, setArtist] = useState('');
    const [tone, setTone] = useState('');
  
    const handleAddSong = () => {
      const newSong = { song, artist, tone };
      setSongs([...songs, newSong]);
      setSong('');
      setArtist('');
      setTone('');
    };
  
    const handleDeleteSong = (index) => {
      const newSongs = songs.filter((_, i) => i !== index);
      setSongs(newSongs);
    };

return (
    <Container>
        <h1 className="text-center my-4">🎶 Mi repertorio 🎶</h1>
        <Form>
            <Form.Group>
                <Form.Label>Canción</Form.Label>
                <Form.Control type="text" value={song} onChange={(e) => setSong(e.target.value)}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Artista</Form.Label>
                <Form.Control type="text" value={artist} onChange={(e) => setArtist(e.target.value)}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Tono</Form.Label>
                <Form.Control type="text" value={tone} onChange={(e) => setTone(e.target.value)}/>
            </Form.Group>

            <Button className="mt-3" onClick={handleAddSong}>Agregar</Button>
        </Form>

        <h2 className="text-center my-4">Tabla de canciones 🎤</h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Canción</th>
                <th>Artista</th>
                <th>Tono</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {songs.map((song, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{song.song}</td>
                <td>{song.artist}</td>
                <td>{song.tone}</td>
                <td>
                    <Button variant="warning" className="me-2">Editar</Button>
                    <Button variant="danger" onClick={() => handleDeleteSong(index)}>Eliminar</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </Container>
    );
};

export default Home;
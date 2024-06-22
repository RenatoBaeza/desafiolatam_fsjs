const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// Load the JSON file
let rawData = fs.readFileSync('repertorio.json');
let songs = JSON.parse(rawData);

// POST /canciones
app.post('/canciones', (req, res) => {
    const newSong = req.body;
    newSong.id = songs.length ? songs[songs.length - 1].id + 1 : 1;
    songs.push(newSong);
    fs.writeFileSync('repertorio.json', JSON.stringify(songs, null, 2));
    res.status(201).send(newSong);
});

// GET /canciones
app.get('/canciones', (req, res) => {
    res.json(songs);
});

// PUT /canciones/:id
app.put('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedSong = req.body;
    const index = songs.findIndex(song => song.id === id);
    if (index !== -1) {
        songs[index] = { ...songs[index], ...updatedSong };
        fs.writeFileSync('repertorio.json', JSON.stringify(songs, null, 2));
        res.send(songs[index]);
    } else {
        res.status(404).send({ error: 'Song not found' });
    }
});

// DELETE /canciones/:id
app.delete('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = songs.findIndex(song => song.id === id);
    if (index !== -1) {
        const deletedSong = songs.splice(index, 1);
        fs.writeFileSync('repertorio.json', JSON.stringify(songs, null, 2));
        res.send(deletedSong);
    } else {
        res.status(404).send({ error: 'Song not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
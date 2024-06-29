const { agregarPost, obtenerPost } = require('./consultas')
const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.get("/posts", async (req, res) => {
    const viajes = await obtenerPost()
    res.json(viajes)
    })

app.post("/posts", async (req, res) => {
    const { titulo, img, description, likes } = req.body
    await agregarPost(titulo, img, description, likes)
    res.send("Post agregado con éxito")
    })
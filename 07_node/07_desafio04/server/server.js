const { agregarPost, obtenerPost, eliminarPost, like } = require('./consultas')
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
    const { titulo, url, descripcion, likes } = req.body
    try {
        await agregarPost(titulo, url, descripcion, likes)
        res.send("Post agregado con éxito")
        }
    catch ({ code, message }) {
        res.status(code).send(message)
        }
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    try {
        await eliminarPost(id)
        res.send("Post eliminado con éxito")
        }
    catch ({ code, message }) {
        res.status(code).send(message)
        }
    })

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const newLikes = await like(id);
        res.json({ likes: newLikes, message: "Likes actualizados con éxito" });
    } 
    catch (error) {
        console.error('Error actualizando likes:', error);
        res.status(error.code || 500).send(error.message);
    }
});

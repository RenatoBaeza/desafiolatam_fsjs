const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.listen(3000, () => console.log("¡Servidor encendido!"));

app.use(cors())
app.use(express.json());

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    res.json(canciones);
});

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    canciones.push(cancion);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("¡Canción agregada con éxito!");
});

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    const index = canciones.findIndex(p => p.id == id);
    if (index === -1) {
        return res.status(404).send("cancion no encontrado");
    }
    canciones.splice(index, 1);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("¡Canción eliminada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    const index = canciones.findIndex(p => p.id == id);
    if (index === -1) {
        return res.status(404).send("Canción no encontrada :(");
    }
    canciones[index] = cancion;
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("¡Canción modificada con éxito!");
});

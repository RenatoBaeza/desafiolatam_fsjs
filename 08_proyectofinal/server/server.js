// Server.js
const { registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion, validateToken, obtenerPublicaciones } = require('./consultas');
const express = require('express');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post("/usuarios", async (req, res) => {
    try {
        const usuario = req.body;
        await registrarUsuario(usuario);
        res.send("User created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await verificarCredenciales(email, password); // It throws an error if credentials are invalid
        const token = jwt.sign({ email: usuario.email }, "az_AZ", { expiresIn: '1h' }); // Token expires in 1 hour
        res.send({ token });
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.get("/usuarios", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        res.send([usuario]);
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.post("/publications", validateToken, async (req, res) => {
    try {
        const { title, description, img_url, status } = req.body;
        const user_id = req.user.email;

        if (!title || !status) {
            return res.status(400).send("Title and status are required");
        }

        const publicacion = {
            user_id,
            title,
            description,
            img_url,
            status,
            creation_timestamp: new Date()
        };

        await crearPublicacion(publicacion);
        res.status(201).send("Publication created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/publications", async (req, res) => {
    try {
        const publicaciones = await obtenerPublicaciones();
        res.send(publicaciones);  // Return all rows of publications
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

module.exports = app;
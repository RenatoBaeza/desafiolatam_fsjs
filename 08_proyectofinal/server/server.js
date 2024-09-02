// Server.js
const { pool, registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion, validateToken, obtenerPublicaciones, obtenerPublicacionesUsuario, obtenerPublicacionPorId } = require('./consultas');
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

app.get("/my-publications", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        
        // Fetch the user to get their user_id
        const usuario = await obtenerUsuario(email);

        // Get the publications for this specific user
        const publicaciones = await obtenerPublicacionesUsuario(usuario.user_id);
        
        res.send(publicaciones);
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.delete('/publications/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        const consulta = "DELETE FROM PUBLICACIONES WHERE publication_id = $1 AND user_id = $2 RETURNING *";
        const { rowCount } = await pool.query(consulta, [id, usuario.user_id]);

        if (rowCount === 0) {
            return res.status(404).send("Publication not found or unauthorized.");
        }

        res.status(200).send("Publication deleted successfully");
    } catch (error) {
        console.error("Error deleting publication:", error);
        res.status(500).send(error.message); // More detailed error logging
    }
});

app.get('/publications/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        const publicacion = await obtenerPublicacionPorId(id, usuario.user_id);
        res.send(publicacion);
    } catch (error) {
        console.error("Error fetching publication:", error);
        res.status(error.code || 500).send(error.message); // Handle errors properly
    }
});

app.put('/publications/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        
        const { title, description, img_url, status } = req.body;
        const consulta = `
            UPDATE PUBLICACIONES
            SET title = $1, description = $2, img_url = $3, status = $4
            WHERE publication_id = $5 AND user_id = $6
            RETURNING *;
        `;
        const values = [title, description, img_url, status, id, usuario.user_id];
        
        const { rowCount, rows } = await pool.query(consulta, values);

        if (rowCount === 0) {
            return res.status(404).send("Publication not found or unauthorized.");
        }

        res.status(200).send("Publication updated successfully");
    } catch (error) {
        console.error("Error updating publication:", error);
        res.status(500).send(error.message);
    }
});

module.exports = app;
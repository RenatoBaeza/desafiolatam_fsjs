// Server.js
const { pool, registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion, validateToken
    , obtenerPublicaciones, obtenerPublicacionesUsuario, obtenerPublicacionPorId, agregarFavorito, eliminarFavorito, obtenerFavoritosUsuario } = require('./consultas');
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
        const usuario = await verificarCredenciales(email, password);
        const token = jwt.sign({ email: usuario.email }, "az_AZ", { expiresIn: '1h' });
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
        const { title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity } = req.body;
        const user_id = req.user.email;

        if (!title || !status) {
            return res.status(400).send("Title and status are required");
        }

        const publicacion = {user_id, title, description, img_url, status, creation_timestamp: new Date(), base_price, discount_price, constellation, color, distance, diameter, radius, luminosity};
        await crearPublicacion(publicacion);
        res.status(201).send("Publication created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/publications", async (req, res) => {
    try {
        const publicaciones = await obtenerPublicaciones();
        res.send(publicaciones);
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.get("/my-publications", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
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
        res.status(500).send(error.message);
    }
});

app.get('/publications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await obtenerPublicacionPorId(id);
        res.send(publicacion);
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.put('/publications/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        
        const { title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity } = req.body;
        const consulta = `
            UPDATE PUBLICACIONES
            SET title = $3, description = $4, img_url = $5, status = $6, base_price = $7, discount_price = $8 , constellation = $9, color = $10, distance = $11, diameter = $12, radius = $13, luminosity = $14
            WHERE publication_id = $1 AND user_id = $2
            RETURNING *;
        `;
        const values = [id, usuario.user_id, title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity];
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

app.post("/favorites", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        const { publication_id } = req.body;
        console.log("Publication ID is " + publication_id);
        await agregarFavorito(usuario.user_id, publication_id);
        res.status(201).send("Favorite added successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/favorites", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        const { publication_id } = req.body;

        await eliminarFavorito(usuario.user_id, publication_id);
        res.status(200).send("Favorite removed successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/favorites", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const usuario = await obtenerUsuario(email);
        const favoritos = await obtenerFavoritosUsuario(usuario.user_id);
        res.send(favoritos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = app;
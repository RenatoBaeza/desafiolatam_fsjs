// Server.js
const { registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion} = require('./consultas');
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

const verifyCredentials = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Credenciales incompletas");
    }
    next();
};

const validateToken = (req, res, next) => {
    console.log('Headers:', req.headers);
    const Authorization = req.header("Authorization");
    console.log('Authorization header:', Authorization);
    
    if (!Authorization) {
        console.log('No Authorization header provided');
        return res.status(401).send("No se proporcionó un token");
    }

    const parts = Authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log('Invalid Authorization header format');
        return res.status(401).send("Formato de Authorization inválido");
    }

    const token = parts[1];
    console.log('Extracted token:', token);

    try {
        const verified = jwt.verify(token, "az_AZ");
        console.log('Token verified successfully:', verified);
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send(`Token inválido: ${error.message}`);
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token expirado');
        } else {
            return res.status(401).send(`Error de verificación de token: ${error.message}`);
        }
    }
};

const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
};

app.use(logRequest);

app.post("/usuarios", verifyCredentials, async (req, res) => {
    try {
        const usuario = req.body;
        await registrarUsuario(usuario);
        res.send("Usuario creado con éxito");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/login", verifyCredentials, async (req, res) => {
    try {
        const { email, password } = req.body;
        await verificarCredenciales(email, password);
        const token = jwt.sign({ email }, "az_AZ");
        res.send({ token });
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error.message);
    }
});

app.get("/usuarios", validateToken, async (req, res) => {
    try {
        const email = req.user.email;
        console.log('Fetching user data for email:', email);
        const usuario = await obtenerUsuario(email);
        res.send([usuario]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(error.code || 500).send(error.message);
    }
});

app.post("/publications", validateToken, async (req, res) => {
    try {
        const { title, description, img_url, status } = req.body;
        const user_id = req.user.email; // Assuming you're using email as user_id

        if (!title || !status) {
            return res.status(400).send("Title and status are required");
        }

        const publicacion = {user_id, title, description, img_url, status, creation_timestamp: Date.now()};

        await crearPublicacion(publicacion);
        res.status(201).send("Publication created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

module.exports = app;
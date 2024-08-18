const { registrarUsuario, verificarCredenciales, obtenerUsuario} = require('./consultas');
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
    const Authorization = req.header("Authorization");
    if (!Authorization) {
        return res.status(401).send("No se proporcionó un token");
    }

    const token = Authorization.split("Bearer ")[1];
    if (!token) {
        return res.status(401).send("Formato de token incorrecto");
    }

    try {
        const verified = jwt.verify(token, "az_AZ");
        req.email = verified.email;
        next();
    } catch (error) {
        return res.status(401).send("Token inválido");
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
        const email = req.email;
        const usuario = await obtenerUsuario(email);
        res.send([usuario]);
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});

app.post("/publications", verifyCredentials, async (req, res) => {
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

module.exports = app;
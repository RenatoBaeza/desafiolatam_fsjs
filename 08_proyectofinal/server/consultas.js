// Consultas.js
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const getCurrentTimestamp = () => new Date().toISOString().replace('T', ' ').replace('Z', '');
const fs = require('fs');
const jwt = require("jsonwebtoken");

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    allowExitOnIdle: true
});

const registrarUsuario = async (usuario) => {
    const { user_id, email, password, creation_timestamp, status } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [uuidv4(), email, passwordEncriptada, getCurrentTimestamp(), "active"];
    const consulta = "INSERT INTO USUARIOS (user_id, email, password, creation_timestamp, status) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(consulta, values);
};

const verificarCredenciales = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM USUARIOS WHERE email = $1";
    const { rows, rowCount } = await pool.query(consulta, values);

    if (!rowCount) {
        throw { code: 404, message: "User not found" };
    }

    const usuario = rows[0];
    const { password: passwordEncriptada } = usuario;

    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Invalid credentials" };
    }

    return usuario;
};

const obtenerUsuario = async (email) => {
    const values = [email];
    const consulta = "SELECT * FROM USUARIOS WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw { code: 404, message: "No se encontró ningún usuario con este email" };
    }
    return usuario;
};

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send("Access denied. No token provided.");
    }

    const token = authHeader.split(' ')[1];  // Extract the token from the 'Bearer TOKEN' format

    try {
        const decoded = jwt.verify(token, "az_AZ");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send("Invalid token.");
    }
};

const obtenerPublicaciones = async (email) => {
    const values = [email];
    const consulta = "SELECT * FROM PUBLICACIONES";
    const { rows: [publicaciones], rowCount } = await pool.query(consulta, values);
    return publicaciones;
};

const crearPublicacion = async (publicacion) => {
    const { title, description, img_url, status } = publicacion;
    const email = publicacion.user_id; // Assuming email is passed as user_id

    // Fetch the actual user_id from the USUARIOS table using email
    const { rows } = await pool.query("SELECT user_id FROM USUARIOS WHERE email = $1", [email]);

    if (rows.length === 0) {
        throw new Error("User not found");
    }

    const user_id = rows[0].user_id;

    const values = [uuidv4(), user_id, getCurrentTimestamp(), title, description, img_url, status];
    const consulta = "INSERT INTO PUBLICACIONES (publication_id, user_id, creation_timestamp, title, description, img_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    await pool.query(consulta, values);
};

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion, validateToken, obtenerPublicaciones };
// Consultas.js
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const getCurrentTimestamp = () => new Date().toISOString().replace('T', ' ').replace('Z', '');
const fs = require('fs');
const jwt = require("jsonwebtoken");

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
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

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "az_AZ");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send("Invalid token.");
    }
};

const obtenerPublicaciones = async () => {
    const consulta = "SELECT * FROM PUBLICACIONES";
    const { rows } = await pool.query(consulta);
    return rows;
};

const obtenerPublicacionesUsuario = async (user_id) => {
    const consulta = "SELECT * FROM PUBLICACIONES WHERE user_id = $1";
    const { rows } = await pool.query(consulta, [user_id]);
    return rows;
};

const crearPublicacion = async (publicacion) => {
    const { title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity } = publicacion;
    const email = publicacion.user_id;
    const { rows } = await pool.query("SELECT user_id FROM USUARIOS WHERE email = $1", [email]);

    if (rows.length === 0) {
        throw new Error("User not found");
    }

    const user_id = rows[0].user_id;
    const values = [uuidv4(), user_id, getCurrentTimestamp(), title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity];
    const consulta = "INSERT INTO PUBLICACIONES (publication_id, user_id, creation_timestamp, title, description, img_url, status, base_price, discount_price, constellation, color, distance, diameter, radius, luminosity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
    await pool.query(consulta, values);
};

const obtenerPublicacionPorIdUser = async (publication_id, user_id) => {
    const consulta = "SELECT * FROM PUBLICACIONES WHERE publication_id = $1 AND user_id = $2";
    const { rows, rowCount } = await pool.query(consulta, [publication_id, user_id]);

    if (rowCount === 0) {
        throw { code: 404, message: "Publication not found or unauthorized" };
    }

    return rows[0];
};

const obtenerPublicacionPorId = async (publication_id) => {
    const consulta = "SELECT * FROM PUBLICACIONES WHERE publication_id = $1";
    const { rows, rowCount } = await pool.query(consulta, [publication_id]);

    if (rowCount === 0) {
        throw { code: 404, message: "Publication not found or unauthorized" };
    }

    return rows[0];
};

const agregarFavorito = async (user_id, publication_id) => {
    const values = [user_id, publication_id];
    const consulta = `
        INSERT INTO FAVORITES (user_id, publication_id) VALUES ($1, $2)
        ON CONFLICT (user_id, publication_id) DO UPDATE
        SET creation_timestamp = CURRENT_TIMESTAMP;`;
    await pool.query(consulta, values);
};

const eliminarFavorito = async (user_id, publication_id) => {
    const values = [user_id, publication_id];
    const consulta = `DELETE FROM FAVORITES WHERE user_id = $1 AND publication_id = $2;`;
    await pool.query(consulta, values);
};

const obtenerFavoritosUsuario = async (user_id) => {
    const consulta = `
            SELECT P.*
            FROM PUBLICACIONES P 
            INNER JOIN FAVORITES F ON P.publication_id = F.publication_id 
            WHERE F.user_id = $1
                      `;
    const { rows } = await pool.query(consulta, [user_id]);
    return rows;
};

const agregarCarrito = async (user_id, publication_id) => {
    const values = [user_id, publication_id];
    const consulta = `
        INSERT INTO CART (user_id, publication_id) VALUES ($1, $2)
        SET creation_timestamp = CURRENT_TIMESTAMP;`;
    await pool.query(consulta, values);
};

const eliminarCarrito = async (user_id, publication_id) => {
    const values = [user_id, publication_id];
    const consulta = `DELETE FROM CART WHERE user_id = $1 AND publication_id = $2;`;
    await pool.query(consulta, values);
};

const obtenerCarritoUsuario = async (user_id) => {
    const consulta = `
            SELECT PUBLICATION_ID, COUNT(*) AS PURCHASES
            FROM CART
            WHERE F.user_id = $1
            GROUP BY 1
            ORDER BY 2 DESC
            `;
    const { rows } = await pool.query(consulta, [user_id]);
    return rows;
};

module.exports = { pool, registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion, validateToken,
                    obtenerPublicaciones, obtenerPublicacionesUsuario, obtenerPublicacionPorId, obtenerPublicacionPorIdUser,
                    agregarFavorito, eliminarFavorito, obtenerFavoritosUsuario, agregarCarrito, eliminarCarrito, obtenerCarritoUsuario
                };
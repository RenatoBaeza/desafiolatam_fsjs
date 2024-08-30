const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const getCurrentTimestamp = () => new Date().toISOString().replace('T', ' ').replace('Z', '');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    allowExitOnIdle: true
});

const registrarUsuario = async (usuario) => {
    const { user_id, email, password, creation_timestamp, creation_date, status } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [uuidv4(), email, passwordEncriptada, getCurrentTimestamp(), creation_date, "active"];
    const consulta = "INSERT INTO USUARIOS (user_id, email, password, creation_timestamp, creation_date, status) VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(consulta, values);
};

const verificarCredenciales = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM USUARIOS WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
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

const crearPublicacion = async (publicacion) => {
    const {user_id, title, description, img_url, status, creation_timestamp } = publicacion;
    const values = [uuidv4(), title, description, img_url, "active", getCurrentTimestamp()];
    const consulta = "INSERT INTO PUBLICACIONES (user_id, title, description, img_url, status, creation_timestamp) VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(consulta, values);
};

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion };

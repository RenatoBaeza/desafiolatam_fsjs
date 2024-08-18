const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const current_timestamp = Math.round(Date.now()/1000)

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});

const registrarUsuario = async (usuario) => {
    const { user_id, email, password, creation_timestamp, status } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [uuidv4(), email, passwordEncriptada, current_timestamp, "active"];
    const consulta = "INSERT INTO USUARIOS (user_id, email, password, creation_timestamp, status) VALUES ($1, $2, $3, $4, $5)";
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
    const { publication_id, user_id, creation_timestamp, title, description, img_url } = publicacion;
    const values = [uuidv4(), email, current_timestamp, title, description, img_url];
    const consulta = "INSERT INTO PUBLICACIONES (publication_id, user_id, creation_timestamp, title, description, img_url) VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(consulta, values);
};

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario, crearPublicacion };

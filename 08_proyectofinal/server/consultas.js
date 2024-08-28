const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    allowExitOnIdle: true
});

const registrarUsuario = async (usuario) => {
    const { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)";
    await pool.query(consulta, values);
};

const verificarCredenciales = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
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
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw { code: 404, message: "No se encontró ningún usuario con este email" };
    }
    return usuario;
};

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario };

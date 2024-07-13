const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'joyas',
    allowExitOnIdle: true
});

const obtenerJoyasConClausulas = async (limits, page, order_by) => {
    const [column, direction] = order_by.split('_');
    const offset = (page - 1) * limits;
    const query = `
        SELECT * FROM inventario 
        ORDER BY ${column} ${direction} 
        LIMIT $1 OFFSET $2
    `;
    const { rows } = await pool.query(query, [limits, offset]);
    return rows;
}

const obtenerJoyasConFiltros = async (precio_min, precio_max, categoria, metal) => {
    let filtros = [];
    let valores = [];
    let index = 1;

    if (precio_min) {
        filtros.push(`precio >= $${index}`);
        valores.push(precio_min);
        index++;
    }
    if (precio_max) {
        filtros.push(`precio <= $${index}`);
        valores.push(precio_max);
        index++;
    }
    if (categoria) {
        filtros.push(`categoria = $${index}`);
        valores.push(categoria);
        index++;
    }
    if (metal) {
        filtros.push(`metal = $${index}`);
        valores.push(metal);
    }

    const whereClause = filtros.length > 0 ? 'WHERE ' + filtros.join(' AND ') : '';
    const query = `SELECT * FROM inventario ${whereClause}`;
    const { rows } = await pool.query(query, valores);
    return rows;
}

module.exports = { obtenerJoyasConClausulas, obtenerJoyasConFiltros }
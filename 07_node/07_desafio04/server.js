const { obtenerJoyasConClausulas, obtenerJoyasConFiltros } = require('./consultas');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const registroRutas = (req, res, next) => {
    const log = `Ruta consultada: ${req.url} - ${new Date().toISOString()}\n`;
    fs.appendFileSync('registro_rutas.log', log);
    next();
}

app.use(registroRutas);

app.get("/joyas", async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const joyas = await obtenerJoyasConClausulas(limits, page, order_by);
        res.json({
            joyas,
            _links: {
                self: `http://localhost:${PORT}/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
                next: `http://localhost:${PORT}/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener las joyas' });
    }
});

app.get("/joyas/filtros", async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;
        const filtros = await obtenerJoyasConFiltros(precio_min, precio_max, categoria, metal);
        res.json(filtros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al filtrar las joyas' });
    }
});
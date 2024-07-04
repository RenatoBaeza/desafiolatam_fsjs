const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '5eiq7aog',
    database: 'likeme',
    allowExitOnIdle: true
})

const agregarPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, '0')"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}

const obtenerPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    }

const like = async (id) => {
    const result = await pool.query('SELECT likes FROM posts WHERE id = $1', [id]);
    const currentLikes = result.rows[0].likes;
    console.log(currentLikes);

    let newLikes;
        if (currentLikes == 0) {
            newLikes = currentLikes + 1;
        } else if (currentLikes > 0) {
            newLikes = currentLikes - 1;
        } else {
            throw { code: 400, message: 'Invalid action' };
        }

    await pool.query('UPDATE posts SET likes = $1 WHERE id = $2', [newLikes, id]);
    return newLikes;
};

module.exports = { agregarPost, obtenerPost, eliminarPost, like }
CREATE TABLE peliculas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    anno INT NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(32) NOT NULL
);

CREATE TABLE peliculas_tags (
    pelicula_id INT REFERENCES peliculas(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (pelicula_id, tag_id)
);

-- 2. Insertar 5 películas y 5 tags, con asociaciones específicas.
INSERT INTO peliculas (nombre, anno) VALUES 
('The Godfather', 1972),
('Gone with the Wind', 1939),
('Casablanca', 1942),
('Citizen Kane', 1941),
('Pyscho', 1960);

-- Insertando tags
INSERT INTO tags (tag) VALUES 
('Romance'),
('Drama'),
('Horror'),
('Crimen'),
('Misterio');

-- Asignando tags a películas
INSERT INTO peliculas_tags (pelicula_id, tag_id) VALUES 
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 4),
(3, 5),
(4, 3),
(4, 2);

-- 3. Contar la cantidad de tags que tiene cada película.
SELECT p.nombre, COUNT(pt.tag_id) AS numero_tags
FROM peliculas p
LEFT JOIN peliculas_tags pt ON p.id = pt.pelicula_id
GROUP BY p.id;

-- 4. Crear tablas correspondientes respetando nombres, tipos, claves primarias y foráneas. Supongamos que las tablas son para un sistema de preguntas y respuestas.
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL
);

CREATE TABLE preguntas (
    id SERIAL PRIMARY KEY,
    texto VARCHAR(255) NOT NULL
);

CREATE TABLE respuestas (
    id SERIAL PRIMARY KEY,
    pregunta_id INT REFERENCES preguntas(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    respuesta_texto VARCHAR(255) NOT NULL
);

-- 5. Insertar usuarios y preguntas, y contestar preguntas como se especifica.
INSERT INTO usuarios (nombre, edad) VALUES 
('Juan', 25),
('Miguel', 30),
('Ana', 22),
('Ramón', 28),
('Roberto', 35);

INSERT INTO preguntas (texto) VALUES 
('¿Cuánto es 2+2?'),
('¿Cuánto es 3+3?'),
('¿Cuánto es 4+4?'),
('¿Cuánto es 5+5?'),
('¿Cuánto es 6+6?');

INSERT INTO respuestas (pregunta_id, usuario_id, respuesta_texto) VALUES 
(1, 1, 'Respuesta correcta'),
(1, 2, 'Respuesta correcta'), 
(2, 3, 'Respuesta correcta'), 
(3, 4, 'Respuesta incorrecta'), 
(4, 5, 'Respuesta incorrecta'), 
(5, 1, 'Respuesta incorrecta');

-- 6. Contar la cantidad de respuestas correctas por usuario.
SELECT u.nombre, COUNT(r.id) AS respuestas_correctas
FROM usuarios u
JOIN respuestas r ON u.id = r.usuario_id
JOIN preguntas p ON r.pregunta_id = p.id
WHERE r.respuesta_texto = p.texto
GROUP BY u.id;

-- 7. Contar cuántos usuarios respondieron correctamente por cada pregunta.
SELECT p.texto, COUNT(r.id) AS usuarios_respondieron_correctamente
FROM preguntas p
JOIN respuestas r ON p.id = r.pregunta_id
WHERE r.respuesta_texto = p.texto
GROUP BY p.id;

-- 8. Implementar un borrado en cascada de las respuestas al borrar un usuario.
DELETE FROM usuarios WHERE id = 1;

-- 9. Crear una restricción que impida insertar usuarios menores de 18 años.
ALTER TABLE usuarios
ADD CONSTRAINT check_edad CHECK (edad >= 18);

-- 10. Alterar la tabla de usuarios agregando el campo email con restricción única.
ALTER TABLE usuarios
ADD COLUMN email VARCHAR(255) UNIQUE;
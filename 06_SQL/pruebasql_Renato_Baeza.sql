-- 1. Revisa el tipo de relación y crea el modelo correspondiente. Respeta las claves primarias, foráneas y tipos de datos
CREATE DATABASE pruebaSQL_Renato_Baeza_529;

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
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    edad INTEGER
);

CREATE TABLE Preguntas (
    id SERIAL PRIMARY KEY,
    pregunta VARCHAR(255),
    respuesta_correcta VARCHAR(255)
);

CREATE TABLE Respuestas (
    id SERIAL PRIMARY KEY,
    respuesta VARCHAR(255),
    usuario_id INTEGER,
    pregunta_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (pregunta_id) REFERENCES Preguntas(id)
);

-- 5. Insertar usuarios y preguntas, y contestar preguntas como se especifica.
INSERT INTO usuarios (nombre, edad) VALUES 
('Juan', 25),
('Miguel', 30),
('Ana', 22),
('Ramón', 28),
('Roberto', 35);

INSERT INTO preguntas (pregunta, respuesta_correcta) VALUES 
('¿Cuánto es 2+2?', '4'),
('¿Cuánto es 3+3?', '6'),
('¿Cuánto es 4+4?', '8'),
('¿Cuánto es 5+5?', '10'),
('¿Cuánto es 6+6?', '12');

INSERT INTO respuestas (pregunta_id, usuario_id, respuesta) VALUES 
(1, 1, '4'),
(1, 2, '4'), 
(2, 3, '6'), 
(3, 4, '5'), 
(4, 5, '11'), 
(5, 1, '13');

-- 6. Contar la cantidad de respuestas correctas por usuario.
SELECT u.nombre, COUNT(*) AS total_respuestas_correctas
FROM Respuestas r
LEFT JOIN Usuarios u ON r.usuario_id = u.id
LEFT JOIN Preguntas p ON r.pregunta_id = p.id
WHERE r.respuesta = p.respuesta_correcta
GROUP BY u.nombre;

-- 7. Contar cuántos usuarios respondieron correctamente por cada pregunta.
SELECT p.id AS pregunta_id, p.pregunta, COUNT(r.id) AS total_respuestas_correctas
FROM Preguntas p
LEFT JOIN Respuestas r ON p.id = r.pregunta_id AND r.respuesta = p.respuesta_correcta
GROUP BY p.id, p.pregunta;

-- 8. Implementar un borrado en cascada de las respuestas al borrar un usuario.
ALTER TABLE Respuestas DROP CONSTRAINT IF EXISTS respuestas_usuario_id_fkey;

ALTER TABLE Respuestas
ADD CONSTRAINT respuestas_usuario_id_fkey
FOREIGN KEY (usuario_id)
REFERENCES Usuarios(id)
ON DELETE CASCADE;

DELETE FROM Usuarios WHERE id = 1;
SELECT * FROM Usuarios WHERE id = 1;
SELECT * FROM Respuestas WHERE usuario_id = 1;

-- 9. Crear una restricción que impida insertar usuarios menores de 18 años.
ALTER TABLE usuarios
ADD CONSTRAINT check_edad CHECK (edad >= 18);

-- 10. Alterar la tabla de usuarios agregando el campo email con restricción única.
ALTER TABLE Usuarios
ADD COLUMN email VARCHAR(255) UNIQUE;
CREATE DATABASE desafio3_Renato_Baeza_623;
USE desafio3_Renato_Baeza_623;

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

INSERT INTO Usuarios (email, nombre, apellido, rol) VALUES
('gaston@cabezas.com', 'Gastón', 'Cabezas', 'administrador'),
('juanito@recabarren.com', 'Juanito', 'Recabarren', 'usuario'),
('maria@silva.com', 'María', 'Silva', 'usuario'),
('ana@gomez.com', 'Ana', 'Gómez', 'usuario'),
('miguel@gonzalez.com', 'Miguel', 'González', 'usuario');

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP NOT NULL,
    destacado BOOLEAN NOT NULL,
    usuario_id BIGINT --,
    --FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

INSERT INTO Posts (titulo, contenido, fecha_creacion, fecha_actualizacion, destacado, usuario_id) VALUES
('Post 1', 'Contenido del Post 1', '2023-05-10 10:00:00', '2023-05-10 10:00:00', TRUE, 1),
('Post 2', 'Contenido del Post 2', '2023-05-11 11:00:00', '2023-05-11 11:00:00', TRUE, 1),
('Post 3', 'Contenido del Post 3', '2023-05-12 12:00:00', '2023-05-12 12:00:00', FALSE, 2),
('Post 4', 'Contenido del Post 4', '2023-05-13 13:00:00', '2023-05-13 13:00:00', FALSE, 3),
('Post 5', 'Contenido del Post 5', '2023-05-14 14:00:00', '2023-05-14 14:00:00', FALSE, NULL);

CREATE TABLE Comentarios (
    id SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    usuario_id BIGINT,
    post_id BIGINT--,
    --FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    --FOREIGN KEY (post_id) REFERENCES Posts(id)
);

INSERT INTO Comentarios (contenido, fecha_creacion, usuario_id, post_id) VALUES
('Comentario 1 del Post 1', '2023-05-10 15:00:00', 1, 1),
('Comentario 2 del Post 1', '2023-05-10 16:00:00', 2, 1),
('Comentario 3 del Post 1', '2023-05-10 17:00:00', 3, 1),
('Comentario 1 del Post 2', '2023-05-11 18:00:00', 1, 2),
('Comentario 2 del Post 2', '2023-05-11 19:00:00', 2, 2);

-- 2. Cruza los datos de la tabla usuarios y posts, mostrando las siguientes columnas: nombre y email del usuario junto al título y contenido del post.
SELECT u.nombre, u.email, p.titulo, p.contenido
FROM Usuarios u
JOIN Posts p ON u.id = p.usuario_id;

-- 3. Muestra el id, título y contenido de los posts de los administradores
SELECT p.id, p.titulo, p.contenido
FROM Posts p
JOIN Usuarios u ON p.usuario_id = u.id
WHERE u.rol = 'administrador';

-- 4. Cuenta la cantidad de posts de cada usuario
SELECT u.id, u.email, COUNT(p.id) AS cantidad_posts
FROM Usuarios u
LEFT JOIN Posts p ON u.id = p.usuario_id
GROUP BY u.id, u.email;

-- 5. Muestra el email del usuario que ha creado más posts
SELECT u.email
FROM Usuarios u
JOIN Posts p ON u.id = p.usuario_id
GROUP BY u.email
ORDER BY COUNT(p.id) DESC
LIMIT 1;

-- 6. Muestra la fecha del último post de cada usuario
SELECT u.id, u.email, MAX(p.fecha_creacion) AS ultimo_post
FROM Usuarios u
LEFT JOIN Posts p ON u.id = p.usuario_id
GROUP BY u.id, u.email;

-- 7. Muestra el título y contenido del post con más comentarios
SELECT p.titulo, p.contenido
FROM Posts p
JOIN Comentarios c ON p.id = c.post_id
GROUP BY p.id
ORDER BY COUNT(c.id) DESC
LIMIT 1;

-- 8. Muestra el título, contenido del post y contenido del comentario asociado, junto con el email del usuario que lo escribió
SELECT p.titulo, p.contenido AS contenido_post, c.contenido AS contenido_comentario, u.email
FROM Posts p
JOIN Comentarios c ON p.id = c.post_id
JOIN Usuarios u ON c.usuario_id = u.id;

-- 9. Muestra el contenido del último comentario de cada usuario
SELECT u.id, u.email, c.contenido
FROM Usuarios u
JOIN Comentarios c ON u.id = c.usuario_id
WHERE c.fecha_creacion = (
    SELECT MAX(c2.fecha_creacion)
    FROM Comentarios c2
    WHERE c2.usuario_id = u.id
);

-- 10. Muestra los emails de los usuarios que no han escrito ningún comentario
SELECT u.email
FROM Usuarios u
LEFT JOIN Comentarios c ON u.id = c.usuario_id
GROUP BY u.email
HAVING COUNT(c.id) = 0;
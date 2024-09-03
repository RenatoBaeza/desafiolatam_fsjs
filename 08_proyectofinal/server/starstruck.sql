CREATE TABLE USUARIOS (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255)
);

CREATE TABLE PUBLICACIONES (
    id SERIAL NOT NULL PRIMARY KEY,
    publication_id VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    img_url VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    base_price DECIMAL(10, 2),
    discount_price DECIMAL(10, 2),
    constellation VARCHAR(255),
    color VARCHAR(255),
    distance INTEGER,
    diameter DECIMAL(10, 2),
    radius DECIMAL(10, 2),
    luminosity DECIMAL(10, 2);
    FOREIGN KEY (user_id) REFERENCES USUARIOS(user_id)
);

CREATE TABLE FAVORITES (
    user_id INT NOT NULL,
    publication_id INT NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, publication_id),
    FOREIGN KEY (user_id) REFERENCES USUARIOS(id),
    FOREIGN KEY (publication_id) REFERENCES PUBLICACIONES(id)
);

CREATE TABLE PURCHASES (
    user_id INT NOT NULL,
    publication_id INT NOT NULL,
    units INT NOT NULL,
    money DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, publication_id),
    FOREIGN KEY (user_id) REFERENCES USUARIOS(id),
    FOREIGN KEY (publication_id) REFERENCES PUBLICACIONES(id)
);

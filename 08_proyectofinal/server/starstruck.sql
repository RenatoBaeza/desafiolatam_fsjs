CREATE TABLE USUARIOS (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creation_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(255)
);

CREATE TABLE PUBLICACIONES (
    publication_id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    creation_timestamp INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    img_url VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USUARIOS(user_id)
);

CREATE TABLE FAVORITES (
    user_id VARCHAR(255) NOT NULL,
    publication_id VARCHAR(255) NOT NULL,
    creation_timestamp INT,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, publication_id),
    FOREIGN KEY (user_id) REFERENCES USUARIOS(user_id),
    FOREIGN KEY (publication_id) REFERENCES PUBLICACIONES(publication_id)
);

CREATE TABLE PURCHASES (
    user_id VARCHAR(255) NOT NULL,
    publication_id VARCHAR(255) NOT NULL,
    units INT NOT NULL,
    money DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    creation_timestamp INT,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, publication_id),
    FOREIGN KEY (user_id) REFERENCES USUARIOS(user_id),
    FOREIGN KEY (publication_id) REFERENCES PUBLICACIONES(publication_id)
);
-- CREATE DATABASE todoapp;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(25) NOT NULL,
    edited BOOLEAN DEFAULT FALSE
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES( "admin", "123");


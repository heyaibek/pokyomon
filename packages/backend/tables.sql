CREATE TABLE IF NOT EXISTS users
(
    id    SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    name  VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS user_pokemons
(
    id         SERIAL PRIMARY KEY,
    user_id    INT       NOT NULL,
    pokemon_id INT       NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (user_id)
        REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS live_pokemons
(
    id         SERIAL PRIMARY KEY,
    pokemon_id INT              NOT NULL,
    lat        DOUBLE PRECISION NOT NULL,
    lng        DOUBLE PRECISION NOT NULL,
    updated_at TIMESTAMP        NOT NULL DEFAULT now()
);

import { Request, Response } from 'express';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import pool from './pool';
import { getGamePokemonIds, spawnLivePokemons } from './utils';

const cache = new NodeCache();

export const getGamePokemons = async (req: Request, res: Response) => {
  const cacheKey = '/getGamePokemons';

  if (cache.has(cacheKey)) {
    res.json(cache.get(cacheKey));
    return;
  }

  const pokemonsIds = getGamePokemonIds();

  const data = await Promise.all(
    pokemonsIds.map(async (pokemonId: number) => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      return await resp.json();
    }),
  );

  res.json(data);

  cache.set(cacheKey, data);
};

export const getLivePokemons = (req: Request, res: Response) => {
  pool.query('SELECT * FROM live_pokemons', (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results.rows);
  });
};

export const getUserPokemons = async (req: Request, res: Response) => {
  const { email } = req.params;

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  pool.query(
    'SELECT * FROM user_pokemons WHERE user_id = $1',
    [rows[0].id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows);
    },
  );
};

export const saveUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (rows.length > 0) {
    console.log(`User with the email address ${email} exists. Skipping...`);
    res.status(201).send();
    return;
  }

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    },
  );
};

export const saveUserPokemon = async (req: Request, res: Response) => {
  const { email, pokemonId } = req.body;

  const { rows: userRows } = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
  );
  const { id: userId } = userRows[0];

  const { rows: userPokemonRows } = await pool.query(
    'SELECT * FROM user_pokemons WHERE user_id = $1 AND pokemon_id = $2',
    [userId, pokemonId],
  );

  if (userPokemonRows.length > 0) {
    console.log(`User ${userId} already has Pokemon ${pokemonId}`);
    res.status(200).send();
    return;
  }

  pool.query(
    'INSERT INTO user_pokemons (user_id, pokemon_id) VALUES ($1, $2) RETURNING *',
    [userId, pokemonId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User pokemon added with ID: ${results.rows[0].id}`);
    },
  );
};

export const refreshCoordinates = async (req: Request, res: Response) => {
  try {
    await spawnLivePokemons();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

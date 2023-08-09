import pool from './pool';
import { generateRandomPoint } from './geo';

/**
 * We just take first 10 Pokemons in this game. So, therefore
 * we simply generate an array of Pokemon IDs.
 */
export function getGamePokemonIds() {
  return [...Array(10).keys()].map(key => key + 1);
}

export async function spawnLivePokemons() {
  // The center of Bishkek
  const center = {
    lat: 42.867961,
    lng: 74.604284,
  };

  // 10km
  const radius = 10 * 1000;

  let values: Array<string> = [];

  // generate 10 unique pokemons 10 times each
  for (let pokemonId = 1; pokemonId <= 10; pokemonId++) {
    for (let i = 1; i <= 10; i++) {
      const point = generateRandomPoint(center, radius);
      values.push(`(${pokemonId}, ${point.lat}, ${point.lng})`);
    }
  }

  try {
    // clear live pokemons
    await pool.query(
      'DELETE FROM live_pokemons WHERE id IN (SELECT id FROM live_pokemons);',
    );

    // persist in DB
    await pool.query(
      `INSERT INTO live_pokemons (pokemon_id, lat, lng)
       VALUES ${values.join(',')} RETURNING *`,
    );

    console.log(`⚡️[server]: Pokemons successfully spawned!`);
  } catch (error) {
    throw error;
  }
}

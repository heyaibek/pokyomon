import { Pokemon } from '../../types';

export const pollPokemons = async (url: string | null) => {
  console.log('Polling Pokemons from API...');

  const response = await fetch(url + '/live-pokemons');
  const data = await response.json();

  const result: Array<Pokemon> = await Promise.all(
    data.map(async (item: any) => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${item['pokemon_id']}`,
      );

      return {
        id: item['id'],
        pokemon_id: item['pokemon_id'],
        lat: item['lat'],
        lng: item['lng'],
        details: await resp.json(),
      };
    }),
  );

  return result;
};

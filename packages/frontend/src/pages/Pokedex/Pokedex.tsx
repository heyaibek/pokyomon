import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PokemonCard from '../../components/PokemonCard';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';

const Page = styled.div`
  flex: 1;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 5);
`;

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [userPokemons, setUserPokemons] = useState<Array<any>>([]);

  const { user } = useAuth();
  const { url } = useApi();

  // fetch existing pokemons in game
  useEffect(() => {
    const fetchPokemons = async () => {
      const resp = await fetch(url + '/game-pokemons');
      setPokemons(await resp.json());
    };

    fetchPokemons();
  }, []);

  // fetch user pokemons
  useEffect(() => {
    const fetchUserPokemons = async () => {
      const resp = await fetch(url + `/user-pokemons/${user?.email}`);
      setUserPokemons(await resp.json());
    };

    fetchUserPokemons();
  }, []);

  const userHasPokemon = (pokemonId: number): boolean => {
    const pokemon = userPokemons.filter(p => p.pokemon_id === pokemonId);
    return pokemon.length > 0;
  };

  return (
    <Page>
      <Grid>
        {pokemons.map((p: any, j: number) => (
          <Card key={j}>
            <PokemonCard
              pokemon={p}
              discovered={() => userHasPokemon(p['id'])}
            />
          </Card>
        ))}
      </Grid>
    </Page>
  );
}

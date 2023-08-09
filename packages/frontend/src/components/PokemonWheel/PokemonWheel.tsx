import PokemonCard from '../PokemonCard';
import React from 'react';
import ReactTurntable from 'react-turntable';
import { Pokemon } from '../../types';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

type PokemonWheelProps = {
  catchingPokemon: Pokemon;
  onWon: () => void;
  onLose: () => void;
};

export default function PokemonWheel({
  catchingPokemon,
  onWon,
  onLose,
}: PokemonWheelProps) {
  const { user } = useAuth();
  const { url } = useApi();

  const saveUserPokemon = async (pokemonId: number) => {
    console.log('Saving Pokemon...');

    await fetch(url + '/save-user-pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pokemonId: pokemonId,
        email: user?.email,
      }),
    });
  };

  return (
    <Container>
      <PokemonCard pokemon={catchingPokemon.details} discovered={() => true} />
      <ReactTurntable
        prizes={[
          'Win',
          'Lose',
          'Lose',
          'Lose',
          'Lose',
          'Win',
          'Lose',
          'Lose',
          'Lose',
          'Lose',
        ]}
        clickText="Catch"
        onComplete={async (result: any) => {
          const won = result === 'Win';
          if (won) {
            await saveUserPokemon(catchingPokemon?.pokemon_id);
          }

          const message = won
            ? `⚡️⚡️⚡️You caught the Pokémon - ${catchingPokemon.details.name}️`
            : `😭😭😭You failed to catch the Pokémon - ${catchingPokemon.details.name}`;

          window.confirm(message);

          if (won) {
            onWon();
          } else {
            onLose();
          }
        }}
      />
    </Container>
  );
}

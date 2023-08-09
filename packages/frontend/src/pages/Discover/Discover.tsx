import 'react-turntable/assets/index.css';

import Map from '../../components/Map';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useInterval } from 'react-use';
import { useEffect, useState } from 'react';
import { pollPokemons } from './utils';
import { Pokemon } from '../../types';
import PokemonCard from '../../components/PokemonCard';
import PokemonWheel from '../../components/PokemonWheel';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';

const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const SidePanel = styled.div`
  flex: 1;
  max-width: 400px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default function Discover() {
  const [gamePokemons, setGamePokemons] = useState<Array<Pokemon>>([]);
  const [visiblePokemons, setVisiblePokemons] = useState<Array<Pokemon>>([]);
  const [catchingPokemon, setCatchingPokemon] = useState<Pokemon | null>(null);

  const { url } = useApi();
  const navigate = useNavigate();

  // poll the pokemons with new coordinates
  useInterval(async () => {
    setGamePokemons(await pollPokemons(url));
  }, 5 * 1000);

  // initial poll
  useEffect(() => {
    const initialPoll = async () => {
      setGamePokemons(await pollPokemons(url));
    };

    initialPoll();
  }, []);

  return (
    <Page>
      <Map
        pokemons={gamePokemons}
        onPokemonsAppear={visiblePokemons => {
          setVisiblePokemons(visiblePokemons);
        }}
      />
      <SidePanel>
        {!visiblePokemons.length && (
          <div>
            <h3>Visible Pokemons</h3>
            <p>Click somewhere on the map to see Pokemons nearby</p>
          </div>
        )}
        {visiblePokemons.map((p: Pokemon, i: number) => (
          <div key={i}>
            <PokemonCard
              mode="compact"
              pokemon={p.details}
              discovered={() => true}
            />
            <p>
              <strong>Location: </strong>
              <span>
                {p.lat} / {p.lng}
              </span>
            </p>
            <button onClick={() => setCatchingPokemon(p)}>Catch</button>
          </div>
        ))}
      </SidePanel>
      <ReactModal preventScroll={true} isOpen={!!catchingPokemon}>
        <button onClick={() => setCatchingPokemon(null)}>Close</button>
        {catchingPokemon && (
          <PokemonWheel
            catchingPokemon={catchingPokemon}
            onWon={() => {
              setCatchingPokemon(null);
              navigate('/pokedex');
            }}
            onLose={() => {
              setCatchingPokemon(null);
            }}
          />
        )}
      </ReactModal>
    </Page>
  );
}

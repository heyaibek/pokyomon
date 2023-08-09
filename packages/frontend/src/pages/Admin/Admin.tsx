import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../types';
import { useInterval } from 'react-use';
import { pollPokemons } from '../Discover/utils';
import Map from '../../components/Map';
import useApi from '../../hooks/useApi';

const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SidePanel = styled.div`
  flex: 1;
  max-width: 400px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default function Admin() {
  const [gamePokemons, setGamePokemons] = useState<Array<Pokemon>>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { url } = useApi();

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

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await fetch(url + '/refresh-coordinates');
    setGamePokemons(await pollPokemons(url));
    setIsRefreshing(false);
  };

  return (
    <Page>
      <Map pokemons={gamePokemons} preventHiding={true} />
      <SidePanel>
        <h2>Tools</h2>
        <p>Only administrators can see this page</p>
        <br />
        <hr />
        <br />
        <p>
          <i>
            Usually Pokemons change their coordinates once a minute and the map
            will be updated. But you can manually refresh the coordinates.
          </i>
        </p>
        <button onClick={handleRefreshClick} disabled={isRefreshing}>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </SidePanel>
    </Page>
  );
}

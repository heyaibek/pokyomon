import 'leaflet/dist/leaflet.css';

import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import L, {LatLngTuple} from 'leaflet';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Pokemon} from '../../types';
import {getDistanceFromLatLonInKm} from './utils';
import ClickMarker from './ClickMarker';

// Bishkek
const defaultPosition: LatLngTuple = [42.867961, 74.604284];

const Container = styled(MapContainer)`
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export type MapProps = {
  preventHiding?: boolean;
  pokemons: Array<Pokemon>;
  onPokemonsAppear?: (visiblePokemons: Array<Pokemon>) => void;
};

export default function Map({
  pokemons,
  onPokemonsAppear,
  preventHiding = false,
}: MapProps) {
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>([0, 0]);
  const [visiblePokemons, setVisiblePokemons] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    setVisiblePokemons(
      pokemons.filter(p => {
        return getDistanceFromLatLonInKm(currentPosition, [p.lat, p.lng]) < 2;
      }),
    );
  }, [currentPosition]);

  useEffect(() => {
    onPokemonsAppear && onPokemonsAppear(visiblePokemons);
  }, [visiblePokemons]);

  const displayedPokemons = preventHiding ? pokemons : visiblePokemons;

  return (
    <Container center={defaultPosition} zoom={12} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!preventHiding && (
        <ClickMarker
          onPositionUpdate={position => setCurrentPosition(position)}
        />
      )}
      {displayedPokemons.map(p => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={L.icon({
            iconUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.pokemon_id}.svg`,
            iconSize: [50, 50],
          })}
        />
      ))}
    </Container>
  );
}

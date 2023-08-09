import L, { LatLngTuple } from 'leaflet';
import React from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';

type ClickMarkerProps = {
  onPositionUpdate?: (position: LatLngTuple) => void;
};

export default function ClickMarker({ onPositionUpdate }: ClickMarkerProps) {
  const [position, setPosition] = React.useState<LatLngTuple>([0, 0]);

  useMapEvents({
    click: e => {
      const nextPosition: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      setPosition(nextPosition);

      onPositionUpdate && onPositionUpdate(nextPosition);
    },
  });

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: iconMarker,
      })}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

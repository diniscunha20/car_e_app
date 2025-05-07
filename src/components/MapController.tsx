import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

type Props = {
  onMapReady: (map: L.Map) => void;
};

const MapController = ({ onMapReady }: Props) => {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  return null;
};

export default MapController;

// MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import "../App.css"



const MapComponent = () => {

  return (
        <div className='map-component'>
            <MapContainer className='map-container' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            </MapContainer>

        </div>
  );
};

export default MapComponent;

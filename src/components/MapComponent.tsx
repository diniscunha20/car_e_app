// MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import "../assets/css/Map.css"
import "../App.css"
import SearchBar from './SearchBar';



const MapComponent = () => {

  return (
      <div className='relative'>

        <div className='absolute z-10 left-1/6 mt-3 w-100% '>
          <SearchBar/>
        </div>

        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100%", zIndex: "0" }} // quick and dirty fullscreen
        > 
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>

  );
};

export default MapComponent;

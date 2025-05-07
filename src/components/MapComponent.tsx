// MapComponent.tsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';
import "../assets/css/Map.css";
import "../App.css";
import SearchBar from './SearchBar';
import AutoShopPopUp from './AutoShopPopUp';

const MapComponent = () => {
  const position: [number, number] = [51.505, -0.09];
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleMarkerClick = () => {
    setPopupContent("You clicked the marker at London!");
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className='relative'>
      <div className='absolute z-10 left-1/6 mt-3 w-100%'>
        <SearchBar />
      </div>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%", zIndex: "0" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} eventHandlers={{ click: handleMarkerClick }} />
      </MapContainer>

      <AutoShopPopUp
        visible={popupVisible}
        onClose={handleClosePopup}
        content={popupContent}
      />
    </div>
  );
};

export default MapComponent;

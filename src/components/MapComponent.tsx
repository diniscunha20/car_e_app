// MapComponent.tsx
import { MapContainer, TileLayer, Marker,Popup, useMap } from 'react-leaflet';
import { useState,useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import "../assets/css/Map.css";
import "../App.css";
import AutoShopPopUp from './AutoShopPopUp';
import MapController from './MapController';


const MapComponent = () => {
  const position: [number, number] = [51.505, -0.09];
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const markers = [
	{ name: "Oficina Besta dos Games", position: [51.505, -0.09] },
	{ name: "Oficina Go Go PowerRangers", position: [52, -1] },
	{ name: "Oficina Fico aqui imaginando o que agente pode fazer", position: [52.52, 1] },
  ];

  const handleMarkerClick = () => {
    setPopupContent("You clicked the marker at London!");
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

	const [searchQuery, setSearchQuery] = useState("");

	const mapRef = useRef<L.Map | null>(null);

	const handleSearchSelect = (marker: typeof markers[0]) => {
	setPopupContent(`You selected ${marker.name}`);
	setPopupVisible(true);

	if (mapRef.current) {
		mapRef.current.setView(marker.position as LatLngExpression, 13);
	}
	};

  return (
    <div className='relative'>
      <div className='absolute z-10 left-17 top-4'>
		<input
			type="text"
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			placeholder="Search a place..."
			className="p-2 bg-white rounded shadow-md w-64 text-black"
		/>
		</div>


      <MapContainer
		center={position}
		zoom={5}
		scrollWheelZoom={false}
		style={{ height: "100vh", width: "100%", zIndex: "0" }}
		>
		<MapController onMapReady={(mapInstance) => { mapRef.current = mapInstance; }} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

		{markers
		.filter(marker =>
			marker.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.map((marker, idx) => (
			<Marker
			key={idx}
			position={marker.position as LatLngExpression}
			eventHandlers={{
				click: () => handleSearchSelect(marker),
			}}
			/>
		))}

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

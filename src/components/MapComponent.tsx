import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import "../assets/css/Map.css";
import "../App.css";
import AutoShopPopUp from './AutoShopPopUp';
import MapController from './MapController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Oficina } from '../assets/Props';

const MapComponent = () => {
	const defaultPosition: [number, number] = [40.645579, -8.629370];
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState("");
	const [oficinas, setOficinas] = useState<Oficina[]>([]);
	const [userLocation, ] = useState<LatLngExpression | null>(defaultPosition);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<{ name: string; position: [number, number] }[]>([]);

	const mapRef = useRef<L.Map | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem('oficinas');
		const parsed: Oficina[] = stored ? JSON.parse(stored) : [];
		setOficinas(parsed);
	}, []);

	const getDistanceFromUser = (markerPosition: LatLngExpression): number => {
		if (!userLocation) return Infinity;
		const userLatLng = L.latLng(userLocation);
		const markerLatLng = L.latLng(markerPosition);
		return userLatLng.distanceTo(markerLatLng) / 1000; // in km
	};

	const geocodeLocation = async (location: string): Promise<[number, number] | null> => {
		try {
			const apiKey = "pk.57561e0a3d9fbf9135110343ae8c46a1"; // Replace with your key
			const response = await fetch(
				`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(location)}&format=json`
			);
			const data = await response.json();

			if (data && data.length > 0) {
				return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
			}
		} catch (error) {
			console.error("Geocoding error:", error);
		}
		return null;
	};

	const markers = (oficinas?.map((oficina) => ({
		name: oficina.nome,
		position: [oficina.localizacao.lat, oficina.localizacao.lng] as [number, number]
	})) ?? []).sort((a, b) =>
		getDistanceFromUser(a.position) - getDistanceFromUser(b.position)
	);

	const centerMapWithOffset = (latlng: LatLngExpression) => {
		if (mapRef.current) {
			const map = mapRef.current;
			const zoom = map.getZoom();
			const point = map.project(latlng, zoom);
			const offsetY = map.getSize().y * 0.25;
			const offsetPoint = L.point(point.x, point.y + offsetY);
			const offsetLatLng = map.unproject(offsetPoint, zoom);
			map.setView(offsetLatLng, zoom, { animate: true });
		}
	};

	const handleMarkerClick = (marker: typeof markers[0]) => {
		const oficina = oficinas.find((oficina) => oficina.nome === marker.name);

		if (oficina) {
			const content = `${JSON.stringify(oficina, null, 2)}`;
			setPopupContent(content);
		} else {
			setPopupContent("Oficina não encontrada.");
		}

		centerMapWithOffset(marker.position);
		setPopupVisible(true);
	};

	const handleClosePopup = () => {
		setPopupVisible(false);
	};

	const handleSearch = async (query: string) => {
		setSearchQuery(query);

		if (!query) {
			setSearchResults([]);
			return;
		}

		const coords = await geocodeLocation(query);

		if (!coords) {
			alert("Location not found.");
			setSearchResults([]);
			return;
		}

		const searchPoint = L.latLng(coords[0], coords[1]);

		// Filter by name OR by proximity (within 10km)
		const filteredMarkers = markers.filter((marker) => {
			const nameMatches = marker.name.toLowerCase().includes(query.toLowerCase());

			const markerLatLng = L.latLng(marker.position[0], marker.position[1]);
			const distance = markerLatLng.distanceTo(searchPoint);
			const nearby = distance <= 10000;

			return nameMatches || nearby;
		});

		if (mapRef.current) {
			mapRef.current.setView(searchPoint, 12, { animate: true });
		}

		console.log("Filtered markers:", filteredMarkers);
		setSearchResults(filteredMarkers);
	};



	return (
		<div className='relative'>
			<div className='relative'>
				<div className="absolute z-10 left-19 top-4 w-64">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSearch(e.currentTarget.search.value);
						}}
						className="relative"
					>
						<input
							name="search"
							type="text"
							defaultValue={searchQuery}
							placeholder="Search a place..."
							className="p-2 bg-stone-800 rounded-md shadow-md w-full text-white pr-10"
						/>
						<button type="submit" className="absolute right-3 top-2 text-white text-lg">
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
			</div>

			<MapContainer
				center={defaultPosition}
				zoom={12}
				scrollWheelZoom={true}
				style={{ height: "100vh", width: "100%", zIndex: "0" }}
			>
				<MapController onMapReady={(mapInstance) => { mapRef.current = mapInstance; }} />
				<TileLayer
					attribution='&copy; OpenStreetMap contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{userLocation && (
					<Marker
						position={userLocation}
						icon={L.icon({
							iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
							iconSize: [35, 35],
							iconAnchor: [16, 32],
							popupAnchor: [0, -32],
						})}
					>
						<Popup>Você está aqui</Popup>
					</Marker>
				)}

				<MarkerClusterGroup>
					{(searchResults.length > 0 ? searchResults : markers)
						.map((marker, idx) => (
							<Marker
								key={idx}
								position={marker.position}
								icon={L.icon({
									iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
									iconSize: [32, 32],
									iconAnchor: [16, 32],
									popupAnchor: [0, -32],
								})}
								eventHandlers={{
									click: () => handleMarkerClick(marker),
								}}
							/>
						))}
				</MarkerClusterGroup>
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

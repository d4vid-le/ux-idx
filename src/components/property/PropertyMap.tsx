import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default function PropertyMap({ latitude, longitude, address }: PropertyMapProps) {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[latitude, longitude]}
            icon={new Icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl: '/marker-shadow.png',
              shadowSize: [41, 41],
            })}
          >
            <Popup>
              <div className="text-gray-700 font-medium">{address}</div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
} 
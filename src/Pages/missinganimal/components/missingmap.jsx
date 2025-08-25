import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Essencial para o mapa funcionar

// Corrige um problema comum de ícones do Leaflet com o React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// O componente recebe a lista de animais como uma prop
function MissingMap({ animals }) {
    // Posição inicial do mapa (centro do Brasil)
    const initialPosition = [-14.2350, -51.9253];

    return (
        <div className="missing-map-container">
            <MapContainer center={initialPosition} zoom={4} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Percorre a lista de animais e cria um marcador para cada um */}
                {animals.map(animal => (
                    // Garante que o animal tenha coordenadas válidas antes de criar o marcador
                    animal.latitude && animal.longitude && (
                        <Marker key={animal.id} position={[animal.latitude, animal.longitude]}>
                            <Popup>
                                <strong>{animal.pet_name}</strong><br />
                                <span>Espécie: {animal.species}</span><br />
                                <span>Visto por último em: {animal.last_seen_address}</span>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
}

export default MissingMap;  
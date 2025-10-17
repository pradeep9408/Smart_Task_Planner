import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapDisplay = ({ position }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map && position) {
            map.flyTo(position, map.getZoom());
        }
    }, [map, position]);

    if (!position) {
        return <p>Loading map...</p>;
    }

    return (
        <MapContainer
            center={position}
            zoom={13}
            whenCreated={setMap}
            style={{ height: '300px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Your Current Location
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapDisplay;
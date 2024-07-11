// Map.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from 'react-toastify';

// Custom marker icon
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ selectedOption, user }) => {
  const [realtimeLocation, setRealtimeLocation] = useState([]);

  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        let apiUrl;

        if (selectedOption) {
          apiUrl = `http://3.109.34.34:8080/fetch-locations/${user.user_id}/${selectedOption}`;
        } else {
          apiUrl = `http://3.109.34.34:8080/live-locations/${user.user_id}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!Array.isArray(data) || !data.every(location => location && location.latitude && location.longitude)) {
          console.error("Invalid data structure:", data);
          return;
        }

        if (selectedOption) {
          if (data.length === 0) {
            toast.error('No available data for the selected device');
          }
          setRealtimeLocation(data.length ? [data[0]] : []);
        } else {
          setRealtimeLocation(
            data.map((deviceLocation) => ({
              device_id: deviceLocation.device_id,
              latitude: parseFloat(deviceLocation.latitude),
              longitude: parseFloat(deviceLocation.longitude),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching initial locations:", error);
      }
    };

    if (selectedOption) {
      fetchInitialLocations();
    }
  }, [selectedOption, user]);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
      {realtimeLocation.map((location) => (
        <Marker key={location.device_id} position={[location.latitude, location.longitude]} icon={redIcon}>
          <Popup>{location.device_id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

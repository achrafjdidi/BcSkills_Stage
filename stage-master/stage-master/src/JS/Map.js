import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Map() {
  const containerStyle = {
    width: '100%',
    height: '600px'
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('Error retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    axios
      .get('/parkings')
      .then((response) => {
        setParkings(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving parkings:', error);
      });
  }, []);

  const handleMarkerClick = (parking) => {
    // Navigate to the parking details page when a marker is clicked
    // Replace '/parking/:id' with the actual route path for the parking details page
    navigate(`/parking/${parking.idParking}`);
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latLng;
    setSelectedLocation({ lat, lng });
  };

  const mapOptions = {
    zoomControl: true,
    zoom: 20
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBa6js7lFRYmJgwM9wbNvCJF9NMqsNq4rw">
      {currentLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {parkings.map((parking) => (
            <Marker
              key={parking.idParking}
              position={{ lat: parking.latitude, lng: parking.longitude }}
              title={parking.nomParking}
              onClick={() => handleMarkerClick(parking)}
            />
          ))}
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              title={`Selected Location (${selectedLocation.lat}, ${selectedLocation.lng})`}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default Map;

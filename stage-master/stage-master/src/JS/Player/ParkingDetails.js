import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaAddressCard, FaChair, FaArrowDown, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ParkingHeader from './ParkingHeader';
import Footer from '../Footer';
import '../../Css/Home.css';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function ParkingDetails() {
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [spots, setSpots] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [floors, setFloors] = useState([]);
  const [directions, setDirections] = useState(null); // Add directions state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkingResponse, floorsResponse] = await Promise.all([
          axios.get(`/parkings/${id}`),
          axios.get(`/api/spots/${id}/floors`),
        ]);

        const parkingData = parkingResponse.data;
        const floorsData = floorsResponse.data;

        setParking(parkingData);
        setFloors(floorsData);

        // Call handleViewSpots to fetch the spots for the default selected floor (floor 1)
        setSelectedFloor(1);
        await handleViewSpots();

        // Set loading to false since data fetching is complete
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error to show the error message
      }
    };

    fetchData();
  }, [id]);

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
  }, []);

  const handleViewSpots = async () => {
    if (!parking) {
      return;
    }

    try {
      const floorsResponse = await axios.get(`/api/spots/${id}/floors`);
      const floorsData = floorsResponse.data;
      const selectedFloorData = floorsData.find((floor) => floor.number === selectedFloor);

      if (!selectedFloorData) {
        console.error('No floor data found for the selected floor.');
        return;
      }

      const parkingId = parking.idParking;
      const floorId = selectedFloorData.id;

      // Make the API call to fetch spots
      const response = await axios.get(`/api/spots/${parkingId}/${floorId}`);
      const spotsData = response.data;
      setSpots(spotsData);
    } catch (error) {
      console.error('Error fetching spots data:', error);
    }
  };

  

  const handleFloorChange = async (event) => {
    const floorNumber = Number(event.target.value);
    setSelectedFloor(floorNumber);

    // Fetch the spots data for the selected floor when the user changes the floor
    try {
      const floorsResponse = await axios.get(`/api/spots/${id}/floors`);
      const floorsData = floorsResponse.data;

      // If floorsData is an array and has the selected floor number
      const selectedFloorData = floorsData.find((floor) => floor.number === floorNumber);
      if (selectedFloorData) {
        const floorId = selectedFloorData.id;
        const response = await axios.get(`/api/spots/${parking.idParking}/${floorId}`);
        const spotsData = response.data;
        setSpots(spotsData);
      } else {
        setSpots([]); // No spots found for the selected floor
      }
    } catch (error) {
      console.error('Error fetching spots data:', error);
    }
  };


  const filteredSpots = spots.filter((spot) => spot.floor.number === selectedFloor);

  const handleDirections = (result) => {
    if (result.status === 'OK') {
      setDirections(result);
    } else {
      console.error('Error fetching directions:', result.status);
    }
  };


  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket("ws://localhost:8087");

    // Handle incoming messages from the WebSocket
    socket.onmessage = (event) => {
      const receivedData = event.data;
      console.log("Received data from WebSocket:", receivedData);

      // Assuming the receivedData contains the disponible value as 0 or 1
      try {
        const availability = JSON.parse(receivedData); // Parse the disponible value (0 or 1)

        // Update the view spot directly based on the received disponible value
        setSpots(prevSpots => prevSpots.map(spot => {
          return { ...spot, disponible: availability };
        }));
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
  

  if (!parking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ParkingHeader />
      <h1 className="mt-3" style={{ textAlign: 'center', fontFamily: 'cursive' }}>
        {parking.nomParking}
      </h1>
      <div className="row justify-content-center">
        <div className="card" style={{ width: '50%' }}>
          <img className="card-img-top mt-3" src={parking.image} alt={parking.nomParking} />
        <div className="card-body">
            <p className="card-text" style={{ fontFamily: 'cursive' }}>
              <FaAddressCard /> {parking.adresse}
            </p>
            <p className="card-text" style={{ fontFamily: 'cursive' }}>
              <FaChair /> {parking.nbrPlace}
            </p>
            <p
              className="card-text"
              style={{ fontFamily: 'cursive', color: 'blue', cursor: 'pointer' }}
              onClick={() => handleViewSpots(selectedFloor)} // Pass the selectedFloor value
            >
              <FaArrowDown /> <b>View Spots</b>
            </p>
            <select value={selectedFloor} onChange={handleFloorChange}>
              {Array.from({ length: parking.numberOfFloors }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Floor {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {filteredSpots.length > 0 && (
        <div>
          <h2>Spots (Floor {selectedFloor})</h2>
          <div className="parking-spots">
            <div className="symbol-row">
              {filteredSpots.map((spot) => (
                <div key={spot.id} className="parking-spot">
                  <div className="spot-content">
                    {spot.disponible ? (
                      <FaCheckCircle className="green-symbol" />
                    ) : (
                      <FaTimesCircle className="red-symbol" />
                    )}
                    <span className="spot-number">{spot.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <LoadScript googleMapsApiKey="AIzaSyBa6js7lFRYmJgwM9wbNvCJF9NMqsNq4rw">
        {currentLocation && (
          <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} center={currentLocation} zoom={15}>
            <Marker position={{ lat: parking.latitude, lng: parking.longitude }} />
            {directions && <DirectionsRenderer directions={directions} />}
            {currentLocation && (
              <DirectionsService
                options={{
                  destination: { lat: parking.latitude, lng: parking.longitude },
                  origin: currentLocation,
                  travelMode: 'DRIVING',
                }}
                callback={handleDirections}
              />
            )}
          </GoogleMap>
        )}
      </LoadScript>
      
      <Footer />
    </div>
  );
}

export default ParkingDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ParkingSpots({ parkingId }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpotsData = async () => {
      try {
        const response = await axios.get(`/api/spots/${parkingId}`);
        const spotsData = response.data;
        setSpots(spotsData);
      } catch (error) { 
        console.error('Error fetching spots data:', error);
      }
    };

    fetchSpotsData();
  }, [parkingId]);

  return (
    <div>
      <h2>Spots</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>{spot.number}</li>
        ))}
      </ul>
    </div>
  );
}

export default ParkingSpots;

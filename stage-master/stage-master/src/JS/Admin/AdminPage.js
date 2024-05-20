import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function AdminPage() {
  const navigate = useNavigate(); 
  const containerStyle = {
    width: '100%',
    height: '600px'
  };

  const [parkings, setParkings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParking, setSelectedParking] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newParkingData, setNewParkingData] = useState({
    nomParking: '',
    numberOfFloors: 0,
    longitude: 0,
    latitude: 0,
    adresse: '',
    nbrPlace: 0,
    image: ''
  });

  useEffect(() => {
    axios
      .get('/parkings')
      .then((response) => {
        setParkings(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving parkings:', error);
      });
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const foundParking = parkings.find((parking) =>
      parking.nomParking && parking.nomParking.toLowerCase().includes(query)
    );
    if (foundParking) {
      setSelectedParking(foundParking);
      setMapCenter({ lat: foundParking.latitude, lng: foundParking.longitude });
    } else {
      setSelectedParking(null);
      setMapCenter({ lat: 0, lng: 0 });
    }
  };

  const handleAdd = () => {
    setShowCreateModal(true);
  };

  const handleMarkerClick = (parking) => {
    // Navigate to the parking details page when a marker is clicked
    // Replace '/admin-page/parking/:id' with the actual route path for the parking details page
    navigate(`/admin-page/parking/${parking.idParking}`);
  };

  const handleCreateParking = () => {
    const validatedData = {
      ...newParkingData,
      name: newParkingData.name || 'Unnamed Parking',
      imageLink: newParkingData.imageLink || 'default-image-link'
    };

    axios
      .post('/parkings', validatedData)
      .then((response) => {
        // Parking created successfully
        setShowCreateModal(false);
        setNewParkingData({
          nomParking: '',
          numberOfFloors: 0,
          longitude: 0,
          latitude: 0,
          adresse: '',
          nbrPlace: 0,
          image: ''
        });

        // Update the parkings state with the newly created parking
        setParkings([...parkings, response.data]);
      })
      .catch((error) => {
        console.error('Error creating parking:', error);
      });
  };

  const handleModify = () => {
    // Add logic for modifying a parking
  };

  const handleDelete = () => {
    // Add logic for deleting a parking
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBC7TrnSJ6ZvaNUaspY6zbmOAbrz5PFF04">
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search for a parking"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        <button onClick={handleSearch} style={searchButtonStyle}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button onClick={handleAdd} style={actionButtonStyle}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={handleModify} style={actionButtonStyle}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={handleDelete} style={deleteButtonStyle}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={10}>
        {parkings.map((parking) => (
          <Marker
            key={parking.idParking}
            position={{ lat: parking.latitude, lng: parking.longitude }}
            title={parking.nomParking}
            onClick={() => handleMarkerClick(parking)} // Add the onClick handler here
          />
        ))}
        {selectedParking && (
          <Marker
            position={{ lat: selectedParking.latitude, lng: selectedParking.longitude }}
            title={selectedParking.nomParking}
          />
        )}
      </GoogleMap>

      {showCreateModal && (
        <div style={modalContainerStyle}>
          <div style={modalContentStyle}>
            <h2>Create Parking</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={newParkingData.nomParking}
                  onChange={(e) => setNewParkingData({ ...newParkingData, nomParking: e.target.value })}
                />
              </label>
              <label>
                Number of Floors:
                <input
                  type="number"
                  value={newParkingData.numberOfFloors}
                  onChange={(e) =>
                    setNewParkingData({
                      ...newParkingData,
                      numberOfFloors: parseInt(e.target.value)
                    })
                  }
                />
              </label>
              <label>
                Longitude:
                <input
                  type="number"
                  step="0.0000001"
                  value={newParkingData.longitude}
                  onChange={(e) =>
                    setNewParkingData({
                      ...newParkingData,
                      longitude: parseFloat(e.target.value)
                    })
                  }
                />
              </label>
              <label>
                Latitude:
                <input
                  type="number"
                  step="0.0000001"
                  value={newParkingData.latitude}
                  onChange={(e) =>
                    setNewParkingData({
                      ...newParkingData,
                      latitude: parseFloat(e.target.value)
                    })
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={newParkingData.adresse}
                  onChange={(e) => setNewParkingData({ ...newParkingData, adresse: e.target.value })}
                />
              </label>
              <label>
                Number of Places:
                <input
                  type="number"
                  value={newParkingData.nbrPlace}
                  onChange={(e) =>
                    setNewParkingData({
                      ...newParkingData,
                      nbrPlace: parseInt(e.target.value)
                    })
                  }
                />
              </label>
              <label>
                Image Link:
                <input
                  type="text"
                  value={newParkingData.image}
                  onChange={(e) =>
                    setNewParkingData({ ...newParkingData, image: e.target.value })
                  }
                />
              </label>
              <button type="button" onClick={handleCreateParking} style={createButtonStyle}>
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </LoadScript>
  );
}

const searchContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px'
};

const searchInputStyle = {
  padding: '10px',
  marginRight: '10px',
  width: '300px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const searchButtonStyle = {
  padding: '10px',
  backgroundColor: '#0047AB',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const actionButtonStyle = {
  padding: '10px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px'
};

const deleteButtonStyle = {
  padding: '10px',
  backgroundColor: '#DC3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px'
};

const modalContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '4px'
};

const createButtonStyle = {
  padding: '10px',
  backgroundColor: '#28A745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px'
};

const cancelButtonStyle = {
  padding: '10px',
  backgroundColor: '#DC3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default AdminPage;

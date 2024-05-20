import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import AdminHeader from './AdminHeader'

import Map from '../Map';

function AdminHome() {
  const [villes, setVilles] = useState([]);
  const [selectedVille, setSelectedVille] = useState('');
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch all specialities
    const fetchSpecialities = async () => {
      try {
        const response = await axiosInstance.get('/api/specialities');
        const fetchedSpecialities = response.data;
        setSpecialities(fetchedSpecialities);
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    };

    // Fetch all villes
    const fetchVilles = async () => {
      try {
        const response = await axiosInstance.get('/api/villes');
        const fetchedVilles = response.data;
        setVilles(fetchedVilles);
      } catch (error) {
        console.error('Error fetching villes:', error);
      }
    };

    // Fetch all restaurants
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get('/api/restaurants');
        const fetchedRestaurants = response.data;
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchSpecialities();
    fetchVilles();
    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Fetch zones based on the selected ville
    const fetchZones = async () => {
      try {
        const response = await axiosInstance.get(`/api/zones/by-ville?villeName=${selectedVille}`);
        const fetchedZones = response.data;
        setZones(fetchedZones);
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    if (selectedVille) {
      fetchZones();
    } else {
      setZones([]);
    }
  }, [selectedVille]);

  const handleVilleChange = (event) => {
    setSelectedVille(event.target.value);
    setSelectedZone('');
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleSpecialityChange = (event) => {
    setSelectedSpeciality(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      (!selectedZone || restaurant.zone === selectedZone) &&
      (!selectedSpeciality || restaurant.speciality === selectedSpeciality)
    );
  });

  return (
    <div>
      <AdminHeader />
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="ville">Ville:</label>
          <select id="ville" className="form-control" value={selectedVille} onChange={handleVilleChange}>
            <option value="">Select a ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.nom}>{ville.nom}</option>
            ))}
          </select>
        </div>

        {selectedVille && (
          <div className="col-md-4">
            <label htmlFor="zone">Zone:</label>
            <select id="zone" className="form-control" value={selectedZone} onChange={handleZoneChange}>
              <option value="">Select a zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.nom}>{zone.nom}</option>
              ))}
            </select>
          </div>
        )}

        <div className="col-md-4">
          <label htmlFor="speciality">Speciality:</label>
          <select id="speciality" className="form-control" value={selectedSpeciality} onChange={handleSpecialityChange}>
            <option value="">Select a speciality</option>
            {specialities.map((speciality) => (
              <option key={speciality.id} value={speciality.nom}>{speciality.nom}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredRestaurants.map((restaurant) => (
          <div className="col-md-4" key={restaurant.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.nom}</h5>
                <p className="card-text">{restaurant.adresse}</p>
                <div className="card-images">
                  {restaurant.pictures.map((picture) => (
                    <img key={picture.id} src={picture.url} alt="Restaurant" className="card-image" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Map />
    </div>
  );
}

export default AdminHome;

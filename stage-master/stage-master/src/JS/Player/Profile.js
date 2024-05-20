import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import PlayerHeader from './PlayerHeader';

function ProfilePage() {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/api/users/${userId}`)
      .then(response => {
        console.log(response.data); // User data for the logged-in user
        setUserData(response.data); // Save the user data to state
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  // Render user information using the retrieved data
  return (
    <div>
      <PlayerHeader />
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#003c25', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <img src={`data:image/jpeg;base64,${userData.profilePicture}`}
                      alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1 }} />
                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                      style={{ zIndex: 1 }}>
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <h5>{userData.nom} {userData.prenom}</h5>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Réservations</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="font-italic mb-1"></p>
                      <p className="font-italic mb-1"></p>
                      <p className="font-italic mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../pictures/Logo.png';

function ParkingHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
const navigateToHome = useNavigate();
const home = async () => {
    try {
        // Redirect to the home page
        navigateToHome('/player-page');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

const navigateToRes = useNavigate();
const reservations = async () => {
    try {
        // Redirect to the home page
        navigateToRes('/player-page/reservations');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
  return (
    <div className="container-fluid" >
    <div className="row justify-content-arround" style={{ backgroundColor: '#0047AB' }}>
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="col-md d-flex align-items-center ps-5">
                <img src={Logo} className="d-inline-block align-top" alt="" style={{ height: '90%', width: '61%' }} />
            </div>
            <div className="col-sm-3 d-flex justify-content-end pe-5">
               
            </div>
            <div className="col-md d-flex justify-content-end" style={{ paddingRight: '20px' }}>
                        <button type="button" className="btn btn-danger" onClick={logout}>
                            Log Out
                        </button>
                    </div>
        </nav>
    </div>

</div>
  );
}

export default ParkingHeader;

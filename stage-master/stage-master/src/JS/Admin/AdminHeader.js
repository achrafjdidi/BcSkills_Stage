import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../pictures/Logo.png';

function AdminHeader() {
    const navigate = useNavigate();
    const navigateToVilles = useNavigate();
    const navigateToZones = useNavigate();
    const navigateToSpecialities = useNavigate();
    const navigateToRestaurants = useNavigate();
    const navigateToHome = useNavigate();
    const logout = async () => {
        try {
            localStorage.removeItem('token');
            // Redirect to the home page
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const GoToVilles = async () => {
        try {
            // Redirect to the home page
            navigateToVilles('/admin-page/villes');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const GoToZones = async () => {
        try {
            // Redirect to the home page
            navigateToZones('/admin-page/zones');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const GoToSpeciality = async () => {
        try {
            // Redirect to the home page
            navigateToSpecialities('/admin-page/specialities');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const GoToRestaurants = async () => {
        try {
            // Redirect to the home page
            navigateToRestaurants('/admin-page/restaurants');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const home = async () => {
        try {
            // Redirect to the home page
            navigateToHome('/admin-page');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="container-fluid" >
            <div className="row justify-content-arround" style={{ backgroundColor: '#7FC071' }}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="col-md d-flex align-items-center ps-5">
                        <img src={Logo} className="d-inline-block align-top" alt="" onClick={home} style={{ height: '30%', width: '30%' }} />
                    </div>
                    <div className="col-md" >
                        <button type="button" className="btn " onClick={GoToVilles} style={{ color: 'white' }}>
                            <b>Villes</b>
                        </button>
                    </div>
                    <div className="col-md" >
                        <button type="button" className="btn" onClick={GoToZones} style={{ color: 'white' }}>
                            <b>Zones</b>
                        </button>
                    </div>
                   
                    <div className="col-md" >
                        <button type="button" className="btn " style={{ color: 'white' }}>
                            <b>Utilisateurs</b>
                        </button>
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

export default AdminHeader;

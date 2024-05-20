import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../pictures/Logo.png';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

function Header() {
    const [showSigninModal, setShowSigninModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const handleShowSignin = () => {
        setShowSigninModal(true);
    };

    const handleShowSignup = () => {
        setShowSignupModal(true);
    };

    return (
        <div className="container-fluid" >
            <div className="row justify-content-arround" style={{ backgroundColor: '#0047AB' }}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="col-md d-flex align-items-center ps-5">
                        <img src={Logo} className="d-inline-block align-top" alt="" style={{ height: '90%', width: '30%' }} />
                    </div>
                    <div className="col-sm-3 d-flex justify-content-end pe-5">
                        <button type="button" className="btn me-3" onClick={handleShowSignin} style={{ backgroundColor: '#004d78', color: 'white' ,  fontFamily: 'cursive' }}><b>Sign In</b></button>
                        <button type="button" className="btn btn" onClick={handleShowSignup} style={{ backgroundColor: '#bfe9ff',  fontFamily: 'cursive' }}><b>Sign Up</b></button>
                    </div>
                </nav>
            </div>
            <SignInModal showModal={showSigninModal} setShowModal={setShowSigninModal} />
            <SignUpModal showModal={showSignupModal} setShowModal={setShowSignupModal} />

        </div>
    );
}

export default Header;

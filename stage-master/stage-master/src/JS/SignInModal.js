import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FaLock, FaRegEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axiosInstance from './axiosInstance';



function SignInModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axiosInstance.post("/api/v1/auth/authenticate", {
        email,password
      }).then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true); // Set the logged-in state to true
        setUserRole(response.data.role); // Set the user role received from the response
      }).catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or password invalid',
        });
      })
    } catch (error) {
     // setError('An error occurred. Please try again later.');
    }
  };

  if (isLoggedIn) {
    // Redirect the user to the appropriate page based on the role
    if (userRole === 'user') {
      return <Navigate to="/Parking" />;
    }else if (userRole === 'admin') {
      return <Navigate to="/admin-page" />;
    }
  }

  return (
    <div className={`modal ${props.showModal ? 'd-block' : 'd-none'}`} style={{textAlign:'center'}} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" >
            <h5 className="modal-title"  >Sign In To Car Care</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{display:'flex', alignItems:'center' , marginRight :'10px'}}>
                <label htmlFor="email" style={{marginRight:'10px'}}><FaRegEnvelope /></label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="form-group mt-3" style={{display:'flex', alignItems:'center' , marginRight :'10px'}}>
                <label htmlFor="password" style={{marginRight:'10px'}}><FaLock /></label>
                <input className="form-control" placeholder="Password" type="password" id="password" value={password} onChange={handlePasswordChange} required />
              </div>
              {props.isOwner && (
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="owner" value={props.isOwner} onChange={() => { }} checked={props.isOwner} />
                  <label className="form-check-label" htmlFor="owner">I am an owner</label>
                </div>
              )}
              <button type="submit" className="btn btn-success mt-3">Sign In</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SignInModal;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './JS/Home';
import AdminPage from './JS/Admin/AdminPage';
import Parking from './JS/Player/Parking';
import ParkingDetails from './JS/Player/ParkingDetails';
import AdminParking from './JS/Admin/AdminParking';


function App() {
  return (
    <Routes>
      <Route path="/Parking" element={<Parking />} />
      <Route path="/admin-page" element={<AdminPage/>} />

      <Route path="/parking/:id" element={<ParkingDetails />} />
      <Route path="/admin-page/parking/:id" element={<AdminParking/>}/>
      <Route path="" element={<Home/>} /> 




    </Routes>
  );
}

export default App;

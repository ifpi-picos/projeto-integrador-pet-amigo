import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/NavBar/navbar.jsx';
import '../App.css'; 

function LayoutComNavbar() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>

    </div>
  );
}

export default LayoutComNavbar;
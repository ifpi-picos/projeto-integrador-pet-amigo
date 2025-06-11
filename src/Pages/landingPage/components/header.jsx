import React from 'react';
import '../landing.css';
import logo from '../../../assets/logo.jpg';

function Header() {
  return (
    <header className='header-landing'>
        <div className='logo'>
            <img className='landing-logo' src={logo} alt="logo" />
            <h2>Pet Amigo</h2>
        </div>
        <ul className='nav-links-container'>
            <li><a className='nav-links' href="#home">Início</a></li>
            <li><a className='nav-links' href="#about">GitHub</a></li>
            <li><a className='nav-links' href="#services">Instagram</a></li>
            <li><a className='login-button' href="#contact">Entrar</a></li>
        </ul>
    </header>
  );
}

export default Header;
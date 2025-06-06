import React from "react";
import '../home.css';
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom"; 

function Top() {
    return (
        <div className="top-container">
            <div className="search-bar-container">
                <CiSearch className="search-icon" />

                <input
                    className="search-input"
                    type="text"
                    placeholder="Pesquisar animal"
                />
                
                <button className="filter-button">
                    <FaFilter className="filter-icon" />
                </button>
            </div>
            
            <div className="top-actions">
                <button className="like-button"><RiHeart3Fill /></button>
                <button className="notification-button"><IoNotifications /></button>
                <div className="profile-container">
                    <img src="" alt="foto de perfil" />
                    <Link to="/profile">
                        <h3>Antonio Enzo Bezerra</h3>
                        <span>antonioenzobezerra789@gmail.com</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Top;
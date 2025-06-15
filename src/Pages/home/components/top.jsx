import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom"; 
import logo from "../../../assets/logo.jpg";

function Top() {
    return (
        <div className="top-container">
            <Link to="/auth" className="top-logo"><img src={logo} alt="" /></Link>
            <div className="search-bar-container">
                <CiSearch className="search-icon" />
                <input
                    id="animal-search"     
                    name="search_query"       
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
                <Link to="/profile" className="profile-container">
                    <img src="https://pt.quizur.com/_image?href=https%3A%2F%2Fimg.quizur.com%2Ff%2Fimg6504ee802ae6b1.65403823.png%3FlastEdited%3D1694822020&w=400&h=400&f=webp" alt="foto de perfil" />
                    <div >
                        <h3>Antonio Enzo Bezerra</h3>
                        <span>antonioenzobezerra789@gmail.com</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Top;
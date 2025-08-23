import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/default-avatar.png";
import { useAuth } from "@/context/AuthContext.jsx";

function Top({ searchTerm, setSearchTerm, onOpenSidebar }) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="top-container">
                <div className="search-bar-container-placeholder"></div>
                <div className="top-actions-placeholder"></div>
            </div>
        );
    }

    // Se o usuário NÃO estiver logado, renderiza a versão simplificada
    if (!user || !profile) {
        return (
            <div className="top-container">
                <Link to="/home" className="top-logo">
                    <img src={logo} alt="Pet Amigo Logo" />
                </Link>
                <div className="search-bar-container">
                    <CiSearch className="search-icon" />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Pesquisar animal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="filter-button" onClick={onOpenSidebar}>
                        <FaFilter className="filter-icon" />
                    </button>
                </div>
                <div className="top-actions">
                    <Link to="/auth" className="login-prompt-button">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }
    
    // Se o usuário ESTIVER logado, continua para renderizar a versão completa
    const displayName = profile.user_type === 'ONG' ? profile.ong_name : profile.display_name;
    const avatarUrl = profile.avatar_url || DefaultAvatar;

    return (
        <div className="top-container">
            <Link to="/home" className="top-logo">
                <img src={logo} alt="Pet Amigo Logo" />
            </Link>
            <div className="search-bar-container">
                <CiSearch className="search-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Pesquisar animal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="filter-button" onClick={onOpenSidebar}>
                    <FaFilter className="filter-icon" />
                </button>
            </div>
            <div className="top-actions">
                <button className="like-button"><RiHeart3Fill /></button>
                <button className="notification-button"><IoNotifications /></button>
                <Link to="/profile" className="profile-box">
                    <img src={avatarUrl} alt="Foto de perfil"/>
                    <div>
                        <h3>{displayName}</h3>
                        {/* CORREÇÃO: Usando optional chaining para segurança */}
                        <span>{user?.email}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Top;
// home/components/top.jsx
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/default-avatar.png";
import { useAuth } from "@/context/AuthContext.jsx";
// Opcional: importe uma imagem de avatar padrão

function Top() {
    // Acessa os dados globais do usuário do AuthContext
    const { user, profile, loading } = useAuth();
    // Adicionado: Declaração das variáveis de estado search-term
    const [searchTerm, setSearchTerm] = useState('');

    // Enquanto os dados carregam, podemos mostrar um placeholder
    if (loading) {
        return (
            <div className="top-container">
                <div className="search-bar-container-placeholder"></div>
                <div className="top-actions-placeholder"></div>
            </div>
        );
    }

    // Se não houver perfil (usuário não logado)
    if (!profile) {
        return (
            <div className="top-container">
                <Link to="/auth" className="top-logo">
                    <img src={logo} alt="Pet Amigo Logo" />
                </Link>
                <div className="top-actions">
                    <Link to="/auth" className="login-prompt-button">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }

    // LÓGICA CORRIGIDA PARA EXIBIR DADOS DINÂMICOS
    // Usa os nomes de colunas em inglês do novo banco de dados
    const displayName = profile.user_type === 'ONG' 
        ? profile.ong_name 
        : profile.display_name;


    return (
        <div className="top-container">
            <Link to="/home" className="top-logo">
                <img src={logo} alt="Pet Amigo Logo" />
            </Link>
            <div className="search-bar-container">
                <CiSearch className="search-icon" />
                <input
                    id="animal-search"
                    name="search_query"
                    className="search-input"
                    type="text"
                    placeholder="Pesquisar animal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Removido: A chamada a onOpenSidebar, pois a prop não está sendo passada */}
                <button className="filter-button">
                    <FaFilter className="filter-icon" />
                </button>
            </div>
            <div className="top-actions">
                <button className="like-button">
                    <RiHeart3Fill />
                </button>
                <button className="notification-button">
                    <IoNotifications />
                </button>
                <Link to="/profile" className="profile-box">
                    <img src={profile.avatar_url} alt="Foto de perfil"/>
                    <div>
                        <h3>{displayName}</h3>
                        {/* É mais seguro pegar o email do objeto 'user' */}
                        <span>{user?.email}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Top;
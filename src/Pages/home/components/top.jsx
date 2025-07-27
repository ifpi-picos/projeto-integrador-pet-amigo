import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom"; 
import logo from "@/assets/logo.jpg";
import { useAuth } from "@/context/AuthContext.jsx";

function Top() {
    // 3. ACESSE OS DADOS GLOBAIS DO USUÁRIO AQUI
    const { user, profile, loading } = useAuth();

    // Enquanto os dados carregam, podemos mostrar um placeholder
    if (loading) {
        return (
            <div className="top-container">
                <div className="search-bar-container-placeholder"></div>
                <div className="top-actions-placeholder"></div>
            </div>
        );
    }

    // Se não houver perfil (usuário não logado), podemos não mostrar nada ou um botão de login
    if (!profile) {
        return (
            <div className="top-container">
                {/* Você pode adicionar um link de login aqui se quiser */}
            </div>
        );
    }

    // 4. LÓGICA PARA EXIBIR DADOS DINÂMICOS
    // Define qual nome exibir com base no tipo de usuário
    const displayName = profile.user_type === 'ONG' ? profile.nome_ong : profile.nome_exibicao || profile.nome_completo;
    // Usa a foto do perfil ou uma imagem padrão se não houver
    const avatarUrl = profile.avatar_url || DefaultAvatar;

    return (
        <div className="top-container">
            <Link to="/auth" className="top-logo">
                <img src={logo} alt="" />
            </Link>
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
                <button className="like-button">
                    <RiHeart3Fill />
                </button>
                <button className="notification-button">
                    <IoNotifications />
                </button>
                <Link to="/profile" className="profile-box">
                    <img src={avatarUrl} alt="foto de perfil"/>
                    <div>
                        <h3>{displayName}</h3>
                        <span>{user.email}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Top;
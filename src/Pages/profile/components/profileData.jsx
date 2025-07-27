import React from "react";

import { FaShieldDog } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext.jsx";

// Simulando a prop que viria do seu AuthContext
function ProfileData() {
    const { profile, loading } = useAuth();

    if (loading) {
        return <div className="profile-loading">Carregando perfil...</div>;
    }
    if (!profile) {
        return <div className="profile-error">Não foi possível carregar o perfil.</div>;
    }

    const displayName = profile.user_type === 'ONG' ? profile.nome_ong : profile.display_name || profile.nome_completo;
    const avatarUrl = profile.avatar_url || "/caminho/para/avatar_padrao.png";
    
    // URL de capa de exemplo - idealmente, viria do banco de dados também
    const coverUrl = "https://api.duniagames.co.id/api/content/upload/file/11105134861635414697.jpg";

    return (
        <div className="profile-data-container">
            {/* 1. BANNER / FOTO DE CAPA */}
            <div className="profile-banner" style={{ backgroundImage: `url(${coverUrl})` }}></div>

            {/* 2. CONTEÚDO PRINCIPAL DO PERFIL */}
            <div className="profile-content">
                <div className="profile-header">
                    <img className="profilepage-picture" src={avatarUrl} alt={`Foto de perfil de ${displayName}`} />
                    
                    <div className="profile-details">
                        {/* display name */}
                        <div className="profile-name-badge">
                            <h1 className="profile-name">An1Toh</h1>
                            {profile.user_type === 'ONG' ? (
                                <div className="user-badge ong-badge">
                                    <FaShieldDog />
                                    <span>ONG</span>
                                </div>
                            ) : (
                                <div className="user-badge person-badge">
                                    <FaUserAlt />
                                    <span>Usuário</span>
                                </div>
                            )}
                        </div>
                        {/* nome completo */}
                        <div className="profile-bio-section">
                            <p className="profile-bio">
                                Olá! Esta é a minha bio. Sou apaixonado por cães e gatos e sempre busco aprender mais sobre como cuidar deles.
                            </p>
                        </div>
                        <div className="profile-actions">
                            <button className="follow-button">Seguir</button>
                            <button className="message-button">Mensagem</button>
                        </div>
                    </div>

                    {/* As estatísticas agora fazem parte dos detalhes do perfil */}
                    <ul className="profile-stats">
                        <li>Seguidores<span>2,345</span></li>
                        <li>Seguindo<span>1,275</span></li>
                        <li>Curtidas<span>443</span></li>
                    </ul>
                    {/* Botão de Seguir/Editar */}
                </div>

            </div>
        </div>
    );
}
 
 export default ProfileData;
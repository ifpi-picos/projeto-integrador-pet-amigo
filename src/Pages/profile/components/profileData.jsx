import React from "react";
import { FaShieldDog } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext.jsx";

function ProfileData({ profile }) {
    const { user: currentUser } = useAuth();
    const isOwnProfile = currentUser && currentUser.id === profile.id;

    // --- CORREÇÃO: Usando os nomes de colunas em inglês do banco de dados ---
    const displayName = profile.user_type === 'ONG' 
        ? profile.ong_name 
        : profile.display_name;
    
    const fullName = profile.user_type === 'PESSOA' 
        ? profile.full_name 
        : profile.responsible_name;

    const coverUrl = "https://api.duniagames.co.id/api/content/upload/file/11105134861635414697.jpg";

    return (
        <div className="profile-data-container">
            <div className="profile-banner" style={{ backgroundImage: `url(${coverUrl})` }}></div>
            <div className="profile-content">
                <div className="profile-header">
                    <img className="profilepage-picture" src={profile.avatar_url} alt={`Foto de perfil de ${displayName}`} />
                    
                    <div className="profile-details">
                        <div className="profile-name-badge">
                            <h1 className="profile-name">{displayName}</h1>
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

                        {/* É semanticamente melhor usar h2 para um subtítulo */}
                        {fullName && <h2 className="profile-fullname">{fullName}</h2>}

                        <div className="profile-bio-section">
                            <p className="profile-bio">
                                {/* CORREÇÃO: A coluna da biografia se chama 'bio' */}
                                {profile.bio}
                            </p>
                        </div>
                        
                        <div className="profile-actions">
                            {isOwnProfile ? (
                                <button className="follow-button">Editar Perfil</button>
                            ) : (
                                <>
                                    <button className="message-button">Mensagem</button>
                                    <button className="follow-button">Seguir</button>
                                </>
                            )}
                        </div>
                    </div>

                    <ul className="profile-stats">
                        <li>Seguidores<span>2,345</span></li>
                        <li>Seguindo<span>1,275</span></li>
                        <li>Curtidas<span>443</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default ProfileData;
import React from "react";
import { FaShieldDog } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext.jsx";

function ProfileData({ profile, onEditClick }) {
    const { user: currentUser } = useAuth();
    const isOwnProfile = currentUser && currentUser.id === profile.id;

    const displayName = profile.user_type === 'ONG' ? profile.ong_name : profile.display_name;
    const fullName = profile.user_type === 'PESSOA' ? profile.full_name : profile.responsible_name;
    const avatarUrl = profile.avatar_url
    const bannerUrl = profile.url_banner;

    return (
        <div className="profile-data-container">
            <div 
                className="profile-banner" 
                style={{ backgroundImage: `url(${bannerUrl})` }}
            ></div>
            
            <div className="profile-content">
                <div className="profile-header">
                    <img className="profilepage-picture" src={avatarUrl} alt={`Foto de perfil de ${displayName}`} />
                    
                    <div className="profile-details">
                        <div className="profile-name-badge">
                            <h1 className="profile-name">{displayName}</h1>
                            {profile.user_type === 'ONG' ? (
                                <div className="user-badge ong-badge"><FaShieldDog /><span>ONG</span></div>
                            ) : (
                                <div className="user-badge person-badge"><FaUserAlt /><span>Usuário</span></div>
                            )}
                        </div>

                        {fullName && <h2 className="profile-fullname">{fullName}</h2>}

                        <div className="profile-bio-section">
                            <p className="profile-bio">{profile.bio}</p>
                        </div>
                        
                        <div className="profile-actions">
                            {isOwnProfile ? (
                                <button className="follow-button" onClick={onEditClick}>
                                    Editar Perfil
                                </button>
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
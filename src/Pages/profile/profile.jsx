import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "../../supabaseClient";

import "./profile.css";

import ProfileData from "./components/profileData.jsx";
import Gallery from "./components/gallery.jsx";
import Pets from "./components/pets.jsx";
import Adoptions from "./components/adoptions.jsx";
import Likes from "./components/likes.jsx";
import FloatingActionButton from "./components/FloatingActionButton.jsx";

function Profile() {
    const [activeTab, setActiveTab] = useState('galeria');
    const [viewedProfile, setViewedProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const { userId } = useParams();
    const { user: currentUser, loading: authLoading } = useAuth(); // Pega também o loading do Auth

    useEffect(() => {
        // Função interna para buscar o perfil, agora mais limpa
        const fetchProfileData = async (profileId) => {
            // Tenta buscar primeiro em 'user_profiles'
            let { data: profile, error } = await supabase
                .from('user_profiles')
                .select('*, owners(*), addresses(*)') // Pega dados aninhados
                .eq('id', profileId) // CORREÇÃO: Usa 'id' que referencia auth.users
                .single();
            
            if (profile) {
                return { ...profile, user_type: 'PESSOA' };
            }

            // Se não encontrou, tenta buscar em 'ong_profiles'
            ({ data: profile, error } = await supabase
                .from('ong_profiles')
                .select('*, owners(*), addresses(*)') // Pega dados aninhados
                .eq('id', profileId) // CORREÇÃO: Usa 'id' que referencia auth.users
                .single());

            if (profile) {
                return { ...profile, user_type: 'ONG' };
            }

            return null;
        };

        const loadProfile = async () => {
            // Garante que só vamos rodar a busca depois do AuthContext ter carregado
            if (authLoading) return;

            setLoadingProfile(true);
            const profileIdToFetch = userId || currentUser?.id;

            if (!profileIdToFetch) {
                setViewedProfile(null);
                setLoadingProfile(false);
                return;
            }

            const profileData = await fetchProfileData(profileIdToFetch);
            
            setViewedProfile(profileData); // Define o perfil (ou null se não encontrado)
            setLoadingProfile(false); // ESSENCIAL: Finaliza o loading
        };

        loadProfile();
    }, [userId, currentUser, authLoading]); // Adiciona authLoading como dependência

    const renderActiveComponent = () => {
        if (!viewedProfile) return null;
        const ownerId = viewedProfile.owner_id;

        switch (activeTab) {
            case 'galeria': return <Gallery ownerId={ownerId} />;
            case 'pets': return <Pets ownerId={ownerId} />;
            case 'adocao': return <Adoptions ownerId={ownerId} />;
            case 'curtidas': return <Likes ownerId={ownerId} />;
            default: return <Gallery ownerId={ownerId} />;
        }
    };
    
    if (loadingProfile || authLoading) { // Mostra o loading enquanto o perfil OU o auth carregam
        return <div className="profile-loading">Carregando perfil...</div>;
    }

    if (!viewedProfile) {
        return <div className="profile-error">Este perfil não foi encontrado.</div>;
    }

    const isOwnProfile = currentUser && currentUser.id === viewedProfile.id;

    return (
        <div className="profile-container">
            <ProfileData profile={viewedProfile} />
            <section className="profile-section">
                <nav className="profile-nav">
                    <ul>
                        <li className={activeTab === 'galeria' ? 'active' : ''} onClick={() => setActiveTab('galeria')}>Galeria</li>
                        <li className={activeTab === 'pets' ? 'active' : ''} onClick={() => setActiveTab('pets')}>Pets</li>
                        <li className={activeTab === 'adocao' ? 'active' : ''} onClick={() => setActiveTab('adocao')}>Adoção</li>
                        <li className={activeTab === 'curtidas' ? 'active' : ''} onClick={() => setActiveTab('curtidas')}>Curtidas</li>
                    </ul>
                </nav>
                <div className="profile-grid">
                    {renderActiveComponent()}
                </div>
            </section>
            <FloatingActionButton isOwnProfile={isOwnProfile} />
        </div>
    );
}

export default Profile;
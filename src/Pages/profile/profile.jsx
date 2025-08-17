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
  const [activeTab, setActiveTab] = useState("galeria");
  const [viewedProfile, setViewedProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const { userId } = useParams();
  const { user: currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    // Função OTIMIZADA para buscar os dados do perfil em paralelo
    const fetchProfileData = async (profileId) => {
      // Cria as duas promessas de busca
      const userProfilePromise = supabase
        .from("user_profiles")
        .select("*, addresses(*)")
        .eq("id", profileId)
        .single();

      const ongProfilePromise = supabase
        .from("ong_profiles")
        .select("*, addresses(*)")
        .eq("id", profileId)
        .single();

      // Executa as duas buscas ao mesmo tempo
      const [userResult, ongResult] = await Promise.all([
        userProfilePromise,
        ongProfilePromise,
      ]);

      // Verifica qual busca retornou dados e retorna o perfil correspondente
      if (userResult.data) {
        return { ...userResult.data, user_type: "PESSOA" };
      }

      if (ongResult.data) {
        return { ...ongResult.data, user_type: "ONG" };
      }

      // Se nenhum perfil for encontrado, retorna null
      return null;
    };

    const loadProfile = async () => {
      if (authLoading) return;

      setLoadingProfile(true);
      const profileIdToFetch = userId || currentUser?.id;

      if (!profileIdToFetch) {
        setViewedProfile(null);
        setLoadingProfile(false);
        return;
      }

      const profileData = await fetchProfileData(profileIdToFetch);

      if (profileData) {
        profileData.owner_id = profileData.id;
      }

      setViewedProfile(profileData);
      setLoadingProfile(false);
    };

    loadProfile();
  }, [userId, currentUser, authLoading]);

  const renderActiveComponent = () => {
    if (!viewedProfile) return null;
    const ownerId = viewedProfile.owner_id;

    switch (activeTab) {
      case "galeria":
        return <Gallery ownerId={ownerId} />;
      case "pets":
        return <Pets ownerId={ownerId} />;
      case "adocao":
        return <Adoptions ownerId={ownerId} />;
      case "curtidas":
        return <Likes ownerId={ownerId} />;
      default:
        return <Gallery ownerId={ownerId} />;
    }
  };

  if (loadingProfile || authLoading) {
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
            <li
              className={activeTab === "galeria" ? "active" : ""}
              onClick={() => setActiveTab("galeria")}
            >
              Galeria
            </li>
            <li
              className={activeTab === "pets" ? "active" : ""}
              onClick={() => setActiveTab("pets")}
            >
              Pets
            </li>
            <li
              className={activeTab === "adocao" ? "active" : ""}
              onClick={() => setActiveTab("adocao")}
            >
              Adoção
            </li>
            <li
              className={activeTab === "curtidas" ? "active" : ""}
              onClick={() => setActiveTab("curtidas")}
            >
              Curtidas
            </li>
          </ul>
        </nav>
        <div className="profile-grid">{renderActiveComponent()}</div>
      </section>
      <FloatingActionButton isOwnProfile={isOwnProfile} />
    </div>
  );
}

export default Profile;
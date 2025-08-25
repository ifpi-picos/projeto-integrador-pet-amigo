import React from "react";
import { Routes, Route } from "react-router-dom";

import LayoutNav from "./Layout/LayoutNav.jsx";

import LandingPage from "./Pages/landingPage/landing.jsx";
import Auth from "./Pages/auth/auth.jsx";
import Home from "./Pages/home/index.jsx";
import Profile from "./Pages/profile/profile.jsx";

import BadRequest from "./Pages/badRequest/error.jsx";
import PetPage from "./Pages/pet-page/PetPage.jsx";
import CadastroAnimal from "./Pages/CadastroAnimal/CadastroAnimal.jsx";
import MissingAnimalPage from './Pages/missinganimal/missinganimal.jsx';
import Dashboard from "./Pages/dashboard/dashboard.jsx";
import Settings from "./Pages/settingsPage/settings.jsx";

function App() {
  return (
    <Routes>
      {/* Grupo de Rotas 1: Páginas SEM a Navbar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<BadRequest />} />

      {/* Grupo de Rotas 2: Páginas COM a Navbar */}
      <Route element={<LayoutNav />}>

        <Route path="/home" element={<Home />} />
        <Route path="/pet/:petId" element={<PetPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/cadastro-animal" element={<CadastroAnimal />} />
        <Route path="/missinganimal" element={<MissingAnimalPage />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  );
}

export default App;
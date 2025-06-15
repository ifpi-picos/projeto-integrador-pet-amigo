import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutNav from './Layout/LayoutNav.jsx';

import LandingPage from './Pages/landingPage/landing.jsx';
import Auth from './Pages/auth/auth.jsx';
import Home from './Pages/home/index.jsx';
import Feed from './Pages/feed/feed.jsx';
import BadRequest from './Pages/badRequest/error.jsx';

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
        <Route path="/feed" element={<Feed />} />
      </Route>

    </Routes>
  );
}

export default App;
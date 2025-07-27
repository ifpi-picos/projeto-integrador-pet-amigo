import React from 'react';
import Header from './header';
import './landing.css';
import Inicio from './inicio';
import QuemSomos from './quemsomos'; // Importação do QuemSomos
import Footer from './footer';
import Funcionalidades from './funcionalidades';
import Blog from './blog';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="landing-content">
        <Inicio />
        <QuemSomos /> {/* Renderização do QuemSomos após Inicio */}
        <Funcionalidades />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

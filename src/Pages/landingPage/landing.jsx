import React from 'react';
import Header from './header';
import './landing.css';
import Inicio from './inicio';
import Footer from './footer';
import Funcionalidades from './funcionalidades'; // Adicionada a importação

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="landing-content">
        <Inicio />
        <Funcionalidades /> {/* Adicionada a renderização */}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

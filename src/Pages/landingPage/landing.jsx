import React from 'react';
import Header from './header';
import './landing.css';
import Inicio from './inicio';
import Footer from './footer';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <main className="landing-content">
        <Inicio />
      </main>

      <Footer /> {/* Aqui estamos chamando o componente pronto do footer */}
    </div>
  );
};

export default LandingPage;

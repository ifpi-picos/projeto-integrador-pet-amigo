import React from 'react';
import './landing.css';

import Header from './components/header.jsx';
import Main from './components/main.jsx';
import AboutCarrosel from './components/aboutCarrosel.jsx';
import Services from './components/services.jsx';
import Footer from './components/footer.jsx'; // Novo rodapé

function LandingPage() {
  return (
    <div className='landing-page'>
      <Header />
      <main>
        <Main />
        <AboutCarrosel />
        <Services />
      </main>
      <Footer /> {/* Novo rodapé inserido corretamente aqui */}
    </div>
  );
}

export default LandingPage;

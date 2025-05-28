import React from 'react';
import './landing.css';

import Header from './components/header.jsx';
import Main from './components/main.jsx';
import About from './components/about.jsx';
import Services from './components/services.jsx';
import Footer from './components/footer.jsx';

function LandingPage() {
  return (
    <div className='landing-page'>
      <Header />
      <main>
        <Main />
        <About />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;

import React from 'react';
import Header from './header';
import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <main className="landing-content">

        <section id="inicio" className="section">
          <h2>Início</h2>
          <p>Conteúdo da seção Início.</p>
        </section>

        <section id="quem-somos" className="section">
          <h2>Quem Somos</h2>
          <p>Conteúdo da seção Quem Somos.</p>
        </section>

        <section id="funcionalidades" className="section">
          <h2>Funcionalidades</h2>
          <p>Conteúdo da seção Funcionalidades.</p>
        </section>

        <section id="blog" className="section">
          <h2>Blog</h2>
          <p>Conteúdo da seção Blog.</p>
        </section>

        <section id="sobre" className="section">
          <h2>Sobre</h2>
          <p>Conteúdo da seção Sobre.</p>
        </section>

      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Pet Amigo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

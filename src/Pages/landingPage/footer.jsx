import React from 'react';
import './landing.css';
import logo from '../../assets/logo.png'; // ajuste o caminho conforme necessário

import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
    return (
    <footer className="landing-footer">
      <div className="footer-columns">

        {/* Coluna esquerda */}
        <div className="footer-column left">
          <div className="footer-logo">
            <img src={logo} alt="Logo Pet Amigo" className="footer-logo-img" />
            <h2>Pet Amigo</h2>
          </div>
          <div className="social-icons">
            <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="https://instagram.com/seuusuario" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="mailto:contato@petamigo.com"><MdOutlineEmail /></a>
          </div>
        </div>

        {/* Coluna do meio */}
        <div className="footer-column middle">
          <h3>Navegação</h3>
          <a href="#inicio">Início</a>
          <a href="#quem-somos">Quem Somos</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#blog">Blog</a>
          <a href="#sobre">Sobre</a>
        </div>

        {/* Coluna direita */}
        <div className="footer-column right">
          <h3>Dúvidas?</h3>
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <textarea placeholder="Digite sua mensagem..." rows="4" />
            <button type="submit">Enviar</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Pet Amigo. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

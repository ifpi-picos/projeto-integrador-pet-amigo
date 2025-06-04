import React from 'react';
import '../landing.css'; // A importação foi ajustada para './../landing.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sobre o Pet Amigo</h3>
          <p>
            Conectando animais que precisam de um lar com pessoas dispostas a
            oferecer amor e cuidado.
          </p>
          <div className="socials">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Links Rápidos</h3>
          <ul>
            <li>
              <a href="#">Termos de Serviço</a>
            </li>
            <li>
              <a href="#">Política de Privacidade</a>
            </li>
            <li>
              <a href="#">Dúvidas Frequentes</a>
            </li>
            <li>
              <a href="#">Seja um Parceiro</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contato</h3>
          <p>
            <i className="fas fa-envelope"></i> contato@petamigo.com
          </p>
          <p>
            <i className="fas fa-phone"></i> (11) 98765-4321
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> São Paulo, SP
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pet Amigo. Todos os direitos reservados.</p>
        <p>Feito com ❤️ para quem ama pets!</p>
      </div>
    </footer>
  );
}

export default Footer;
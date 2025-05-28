import React from "react";
import "../landing.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Pet Amigo. Todos os direitos reservados.</p>
      <p>Feito com ❤️ para quem ama pets!</p>
    </footer>
  );
}

export default Footer;

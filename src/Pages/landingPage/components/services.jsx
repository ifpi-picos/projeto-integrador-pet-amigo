import React from "react";
import { FaShieldAlt, FaMapMarkedAlt, FaCameraRetro, FaUsers } from "react-icons/fa";
import "../landing.css";

function Services() {
  return (
    <section className="services-section" id="services">
      <h2>Por que escolher o Pet Amigo?</h2>
      <div className="services-grid">
        <div className="service-card">
          <FaShieldAlt className="service-icon" />
          <h3>Adoções seguras</h3>
          <p>Processos verificados que garantem segurança para você e o pet.</p>
        </div>
        <div className="service-card">
          <FaMapMarkedAlt className="service-icon" />
          <h3>Encontre ONGs próximas</h3>
          <p>Localize abrigos e protetores em sua região com facilidade.</p>
        </div>
        <div className="service-card">
          <FaCameraRetro className="service-icon" />
          <h3>Compartilhe momentos</h3>
          <p>Publique fotos e histórias do seu pet com a comunidade.</p>
        </div>
        <div className="service-card">
          <FaUsers className="service-icon" />
          <h3>Rede solidária</h3>
          <p>Conecte-se com pessoas que compartilham o amor pelos animais.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;

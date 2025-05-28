import React from "react";
import "../landing.css";
import aboutImg from "../../../assets/landingPage/about-pet.jpg"; // Adicione uma imagem ilustrativa à pasta assets

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2>Sobre o App</h2>
          <p>
            O Pet Amigo é uma plataforma feita para quem acredita que todo animal merece um lar. Conectamos adotantes a ONGs e protetores, promovendo a adoção responsável e fortalecendo uma comunidade engajada e solidária.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImg} alt="Pessoa com cachorro feliz" />
        </div>
      </div>
    </section>
  );
}

export default About;

// src/pages/landing/components/aboutCarousel.jsx

import React from "react";
import "../landing.css";
import aboutImg from "../../../assets/landingPage/about-pet.jpg";

// Importa componentes do Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ✅ Inclui Autoplay

// Importa os estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";

function AboutCarrosel() {
  return (
    <section className="about-section" id="about">
      <Swiper
        modules={[Pagination, Autoplay]} // ✅ Inclui Autoplay aqui
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{                 // ✅ Ativa o autoplay
          delay: 3000,              // Tempo entre os slides (ms)
          disableOnInteraction: false // Continua mesmo após interação
        }}
        className="about-carousel"
      >
        {/* Slide 1 - Sobre o App */}
        <SwiperSlide>
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
        </SwiperSlide>

        {/* Slide 2 - Missão */}
        <SwiperSlide>
          <div className="about-content">
            <div className="about-text">
              <h2>Missão</h2>
              <p>
                Nossa missão é facilitar o processo de adoção com segurança, empatia e cuidado, oferecendo uma plataforma intuitiva tanto para adotantes quanto para doadores.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImg} alt="Missão Pet Amigo" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Visão */}
        <SwiperSlide>
          <div className="about-content">
            <div className="about-text">
              <h2>Visão</h2>
              <p>
                Ser a maior comunidade de adoção pet do Brasil, promovendo conexões verdadeiras entre pessoas e animais.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImg} alt="Visão Pet Amigo" />
            </div>
          </div>
        </SwiperSlide>

        {/* + Slides podem ser adicionados aqui */}
      </Swiper>
    </section>
  );
}

export default AboutCarrosel;

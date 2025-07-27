import React from 'react';
import './landing.css';

const QuemSomos = () => {
  return (
    <section id="quemsomos" className="quemsomos-section">
      <h2 className="quemsomos-title">Quem Somos</h2>

      {/* Propósito do Pet Amigo */}
      <div className="quemsomos-item">
        <div className="texto">
          <h3>Nosso Propósito</h3>
          <p>O Pet Amigo nasceu para conectar animais sem lar a pessoas que procuram um pet para adotar, apoiar e dar suporte às ONGs que lutam por essa causa. Nosso objetivo é promover adoções responsáveis e incentivar o cuidado com os animais.</p>
        </div>
        <div className="icone">
          <i className="fa-solid fa-hand-holding-heart"></i> {/* Ícone representativo */}
        </div>
      </div>

      {/* Problemas que o app resolve */}
      <div className="quemsomos-item reverso">
        <div className="icone">
          <i className="fa-solid fa-paw"></i> {/* Ícone representativo */}
        </div>
        <div className="texto">
          <h3>O Que Resolvemos</h3>
          <p>O Pet Amigo combate o abandono de animais e facilita a adoção ao ajudar as pessoas a encontrar o pet ideal. Além disso, apoiamos ONGs, garantindo que tenham suporte para continuar o trabalho essencial que realizam.</p>
        </div>
      </div>

      {/* Valores e missão */}
      <div className="quemsomos-item">
        <div className="texto">
          <h3>Nossa Missão e Valores</h3>
          <p>Empatia, Responsabilidade, União e Transparência nos guiam. Nossa missão é ajudar animais a encontrar um lar seguro e amoroso, apoiando ONGs e educando sobre adoção responsável.</p>
        </div>
        <div className="icone">
          <i className="fa-solid fa-users"></i>
        </div>
      </div>

      {/* Como as pessoas podem ajudar */}
      <div className="quemsomos-item reverso">
        <div className="icone">
          <i className="fa-solid fa-handshake"></i>
        </div>
        <div className="texto">
          <h3>Como Você Pode Ajudar</h3>
          <p>Você pode realizar doações para ONGs, adotar um pet, divulgar a causa ou oferecer apoio de forma voluntária. Juntos, podemos transformar a vida de muitos animais!</p>
        </div>
      </div>

      {/* Chamada para ação */}
      <div className="quemsomos-cta">
        <h3>Faça a Diferença!</h3>
        <p>Adote um pet hoje mesmo, doe para uma ONG parceira ou experimente o Pet Amigo.</p>
        <button className="primary-btn">Saiba Mais</button>
      </div>
    </section>
  );
};

export default QuemSomos;

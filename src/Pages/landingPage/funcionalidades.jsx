import React from 'react';
import './landing.css';
import { MdOutlineEventAvailable, MdOutlinePets } from "react-icons/md";
import { FaHandHoldingHeart, FaCameraRetro } from "react-icons/fa";

const Funcionalidades = () => {
  return (
    <section id="funcionalidades" className="funcionalidades-section">
      <h2 className="funcionalidades-title">Funcionalidades do Pet Amigo</h2>

      {/* Agendamento de visita - Ícone à direita, Texto à esquerda */}
      <section className="funcionalidade-item esquerda">
        <div className="texto">
          <h3>Agendamento de Visita</h3>
          <p>Encontre um pet para adoção e marque uma visita com poucos cliques. Converse diretamente com o responsável para conhecer melhor o animal antes de adotá-lo.</p>
        </div>
        <div className="icone">
          <MdOutlineEventAvailable size={60} color="#26CC6B" />
        </div>
      </section>

      {/* Doações para ONGs - Ícone à esquerda, Texto à direita */}
      <section className="funcionalidade-item esquerda">
        <div className="icone">
          <FaHandHoldingHeart size={60} color="#26CC6B" />
        </div>
        <div className="texto">
          <h3>Doações para ONGs</h3>
          <p>Apoie a causa animal! Faça doações para ONGs diretamente pelo aplicativo e ajude centenas de pets resgatados a terem uma vida melhor.</p>
        </div>
      </section>

      {/* Cadastro de animais para adoção - Ícone à direita, Texto à esquerda */}
      <section className="funcionalidade-item esquerda">
        <div className="texto">
          <h3>Cadastro de Animais para Adoção</h3>
          <p>Tem um pet precisando de um novo lar? Cadastre-o na plataforma e aumente as chances de encontrar um adotante amoroso.</p>
        </div>
        <div className="icone">
          <MdOutlinePets size={60} color="#26CC6B" />
        </div>
      </section>

      {/* Postagem de imagens do pet - Ícone à esquerda, Texto à direita */}
      <section className="funcionalidade-item esquerda">
        <div className="icone">
          <FaCameraRetro size={60} color="#26CC6B" />
        </div>
        <div className="texto">
          <h3>Postagem de Fotos do Pet</h3>
          <p>Crie um perfil para seu pet e compartilhe fotos com a comunidade. Mostre como ele está vivendo feliz no novo lar!</p>
        </div>
      </section>

    </section>
  );
};

export default Funcionalidades;

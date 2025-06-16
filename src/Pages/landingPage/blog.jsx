import React, { useState } from 'react';
import './landing.css';

// Importação das imagens
import imgblog1 from '../../assets/landingPage/imgblog1.jpg';
import imgblog2 from '../../assets/landingPage/imgblog2.jpeg';
import imgblog3 from '../../assets/landingPage/imgblog3.jpeg';

// Lista de posts do blog
const posts = [
  { id: 1, titulo: "Como adotar um pet?", imagem: imgblog1, link: "/blog/como-adotar" },
  { id: 2, titulo: "Benefícios da adoção responsável", imagem: imgblog2, link: "/blog/beneficios-adocao" },
  { id: 3, titulo: "Dicas para cuidar do seu pet", imagem: imgblog3, link: "/blog/dicas-pet" },
  { id: 4, titulo: "Como ajudar ONGs de animais?", imagem: "URL_DA_IMAGEM_4", link: "/blog/ajuda-ongs" },
  { id: 5, titulo: "Alimentação saudável para pets", imagem: "URL_DA_IMAGEM_5", link: "/blog/alimentacao-pet" },
];

const Blog = () => {
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <section id="blog" className="blog-section">
      <h2 className="blog-title">Conheça o nosso blog</h2>

      {/* Exibição inicial dos posts */}
      <div className="blog-container">
        {posts.slice(0, 3).map(post => (
          <div key={post.id} className="blog-card">
            <img src={post.imagem} alt={post.titulo} className="blog-image" />
            <h3>{post.titulo}</h3>
            <a href={post.link} className="blog-link">Leia mais</a>
          </div>
        ))}
      </div>

      {/* Exibição adicional ao clicar em "Ler mais" */}
      {mostrarMais && (
        <div className="blog-extra">
          {posts.slice(3).map(post => (
            <div key={post.id} className="blog-card">
              <img src={post.imagem} alt={post.titulo} className="blog-image" />
              <h3>{post.titulo}</h3>
              <a href={post.link} className="blog-link">Leia mais</a>
            </div>
          ))}
        </div>
      )}

      {/* Botão para expandir conteúdo */}
      <button className="blog-button" onClick={() => setMostrarMais(!mostrarMais)}>
        {mostrarMais ? "Ver menos" : "Ler mais"}
      </button>
    </section>
  );
};

export default Blog;

import React, { useState, useEffect } from "react";

// Lista de imagens que nosso carrossel vai usar
const imagens = [
    "https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
];

function Carousel() {
    const [slideAtual, setSlideAtual] = useState(0);

    // Funções para navegar
    const proximoSlide = () => {
        setSlideAtual(slideAtual === imagens.length - 1 ? 0 : slideAtual + 1);
    };

    const slideAnterior = () => {
        setSlideAtual(slideAtual === 0 ? imagens.length - 1 : slideAtual - 1);
    };

    // Efeito para autoplay
    useEffect(() => {
        const intervalId = setInterval(proximoSlide, 5000); // Muda a cada 5 segundos
        return () => clearInterval(intervalId); // Limpa o timer
    }, [slideAtual]);

    // Calcula o valor para a propriedade 'transform' do CSS
    const wrapperStyle = {
        transform: `translateX(-${slideAtual * 100}%)`
    };

    return (
        <div className="carousel-container">
            {/* O wrapper que se move para criar o efeito de slide */}
            <div className="carousel-wrapper" style={wrapperStyle}>
                {imagens.map((imagemUrl, index) => (
                    <img key={index} src={imagemUrl} alt={`Imagem do carrossel ${index + 1}`} />
                ))}
            </div>

            {/* Botões de navegação */}
            <button onClick={slideAnterior} className="carousel-button prev">&#10094;</button>
            <button onClick={proximoSlide} className="carousel-button next">&#10095;</button>

            {/* Indicadores de posição (bolinhas) */}
            <div className="carousel-dots">
                {imagens.map((_, index) => (
                    <span
                        key={index}
                        className={index === slideAtual ? 'dot active' : 'dot'}
                        onClick={() => setSlideAtual(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
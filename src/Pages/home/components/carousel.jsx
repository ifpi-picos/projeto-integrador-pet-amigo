import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

function Carousel() {
    // Estado para armazenar os slides (anúncios) buscados do banco
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para controlar a funcionalidade do carrossel
    const [slideAtual, setSlideAtual] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const navigate = useNavigate();
    const swipeInProgress = useRef(false);
    const minSwipeDistance = 50; 

    // Busca os anúncios do Supabase quando o componente é montado
    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            // CORREÇÃO: Busca da view 'active_advertisements' em vez da tabela
            const { data, error } = await supabase
                .from('active_advertisements')
                .select('image_url, link_url');

            if (error) {
                console.error("Erro ao buscar anúncios:", error);
            } else if (data) {
                const formattedSlides = data.map(ad => ({
                    imageUrl: ad.image_url,
                    linkUrl: ad.link_url
                }));
                setSlides(formattedSlides);
            }
            setLoading(false);
        };
        fetchAds();
    }, []);

    const proximoSlide = () => {
        if (slides.length === 0) return;
        setSlideAtual(current => (current === slides.length - 1 ? 0 : current + 1));
    };

    const slideAnterior = () => {
        if (slides.length === 0) return;
        setSlideAtual(current => (current === 0 ? slides.length - 1 : current - 1));
    };

    // Efeito para o auto-slide
    useEffect(() => {
        // Só inicia o intervalo se houver mais de um slide
        if (slides.length > 1) {
            const intervalId = setInterval(proximoSlide, 5000);
            return () => clearInterval(intervalId);
        }
    }, [slides.length]); // A dependência garante que o efeito reinicie se o número de slides mudar

    // Handlers para o swipe em telas touch
    const onTouchStart = (e) => {
        swipeInProgress.current = false;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
            swipeInProgress.current = true;
        }
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            isLeftSwipe ? proximoSlide() : slideAnterior();
        }
        
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleClick = (linkUrl) => {
        if (swipeInProgress.current) {
            return; // Impede o clique se um swipe estava em progresso
        }
        if (linkUrl) {
            navigate(linkUrl); // Navega para o link se ele existir
        }
    };

    const wrapperStyle = {
        transform: `translateX(-${slideAtual * 100}%)`
    };

    // Exibe um placeholder enquanto os dados carregam ou se não houver anúncios
    if (loading || slides.length === 0) {
        return <div className="carousel-container-placeholder"></div>;
    }

    return (
        <div className="carousel-container">
            <div 
                className="carousel-wrapper" 
                style={wrapperStyle}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className="carousel-slide-link"
                        onClick={() => handleClick(slide.linkUrl)}
                        // Adiciona estilo de cursor apenas se houver um link
                        style={{ cursor: slide.linkUrl ? 'pointer' : 'default' }}
                    >
                        <img 
                            src={slide.imageUrl} 
                            alt={`Anúncio ${index + 1}`}
                            draggable="false"
                        />
                    </div>
                ))}
            </div>

            {/* Mostra os botões de navegação apenas se houver mais de um slide */}
            {slides.length > 1 && (
                <>
                    <button onClick={slideAnterior} className="carousel-button prev">&#10094;</button>
                    <button onClick={proximoSlide} className="carousel-button next">&#10095;</button>
                    <div className="carousel-dots">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={index === slideAtual ? 'dot active' : 'dot'}
                                onClick={() => setSlideAtual(index)}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Carousel;
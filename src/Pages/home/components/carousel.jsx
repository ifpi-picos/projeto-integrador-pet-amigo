import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
    { 
        imageUrl: "https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=2574&auto=format&fit=crop",
        linkUrl: "/destino/praia" 
    },
    { 
        imageUrl: "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=2574&auto=format&fit=crop",
        linkUrl: "/destino/cidade" 
    },
    { 
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop",
        linkUrl: "/destino/lago" 
    },
    { 
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop",
        linkUrl: "/destino/montanha" 
    }
];

function Carousel() {
    const [slideAtual, setSlideAtual] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const navigate = useNavigate();
    const swipeInProgress = useRef(false);

    const minSwipeDistance = 50; 

    const proximoSlide = () => {
        setSlideAtual(current => current === slides.length - 1 ? 0 : current + 1);
    };

    const slideAnterior = () => {
        setSlideAtual(current => current === 0 ? slides.length - 1 : current - 1);
    };

    useEffect(() => {
        const intervalId = setInterval(proximoSlide, 5000);
        return () => clearInterval(intervalId);
    }, []);

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
            return;
        }
        navigate(linkUrl);
    };

    const wrapperStyle = {
        transform: `translateX(-${slideAtual * 100}%)`
    };

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
                    >
                        <img 
                            src={slide.imageUrl} 
                            alt={`Imagem do carrossel ${index + 1}`}
                            draggable="false"
                        />
                    </div>
                ))}
            </div>

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
        </div>
    );
}

export default Carousel;

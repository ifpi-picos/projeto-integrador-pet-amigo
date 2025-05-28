import React from "react";
import "../landing.css";
import landingDog from "../../../assets/landingPage/landing-dog.jpg";
import { Link } from "react-router-dom";


function Main() {
    return (
        <div className="main-content">
            <div className="landing-dog"><img src={landingDog} alt="Imagem de cachorro" /></div>
            <div className="main-text">
                <section>
                    <h1>Seu amigo <br /> é nosso amigo!</h1>
                    <p>Adote, conecte-se e compartilhe momentos únicos com quem também ama pets. Aqui, seu novo melhor amigo pode estar a um clique de distância!</p>
                    <div className="main-buttons">
                        <Link className="button-1" to="/Home">Adote Já!</Link>
                        <a className="button-2" href="saiba-mais">Saiba mais</a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Main;
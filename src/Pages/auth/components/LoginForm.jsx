import React from "react";
import { Link } from "react-router-dom"; // Importe o Link para "Esqueci a senha"
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Ícone do Google

// Recebe a função para trocar para a tela de cadastro
function LoginForm({ onSwitchToRegister }) {
    return (
        <div className="auth-form-container">
            <h1>Bem-vindo(a) de volta!</h1>
            <p className="form-subtitle">Entre na sua conta para continuar.</p>
            
            <form className="login-form">
                {/* Campo de E-mail */}
                <div className="input-group">
                    <label htmlFor="login-email" className="visually-hidden">Endereço de e-mail</label>
                    <MdEmail className="input-icon" />
                    <input 
                        id="login-email"
                        name="email"
                        type="email" 
                        placeholder="Endereço de e-mail" 
                    />
                </div>

                {/* Campo de Senha */}
                <div className="input-group">
                    <label htmlFor="login-password" className="visually-hidden">Senha</label>
                    <FaLock className="input-icon" />
                    <input 
                        id="login-password"
                        name="password"
                        type="password" 
                        placeholder="Senha" 
                    />
                </div>

                <div className="form-options">
                    <Link to="/esqueci-minha-senha" className="forgot-password-link">
                        Esqueci minha senha
                    </Link>
                </div>

                <button type="submit" className="primary-button">Entrar</button>

                <div className="form-divider">
                    <hr />
                    <span>ou</span>
                    <hr />
                </div>
                
                <button type="button" className="social-button">
                    <FcGoogle />
                    Entrar com Google
                </button>
            </form>

            <p className="switch-view-text">
                Não tem uma conta? 
                <button onClick={onSwitchToRegister} className="switch-view-button">
                    Cadastre-se
                </button>
            </p>
        </div>
    );
}

export default LoginForm;
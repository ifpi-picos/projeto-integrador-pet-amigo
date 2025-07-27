import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Ícone de sucesso

function SuccessMessage({ switchToLogin }) {
    return (
        <div className="auth-form-container success-message">
            <FaCheckCircle className="success-icon" />
            <h1>Cadastro realizado!</h1>
            <p className="form-subtitle">
                Enviamos um e-mail de confirmação para você. Por favor, verifique sua caixa de entrada para ativar sua conta.
            </p>
            <button onClick={switchToLogin} className="auth-button">
                Ir para o Login
            </button>
        </div>
    );
}

export default SuccessMessage;
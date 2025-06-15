import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Ícone de sucesso

function SuccessMessage({ switchToLogin }) {
    return (
        <div className="auth-form-container success-message">
            <FaCheckCircle className="success-icon" />
            <h1>Cadastro realizado com sucesso!</h1>
            <p>
                Enviamos um e-mail de confirmação para você. Por favor, verifique sua caixa de entrada para ativar sua conta antes de fazer o login.
            </p>
            <button onClick={switchToLogin} className="next-button">
                Ir para o Login
            </button>
        </div>
    );
}

export default SuccessMessage;
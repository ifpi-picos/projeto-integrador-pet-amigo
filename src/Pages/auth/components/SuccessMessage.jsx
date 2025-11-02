import React from "react";
import { MdEmail } from "react-icons/md";

function SuccessMessage({ switchToLogin }) {
    return (
        <div className="auth-form-container success-message">
            <MdEmail     className="success-icon" />
            <h1>Quase lá!</h1>
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
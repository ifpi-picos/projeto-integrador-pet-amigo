import React, { useState } from "react";

import { FaShieldDog } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";



function SelectUserType({ nextStep, updateFormData, onSwitchToLogin }) {
    const [selectedType, setSelectedType] = useState(null);

    const handleNextClick = () => {
        if (!selectedType) {
            alert("Por favor, selecione um tipo de conta.");
            return;
        }

        // CORREÇÃO: Enviando a chave correta 'user_type' com snake_case
        updateFormData({ user_type: selectedType });
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Crie sua conta</h1>
            <p>Para começar, nos diga que tipo de conta você gostaria de criar.</p>
            
            <div className="user-type-selection">
                <button className={`user-type-button ${selectedType === 'PESSOA' ? 'selected' : ''}`} onClick={() => setSelectedType('PESSOA')}
                    ><FaUserAlt />
                    <h3>Pessoa Física</h3>
                    <p>Ideal para indivíduos que desejam adotar ou ajudar animais.</p>
                </button>
                <button className={`user-type-button ${selectedType === 'ONG' ? 'selected' : ''}`} onClick={() => setSelectedType('ONG')}>
                    <FaShieldDog />
                    <h3>ONG ou Abrigo</h3>
                    <p>Perfeito para organizações que cuidam de animais e precisam de suporte.</p>
                </button>
            </div>

            <button className="auth-button" onClick={handleNextClick} disabled={!selectedType}>Próximo</button>

            <p className="switch-view-text">
                Já tem uma conta? 
                <button onClick={onSwitchToLogin} className="switch-view-button">Faça login</button>
            </p>
        </div>
    );
}

export default SelectUserType;
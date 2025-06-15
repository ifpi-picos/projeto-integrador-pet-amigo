import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";



function PersonForm({ nextStep, prevStep, updateFormData }) {
    const [personData, setPersonData] = useState({
        email: '',          // Adicionado
        password: '',       // Adicionado
        nome_completo: '',  // CORRIGIDO
        cpf: '',
        data_nascimento: '' // CORRIGIDO
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        // ... sua lógica de validação ...
        updateFormData(personData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre Você</h1>
            <form onSubmit={handleNext} className="profile-form">
                {/* CORREÇÃO: Atributos 'name' atualizados para snake_case */}
                <input type="email" name="email" placeholder="Seu melhor e-mail" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Crie uma senha forte" onChange={handleChange} required />
                <hr className="form-divider" />
                <input type="text" name="nome_completo" placeholder="Nome Completo" onChange={handleChange} required />
                <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
                <input type="date" name="data_nascimento" placeholder="Data de Nascimento" onChange={handleChange} required />
                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button"><FaArrowLeft /></button>
                    <button type="submit" className="auth-button">Próximo</button>
                </div>
            </form>
        </div>
    );
}

export default PersonForm;
import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function PersonForm({ nextStep, prevStep, updateFormData }) {
    // CORREÇÃO: Nomes do estado e campos em inglês
    const [personData, setPersonData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        full_name: '',
        display_name: '',
        cpf: '',
        birth_date: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (personData.password !== personData.confirm_password) {
            alert("As senhas não coincidem.");
            return;
        }
        if (personData.password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres.");
            return;
        }
        updateFormData(personData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre Você</h1>
            <p className="form-subtitle">Primeiro, seus dados pessoais e credenciais.</p>

            <form onSubmit={handleNext} className="profile-form">
                {/* CORREÇÃO: 'name' dos inputs em inglês */}
                <input type="text" name="full_name" className="form-input" placeholder="Nome Completo" onChange={handleChange} required />
                <input type="text" name="display_name" className="form-input" placeholder="Nome de Exibição (apelido)" onChange={handleChange} required />
                <input type="email" name="email" className="form-input" placeholder="Seu melhor e-mail" onChange={handleChange} required />
                
                <div className='input-with-icon-group'>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        className="form-input" 
                        placeholder="Crie uma senha forte" 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="input-icon-button">
                        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </button>
                </div>
                
                <input 
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    className="form-input" 
                    placeholder="Confirme sua senha" 
                    onChange={handleChange}     
                    required 
                />
                <p className="input-hint">A senha deve ter no mínimo 6 caracteres.</p>
                
                <div className='form-row-group'>
                    <input type="text" name="cpf" className="form-input" placeholder="CPF" onChange={handleChange} required />
                    <input type="date" name="birth_date" className="form-input" onChange={handleChange} required />   
                </div>

                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button"><FaArrowLeft /></button>
                    <button type="submit" className="next-button">Próximo</button> 
                </div>
            </form>
        </div>
    );
}

export default PersonForm;
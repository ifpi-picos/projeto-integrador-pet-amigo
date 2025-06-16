import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function PersonForm({ nextStep, prevStep, updateFormData }) {
    // 1. ADICIONADO 'confirm_password' ao estado
    const [personData, setPersonData] = useState({
        email: '',
        password: '',
        confirm_password: '', // Novo campo para confirmação
        nome_completo: '',
        nome_exibicao: '',
        cpf: '',
        data_nascimento: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();

        // 2. ADICIONADA VALIDAÇÃO DE CORRESPONDÊNCIA DE SENHA
        if (personData.password !== personData.confirm_password) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        // Validação de senha mínima (já existente)
        if (personData.password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres.");
            return;
        }

        // Validação de campos vazios (já existente)
        if (!personData.nome_completo || !personData.nome_exibicao || !personData.cpf || !personData.data_nascimento || !personData.email) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        
        updateFormData(personData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre Você</h1>
            <p className="form-subtitle">Primeiro, precisamos das suas credenciais e dados pessoais.</p>

            <form onSubmit={handleNext} className="profile-form">
                <input type="text" name="nome_completo" className="form-input" placeholder="Nome Completo" onChange={handleChange} required />
                <input type="text" name="nome_exibicao" className="form-input" placeholder="Nome de Exibição (como aparecerá no perfil)" onChange={handleChange} required />
                <input type="email" name="email" className="form-input" placeholder="Seu melhor e-mail" onChange={handleChange} required />
                
                {/* Grupo de senha com o ícone clicável */}
                <div className='input-with-icon-group'>
                    <input 
                        type={showPassword ? "text" : "password"} // O tipo muda com o estado
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
                
                {/* 3. CAMPO DE CONFIRMAÇÃO DE SENHA ADICIONADO */}
                {/* Ele também usa o estado 'showPassword' para uma UX consistente */}
                <input 
                    type={showPassword ? "text" : "password"}
                    name="confirm_password" // Nome corrigido para snake_case
                    className="form-input" 
                    placeholder="Confirme sua senha" 
                    onChange={handleChange}     
                    required 
                />

                <p className="input-hint">A senha deve ter no mínimo 6 caracteres.</p>
                
                <div className='form-row-group'>
                    <input type="text" name="cpf" className="form-input" placeholder="CPF" onChange={handleChange} required />
                    <input type="date" name="data_nascimento" className="form-input" onChange={handleChange} required />   
                </div>

                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button">
                        <FaArrowLeft />
                    </button>
                    <button type="submit" className="next-button">Próximo</button> 
                </div>
            </form>
        </div>
    );
}

export default PersonForm;
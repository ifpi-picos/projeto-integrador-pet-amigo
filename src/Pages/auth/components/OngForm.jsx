import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
// 1. Importe os ícones para mostrar/ocultar senha
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function OngForm({ nextStep, prevStep, updateFormData }) {
    // 2. Adicione 'confirm_password' ao estado
    const [ongData, setOngData] = useState({
        email: '',
        password: '',
        confirm_password: '', // Novo campo
        nome_ong: '',

        cnpj: '',
        nome_responsavel: ''
    });

    // 3. Adicione o estado para controlar a visibilidade da senha
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOngData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        // 4. Adicione a validação de correspondência de senha
        if (ongData.password !== ongData.confirm_password) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        if (ongData.password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres.");
            return;
        }
        
        if (!ongData.email || !ongData.nome_ong || !ongData.cnpj || !ongData.nome_responsavel) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        updateFormData(ongData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre sua ONG</h1>
            <p className="form-subtitle">Crie as credenciais e as informações da sua organização.</p>
            <form onSubmit={handleNext} className="profile-form">
                <input type="text" name="nome_ong" placeholder="Nome da ONG" onChange={handleChange} className="form-input" required />
                {/* Corrigido o erro de digitação de 'nomex_responsavel' para 'nome_responsavel' */}
                <input type="text" name="nome_responsavel" placeholder="Nome do Responsável" onChange={handleChange} className="form-input" required />
                <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} className="form-input" required />
                <input type="email" name="email" placeholder="E-mail da ONG" onChange={handleChange} className="form-input" required />
                
                {/* 5. Estrutura de senha e confirmação de senha, idêntica ao PersonForm */}
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
                
                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button">
                        <FaArrowLeft />
                    </button>
                    {/* A classe do botão de próximo já estava como 'next-button' no seu código, mantive. */}
                    <button type="submit" className="next-button">Próximo</button>
                </div>
            </form>
        </div>
    );
}

export default OngForm;
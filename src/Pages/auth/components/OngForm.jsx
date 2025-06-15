import React, { useState } from 'react';

function OngForm({ nextStep, prevStep, updateFormData }) {
    // 1. CORREÇÃO: As chaves do estado agora estão em snake_case
    const [ongData, setOngData] = useState({
        email: '',
        password: '',
        nome_ong: '',
        cnpj: '',
        nome_responsavel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOngData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        // 2. CORREÇÃO: A validação agora usa as chaves corretas
        if (!ongData.email || !ongData.password || !ongData.nome_ong || !ongData.cnpj || !ongData.nome_responsavel) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        
        if (ongData.password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres.");
            return;
        }

        updateFormData(ongData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre sua ONG</h1>
            <p>Vamos criar as credenciais de acesso e as informações da sua organização.</p>
            <form onSubmit={handleNext} className="profile-form">
                {/* 3. CORREÇÃO: Atributos 'name' atualizados para snake_case */}
                <input type="email" name="email" placeholder="E-mail da ONG" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Crie uma senha forte" onChange={handleChange} required />
                <p className="input-hint">A senha deve ter no mínimo 6 caracteres.</p>

                <hr className="form-divider" />

                <input type="text" name="nome_ong" placeholder="Nome da ONG" onChange={handleChange} required />
                <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} required />
                <input type="text" name="nome_responsavel" placeholder="Nome do Responsável" onChange={handleChange} required />
                
                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button">Voltar</button>
                    <button type="submit" className="auth-button">Próximo</button>
                </div>
            </form>
        </div>
    );
}

export default OngForm;
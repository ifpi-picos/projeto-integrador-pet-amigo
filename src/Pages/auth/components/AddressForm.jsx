import React, { useState } from 'react';

// Recebe a prop 'loading' para desabilitar o botão durante o envio
function AddressForm({ onSubmit, prevStep, loading }) {
    const [addressData, setAddressData] = useState({
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
        telefone: '' // Adicionado telefone aqui, um bom lugar para pedi-lo
    });
    const [loadingCep, setLoadingCep] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleCepBlur = async (e) => { /* ... lógica do CEP permanece a mesma ... */ };
    
    // LÓGICA DE SUBMISSÃO CORRIGIDA
    const handleSubmit = (e) => {
        e.preventDefault();
        // Passa os dados do endereço diretamente para a função de submissão final
        onSubmit(addressData);
    };

    return (
        <div className="auth-form-container">
            <h1>Onde encontrar você?</h1>
            <p>Essas informações são importantes para o processo de adoção.</p>
            <form onSubmit={handleSubmit} className="profile-form">
                <input type="text" name="cep" placeholder="CEP" onChange={handleChange} onBlur={handleCepBlur} required />
                <input type="text" name="endereco" placeholder="Endereço (Rua, Av.)" value={addressData.endereco} onChange={handleChange} required />
                <input type="text" name="cidade" placeholder="Cidade" value={addressData.cidade} onChange={handleChange} required />
                <input type="text" name="estado" placeholder="Estado (UF)" value={addressData.estado} onChange={handleChange} required />
                <input type="tel" name="telefone" placeholder="Telefone / WhatsApp" onChange={handleChange} required />
                
                {loadingCep && <p>Buscando endereço...</p>}

                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button" disabled={loading}>Voltar</button>
                    {/* Botão mostra "Enviando..." e fica desabilitado durante o carregamento */}
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Finalizar Cadastro'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
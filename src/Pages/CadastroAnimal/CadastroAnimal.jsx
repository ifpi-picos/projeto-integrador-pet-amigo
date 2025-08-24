import React, { useState } from "react";
import "./CadastroAnimal.css";
import { supabase } from "../../supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const CadastroAnimal = () => {
    // Pega os dados do usuário logado do nosso AuthContext
    const { user, profile } = useAuth();

    const [animal, setAnimal] = useState({
        name: "",
        description: "",
        age: "",
        species: "", // 'dog', 'cat', 'other'
        breed: "",
        gender: "",  // 'male', 'female'
        size: "",    // 'small', 'medium', 'large'
        location: "",
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimal((prevAnimal) => ({ ...prevAnimal, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Limpa previews antigos para evitar vazamento de memória
        imagePreviews.forEach(url => URL.revokeObjectURL(url));

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user || !profile) {
            setError("Você precisa estar logado para cadastrar um animal.");
            return;
        }
        if (selectedFiles.length === 0) {
            setError("Por favor, selecione pelo menos uma foto para o animal.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // 1. Insere os dados do animal para obter seu ID
            const { data: newAnimalData, error: animalError } = await supabase
                .from("animals")
                .insert({
                    name: animal.name,
                    description: animal.description,
                    age: animal.age,
                    species: animal.species,
                    breed: animal.breed,
                    gender: animal.gender,
                    size: animal.size,
                    location: animal.location,
                    owner_id: profile.id, // O 'id' do perfil (user ou ong) é a chave correta para 'owners'
                })
                .select()
                .single();

            if (animalError) throw animalError;
            
            const newAnimalId = newAnimalData.id;

            // 2. Faz o upload das imagens e prepara os dados para 'pet_photos'
            const photoUploadPromises = selectedFiles.map(async (file, index) => {
                const fileExtension = file.name.split(".").pop();
                const fileName = `${newAnimalId}/${uuidv4()}.${fileExtension}`; // Organiza fotos por ID do animal
                const filePath = `animais/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("assets-db")
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("assets-db")
                    .getPublicUrl(filePath);

                return {
                    pet_id: newAnimalId,
                    url: publicUrl,
                    is_cover: index === 0, // A primeira foto selecionada será a de capa
                };
            });
            
            const photosToInsert = await Promise.all(photoUploadPromises);
            
            // 3. Insere todas as fotos de uma vez no banco de dados
            const { error: photoError } = await supabase.from("pet_photos").insert(photosToInsert);

            if (photoError) throw photoError;
            
            setSuccess(true);
            // Limpa o formulário após o sucesso
            setAnimal({ name: "", description: "", age: "", species: "", breed: "", gender: "", size: "", location: "" });
            setSelectedFiles([]);
            setImagePreviews([]);

        } catch (error) {
            setError(error.message);
            console.error("Erro no cadastro do animal:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="cadastro-page-container">
            <div className="cadastro-content">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h1 className="form-title">🐾 Cadastrar um Amigo</h1>
                        <p>Preencha os dados abaixo para ajudar um animal a encontrar um novo lar. ✨</p>
                    </div>
                    <form onSubmit={handleSubmit} className="cadastro-form">
                        <div className="form-group full-width">
                            <label htmlFor="name">Nome do Animal</label>
                            <input type="text" id="name" name="name" value={animal.name} onChange={handleInputChange} required placeholder="Ex: Thor, Mel, Luna..." />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" name="description" value={animal.description} onChange={handleInputChange} rows="4" placeholder="Personalidade, cuidados, etc." />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="species">Espécie</label>
                            <select id="species" name="species" value={animal.species} onChange={handleInputChange} required>
                                <option value="">Selecione</option>
                                <option value="dog">Cachorro</option>
                                <option value="cat">Gato</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Raça</label>
                            <input type="text" id="breed" name="breed" value={animal.breed} onChange={handleInputChange} placeholder="Ex: SRD, Poodle..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Sexo</label>
                            <select id="gender" name="gender" value={animal.gender} onChange={handleInputChange}>
                                <option value="">Selecione</option>
                                <option value="male">Macho</option>
                                <option value="female">Fêmea</option>
                            </select>
                        </div>
                         <div className="form-group">
                            <label htmlFor="size">Porte</label>
                            <select id="size" name="size" value={animal.size} onChange={handleInputChange}>
                                <option value="">Selecione</option>
                                <option value="small">Pequeno</option>
                                <option value="medium">Médio</option>
                                <option value="large">Grande</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Idade (em meses)</label>
                            <input type="number" id="age" name="age" value={animal.age} onChange={handleInputChange} min="0" placeholder="Ex: 24" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Localização (Cidade/Estado)</label>
                            <input type="text" id="location" name="location" value={animal.location} onChange={handleInputChange} placeholder="Ex: Picos/PI" />
                        </div>
                        
                        <div className="form-group full-width">
                            <label htmlFor="photo">Fotos do Animal (a primeira será a capa)</label>
                            <div className="file-input-wrapper">
                                <span className="file-input-label">Escolher Arquivos</span>
                                <span className="file-name">
                                    {selectedFiles.length > 0 ? `${selectedFiles.length} arquivo(s) selecionado(s)` : "Arraste e solte ou clique aqui"}
                                </span>
                                <input type="file" id="photo" name="photo" onChange={handleFileChange} accept="image/*" required multiple />
                            </div>
                            {imagePreviews.length > 0 && (
                                <div className="image-previews">
                                    {imagePreviews.map((src, index) => (
                                        <img key={index} src={src} alt={`Preview ${index + 1}`} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="submit-group full-width">
                            <button type="submit" disabled={loading || !user} className="submit-button">
                                {loading ? "Cadastrando..." : "Cadastrar Animal"}
                            </button>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">Animal cadastrado com sucesso! 🎉</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroAnimal;
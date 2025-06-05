-----

# 🐾 Pet Amigo

Uma plataforma social para conectar amantes de animais de estimação, construída com React. O projeto conta com uma interface moderna, responsiva e com temas claro e escuro.

-----

### демонстрация

*[Insira um GIF ou screenshot da aplicação aqui. Ferramentas como ScreenToGif (Windows) ou Kap (Mac) são ótimas para criar GIFs da sua aplicação em funcionamento.]*

-----

## ✨ Funcionalidades

  - **Interface Responsiva:** Layout adaptável que funciona bem em desktops e se transforma em uma barra de navegação inferior em dispositivos móveis.
  - **Tema Claro e Escuro:** Sistema de temas dinâmico com um switch para alternar entre os modos.
  - **Persistência de Tema:** A preferência de tema do usuário é salva no `localStorage` do navegador, mantendo a escolha entre sessões e recarregamentos da página.
  - **Navegação com Rotas:** Estrutura de navegação single-page com `react-router-dom`, incluindo indicador visual para a página ativa.
  - **Componentização:** Código organizado em componentes reutilizáveis, como a barra de navegação.
  - **Estilização com Variáveis CSS:** Arquitetura de estilos flexível que facilita a manutenção e a implementação de temas.

-----

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

  - [**React.js**](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário.
  - [**React Router DOM**](https://reactrouter.com/) - Para gerenciamento de rotas do lado do cliente.
  - [**React Icons**](https://react-icons.github.io/react-icons/) - Para a utilização de ícones populares como componentes.
  - **CSS Moderno** - Estilização com Flexbox, Grid e Variáveis CSS para um design robusto e manutenível.
  - **JavaScript (ES6+)** - Lógica da aplicação e interatividade.

-----

## 🏁 Como Começar

Para rodar este projeto localmente na sua máquina, siga os passos abaixo.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/) (que inclui o `npm`) instalado no seu computador.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://docs.github.com/articles/referencing-and-citing-content
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd pet-amigo 
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

    *ou, se você usa Yarn:*

    ```bash
    yarn install
    ```

4.  **Inicie a aplicação:**

    ```bash
    npm start
    ```

    *ou, com Yarn:*

    ```bash
    yarn start
    ```

A aplicação será aberta automaticamente no seu navegador no endereço `http://localhost:3000`.

-----

## 📁 Estrutura de Pastas

O projeto está organizado da seguinte forma para facilitar a manutenção e escalabilidade:

```
pet-amigo/
├── public/                 # Arquivos públicos e o index.html principal
└── src/
    ├── assets/             # Imagens, logos e outros arquivos estáticos
    ├── Components/         # Componentes React reutilizáveis
    │   └── NavBar/
    │       ├── navbar.jsx
    │       └── navbar.css
    ├── context/            # Arquivos de contexto (ex: variables.css)
    ├── Pages/              # Componentes que representam as páginas da aplicação
    │   ├── Home/
    │   │   ├── home.jsx
    │   │   └── home.css
    │   └── ... (outras páginas)
    ├── App.js              # Componente principal que define as rotas
    └── index.js            # Ponto de entrada da aplicação
```

-----

## 📜 Scripts Disponíveis

No diretório do projeto, você pode rodar:

  - `npm start`: Inicia a aplicação em modo de desenvolvimento.
  - `npm test`: Roda os testes em modo interativo.
  - `npm run build`: Gera a versão de produção da aplicação na pasta `build`.

-----

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade open-source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um **Fork** do projeto.
2.  Crie sua **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  Faça o **Commit** de suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4.  Faça o **Push** para a Branch (`git push origin feature/AmazingFeature`).
5.  Abra um **Pull Request**.

-----

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

-----

## ✍️ Autores

  - **[Seu Nome]** - *Desenvolvedor Principal* - [Link para seu GitHub/LinkedIn](https://www.google.com/search?q=URL_DO_SEU_PERFIL)

-----

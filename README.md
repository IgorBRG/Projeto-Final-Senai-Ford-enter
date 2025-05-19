# Projeto Ford <Enter> - Dashboard Automotivo

Este projeto foi desenvolvido como parte do programa de capacitação Ford <Enter>, uma iniciativa da Ford em parceria com o SENAI, visando a formação de novos talentos na área de tecnologia.

## Visão Geral do Projeto

## Funcionalidades Principais

* **Autenticação de Usuário:** Sistema de login para acesso a áreas restritas.
    * Página de login.
    * Proteção de rotas (páginas de Home/Dashboard acessíveis apenas após login).
    * Funcionalidade de Logout.
* **Página Principal (Home/Boas-Vindas):**
    * Mensagem de boas-vindas personalizada.
    * Design com imagem de fundo e cartão de informações centralizado.
    * Carrossel de imagens com navegação automática e manual (se esta funcionalidade foi implementada na Home).
* **Dashboard de Veículos:**
    * Seleção de modelo de veículo via dropdown.
    * Exibição de informações agregadas do modelo selecionado (ex: total de vendas, conectados, atualizações de software).
    * Visualização da imagem do veículo selecionado.
    * Barra inferior fixa para busca de dados detalhados do veículo por VIN (Número de Identificação do Veículo), exibindo odômetro, nível de combustível, status e geolocalização.
* **Página de Lançamentos:**
    * Vídeo em destaque.
    * Descrição do produto.
    * Lista de modelos de veículos com opção de seleção via checkbox.
    * Funcionalidade para comparar até dois veículos selecionados, exibindo seus detalhes lado a lado em uma tabela.
* **Página de Contato:**
    * Formulário de contato com campos para dados do usuário e mensagem.
    * Máscara de input para campos de CPF e Telefone.
    * Validação de formulário.
* **Componentização:**
    * Header, Footer e Sidebar reutilizáveis como componentes Angular.
* **Responsividade:** Interface adaptada para visualização em diferentes tamanhos de tela (desktop, tablet, mobile).

## Tecnologias Utilizadas

**Frontend:**
* **Angular (versão X.Y.Z)** * Componentes Standalone
    * Angular Router (para navegação)
    * Angular Forms (Template-Driven para os formulários)
    * Angular Animations (para transições no carrossel, se implementado)
    * HttpClient (para comunicação com o backend)
* **TypeScript**
* **HTML5**
* **Bootstrap (versão 5.3)** 
* **ngx-mask** (para máscaras de input)

**Backend:**
* **Node.js**
* **Express.js**
    * API REST para login, busca de veículos e dados de veículos.
    * CORS configurado para permitir requisições do frontend.
* **JavaScript**

**Outras Ferramentas/Bibliotecas:**
* Git & GitHub (para versionamento)
* npm ou Yarn (gerenciador de pacotes)


## Como Executar o Projeto Localmente

**Pré-requisitos:**
* Node.js e npm (ou Yarn) instalados. (Especifique versões recomendadas se houver)
* Angular CLI instalado globalmente (`npm install -g @angular/cli`).

**Backend:**
1.  Navegue até a pasta do backend
2.  Instale as dependências: `npm install` (ou `yarn install`)
3.  Inicie o servidor backend: `npm run api`
    * *O backend estará rodando em `http://localhost:3001` (conforme o código da API que você me mostrou).*

**Frontend:**
1.  Navegue até a pasta do frontend Angular
2.  Instale as dependências: `npm install` (ou `yarn install`)
3.  Inicie o servidor de desenvolvimento do Angular: `ng serve -o`
    * *A aplicação frontend estará acessível em `http://localhost:4200`.*

## Autores

* **IgorBRG** - *Desenvolvedor Principal* - (https://github.com/IgorBRG)
## Agradecimentos 

* Agradecimentos ao programa Ford <Enter> e ao SENAI pela oportunidade.
* Agradecimentos a quaisquer instrutores ou mentores.
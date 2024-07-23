# ChatBotWhatsApp

Bot de atendimento via Whatsapp

## Requisitos

- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)
- [LM Studio](https://lmstudio.ai/) para uso de IA local

## Instruções de Configuração

### 1. Criando o Repositório no GitHub

1. Crie um novo repositório no GitHub.
2. Clone o repositório usando o VSCode:

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_SEU_REPOSITORIO>
    ```

### 2. Inicializando o Projeto

1. No terminal, dentro da pasta do projeto, execute:

    ```bash
    npm init -y
    ```

2. Adicione a biblioteca `wppconnect`:

    ```bash
    npm install @wppconnect-team/wppconnect
    ```

### 3. Configurando o Projeto

1. Crie um arquivo chamado `app.js` dentro da pasta do projeto.
2. Utilize o código fornecido na [documentação do wppconnect](https://wppconnect.io/docs/tutorial/basics/installation) para configurar o `app.js`.

### 4. Testando o Projeto

1. No terminal, execute:

    ```bash
    node app.js
    ```

### 5. Utilizando IA Local

1. Baixe e instale o [LM Studio](https://lmstudio.ai/) no computador que irá rodar o serviço.

## Instalação e Uso

### 1. Carregando o NVM no Shell

```bash
source ~/.nvm/nvm.sh

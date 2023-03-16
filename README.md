# APP Finanças pessoais

![NPM](https://img.shields.io/badge/licence-MIT-<brightgreen>)

# Sobre o projeto

Aplicativo de Finanças Pessoais foi desenvolvido para mobile como projeto prático do curso **Fábrica de Aplicativos**.

A principal funcionalidade do aplicativo é realizar o registro de receitas e despesas  do usuário com controle de acesso para melhor controle financeiro.

## Layout mobile
![Mobile 1](https://github.com/gcarpaneze/pictures/blob/d9870ecc4274415b479d2e52483409f06fa995a9/App%20Finan%C3%A7as%201.png) ![Mobile 2](https://github.com/gcarpaneze/pictures/blob/d9870ecc4274415b479d2e52483409f06fa995a9/App%20Finan%C3%A7as%202.png) 

# Principais tecnologias utilizadas no projeto:

- React Native
- React Native Calendars
- Axios
- React Navigation

# Como executar o projeto

## Back end
API fornecida pelo curso pelo link : https://github.com/devfraga/backend-financas

## Mobile
Pré-requisitos:
- Node.js na versão LTS
- JDK 11
- Android Studio
- yarn

```bash
# clonar repositório
git clone https://github.com/devsuperior/sds1-wmazoni

# entrar na pasta do projeto front end web
cd app

# instalar dependências
yarn install

# Alterando base URL do Axios:
Se estiver utilizando o dispositivo físico para rodar o projeto alterar a baseURL de "localhost" para o "Endereço IPv4" para o axios conseguir fazer as requisições para o servidor no arquivo src/services/api.js

# executar o projeto

## Usando o dispositivo físico ou emulador
yarn start
yarn react-native run-android

```

# Autor

Guilherme Carpaneze

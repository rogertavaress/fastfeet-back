# :rocket: Desafio goStack: FastFeet, Backend.

<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<blockquote align="center">
“Não espere para plantar, apenas tenha paciência para colher”!
</blockquote>

## Objetivo

Criar uma Api para uma transportadora fictícia, que faz parte de uma série de desafios propostos pelo curso GoStack da Rocketseat.

## Sobre o Projeto

Projeto desenvolvido como desafio para o curso da Rocketseat.

### Tecnologias usadas

-   Node.JS
-   Sequelize(ORM)
-   Postgresql
-   Express.js
-   JWT - JsonWebToken
-   bcrypt.js
-   Yup
-   Eslint, com o padrão da AirBNB
-   Nodemon
-   Prettier
-   Sucrase

## Instalação

Nessa parte vou mostrar o que é preciso para executar o projeto em uma máquina local.

### Yarn

No site oficial tem a documentação: [Site Oficial](https://yarnpkg.com/en/docs/install)

### Docker

No site oficial, tem a documentação: [Site Oficial](https://docs.docker.com/install/)

## Configuração

Essa é a parte mais desafiadora de explicar, mas vamos conseguir.

### Yarn

Para baixar todas as dependências do projeto você precisa entrar na pasta do projeto e executar os seguintes comandos:

```sh
cd [Local da pasta]/fastfeet-back
yarn
```

### Docker

-   Em sistemas da Apple e em Linux você precisa executar a seguinte linha de comando para criar um servidor Postgres no Docker:
    ```sh
    docker run --name fastfeetDB -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
    ```
-   Para verificar se o servidor está funcionando:
    ```sh
    docker ps
    ```
-   Para iniciar o servidor:
    ```sh
    docker start fastfeetDB
    ```
-   Para parar o servidor:
    ```sh
    docker stop fastfeetDB
    ```
-   Você precisa criar um database no servidor. Para isso eu usei a interface gráfica do [postbird](https://github.com/Paxa/postbird).
    > Lembre-se de criar um database com o seguinte nome: fastfeetdb
-   Para gerar as tabelas do projeto usei o sequelize CLI com as migrations. Dessa forma, evitamos o erro ao criar novas tabelas no ambiente de desenvolvimento.
    ```sh
    cd [Local da pasta]/fastfeet-back
    yarn sequelize db:migrate
    ```
-   Para gerar um usuário para realizar os testes usei o sequelize CLI com os seeders.
    ```sh
    cd [Local da pasta]/fastfeet-back
    yarn sequelize db:seed:all
    ```

## Iniciar o Projeto

### Banco de dados

Para iniciar o Banco de dados postgres que foi visualizado no Docker.

```sh
docker start fastfeetDB
```

### NodeJS

Para Iniciar a nossa API.

```sh
cd [Local da pasta]/fastfeet-back
yarn dev
```

Para fazer um requisição utilizamos a porta 3333.
OBS: Para testar as requisições usei o [Insomnia](https://insomnia.rest/download/).

> http://localhost:3333/

## Contatos

-   [Linkedin](https://www.linkedin.com/in/rogertavaress/)

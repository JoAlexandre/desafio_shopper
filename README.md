# desafio_shopper

Este projeto foi desenvolvido com [Docker](https://www.docker.com/), [Node.js](https://nodejs.org/pt) e [PostgresSQL](https://www.postgresql.org/)
para o desafio de Desenvolvedor Web Full-Stack


## Regras de negócio
Foram estabelecidas as regras de negócio através do documento fornecido pela shopper!


## Estrutura do projeto
A solução do desafio esta na pasta backend, com o arquivo docker-compose.yml e Dockerfile nela. Apenas com estes dois, pode-se testar a aplicação.
A quesito de facilidade, estou deixando um mini app na pasta frontend, com campos padronizados para fazer as solicitações exigidas no desafio.


## Variaveis de Ambiente
A aplicação do backend ja esta preparada para receber a variavel de ambiente solicitada pelo desafio.
uma variavel de ambiente adicional tera que ser colocada para iniciar o servidor:
no arquivo `.env`, defina `PORT=3001` para que o processo seja inicializado corretamente.


## Scripts
### Backend

Para iniciar o projeto, voce deverá executar os seguintes códigos:

pasta `/backend`
```
  docker build -t shopper .
  docker compose up
```

### Frontend
Para iniciar o projeto no frontend, voce deverá executar os seguintes códigos:

pasta `/frontend`
```
  npm install
  npm start
```

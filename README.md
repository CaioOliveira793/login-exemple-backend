# login-exemple-backend

## Instalação

Para executar o projeto em ambiente de desenvolvimento, com o [docker](https://www.docker.com/) instalado em sua máquina, execute o comando `docker-compose up`.

Caso não possua o docker, instale os pacotes do projeto e execute o script `dev`.

```cmd
npm install
npm run dev
```

Para testar os endpoints, utilize o cliente HTTP [Insomnia](https://insomnia.rest/).


## Documentação

### Rotas da aplicação

Método | Rota | Descrição
-------|------|----------
POST | session | faz o login de um usuário
POST | users | cria um usuário
GET | users/:id | retorna um usuário
GET | users | retorna uma lista de usuários
PUT | users/:id | altera os campos de um usuário
DELETE | users/:id | deleta um usuário

# Magic TCG Collection

[![CI](https://github.com/uricbonatti/magic-tcg-collection/actions/workflows/ci.yml/badge.svg)](https://github.com/uricbonatti/magic-tcg-collection/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/node-22%20%7C%2024-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)

API REST para jogadores de **Magic: The Gathering** gerenciarem sua coleção de cartas: cadastro e login com JWT, CRUD de cartas, busca por nome e listagem ordenada por preço. Cartas cadastradas em outro idioma têm o nome **traduzido para português** (Google Cloud Translation) e normalizado. Foi feita como solução de um desafio técnico da Zappts (2022).

## Destaques técnicos

- **Módulos** (`auth`, `cards`) com controller → service → repository e injeção de dependência (`tsyringe`)
- **Autenticação JWT** com senhas em **bcrypt**; cada jogador só acessa as próprias cartas
- **MongoDB + TypeORM 0.3**, com **índice único** no e-mail
- **Validação de entrada** com Joi (`celebrate`), inclusive do formato do id
- **Testes:** 64 unitários e **14 e2e com Testcontainers**, que sobem um MongoDB real e cobrem cadastro, login, isolamento entre jogadores, CRUD, busca e validações
- **Docker:** imagem multi-stage com Node 24 e usuário sem privilégios

## Executando

### Com Docker Compose

```bash
cp .env.example .env   # defina APP_SECRET e as credenciais do Google
docker compose up --build
```

A API sobe em `http://localhost:3333` com o MongoDB.

### Localmente

Requer Node.js **22** ou **24** e um MongoDB.

```bash
cp .env.example .env
docker run -d --name mtc-mongo -p 27017:27017 mongo:7
npm ci
npm run start:dev
```

> Em produção (`NODE_ENV=production`) a API não sobe sem `APP_SECRET`: sem ele, qualquer um poderia forjar tokens.

## Rotas

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/signup` | — | Cadastra jogador (`email`, `password`, `confirm_password`) |
| POST | `/signin` | — | Devolve `{ player, token }` |
| GET | `/healthcheck` | — | `ok` |
| GET | `/cards` | JWT | Lista as cartas do jogador, da mais cara para a mais barata |
| GET | `/cards/search/:name` | JWT | Busca por trecho do nome |
| GET | `/cards/:id` | JWT | Mostra uma carta |
| POST | `/cards` | JWT | Cadastra carta (`name`, `edition`, `language` pt/en/jp, `foil`, `priceInBrazilianReal`, `quantity`) |
| PATCH | `/cards/:id` | JWT | Atualiza `quantity` e/ou `priceInBrazilianReal` |
| DELETE | `/cards/:id` | JWT | Remove a carta |

Documentação OpenAPI em [`docs/openapi.yml`](docs/openapi.yml) e coleção do Postman em [`docs/postman.postman_collection`](docs/postman.postman_collection).

## Testes

```bash
npm test               # unitários (com --coverage gera o relatório em coverage/)
npm run test:e2e       # e2e: sobe um MongoDB real com Testcontainers (requer Docker)
npm run lint
npm run typecheck
```

Nos e2e, só o Google Translate é substituído por um tradutor fixo, por ser um serviço externo pago. Banco, JWT, bcrypt e as rotas são reais.

## Licença

[MIT](LICENSE)

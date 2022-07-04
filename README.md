# Magic TCG Collection

## Detalhes do Projeto

Projeto desenvolvido para solucionar o desafio proposto pela Zappts.

O desafio esta descrito abaixo:
[Desafio.pdf](docs/Desafio.pdf)

E esta disponivel para acesso temporariamente no Heroku:
[Magic TCG Collection - Heroku](https://magic-tcg-collection.herokuapp.com/)

### **Testes**

Os testes do projeto utilizam das seguinte bibliotecas:

- **Supertest**: Testes de Rotas e Requisições HTTP
- **Jest**: Motor de teste

Os testes apresentaram uma excelente cobertura de testes unitatios.
Para se replicar os testes localmente é preciso ter o `NodeJS 16.15.1`.

Instalar a dependencias:

```shell
npm install
```

E executar os testes unitatios:

```shell
npm test:unit
```

Para se obter o arquivo de cobertura após o teste abra no navegador o arquivo `coverage/lcov-report/index.html` partindo da raiz do projeto.

### **Executando Localmente**

É preciso ter o `NodeJS 16.15.1` ou superior e ter o `MongoDB` na maquina.
O ideal é o uso do MongoDB através do docker, sendo o comando para criar o container o seguinte:

```shell
docker run --name mongodbMTC -p 27017:27017 -d mongo
```

Outro ponto importante é ter uma conta na **Google Cloud** com a **Translate Api** habilitada.

Para executar o projeto precisa-se criar um arquivo `.env` na raiz do projeto contendo as seguintes variaveis:

```env
PORT=3333
NODE_ENV=development
MONGO_URL='mongodb://localhost:27017'

GOOGLE_PROJECT_ID=
GOOGLE_TRANSLATE_API_KEY=
```

Com as variaveis de ambiente configuradas, instale as dependencias do projeto atraves do:

```shell
npm install
```

E após a instalação o projeto esta pronto para ser executado em modo de desenvolvimento através do comando:

```shell
npm start:dev
```

### **Executando através do Docker**

Utilize do **docker-compose** para executar o projeto através do seguinte comando:

```shell
docker-compose up
```

A API estará disponivel na porta default 3333, podendo ser alterada dentro do arquivo `docker-compose.yaml`

### **Documentação da API**

A documentação esta disponibilizada online no:

- [Swagger](https://app.swaggerhub.com/apis-docs/URICBONATTIENG/zappts-magic_tcg_collection/1.0.0)
- [Postman](https://documenter.getpostman.com/view/13703444/UzJFxKDX)

Ou atráves de codigo:

- [OpenApi/Swagger](docs/openapi.yml)
- [Postman](postman.postman_collection)

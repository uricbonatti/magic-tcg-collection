import 'reflect-metadata';
import {
  MongoDBContainer,
  StartedMongoDBContainer
} from '@testcontainers/mongodb';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import { container } from 'tsyringe';
import type { Express } from 'express';
import type { DataSource } from 'typeorm';

// Fluxo completo: Express real + MongoDB real (Testcontainers) + JWT + bcrypt.
// Só o Google Translate é substituído por um tradutor fixo (serviço externo pago).
jest.setTimeout(180_000);

const translations: Record<string, string> = {
  'Lightning Bolt': 'Relâmpago',
  Counterspell: 'Anular Feitiço'
};

let mongoContainer: StartedMongoDBContainer;
let mongo: MongoClient;
let dataSource: DataSource;
let app: Express;

async function signUpAndIn(email: string): Promise<string> {
  await request(app)
    .post('/signup')
    .send({ email, password: 'S3nha!forte', confirm_password: 'S3nha!forte' });
  const res = await request(app)
    .post('/signin')
    .send({ email, password: 'S3nha!forte' });
  return res.body.token;
}

const card = (overrides: Record<string, unknown> = {}) => ({
  name: 'Lightning Bolt',
  edition: 'Alpha',
  language: 'en',
  foil: false,
  priceInBrazilianReal: 120.5,
  quantity: 2,
  ...overrides
});

beforeAll(async () => {
  mongoContainer = await new MongoDBContainer('mongo:7').start();
  process.env.MONGO_URL = `${mongoContainer.getConnectionString()}/?directConnection=true`;
  process.env.APP_SECRET = 'e2e-secret';

  // Importa só depois de configurar o ambiente: env e DataSource leem as variáveis no import.
  dataSource = (await import('@config/orm')).dataSource;
  await dataSource.initialize();
  await import('@config/containers');
  container.registerInstance('TranslateProvider', {
    translate: async (text: string) => translations[text] ?? text
  });
  app = (await import('@shared/app/app')).default as Express;

  mongo = await MongoClient.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongo?.close();
  await dataSource?.destroy();
  await mongoContainer?.stop();
});

describe('Autenticação (e2e)', () => {
  it('cadastra um jogador sem expor a senha', async () => {
    const res = await request(app).post('/signup').send({
      email: 'ana@mtg.dev',
      password: '123456',
      confirm_password: '123456'
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.any(String), email: 'ana@mtg.dev' })
    );
    expect(res.body).not.toHaveProperty('password');

    const stored = await mongo
      .db('projetos')
      .collection('players')
      .findOne({ email: 'ana@mtg.dev' });
    expect(stored?.password).not.toBe('123456'); // hash bcrypt
  });

  it('recusa e-mail repetido', async () => {
    const res = await request(app).post('/signup').send({
      email: 'ana@mtg.dev',
      password: '123456',
      confirm_password: '123456'
    });

    expect(res.status).toBe(400);
  });

  it('cria índice único no e-mail', async () => {
    const indexes = await mongo.db('projetos').collection('players').indexes();
    expect(indexes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: { email: 1 }, unique: true })
      ])
    );
  });

  it('autentica e devolve um JWT', async () => {
    const res = await request(app)
      .post('/signin')
      .send({ email: 'ana@mtg.dev', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
  });

  it('recusa senha errada', async () => {
    const res = await request(app)
      .post('/signin')
      .send({ email: 'ana@mtg.dev', password: 'errada' });

    expect(res.status).toBe(401);
  });

  it('bloqueia /cards sem token', async () => {
    const res = await request(app).get('/cards');

    expect(res.status).toBe(401);
  });
});

describe('Coleção de cartas (e2e)', () => {
  let token: string;
  let boltId: string;

  beforeAll(async () => {
    token = await signUpAndIn('bia@mtg.dev');
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });

  it('cadastra carta em inglês traduzindo e normalizando o nome', async () => {
    const res = await request(app).post('/cards').set(auth()).send(card());

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'relampago',
        quantity: 2,
        language: 'en'
      })
    );
    boltId = res.body.id;
  });

  it('lista as cartas do jogador ordenadas da mais cara para a mais barata', async () => {
    await request(app)
      .post('/cards')
      .set(auth())
      .send(card({ name: 'Counterspell', priceInBrazilianReal: 300 }));

    const res = await request(app).get('/cards').set(auth());

    expect(res.status).toBe(200);
    expect(res.body.map((c: { name: string }) => c.name)).toEqual([
      'anular feitico',
      'relampago'
    ]);
  });

  it('busca por trecho do nome e trata caracteres especiais como texto', async () => {
    const found = await request(app).get('/cards/search/relam').set(auth());
    const regex = await request(app)
      .get(`/cards/search/${encodeURIComponent('.*')}`)
      .set(auth());

    expect(found.status).toBe(200);
    expect(found.body).toHaveLength(1);
    expect(regex.status).toBe(200);
    expect(regex.body).toHaveLength(0);
  });

  it('mostra uma carta pelo id', async () => {
    const res = await request(app).get(`/cards/${boltId}`).set(auth());

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(boltId);
  });

  it('responde 400 para id inválido e 404 para id inexistente', async () => {
    const invalid = await request(app).get('/cards/abc').set(auth());
    const missing = await request(app)
      .get('/cards/0123456789abcdef01234567')
      .set(auth());

    expect(invalid.status).toBe(400);
    expect(missing.status).toBe(404);
  });

  it('não deixa outro jogador ver a carta', async () => {
    const otherToken = await signUpAndIn('caio@mtg.dev');

    const res = await request(app)
      .get(`/cards/${boltId}`)
      .set({ Authorization: `Bearer ${otherToken}` });

    expect(res.status).toBe(404);
  });

  it('atualiza quantidade e preço', async () => {
    const res = await request(app)
      .patch(`/cards/${boltId}`)
      .set(auth())
      .send({ quantity: 4, priceInBrazilianReal: 99.9 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ quantity: 4, priceInBrazilianReal: 99.9 })
    );
  });

  it('remove a carta', async () => {
    const del = await request(app).delete(`/cards/${boltId}`).set(auth());
    const show = await request(app).get(`/cards/${boltId}`).set(auth());

    expect(del.status).toBe(204);
    expect(show.status).toBe(404);
  });
});

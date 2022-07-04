/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { Server } from 'http';
import supertest, { SuperAgentTest } from 'supertest';
import { container } from 'tsyringe';

import app from '@shared/app/app';

let server: Server;
let agent: SuperAgentTest;

let isSignin: boolean;

class GenericMockedServices {
  public async run(data: any) {
    if (isSignin) {
      return { mocked: true, player: data, token: 'fake-token' };
    }
    return { mocked: true, data };
  }
}

describe('Credential Routes', () => {
  beforeEach((done) => {
    isSignin = false;
    jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    server = app.listen('3334', () => {
      agent = supertest.agent(server);
      return done();
    });
  });
  afterEach(() => {
    return server && server.close();
  });

  it('should return status 200 when signin is success on POST /signin', async () => {
    isSignin = true;
    const response = await agent
      .post('/signin')
      .send({ email: 'teste@test.io', password: 'password' });
    expect(response.body).toEqual({
      player: { email: 'teste@test.io', password: 'password' },
      token: 'fake-token'
    });
    expect(response.statusCode).toEqual(200);
  });
  it('should return status 400 when email isnt an email on POST /signin', async () => {
    isSignin = true;
    const response = await agent
      .post('/signin')
      .send({ email: 'teste', password: 'password' });
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.statusCode).toEqual(400);
  });
  it('should return status 201 when signup is success on POST /signup', async () => {
    const response = await agent.post('/signup').send({
      email: 'teste@test.io',
      password: 'password',
      confirm_password: 'password'
    });
    expect(response.body).toEqual({
      data: { email: 'teste@test.io', password: 'password' },
      mocked: true
    });
    expect(response.statusCode).toEqual(201);
  });
  it('should return status 400 when email isnt an emailon POST /signup', async () => {
    const response = await agent.post('/signup').send({
      email: 'teste',
      password: 'password',
      confirm_password: 'password'
    });
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.statusCode).toEqual(400);
  });
  it('should return status 400 when passwords not match on POST /signup', async () => {
    const response = await agent.post('/signup').send({
      email: 'teste@test.io',
      password: 'password',
      confirm_password: 'not-match'
    });
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.statusCode).toEqual(400);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import 'reflect-metadata';

import supertest, { SuperAgentTest } from 'supertest';

import app from '@shared/app/app';

let server: Server;
let agent: SuperAgentTest;

describe('Healthcheck Route', () => {
  beforeEach((done) => {
    server = app.listen('3334', () => {
      agent = supertest.agent(server);
      return done();
    });
  });
  afterEach(() => {
    return server && server.close();
  });
  it('should return status 200 on GET /healthcheck', async () => {
    const response = await agent.get('/healthcheck').send();
    expect(response.text).toEqual('ok');
    expect(response.statusCode).toEqual(200);
  });
});

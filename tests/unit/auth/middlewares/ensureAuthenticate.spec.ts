/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import ensureAuthenticated from '@modules/auth/middlewares/ensureAuthenticated';
import { NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

const { expiresIn, secret } = auth.jwt;
let token: string;
describe('ensureAuthenticate Middleware', () => {
  beforeAll(() => {
    token = sign({}, secret, {
      subject: 'fake-player-id',
      expiresIn
    });
  });

  it('should add player id on request', async () => {
    const request = new MockExpressRequest({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const response = new MockExpressResponse();
    const nextFunction: NextFunction = () => {};
    ensureAuthenticated(request, response, nextFunction);
    expect(request).toHaveProperty('player');
    expect(request).toHaveProperty('player.id');
  });
  it('should throw an AppError when token isnt on request', async () => {
    const request = new MockExpressRequest({
      headers: {
        authorization: undefined
      }
    });
    const response = new MockExpressResponse();
    const nextFunction: NextFunction = () => {};
    try {
      ensureAuthenticated(request, response, nextFunction);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should throw an AppError when token isnt valid on request', async () => {
    const request = new MockExpressRequest({
      headers: {
        authorization: 'Bearer fake-token'
      }
    });
    const response = new MockExpressResponse();
    const nextFunction: NextFunction = () => {};
    try {
      ensureAuthenticated(request, response, nextFunction);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});

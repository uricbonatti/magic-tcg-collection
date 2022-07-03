/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';

import { container } from 'tsyringe';

import AuthController from '@modules/auth/controllers/AuthController';

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

let controller: AuthController;

class GenericMockedServices {
  public async run(data: any) {
    return data;
  }
}
let spy: jest.SpyInstance;
describe('AuthController', () => {
  it('should be able to return status 200 when signIn is success', async () => {
    spy = jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    controller = new AuthController();

    const request = new MockExpressRequest({
      method: 'POST',
      body: {
        email: 'teste@test.io',
        password: 'password'
      }
    });
    const passResponse = new MockExpressResponse();
    const response = await controller.signIn(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  });
  it('should be able to return status 201 when signUp is success', async () => {
    spy = jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    controller = new AuthController();

    const request = new MockExpressRequest({
      method: 'POST',
      body: {
        email: 'teste@test.io',
        password: 'password'
      }
    });
    const passResponse = new MockExpressResponse();
    const response = await controller.signUp(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(response.statusCode).toBe(201);
    expect(passResponse._getJSON()).toEqual({
      email: 'teste@test.io',
      password: 'password'
    });
  });
});

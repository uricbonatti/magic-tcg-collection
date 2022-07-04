/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';

import { container } from 'tsyringe';

import CardsController from '@modules/cards/controllers/CardsController';

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

let controller: CardsController;

class GenericMockedServices {
  public async run(data: any) {
    return data;
  }
}
let spy: jest.SpyInstance;
describe('CardsController', () => {
  beforeEach(() => {
    spy = jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    controller = new CardsController();
  });
  it('should be able to return status 200 when list cards is success', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      player: {
        id: 'fake-player-id'
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.index(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(200);
    expect(passResponse._getJSON()).toEqual({ playerId: 'fake-player-id' });
  });
  it('should be able to return status 200 when card is show', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      params: {
        id: 'fake-card-id'
      },
      player: {
        id: 'fake-player-id'
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.show(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(200);
    expect(passResponse._getJSON()).toEqual({
      id: 'fake-card-id',
      playerId: 'fake-player-id'
    });
  });
  it('should be able to return status 200 when cards name are searched', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      params: {
        name: 'fake-card-name'
      },
      player: {
        id: 'fake-player-id'
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.search(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(200);
    expect(passResponse._getJSON()).toEqual({
      name: 'fake-card-name',
      playerId: 'fake-player-id'
    });
  });
  it('should be able to return status 200 when card is update', async () => {
    const request = new MockExpressRequest({
      method: 'PATCH',
      params: {
        id: 'fake-card-id'
      },
      player: {
        id: 'fake-player-id'
      },
      body: {
        quantity: 5,
        priceInBrazilianReal: 25.0
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.update(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(200);
    expect(passResponse._getJSON()).toEqual({
      id: 'fake-card-id',
      playerId: 'fake-player-id',
      quantity: 5,
      priceInBrazilianReal: 25.0
    });
  });
  it('should be able to return status 201 when card is create', async () => {
    const request = new MockExpressRequest({
      method: 'POST',
      player: {
        id: 'fake-player-id'
      },
      body: {
        quantity: 5,
        priceInBrazilianReal: 25.0,
        name: 'teste',
        edition: 'Kamigawa',
        foil: false,
        language: 'pt'
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.create(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(201);
    expect(passResponse._getJSON()).toEqual({
      playerId: 'fake-player-id',
      quantity: 5,
      priceInBrazilianReal: 25.0,
      name: 'teste',
      edition: 'Kamigawa',
      foil: false,
      language: 'pt'
    });
  });
  it('should be able to return status 204 when card is deleted', async () => {
    const request = new MockExpressRequest({
      method: 'DELETE',
      params: {
        id: 'fake-card-id'
      },
      player: {
        id: 'fake-player-id'
      }
    });
    const passResponse = new MockExpressResponse();
    await controller.delete(request, passResponse);
    expect(spy).toHaveBeenCalled();
    expect(passResponse.statusCode).toBe(204);
  });
});

import 'reflect-metadata';
import CreateCardService from '@modules/cards/services/CreateCardService';
import FakeTranslateProvider from '../../../mocks/FakeTranslateProvider';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';

let fakeTranslateProvider: FakeTranslateProvider;
let fakeCardsRepository: FakeCardsRepository;
let service: CreateCardService;
describe('CreateCardService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeTranslateProvider = new FakeTranslateProvider();
    service = new CreateCardService(fakeCardsRepository, fakeTranslateProvider);
  });
  it('should be able to create a new card without use translate', async () => {
    const response = await service.run({
      name: 'Falha Humana',
      edition: 'development',
      language: 'pt',
      foil: true,
      priceInBrazilianReal: 0,
      quantity: 1,
      playerId: 'fake-player-id'
    });
    expect(response).toHaveProperty('id');
    expect(response.name).toEqual('falha humana');
  });
  it('should be able to create a new card using translate', async () => {
    const response = await service.run({
      name: 'Failure',
      edition: 'development',
      language: 'en',
      foil: true,
      priceInBrazilianReal: 0,
      quantity: 1,
      playerId: 'fake-player-id'
    });
    expect(response).toHaveProperty('id');
    expect(response.name).toEqual('failurept');
  });
});

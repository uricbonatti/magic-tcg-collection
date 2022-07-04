import Card from '@modules/cards/schemas/Card';
import UpdateCardService from '@modules/cards/services/UpdateCardService';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';
import { ObjectId } from 'mongodb';
import AppError from '@shared/errors/AppError';

let fakeCardsRepository: FakeCardsRepository;
let service: UpdateCardService;

const cardId = '62c229e08eb5788883436d4a';

const mockCard: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id',
  quantity: 1,
  priceInBrazilianReal: 10.11
});
describe('UpdateCardService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCardsRepository.cards.push(mockCard);
    service = new UpdateCardService(fakeCardsRepository);
  });
  it('should be able to return the card when not change occurs', async () => {
    const response = await service.run({
      id: cardId,
      playerId: 'fake-player-id',
      quantity: undefined,
      priceInBrazilianReal: undefined
    });
    expect(response).toEqual(mockCard);
  });
  it('should be able to update the card when quantity update occurs', async () => {
    const response = await service.run({
      id: cardId,
      playerId: 'fake-player-id',
      quantity: 115
    });
    expect(response.playerId).toEqual('fake-player-id');
    expect(fakeCardsRepository.cards[0].quantity).toEqual(115);
  });
  it('should be able to update the card when price update occurs', async () => {
    const response = await service.run({
      id: cardId,
      playerId: 'fake-player-id',
      quantity: undefined,
      priceInBrazilianReal: 9.85
    });
    expect(response.playerId).toEqual('fake-player-id');
    expect(fakeCardsRepository.cards[0].priceInBrazilianReal).toEqual(9.85);
  });
  it('should throw an AppError when card cannot be found', async () => {
    await expect(
      service.run({ id: 'failure', playerId: 'fake-player-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should throw an AppError when isnt the card owner', async () => {
    await expect(
      service.run({ id: cardId, playerId: 'fake-player-id-2' })
    ).rejects.toBeInstanceOf(AppError);
  });
});

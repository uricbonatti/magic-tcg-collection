import Card from '@modules/cards/schemas/Card';
import ShowCardService from '@modules/cards/services/ShowCardService';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';
import { ObjectId } from 'mongodb';
import AppError from '@shared/errors/AppError';

let fakeCardsRepository: FakeCardsRepository;
let service: ShowCardService;

const cardId = '62c229e08eb5788883436d4a';

const mockCard: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id'
});
describe('ShowCardService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCardsRepository.cards.push(mockCard);
    service = new ShowCardService(fakeCardsRepository);
  });
  it('should be able to return the card', async () => {
    const response = await service.run({
      id: cardId,
      playerId: 'fake-player-id'
    });
    expect(response).toEqual(mockCard);
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

import Card from '@modules/cards/schemas/Card';
import DeleteCardService from '@modules/cards/services/DeleteCardService';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';
import { ObjectId } from 'mongodb';
import AppError from '@shared/errors/AppError';

let fakeCardsRepository: FakeCardsRepository;
let service: DeleteCardService;

const cardId = '62c229e08eb5788883436d4a';

const mockCard: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id'
});
describe('DeleteCardService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCardsRepository.cards.push(mockCard);
    service = new DeleteCardService(fakeCardsRepository);
  });
  it('should be able to delete the card', async () => {
    await expect(
      service.run({ id: cardId, playerId: 'fake-player-id' })
    ).resolves.not.toThrow();
    expect(fakeCardsRepository.cards.length).toBe(0);
  });
  it('should throw an AppError when card cannot be found', async () => {
    await expect(
      service.run({ id: 'failure', playerId: 'fake-player-id' })
    ).rejects.toBeInstanceOf(AppError);
    expect(fakeCardsRepository.cards.length).toBe(1);
  });
  it('should throw an AppError when isnt the card owner', async () => {
    await expect(
      service.run({ id: cardId, playerId: 'fake-player-id-2' })
    ).rejects.toBeInstanceOf(AppError);
    expect(fakeCardsRepository.cards.length).toBe(1);
  });
});

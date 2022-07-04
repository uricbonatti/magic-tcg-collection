import Card from '@modules/cards/schemas/Card';
import ListCardsService from '@modules/cards/services/ListCardsService';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';
import { ObjectId } from 'mongodb';

let fakeCardsRepository: FakeCardsRepository;
let service: ListCardsService;

const cardId = '62c229e08eb5788883436d4a';

const mockCard: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id'
});
describe('ListCardsService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCardsRepository.cards.push(mockCard);
    service = new ListCardsService(fakeCardsRepository);
  });
  it('should be able to return the player cards', async () => {
    const response = await service.run({
      playerId: 'fake-player-id'
    });
    expect(response).toEqual([mockCard]);
  });
  it('should return an empty array when player dont have cards', async () => {
    const response = await service.run({
      playerId: 'fake-player-id-2'
    });
    expect(response).toEqual([]);
  });
});

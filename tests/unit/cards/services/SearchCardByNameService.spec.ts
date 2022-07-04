import Card from '@modules/cards/schemas/Card';
import SearchCardByNameService from '@modules/cards/services/SearchCardByNameService';
import FakeCardsRepository from './../../../mocks/FakeCardsRepository';
import { ObjectId } from 'mongodb';

let fakeCardsRepository: FakeCardsRepository;
let service: SearchCardByNameService;

const cardId = '62c229e08eb5788883436d4a';

const mockCard1: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id',
  name: 'teste de fortitude'
});
const mockCard2: Card = Object.assign(new Card(), {
  id: new ObjectId(cardId),
  playerId: 'fake-player-id',
  name: 'fortitude espiritual'
});
describe('SearchCardByNameService', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCardsRepository.cards.push(mockCard1);
    fakeCardsRepository.cards.push(mockCard2);
    service = new SearchCardByNameService(fakeCardsRepository);
  });
  it('should be able to return the card 1', async () => {
    const response = await service.run({
      name: 'teste',
      playerId: 'fake-player-id'
    });
    expect(response).toEqual([mockCard1]);
  });
  it('should be able to return the card 2', async () => {
    const response = await service.run({
      name: 'espiritual',
      playerId: 'fake-player-id'
    });
    expect(response).toEqual([mockCard2]);
  });
  it('should be able to return both cards', async () => {
    const response = await service.run({
      name: 'fortitude',
      playerId: 'fake-player-id'
    });
    expect(response).toContainEqual(mockCard2);
    expect(response).toContainEqual(mockCard1);
  });
  it('should be able to  return an ampty array when name not found', async () => {
    const response = await service.run({
      name: 'mortos',
      playerId: 'fake-player-id'
    });
    expect(response).toEqual([]);
  });
});

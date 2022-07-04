import Card from '@modules/cards/schemas/Card';
import compareCardsPrice from '@modules/cards/utils/compareCardsPrice';

const mockCard1: Card = Object.assign(new Card(), {
  playerId: 'fake-player-id',
  name: 'teste de fortitude',
  priceInBrazilianReal: 50
});
const mockCard2: Card = Object.assign(new Card(), {
  playerId: 'fake-player-id',
  name: 'fortitude espiritual',
  priceInBrazilianReal: 25
});
const mockCard3: Card = Object.assign(new Card(), {
  playerId: 'fake-player-id',
  name: 'furia espiritual',
  priceInBrazilianReal: 75
});

const mockCard4: Card = Object.assign(new Card(), {
  playerId: 'fake-player-id',
  name: 'revitalização espiritual',
  priceInBrazilianReal: 50
});

describe('compareCardsPrice', () => {
  it('should order the array with descending order by priceInBrazilianReal 1', () => {
    const arrayBase = [mockCard2, mockCard4, mockCard1, mockCard3];
    const response = arrayBase.sort(compareCardsPrice);
    expect(response).toEqual([mockCard3, mockCard4, mockCard1, mockCard2]);
  });
  it('should order the array with descending order by priceInBrazilianReal 2', () => {
    const arrayBase = [mockCard1, mockCard2, mockCard3];
    const response = arrayBase.sort(compareCardsPrice);
    expect(response).toEqual([mockCard3, mockCard1, mockCard2]);
  });
  it('should order the array with descending order by priceInBrazilianReal 3', () => {
    const arrayBase = [mockCard2, mockCard3];
    const response = arrayBase.sort(compareCardsPrice);
    expect(response).toEqual([mockCard3, mockCard2]);
  });
  it('should keep the order with cards with equal prices', () => {
    const arrayBase = [mockCard1, mockCard4];
    const response = arrayBase.sort(compareCardsPrice);
    expect(response).toEqual([mockCard1, mockCard4]);
  });
});

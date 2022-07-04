import Card from '../schemas/Card';

export default function compareCardsPrice(card1: Card, card2: Card) {
  if (card1.priceInBrazilianReal > card2.priceInBrazilianReal) {
    return -1;
  }
  if (card1.priceInBrazilianReal < card2.priceInBrazilianReal) {
    return 1;
  }
  return 0;
}

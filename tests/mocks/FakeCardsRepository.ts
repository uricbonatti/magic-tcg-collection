import ICardsRepository from '@modules/cards/interfaces/ICardsRepository';
import ICreateCardDTO from '@modules/cards/interfaces/ICreateCardDTO';
import Card from '@modules/cards/schemas/Card';
import { ObjectId } from 'mongodb';

class FakeCardsRepository implements ICardsRepository {
  cards: Card[] = [];
  public async create(data: ICreateCardDTO): Promise<Card> {
    const card = new Card();
    Object.assign(card, {
      id: new ObjectId(),
      ...data
    });
    this.cards.push(card);
    return card;
  }

  public async findByPlayerId(playerId: string): Promise<Card[]> {
    return this.cards.filter((card) => card.playerId === playerId);
  }

  public async findById(id: string): Promise<Card | undefined> {
    return this.cards.find((card) => card.id.toHexString() === id);
  }

  public async findByName(name: string, playerId: string): Promise<Card[]> {
    return this.cards.filter(
      (card) => card.playerId === playerId && card.name.includes(name)
    );
  }

  public async save(card: Card): Promise<Card> {
    const cardIndex = this.cards.findIndex((crd) => crd.id === card.id);
    if (cardIndex > -1) {
      this.cards[cardIndex] = card;
      return card;
    }
    this.cards.push(card);
    return card;
  }

  public async del(id: string): Promise<void> {
    const cardIndex = this.cards.findIndex(
      (crd) => crd.id.toHexString() === id
    );
    this.cards.splice(cardIndex, 1);
  }
}
export default FakeCardsRepository;

import Card from '../schemas/Card';
import ICreateCardDTO from './ICreateCardDTO';

export default interface ICardsRepository {
  create(data: ICreateCardDTO): Promise<Card>;
  findByPlayerId(playerId: string): Promise<Card[]>;
  findById(id: string): Promise<Card | undefined>;
  findByName(name: string, playerId: string): Promise<Card[]>;
  save(card: Card): Promise<Card>;
  del(id: string): Promise<void>;
}

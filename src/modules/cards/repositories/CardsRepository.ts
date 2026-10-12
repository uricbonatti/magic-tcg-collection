import getMongoRepository from '@shared/utils/getMongoRepository';
import MethodLogger from '@shared/utils/MethodLogger';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import ICreateCardDTO from '../interfaces/ICreateCardDTO';
import Card from '../schemas/Card';
import ICardsRepository from './../interfaces/ICardsRepository';

class CardsRepository implements ICardsRepository {
  private odmRepository: MongoRepository<Card>;

  constructor() {
    this.odmRepository = getMongoRepository(Card);
  }

  @MethodLogger({ showFields: ['name', 'playerId'] })
  public async create(data: ICreateCardDTO): Promise<Card> {
    const newCard = this.odmRepository.create(data);
    return this.odmRepository.save(newCard);
  }

  @MethodLogger()
  public async findByPlayerId(playerId: string): Promise<Card[]> {
    return this.odmRepository.findBy({ playerId });
  }

  @MethodLogger()
  public async findById(id: string): Promise<Card | undefined> {
    return (
      (await this.odmRepository.findOneBy({ _id: new ObjectId(id) })) ??
      undefined
    );
  }

  @MethodLogger()
  public async findByName(name: string, playerId: string): Promise<Card[]> {
    return this.odmRepository.find({
      where: {
        playerId,
        // Escapa a entrada: busca por trecho do nome, sem permitir regex do usuário.
        name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      }
    });
  }

  @MethodLogger({ showFields: ['id', 'playerId'] })
  public async save(card: Card): Promise<Card> {
    return this.odmRepository.save(card);
  }

  @MethodLogger()
  public async del(id: string): Promise<void> {
    await this.odmRepository.deleteOne({ _id: new ObjectId(id) });
  }
}

export default CardsRepository;

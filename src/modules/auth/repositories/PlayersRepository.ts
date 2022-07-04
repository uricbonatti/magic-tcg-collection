import MethodLogger from '@shared/utils/MethodLogger';
import { MongoRepository } from 'typeorm';
import ICreatePlayerDTO from '../interfaces/ICreatePlayerDTO';
import IPlayersRepository from '../interfaces/IPlayersRepository';
import Player from '../schemas/Player';
import getMongoRepository from '@shared/utils/getMongoRepository';

class PlayersRepository implements IPlayersRepository {
  private odmRepository: MongoRepository<Player>;

  constructor() {
    this.odmRepository = getMongoRepository(Player);
  }

  @MethodLogger({ showFields: ['email'] })
  public async create(data: ICreatePlayerDTO): Promise<Player> {
    const newPlayer = this.odmRepository.create(data);
    return this.odmRepository.save(newPlayer);
  }

  public async findByEmail(email: string): Promise<Player | undefined> {
    return this.odmRepository.findOne({ email });
  }
}

export default PlayersRepository;

import ICreatePlayerDTO from '@modules/auth/interfaces/ICreatePlayerDTO';
import IPlayersRepository from '@modules/auth/interfaces/IPlayersRepository';
import Player from '@modules/auth/schemas/Player';
import { ObjectId } from 'mongodb';

class FakePlayersRepository implements IPlayersRepository {
  public players: Player[] = [];

  public async create(playerData: ICreatePlayerDTO): Promise<Player> {
    const player = new Player();
    Object.assign(player, {
      id: new ObjectId(),
      ...playerData
    });
    this.players.push(player);
    return player;
  }

  public async findByEmail(email: string): Promise<Player | undefined> {
    return this.players.find((player) => player.email === email);
  }
}

export default FakePlayersRepository;

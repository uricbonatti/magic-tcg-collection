import Player from '../schemas/Player';
import ICreatePlayerDTO from './ICreatePlayerDTO';

export default interface IPlayersRepository {
  create(data: ICreatePlayerDTO): Promise<Player>;
  findByEmail(email: string): Promise<Player | undefined>;
}

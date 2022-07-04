import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../interfaces/IHashProvider';
import IPlayersRepository from '../interfaces/IPlayersRepository';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import Player from '../schemas/Player';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  player: Player;
}

@injectable()
class SignInService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  @MethodLogger({ showFields: ['email'] })
  public async run({ email, password }: IRequest): Promise<IResponse> {
    const player = await this.playersRepository.findByEmail(email);
    if (!player) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      player.password
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, {
      subject: player.getId(),
      expiresIn
    });
    return { player, token };
  }
}

export default SignInService;

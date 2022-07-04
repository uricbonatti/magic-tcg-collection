import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../interfaces/IHashProvider';
import IPlayersRepository from '../interfaces/IPlayersRepository';
import Player from '../schemas/Player';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class SignUpService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  @MethodLogger({ showFields: ['email'] })
  public async run({ email, password }: IRequest): Promise<Player> {
    const checkPlayerExists = await this.playersRepository.findByEmail(email);
    if (checkPlayerExists) {
      throw new AppError('Email address already used.', 400);
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    return this.playersRepository.create({ email, password: hashedPassword });
  }
}

export default SignUpService;

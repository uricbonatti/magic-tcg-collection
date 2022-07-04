import { container } from 'tsyringe';
import PlayersRepository from '../repositories/PlayersRepository';
import IPlayersRepository from '../interfaces/IPlayersRepository';
import IHashProvider from '../interfaces/IHashProvider';
import BCryptHashProvider from '../providers/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IPlayersRepository>(
  'PlayersRepository',
  PlayersRepository
);

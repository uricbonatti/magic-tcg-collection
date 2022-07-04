import FakePlayersRepository from '../../../mocks/FakePlayersRepository';
import FakeHashProvider from './../../../mocks/FakeHashProvider';
import SignInService from './../../../../src/modules/auth/services/SignInService';
import Player from '@modules/auth/schemas/Player';
import { ObjectId } from 'mongodb';
import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakePlayersRepository: FakePlayersRepository;

let service: SignInService;
describe('SignInService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakePlayersRepository = new FakePlayersRepository();
    service = new SignInService(fakePlayersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const player = Object.assign(new Player(), {
      id: new ObjectId(),
      email: 'teste@tet.io',
      password: 'password'
    });

    fakePlayersRepository.players.push(player);
    const response = await service.run({
      email: 'teste@tet.io',
      password: 'password'
    });
    expect(response).toHaveProperty('token');
    expect(response.player).toEqual(player);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const player = Object.assign(new Player(), {
      id: new ObjectId(),
      email: 'teste@test.io',
      password: 'password'
    });

    fakePlayersRepository.players.push(player);
    await expect(
      service.run({
        email: 'teste@test.io',
        password: 'wrong'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong email', async () => {
    const player = Object.assign(new Player(), {
      id: new ObjectId(),
      email: 'teste@test.io',
      password: 'password'
    });

    fakePlayersRepository.players.push(player);
    await expect(
      service.run({
        email: 'wrong@test.io',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

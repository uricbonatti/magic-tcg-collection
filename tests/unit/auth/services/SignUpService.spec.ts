import FakePlayersRepository from '../../../mocks/FakePlayersRepository';
import FakeHashProvider from './../../../mocks/FakeHashProvider';
import Player from '@modules/auth/schemas/Player';
import { ObjectId } from 'mongodb';
import AppError from '@shared/errors/AppError';
import SignUpService from '@modules/auth/services/SignUpService';

let fakeHashProvider: FakeHashProvider;
let fakePlayersRepository: FakePlayersRepository;

let service: SignUpService;
describe('SignUpService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakePlayersRepository = new FakePlayersRepository();
    service = new SignUpService(fakePlayersRepository, fakeHashProvider);
  });

  it('should be able to create a new Player', async () => {
    const response = await service.run({
      email: 'teste@tet.io',
      password: 'password'
    });
    expect(response).toHaveProperty('id');
  });
  it('should thorow an AppError when email already exists', async () => {
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
});

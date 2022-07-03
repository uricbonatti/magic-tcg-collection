/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import getMongoRepository from '@shared/utils/getMongoRepository';
import PlayersRepository from '@modules/auth/repositories/PlayersRepository';
import ICreatePlayerDTO from '@modules/auth/interfaces/ICreatePlayerDTO';
import Player from '@modules/auth/schemas/Player';

jest.mock('@shared/utils/getMongoRepository');
const mockedGetMongoRepo = getMongoRepository as jest.MockedFunction<any>;

const mockPlayer: Player = Object.assign(new Player(), {
  id: new ObjectId(),
  email: 'teste@test.io',
  password: 'password'
});

const mockPlayersRepository: Player[] = [mockPlayer];
let repository: PlayersRepository;
let forceError: boolean;

describe('PlayersRepository', () => {
  beforeEach(() => {
    forceError = false;
    mockedGetMongoRepo.mockReturnValue({
      findOne: async ({ email }: { email: string }): Promise<any> => {
        if (forceError) {
          throw new Error('Error');
        }
        return mockPlayersRepository.find((player) => player.email === email);
      },
      create: async (data: ICreatePlayerDTO): Promise<any> => {
        return Object.assign(new Player(), data, { id: new ObjectId() });
      },
      save: async (data: Player): Promise<any> => {
        const playerIndex = mockPlayersRepository.findIndex(
          (player) => player.id === data.id
        );
        if (playerIndex === -1) {
          mockPlayersRepository.push(data);
          return data;
        }
        mockPlayersRepository[playerIndex] = data;
        return data;
      }
    });
    repository = new PlayersRepository();
  });
  it('should be able to find player by email', async () => {
    const response = await repository.findByEmail('teste@test.io');
    expect(response).toEqual(mockPlayer);
  });
  it('should return undefined when dont have any player with email', async () => {
    const response = await repository.findByEmail('undefined@test.io');
    expect(response).toBeUndefined();
  });
  it('should be able to create a new player', async () => {
    const newPlayer = {
      email: 'teste2@test.io',
      password: 'validation'
    };
    const response = await repository.create(newPlayer);
    expect(response).toHaveProperty('id');
    expect(mockPlayersRepository).toHaveLength(2);
  });
});

import AppError from '@shared/errors/AppError';
import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';

interface IRequest {
  id: string;
  playerId: string;
}

@injectable()
class DeleteCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  @MethodLogger({ showFields: ['id', 'playerId'] })
  public async run({ id, playerId }: IRequest): Promise<void> {
    const card = await this.cardsRepository.findById(id);
    if (!card) {
      throw new AppError('Card not found', 404);
    }
    if (card.playerId !== playerId) {
      throw new AppError('Card not found', 404);
    }
    return this.cardsRepository.del(id);
  }
}

export default DeleteCardService;

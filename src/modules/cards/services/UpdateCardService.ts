import AppError from '@shared/errors/AppError';
import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';
import Card from '../schemas/Card';

interface IRequest {
  id: string;
  playerId: string;
  priceInBrazilianReal?: number;
  quantity?: number;
}

@injectable()
class UpdateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  @MethodLogger({ showFields: ['id', 'playerId'] })
  public async run({
    id,
    playerId,
    priceInBrazilianReal,
    quantity
  }: IRequest): Promise<Card> {
    const card = await this.cardsRepository.findById(id);
    if (!card) {
      throw new AppError('Card not found', 404);
    }
    if (card.playerId !== playerId) {
      throw new AppError('Card not found', 404);
    }
    if (typeof quantity === 'number') {
      card.quantity = quantity;
    }
    if (typeof priceInBrazilianReal === 'number') {
      card.priceInBrazilianReal = priceInBrazilianReal;
    }
    return this.cardsRepository.save(card);
  }
}

export default UpdateCardService;

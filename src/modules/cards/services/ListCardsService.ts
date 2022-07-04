import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';
import Card from '../schemas/Card';
import compareCardsPrice from './../utils/compareCardsPrice';

interface IRequest {
  playerId: string;
}

@injectable()
class ListCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  @MethodLogger({ showFields: ['playerId'] })
  public async run({ playerId }: IRequest): Promise<Card[]> {
    const cards = await this.cardsRepository.findByPlayerId(playerId);
    return cards.sort(compareCardsPrice);
  }
}

export default ListCardsService;

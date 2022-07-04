import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';
import Card from '../schemas/Card';
import compareCardsPrice from '../utils/compareCardsPrice';
import normalize from '../utils/normalize';

interface IRequest {
  playerId: string;
  name: string;
}

@injectable()
class SearchCardByNameService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  @MethodLogger({ showFields: ['playerId', 'name'] })
  public async run({ playerId, name }: IRequest): Promise<Card[]> {
    const cards = await this.cardsRepository.findByName(
      normalize(name),
      playerId
    );
    return cards.sort(compareCardsPrice);
  }
}

export default SearchCardByNameService;
